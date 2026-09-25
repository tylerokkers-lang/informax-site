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
import { DIRECTORY, HOTEL, SPA, SPACE_URL, SPA_PREVIOUS, type VersionRowData } from "./data";

/**
 * Informax Cloud on a phone: the Hotel Admin dashboard, single column,
 * real wording, never scaled. Two stories:
 *   spa        Spa Treatments.pdf → Use a website → maisonaurelia.com/spa/book
 *   directory  GuestDirectory.pdf → Upload a PDF → GuestDirectory-Winter.pdf
 * The count beside the phone ("12 / 400 Touch Points updated") is a
 * marketing annotation outside the app frame.
 */

const S = { openSpace: 1, toContent: 2, openPanel: 3, choose: 4, entry: 5, publishing: 6, published: 7, fade: 8 } as const;

type Script = { stages: readonly number[]; cursor: readonly CursorEvent[]; actions: readonly FilmAction[]; total: number };

/** With the Spaces list first (main film on small screens). */
const MAIN_WEB: Script = {
  stages: [2000, 2800, 4750, 6750, 7700, 9500, 10150, 13500],
  cursor: [
    { t: 500, target: "card-spa" },
    { t: 1800, target: "card-spa", click: true },
    { t: 2100, target: null },
    { t: 3700, target: "change-content" },
    { t: 4650, target: "change-content", click: true },
    { t: 5700, target: "tile-website" },
    { t: 6650, target: "tile-website", click: true },
    { t: 7300, target: "input" },
    { t: 8500, target: "publish" },
    { t: 9450, target: "publish", click: true },
    { t: 10250, target: null },
  ],
  actions: [
    { t: 2800, name: "scroll:current" },
    { t: 4800, name: "scroll:panel" },
    { t: 6800, name: "scroll:entry" },
    { t: 10400, name: "scroll:current" },
  ],
  total: 14800,
};

/** Starts inside the Space (standalone "update from anywhere" film). */
const UPDATE_WEB: Script = {
  stages: [900, 2900, 4900, 5800, 7650, 8300, 12000],
  cursor: [
    { t: 1850, target: "change-content" },
    { t: 2800, target: "change-content", click: true },
    { t: 3850, target: "tile-website" },
    { t: 4800, target: "tile-website", click: true },
    { t: 5600, target: "input" },
    { t: 6650, target: "publish" },
    { t: 7600, target: "publish", click: true },
    { t: 8400, target: null },
  ],
  actions: [
    { t: 900, name: "scroll:current" },
    { t: 2950, name: "scroll:panel" },
    { t: 4950, name: "scroll:entry" },
    { t: 8500, name: "scroll:current" },
  ],
  total: 13500,
};

const UPDATE_PDF: Script = {
  stages: [900, 2900, 4900, 6500, 8700, 9400, 12200],
  cursor: [
    { t: 1850, target: "change-content" },
    { t: 2800, target: "change-content", click: true },
    { t: 3850, target: "tile-pdf" },
    { t: 4800, target: "tile-pdf", click: true },
    { t: 5600, target: "choose-file" },
    { t: 6300, target: "choose-file", click: true },
    { t: 7700, target: "publish" },
    { t: 8600, target: "publish", click: true },
    { t: 9400, target: null },
  ],
  actions: [
    { t: 900, name: "scroll:current" },
    { t: 2950, name: "scroll:panel" },
    { t: 5000, name: "scroll:entry" },
    { t: 6600, name: "scroll:entry" },
    { t: 9550, name: "scroll:current" },
  ],
  total: 13500,
};

