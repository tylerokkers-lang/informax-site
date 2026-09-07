import { Bed, ChevronsUpDown, ConciergeBell, Coffee, X } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const JOURNEY = [
  { label: "Front Desk", icon: ConciergeBell },
  { label: "Breakfast", icon: Coffee },
  { label: "Lifts", icon: ChevronsUpDown },
  { label: "Room", icon: Bed },
];

const MISSED = [
  "The restaurant",
  "The bar",
  "The spa",
  "The gym",
  "Room service",
  "Events",
  "Facilities",
  "Experiences",
  "Local recommendations",
];

export default function ProblemJourney() {
  return (
    <section className="bg-paper pt-28 pb-24 md:pt-32 md:pb-28">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow center>The Guest Journey, Today</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink">
            Your guests arrive. But how much do they{" "}
            <Em>actually discover?</Em>
          </h2>
        </Reveal>

        <RevealStagger className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6 mb-10 max-w-3xl mx-auto">
          <div className="hidden sm:block absolute top-[26px] left-[8%] right-[8%] h-px bg-[repeating-linear-gradient(90deg,var(--line)_0_8px,transparent_8px_16px)]" />
          {JOURNEY.map((step) => (
            <RevealStaggerItem
              key={step.label}
              className="relative flex flex-col items-center text-center gap-3.5"
            >
              <div className="relative z-[2] flex h-[54px] w-[54px] items-center justify-center rounded-full border border-line bg-panel">
                <step.icon size={22} className="text-brass-deep" />
              </div>
              <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-ink-mute">
                {step.label}
              </span>
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <Reveal className="text-center max-w-md mx-auto mb-24">
          <p className="font-serif-display italic text-[19px] leading-snug text-ink-mute">
            And that&rsquo;s often where the conversation ends.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-[70px] items-start">
          <Reveal>
            <h3 className="font-serif-display font-medium text-[clamp(26px,3.2vw,36px)] leading-[1.2] text-ink mb-5">
              But most hotels have <Em>so much more</Em> to offer.
            </h3>
            <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-[440px]">
              Multiple restaurants, a spa, a gym, a pool, bars, events,
              experiences and room service: a property&rsquo;s full offering
              rarely fits into a two-minute check-in. Whatever doesn&rsquo;t
              get said at the desk usually stays unknown for the rest of the
              stay.
            </p>
            <div className="mt-10 pt-9 border-t border-line max-w-[440px]">
              <p className="font-serif-display italic text-[clamp(20px,2.2vw,25px)] leading-snug text-ink">
                What if everything they needed was one tap away?
              </p>
            </div>
          </Reveal>

          <RevealStagger className="flex flex-col gap-2.5">
            {MISSED.map((item) => (
              <RevealStaggerItem
                key={item}
                className="flex items-center gap-3.5 rounded-lg border border-line bg-panel px-[18px] py-[14px] text-[14.5px] text-ink-soft transition-all duration-300 hover:border-brass hover:translate-x-1"
              >
                <X size={17} className="text-brass-deep shrink-0" />
                {item}
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
