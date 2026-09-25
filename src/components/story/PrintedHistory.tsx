"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const EDITIONS = [
  { title: "Spa Treatments", note: "Printed January" },
  { title: "Spa Treatments", note: "Reprinted March · new prices" },
  { title: "Spa Treatments", note: "Reprinted June · summer rituals" },
  { title: "Spa Treatments", note: "Reprinted September · new therapist" },
];

/**
 * The traditional cost of change: every update to the information means a
 * new physical edition. Editions settle onto the stack; the older ones are
 * marked as out of date. Calm, not alarmist.
 */
export default function PrintedHistory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(1);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setInterval(() => setN((v) => (v >= EDITIONS.length ? 1 : v + 1)), 2200);
    return () => window.clearInterval(t);
  }, [inView, reduce]);

  const shown = reduce ? EDITIONS.length : n;

  return (
    <div ref={ref} className="relative mx-auto h-[420px] w-full max-w-[400px]" aria-hidden>
      {EDITIONS.map((e, i) => {
        const visible = i < shown;
        const top = i === shown - 1;
        const depth = shown - 1 - i;
        return (
          <div
            key={e.note}
            className="absolute left-1/2 top-24 w-[270px] bg-[#fbf8f2] p-7 shadow-[0_20px_50px_rgba(20,20,28,0.16)] transition-all duration-[900ms]"
            style={{
              transform: visible
                ? `translate(calc(-50% + ${depth * -18}px), ${depth * -30}px) rotate(${(i % 2 ? 1 : -1) * (1 + depth * 0.8)}deg)`
                : "translate(-50%, 40px) rotate(0deg)",
              opacity: visible ? 1 - depth * 0.12 : 0,
              zIndex: i,
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#8b7a5c]">Maison Aurelia</span>
              <span
                className={`text-[8px] font-semibold uppercase tracking-[0.18em] text-[#b0613f] transition-opacity duration-700 ${!top && visible ? "opacity-100" : "opacity-0"}`}
              >
                Out of date
              </span>
            </div>
            <div className="mt-3 font-serif-display text-[26px] leading-tight text-ink">{e.title}</div>
            <div className="mt-5 space-y-2">
              {[88, 64, 76, 52, 70, 58].map((w, k) => (
                <div key={k} className="h-[3px] bg-ink/10" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-6 text-[10px] text-ink-mute">{e.note}</div>
          </div>
        );
      })}
    </div>
  );
}
