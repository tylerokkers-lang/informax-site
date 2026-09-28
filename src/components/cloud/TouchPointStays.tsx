"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Globe } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import TouchPoint from "./TouchPoint";

const STATES = [
  { when: "Today", kind: "pdf", title: "Spa Treatments", note: "PDF" },
  { when: "Tomorrow", kind: "pdf", title: "Seasonal Offer", note: "PDF" },
  { when: "Next month", kind: "web", title: "Spa booking page", note: "Website" },
] as const;

/**
 * The central idea: the physical Access Point never changes, only the Space
 * behind it. Cycles on screen; tabs let visitors jump to a moment.
 */
export default function TouchPointStays() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduce || manual) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % STATES.length), 3600);
    return () => window.clearInterval(t);
  }, [inView, reduce, manual]);

  const cur = STATES[i];

  return (
    <div ref={ref} className="grid items-center gap-12 grid-cols-1 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-b from-[#181c24] to-[#0e1117] py-14 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(223,227,234,0.12),transparent_62%)]" />
        <div className="relative flex flex-col items-center">
          <TouchPoint label="Spa" size="lg" active />
          <div className="mt-8 flex items-center gap-2 text-[13px] font-medium text-cream-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-glow" />
            Installed once. Unchanged.
          </div>
        </div>
      </div>

      <div>
        <div role="tablist" aria-label="When" className="mb-8 flex border-b border-white/12">
          {STATES.map((st, n) => (
            <button
              key={st.when}
              role="tab"
              type="button"
              aria-selected={n === i}
              onClick={() => {
                setManual(true);
                setI(n);
              }}
              className={`-mb-px flex-1 border-b-2 pb-3 text-left text-[13px] transition-colors duration-300 sm:flex-none sm:pr-10 ${
                n === i ? "border-glow text-white" : "border-transparent text-cream-mute hover:text-white"
              }`}
            >
              {st.when}
            </button>
          ))}
        </div>

        <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream-mute">
          The Spa Space serves
        </div>
        <div className="relative min-h-[196px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.title}
              initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/12 bg-charcoal-850 p-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center border border-white/10 text-brass-light">
                  {cur.kind === "web" ? <Globe size={19} /> : <FileText size={19} />}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-mute">
                  {cur.note}
                </span>
              </div>
              <div className="font-serif-display text-[28px] leading-tight text-white">{cur.title}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-cream-mute">
          The Access Point in the Spa stays exactly where it is. The Hotel
          changes the Spa Space in Informax Cloud, and the next guest sees
          what is current.
        </p>
      </div>
    </div>
  );
}
