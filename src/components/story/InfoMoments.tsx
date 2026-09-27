"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const MOMENTS = [
  { place: "Spa", line: "The treatment menu at the Spa." },
  { place: "Meetings & Events", line: "The floor plan outside a meeting room." },
  { place: "Gym", line: "The class timetable in the Gym." },
  { place: "Guest Rooms", line: "The Guest Directory in a bedroom." },
  { place: "Reception", line: "The booking page beside Reception." },
];

/**
 * Five small moments, read one at a time. The active line is bright, the
 * rest recede, so the section slows the page down instead of listing.
 */
export default function InfoMoments() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % MOMENTS.length), 2600);
    return () => window.clearInterval(t);
  }, [inView, reduce]);

  return (
    <div ref={ref}>
      <ol className="border-t border-line">
        {MOMENTS.map((m, i) => {
          const on = reduce || i === active;
          return (
            <li
              key={m.place}
              onMouseEnter={() => setActive(i)}
              className="grid grid-cols-1 gap-1 border-b border-line py-6 md:grid-cols-[220px_1fr] md:items-baseline md:gap-10 md:py-8"
            >
              <span
                className={`text-[14px] font-semibold transition-colors duration-700 ${
                  on ? "text-brass-deep" : "text-ink-mute/70"
                }`}
              >
                {m.place}
              </span>
              <span
                className={`font-serif-display text-[clamp(24px,3.4vw,44px)] leading-[1.12] tracking-[-0.015em] transition-colors duration-700 ${
                  on ? "text-ink" : "text-ink/25"
                }`}
              >
                {m.line}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
