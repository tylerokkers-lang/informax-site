import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const DESTINATIONS = [
  "Your hotel website",
  "Booking platforms",
  "Restaurant menus",
  "Spa booking",
  "PDF documents",
  "Hotel directories",
  "Conference information",
  "Other digital services",
];

/** The systems stay; Informax decides how guests reach them from each place. */
export default function FitsAround() {
  return (
    <RevealStagger className="grid grid-cols-1 border-t border-line-dark sm:grid-cols-2 lg:grid-cols-4">
      {DESTINATIONS.map((d) => (
        <RevealStaggerItem key={d} className="border-b border-line-dark py-5 pr-4 text-[17px] text-white md:text-[19px]">
          {d}
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
