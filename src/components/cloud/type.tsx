import type { ReactNode } from "react";

/**
 * Marketing type, drawn from Informax Cloud: SF-style display type at
 * semibold with tight tracking, a two-tone headline (the second phrase in
 * a quieter grey rather than italics), and a small Cloud-blue eyebrow.
 */

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`mb-4 block text-[14px] font-semibold tracking-[-0.005em] md:text-[15px] ${
        dark ? "text-brass-light" : "text-brass-deep"
      }`}
    >
      {children}
    </span>
  );
}

export function Display({
  children,
  dark = false,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`font-serif-display text-balance leading-[1.06] text-[clamp(34px,5vw,62px)] ${
        dark ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** The quieter second phrase of a two-tone headline. */
export function Soft({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-cream-mute" : "text-ink-mute"}>{children}</span>;
}

export function Lede({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`max-w-[46ch] text-pretty text-[17px] leading-[1.6] md:text-[19px] ${
        dark ? "text-cream-mute" : "text-ink-mute"
      } ${className}`}
    >
      {children}
    </p>
  );
}
