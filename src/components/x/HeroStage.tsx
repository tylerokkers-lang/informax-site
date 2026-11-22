"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { BrowserFrame, GUEST_SCALE, PhoneFrame } from "@/components/x/Devices";
import ScanPoint from "@/components/x/ScanPoint";

/**
 * The hero's demonstration of Informax Cloud, in three beats:
 * open a Scan Point in Cloud, publish, and the guest's phone changes.
 * Real Cloud and guest screens; the Scan Point plate is drawn. A signal
 * travels Cloud → Scan Point → phone so the relationship is visible, and the
 * element each beat is about comes forward.
 *
 * It plays only while on screen, has pause, play and replay controls, every
 * beat can be chosen by hand, and reduced motion shows the finished state
 * with no movement (the controls still step through it).
 */
const BEATS = [
  { label: "Open the Scan Point", body: "Coffee Table, in Bedrooms. Cloud shows exactly what guests see now.", ms: 3800 },
  { label: "Publish the update", body: "New dinner hours, published once. Every printed copy follows.", ms: 3400 },
  { label: "Guests see it", body: "The next scan opens the new directory. Nothing is reprinted.", ms: 4600 },
] as const;

/** Where the dinner row sits on the captured guest directory (fractions of the screen height). */
const DINNER = { top: 0.318, height: 0.042 };

const noSubscribe = () => () => {};

const control =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_0_0_1px_rgba(11,21,36,0.08),0_8px_20px_-10px_rgba(11,21,36,0.35)] backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass";

