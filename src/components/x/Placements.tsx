"use client";

import Image from "next/image";
import { useState } from "react";
import { PLACEMENTS, type Placement } from "@/lib/placements";
import { PhoneFrame } from "@/components/x/Devices";
import ScanPoint from "@/components/x/ScanPoint";
import { EventScreen, GalleryScreen, ReceptionScreen } from "@/components/x/GuestScreens";
import { SCREENS } from "@/lib/screens";

const RENDERED = {
  reception: { el: <ReceptionScreen />, label: "A guest's phone showing the Marlowe Grand welcome page, with Wi-Fi details and times for the stay (an Informax sample design)" },
  gallery: { el: <GalleryScreen />, label: "A visitor's phone showing the works in Room 3 of a gallery, and a late opening this Thursday (an Informax sample design)" },
  event: { el: <EventScreen />, label: "A delegate's phone showing the day two programme, with one session marked as moved to Hall B (an Informax sample design)" },
} as const;

function GuestPhone({ p, sizes }: { p: Placement; sizes: string }) {
  if (p.screen in RENDERED) {
    const r = RENDERED[p.screen as keyof typeof RENDERED];
    return (
      <PhoneFrame label={r.label} sizes={sizes}>
        {r.el}
      </PhoneFrame>
    );
  }
  return <PhoneFrame screens={[p.screen as keyof typeof SCREENS]} sizes={sizes} />;
}

/**
 * One setting: the Scan Point where guests find it, and what opens on their
 * phone. A studio scene until a photograph of a real Scan Point is supplied.
 */
export function PlacementScene({ p, className = "", compact = false }: { p: Placement; className?: string; compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] md:rounded-[36px] ${p.photo ? "bg-charcoal-900" : `x-studio ${p.studio}`} ${className}`}>
      {p.photo ? (
        <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 1180px) 1180px, 100vw" className="object-cover" />
      ) : (
        <div className={`absolute ${compact ? "bottom-[16%] left-[12%] w-[30%]" : "bottom-[16%] left-[12%] w-[28%] md:left-[19%] md:w-[17%]"}`}>
          <ScanPoint place={p.place} sub={p.sub} finish={p.finish} />
        </div>
      )}
      {/* The scan: a quiet dotted path from the plate to the phone. */}
      {!p.photo ? (
        <svg aria-hidden viewBox="0 0 100 60" preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 h-full w-full ${compact ? "hidden" : "hidden md:block"}`}>
          <path d="M37 46 C 46 30, 52 24, 62 24" fill="none" stroke={p.key === "table" || p.key === "event" ? "rgba(255,255,255,0.45)" : "rgba(11,21,36,0.28)"} strokeWidth="0.25" vectorEffect="non-scaling-stroke" className="x-flow" />
        </svg>
      ) : null}
      <div className={`absolute ${compact ? "bottom-[-14%] right-[10%] w-[44%]" : "bottom-[-12%] right-[8%] w-[42%] md:right-[16%] md:w-[24%]"}`}>
        <GuestPhone p={p} sizes={compact ? "(min-width: 1024px) 240px, 40vw" : "(min-width: 1024px) 300px, 42vw"} />
      </div>
    </div>
  );
}

/** The settings as tabs over one large stage. */
export default function Placements() {
  const [i, setI] = useState(0);
  const p = PLACEMENTS[i];
  return (
    <div>
      <div role="tablist" aria-label="Where Scan Points go" className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0">
        {PLACEMENTS.map((x, n) => (
          <button
            key={x.key}
            role="tab"
            id={`place-tab-${x.key}`}
            aria-selected={n === i}
            aria-controls="place-panel"
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setI((n + 1) % PLACEMENTS.length);
              if (e.key === "ArrowLeft") setI((n + PLACEMENTS.length - 1) % PLACEMENTS.length);
            }}
            className={`h-11 shrink-0 rounded-full px-5 text-[15px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
              n === i ? "bg-ink text-white" : "bg-ink/5 text-ink-mute hover:bg-ink/10 hover:text-ink"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div id="place-panel" role="tabpanel" aria-labelledby={`place-tab-${p.key}`} className="mt-8 md:mt-10">
        <div key={p.key} className="ixp-enter-fade">
          <PlacementScene p={p} className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]" />
          <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-1 gap-3 md:grid-cols-[1fr_1fr] md:gap-12">
            <h3 className="x-title text-balance text-[clamp(24px,2.6vw,32px)] text-ink">{p.title}</h3>
            <p className="text-[17px] leading-relaxed text-ink-soft">{p.body}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-[13px] text-ink-mute">Guest pages are Informax sample designs for fictional businesses.</p>
    </div>
  );
}
