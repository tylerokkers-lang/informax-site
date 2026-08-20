import { Compass, Handshake, KeyRound, MapPin, SmartphoneNfc } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, EmLight } from "@/components/ui";

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
    desc: "They encounter an Informax tag — on the desk, wall, or key wallet.",
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
    <section
      id="guest-journey"
      className="scroll-mt-24 bg-charcoal-950 text-cream py-24 md:py-32"
    >
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow tone="dark" center>
            The Guest Journey
          </Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-white">
            From check-in to <EmLight>checkout.</EmLight>
          </h2>
        </Reveal>

        <RevealStagger className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6">
          <div className="hidden lg:block absolute top-[45px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-line-dark to-transparent" />
          {STEPS.map((step) => (
            <RevealStaggerItem key={step.index} className="relative group">
              <div className="relative z-[2] mb-6 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-line-dark bg-charcoal-850 transition-all duration-[400ms] group-hover:scale-105 group-hover:border-brass-light">
                <step.icon size={28} className="text-brass-light" />
              </div>
              <span className="font-serif-display italic text-[13px] text-brass-light block mb-2.5">
                {step.index}
              </span>
              <h3 className="font-serif-display text-xl font-medium text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-cream-mute leading-relaxed">
                {step.desc}
              </p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
