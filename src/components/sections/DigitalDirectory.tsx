import {
  Building2,
  Compass,
  ConciergeBell,
  Gift,
  Martini,
  Nfc,
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
            One tap opens a complete, navigable directory of the hotel:
            dining, spa, facilities, guest services, local recommendations
            and offers, all in a single beautifully designed experience.
          </p>
          <div className="max-w-[460px] rounded-2xl border border-line-dark bg-charcoal-900 px-6 py-5 text-[14.5px] text-cream-mute">
            <strong className="text-white">
              Every Informax directory is built around the property,
            </strong>{" "}
            its brand, its photography, its tone of voice and everything it
            wants guests to discover.
          </div>
        </Reveal>

        <div className="relative flex items-center justify-center">
          <div className="relative z-[2] w-[300px] md:w-[340px] rounded-[26px] border border-line-dark bg-charcoal-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Photographic hero: a luxury hotel at dusk, standing in for real property photography */}
            <div className="relative h-[210px] w-full overflow-hidden">
              <svg
                viewBox="0 0 340 210"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="dd-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#241f45" />
                    <stop offset="55%" stopColor="#3c2eb0" />
                    <stop offset="100%" stopColor="#e17a52" />
                  </linearGradient>
                  <linearGradient id="dd-facade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1b1830" />
                    <stop offset="100%" stopColor="#100e1f" />
                  </linearGradient>
                </defs>
                <rect width="340" height="210" fill="url(#dd-sky)" />
                <ellipse cx="270" cy="46" rx="30" ry="30" fill="#ffd9a8" opacity="0.9" />
                <rect x="0" y="126" width="340" height="84" fill="url(#dd-facade)" />
                <rect x="24" y="96" width="292" height="34" rx="3" fill="#141228" />
                {Array.from({ length: 11 }).map((_, i) => (
                  <rect
                    key={`u-${i}`}
                    x={32 + i * 26}
                    y={103}
                    width="14"
                    height="18"
                    rx="1.5"
                    fill={i % 3 === 0 ? "#ffcf8f" : "#8a7cff"}
                    opacity={i % 3 === 0 ? 0.85 : 0.35}
                  />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <rect
                    key={`l-${i}`}
                    x={32 + i * 26}
                    y={148}
                    width="14"
                    height="18"
                    rx="1.5"
                    fill={i % 4 === 1 ? "#ffcf8f" : "#8a7cff"}
                    opacity={i % 4 === 1 ? 0.85 : 0.3}
                  />
                ))}
                <path
                  d="M110 180 h120 l16 22 h-152 z"
                  fill="#ff6b4e"
                  opacity="0.92"
                />
                <rect x="150" y="182" width="40" height="28" fill="#100e1f" />
                <rect x="0" y="200" width="340" height="10" fill="#0a0916" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal-900 to-transparent" />
              <div className="absolute left-4 right-4 bottom-3.5 flex items-end justify-between">
                <div>
                  <div className="text-[9.5px] tracking-[0.14em] uppercase text-cream-mute mb-1">
                    Guest Directory
                  </div>
                  <div className="font-serif-display text-[19px] font-medium text-white leading-tight">
                    The Grand Hotel
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-brass-light/40 bg-charcoal-950/70 px-2.5 py-1.5 backdrop-blur-sm">
                  <Nfc size={12} className="text-brass-light" />
                  <span className="text-[8.5px] font-bold uppercase tracking-[0.08em] text-brass-light">
                    Tap to Open
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial index, styled like a printed directory contents page rather than an app screen */}
            <div className="flex flex-col px-5 py-4">
              {DIRECTORY_ROWS.map((row, i) => (
                <div key={row.title}>
                  {i > 0 && <div className="h-px bg-line-dark-soft" />}
                  <div className="flex items-center gap-3.5 py-3">
                    <span className="font-serif-display italic text-[12px] text-brass-light w-4 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <row.icon size={15} className="shrink-0 text-brass-light" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-white">
                        {row.title}
                      </div>
                      <div className="truncate text-[11px] text-cream-mute">
                        {row.sub}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex animate-float-slow absolute left-[-8%] top-[12%] items-center gap-2 rounded-full border border-line-dark bg-charcoal-800 py-2.5 pl-2.5 pr-4 text-xs font-semibold text-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]">
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(138,124,255,0.18)]" />
            Your hotel&rsquo;s branding
          </div>
          <div
            className="hidden lg:flex animate-float-slow absolute right-[-12%] top-[46%] items-center gap-2 rounded-full border border-line-dark bg-charcoal-800 py-2.5 pl-2.5 pr-4 text-xs font-semibold text-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "1.4s" }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(138,124,255,0.18)]" />
            Editable anytime
          </div>
          <div
            className="hidden lg:flex animate-float-slow absolute left-[-4%] bottom-[8%] items-center gap-2 rounded-full border border-line-dark bg-charcoal-800 py-2.5 pl-2.5 pr-4 text-xs font-semibold text-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "2.6s" }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(138,124,255,0.18)]" />
            Guest favourites highlighted
          </div>
        </div>
      </div>
    </section>
  );
}
