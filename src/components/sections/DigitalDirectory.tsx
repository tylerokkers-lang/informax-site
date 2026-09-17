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
    <section id="digital-directory" className="scroll-mt-24 bg-charcoal-950 py-24 text-cream md:py-32">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
            The Digital Directory
          </span>
          <h2 className="mb-6 font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-white">
            Everything your property offers,{" "}
            <span className="italic text-brass-light">beautifully organised.</span>
          </h2>
          <p className="mb-8 max-w-[460px] text-[16.5px] leading-relaxed text-cream-mute">
            One tap opens a complete, navigable directory of the hotel:
            dining, spa, facilities, guest services, local recommendations
            and offers, all in a single beautifully designed experience.
          </p>
          <div className="max-w-[460px] border-t border-white/10 pt-7 text-[14.5px] leading-relaxed text-cream-mute">
            <strong className="text-white">
              Every Informax directory is built around the property,
            </strong>{" "}
            its brand, its photography, its tone of voice and everything it
            wants guests to discover.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden border border-white/10">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <svg
                viewBox="0 0 640 400"
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
                    <stop offset="100%" stopColor="#0d0c18" />
                  </linearGradient>
                </defs>
                <rect width="640" height="400" fill="url(#dd-sky)" />
                <ellipse cx="500" cy="90" rx="46" ry="46" fill="#ffd9a8" opacity="0.9" />
                <rect x="0" y="230" width="640" height="170" fill="url(#dd-facade)" />
                <rect x="60" y="170" width="520" height="70" rx="4" fill="#141228" />
                {Array.from({ length: 18 }).map((_, i) => (
                  <rect
                    key={`u-${i}`}
                    x={72 + i * 28.5}
                    y={183}
                    width="16"
                    height="24"
                    rx="2"
                    fill={i % 3 === 0 ? "#ffcf8f" : "#8a7cff"}
                    opacity={i % 3 === 0 ? 0.85 : 0.3}
                  />
                ))}
                {Array.from({ length: 18 }).map((_, i) => (
                  <rect
                    key={`l-${i}`}
                    x={72 + i * 28.5}
                    y={270}
                    width="16"
                    height="24"
                    rx="2"
                    fill={i % 4 === 1 ? "#ffcf8f" : "#8a7cff"}
                    opacity={i % 4 === 1 ? 0.85 : 0.25}
                  />
                ))}
                <path d="M220 340 h200 l26 36 h-252 z" fill="#ff6b4e" opacity="0.92" />
                <rect x="290" y="344" width="60" height="42" fill="#0d0c18" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal-950 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                <div>
                  <div className="mb-1 text-[10px] uppercase tracking-[0.16em] text-cream-mute">
                    Guest Directory
                  </div>
                  <div className="font-serif-display text-[24px] font-medium leading-tight text-white">
                    The Grand Hotel
                  </div>
                </div>
                <div className="flex items-center gap-2 border border-brass-light/40 bg-charcoal-950/70 px-3.5 py-2 backdrop-blur-sm">
                  <Nfc size={14} className="text-brass-light" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-brass-light">
                    Tap to open
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
              {DIRECTORY_ROWS.map((row, i) => (
                <div
                  key={row.title}
                  className={`flex items-center gap-3.5 border-white/10 px-8 py-4 ${
                    i < DIRECTORY_ROWS.length - 2 ? "border-b" : i === DIRECTORY_ROWS.length - 2 ? "border-b sm:border-b-0" : ""
                  } ${i % 2 === 0 ? "sm:border-r" : ""}`}
                >
                  <span className="w-4 shrink-0 font-serif-display text-[12px] italic text-brass-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <row.icon size={15} className="shrink-0 text-brass-light" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold text-white">
                      {row.title}
                    </div>
                    <div className="truncate text-[11.5px] text-cream-mute">
                      {row.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
