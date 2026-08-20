import {
  Building2,
  ChevronRight,
  Compass,
  ConciergeBell,
  Gift,
  Martini,
  Sparkles,
  Bed,
  Utensils,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const DIRECTORY_ROWS = [
  { icon: Utensils, title: "Dining", sub: "Restaurants, menus & reservations" },
  { icon: Martini, title: "Bars & Lounges", sub: "Opening hours & signature drinks" },
  { icon: Sparkles, title: "Spa & Wellness", sub: "Treatments & booking" },
  { icon: Building2, title: "Facilities", sub: "Pool, gym & hotel amenities" },
  { icon: ConciergeBell, title: "Guest Services", sub: "Housekeeping, requests & policies" },
  { icon: Bed, title: "Your Stay", sub: "Room info, Wi-Fi & checkout" },
  { icon: Compass, title: "Explore the Area", sub: "Local recommendations & directions" },
  { icon: Gift, title: "Offers & Experiences", sub: "Curated stays & seasonal offers" },
];

export default function DigitalDirectory() {
  return (
    <section
      id="digital-directory"
      className="scroll-mt-24 bg-charcoal-950 text-cream py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
        <Reveal>
          <Eyebrow tone="dark">The Digital Directory</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-white mb-6">
            Everything your property offers, <Em>beautifully organised.</Em>
          </h2>
          <p className="text-cream-mute text-[16.5px] leading-relaxed max-w-[460px] mb-7">
            One tap opens a complete, navigable directory of the hotel —
            dining, spa, facilities, guest services, local recommendations
            and offers, all in a single beautifully designed experience.
          </p>
          <div className="max-w-[460px] rounded-2xl border border-line-dark bg-charcoal-900 px-6 py-5 text-[14.5px] text-cream-mute">
            <strong className="text-white">
              Every Informax directory is built around the property
            </strong>{" "}
            — its brand, its photography, its tone of voice and everything
            it wants guests to discover.
          </div>
        </Reveal>

        <div className="relative flex items-center justify-center">
          <div className="relative z-[2] w-[300px] md:w-[320px] rounded-[42px] border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-850 p-4 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.75)]">
            <div className="min-h-[520px] md:min-h-[540px] overflow-hidden rounded-[28px] bg-panel">
              <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 px-6 pt-8 pb-5 text-center text-white">
                <div className="mx-auto mb-3.5 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-brass-light font-serif-display italic text-[15px] text-brass-light">
                  G
                </div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-cream-mute mb-1.5">
                  Welcome to
                </div>
                <div className="font-serif-display text-[18px] font-medium">
                  The Grand Hotel
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4">
                {DIRECTORY_ROWS.map((row) => (
                  <div
                    key={row.title}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 transition-all duration-300 hover:border-brass hover:translate-x-1"
                  >
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-paper-alt">
                      <row.icon size={16} className="text-brass-deep" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-semibold text-ink">
                        {row.title}
                      </div>
                      <div className="truncate text-[11.5px] text-ink-mute">
                        {row.sub}
                      </div>
                    </div>
                    <ChevronRight size={14} className="shrink-0 text-ink-mute" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex animate-float-slow absolute left-[-8%] top-[12%] items-center gap-2 rounded-full border border-line-dark bg-charcoal-800 py-2.5 pl-2.5 pr-4 text-xs font-semibold text-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]">
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(212,171,111,0.18)]" />
            Your hotel&rsquo;s branding
          </div>
          <div
            className="hidden lg:flex animate-float-slow absolute right-[-12%] top-[46%] items-center gap-2 rounded-full border border-line-dark bg-charcoal-800 py-2.5 pl-2.5 pr-4 text-xs font-semibold text-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "1.4s" }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(212,171,111,0.18)]" />
            Editable anytime
          </div>
          <div
            className="hidden lg:flex animate-float-slow absolute left-[-4%] bottom-[8%] items-center gap-2 rounded-full border border-line-dark bg-charcoal-800 py-2.5 pl-2.5 pr-4 text-xs font-semibold text-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "2.6s" }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(212,171,111,0.18)]" />
            Guest favourites highlighted
          </div>
        </div>
      </div>
    </section>
  );
}
