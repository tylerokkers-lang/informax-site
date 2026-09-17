import { Nfc } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Guests tap",
    desc: "An NFC tag or QR code, placed wherever guests naturally look. Nothing to install, nothing to remember.",
  },
  {
    n: "02",
    title: "It opens instantly",
    desc: "The property's directory loads straight in their phone's browser, already branded, already organised.",
  },
  {
    n: "03",
    title: "They explore, at their pace",
    desc: "Dining, spa, facilities, local recommendations: everything the property offers, in one place.",
  },
];

export default function HowItWorks() {
  return (
    <section className="scroll-mt-24 bg-panel py-24 md:py-32" id="how-it-works">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-deep">
            How It Works
          </span>
          <h2 className="mb-12 font-serif-display font-medium leading-[1.12] tracking-[-0.01em] text-[clamp(28px,3.6vw,42px)] text-ink">
            Simple for the guest.
            <br />
            <span className="italic text-ink-mute">Sophisticated underneath.</span>
          </h2>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`py-7 ${i !== 0 ? "border-t border-line" : ""}`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-serif-display text-[15px] italic text-brass-deep">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-[18px] font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="max-w-[42ch] text-[15px] leading-relaxed text-ink-mute">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative overflow-hidden rounded-[4px] border border-line bg-charcoal-950 shadow-[0_60px_120px_-50px_rgba(10,10,16,0.55)]">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <svg
                viewBox="0 0 640 400"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hiw-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1638" />
                    <stop offset="55%" stopColor="#3c2eb0" />
                    <stop offset="100%" stopColor="#e17a52" />
                  </linearGradient>
                  <linearGradient id="hiw-facade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1b1830" />
                    <stop offset="100%" stopColor="#0d0c18" />
                  </linearGradient>
                </defs>
                <rect width="640" height="400" fill="url(#hiw-sky)" />
                <ellipse cx="500" cy="90" rx="46" ry="46" fill="#ffd9a8" opacity="0.9" />
                <rect x="0" y="230" width="640" height="170" fill="url(#hiw-facade)" />
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
                  <div className="font-serif-display text-[26px] font-medium leading-tight text-white">
                    The Grand Hotel
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-brass-light/40 bg-charcoal-950/70 px-3.5 py-2 backdrop-blur-sm">
                  <Nfc size={14} className="text-brass-light" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-brass-light">
                    Tap to open
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-0 border-t border-line-dark px-8 py-6 sm:grid-cols-4">
              {["Dining", "Spa", "Facilities", "Concierge"].map((label, i) => (
                <div key={label} className="py-2">
                  <span className="mb-1 block font-serif-display text-[11px] italic text-brass-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-medium text-cream">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
