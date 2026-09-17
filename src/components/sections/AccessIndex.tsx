import {
  Bed,
  Building2,
  Compass,
  ConciergeBell,
  Gift,
  Martini,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const ROWS = [
  { icon: Utensils, title: "Dining", sub: "Restaurants, menus & reservations" },
  { icon: Martini, title: "Bars & Lounges", sub: "Opening hours & signature drinks" },
  { icon: Sparkles, title: "Spa & Wellness", sub: "Treatments & booking" },
  { icon: Building2, title: "Facilities", sub: "Pool, gym & hotel amenities" },
  { icon: ConciergeBell, title: "Guest Services", sub: "Housekeeping, requests & policies" },
  { icon: Bed, title: "Your Stay", sub: "Room info, Wi-Fi & checkout" },
  { icon: Compass, title: "Explore the Area", sub: "Local recommendations & directions" },
  { icon: Gift, title: "Offers & Experiences", sub: "Curated stays & seasonal offers" },
];

export default function AccessIndex() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mb-16 max-w-xl md:mb-20">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            One Directory
          </span>
          <h2 className="font-serif-display font-medium leading-[1.12] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-ink">
            Everything the property offers, in one place.
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-x-16 border-t border-line md:grid-flow-col md:grid-rows-4 md:grid-cols-2">
          {ROWS.map((row, i) => (
            <RevealStaggerItem key={row.title}>
              <div className="flex items-center gap-5 border-b border-line py-6">
                <span className="font-serif-display text-[13px] italic text-brass-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <row.icon size={19} className="shrink-0 text-brass-deep" />
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-semibold text-ink">
                    {row.title}
                  </div>
                  <div className="truncate text-[13.5px] text-ink-mute">
                    {row.sub}
                  </div>
                </div>
              </div>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
