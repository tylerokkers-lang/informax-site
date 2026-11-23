"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { BrowserFrame, GUEST_SCALE, PhoneFrame } from "@/components/x/Devices";
import ScanPoint from "@/components/x/ScanPoint";

/**
 * The compact product showcase on the homepage: Informax Cloud, a Scan Point
 * and a guest's phone as one small composition, in three beats. Open the
 * Scan Point in Cloud, publish, and the guest's phone shows the new content.
 *
 * Everything on screen is real: the Cloud screens and the guest phone are
 * captures of the application (see src/lib/screens.ts) showing the fictional
 * Marlowe Grand Hotel. The Scan Point plate is drawn and its Code is
 * illustrative. Three soft tints (the Coffee Table row, the published banner,
 * the changed dinner line) and one small word, "Updated", are the only
 * additions, and they sit on top of the captures.
 *
 * It plays only while on screen, has play, pause and replay controls, every
 * beat can be chosen by hand, and reduced motion shows the finished state
 * with no movement (the controls still step through it).
 */
const BEATS = [
  { label: "Open the Scan Point", body: "Coffee Table, in Bedrooms.", ms: 4200 },
  { label: "Publish the update", body: "New dinner hours, published once.", ms: 4400 },
  { label: "Guests see it", body: "The next scan shows the update.", ms: 6200 },
] as const;

/**
 * Both Cloud captures are cropped to their top 722 px (of 1125), which holds
 * everything shown and leaves out the lower part of the page. Desktop shows the
 * whole width; phones show the content column only (the sidebar is cropped
 * away, never altered) so the dashboard can be larger.
 */
const CROP_H = 722;
const CONTENT_LEFT = 0.214; // the content column starts here (fraction of the capture width)
/** Pixel boxes on the capture (1800 wide): the Coffee Table card (Bedrooms, x 385 to 828) and the "Published. It is live now." banner. */
const ROW_PX = [355, 721] as const;
const BANNER_PX = [95, 152] as const;
const ROW_X = { desk: [CONTENT_LEFT * 100, 24.6], phone: [0.4, 31.3] } as const; // [left %, width %]
const ringBox = (px: readonly [number, number], phone: boolean, x?: typeof ROW_X) => ({
  left: `${x ? (phone ? x.phone[0] : x.desk[0]) : phone ? 0.4 : CONTENT_LEFT * 100}%`,
  width: `${x ? (phone ? x.phone[1] : x.desk[1]) : phone ? 96.6 : 76.1}%`,
  top: `${(px[0] / CROP_H) * 100}%`,
  height: `${((px[1] - px[0]) / CROP_H) * 100}%`,
});
/** Where the dinner row sits on the captured guest directory (fractions of the screen height). */
const DINNER = { top: 0.3165, height: 0.0345 }; // between the row's own divider lines

const noSubscribe = () => () => {};

const control =
  "flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brass";

