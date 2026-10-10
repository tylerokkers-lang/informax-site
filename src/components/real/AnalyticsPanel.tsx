import type { ComponentType } from "react";
import { BedDouble, LayoutGrid, QrCode, ScanLine, TrendingUp, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import { ANALYTICS_LABEL, ANALYTICS_STATUS } from "@/lib/analytics-status";

type Icon = ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
type Card = { icon: Icon; title: string; body: string };

const VARIANTS = {
  home: {
    title: <>See the impact <Soft>behind every scan.</Soft></>,
    lede: "Understand how your Codes are being used across your spaces, with insights designed to help you make better decisions.",
    cards: [
      { icon: ScanLine, title: "Scan activity", body: "How often your Codes are scanned." },
      { icon: QrCode, title: "Code performance", body: "Which rooms, tables and areas get the most engagement." },
      { icon: LayoutGrid, title: "Space performance", body: "Activity across the different Spaces in your business." },
      { icon: TrendingUp, title: "Trends over time", body: "How engagement changes over the periods you choose." },
    ] as Card[],
  },
  cloud: {
    title: <>Manage the content. <Soft>Then see how it is used.</Soft></>,
    lede: "Analytics sits alongside Spaces and Codes, so the platform you use to change what people see can also show how often they look.",
    cards: [
      { icon: ScanLine, title: "Scan activity", body: "How often each Code is scanned." },
      { icon: QrCode, title: "Individual Codes", body: "Which Codes, in which rooms, tables or areas, receive the most engagement." },
      { icon: LayoutGrid, title: "Spaces", body: "Activity across a Space and everything inside it." },
      { icon: TrendingUp, title: "Over time", body: "How engagement changes across selected periods." },
    ] as Card[],
  },
  hotel: {
    title: <>See which parts of the property <Soft>guests reach for.</Soft></>,
    lede: "Compare engagement across bedrooms, public areas and guest facilities, and use it to decide where your digital guest experience deserves attention.",
    cards: [
      { icon: BedDouble, title: "Bedrooms", body: "Whether the codes in rooms are being used." },
      { icon: LayoutGrid, title: "Public areas", body: "How Reception and the Lobby Lounge compare." },
      { icon: ScanLine, title: "Spa and Gym", body: "Activity at the facilities guests ask about." },
      { icon: TrendingUp, title: "Over time", body: "How engagement changes across seasons and events." },
    ] as Card[],
  },
  restaurant: {
    title: <>See which tables and areas <Soft>guests scan.</Soft></>,
    lede: "Understand menu engagement across tables and dining areas, including how scanning looks while a temporary menu is live.",
    cards: [
      { icon: UtensilsCrossed, title: "Tables", body: "Which tables scan their code most." },
      { icon: LayoutGrid, title: "Dining areas", body: "How the Terrace, Bar and Private Dining compare." },
      { icon: ScanLine, title: "Temporary menus", body: "Scan activity while a menu such as the Wine Pairing Menu is live." },
      { icon: TrendingUp, title: "Over time", body: "How engagement changes across services and weeks." },
    ] as Card[],
  },
} as const;

/**
 * Analytics, presented honestly. Insights are not built yet (see lib/analytics-status.ts),
 * so this shows what they will answer, with no dashboard, no figures and a visible status.
 */
export default function AnalyticsPanel({ variant, dark = false }: { variant: keyof typeof VARIANTS; dark?: boolean }) {
  const v = VARIANTS[variant];
  const planned = ANALYTICS_STATUS === "planned";
  return (
    <div>
      <Reveal blur className="mb-14 max-w-3xl md:mb-16">
        <Kicker dark={dark}>{planned ? `Analytics · ${ANALYTICS_LABEL}` : "Analytics"}</Kicker>
        <Display dark={dark}>{v.title}</Display>
        <Lede dark={dark} className="mt-8">{v.lede}</Lede>
      </Reveal>
      <div className={`grid gap-x-10 gap-y-2 border-t pt-2 sm:grid-cols-2 lg:grid-cols-4 ${dark ? "border-white/10" : "border-line"}`}>
        {v.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06} className="py-6">
            <c.icon size={22} aria-hidden className={dark ? "text-brass-light" : "text-brass-deep"} />
            <h3 className={`mt-4 text-[19px] font-semibold ${dark ? "text-white" : "text-ink"}`}>{c.title}</h3>
            <p className={`mt-2 max-w-[28ch] text-[15px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>{c.body}</p>
          </Reveal>
        ))}
      </div>
      <div className={`mt-6 max-w-[62ch] space-y-3 text-[14.5px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>
        {planned && (
          <p>
            <span className={`mr-2 inline-block rounded-full px-3 py-0.5 text-[12.5px] font-semibold ${dark ? "bg-white/10 text-white" : "bg-ink/5 text-ink"}`}>{ANALYTICS_LABEL}</span>
            Analytics is not available in Informax Cloud yet. Ask us about timing.
          </p>
        )}
        <p>Insights are about Codes and Spaces, not people. Informax does not identify or follow individual guests. It counts scans, not reading time or sales.</p>
      </div>
    </div>
  );
}
