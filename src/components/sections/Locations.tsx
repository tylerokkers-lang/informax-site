import {
  Bed,
  CalendarDays,
  ChevronsUpDown,
  ConciergeBell,
  DoorOpen,
  Dumbbell,
  Martini,
  Sofa,
  Sparkles,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const LOCATIONS = [
  { icon: Bed, label: "Guest Rooms" },
  { icon: DoorOpen, label: "Reception" },
  { icon: ChevronsUpDown, label: "Lifts" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Martini, label: "Bars" },
  { icon: Sparkles, label: "Spa" },
  { icon: Waves, label: "Pool" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Users, label: "Meeting Rooms" },
  { icon: CalendarDays, label: "Event Spaces" },
  { icon: ConciergeBell, label: "Concierge" },
  { icon: Sofa, label: "Common Areas" },
];

export default function Locations() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mb-16 max-w-xl md:mb-20">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            Where Informax Lives
          </span>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-ink">
            Put the information where{" "}
            <span className="italic text-brass-deep">your guests need it.</span>
          </h2>
        </Reveal>

        <RevealStagger className="flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-10">
          {LOCATIONS.map((loc) => (
            <RevealStaggerItem key={loc.label}>
              <div className="flex items-center gap-2.5">
                <loc.icon size={18} className="shrink-0 text-brass-deep" />
                <span className="text-[14.5px] font-medium text-ink">
                  {loc.label}
                </span>
              </div>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
