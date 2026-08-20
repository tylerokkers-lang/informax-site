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
import { Eyebrow, Em } from "@/components/ui";

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
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Where Informax Lives</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink">
            Put the information where <Em>your guests need it.</Em>
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {LOCATIONS.map((loc) => (
            <RevealStaggerItem
              key={loc.label}
              className="flex flex-col items-start gap-3.5 rounded-2xl border border-line bg-panel px-5 py-6 transition-all duration-300 hover:border-brass hover:-translate-y-1"
            >
              <loc.icon size={22} className="text-brass-deep" />
              <span className="text-sm font-semibold text-ink">
                {loc.label}
              </span>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
