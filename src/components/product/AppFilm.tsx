"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  ActivitySummary,
  BackLink,
  ChangePanel,
  CurrentContentCard,
  HotelHeader,
  HotelTabs,
  AppSidebar,
  NewSpaceButton,
  PermanentSpaceUrl,
  SpaceCard,
  StatCardView,
  TouchPointRows,
  VersionRows,
  MoreIcon,
  ChevronRightIcon,
} from "./ui";
import { Cursor, fmt, useCountUp, useFilm, useFit, useMeasure, useTyper, type CursorEvent, type FilmAction } from "./film";
import { HOTEL, SPA, SPACE_CARDS, SPACE_URL, SPA_ACTIVITY, SPA_PREVIOUS, SPA_TOUCH_POINTS } from "./data";
import PhoneFilm from "./PhoneFilm";

/**
 * The main Informax Cloud film, built from recreated app UI (not a screen
 * recording). Story: Hotel workspace, Spaces, Spa, Change Content, Use a
 * website, Publish, then the permanent Space URL and Touch Points staying
 * exactly as they were, Activity and Previous Versions.
 */

const W = 1080;
const H = 640;

/** Stage numbers, in order. A stage is "reached" once its time passes. */
const S = {
  spaces: 1,
  hoverCard: 2,
  openSpace: 3,
  toContent: 4,
  hoverChange: 5,
  openPanel: 6,
  website: 7,
  typing: 8,
  hoverPublish: 9,
  publishing: 10,
  published: 11,
  backUp: 12,
  touchPoints: 13,
  activity: 14,
  versions: 15,
  fade: 16,
} as const;

const STAGES = [1600, 2900, 3250, 3900, 5650, 5900, 7900, 9200, 11150, 11350, 12100, 12600, 14200, 15700, 17200, 18700] as const;

const CURSOR: readonly CursorEvent[] = [
  { t: 500, target: "tab-spaces" },
  { t: 1500, target: "tab-spaces", click: true },
  { t: 2000, target: "card-spa" },
  { t: 3100, target: "card-spa", click: true },
  { t: 3300, target: null },
  { t: 4750, target: "change-content" },
  { t: 5800, target: "change-content", click: true },
  { t: 6800, target: "tile-website" },
  { t: 7800, target: "tile-website", click: true },
  { t: 8300, target: "input" },
  { t: 10300, target: "publish" },
  { t: 11300, target: "publish", click: true },
  { t: 12000, target: null },
];

const ACTIONS: readonly FilmAction[] = [
  { t: 3900, name: "scroll:current" },
  { t: 5950, name: "scroll:current:150" },
  { t: 12600, name: "scroll:url" },
  { t: 14200, name: "scroll:tp" },
  { t: 15700, name: "scroll:activity" },
  { t: 17200, name: "scroll:versions" },
];

const TOTAL = 19800;
const FINAL = S.published;

const ADDRESS = SPA.web;

export default function AppFilm({ captions = "dark" }: { captions?: "dark" | "light" }) {
  return (
    <>
      <div className="hidden min-[1120px]:block">
        <DesktopFilm captions={captions} />
      </div>
      <div className="min-[1120px]:hidden">
        <PhoneFilm variant="main" captions={captions} />
      </div>
    </>
  );
}

