import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Clock,
  Compass,
  Martini,
  Music,
  Sparkles,
  Umbrella,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

interface Row {
  icon: LucideIcon;
  label: string;
}

const THEMES: {
  label: string;
  brand: string;
  sub: string;
  monogram: string;
  header: string;
  accent: string;
  rows: Row[];
  desc: string;
}[] = [
  {
    label: "Luxury Hotel",
    brand: "The Aldwyn",
    sub: "Est. London",
    monogram: "A",
    header: "bg-[linear-gradient(155deg,#1c1913_0%,#332c1a_100%)] text-[#f2e4c9]",
    accent: "#c9a961",
    rows: [
      { icon: UtensilsCrossed, label: "Fine Dining" },
      { icon: Martini, label: "The Cellar Bar" },
      { icon: Sparkles, label: "Private Spa" },
      { icon: BedDouble, label: "Turndown Service" },
    ],
    desc: "Reserved and editorial, gold-on-charcoal tones built for a five-star address.",
  },
  {
    label: "Boutique Hotel",
    brand: "Maren House",
    sub: "Independent · Coastal",
    monogram: "M",
    header: "bg-[linear-gradient(155deg,#7a4632_0%,#b06e46_100%)] text-[#fdf1e8]",
    accent: "#e8977a",
    rows: [
      { icon: Umbrella, label: "Rooftop Terrace" },
      { icon: BedDouble, label: "Studio Rooms" },
      { icon: Compass, label: "Local Guides" },
      { icon: Clock, label: "Late Checkout" },
    ],
    desc: "Warm terracotta tones with personality, a true extension of the brand.",
  },
  {
    label: "Resort",
    brand: "Isla Bay Resort",
    sub: "All-Inclusive",
    monogram: "I",
    header: "bg-[linear-gradient(155deg,#123832_0%,#1f6a5c_100%)] text-[#e6f5f0]",
    accent: "#5fbfa8",
    rows: [
      { icon: Waves, label: "Beach Club" },
      { icon: Umbrella, label: "Water Sports" },
      { icon: Sparkles, label: "Kids’ Club" },
      { icon: Music, label: "Evening Entertainment" },
    ],
    desc: "Coastal teal and sand tones with energetic, activity-first navigation.",
  },
];

export default function Showcase() {
  return (
    <section className="bg-panel border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Custom-Built, Every Time</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            Not another <Em>generic hotel app.</Em>
          </h2>
          <p className="text-ink-mute text-[17px] leading-relaxed">
            Informax digital directories are designed around your property
            rather than forcing your hotel into someone else&rsquo;s
            template.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {THEMES.map((theme) => (
            <RevealStaggerItem
              key={theme.label}
              className="group rounded-3xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgba(20,20,28,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(20,20,28,0.22)]"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-ink-mute">
                  {theme.label}
                </span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full font-serif-display italic text-[13px] text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  {theme.monogram}
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-line shadow-[0_18px_36px_-20px_rgba(20,20,28,0.35)]">
                <div className={`relative px-5 pt-6 pb-5 text-center ${theme.header}`}>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:10px_10px]"
                    aria-hidden="true"
                  />
                  <div className="relative font-serif-display text-[16px] font-medium">
                    {theme.brand}
                  </div>
                  <div className="relative mt-1 text-[9.5px] uppercase tracking-[0.14em] opacity-70">
                    {theme.sub}
                  </div>
                </div>
                <div className="flex flex-col bg-white px-3.5">
                  {theme.rows.map((row, i) => (
                    <div key={row.label}>
                      {i > 0 && <div className="h-px bg-line-soft" />}
                      <div className="flex items-center gap-2.5 py-[9px] text-[11px] font-semibold text-ink-soft">
                        <row.icon
                          size={14}
                          className="shrink-0"
                          style={{ color: theme.accent }}
                        />
                        {row.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-[13.5px] text-ink-mute leading-relaxed">
                {theme.desc}
              </p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
