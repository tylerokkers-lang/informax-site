import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/constants";

export const runtime = "nodejs";

interface EnquiryPayload {
  name?: string;
  company?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  budget?: string;
  interests?: string[];
  message?: string;
  website?: string; // honeypot field — real visitors never fill this in
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
      "[enquire] RESEND_API_KEY is not configured — enquiry was not delivered:",
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

  const body = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    data.jobTitle ? `Job Title: ${data.jobTitle}` : null,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    data.interests?.length ? `Interested In: ${data.interests.join(", ")}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

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
        reply_to: data.email,
        subject: `New enquiry — ${data.company}`,
        text: body,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[enquire] Resend API error:", res.status, errBody);
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
