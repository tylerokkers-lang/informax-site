"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const STOPS = [
  { n: "01", label: "Front Desk", note: "Checked in, tag in hand." },
  { n: "02", label: "Room", note: "Wi-Fi, amenities, house rules." },
  { n: "03", label: "Breakfast", note: "Times, menus, dietary notes." },
  { n: "04", label: "Spa", note: "Treatments, availability, booking." },
  { n: "05", label: "Dining", note: "Restaurants, bars, reservations." },
  { n: "06", label: "Concierge", note: "Local recommendations, on demand." },
];

export default function GuestJourneyStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: trackRef });
  const lineScale = useTransform(scrollXProgress, [0, 1], [0.08, 1]);

  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-24 text-cream md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mb-16 max-w-xl md:mb-20">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
            The Guest Journey
          </span>
          <h2 className="font-serif-display font-medium leading-[1.1] tracking-[-0.01em] text-[clamp(28px,3.8vw,46px)] text-white">
            One stay. One directory. Every moment covered.
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-8xl px-6 md:px-10">
        <div className="absolute left-6 right-6 top-[38px] hidden h-px bg-white/10 md:block md:left-10 md:right-10" />
        <motion.div
          style={{ scaleX: lineScale }}
          className="absolute left-6 top-[38px] hidden h-px origin-left bg-brass-light md:left-10 md:block"
        />

        <div
          ref={trackRef}
          className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-10 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:px-0"
        >
          {STOPS.map((stop, i) => (
            <div
              key={stop.n}
              className="w-[68vw] shrink-0 snap-start md:w-auto md:shrink"
            >
              <div className="relative z-[2] mb-8 flex h-[18px] items-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === 0 ? "bg-brass-light" : "bg-white/25"
                  }`}
                />
              </div>
              <span className="mb-3 block font-serif-display text-[13px] italic text-brass-light">
                {stop.n}
              </span>
              <h3 className="mb-2 font-serif-display text-[26px] font-medium leading-tight text-white md:text-[28px]">
                {stop.label}
              </h3>
              <p className="max-w-[22ch] text-[14px] leading-relaxed text-cream-mute">
                {stop.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
