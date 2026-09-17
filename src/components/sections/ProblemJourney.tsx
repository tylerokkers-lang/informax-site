import { X } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const JOURNEY = ["Front Desk", "Breakfast", "Lifts", "Room"];

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
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mb-16 max-w-xl md:mb-20">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            The Guest Journey, Today
          </span>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-ink">
            Your guests arrive. But how much do they{" "}
            <span className="italic text-brass-deep">actually discover?</span>
          </h2>
        </Reveal>

        <div className="relative mb-20 border-t border-line pt-8">
          <RevealStagger className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {JOURNEY.map((label, i) => (
              <RevealStaggerItem key={label}>
                <span
                  className={`mb-3 block h-2.5 w-2.5 rounded-full ${
                    i === 0 ? "bg-brass-deep" : "bg-line"
                  }`}
                />
                <span className="text-[15px] font-semibold text-ink">
                  {label}
                </span>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
          <Reveal className="mt-10">
            <p className="font-serif-display text-[18px] italic leading-snug text-ink-mute">
              And that&rsquo;s often where the conversation ends.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-[70px]">
          <Reveal>
            <h3 className="mb-5 font-serif-display font-medium leading-[1.2] text-[clamp(26px,3.2vw,36px)] text-ink">
              But most hotels have{" "}
              <span className="italic text-ink-mute">so much more</span> to
              offer.
            </h3>
            <p className="max-w-[440px] text-[16.5px] leading-relaxed text-ink-mute">
              Multiple restaurants, a spa, a gym, a pool, bars, events,
              experiences and room service: a property&rsquo;s full offering
              rarely fits into a two-minute check-in. Whatever doesn&rsquo;t
              get said at the desk usually stays unknown for the rest of the
              stay.
            </p>
            <div className="mt-10 max-w-[440px] border-t border-line pt-9">
              <p className="font-serif-display text-[clamp(20px,2.2vw,25px)] italic leading-snug text-ink">
                What if everything they needed was one tap away?
              </p>
            </div>
          </Reveal>

          <RevealStagger className="flex flex-col border-t border-line">
            {MISSED.map((item) => (
              <RevealStaggerItem key={item}>
                <div className="flex items-center gap-3.5 border-b border-line py-4 text-[14.5px] text-ink-soft">
                  <X size={15} className="shrink-0 text-brass-deep" />
                  {item}
                </div>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