export default function PhoneFilm({
  variant = "update",
  space = "spa",
  captions = "dark",
}: {
  variant?: "main" | "update";
  space?: "spa" | "directory";
  captions?: "dark" | "light";
}) {
  const isPdf = space === "directory";
  const script = variant === "main" ? MAIN_WEB : isPdf ? UPDATE_PDF : UPDATE_WEB;
  const startsInSpace = variant === "update";
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.4 });
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const measure = useMeasure(stageRef, 1);

  const onAction = useCallback((name: string) => {
    const box = scrollRef.current;
    if (!box) return;
    if (name === "reset") {
      box.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const [, anchor, extra] = name.split(":");
    const el = box.querySelector<HTMLElement>(`[data-anchor="${anchor}"]`);
    if (!el) return;
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 16 + Number(extra ?? 0);
    box.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!reduce) return;
    const box = scrollRef.current;
    const el = box?.querySelector<HTMLElement>('[data-anchor="current"]');
    if (!box || !el) return;
    box.scrollTop = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 16;
  }, [reduce, variant, space]);

  const film = useFilm({
    stages: script.stages,
    cursor: script.cursor,
    actions: script.actions,
    onAction,
    total: script.total,
    active: inView && !reduce,
    measure,
  });

  // The "update" films begin inside the Space; the PDF film has no typing stage.
  const raw = reduce ? S.published : film.stage;
  const stage = startsInSpace && !reduce ? raw + 1 : raw;
  const reached = (n: number) => stage >= n;
  const published = reached(S.published);
  const publishing = stage === S.publishing;
  const typed = useTyper(SPA.web, !reduce && !isPdf && stage >= S.entry && stage <= S.publishing, 22);
  const address = reduce || stage >= S.publishing ? SPA.web : typed;
  const inSpace = startsInSpace || reached(S.openSpace);
  const panelOpen = reached(S.openPanel);

  const name = isPdf ? DIRECTORY.name : SPA.name;
  const url = isPdf ? DIRECTORY.url : SPACE_URL;
  const count = isPdf ? DIRECTORY.touchPoints : SPA.touchPoints;
  const before = isPdf ? { kind: "pdf" as const, headline: DIRECTORY.pdf, updated: "14 Aug 2026" } : { kind: "pdf" as const, headline: SPA.pdf, updated: "2 Sept 2026" };
  const after = isPdf ? { kind: "pdf" as const, headline: DIRECTORY.nextPdf, updated: "25 Sept 2026" } : { kind: "website" as const, headline: SPA.web, updated: "25 Sept 2026" };
  const now = published ? after : before;
  const versions: VersionRowData[] = isPdf
    ? published
      ? [{ kind: "pdf", headline: DIRECTORY.pdf, published: "14 Aug 2026, 16:20" }]
      : []
    : published
      ? SPA_PREVIOUS
      : SPA_PREVIOUS.slice(1);

  return (
    <div ref={wrap} className="@container w-full">
      <div className="flex flex-col items-center gap-8 @[680px]:flex-row @[680px]:justify-center @[680px]:gap-12">
      <div
        role="img"
        aria-label={
          isPdf
            ? `Animated recreation of Informax Cloud on a phone: the Guest Directory Space gets a new PDF and all ${count} connected Touch Points show it.`
            : `Animated recreation of Informax Cloud on a phone: the Spa Space switches from a PDF to ${SPA.web} and all ${count} connected Touch Points follow.`
        }
        className="w-full min-w-0 max-w-[406px] shrink-0"
      >
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
                    <p className="ixp-label mb-2">{HOTEL.name}</p>
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
                        <h3 className="text-[1.375rem] leading-snug">Restaurants</h3>
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
                      <h1 className="break-words text-[2rem] leading-[1.1]">{name}</h1>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ix-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-ix-pos" />
                        Live
                      </div>
                      <div className="mt-7">
                        <PermanentSpaceUrl compact url={url} note={null} ring={published && !reduce} />
                      </div>
                    </div>

                    <section data-anchor="current">
                      <h2 className="mb-5 text-[1.375rem]">Current Content</h2>
                      <CurrentContentCard kind={now.kind} headline={now.headline} updated={now.updated} open={panelOpen}>
                        <ChangePanel
                          s={
                            isPdf
                              ? {
                                  open: panelOpen,
                                  choice: reached(S.choose) ? "pdf" : null,
                                  address: "",
                                  inputFocus: false,
                                  publishing,
                                  publishedAddress: null,
                                  staged: reached(S.entry) ? { name: DIRECTORY.nextPdf, size: DIRECTORY.nextSize } : null,
                                  pdfPublished: published,
                                }
                              : {
                                  open: panelOpen,
                                  choice: reached(S.choose) ? "website" : null,
                                  address,
                                  inputFocus: stage >= S.entry && stage < S.publishing,
                                  publishing,
                                  publishedAddress: published ? SPA.web : null,
                                }
                          }
                        />
                      </CurrentContentCard>
                    </section>

                    {versions.length > 0 && (
                      <section data-anchor="versions">
                        <h2 className="mb-3 text-[1.375rem]">Previous Versions</h2>
                        <VersionRows rows={versions} />
                      </section>
                    )}
                  </div>
                )}
              </div>
            </div>
            {!reduce && <Cursor tap x={film.cur.x || 200} y={film.cur.y || 400} on={film.cur.on} clicks={film.clicks} />}
          </div>
        </div>
      </div>

      <TouchPointsUpdated on={published} count={count} tone={captions} />
      </div>
    </div>
  );
}

/** Marketing annotation, deliberately outside the app frame. */
function TouchPointsUpdated({ on, count, tone }: { on: boolean; count: number; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  const tiles = count > 20 ? 40 : count;
  return (
    <div className="w-full max-w-[280px]">
      <div className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-cream-mute" : "text-ink-mute"}`}>Around the hotel</div>
      <div
        className={`mt-3 flex items-start gap-2 font-serif-display text-[32px] leading-[1.05] transition-opacity duration-700 ${on ? "opacity-100" : "opacity-45"} ${dark ? "text-white" : "text-ink"}`}
      >
        {on && <Check size={24} className={`mt-1.5 shrink-0 ${dark ? "text-ix-pos" : "text-emerald-600"}`} />}
        <span>
          {count} Touch Points {on ? "updated" : "deployed"}
        </span>
      </div>
      <div className={`mt-5 grid gap-1.5 ${tiles > 20 ? "grid-cols-8" : "grid-cols-6"}`} aria-hidden>
        {Array.from({ length: tiles }, (_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[5px] transition-colors duration-500 ${on ? "bg-ix-brand" : dark ? "bg-white/15" : "bg-ink/15"}`}
            style={{ transitionDelay: on ? `${i * (tiles > 20 ? 25 : 70)}ms` : "0ms" }}
          />
        ))}
      </div>
      <p className={`mt-4 text-[13px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>
        Same Space link. Same Touch Points. Nothing was reprinted or reinstalled.
      </p>
    </div>
  );
}
