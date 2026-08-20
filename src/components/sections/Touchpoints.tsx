import {
  Building2,
  CalendarDays,
  ConciergeBell,
  RotateCcwClock,
  Tag,
  Utensils,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const TOUCHPOINTS = [
  {
    icon: Utensils,
    title: "Promote Dining",
    desc: "Put restaurants, bars and menus directly in front of every guest.",
  },
  {
    icon: CalendarDays,
    title: "Drive Additional Bookings",
    desc: "Promote spa treatments, experiences and facilities guests might otherwise miss.",
  },
  {
    icon: ConciergeBell,
    title: "Reduce Repetitive Questions",
    desc: "Give guests instant access to what reception is asked every single day.",
  },
  {
    icon: Building2,
    title: "Showcase The Property",
    desc: "Make sure guests actually know everything that's available to them.",
  },
  {
    icon: Tag,
    title: "Promote Offers",
    desc: "Turn the guest directory into another opportunity for revenue.",
  },
  {
    icon: RotateCcwClock,
    title: "Keep Information Current",
    desc: "Update the digital experience in seconds, without touching the hardware.",
  },
];

export default function Touchpoints() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Beyond Information</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            It&rsquo;s not just information.
            <br />
            It&rsquo;s another <Em>touchpoint with your guest.</Em>
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {TOUCHPOINTS.map((t) => (
            <RevealStaggerItem
              key={t.title}
              className="border-b border-r border-line px-8 py-9"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel mb-5">
                <t.icon size={20} className="text-brass-deep" />
              </div>
              <h4 className="font-serif-display text-lg font-medium text-ink mb-2">
                {t.title}
              </h4>
              <p className="text-sm text-ink-mute leading-relaxed">{t.desc}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
