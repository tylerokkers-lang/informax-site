import { Compass, Handshake, KeyRound, MapPin, SmartphoneNfc } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const STEPS = [
  {
    index: "01",
    icon: KeyRound,
    title: "Check In",
    desc: "The guest arrives at the hotel and is shown to their room.",
  },
  {
    index: "02",
    icon: MapPin,
    title: "Discover",
    desc: "They encounter an Informax tag, on the desk, the wall or their key wallet.",
  },
  {
    index: "03",
    icon: SmartphoneNfc,
    title: "Tap",
    desc: "Their phone instantly opens the hotel's digital experience.",
  },
  {
    index: "04",
    icon: Compass,
    title: "Explore",
    desc: "They discover everything the hotel has to offer, at their pace.",
  },
  {
    index: "05",
    icon: Handshake,
    title: "Engage",
    desc: "They book, enquire, dine, visit and get more from every stay.",
  },
];

export default function GuestJourney() {
  return (
    <section id="guest-journey" className="scroll-mt-24 bg-charcoal-950 py-24 text-cream md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mb-16 max-w-xl md:mb-20">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
            The Guest Journey
          </span>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-white">
            From check-in to <span className="italic text-brass-light">checkout.</span>
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
          {STEPS.map((step) => (
            <RevealStaggerItem key={step.index}>
              <step.icon size={22} className="mb-6 text-brass-light" />
              <span className="mb-2 block font-serif-display text-[13px] italic text-brass-light">
                {step.index}
              </span>
              <h3 className="mb-2 font-serif-display text-[19px] font-medium text-white">
                {step.title}
              </h3>
              <p className="max-w-[24ch] text-[13.5px] leading-relaxed text-cream-mute">
                {step.desc}
              </p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