export default function HeroStage() {
  // Reduced motion is only known in the browser: apply it after hydration so server and client agree.
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const prefersReduced = useReducedMotion();
  const reduce = hydrated && Boolean(prefersReduced);

  const box = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  // Reduced motion starts on the outcome, until someone steps through it.
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const playing = visible && !reduce && !paused;
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

  const shown = reduce && !touched ? 2 : beat;
  const published = shown >= 1;
  const guest = shown >= 2;

  const choose = (i: number) => {
    setTouched(true);
    setPaused(true);
    setBeat(i);
  };
  const replay = () => {
    setTouched(true);
    setBeat(0);
    setCycle((c) => c + 1);
    setPaused(false);
  };
  const stopped = paused || reduce;

  return (
    <div ref={box}>
      <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#eef1f5_0%,#e4e8ee_100%)] sm:aspect-[16/11] md:rounded-[40px] lg:aspect-[16/9.2]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_0%,rgba(255,255,255,0.95),transparent_70%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(180deg,rgba(11,21,36,0.03),rgba(11,21,36,0.07))]" />

        {/* Informax Cloud, on a computer. Forward for the first two beats, quieter once the guest has it. */}
        <div
          className={`absolute left-[5%] right-[5%] top-[6%] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:left-[4%] sm:right-auto sm:top-[8%] sm:w-[70%] ${
            guest ? "opacity-80 sm:scale-[0.985]" : "opacity-100"
          }`}
        >
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

        {/* The signal: Cloud to the Scan Point on publish, then the Scan Point to the phone. Wide layouts only. */}
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
          <path
            d="M 60 36 C 63 50, 65 60, 67.2 69"
            fill="none"
            stroke="#0693e3"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            className={`transition-[stroke-dashoffset,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${published ? "opacity-100" : "opacity-0"}`}
            style={{ strokeDashoffset: published ? 0 : 1 }}
          />
          <path
            d="M 70.5 69 C 74 62, 77 58, 81 55"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            className={`transition-[stroke-dashoffset,opacity] delay-150 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${guest ? "opacity-100" : "opacity-0"}`}
            style={{ strokeDashoffset: guest ? 0 : 1 }}
          />
        </svg>

        {/* The physical Scan Point: lifts as the update reaches it. */}
        <div
          className={`absolute bottom-[5%] left-[8%] w-[24%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:bottom-[7%] sm:left-auto sm:right-[27%] sm:w-[12.5%] ${
            shown === 1 ? "-translate-y-2" : ""
          }`}
        >
          <ScanPoint place="Coffee Table" sub="Guest directory" finish="navy" pulse={shown === 1 ? `p-${cycle}` : null} />
        </div>

        {/* The guest's phone: lifts when the new directory arrives. */}
        <div
          className={`absolute bottom-[4%] right-[7%] w-[38%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:bottom-auto sm:right-[5%] sm:top-[13%] sm:w-[19%] ${
            guest ? "-translate-y-2" : ""
          }`}
        >
          <div className="relative">
            <PhoneFrame screens={["guestDirectoryBefore", "guestDirectoryAfter"]} active={guest ? 1 : 0} priority sizes="(min-width: 1024px) 230px, 38vw" />
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-[8%] rounded-[5px] bg-emerald-400/12 shadow-[0_0_0_2px_rgba(16,185,129,0.9)] transition-opacity duration-500 ${guest ? "opacity-100" : "opacity-0"}`}
              style={{ top: `calc(1.3% + ${DINNER.top * 97.4 * GUEST_SCALE}%)`, height: `${DINNER.height * 97.4 * GUEST_SCALE}%` }}
            />
          </div>
        </div>

        {/* Playback controls. */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 sm:bottom-auto sm:left-auto sm:right-4 sm:top-4">
          <button
            type="button"
            onClick={() => {
              setTouched(true);
              setPaused(!stopped ? true : false);
            }}
            aria-label={stopped ? "Play the demonstration" : "Pause the demonstration"}
            className={control}
          >
            {stopped ? <Play size={16} aria-hidden className="ml-0.5" /> : <Pause size={16} aria-hidden />}
          </button>
          <button type="button" onClick={replay} aria-label="Replay the demonstration from the start" className={control}>
            <RotateCcw size={16} aria-hidden />
          </button>
        </div>
      </div>

      {/* Phones: three progress segments and one caption of fixed height, so nothing below moves as the steps change. */}
      <div className="mt-5 sm:hidden">
        <div className="grid grid-cols-3 gap-2">
          {BEATS.map((b, i) => (
            <button
              key={b.label}
              type="button"
              onClick={() => choose(i)}
              aria-label={`Step ${i + 1}: ${b.label}`}
              aria-pressed={shown === i}
              className="flex h-11 items-center focus-visible:outline-2 focus-visible:outline-brass"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                {shown === i ? (
                  <span key={`m-${i}-${cycle}-${paused}`} className={`absolute inset-0 rounded-full bg-ink ${playing ? "x-bar" : ""}`} style={{ ["--x-bar-dur" as string]: `${b.ms}ms` }} />
                ) : shown > i ? (
                  <span className="absolute inset-0 rounded-full bg-ink/40" />
                ) : null}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-1 min-h-[4.75rem]">
          <p className="flex items-baseline gap-2 text-[16px] font-semibold text-ink">
            <span className="x-num text-ink-mute">0{shown + 1}</span>
            {BEATS[shown].label}
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink-mute">{BEATS[shown].body}</p>
        </div>
      </div>

      {/* Wider screens: the three beats as captions that double as controls. */}
      <ol className="mx-auto mt-8 hidden max-w-[1000px] grid-cols-3 gap-6 sm:grid" aria-label="Steps in the demonstration">
        {BEATS.map((b, i) => {
          const on = shown === i;
          return (
            <li key={b.label}>
              <button
                type="button"
                onClick={() => choose(i)}
                aria-pressed={on}
                className="group w-full rounded-2xl px-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-ink/10">
                  {on ? (
                    <span
                      key={`${i}-${cycle}-${paused}`}
                      className={`absolute inset-0 rounded-full bg-ink ${playing ? "x-bar" : ""}`}
                      style={{ ["--x-bar-dur" as string]: `${b.ms}ms` }}
                    />
                  ) : shown > i ? (
                    <span className="absolute inset-0 rounded-full bg-ink/40" />
                  ) : null}
                </span>
                <span className={`mt-3 flex items-baseline gap-2 text-[15px] font-semibold transition-colors duration-500 ${on ? "text-ink" : "text-ink-mute group-hover:text-ink"}`}>
                  <span className="x-num">0{i + 1}</span>
                  {b.label}
                </span>
                <span className="mt-1 block text-[14px] leading-snug text-ink-mute">{b.body}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