export default function Showcase() {
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
  const stopped = paused || reduce;

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
  const toggle = () => {
    setTouched(true);
    setPaused(!stopped);
  };

  // Highlights are soft tints with no border; they arrive after the screen they sit on has settled, and leave quickly.
  const ring = (on: boolean, tone: "brand" | "ok", delay = "delay-500") =>
    `pointer-events-none absolute rounded-[3px] transition-opacity motion-reduce:transition-none sm:rounded-[5px] ${
      on ? `opacity-100 duration-700 ${delay}` : "opacity-0 duration-300"
    } ${tone === "ok" ? "bg-emerald-500/[0.12]" : "bg-sky-500/[0.12]"}`;
  // One easing for all movement; screens cross-fade on their own, slower, curve.
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div ref={box} className="mx-auto max-w-[880px]">
      <div className="relative mx-auto h-[224px] w-full overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#eef1f5_0%,#e3e7ed_100%)] sm:h-auto sm:aspect-[880/306] sm:rounded-[28px]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_70%_at_28%_0%,rgba(255,255,255,0.95),transparent_70%)]" />

        {/* Informax Cloud, on a computer. It recedes a little once the guest has the update. */}
        <div
          className={`absolute left-[2%] top-[8px] w-[74%] transition-[transform,opacity] duration-[900ms] ${ease} motion-reduce:transition-none sm:left-[3%] sm:top-[6%] sm:w-[66%] ${
            guest ? "opacity-90 sm:scale-[0.992]" : "opacity-100"
          }`}
        >
          <BrowserFrame
            screens={["deskBedrooms", "deskDirectoryPublished"]}
            active={published ? 1 : 0}
            aspectClass="aspect-[1415/722] sm:aspect-[1800/722]"
            imgClassName="max-sm:origin-top-right max-sm:scale-[1.272]"
            compact
            priority
            sizes="(min-width: 960px) 580px, (min-width: 640px) 66vw, 100vw"
          >
            {/* Phones show the content column only, so the highlights are placed for that crop. */}
            {([true, false] as const).map((phone) => (
              <span key={String(phone)} aria-hidden className={phone ? "sm:hidden" : "max-sm:hidden"}>
                <span className={ring(shown === 0, "brand")} style={ringBox(ROW_PX, phone, ROW_X)} />
                <span className={ring(shown === 1, "ok", "delay-[450ms]")} style={ringBox(BANNER_PX, phone)} />
              </span>
            ))}
          </BrowserFrame>
        </div>

        {/* The physical Scan Point: lifts as the update is published. */}
        <div
          className={`absolute bottom-[11px] left-[46%] w-[52px] transition-transform duration-[900ms] ${ease} motion-reduce:transition-none sm:bottom-[7%] sm:left-[71.2%] sm:w-[7.6%] ${
            shown === 1 ? "-translate-y-1.5 delay-200" : ""
          }`}
        >
          <ScanPoint place="Coffee Table" sub="Guest directory" finish="navy" pulse={shown === 1 ? `p-${cycle}` : null} />
        </div>

        {/* The guest's phone: lifts when the new directory arrives, then the changed line is softly tinted and labelled. */}
        <div
          className={`absolute bottom-[11px] right-[3%] w-[24%] transition-transform duration-[900ms] ${ease} motion-reduce:transition-none sm:bottom-auto sm:right-[4%] sm:top-[6%] sm:w-[14.2%] ${
            guest ? "-translate-y-1.5 delay-200" : ""
          }`}
        >
          <div className="relative [container-type:inline-size]">
            <PhoneFrame screens={["guestDirectoryBefore", "guestDirectoryAfter"]} active={guest ? 1 : 0} priority sizes="(min-width: 960px) 125px, 90px" />
            {/* The changed row: a soft tint behind the line, no border, and a small word beside the new hours. */}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-[8%] rounded-[2px] bg-white/[0.08] ${guest ? "x-tint" : "opacity-0"}`}
              style={{ top: `calc(1.3% + ${DINNER.top * 97.4 * GUEST_SCALE}%)`, height: `${DINNER.height * 97.4 * GUEST_SCALE}%` }}
            />
            <span
              aria-hidden
              className={`pointer-events-none absolute right-[28%] flex items-center whitespace-nowrap font-medium leading-none tracking-[0.01em] text-white/60 [font-size:clamp(4px,4.8cqw,6.5px)] transition-opacity motion-reduce:transition-none ${
                guest ? "opacity-100 duration-700 delay-[1400ms]" : "opacity-0 duration-300"
              }`}
              style={{ top: `calc(1.3% + ${DINNER.top * 97.4 * GUEST_SCALE}%)`, height: `${DINNER.height * 97.4 * GUEST_SCALE}%` }}
            >
              Updated
            </span>
          </div>
        </div>
      </div>

      {/* Phones: progress segments and one caption of fixed height, so nothing below moves as the beats change. */}
      <div className="mt-2 sm:hidden">
        <div className="flex items-center">
          <div role="group" aria-label="Steps in the demonstration" className="grid flex-1 grid-cols-3 gap-2">
            {BEATS.map((b, i) => (
              <button
                key={b.label}
                type="button"
                onClick={() => choose(i)}
                aria-label={`Step ${i + 1}: ${b.label}`}
                aria-pressed={shown === i}
                className="flex h-11 w-full items-center focus-visible:outline-2 focus-visible:outline-brass"
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
          <div className="-mr-2 ml-1 flex">
            <button type="button" onClick={toggle} aria-label={stopped ? "Play the demonstration" : "Pause the demonstration"} className={control}>
              {stopped ? <Play size={15} aria-hidden className="ml-0.5" /> : <Pause size={15} aria-hidden />}
            </button>
            <button type="button" onClick={replay} aria-label="Replay the demonstration from the start" className={control}>
              <RotateCcw size={15} aria-hidden />
            </button>
          </div>
        </div>
        <p className="flex min-h-7 items-baseline gap-2 text-[15px] font-semibold text-ink">
          <span className="x-num text-ink-mute">0{shown + 1}</span>
          {BEATS[shown].label}
                  </p>
      </div>

      {/* Wider screens: the three beats as captions that double as controls, with play and replay beside them. */}
      <div className="mt-4 hidden items-start gap-4 sm:flex">
        <ol className="grid flex-1 grid-cols-3 gap-5" aria-label="Steps in the demonstration">
          {BEATS.map((b, i) => {
            const on = shown === i;
            return (
              <li key={b.label}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-pressed={on}
                  className="group w-full rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
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
                  <span className={`mt-2.5 flex items-baseline gap-2 text-[14px] font-semibold transition-colors duration-500 ${on ? "text-ink" : "text-ink-mute group-hover:text-ink"}`}>
                    <span className="x-num">0{i + 1}</span>
                    {b.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink-mute max-lg:hidden">{b.body}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="-mr-2 -mt-3 flex shrink-0">
          <button type="button" onClick={toggle} aria-label={stopped ? "Play the demonstration" : "Pause the demonstration"} className={control}>
            {stopped ? <Play size={16} aria-hidden className="ml-0.5" /> : <Pause size={16} aria-hidden />}
          </button>
          <button type="button" onClick={replay} aria-label="Replay the demonstration from the start" className={control}>
            <RotateCcw size={16} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
