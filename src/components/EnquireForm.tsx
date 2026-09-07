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
      next.company = "Please enter your company name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim())
      next.message = "Tell us a little about what you're looking to create.";
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
      <div
        role="status"
        className="flex flex-col items-center text-center gap-4 py-10"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(31,157,107,0.12)]">
          <CheckCircle2 size={28} className="text-moss" />
        </div>
        <h3 className="font-serif-display text-2xl font-medium text-ink">
          Thank you, that&rsquo;s on its way.
        </h3>
        <p className="text-ink-mute text-[15px] max-w-md leading-relaxed">
          We&rsquo;ve received your enquiry and will be in touch shortly to
          talk through the best way to bring your project to life.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status === "error" && errorMessage && (
        <div className="form-status show error mb-7 flex items-start gap-3.5 rounded-2xl border border-[rgba(217,54,54,0.3)] bg-[rgba(217,54,54,0.08)] px-5 py-4 text-[14.5px] leading-relaxed text-[#a12020]">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot: hidden from real visitors, catches basic bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Field label="Name" required error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field label="Company" required error={errors.company} htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            className={inputClass(Boolean(errors.company))}
          />
        </Field>

        <Field label="Job Title" htmlFor="jobTitle">
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            autoComplete="organization-title"
            value={values.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="Email" required error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="What are you interested in?" htmlFor="interests" full>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ENQUIRY_INTERESTS.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2.5 rounded-[10px] border border-line bg-white px-3.5 py-3 cursor-pointer transition-colors duration-[250ms] has-[:checked]:border-brass has-[:checked]:bg-[rgba(86,67,224,0.06)]"
              >
                <input
                  type="checkbox"
                  checked={interests.includes(option)}
                  onChange={() => toggleInterest(option)}
                  className="h-4 w-4 shrink-0 accent-brass-deep"
                />
                <span className="text-[13.5px] text-ink-soft">{option}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="Message" required error={errors.message} htmlFor="message" full>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us what you're looking to create..."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass(Boolean(errors.message))} resize-y min-h-[110px]`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-brass-light to-brass-deep px-7 py-4 text-[14.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(60,46,176,0.55)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === "submitting" && (
          <Loader2 size={16} className="animate-spin" />
        )}
        {status === "submitting" ? "Sending..." : "Start the Conversation"}
      </button>

      <p className="mt-4 text-[12.5px] text-ink-mute leading-relaxed">
        By submitting this form you agree to be contacted about your
        project. We&rsquo;ll never share your details. See our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-[10px] border ${
    hasError ? "border-rust" : "border-line"
  } bg-white px-4 py-[13px] text-[14.5px] text-ink transition-all duration-300 focus:outline-none focus:border-brass focus:ring-[3px] focus:ring-[rgba(86,67,224,0.14)]`;
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
    <div className={`mb-[22px] ${full ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={htmlFor}
        className="block text-[13px] font-semibold text-ink mb-2"
      >
        {label} {required && <span className="text-brass-deep">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12.5px] text-rust">{error}</p>}
    </div>
  );
}
