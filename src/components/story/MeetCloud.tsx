"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const MP4 = "/video/meet-cloud.mp4";
const WEBM = "/video/meet-cloud.webm";
const POSTER = "/video/meet-cloud-poster.jpg";

/**
 * The homepage's closing reveal: the existing Informax Cloud film band,
 * an introduction (not the product tour) and one clear next step to
 * /informax-cloud. The film only starts loading when it is about to be
 * seen, and only plays while on screen.
 */
export default function MeetCloud() {
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
      <div ref={band} className="relative flex min-h-[92svh] items-end overflow-hidden">
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
            onPlaying={() => setReady(true)}
            aria-hidden
          >
            <source src={WEBM} type="video/webm" />
            <source src={MP4} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.55)_0%,rgba(6,10,18,0.35)_38%,rgba(6,10,18,0.92)_100%)]" />
        <div className="relative mx-auto w-full max-w-8xl px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <Reveal blur>
            <p className="mb-5 text-[15px] font-semibold text-brass-light md:text-[17px]">Meet Informax Cloud</p>
            <h2 className="max-w-[16ch] font-serif-display text-[clamp(40px,7vw,92px)] leading-[1.02] text-white">
              One place to control what your guests see.
            </h2>
            <p className="mt-7 max-w-[44ch] text-pretty text-[17px] leading-[1.6] text-white/75 md:text-[20px]">
              Informax Cloud is where your Hotel manages the information behind every Informax Touch Point.
              Update it once, from anywhere, and every guest sees the current version.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/informax-cloud" className="ix-btn ix-btn-primary group">
                Discover Informax Cloud
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/enquire" className="ix-link text-white/70 hover:text-white">
                Talk to Informax
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
