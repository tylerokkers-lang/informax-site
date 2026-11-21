"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Building2, LayoutGrid, ScanLine, FileText } from "lucide-react";
import { BrowserFrame } from "@/components/x/Devices";
import type { ScreenKey } from "@/lib/screens";

/**
 * Property → Space → Scan Point → Content, told with the real Informax Cloud
 * screens for each level. Tabs follow the WAI-ARIA tabs pattern (arrow keys
 * move between them). It advances on its own while in view, until someone
 * chooses a level.
 */
const LEVELS: { key: string; label: string; icon: typeof Building2; title: string; body: string; points: string[]; screen: ScreenKey }[] = [
  {
    key: "property",
    label: "Property",
    icon: Building2,
    title: "Your property, at a glance.",
    body: "The overview shows how many Scan Points are live, what temporary content is running and whether anything needs attention.",
    points: ["Live Codes and Spaces in one view", "Temporary content and when it ends", "Anything that needs attention"],
    screen: "deskHotelOverview",
  },
  {
    key: "space",
    label: "Space",
    icon: LayoutGrid,
    title: "Organised the way you run it.",
    body: "Spaces mirror your property: Bedrooms, Spa, The Garden Room, Public Areas. Your team finds the right place in seconds.",
    points: ["Named in your team's own words", "Every Scan Point inside, with its status", "Add a Space whenever you open one"],
    screen: "deskSpaces",
  },
  {
    key: "scan-point",
    label: "Scan Point",
    icon: ScanLine,
    title: "One Scan Point. Every copy.",
    body: "A Scan Point is a permanent Code for one purpose, such as the bedside directory. Print it for every room: each copy shows the same, current content.",
    points: ["Live or temporary, shown at a glance", "Unlimited printed placements", "The Code never changes"],
    screen: "deskBedrooms",
  },
  {
    key: "content",
    label: "Content",
    icon: FileText,
    title: "Change it in moments.",
    body: "See exactly what guests see, then replace the PDF, link a website or publish something temporary. It is live the moment you publish.",
    points: ["PDF or website", "Temporary content with an end time", "The current version and two before it, restorable"],
    screen: "deskDirectoryPublished",
  },
];

const ORDER = LEVELS.map((l) => l.screen);

export default function Journey() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const playing = visible && !manual && !reduce;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((n) => (n + 1) % LEVELS.length), 5600);
    return () => clearTimeout(t);
  }, [playing, i]);

  const choose = (n: number, focus = false) => {
    setManual(true);
    setI(n);
    if (focus) tabs.current[n]?.focus();
  };

  const level = LEVELS[i];

  return (
    <div ref={box}>
      <div
        role="tablist"
        aria-label="The levels of Informax Cloud"
        className="scrollbar-none -mx-6 flex snap-x gap-2 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-3 md:px-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") choose((i + 1) % LEVELS.length, true);
          if (e.key === "ArrowLeft") choose((i + LEVELS.length - 1) % LEVELS.length, true);
        }}
      >
        {LEVELS.map((l, n) => {
          const on = n === i;
          const Icon = l.icon;
          return (
            <button
              key={l.key}
              ref={(el) => {
                tabs.current[n] = el;
              }}
              role="tab"
              id={`journey-tab-${l.key}`}
              aria-selected={on}
              aria-controls="journey-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => choose(n)}
              className={`relative flex min-w-[150px] shrink-0 snap-start items-center gap-3 overflow-hidden rounded-2xl px-4 py-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass md:min-w-0 ${
                on ? "bg-white text-ink shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_12px_30px_-16px_rgba(11,21,36,0.25)]" : "text-ink-mute hover:bg-white/60 hover:text-ink"
              }`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${on ? "bg-ink text-white" : "bg-ink/5"}`}>
                <Icon size={17} aria-hidden />
              </span>
              <span>
                <span className="x-num block text-[12px] font-medium">Level {n + 1}</span>
                <span className="block text-[16px] font-semibold">{l.label}</span>
              </span>
              {on && playing ? (
                <span key={`bar-${n}`} aria-hidden className="x-bar absolute inset-x-0 bottom-0 h-[2px] bg-brass" style={{ ["--x-bar-dur" as string]: "5600ms" }} />
              ) : null}
            </button>
          );
        })}
      </div>

      <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${level.key}`} className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
        <div key={level.key} className="ixp-enter lg:pt-6">
          <h3 className="x-title text-[clamp(28px,3vw,40px)] text-ink">{level.title}</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{level.body}</p>
          <ul className="mt-7 space-y-3 border-t border-line pt-6">
            {level.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15.5px] text-ink">
                <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <BrowserFrame screens={ORDER} active={i} sizes="(min-width: 1180px) 720px, 94vw" />
      </div>
    </div>
  );
}
