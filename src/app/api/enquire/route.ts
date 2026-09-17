import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/constants";
import {
  buildEnquiryEmailHtml,
  buildEnquiryEmailText,
  buildEnquirySubject,
} from "@/lib/enquiryEmail";

export const runtime = "nodejs";

interface EnquiryPayload {
  name?: string;
  company?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  interests?: string[];
  message?: string;
  website?: string; // honeypot field: real visitors never fill this in
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let data: EnquiryPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const fieldErrors: Record<string, string> = {};
  if (!data.name?.trim()) fieldErrors.name = "Please enter your name.";
  if (!data.company?.trim())
    fieldErrors.company = "Please enter your company name.";
  if (!data.email?.trim() || !isValidEmail(data.email.trim()))
    fieldErrors.email = "Please enter a valid email address.";
  if (!data.message?.trim())
    fieldErrors.message = "Tell us a little about what you need.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[enquire] RESEND_API_KEY is not configured. Enquiry was not delivered:",
      data
    );
    return NextResponse.json(
      {
        error: `Something went wrong sending your enquiry. Please email us directly at ${CONTACT_EMAIL}.`,
      },
      { status: 503 }
    );
  }

  const toEmail = process.env.ENQUIRY_TO_EMAIL || CONTACT_EMAIL;
  const fromEmail =
    process.env.ENQUIRY_FROM_EMAIL || "Informax Enquiries <onboarding@resend.dev>";

  const enquiry = {
    name: data.name!.trim(),
    company: data.company!.trim(),
    jobTitle: data.jobTitle?.trim() || undefined,
    email: data.email!.trim(),
    phone: data.phone?.trim() || undefined,
    interests: data.interests?.length ? data.interests : undefined,
    message: data.message!.trim(),
  };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: enquiry.email,
        subject: buildEnquirySubject(enquiry),
        html: buildEnquiryEmailHtml(enquiry),
        text: buildEnquiryEmailText(enquiry),
      }),
    });

    if (!res.ok) {
      const raw = await res.text();
      let reason = raw;
      try {
        const parsed = JSON.parse(raw) as { name?: string; message?: string };
        reason = parsed.message ? `${parsed.name}: ${parsed.message}` : raw;
      } catch {
        // Resend returned a non-JSON error body; fall back to the raw text.
      }
      console.error(`[enquire] Resend API error (status ${res.status}):`, reason);
      return NextResponse.json(
        {
          error: `Something went wrong sending your enquiry. Please try again or email us directly at ${CONTACT_EMAIL}.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquire] Failed to send enquiry email:", err);
    return NextResponse.json(
      {
        error: `Something went wrong sending your enquiry. Please try again or email us directly at ${CONTACT_EMAIL}.`,
      },
      { status: 502 }
    );
  }
}
