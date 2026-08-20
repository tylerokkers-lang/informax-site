import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Eyebrow({
  children,
  tone = "light",
  center = false,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  center?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase mb-4 ${
        tone === "dark" ? "text-brass-light" : "text-brass-deep"
      } ${center ? "justify-center w-full" : ""}`}
    >
      <span
        className={`h-px w-[22px] inline-block ${
          tone === "dark" ? "bg-brass-light" : "bg-brass"
        }`}
      />
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  tone = "light",
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}
    >
      <Eyebrow tone={tone} center={center}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={`font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] mb-4 ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-[17px] leading-relaxed ${
            tone === "dark" ? "text-cream-mute" : "text-ink-mute"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <em className="not-italic italic text-brass-deep">{children}</em>;
}

export function EmLight({ children }: { children: ReactNode }) {
  return <em className="not-italic italic text-brass-light">{children}</em>;
}

const baseBtn =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[14.5px] font-semibold tracking-[0.01em] whitespace-nowrap transition-all duration-300 group";

export function BtnPrimary({
  href,
  children,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${baseBtn} bg-gradient-to-br from-brass-light to-brass-deep text-[#ffffff] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(60,46,176,0.55)] ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

export function BtnGhost({
  href,
  children,
  className = "",
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`${baseBtn} border hover:-translate-y-0.5 ${
        tone === "dark"
          ? "border-line-dark text-white hover:border-brass-light hover:text-brass-light"
          : "border-line text-ink hover:border-brass hover:text-brass-deep"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