function DesktopFilm({ captions }: { captions: "dark" | "light" }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.35 });
  const { ref: fitRef, scale } = useFit(W, 1);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const measure = useMeasure(stageRef, scale);

  const onAction = useCallback(
    (name: string) => {
      const box = scrollRef.current;
      const stage = stageRef.current;
      if (!box || !stage) return;
      if (name === "reset") {
        box.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const [, anchor, extra] = name.split(":");
      const el = box.querySelector<HTMLElement>(`[data-anchor="${anchor}"]`);
      if (!el) return;
      const k = scale || 1;
      const top = (el.getBoundingClientRect().top - box.getBoundingClientRect().top) / k + box.scrollTop - 28 + Number(extra ?? 0);
      box.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    },
    [scale],
  );

  // Reduced motion: a static frame that shows the URL and the changed content together.
  useEffect(() => {
    if (!reduce) return;
    const box = scrollRef.current;
    const el = box?.querySelector<HTMLElement>('[data-anchor="url"]');
    if (!box || !el) return;
    const k = scale || 1;
    box.scrollTop = (el.getBoundingClientRect().top - box.getBoundingClientRect().top) / k + box.scrollTop - 28;
  }, [reduce, scale]);

  const film = useFilm({
    stages: STAGES,
    cursor: CURSOR,
    actions: ACTIONS,
    onAction,
    total: TOTAL,
    active: inView && !reduce && scale !== null,
    measure,
  });

  const stage = reduce ? FINAL : film.stage;
  const reached = (n: number) => stage >= n;
  const typed = useTyper(ADDRESS, !reduce && stage >= S.typing && stage < S.publishing + 1);
  const address = reduce ? ADDRESS : stage >= S.publishing ? ADDRESS : typed;
  const published = reached(S.published);
  const activityOn = !reduce ? stage >= S.activity && stage < S.fade + 1 : true;
  const interactions = useCountUp(SPA_ACTIVITY.interactions, activityOn);
  const touch = useCountUp(SPA_ACTIVITY.touch, activityOn);
  const scan = useCountUp(SPA_ACTIVITY.scan, activityOn);
  const direct = useCountUp(SPA_ACTIVITY.direct, activityOn);

  const page: "overview" | "spaces" | "space" = stage >= S.openSpace ? "space" : stage >= S.spaces ? "spaces" : "overview";
  const hoverCard = stage === S.hoverCard;
  const panelOpen = reached(S.openPanel);
  const choice = reached(S.website) ? "website" : null;

  const previous = published ? SPA_PREVIOUS : SPA_PREVIOUS.slice(1);

  return (
    <div ref={wrap} role="img" aria-label="Animated recreation of Informax Cloud: opening the Spa Space, choosing Change Content, switching from a PDF to a website and publishing, while the permanent Space URL and the twelve connected Touch Points stay exactly the same.">
      <div ref={fitRef} className="w-full">
        <div className="relative mx-auto" style={{ width: W * (scale ?? 1), height: H * (scale ?? 1) }}>
          <div
            ref={stageRef}
            className="ixp pointer-events-none absolute left-0 top-0 origin-top-left select-none overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.7)]"
            style={{
              width: W,
              height: H,
              transform: `scale(${scale ?? 1})`,
              opacity: scale === null ? 0 : reduce || stage < S.fade ? 1 : 0,
              transition: "opacity 500ms ease",
            }}
            aria-hidden
          >
            <div className="flex h-full">
              <AppSidebar active="Hotels" />
              <div ref={scrollRef} className="relative min-w-0 flex-1 overflow-y-hidden px-12 py-12" style={{ scrollBehavior: "auto" }}>
                <HotelHeader hotel={HOTEL.name} place={HOTEL.place} />
                <HotelTabs active={page === "overview" ? "Overview" : "Spaces"} cur="Spaces" />

                <div key={page} className="ixp-enter-fade">
                  {page === "overview" && (
                    <div className="grid grid-cols-2 gap-4">
                      <StatCardView label="Interactions (30 days)" value="3,455" emphasis />
                      <StatCardView label="People with access" value="3" />
                    </div>
                  )}

                  {page === "spaces" && (
                    <>
                      <div className="mb-7 flex min-h-10 items-center justify-end">
                        <NewSpaceButton />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        {SPACE_CARDS.map((c) => (
                          <SpaceCard key={c.id} space={c} cur={c.id === "spa" ? "card-spa" : undefined} hover={c.id === "spa" && hoverCard} />
                        ))}
                      </div>
                    </>
                  )}

                  {page === "space" && (
                    <div className="space-y-14 pb-40">
                      <div>
                        <BackLink>Spaces</BackLink>
                        <p className="ixp-label mb-2">Space</p>
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h2 className="text-[2.6rem] leading-[1.1]">{SPA.name}</h2>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ix-muted">
                              <span className="h-1.5 w-1.5 rounded-full bg-ix-pos" />
                              Live
                            </div>
                          </div>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full text-ix-muted">
                            <MoreIcon size={20} />
                          </span>
                        </div>
                        <div className="mt-7" data-anchor="url">
                          <PermanentSpaceUrl url={SPACE_URL} ring={published && stage >= S.backUp && !reduce} />
                        </div>
                      </div>

                      <section data-anchor="current">
                        <h3 className="mb-5 text-[1.375rem]">Current Content</h3>
                        <CurrentContentCard
                          kind={published ? "website" : "pdf"}
                          headline={published ? SPA.web : SPA.pdf}
                          updated={published ? "25 Sept 2026" : "2 Sept 2026"}
                          open={panelOpen}
                          hoverButton={stage === S.hoverChange}
                          pressButton={film.pressing && stage === S.hoverChange}
                        >
                          <ChangePanel
                            s={{
                              open: panelOpen,
                              choice,
                              address,
                              inputFocus: stage >= S.typing && stage < S.publishing,
                              publishing: stage === S.publishing,
                              publishedAddress: published ? SPA.web : null,
                              hoverPublish: stage === S.hoverPublish,
                              pressPublish: film.pressing && stage === S.hoverPublish,
                            }}
                          />
                        </CurrentContentCard>
                      </section>

                      <div data-anchor="tp">
                        <TouchPointRows rows={SPA_TOUCH_POINTS} total={SPA.touchPoints} hero />
                      </div>

                      <section data-anchor="activity">
                        <h3 className="mb-5 text-[1.375rem]">Activity</h3>
                        <ActivitySummary interactions={fmt(interactions)} touch={fmt(touch)} scan={fmt(scan)} direct={fmt(direct)} />
                        <span className="ixp-btn ixp-btn-quiet mt-5 -ml-2.5 inline-flex">
                          View Activity
                          <ChevronRightIcon size={16} />
                        </span>
                      </section>

                      <section data-anchor="versions">
                        <h3 className="mb-3 text-[1.375rem]">Previous Versions</h3>
                        <VersionRows rows={previous} />
                      </section>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!reduce && <Cursor x={film.cur.x || 720} y={film.cur.y || 380} on={film.cur.on} clicks={film.clicks} />}
          </div>
        </div>
      </div>

      <Captions published={published} tone={captions} />
    </div>
  );
}

/** Marketing layer under the app: makes the one thing that matters impossible to miss. */
export function Captions({ published, tone }: { published: boolean; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  const rows = [
    { label: "Current Content", from: SPA.pdf, to: SPA.web, badge: "Changed", changed: true },
    { label: "Permanent Space URL", from: SPACE_URL, to: SPACE_URL, badge: "Unchanged", changed: false },
    { label: "Touch Points", from: `${SPA.touchPoints} deployed`, to: `${SPA.touchPoints} updated`, badge: "Still in place", changed: false },
  ];
  return (
    <ul className="mx-auto mt-6 grid max-w-[1080px] gap-3 sm:grid-cols-3" aria-label="What changed and what did not">
      {rows.map((r) => (
        <li
          key={r.label}
          className={`border-t pt-3 transition-colors duration-500 ${
            published ? (r.changed ? "border-ix-brand" : dark ? "border-ix-pos/70" : "border-emerald-600/60") : dark ? "border-white/15" : "border-line"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-cream-mute" : "text-ink-mute"}`}>{r.label}</span>
            <span
              className={`flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-500 ${
                published ? "opacity-100" : "opacity-0"
              } ${r.changed ? "text-ix-brand" : dark ? "text-ix-pos" : "text-emerald-700"}`}
            >
              {!r.changed && <Check size={12} />}
              {r.badge}
            </span>
          </div>
          <div className={`mt-1.5 truncate font-mono text-[12.5px] ${dark ? "text-white" : "text-ink"}`}>{published ? r.to : r.from}</div>
        </li>
      ))}
    </ul>
  );
}
