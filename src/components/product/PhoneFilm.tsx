"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  BackLink,
  Badge,
  ChangePanel,
  ContentKindTile,
  CurrentContentCard,
  Logo,
  MenuIcon,
  PermanentSpaceUrl,
  VersionRows,
} from "./ui";
import { Cursor, useFilm, useMeasure, useTyper, type CursorEvent, type FilmAction } from "./film";
import { SPA, SPACE_URL, SPA_PREVIOUS } from "./data";

/**
 * Informax Cloud on a phone: the Hotel Admin dashboard, single column,
 * real wording. Shows that a hotel can change what a Space serves from
 * wherever they are. A marketing annotation beside/under the phone (not
 * part of the app UI) shows the twelve Touch Points following.
 */


const S = { openSpace: 1, toContent: 2, openPanel: 3, website: 4, typing: 5, publishing: 6, published: 7, fade: 8 } as const;

/** With the Spaces list first (main film on small screens). */
const MAIN = {
  stages: [2000, 2800, 4750, 6750, 7700, 9500, 10150, 13500],
  cursor: [
    { t: 500, target: "card-spa" },
    { t: 1800, target: "card-spa", click: true },
    { t: 2100, target: null },
    { t: 3700, target: "change-content" },
    { t: 4650, target: "change-content", click: true },
    { t: 5700, target: "tile-website" },
    { t: 6650, target: "tile-website", click: true },
    { t: 6900, target: "input" },
    { t: 8500, target: "publish" },
    { t: 9450, target: "publish", click: true },
    { t: 10250, target: null },
  ] as readonly CursorEvent[],
  actions: [
    { t: 2800, name: "scroll:current" },
    { t: 4800, name: "scroll:current:170" },
    { t: 10800, name: "scroll:versions" },
  ] as readonly FilmAction[],
  total: 14800,
};

/** Starts inside the Space (standalone "update from anywhere" film). */
const UPDATE = {
  stages: [900, 2900, 4900, 5800, 7650, 8300, 12000],
  cursor: [
    { t: 1850, target: "change-content" },
    { t: 2800, target: "change-content", click: true },
    { t: 3850, target: "tile-website" },
    { t: 4800, target: "tile-website", click: true },
    { t: 5000, target: "input" },
    { t: 6650, target: "publish" },
    { t: 7600, target: "publish", click: true },
    { t: 8400, target: null },
  ] as readonly CursorEvent[],
  actions: [
    { t: 900, name: "scroll:current" },
    { t: 2950, name: "scroll:current:170" },
    { t: 9000, name: "scroll:versions" },
  ] as readonly FilmAction[],
  total: 13500,
};

const ADDRESS = SPA.web;

