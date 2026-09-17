import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

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
      className={`block text-[11px] font-semibold tracking-[0.28em] uppercase mb-4 ${
        tone === "dark" ? "text-brass-light" : "text-ink-mute"
      } ${center ? "text-center w-full" : ""}`}
    >
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
  "group inline-flex items-center gap-2.5 border-b pb-1 text-[15px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-300";

function BtnArrow() {
  return (
    <ArrowUpRight
      size={16}
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  );
}

export function BtnPrimary({
  href,
  children,
  className = "",
  arrow = true,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`${baseBtn} ${
        tone === "dark"
          ? "border-white/50 text-white hover:border-white"
          : "border-ink text-ink hover:border-brass-deep hover:text-brass-deep"
      } ${className}`}
    >
      {children}
      {arrow && <BtnArrow />}
    </Link>
  );
}

export function BtnGhost({
  href,
  children,
  className = "",
  tone = "light",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${baseBtn} ${
        tone === "dark"
          ? "border-white/25 text-white/65 hover:border-white/70 hover:text-white"
          : "border-line text-ink-mute hover:border-ink hover:text-ink"
      } ${className}`}
    >
      {children}
      {arrow && <BtnArrow />}
    </Link>
  );
}
