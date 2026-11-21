"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { BrowserFrame, GUEST_SCALE, PhoneFrame } from "@/components/x/Devices";
import ScanPoint from "@/components/x/ScanPoint";

/**
 * The hero's demonstration of Informax Cloud, in three beats:
 * open a Scan Point in Cloud, publish, and the guest's phone changes.
 * Real Cloud and guest screens; the Scan Point plate is drawn. It plays only
 * while on screen, stops for reduced motion (showing the finished state),
 * and every beat can be chosen by hand.
 */
const BEATS = [
  { label: "Open the Scan Point", body: "Coffee Table, in Bedrooms. Cloud shows what guests see now.", ms: 3600 },
  { label: "Publish the update", body: "New dinner hours. Every printed copy follows at once.", ms: 3200 },
  { label: "Guests see it", body: "The next scan opens the new directory. Nothing reprinted.", ms: 4200 },
] as const;

/** Where the dinner row sits on the captured guest directory (fractions of the screen height). */
const DINNER = { top: 0.318, height: 0.042 };

const noSubscribe = () => () => {};

export default function HeroStage() {
  // Reduced motion is only known in the browser: apply it after hydration so server and client agree.
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const prefersReduced = useReducedMotion();
  const reduce = hydrated && Boolean(prefersReduced);
  const box = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manual, setManual] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const playing = visible && !reduce && !manual;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setBeat((b) => {
        const next = (b + 1) % BEATS.length;
        if (next === 0) setCycle((c) => c + 1);
        return next;
      });
    }, BEATS[beat].ms);
    return () => clearTimeout(t);
  }, [playing, beat]);

  // Reduced motion: hold the outcome.
  const shown = reduce && !manual ? 2 : beat;
  const published = shown >= 1;
  const guest = shown >= 2;

  return (
    <div ref={box}>
      <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#eef1f5_0%,#e5e9ef_100%)] sm:aspect-[16/11] md:rounded-[40px] lg:aspect-[16/9.2]">
        {/* Soft light and a floor line: the stage the objects stand on. */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_0%,rgba(255,255,255,0.9),transparent_70%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(180deg,rgba(11,21,36,0.035),rgba(11,21,36,0.07))]" />

        {/* Informax Cloud, on a computer. */}
        <div className="absolute left-[5%] right-[5%] top-[6%] sm:left-[4%] sm:right-auto sm:top-[8%] sm:w-[70%]">
          <BrowserFrame screens={["deskBedrooms", "deskDirectoryPublished"]} active={published ? 1 : 0} priority sizes="(min-width: 1180px) 820px, (min-width: 640px) 70vw, 90vw">
            <div
              aria-hidden
              className={`absolute right-[3%] top-[4%] flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[clamp(10px,1.1vw,13px)] font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(11,21,36,0.4)] transition-all duration-500 ${
                published ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-moss" />
              Live on every Coffee Table
            </div>
          </BrowserFrame>
        </div>

        {/* The physical Scan Point, standing on the floor of the stage. */}
        <div className="absolute bottom-[5%] left-[8%] w-[24%] sm:bottom-[7%] sm:left-auto sm:right-[27%] sm:w-[12.5%]">
          <ScanPoint place="Coffee Table" sub="Guest directory" finish="navy" pulse={published ? `p-${cycle}` : null} />
        </div>

        {/* The guest's phone. */}
        <div className="absolute bottom-[4%] right-[7%] w-[38%] sm:bottom-auto sm:right-[5%] sm:top-[13%] sm:w-[19%]">
          <div className="relative">
            <PhoneFrame screens={["guestDirectoryBefore", "guestDirectoryAfter"]} active={guest ? 1 : 0} priority sizes="(min-width: 1024px) 230px, 38vw" />
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-[8%] rounded-[5px] bg-emerald-400/12 shadow-[0_0_0_2px_rgba(16,185,129,0.9)] transition-opacity duration-500 ${guest ? "opacity-100" : "opacity-0"}`}
              style={{ top: `calc(1.3% + ${DINNER.top * 97.4 * GUEST_SCALE}%)`, height: `${DINNER.height * 97.4 * GUEST_SCALE}%` }}
            />
          </div>
        </div>
      </div>

      {/* The three beats: captions that double as controls. */}
      <ol className="mx-auto mt-6 grid max-w-[1000px] grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-6 md:mt-8">
        {BEATS.map((b, i) => {
          const on = shown === i;
          return (
            <li key={b.label}>
              <button
                type="button"
                onClick={() => {
                  setManual(true);
                  setBeat(i);
                }}
                aria-pressed={on}
                className="group w-full rounded-2xl px-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-ink/10">
                  {on ? (
                    <span
                      key={`${i}-${cycle}-${manual}`}
                      className={`absolute inset-0 rounded-full bg-ink ${playing ? "x-bar" : ""}`}
                      style={{ ["--x-bar-dur" as string]: `${b.ms}ms` }}
                    />
                  ) : shown > i ? (
                    <span className="absolute inset-0 rounded-full bg-ink/40" />
                  ) : null}
                </span>
                <span className={`mt-3 flex items-baseline gap-2 text-[15px] font-semibold transition-colors duration-500 ${on ? "text-ink" : "text-ink-mute group-hover:text-ink"}`}>
                  <span className="x-num text-ink-mute">0{i + 1}</span>
                  {b.label}
                </span>
                <span className="mt-1 hidden text-[14px] leading-snug text-ink-mute sm:block">{b.body}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
