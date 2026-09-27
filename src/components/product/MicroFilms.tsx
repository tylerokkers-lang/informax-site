"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import TouchPoint from "@/components/cloud/TouchPoint";
import {
  ActivitySummary,
  Badge,
  ChangePanel,
  ContentKindTile,
  ConfirmSheetView,
  CurrentContentCard,
  InteractionTile,
  PermanentSpaceUrl,
  VersionRows,
} from "./ui";
import { fmt, useCountUp, useFilm, useTyper } from "./film";
import { SPA, SPACE_URL, SPA_ACTIVITY, SPA_PREVIOUS, TOP_TOUCH_POINTS, type VersionRowData } from "./data";

/**
 * Small product moments. Each one teaches a single real Informax Cloud
 * capability, uses the app's own wording, runs only while on screen and
 * shows its finished state under prefers-reduced-motion.
 */

const NOTE_DARK = "text-cream-mute";
const NOTE_LIGHT = "text-ink-mute";

function Mini({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`ixp pointer-events-none select-none rounded-[28px] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_70px_-30px_rgba(2,6,14,0.6)] sm:p-7 ${className}`}
      aria-hidden
    >
      {children}
    </div>
  );
}

function useGate(amount = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const reduce = useReducedMotion();
  return { ref, active: inView && !reduce, reduce: !!reduce };
}

const Caption = ({ children, tone }: { children: ReactNode; tone: "dark" | "light" }) =>
  children ? <p className={`mt-5 text-[14px] ${tone === "dark" ? NOTE_DARK : NOTE_LIGHT}`}>{children}</p> : null;

/* ----------------------- 1. One permanent Space address ---------------------- */

const URL_STAGES = [2800, 7000] as const;

export function PermanentUrlFilm({ tone = "light", caption = "One permanent address. Change what is behind it whenever you like." }: { tone?: "dark" | "light"; caption?: string }) {
  const { ref, active, reduce } = useGate();
  const { stage } = useFilm({ stages: URL_STAGES, total: 11500, active });
  const website = reduce ? true : stage === 1;

  return (
    <div ref={ref} role="img" aria-label={`The Spa Space keeps the address ${SPACE_URL} while its content changes from ${SPA.pdf} to ${SPA.web}.`}>
      <Mini>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[1.375rem] leading-snug">{SPA.name}</h3>
          <Badge>Live</Badge>
        </div>
        <PermanentSpaceUrl compact note={null} url={SPACE_URL} />
        <div className="mt-4 rounded-[20px] bg-white/[0.035] p-5">
          <p className="ixp-label">Guests currently see</p>
          <div key={website ? "web" : "pdf"} className="ixp-enter-fade mt-3 flex items-center gap-4">
            <ContentKindTile kind={website ? "website" : "pdf"} size={48} />
            <div className="min-w-0">
              <p className="text-[13px] text-ix-dim">{website ? "Website" : "PDF"}</p>
              <p className="ixp-display truncate text-[1.125rem] font-medium leading-snug text-white">{website ? SPA.web : SPA.pdf}</p>
            </div>
          </div>
        </div>
      </Mini>
      <Caption tone={tone}>{caption}</Caption>
    </div>
  );
}

/* ---------------------------- 2. Change Content ---------------------------- */

const CHANGE_STAGES = [900, 3000, 3900, 5700, 6400] as const;

export function ChangeContentFilm({ tone = "light" }: { tone?: "dark" | "light" }) {
  const { ref, active, reduce } = useGate();
  const { stage } = useFilm({ stages: CHANGE_STAGES, total: 11800, active });
  const s = reduce ? 5 : stage;
  const typed = useTyper(SPA.web, active && s >= 3 && s <= 4, 20);
  const address = reduce || s >= 4 ? SPA.web : typed;

  return (
    <div ref={ref} role="img" aria-label="Change Content: choose Upload a PDF or Use a website, enter the website address and publish. The Space link and connected Touch Points stay the same.">
      <Mini>
        <ChangePanel
          s={{
            open: true,
            choice: s === 0 ? null : s === 1 ? "pdf" : "website",
            address,
            inputFocus: s >= 3 && s < 4,
            publishing: s === 4,
            publishedAddress: s >= 5 ? SPA.web : null,
          }}
        />
      </Mini>
      <Caption tone={tone}>The same real steps a hotel takes: choose, publish, done.</Caption>
    </div>
  );
}

/* ------------------------- 4 + 5. Informax Touch / Scan ---------------------- */

