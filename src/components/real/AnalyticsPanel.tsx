import type { ComponentType } from "react";
import { BedDouble, LayoutGrid, QrCode, ScanLine, TrendingUp, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import { ANALYTICS_LABEL, ANALYTICS_PLANNED_NOTE, ANALYTICS_STATUS } from "@/lib/analytics-status";

type Icon = ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
type Card = { icon: Icon; title: string; body: string };

/** Compact note for the homepage: secondary to what Informax Cloud delivers today. */
export function AnalyticsNote() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-[0.5fr_1fr] md:gap-16">
      <p className="text-[14px] font-semibold text-brass-deep">Analytics · {ANALYTICS_LABEL}</p>
      <div>
        <h3 className="font-serif-display text-[clamp(22px,2.4vw,30px)] leading-snug text-ink">
          Planned: see how your Access Points are used.
        </h3>
        <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-ink-mute">
          We plan to add analytics to Informax Cloud, so the platform that manages what people see could also show how your Access Points, Blocks and Spaces are being used. {ANALYTICS_PLANNED_NOTE}
        </p>
      </div>
    </div>
  );
}

const VARIANTS = {
  cloud: {
    title: <>Planned: see how <Soft>your Access Points are used.</Soft></>,
    lede: "We plan to add analytics alongside your Spaces, Blocks and Access Points, so the platform you use to change what people see could also show how often they look.",
    cards: [
      { icon: ScanLine, title: "Access Point activity", body: "How often each Access Point is used." },
      { icon: QrCode, title: "Rooms, tables and areas", body: "Which Access Points and places receive the most engagement." },
      { icon: LayoutGrid, title: "Space-level reporting", body: "Activity across a Space and the Blocks inside it." },
      { icon: TrendingUp, title: "Trends over time", body: "How engagement changes across selected periods." },
    ] as Card[],
  },
  hotel: {
    title: <>Planned: see which parts of the property <Soft>guests reach for.</Soft></>,
    lede: "We plan to let hotels compare engagement across bedrooms, public areas and guest facilities, to help inform their digital guest experience.",
    cards: [
      { icon: BedDouble, title: "Bedrooms", body: "Whether the Access Points in rooms are being used." },
      { icon: LayoutGrid, title: "Public areas", body: "How Reception and the Lobby Lounge compare." },
      { icon: ScanLine, title: "Spa and Gym", body: "Activity at the facilities guests ask about." },
      { icon: TrendingUp, title: "Trends over time", body: "How engagement changes across seasons and events." },
    ] as Card[],
  },
  restaurant: {
    title: <>Planned: see which tables and areas <Soft>guests use.</Soft></>,
    lede: "We plan to let restaurants understand engagement across tables and dining areas, including while a temporary menu is live.",
    cards: [
      { icon: UtensilsCrossed, title: "Tables", body: "Which tables use their Access Point most." },
      { icon: LayoutGrid, title: "Dining areas", body: "How the Terrace, Bar and Private Dining compare." },
      { icon: ScanLine, title: "Temporary menus", body: "Activity while a menu such as the Wine Pairing Menu is live." },
      { icon: TrendingUp, title: "Trends over time", body: "How engagement changes across services and weeks." },
    ] as Card[],
  },
} as const;

/**
 * Planned Analytics, presented as a future plan (see lib/analytics-status.ts): no dashboard,
 * no figures, no claim about what is recorded or how it is handled.
 */
export default function AnalyticsPanel({ variant }: { variant: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  const planned = ANALYTICS_STATUS === "planned";
  return (
    <div>
      <Reveal blur className="mb-12 max-w-3xl">
        <Kicker>{planned ? `Analytics · ${ANALYTICS_LABEL}` : "Analytics"}</Kicker>
        <Display className="!text-[clamp(28px,3.6vw,44px)]">{v.title}</Display>
        <Lede className="mt-6">{v.lede}</Lede>
      </Reveal>
      <div className="grid gap-x-10 gap-y-2 border-t border-line pt-2 sm:grid-cols-2 lg:grid-cols-4">
        {v.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05} className="py-5">
            <c.icon size={20} aria-hidden className="text-brass-deep" />
            <h3 className="mt-3 text-[17px] font-semibold text-ink">{c.title}</h3>
            <p className="mt-2 max-w-[28ch] text-[14.5px] leading-relaxed text-ink-mute">{c.body}</p>
          </Reveal>
        ))}
      </div>
      {planned && (
        <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-ink-mute">
          <span className="mr-2 inline-block rounded-full bg-ink/5 px-3 py-0.5 text-[12.5px] font-semibold text-ink">{ANALYTICS_LABEL}</span>
          {ANALYTICS_PLANNED_NOTE}
        </p>
      )}
    </div>
  );
}
