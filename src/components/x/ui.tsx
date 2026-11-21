import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { DEMO_CTA } from "@/lib/constants";

/**
 * Building blocks for the "Done Right" pages. One container width, one
 * vertical rhythm, one heading voice, so every page reads as the same system.
 */

type Tone = "paper" | "white" | "alt" | "dark";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink-soft",
  white: "bg-white text-ink-soft",
  alt: "bg-paper-alt text-ink-soft",
  dark: "bg-charcoal-950 text-cream",
};

export function Section({
  tone = "paper",
  id,
  labelledBy,
  label,
  className = "",
  children,
  tight = false,
}: {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  label?: string;
  className?: string;
  children: ReactNode;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`relative scroll-mt-20 ${TONE[tone]} ${tight ? "py-16 md:py-24" : "py-24 md:py-36"} ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({ children, className = "", wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return <div className={`mx-auto w-full px-6 md:px-10 ${wide ? "max-w-[1320px]" : "max-w-8xl"} ${className}`}>{children}</div>;
}

export function Eyebrow({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return <p className={`text-[14px] font-semibold tracking-[-0.005em] ${dark ? "text-brass-light" : "text-brass-deep"} ${className}`}>{children}</p>;
}

/**
 * A section heading: eyebrow, a confident first line and an optional quieter
 * second line, then a short lead. Sized for scanning, not for decoration.
 */
export function Heading({
  id,
  eyebrow,
  title,
  soft,
  lead,
  dark = false,
  center = false,
  as: H = "h2",
  size = "lg",
  className = "",
}: {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  soft?: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  const sizes = {
    xl: "text-[clamp(44px,7vw,96px)]",
    lg: "text-[clamp(36px,5vw,68px)]",
    md: "text-[clamp(30px,3.6vw,46px)]",
  } as const;
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-[52rem] ${className}`}>
      {eyebrow ? <Eyebrow dark={dark} className="mb-5">{eyebrow}</Eyebrow> : null}
      <H id={id} className={`x-title text-balance ${sizes[size]} ${dark ? "text-white" : "text-ink"}`}>
        {title}
        {soft ? (
          <>
            {" "}
            <span className={dark ? "text-cream-mute" : "text-ink-quiet"}>{soft}</span>
          </>
        ) : null}
      </H>
      {lead ? (
        <div className={`mt-6 text-pretty text-[18px] leading-[1.6] md:text-[20px] ${dark ? "text-white/72" : "text-ink-soft"} ${center ? "mx-auto max-w-[40rem]" : "max-w-[40rem]"}`}>
          {lead}
        </div>
      ) : null}
    </Reveal>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-dark" | "ink";
  className?: string;
  arrow?: boolean;
}) {
  const v = {
    primary: "ix-btn-primary",
    secondary: "ix-btn-secondary",
    "secondary-dark": "ix-btn-secondary-dark",
    ink: "bg-ink text-white hover:bg-charcoal-800",
  }[variant];
  return (
    <Link href={href} className={`ix-btn ${v} ${className}`}>
      {children}
      {arrow ? <ArrowRight size={17} aria-hidden className="-mr-0.5" /> : null}
    </Link>
  );
}

/** A quiet text link with an arrow that moves on hover. */
export function MoreLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`ix-link group ${dark ? "text-brass-light hover:text-white" : "text-brass-deep hover:text-ink"}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** The two actions the whole site leads to. */
export function PrimaryActions({ dark = false, center = false, cloudFirst = true }: { dark?: boolean; center?: boolean; cloudFirst?: boolean }) {
  const cloud = (
    <ButtonLink key="cloud" href="/informax-cloud" variant={cloudFirst ? "primary" : dark ? "secondary-dark" : "secondary"} arrow={cloudFirst}>
      Explore Informax Cloud
    </ButtonLink>
  );
  const demo = (
    <ButtonLink key="demo" href={DEMO_CTA.href} variant={cloudFirst ? (dark ? "secondary-dark" : "secondary") : "primary"} arrow={!cloudFirst}>
      {DEMO_CTA.label}
    </ButtonLink>
  );
  return <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>{cloudFirst ? [cloud, demo] : [demo, cloud]}</div>;
}

/** Closing call to action used at the foot of every page. */
export function DemoBand({
  title = "See Informax with your property in mind.",
  lead = "A short, personal walkthrough of Informax Cloud and the guest experience, shaped around the spaces you run. No obligation.",
}: {
  title?: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section aria-labelledby="demo-band-h" className="bg-paper px-3 pb-3 md:px-4 md:pb-4">
      <div className="relative overflow-hidden rounded-[32px] bg-charcoal-950 px-6 py-24 text-center md:rounded-[44px] md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(142,209,252,0.5),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/25 blur-[140px]" />
        <Reveal className="relative mx-auto max-w-3xl">
          <h2 id="demo-band-h" className="x-title text-balance text-[clamp(36px,5.4vw,72px)] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-[36rem] text-pretty text-[18px] leading-relaxed text-white/70">{lead}</p>
          <div className="mt-10">
            <PrimaryActions dark center cloudFirst={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A statement of honesty under any development-build screen. */
export function ScreenNote({ dark = false, children }: { dark?: boolean; children?: ReactNode }) {
  return (
    <p className={`text-[13px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>
      {children ?? "Real Informax Cloud screens from the development build. The businesses shown are fictional."}
    </p>
  );
}

/** Questions and answers in native disclosure elements: no JavaScript, fully accessible. */
export function Faq({ items, id = "faq-h", title = "Questions, answered." }: { items: { q: string; a: ReactNode }[]; id?: string; title?: string }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <Heading id={id} eyebrow="Questions" title={title} size="md" />
      <div className="border-t border-line">
        {items.map((x) => (
          <details key={x.q} className="group border-b border-line">
            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-semibold tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
              {x.q}
              <span
                aria-hidden
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-colors group-hover:bg-ink/10"
              >
                <span className="absolute h-[1.5px] w-3 bg-ink" />
                <span className="absolute h-3 w-[1.5px] bg-ink transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <div className="max-w-[44rem] pb-7 pr-12 text-[16.5px] leading-relaxed text-ink-soft">{x.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
