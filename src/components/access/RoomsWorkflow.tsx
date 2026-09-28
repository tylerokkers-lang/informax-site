"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, FileText, Globe, Search } from "lucide-react";

const STEPS = ["Search", "Open", "See what guests see", "Change", "Choose how long", "Publish"] as const;

const ROOMS = [
  { name: "Room 1001", area: "Floor 10", shows: "Hotel Directory" },
  { name: "Room 1002", area: "Floor 10", shows: "Hotel Directory" },
  { name: "Room 1004", area: "Floor 10", shows: "Hotel Directory" },
];

const CHOICES = [
  { name: "Hotel Directory", kind: "pdf" },
  { name: "Wedding Welcome", kind: "pdf" },
  { name: "In-room Dining", kind: "web" },
] as const;

/**
 * The everyday workflow, told in six small steps. The frame uses the
 * Informax Cloud interface language (navy surfaces, hairlines, Cloud
 * blue) and shows only what a person needs at each step.
 */
export default function RoomsWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduce || manual) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2800);
    return () => window.clearInterval(t);
  }, [inView, reduce, manual]);

  const s = reduce && !manual ? STEPS.length - 1 : step;
  const opened = s >= 1;

  return (
    <div ref={ref} className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ol className="border-t border-line-dark">
        {STEPS.map((label, i) => (
          <li key={label} className="border-b border-line-dark">
            <button
              type="button"
              onClick={() => {
                setManual(true);
                setStep(i);
              }}
              aria-current={i === s ? "step" : undefined}
              className="flex w-full items-center gap-4 py-4 text-left"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-colors duration-300 ${
                  i === s ? "bg-brass text-white" : i < s ? "bg-white/10 text-white" : "bg-white/[0.05] text-cream-mute"
                }`}
              >
                {i < s ? <Check size={13} /> : i + 1}
              </span>
              <span className={`text-[17px] transition-colors duration-300 ${i === s ? "font-semibold text-white" : "text-cream-mute"}`}>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* The app frame */}
      <div
        className="ixp overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.7)]"
        role="img"
        aria-label="Informax Cloud: Room 1001 shows Wedding Welcome until tomorrow at 11:00, then goes back to the Hotel Directory."
      >
        <div className="min-h-[430px] p-5 sm:p-7" aria-hidden>
          <p className="ixp-label mb-1.5">Rooms &amp; Areas</p>
          {!opened ? (
            <>
              <div className="ixp-input is-focus mt-3 flex items-center gap-2.5">
                <Search size={16} className="text-ix-dim" />
                <span className="text-ix-cream">1001</span>
                <span className="h-4 w-px animate-pulse bg-ix-bright" />
              </div>
              <ul className="mt-4 divide-y divide-white/[0.06]">
                {ROOMS.map((r, i) => (
                  <li key={r.name} className={`flex items-center justify-between gap-3 py-3.5 ${i === 0 ? "" : "opacity-45"}`}>
                    <div>
                      <p className="text-[15px] font-medium text-ix-cream">{r.name}</p>
                      <p className="text-[13px] text-ix-dim">{r.area}</p>
                    </div>
                    <p className="text-[13px] text-ix-muted">{r.shows}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-[1.9rem] leading-tight">Room 1001</h3>
              <p className="mt-1 text-[14px] text-ix-muted">Floor 10 · Access Point and Code in place</p>

              <div className="ixp-card mt-6 p-5">
                <p className="ixp-label">{s >= 5 ? "Guests see now" : "Guests currently see"}</p>
                <div className="mt-3 flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/[0.08] text-ix-cream">
                    <FileText size={20} />
                  </span>
                  <div>
                    <p className="text-[16px] font-medium text-ix-cream">{s >= 5 ? "Wedding Welcome" : "Hotel Directory"}</p>
                    <p className="text-[13px] text-ix-dim">{s >= 5 ? "Until tomorrow at 11:00, then back to Hotel Directory" : "Default Landing Page"}</p>
                  </div>
                </div>
                {s === 2 && (
                  <div className="mt-4 rounded-[14px] bg-white p-4 text-[#0b1524]">
                    <p className="text-[10px] font-semibold text-[#0b1524]/50">Maison Aurelia</p>
                    <p className="mt-1 text-[15px] font-semibold">Hotel Directory</p>
                    <div className="mt-3 space-y-1.5">
                      {["Dining", "Spa & Wellness", "Guest Services"].map((l) => (
                        <div key={l} className="flex justify-between border-b border-[#0b1524]/10 pb-1.5 text-[12px]">
                          {l} <span className="text-[#0b1524]/40">›</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(s === 3 || s === 4) && (
                <div className="ixp-card mt-4 p-5">
                  {s === 3 ? (
                    <>
                      <p className="ixp-label mb-3">Change content</p>
                      <ul className="space-y-2">
                        {CHOICES.map((c) => {
                          const on = c.name === "Wedding Welcome";
                          return (
                            <li
                              key={c.name}
                              className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] ${
                                on ? "bg-ix-brand/15 text-white ring-1 ring-ix-brand/60" : "text-ix-muted"
                              }`}
                            >
                              {c.kind === "web" ? <Globe size={16} /> : <FileText size={16} />}
                              {c.name}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-1 rounded-[12px] bg-white/[0.05] p-1 text-center text-[14px]">
                        <span className="rounded-[9px] py-2 text-ix-muted">Until changed</span>
                        <span className="rounded-[9px] bg-white/[0.12] py-2 font-medium text-white">For a while</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                        <div>
                          <p className="text-ix-dim">Until</p>
                          <p className="mt-0.5 text-ix-cream">Tomorrow · 11:00</p>
                        </div>
                        <div>
                          <p className="text-ix-dim">Then back to</p>
                          <p className="mt-0.5 text-ix-cream">Hotel Directory</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                {s >= 5 ? (
                  <p className="flex items-center gap-2 text-[14px] text-ix-pos">
                    <Check size={16} /> Published
                  </p>
                ) : (
                  <span />
                )}
                <span className={`ixp-btn ixp-btn-primary ${s === 4 ? "is-hover" : ""} ${s >= 5 ? "opacity-50" : ""}`}>Publish</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
