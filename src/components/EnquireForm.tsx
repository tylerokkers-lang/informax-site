"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { ENQUIRY_INTERESTS } from "@/lib/constants";

type FieldErrors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

const initialValues = {
  name: "",
  company: "",
  jobTitle: "",
  email: "",
  phone: "",
  message: "",
};

export default function EnquireForm() {
  const [values, setValues] = useState(initialValues);
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof typeof initialValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function toggleInterest(option: string) {
    setInterests((prev) =>
      prev.includes(option)
        ? prev.filter((i) => i !== option)
        : [...prev, option]
    );
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.company.trim())
      next.company = "Please enter your hotel or company name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim())
      next.message = "Tell us a little about your property.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const honeypot = (
      e.currentTarget.elements.namedItem("website") as HTMLInputElement | null
    )?.value;

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      setErrorMessage("Please check the highlighted fields below.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, interests, website: honeypot }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
        if (data.fieldErrors) setErrors(data.fieldErrors);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(31,157,107,0.12)]">
          <CheckCircle2 size={28} className="text-moss" />
        </div>
        <h3 className="font-serif-display text-[34px] font-medium leading-tight text-ink">
          Thank you. We&rsquo;ll be in touch.
        </h3>
        <p className="max-w-md text-[16px] leading-relaxed text-ink-mute">
          Your enquiry has reached the Informax team. We reply within one
          business day to arrange a conversation and, if you&rsquo;d like, a
          demonstration of Informax Cloud.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status === "error" && errorMessage && (
        <div className="mb-8 flex items-start gap-3.5 rounded-[14px] border border-[rgba(217,54,54,0.25)] bg-[rgba(217,54,54,0.06)] px-5 py-4 text-[14.5px] leading-relaxed text-[#a12020]">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot: hidden from real visitors, catches basic bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Group n="01" title="What would you like to explore?">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" role="group" aria-label="What would you like to explore?">
          {ENQUIRY_INTERESTS.map((option) => {
            const checked = interests.includes(option);
            return (
              <label
                key={option}
                className={`flex min-h-[52px] cursor-pointer items-center justify-center rounded-[12px] border px-3 py-2.5 text-center text-[13.5px] font-medium leading-snug transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass-deep ${
                  checked ? "border-ink bg-ink text-white" : "border-line bg-panel text-ink-soft hover:border-ink-mute"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggleInterest(option)} className="sr-only" />
                {option}
              </label>
            );
          })}
        </div>
      </Group>

      <Group n="02" title="About you">
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <Field label="Name" required error={errors.name} htmlFor="name">
            <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} className={inputClass(Boolean(errors.name))} />
          </Field>
          <Field label="Hotel or company" required error={errors.company} htmlFor="company">
            <input id="company" name="company" type="text" autoComplete="organization" value={values.company} onChange={(e) => update("company", e.target.value)} aria-invalid={Boolean(errors.company)} className={inputClass(Boolean(errors.company))} />
          </Field>
          <Field label="Role" htmlFor="jobTitle">
            <input id="jobTitle" name="jobTitle" type="text" autoComplete="organization-title" placeholder="General Manager" value={values.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} className={inputClass(false)} />
          </Field>
          <Field label="Email" required error={errors.email} htmlFor="email">
            <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} className={inputClass(Boolean(errors.email))} />
          </Field>
          <Field label="Phone" htmlFor="phone" full>
            <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass(false)} />
          </Field>
        </div>
      </Group>

      <Group n="03" title="Your property">
        <Field label="Tell us a little about it" required error={errors.message} htmlFor="message" full>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Number of rooms, the areas you'd like to connect, and anything you'd like us to know."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass(Boolean(errors.message))} min-h-[140px] resize-y`}
          />
        </Field>
      </Group>

      <div className="mt-2 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[36ch] text-[12.5px] leading-relaxed text-ink-mute">
          We&rsquo;ll only use your details to reply to this enquiry. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-ink px-8 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brass-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-deep disabled:opacity-60"
        >
          {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
          {status === "submitting" ? "Sending…" : "Talk to Informax"}
        </button>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-[12px] border bg-panel px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-mute/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus-visible:border-ink focus-visible:shadow-[0_0_0_3px_rgba(86,67,224,0.18)] ${
    hasError ? "border-rust" : "border-line hover:border-ink/30"
  }`;
}

function Group({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-10">
      <legend className="mb-5 flex items-baseline gap-3">
        <span className="font-serif-display text-[14px] italic text-brass-deep">{n}</span>
        <span className="font-serif-display text-[24px] leading-tight text-ink">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
  full = false,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`mb-4 ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-ink-soft">
        {label} {required && <span className="text-brass-deep">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12.5px] text-rust">{error}</p>}
    </div>
  );
}
