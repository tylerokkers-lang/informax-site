"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { screen, type ScreenName } from "@/lib/screens";
import { QR_PATH, QR_VIEWBOX } from "@/components/cloud/qr-path";

type Step = { title: string; caption: string; admin: ScreenName; phone: ScreenName };

const DEMOS = {
  room: {
    brand: "MARLOWE GRAND",
    heading: "Welcome to Room 324",
    sub: "Scan for your guest directory",
    adminLabel: "Informax Cloud · Room 324",
    steps: [
      { title: "A normal day", caption: "Room 324 shows the Hotel Guest Directory.", admin: "hotel-room-324", phone: "guest-room-324-directory" },
      { title: "Publish temporary content", caption: "The manager picks Conference Information and chooses when it ends.", admin: "hotel-room-324-temporary", phone: "guest-room-324-directory" },
      { title: "Same QR code, new content", caption: "The next scan opens Conference Information. The card on the wall has not changed.", admin: "hotel-room-324-temporary", phone: "guest-room-324-conference" },
      { title: "Then it returns", caption: "When the time is up, Room 324 goes back to the Hotel Guest Directory. Nobody has to remember.", admin: "hotel-room-324", phone: "guest-room-324-directory" },
    ] satisfies Step[],
  },
  table: {
    brand: "COPPER TABLE",
    heading: "Table 7",
    sub: "Scan for the menu",
    adminLabel: "Informax Cloud · Table 7",
    steps: [
      { title: "Normal service", caption: "Table 7 shows the Terrace Menu.", admin: "restaurant-spaces", phone: "guest-table-7-terrace" },
      { title: "Publish temporary menu", caption: "The manager picks the Wine Pairing Menu and sets when it ends.", admin: "restaurant-table-7-temporary", phone: "guest-table-7-terrace" },
      { title: "Same QR code, new menu", caption: "Guests at Table 7 now see the Wine Pairing Menu. No reprinting, no new table card.", admin: "restaurant-table-7-temporary", phone: "guest-table-7-wine" },
      { title: "Back to the Terrace Menu", caption: "At the end time, Table 7 returns to the Terrace Menu automatically.", admin: "restaurant-spaces", phone: "guest-table-7-terrace" },
    ] satisfies Step[],
  },
} as const;

const STEP_MS = 4200;

/**
 * Plays the real Informax Cloud screens and the real guest screen side by side
 * while the printed QR code stays exactly the same. Runs while on screen,
 * pauses when a step is chosen by hand, and shows a still step with reduced motion.
 */
export default function SameCodeDemo({ variant }: { variant: keyof typeof DEMOS }) {
  const demo = DEMOS[variant];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || manual || reduce) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % demo.steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [inView, manual, reduce, step, demo.steps.length]);

  const adminNames = Array.from(new Set(demo.steps.map((s) => s.admin)));
  const phoneNames = Array.from(new Set(demo.steps.map((s) => s.phone)));
  const cur = demo.steps[step];
  const adminShot = screen(adminNames[0]);
  const phoneShot = screen(phoneNames[0]);
  const fade = reduce ? "" : "transition-opacity duration-700 ease-out";

  return (
    <div ref={ref}>
      <div className="grid items-center gap-10 lg:grid-cols-[210px_minmax(0,1fr)_230px] lg:gap-8">
        {/* The printed card: never changes */}
        <div className="mx-auto w-full max-w-[210px]">
          <div className="border-[8px] border-[#25384f] bg-[#f8f7f4] px-5 py-7 text-center shadow-2xl">
            <p className="text-[10px] tracking-[0.2em] text-ink-mute">{demo.brand}</p>
            <h3 className="mt-5 font-serif-display text-[22px] leading-tight text-ink">{demo.heading}</h3>
            <svg viewBox={QR_VIEWBOX} className="mx-auto my-5 h-24 w-24" shapeRendering="crispEdges" role="img" aria-label="The printed QR code. It stays the same in every step.">
              <path stroke="#18283d" d={QR_PATH} />
            </svg>
            <p className="text-[11px] text-ink-mute">{demo.sub}</p>
          </div>
          <p className="mt-4 text-center text-[13px] text-cream-mute">The printed QR code. It never changes.</p>
        </div>

        {/* The real Cloud screen */}
        <div className="min-w-0">
          <p className="mb-3 text-[13px] font-medium text-cream-mute">{demo.adminLabel}</p>
          <div className="relative overflow-hidden rounded-[16px] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.1)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={adminShot.src} alt="" width={adminShot.w} height={adminShot.h} className="invisible block h-auto w-full" aria-hidden />
            {adminNames.map((n) => {
              const s = screen(n);
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={n} src={s.src} alt={n === cur.admin ? `Informax Cloud: ${cur.title}` : ""} aria-hidden={n !== cur.admin} width={s.w} height={s.h} loading="lazy" className={`absolute inset-0 h-full w-full object-cover object-top ${fade} ${n === cur.admin ? "opacity-100" : "opacity-0"}`} />
              );
            })}
          </div>
        </div>

        {/* The real guest screen */}
        <div className="mx-auto w-full max-w-[230px]">
          <p className="mb-3 text-center text-[13px] font-medium text-cream-mute lg:text-left">What the guest sees</p>
          <div className="relative overflow-hidden rounded-[36px] border-[7px] border-[#0b1524] bg-[#0b1524] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={phoneShot.src} alt="" width={phoneShot.w} height={phoneShot.h} className="invisible block h-auto w-full" aria-hidden />
            {phoneNames.map((n) => {
              const s = screen(n);
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={n} src={s.src} alt={n === cur.phone ? `Guest screen after scanning: ${cur.title}` : ""} aria-hidden={n !== cur.phone} width={s.w} height={s.h} loading="lazy" className={`absolute inset-0 h-full w-full rounded-[28px] object-cover object-top ${fade} ${n === cur.phone ? "opacity-100" : "opacity-0"}`} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Steps">
        {demo.steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-pressed={i === step}
            onClick={() => { setManual(true); setStep(i); }}
            className={`relative overflow-hidden rounded-xl border px-4 py-4 text-left transition-colors ${i === step ? "border-white/40 bg-white/[0.07]" : "border-white/10 hover:border-white/30"}`}
          >
            <span className="block text-[12px] text-brass-light">Step {i + 1}</span>
            <span className="mt-1 block text-[15px] font-semibold text-white">{s.title}</span>
            {i === step && !manual && !reduce && inView && (
              <span key={step} className="ix-step-bar absolute bottom-0 left-0 h-[2px] bg-brass" style={{ animationDuration: `${STEP_MS}ms` }} />
            )}
          </button>
        ))}
      </div>
      <p className="mt-6 min-h-[3.2em] max-w-[60ch] text-[17px] leading-relaxed text-white" aria-live="polite">{cur.caption}</p>
    </div>
  );
}
