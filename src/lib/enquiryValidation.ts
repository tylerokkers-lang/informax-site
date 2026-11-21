import { ENQUIRY_INTERESTS } from "@/lib/constants";

/**
 * Strict, dependency-free validation for the enquiry endpoint. Every field
 * must be the expected type and length; anything unexpected is rejected
 * rather than coerced. Limits are shared with the form (maxLength).
 */
export const LIMITS = {
  name: 100,
  company: 120,
  jobTitle: 100,
  email: 254,
  phone: 40,
  message: 4000,
  interests: ENQUIRY_INTERESTS.length,
} as const;

/** Largest request body accepted, in bytes. A full enquiry is well under 10 KB. */
export const MAX_BODY_BYTES = 16 * 1024;

/** A human takes longer than this to fill in the form; faster submissions are treated as automated. */
export const MIN_FILL_MS = 2500;

export type Enquiry = {
  name: string;
  company: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  interests?: string[];
  message?: string;
};

export type ValidationResult =
  | { ok: true; enquiry: Enquiry; spam: boolean }
  | { ok: false; fieldErrors: Record<string, string> };

// Control characters other than tab and newline never belong in an enquiry.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const LINE_BREAK = /[\r\n]/;
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^[+()\d\s.-]{6,40}$/;
const URL_LIKE = /(https?:\/\/|www\.)/gi;

const ALLOWED_KEYS = new Set(["name", "company", "jobTitle", "email", "phone", "interests", "message", "website", "startedAt"]);

function text(value: unknown, max: number, { multiline = false } = {}): string | null | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") return null;
  const v = value.normalize("NFC").trim();
  if (!v) return undefined;
  if (v.length > max) return null;
  if (CONTROL.test(v)) return null;
  if (!multiline && LINE_BREAK.test(v)) return null;
  return v;
}

export function validateEnquiry(input: unknown, now = Date.now()): ValidationResult {
  const fieldErrors: Record<string, string> = {};
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, fieldErrors: { form: "Invalid request." } };
  }
  const data = input as Record<string, unknown>;
  if (Object.keys(data).some((k) => !ALLOWED_KEYS.has(k))) {
    return { ok: false, fieldErrors: { form: "Invalid request." } };
  }

  const name = text(data.name, LIMITS.name);
  const company = text(data.company, LIMITS.company);
  const jobTitle = text(data.jobTitle, LIMITS.jobTitle);
  const email = text(data.email, LIMITS.email);
  const phone = text(data.phone, LIMITS.phone);
  const message = text(data.message, LIMITS.message, { multiline: true });

  if (!name) fieldErrors.name = name === null ? `Please use up to ${LIMITS.name} characters.` : "Please enter your name.";
  if (!company) fieldErrors.company = company === null ? `Please use up to ${LIMITS.company} characters.` : "Please enter your restaurant, hotel or company name.";
  if (jobTitle === null) fieldErrors.jobTitle = `Please use up to ${LIMITS.jobTitle} characters.`;
  if (!email || !EMAIL.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (phone === null || (phone && !PHONE.test(phone))) fieldErrors.phone = "Please enter a valid phone number.";
  if (message === null) fieldErrors.message = `Please keep your message under ${LIMITS.message} characters.`;

  let interests: string[] | undefined;
  if (data.interests !== undefined) {
    const allowed = new Set<string>(ENQUIRY_INTERESTS);
    if (
      !Array.isArray(data.interests) ||
      data.interests.length > LIMITS.interests ||
      data.interests.some((i) => typeof i !== "string" || !allowed.has(i))
    ) {
      fieldErrors.interests = "Please choose from the listed options.";
    } else {
      interests = [...new Set(data.interests as string[])];
    }
  }

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  // Spam signals. These never tell the sender they were caught: the response looks like success.
  const honeypot = typeof data.website === "string" && data.website.trim() !== "";
  const startedAt = typeof data.startedAt === "number" ? data.startedAt : NaN;
  const tooFast = !Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS || startedAt > now + 60_000;
  const links = (message?.match(URL_LIKE) ?? []).length;

  return {
    ok: true,
    spam: honeypot || tooFast || links > 5,
    enquiry: {
      name: name!,
      company: company!,
      jobTitle: jobTitle || undefined,
      email: email!,
      phone: phone || undefined,
      interests: interests?.length ? interests : undefined,
      message: message || undefined,
    },
  };
}