function PhoneScreen({ open }: { open: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-[#0c0f16]">
      <div className={`absolute inset-0 bg-white p-2.5 transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
        <div className="text-[5px] font-semibold uppercase tracking-[0.2em] text-[#0693e3]">Maison Aurelia</div>
        <div className="mt-2 font-serif-display text-[12px] leading-tight text-[#14141c]">Spa Treatments</div>
        <div className="mt-3 space-y-1.5">
          {[92, 70, 84, 58, 76].map((w, i) => (
            <div key={i} className="h-[3px] bg-[#14141c]/12" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Phone({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <div className={`h-[176px] w-[92px] rounded-[20px] border-[3px] border-[#3a3a48] bg-[#0a0d14] p-[3px] shadow-[0_18px_40px_rgba(0,0,0,0.45)] ${className}`}>
      <PhoneScreen open={open} />
    </div>
  );
}

const TS_STAGES = [900, 2700] as const;

function MethodPanel({ kind, tone }: { kind: "touch" | "scan"; tone: "dark" | "light" }) {
  const { ref, active, reduce } = useGate();
  const { stage } = useFilm({ stages: TS_STAGES, total: 7400, active });
  const s = reduce ? 2 : stage;
  const near = s >= 1;
  const open = s >= 2;
  const dark = tone === "dark";

  return (
    <div ref={ref} className={`p-8 md:p-12 ${dark ? "bg-charcoal-950" : "bg-paper"}`}>
      <div className="relative mb-6 flex h-[220px] origin-center scale-[0.84] items-center justify-center sm:mb-9 md:scale-100" aria-hidden>
        {kind === "touch" ? (
          <>
            <div className="absolute left-[calc(50%-118px)] top-1/2 -translate-y-1/2">
              <div className="relative">
                {near && !reduce && (
                  <>
                    <span className="absolute -inset-2 rounded-[30px] border border-[#8ed1fc]/60" style={{ animation: "ixp-wave 2.2s ease-out infinite" }} />
                    <span className="absolute -inset-2 rounded-[30px] border border-[#8ed1fc]/40" style={{ animation: "ixp-wave 2.2s ease-out 0.7s infinite" }} />
                  </>
                )}
                <TouchPoint label="Spa" size="md" />
              </div>
            </div>
            <div
              className="absolute left-[calc(50%+0px)] top-1/2 -translate-y-1/2 transition-transform duration-[1400ms] ease-out"
              style={{ transform: `translate(${near ? "-34px" : "40px"}, -50%) rotate(-12deg)` }}
            >
              <Phone open={open} />
            </div>
          </>
        ) : (
          <>
            <div className="absolute left-[calc(50%+34px)] top-1/2 -translate-y-1/2">
              <div className="relative">
                <TouchPoint label="Spa" mode="scan" size="md" />
                <div className={`pointer-events-none absolute -inset-3 transition-opacity duration-500 ${near && !open ? "opacity-100" : "opacity-0"}`}>
                  {["left-0 top-0 border-l-2 border-t-2 rounded-tl-[14px]", "right-0 top-0 border-r-2 border-t-2 rounded-tr-[14px]", "left-0 bottom-0 border-b-2 border-l-2 rounded-bl-[14px]", "right-0 bottom-0 border-b-2 border-r-2 rounded-br-[14px]"].map((c) => (
                    <span key={c} className={`absolute h-5 w-5 border-[#8ed1fc] ${c}`} />
                  ))}
                  {near && !open && !reduce && (
                    <div className="absolute inset-x-1 inset-y-1 overflow-hidden">
                      <span className="absolute inset-x-0 top-0 h-[2px] bg-[#8ed1fc]/80 shadow-[0_0_12px_rgba(142,209,252,0.7)]" style={{ animation: "ixp-scan 1.6s ease-in-out infinite" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute left-[calc(50%-112px)] top-1/2 -translate-y-1/2">
              <Phone open={open} />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3.5">
        <span className="ixp inline-flex" aria-hidden>
          <InteractionTile kind={kind} size={44} />
        </span>
        <div>
          <div className={`font-serif-display text-[30px] leading-none ${dark ? "text-white" : "text-ink"}`}>{kind === "touch" ? "Informax Touch" : "Informax Scan"}</div>
          <p className={`mt-2 text-[15px] ${dark ? NOTE_DARK : NOTE_LIGHT}`}>{kind === "touch" ? "Bring your phone close." : "Open with your camera."}</p>
        </div>
      </div>
      <p className={`mt-6 min-h-[22px] text-[13px] transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"} ${dark ? "text-[#8ed1fc]" : "text-[#0693e3]"}`}>
        The Spa Space opens instantly.
      </p>
    </div>
  );
}

export function TouchScanFilm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className={`grid gap-px border md:grid-cols-2 ${tone === "dark" ? "border-white/10 bg-white/10" : "border-line bg-line"}`}>
      <MethodPanel kind="touch" tone={tone} />
      <MethodPanel kind="scan" tone={tone} />
    </div>
  );
}

/* ------------------------------- 6. Activity -------------------------------- */

const ARRIVE = [
  { label: "Informax Touch", value: SPA_ACTIVITY.touch, colour: "#3aa6ee" },
  { label: "Informax Scan", value: SPA_ACTIVITY.scan, colour: "#dbe7f6" },
  { label: "Direct", value: SPA_ACTIVITY.direct, colour: "#7a849c" },
];

export function ActivityFilm({ tone = "light" }: { tone?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.5, once: true });
  const reduce = useReducedMotion();
  const on = seen && !reduce;
  const interactions = useCountUp(SPA_ACTIVITY.interactions, on, 1200);
  const touch = useCountUp(SPA_ACTIVITY.touch, on, 1200);
  const scan = useCountUp(SPA_ACTIVITY.scan, on, 1200);
  const direct = useCountUp(SPA_ACTIVITY.direct, on, 1200);
  const total = SPA_ACTIVITY.interactions;
  const grown = reduce || seen;

  return (
    <div ref={ref} role="img" aria-label="Space Activity: 1,248 interactions this month. Informax Touch 823, Informax Scan 361, Direct 64.">
      <Mini>
        <p className="ixp-label mb-2">{SPA.name}</p>
        <h3 className="mb-6 text-[1.75rem] leading-[1.1]">Activity</h3>
        <ActivitySummary
          fullNames
          interactions={reduce ? fmt(SPA_ACTIVITY.interactions) : fmt(interactions)}
          touch={reduce ? fmt(SPA_ACTIVITY.touch) : fmt(touch)}
          scan={reduce ? fmt(SPA_ACTIVITY.scan) : fmt(scan)}
          direct={reduce ? fmt(SPA_ACTIVITY.direct) : fmt(direct)}
        />
        <section className="mt-8">
          <h3 className="mb-3 text-[1.0625rem] font-medium tracking-normal">Touch Points</h3>
          <ul className="divide-y divide-white/[0.06]">
            {TOP_TOUCH_POINTS.map((tp) => {
              const top = TOP_TOUCH_POINTS[0].interactions;
              return (
                <li key={tp.location} className="py-3.5">
                  <div className="flex items-center gap-3.5">
                    <InteractionTile kind={tp.source} size={36} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-[15px] font-medium text-ix-cream">{tp.location}</p>
                        <p className="ixp-tabular text-[15px] text-ix-cream">{fmt(tp.interactions)}</p>
                      </div>
                      <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full origin-left rounded-full bg-[#3aa6ee] transition-transform duration-[1200ms]"
                          style={{ width: `${(tp.interactions / top) * 100}%`, transform: grown ? "scaleX(1)" : "scaleX(0)" }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="ixp-card mt-7 p-5 sm:p-6">
          <h3 className="text-[1.0625rem] font-medium tracking-normal">How guests arrive</h3>
          <div className="mt-5 flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full">
            {ARRIVE.map((a) => (
              <span
                key={a.label}
                className="block h-full origin-left rounded-full transition-transform duration-[1200ms]"
                style={{ width: `${(a.value / total) * 100}%`, background: a.colour, transform: grown ? "scaleX(1)" : "scaleX(0)" }}
              />
            ))}
          </div>
          <ul className="mt-4 grid gap-2 text-[13px] text-ix-muted sm:grid-cols-3">
            {ARRIVE.map((a) => (
              <li key={a.label} className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: a.colour }} />
                {a.label}
              </li>
            ))}
          </ul>
        </section>
      </Mini>
      <Caption tone={tone}>Product demonstration. Fictional hotel and figures.</Caption>
    </div>
  );
}

/* ---------------------------- 7. Previous Versions --------------------------- */

const VER_STAGES = [1800, 2700, 4700, 5300] as const;

export function VersionsFilm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { ref, active, reduce } = useGate();
  const { stage } = useFilm({ stages: VER_STAGES, total: 11000, active });
  const s = reduce ? 4 : stage;
  const restored = s >= 4;
  const sheet = s >= 2 && s < 4;

  const before: VersionRowData[] = [SPA_PREVIOUS[0], SPA_PREVIOUS[1]];
  const after: VersionRowData[] = [{ kind: "website", headline: SPA.web, published: "25 Sept 2026, 10:41" }, SPA_PREVIOUS[1]];

  return (
    <div ref={ref} role="img" aria-label="Previous Versions: go back to Spa Treatments.pdf. The Space link and connected Touch Points stay the same.">
      <Mini className="relative overflow-hidden">
        <PermanentSpaceUrl compact note={null} url={SPACE_URL} ring={restored && !reduce} />
        <div className="mt-5">
          <CurrentContentCard
            kind={restored ? "pdf" : "website"}
            headline={restored ? SPA.pdf : SPA.web}
            updated={restored ? "2 Sept 2026" : "25 Sept 2026"}
            open={false}
          />
        </div>
        <h3 className="mb-3 mt-8 text-[1.375rem]">Previous Versions</h3>
        <VersionRows rows={restored ? after : before} restoreHover={s === 1} />
        {sheet && (
          <div className="ixp-enter-fade absolute inset-0 z-10 flex items-center justify-center bg-[rgba(3,7,14,0.6)] p-4 backdrop-blur-[6px]">
            <ConfirmSheetView hoverConfirm={s === 3} />
          </div>
        )}
      </Mini>
      <Caption tone={tone}>Restore an earlier version in one step. The Space link and Touch Points never change.</Caption>
    </div>
  );
}

