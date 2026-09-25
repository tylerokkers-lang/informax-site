"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Dark hero for inner pages. Optional visual sits to the right on desktop, below on mobile. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  visual,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: ReactNode;
  /** Full-bleed background photograph behind the hero. */
  image?: string;
}) {
  const reduce = useReducedMotion();
  const enter = (delay: number, blur = false) => ({
    initial: reduce ? false : { opacity: 0, y: 22, ...(blur ? { filter: "blur(10px)" } : {}) },
    animate: { opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section
      className={`relative overflow-hidden bg-charcoal-950 text-cream ${
        image ? "flex min-h-[88svh] items-end pb-20 pt-[150px] md:pb-28" : "pb-20 pt-[150px] md:pb-28 md:pt-[190px]"
      }`}
    >
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-[70%_30%]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,rgba(6,6,10,0.1)_20%,rgba(6,6,10,0.6)_60%,rgba(6,6,10,0.92)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(6,6,10,0.6)] to-transparent" />
        </>
      )}
      {!image && <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-brass/15 blur-[130px]" />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-glow-deep/[0.07] to-transparent" />
      <div
        className={`relative mx-auto grid w-full max-w-8xl items-center gap-14 px-6 md:px-10 ${
          visual ? "grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20" : ""
        }`}
      >
        <div>
          <motion.p
            {...enter(0.1)}
            className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/65"
          >
            <span className="h-px w-8 bg-white/40" />
            {eyebrow}
          </motion.p>
          <motion.h1
            {...enter(0.2, true)}
            className="max-w-[17ch] text-balance font-serif-display text-[clamp(42px,6.4vw,80px)] font-medium leading-[0.98] tracking-[-0.02em] text-white"
          >
            {title}
          </motion.h1>
          <motion.p {...enter(0.38)} className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-white/72 md:text-[18px]">
            {lede}
          </motion.p>
          <motion.div {...enter(0.5)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={primary.href}
              className="group inline-flex items-center gap-2.5 border-b border-white/40 pb-1 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white"
            >
              {primary.label}
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="text-[15px] font-medium text-white/60 transition-colors duration-300 hover:text-white">
                {secondary.label}
              </Link>
            )}
          </motion.div>
        </div>
        {visual && (
          <motion.div {...enter(0.3)} className="min-w-0">
            {visual}
          </motion.div>
        )}
      </div>
    </section>
  );
}
