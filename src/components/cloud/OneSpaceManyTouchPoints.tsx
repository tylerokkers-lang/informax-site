"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";

const N = 20;
const CELLS = Array.from({ length: N * N }, (_, k) => {
  const r = Math.floor(k / N);
  const c = k % N;
  return Math.round(Math.hypot(r - (N - 1) / 2, c - (N - 1) / 2) * 42);
});
const VERSIONS = ["Autumn Guest Directory", "Winter Guest Directory"];

/**
 * One Guest Directory Space feeding 400 bedroom Touch Points. Changing the
 * Space once sends a wave across every connected room.
 */
export default function OneSpaceManyTouchPoints() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [version, setVersion] = useState(0);
  const [count, setCount] = useState(400);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduce || manual) return;
    const t = window.setInterval(() => setVersion((v) => (v + 1) % 2), 5200);
    return () => window.clearInterval(t);
  }, [inView, reduce, manual]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1300, 1);
      setCount(Math.round(400 * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [version, reduce]);

  const on = version === 1;

  return (
    <div ref={ref} className="grid items-center gap-12 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <div className="border border-white/12 bg-charcoal-850 p-6">
          <div className="mb-8 flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center border border-white/10 text-brass-light">
              <BookOpen size={19} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream-mute">One Space</span>
          </div>
          <div className="font-serif-display text-[26px] leading-tight text-white">Guest Directory</div>
          <div className="mt-2 text-[13px] text-cream-mute" aria-live="polite">
            {VERSIONS[version]}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setManual(true);
            setCount(0);
            setVersion((v) => (v + 1) % 2);
          }}
          className="mt-5 border-b border-white/40 pb-1 text-[14px] font-medium text-white transition-colors hover:border-white"
        >
          Change the Guest Directory
        </button>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="font-serif-display text-[52px] leading-none text-white tabular-nums">
            {reduce ? 400 : count}
            <span className="text-cream-mute"> / 400</span>
          </div>
          <div className="mt-2 text-[13px] text-cream-mute">bedroom Touch Points showing the current directory</div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex justify-between text-[10px] uppercase tracking-[0.2em] text-cream-mute">
          <span>Room 101</span>
          <span>Room 400</span>
        </div>
        <div
          className="grid gap-[3px] sm:gap-1"
          style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
          aria-hidden="true"
        >
          {CELLS.map((delay, k) => (
            <span
              key={k}
              className={`aspect-square transition-colors duration-500 ${on ? "bg-glow" : "bg-white/20"}`}
              style={{ transitionDelay: reduce ? "0ms" : `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
