import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Display, Kicker, Lede, Soft } from "./type";

const ROWS = ["Dining", "Spa & Wellness", "Facilities", "Guest Services", "Explore the Area"];

export default function GuestDirectoryCallout() {
  return (
    <div className="grid items-center gap-14 grid-cols-1 lg:grid-cols-[1fr_auto] lg:gap-24">
      <Reveal>
        <Kicker>One Space among many</Kicker>
        <Display>
          And yes, your entire <Soft>Guest Directory</Soft> can be a Space too.
        </Display>
        <Lede className="mt-8">
          Hotels can still create a beautifully designed digital Guest
          Directory and connect it throughout the property. But Informax
          Cloud goes much further.
        </Lede>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto w-[260px]">
        <div className="rounded-[34px] border-[6px] border-charcoal-950 bg-paper-alt p-4 shadow-[0_30px_70px_rgba(15,15,24,0.22)]">
          <div className="mb-4 mt-1 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
            The Grand Hotel
          </div>
          <div className="font-serif-display text-[24px] leading-tight text-ink">Guest Directory</div>
          <div className="mt-5 bg-panel">
            {ROWS.map((r) => (
              <div key={r} className="flex items-center justify-between border-b border-line px-3.5 py-3 text-[12.5px] text-ink">
                {r}
                <ChevronRight size={13} className="text-ink-mute" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
