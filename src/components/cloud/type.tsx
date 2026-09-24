import type { ReactNode } from "react";

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`mb-5 block text-[11px] font-semibold uppercase tracking-[0.28em] ${
        dark ? "text-brass-light" : "text-ink-mute"
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
      className={`font-serif-display text-balance font-medium leading-[1.02] tracking-[-0.02em] text-[clamp(36px,5.4vw,68px)] ${
        dark ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Soft({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`italic ${dark ? "text-glow" : "text-brass-deep"}`}>{children}</span>;
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
      className={`max-w-[46ch] text-pretty text-[17px] leading-relaxed md:text-[18px] ${
        dark ? "text-cream-mute" : "text-ink-mute"
      } ${className}`}
    >
      {children}
    </p>
  );
}
