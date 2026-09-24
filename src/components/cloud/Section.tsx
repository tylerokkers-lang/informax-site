import type { ReactNode } from "react";

const TONES = {
  dark: "bg-charcoal-950 text-cream",
  light: "bg-paper text-ink-soft",
  alt: "bg-paper-alt text-ink-soft",
} as const;

export default function Section({
  tone = "light",
  id,
  divider = false,
  className = "",
  children,
}: {
  tone?: keyof typeof TONES;
  id?: string;
  /** Hairline along the top edge, for two adjacent sections of the same tone. */
  divider?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 md:py-36 ${TONES[tone]} ${
        divider ? (tone === "dark" ? "border-t border-white/10" : "border-t border-line") : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-8xl px-6 md:px-10">{children}</div>
    </section>
  );
}

export function Head({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mb-14 max-w-3xl md:mb-20 ${className}`}>{children}</div>;
}
