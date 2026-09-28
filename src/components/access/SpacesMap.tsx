import { FileText } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const LOCATIONS = ["Reception", "Entrance", "Treatment corridor"];

export const SPACE_EXAMPLES = ["Spa", "Restaurants", "Gym", "Meetings & Events", "Guest Information"];

/**
 * Shared information: several places follow one Space, so a single update
 * reaches all of them. The locations are grouped under the area they sit
 * in, so "Spa" is said once.
 */
export default function SpacesMap() {
  return (
    <Reveal>
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_120px_1fr] md:gap-0">
        <div>
          <p className="mb-3 text-[13px] font-medium text-ink-mute">At the Spa</p>
          <ul className="space-y-3">
            {LOCATIONS.map((l) => (
              <li
                key={l}
                className="flex items-center justify-between rounded-[16px] bg-panel px-5 py-4 shadow-[0_0_0_1px_var(--line)]"
              >
                <span className="text-[16px] font-medium text-ink">{l}</span>
                <span className="text-[13px] text-ink-mute">Access Point</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Converging lines on wide screens; a single line on phones. */}
        <div className="hidden pt-8 md:block" aria-hidden>
          <svg viewBox="0 0 120 200" className="h-[200px] w-full" preserveAspectRatio="none">
            {[33, 100, 167].map((y) => (
              <path key={y} d={`M0 ${y} C 60 ${y}, 60 100, 120 100`} fill="none" stroke="rgba(6,147,227,0.45)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>
        <span className="mx-auto h-8 w-px bg-brass/40 md:hidden" aria-hidden />

        <div className="rounded-[24px] bg-[linear-gradient(160deg,#16294a,#0d1c30)] p-6 shadow-[inset_0_0_0_1px_rgba(142,209,252,0.25),0_30px_60px_-30px_rgba(0,0,0,0.6)] md:mt-8 md:p-7">
          <p className="text-[13px] font-semibold text-brass-light">Space all three follow</p>
          <p className="mt-1 font-serif-display text-[30px] text-white">Spa</p>
          <div className="mt-5 flex items-center gap-3 rounded-[14px] bg-white/[0.06] p-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/[0.08] text-ix-cream">
              <FileText size={18} />
            </span>
            <div>
              <p className="text-[15px] font-medium text-white">Treatments</p>
              <p className="text-[13px] text-cream-mute">Updated once, shown in all three places</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
