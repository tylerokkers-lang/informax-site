import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/constants";
import { buildEnquiryEmailHtml, buildEnquiryEmailText, buildEnquirySubject } from "@/lib/enquiryEmail";
import { MAX_BODY_BYTES, validateEnquiry } from "@/lib/enquiryValidation";
import { clientKey, createRateLimiter } from "@/lib/rateLimit";

export const runtime = "nodejs";

/*
 * The enquiry endpoint. Order of checks: same origin, content type, body size,
 * rate limit, strict validation, spam signals, then delivery through Resend.
 * Logs never contain personal details from the enquiry: only outcomes and
 * status codes. Error responses never reveal internal detail.
 */

// Per client: 5 enquiries per 10 minutes. Per instance: 40 per 10 minutes, a ceiling on email volume.
const perClient = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });
const perInstance = createRateLimiter({ limit: 40, windowMs: 10 * 60_000, maxKeys: 1 });

const GENERIC_ERROR = `Something went wrong sending your enquiry. Please try again or email us directly at ${CONTACT_EMAIL}.`;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  // Browsers always send Origin on a cross-site POST; a request without one is not a cross-site browser request.
  if (!origin) return true;
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Forbidden." }, 403);

  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ error: "Unsupported request." }, 415);
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return json({ error: "That message is too long." }, 413);

  const key = clientKey(request.headers);
  const client = perClient(key);
  const instance = perInstance("all");
  if (!client.allowed || !instance.allowed) {
    console.warn("[enquire] rate limited");
    return json(
      { error: `You have sent several enquiries in a short time. Please wait a few minutes, or email us at ${CONTACT_EMAIL}.` },
      429,
      { "Retry-After": String(Math.max(client.retryAfterS, instance.retryAfterS)) },
    );
  }

  // Read the body ourselves so the size limit holds even without a Content-Length header.
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json({ error: "That message is too long." }, 413);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const result = validateEnquiry(parsed);
  if (!result.ok) {
    if (result.fieldErrors.form) return json({ error: "Invalid request." }, 400);
    return json({ error: "Please check the highlighted fields.", fieldErrors: result.fieldErrors }, 422);
  }

  // Spam is answered exactly like success, so automated senders learn nothing.
  if (result.spam) {
    console.info("[enquire] discarded as automated");
    return json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[enquire] RESEND_API_KEY is not configured; enquiry not delivered");
    return json({ error: GENERIC_ERROR }, 503);
  }

  const toEmail = process.env.ENQUIRY_TO_EMAIL || CONTACT_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "Informax Enquiries <onboarding@resend.dev>";
  const e = result.enquiry;
  const enquiry = { ...e, message: e.message ?? "(No message added.)" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: enquiry.email,
        subject: buildEnquirySubject(enquiry),
        html: buildEnquiryEmailHtml(enquiry),
        text: buildEnquiryEmailText(enquiry),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      // Status only: Resend's error text can echo the addresses it was given.
      console.error(`[enquire] Resend rejected the email (status ${res.status})`);
      return json({ error: GENERIC_ERROR }, 502);
    }

    console.info("[enquire] delivered");
    return json({ ok: true });
  } catch (err) {
    console.error(`[enquire] could not reach Resend (${err instanceof Error ? err.name : "unknown error"})`);
    return json({ error: GENERIC_ERROR }, 502);
  }
}

export function GET() {
  return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
}
