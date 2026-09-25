"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const MP4 = "/video/cloud-hero.mp4";
const WEBM = "/video/cloud-hero.webm";
const POSTER = "/video/cloud-hero-poster.jpg";

/**
 * The product launch moment. A full-bleed film band that only starts
 * loading when it is about to be seen, then the product itself underneath.
 */
export default function MeetCloud({ children }: { children: ReactNode }) {
  const band = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useInView(band, { amount: 0.1 });
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Start fetching the film only when the band is about to scroll into view.
  useEffect(() => {
    const el = band.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, load]);

  return (
    <section id="informax-cloud" className="relative scroll-mt-20 bg-charcoal-950 text-cream">
      <div ref={band} className="relative flex min-h-[78svh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POSTER} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        {load && (
          <video
            ref={video}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${ready ? "opacity-100" : "opacity-0"}`}
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
            onCanPlay={() => setReady(true)}
            aria-hidden
          >
            <source src={WEBM} type="video/webm" />
            <source src={MP4} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,16,0.7)_0%,rgba(10,10,16,0.45)_40%,rgba(10,10,16,0.94)_100%)]" />
        <div className="relative mx-auto w-full max-w-8xl px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <Reveal blur>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
              <span className="h-px w-8 bg-white/50" />
              Introducing
            </p>
            <h2 className="font-serif-display text-[clamp(52px,9vw,128px)] font-medium leading-[0.92] tracking-[-0.03em] text-white">
              Meet Informax <span className="italic text-glow">Cloud.</span>
            </h2>
            <p className="mt-8 max-w-[40ch] text-[18px] leading-relaxed text-white/80 md:text-[20px]">
              One place to control what guests see, across every Space in your Hotel.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto max-w-8xl px-6 pb-24 pt-6 md:px-10 md:pb-36">{children}</div>
    </section>
  );
}
