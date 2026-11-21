import { BookOpen, CalendarDays, Clock3, Flower2, Globe, MapPin, Newspaper, UtensilsCrossed, Wifi } from "lucide-react";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

/** Everything a Scan Point can deliver, as a calm grid. The last tile shows time-limited content at work. */
const TYPES = [
  { icon: UtensilsCrossed, title: "Digital menus", body: "Breakfast, dinner, wine and room service, always the version the kitchen is cooking." },
  { icon: BookOpen, title: "Guest information", body: "The directory for your property, from check-out times to the pillow menu." },
  { icon: Wifi, title: "Wi-Fi access", body: "Network names and passwords where guests look for them, changed in one place." },
  { icon: Flower2, title: "Spa information", body: "Treatments, opening hours and today's availability, ready to book by phone." },
  { icon: MapPin, title: "Local recommendations", body: "Your concierge's favourite places, kept fresh with the seasons." },
  { icon: CalendarDays, title: "Event information", body: "Programmes, rooms and timings that keep up when plans change." },
  { icon: Newspaper, title: "Digital brochures", body: "Weddings, meetings and seasonal offers, without another print run." },
  { icon: Globe, title: "Website experiences", body: "Point any Scan Point at a page of your own website instead of a PDF." },
] as const;

export default function ContentTypes({ dark = false }: { dark?: boolean }) {
  const card = dark ? "bg-white/[0.04] ring-1 ring-white/8" : "bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06)]";
  return (
    <RevealStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {TYPES.map(({ icon: Icon, title, body }) => (
        <RevealStaggerItem key={title} className={`group flex flex-col rounded-[24px] p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-7 ${card}`}>
          <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${dark ? "bg-brass/20 text-brass-light" : "bg-brass/10 text-brass-deep"}`}>
            <Icon size={20} aria-hidden />
          </span>
          <h3 className={`mt-8 text-[18px] font-semibold tracking-[-0.015em] ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>{body}</p>
        </RevealStaggerItem>
      ))}

      {/* Temporary and scheduled content: the full width of the grid, with a day drawn as a timeline. */}
      <RevealStaggerItem className={`overflow-hidden rounded-[24px] p-6 sm:col-span-2 md:p-8 lg:col-span-4 ${dark ? "bg-brass/15 ring-1 ring-brass-light/20" : "bg-ink text-white"}`}>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/10 text-brass-light">
              <Clock3 size={20} aria-hidden />
            </span>
            <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.02em] text-white">Temporary and scheduled content</h3>
            <p className="mt-2 max-w-[34rem] text-[15.5px] leading-relaxed text-white/70">
              Publish tonight&rsquo;s menu or a spa offer until 18:00. When it ends, your usual content returns on its own. Plan ahead with schedules for the parts of the day that change.
            </p>
          </div>
          <div aria-hidden className="relative">
            <div className="flex justify-between text-[12px] font-medium text-white/45 x-num">
              <span>09:00</span>
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
            </div>
            <div className="relative mt-3 h-14 rounded-[12px] bg-white/[0.06]">
              <div className="absolute inset-y-2 left-2 right-[58.6%] flex items-center overflow-hidden whitespace-nowrap rounded-[8px] bg-white/10 px-3 text-[13px] font-medium text-white/80">Spa treatments</div>
              <div className="absolute inset-y-2 left-[42%] right-[25.3%] flex items-center overflow-hidden whitespace-nowrap rounded-[8px] bg-[#0693e3] px-3 text-[13px] font-semibold text-white">
                Spa this afternoon
              </div>
              <div className="absolute inset-y-2 left-[75.5%] right-2 flex items-center overflow-hidden whitespace-nowrap rounded-[8px] bg-white/10 px-3 text-[13px] font-medium text-white/80">Back to usual</div>
            </div>
            <p className="mt-3 text-[12.5px] text-white/50">A temporary offer from 14:00 to 18:00, then the usual content returns.</p>
          </div>
        </div>
      </RevealStaggerItem>
    </RevealStagger>
  );
}
