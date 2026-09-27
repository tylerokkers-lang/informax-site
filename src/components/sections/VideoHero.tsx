"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

/** Entrance timing for one line of hero copy (see .ix-hero-rise). */
const rise = (y: number, duration: number, delay: number) =>
  ({ "--rise-y": `${y}px`, "--rise-dur": `${duration}s`, "--rise-delay": `${delay}s` }) as CSSProperties;

export interface VideoHeroProps {
  videoMp4: string;
  videoWebm: string;
  poster: string;
  eyebrow: string;
  headline: ReactNode;
  /** Quiet second line under the headline. */
  subline?: ReactNode;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  showScrollCue?: boolean;
  /** Extra even darkening for bright footage, 0 to 1. */
  dim?: number;
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
  subline,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  showScrollCue = true,
  dim = 0,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    // The film is in the server HTML, so the browser starts loading and
    // autoplaying it before React hydrates. Events that fired before this
    // effect ran are gone, so read the element's current state first
    // rather than waiting for an event that may already have happened.
    const onPlaying = () => setPlaying(true);
    if (!video.paused && video.readyState >= 3) onPlaying();
    else {
      video.addEventListener("playing", onPlaying, { once: true });
      if (video.paused) video.play().catch(() => {});
    }

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      video.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-charcoal-950 text-cream">
      {/* Film. The poster is the film's own first frame and sits on top,
          at the same scale, until the film is actually playing — then it
          fades away over identical pixels, so there is no jump or dip. */}
      <div className="absolute inset-0">
        {!reduceMotion && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ transform: "scale(1.02)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
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
          fetchPriority="high"
          style={{ transform: "scale(1.02)" }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
            playing && !reduceMotion ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {dim > 0 && <div className="pointer-events-none absolute inset-0" style={{ background: `rgba(6,6,10,${dim})` }} />}

      {/* Controlled scrim — darkest low-left where type sits, near-clear top-right so the film reads */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(200deg, rgba(6,6,10,0) 40%, rgba(6,6,10,0.55) 68%, rgba(6,6,10,0.88) 100%)",
        }}
      />
      {/* Phones: the copy fills most of the frame, so it gets a little more ground to stand on. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,10,18,0.78)_0%,rgba(6,10,18,0.45)_55%,rgba(6,10,18,0)_85%)] md:hidden" />
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(6,6,10,0.7), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-8xl flex-1 flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <p
            style={rise(14, 0.8, 0.2)}
            className="ix-hero-rise mb-5 text-[15px] font-semibold text-brass-light md:text-[17px]"
          >
            {eyebrow}
          </p>

          <h1
            style={rise(24, 1, 0.32)}
            className="ix-hero-rise max-w-[15ch] text-balance font-serif-display text-[clamp(40px,7.4vw,96px)] leading-[1] text-white"
          >
            {headline}
          </h1>

          {subline && (
            <p
              style={rise(18, 1, 0.45)}
              className="ix-hero-rise mt-4 font-serif-display text-[clamp(21px,2.5vw,32px)] leading-[1.2] text-white/60"
            >
              {subline}
            </p>
          )}

          <p
            style={rise(18, 0.9, 0.5)}
            className="ix-hero-rise mt-7 max-w-[44ch] text-pretty text-[17px] leading-[1.6] text-white/75 md:text-[19px]"
          >
            {description}
          </p>

          <div
            style={rise(14, 0.9, 0.66)}
            className="ix-hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <Link href={primaryHref} className="ix-btn ix-btn-primary group">
              {primaryLabel}
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href={secondaryHref} className="ix-link text-white/70 hover:text-white">
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {showScrollCue && (
          <div
            style={rise(0, 1, 1.1)}
            className="ix-hero-rise hidden items-center gap-3 self-center pb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50 md:flex"
          >
            Scroll
            <ArrowDown size={13} className="animate-bounce" />
          </div>
        )}
      </div>
    </section>
  );
}
