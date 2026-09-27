import { Dumbbell, Flower2, LayoutGrid, MapPin, UtensilsCrossed, Waves, type LucideIcon } from "lucide-react";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const PLACES: { place: string; info: string; where: string; Icon: LucideIcon }[] = [
  { place: "Spa", info: "Treatment menu", where: "Beside the treatment rooms and at Spa reception.", Icon: Flower2 },
  { place: "Gym", info: "Class schedule", where: "At the studio door, current every week.", Icon: Dumbbell },
  { place: "Meetings & Events", info: "Floor plans", where: "Outside each room, right for today’s event.", Icon: LayoutGrid },
  { place: "Restaurants", info: "Menus", where: "On every table, current for each service.", Icon: UtensilsCrossed },
  { place: "Pool", info: "Opening hours", where: "Poolside, including seasonal changes.", Icon: Waves },
  { place: "Guest Services", info: "Local information", where: "In every room: dining, transport and what’s on.", Icon: MapPin },
];

/**
 * Where information lives in a Hotel. Real environments and the one thing
 * guests look for in each — deliberately not a product screen.
 */
export default function HotelEnvironments() {
  return (
    <RevealStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
      {PLACES.map(({ place, info, where, Icon }) => (
        <RevealStaggerItem
          key={place}
          className="group flex gap-4 rounded-[20px] bg-panel p-5 sm:block sm:p-7 shadow-[0_0_0_1px_var(--line),0_12px_32px_-24px_rgba(11,21,36,0.35)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--line),0_22px_44px_-26px_rgba(11,21,36,0.45)] md:p-8"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-paper-alt text-brass-deep">
            <Icon size={20} strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-ink-mute sm:mt-7">{place}</p>
            <h3 className="mt-0.5 font-serif-display text-[22px] leading-[1.15] text-ink sm:mt-1 sm:text-[26px]">{info}</h3>
            <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-ink-mute sm:mt-3">{where}</p>
          </div>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
