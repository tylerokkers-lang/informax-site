"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface VideoHeroProps {
  videoMp4: string;
  videoWebm: string;
  poster: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  showScrollCue?: boolean;
}

/**
 * Shared cinematic video-hero engine. Each page that uses this passes its
 * own video/copy props — there is no shared video constant, so the
 * homepage's film and the hospitality page's film can never collide or
 * overwrite one another. To swap either film, replace the files the
 * calling page points at (see Hero.tsx / HospitalityHero.tsx) — no change
 * needed here.
 */
export default function VideoHero({
  videoMp4,
  videoWebm,
  poster,
  eyebrow,
  headline,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  showScrollCue = true,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduceMotion]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-charcoal-950 text-cream">
      {/* Film */}
      <div className="absolute inset-0">
        {!reduceMotion && (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "scale(1.02)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            onCanPlay={() => setLoaded(true)}
            aria-hidden="true"
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            reduceMotion || loaded ? (reduceMotion ? "opacity-100" : "opacity-0") : "opacity-100"
          }`}
        />
      </div>

      {/* Controlled scrim — darkest low-left where type sits, near-clear top-right so the film reads */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(200deg, rgba(6,6,10,0) 40%, rgba(6,6,10,0.55) 68%, rgba(6,6,10,0.88) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(6,6,10,0.5), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-8xl flex-1 flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70"
          >
            <span className="h-px w-8 bg-white/50" />
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.32 }}
            className="max-w-[16ch] font-serif-display font-medium text-[clamp(38px,7vw,88px)] leading-[0.98] tracking-[-0.01em] text-white"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-white/75 md:text-[18px]"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.66 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-2.5 border-b border-white/40 pb-1 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white"
            >
              {primaryLabel}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href={secondaryHref}
              className="text-[15px] font-medium text-white/60 transition-colors duration-300 hover:text-white"
            >
              {secondaryLabel}
            </Link>
          </motion.div>
        </div>

        {showScrollCue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="hidden items-center gap-3 self-center pb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50 md:flex"
          >
            Scroll
            <ArrowDown size={13} className="animate-bounce" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