export default function PhoneFilm({
  variant = "update",
  captions = "dark",
}: {
  variant?: "main" | "update";
  captions?: "dark" | "light";
}) {
  const script = variant === "main" ? MAIN : UPDATE;
  const startsInSpace = variant === "update";
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.4 });
  // The phone screen is fluid (up to 390px) and never scaled, so text is always real size.
  const scale = 1;
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const measure = useMeasure(stageRef, scale);

  const onAction = useCallback(
    (name: string) => {
      const box = scrollRef.current;
      if (!box) return;
      if (name === "reset") {
        box.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const [, anchor, extra] = name.split(":");
      const el = box.querySelector<HTMLElement>(`[data-anchor="${anchor}"]`);
      if (!el) return;
      const k = scale || 1;
      const top = (el.getBoundingClientRect().top - box.getBoundingClientRect().top) / k + box.scrollTop - 16 + Number(extra ?? 0);
      box.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    },
    [scale],
  );

  useEffect(() => {
    if (!reduce) return;
    const box = scrollRef.current;
    const el = box?.querySelector<HTMLElement>('[data-anchor="current"]');
    if (!box || !el) return;
    const k = scale || 1;
    box.scrollTop = (el.getBoundingClientRect().top - box.getBoundingClientRect().top) / k + box.scrollTop - 16;
  }, [reduce, scale, variant]);

  const film = useFilm({
    stages: script.stages,
    cursor: script.cursor,
    actions: script.actions,
    onAction,
    total: script.total,
    active: inView && !reduce,
    measure,
  });

  // The "update" film begins inside the Space, so its first mark is at 0.
  const rawStage = reduce ? S.published : film.stage;
  const stage = startsInSpace && !reduce ? rawStage + 1 : rawStage;
  const reached = (n: number) => stage >= n;
  const published = reached(S.published);
  const typed = useTyper(ADDRESS, !reduce && stage >= S.typing && stage <= S.publishing, 22);
  const address = reduce || stage >= S.publishing ? ADDRESS : typed;
  const inSpace = startsInSpace || reached(S.openSpace);
  const panelOpen = reached(S.openPanel);

  return (
    <div ref={wrap} className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
      <div
        role="img"
        aria-label="Animated recreation of Informax Cloud on a phone: open the Spa Space, choose Change Content, use a website, publish, and the twelve connected Touch Points update."
        className="w-full max-w-[406px] shrink-0"
      >
        <div className="mx-auto w-full">
          <div
            className="rounded-[46px] bg-[#0a0d14] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_80px_-30px_rgba(2,6,14,0.8)]"
            aria-hidden
          >
            <div
              ref={stageRef}
              className="ixp pointer-events-none relative h-[740px] w-full select-none overflow-hidden rounded-[38px]"
              style={{ opacity: reduce || stage < S.fade ? 1 : 0, transition: "opacity 500ms ease" }}
            >
              <header className="flex items-center justify-between border-b border-white/[0.06] bg-ix-navy-900/85 px-5 pb-2.5 pt-7">
                <Logo height={28} />
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-ix-cream">
                  <MenuIcon size={22} />
                </span>
              </header>

              <div ref={scrollRef} className="h-[calc(100%-77px)] overflow-y-hidden px-5 py-7">
                <div key={inSpace ? "space" : "list"} className="ixp-enter-fade">
                  {!inSpace && (
                    <>
                      <p className="ixp-label mb-2">{`Fairmont Windsor Park`}</p>
                      <h1 className="text-[2rem] leading-[1.1]">Your Spaces</h1>
                      <p className="mb-7 mt-3 text-[15px] leading-relaxed text-ix-muted">
                        What guests see in each area of your property, and how it&apos;s performing.
                      </p>
                      <div className="space-y-5">
                        <div data-cur="card-spa" className={`ixp-card relative flex flex-col p-6 ${film.pressing ? "is-hover" : ""}`}>
                          <h3 className="text-[1.375rem] leading-snug">Spa</h3>
                          <div className="mt-2">
                            <Badge>Live</Badge>
                          </div>
                          <div className="mt-6 flex items-center gap-3.5">
                            <ContentKindTile kind="pdf" size={40} />
                            <div className="min-w-0">
                              <p className="text-[13px] text-ix-dim">Current content · PDF</p>
                              <p className="truncate text-[15px] text-ix-cream">{SPA.pdf}</p>
                            </div>
                          </div>
                          <p className="mt-2 text-[13px] text-ix-dim">Updated 2 Sept 2026</p>
                          <p className="ixp-tabular mt-5 text-[13px] text-ix-dim">
                            <span className="ixp-display text-[1.25rem] font-medium text-ix-cream">1,248</span> interactions
                          </p>
                        </div>
                        <div className="ixp-card flex flex-col p-6">
                          <h3 className="text-[1.375rem] leading-snug">Guest Directory</h3>
                          <div className="mt-2">
                            <Badge>Live</Badge>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {inSpace && (
                    <div className="space-y-12 pb-20">
                      <div>
                        <BackLink>Your Spaces</BackLink>
                        <h1 className="break-words text-[2rem] leading-[1.1]">{SPA.name}</h1>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ix-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-ix-pos" />
                          Live
                        </div>
                        <div className="mt-7">
                          <PermanentSpaceUrl compact url={SPACE_URL} note={null} ring={published && !reduce} />
                        </div>
                      </div>

                      <section data-anchor="current">
                        <h2 className="mb-5 text-[1.375rem]">Current Content</h2>
                        <CurrentContentCard
                          kind={published ? "website" : "pdf"}
                          headline={published ? SPA.web : SPA.pdf}
                          updated={published ? "25 Sept 2026" : "2 Sept 2026"}
                          open={panelOpen}
                        >
                          <ChangePanel
                            s={{
                              open: panelOpen,
                              choice: reached(S.website) ? "website" : null,
                              address,
                              inputFocus: stage >= S.typing && stage < S.publishing,
                              publishing: stage === S.publishing,
                              publishedAddress: published ? SPA.web : null,
                            }}
                          />
                        </CurrentContentCard>
                      </section>

                      <section data-anchor="versions">
                        <h2 className="mb-3 text-[1.375rem]">Previous Versions</h2>
                        <VersionRows rows={published ? SPA_PREVIOUS : SPA_PREVIOUS.slice(1)} />
                      </section>
                    </div>
                  )}
                </div>
              </div>
              {!reduce && <Cursor tap x={film.cur.x || 200} y={film.cur.y || 400} on={film.cur.on} clicks={film.clicks} />}
            </div>
          </div>
        </div>
      </div>

      <TouchPointsUpdated on={published} tone={captions} />
    </div>
  );
}

/** Marketing annotation, deliberately outside the app frame. */
function TouchPointsUpdated({ on, tone }: { on: boolean; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className="w-full max-w-[280px]">
      <div className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-cream-mute" : "text-ink-mute"}`}>Around the hotel</div>
      <div className={`mt-3 flex items-center gap-2 font-serif-display text-[34px] leading-none transition-opacity duration-700 ${on ? "opacity-100" : "opacity-40"} ${dark ? "text-white" : "text-ink"}`}>
        {on && <Check size={24} className={dark ? "text-ix-pos" : "text-emerald-600"} />}
        12 Touch Points {on ? "updated" : "connected"}
      </div>
      <div className="mt-5 grid grid-cols-6 gap-2" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[6px] transition-colors duration-500 ${on ? "bg-ix-brand" : dark ? "bg-white/15" : "bg-ink/15"}`}
            style={{ transitionDelay: on ? `${i * 70}ms` : "0ms" }}
          />
        ))}
      </div>
      <p className={`mt-4 text-[13px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>
        Same Space URL. Same Touch Points. Nothing was reinstalled.
      </p>
    </div>
  );
}
