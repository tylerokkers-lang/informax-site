"use client";

import { motion, useReducedMotion } from "framer-motion";
import CloudChrome from "./CloudChrome";

const BY_SPACE = [
  ["Restaurants", 92],
  ["Spa", 78],
  ["Guest Directory", 64],
  ["Meetings & Events", 41],
  ["Gym", 27],
] as const;

const METHODS = [
  { name: "Informax Touch", pct: 48, cls: "bg-glow" },
  { name: "Informax Scan", pct: 39, cls: "bg-brass-light" },
  { name: "Direct", pct: 13, cls: "bg-white/40" },
];

const HOURS = [8, 12, 22, 30, 26, 18, 24, 34, 42, 58, 66, 48, 30, 18];

/** Illustrative Activity view. Aggregate interaction counts only. */
export default function ActivityPanel() {
  const reduce = useReducedMotion();
  const grow = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scaleX: 0 },
          whileInView: { scaleX: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  return (
    <CloudChrome>
      <div className="p-5 sm:p-7">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-cream-mute">Interactions, last 30 days</div>
            <div className="mt-2 font-serif-display text-[44px] leading-none text-white">3,455</div>
          </div>
          <div className="flex h-12 items-end gap-[3px]" aria-hidden="true">
            {HOURS.map((h, i) => (
              <span key={i} className="w-1.5 bg-brass-light/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          {BY_SPACE.map(([name, v], i) => (
            <div key={name}>
              <div className="mb-1.5 flex justify-between text-[12px] text-cream">
                <span>{name}</span>
                <span className="text-cream-mute">{Math.round(v * 13.4)}</span>
              </div>
              <div className="h-[3px] bg-white/10">
                <motion.div className="h-full origin-left bg-brass-light" style={{ width: `${v}%` }} {...grow(i * 0.08)} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream-mute">How guests arrive</div>
          <div className="flex h-2 w-full overflow-hidden" aria-hidden="true">
            {METHODS.map((m) => (
              <span key={m.name} className={m.cls} style={{ width: `${m.pct}%` }} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-cream-mute">
            {METHODS.map((m) => (
              <span key={m.name} className="flex items-center gap-1.5">
                <i className={`h-1.5 w-1.5 shrink-0 ${m.cls}`} />
                <span className="truncate">{m.name}</span>
                <span className="text-white">{m.pct}%</span>
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[10.5px] text-cream-mute">Illustrative data. Aggregate counts only.</p>
      </div>
    </CloudChrome>
  );
}
