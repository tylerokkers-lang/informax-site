import { ArrowDown, ArrowRight } from "lucide-react";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

/**
 * Place → Access Point (with its Code) → what guests see. A room can open
 * the hotel's Default Landing Page; shared areas usually follow a Space.
 */
const FLOWS = [
  { place: "Room 1001", destination: "Hotel Directory", kind: "Default Landing Page" },
  { place: "Spa Reception", destination: "Spa", kind: "Space" },
  { place: "Ballroom Entrance", destination: "Meetings & Events", kind: "Space" },
];

/** A small Access Point glyph: the plate with its Code, drawn in two tones. */
function Glyph() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-charcoal-900 shadow-[0_6px_14px_-8px_rgba(11,21,36,0.6)]" aria-hidden>
      <span className="grid h-4 w-4 grid-cols-3 gap-[1.5px] rounded-[3px] bg-white p-[2px]">
        {[1, 0, 1, 0, 1, 0, 1, 1, 0].map((on, i) => (
          <span key={i} className={on ? "bg-charcoal-900" : ""} />
        ))}
      </span>
    </span>
  );
}

export default function LocationFlow() {
  return (
    <RevealStagger className="grid grid-cols-1 gap-3 md:gap-4">
      {FLOWS.map((f) => (
        <RevealStaggerItem
          key={f.place}
          className="grid grid-cols-1 items-center gap-3 rounded-[20px] bg-panel p-5 shadow-[0_0_0_1px_var(--line)] md:grid-cols-[1fr_auto_auto_auto_1fr] md:gap-6 md:px-8 md:py-6"
        >
          <div>
            <p className="text-[13px] font-medium text-ink-mute">Room or area</p>
            <p className="font-serif-display text-[22px] text-ink md:text-[26px]">{f.place}</p>
          </div>
          <span className="hidden text-ink-mute/60 md:block" aria-hidden>
            <ArrowRight size={18} />
          </span>
          <div className="flex items-center gap-3">
            <span className="text-ink-mute/60 md:hidden" aria-hidden>
              <ArrowDown size={16} />
            </span>
            <Glyph />
            <div>
              <p className="text-[15px] font-semibold leading-tight text-ink">Access Point</p>
              <p className="text-[12px] text-ink-mute">with its own Code</p>
            </div>
          </div>
          <span className="hidden text-ink-mute/60 md:block" aria-hidden>
            <ArrowRight size={18} />
          </span>
          <div className="md:text-right">
            <span className="mb-3 block text-ink-mute/60 md:hidden" aria-hidden>
              <ArrowDown size={16} />
            </span>
            <p className="text-[13px] font-medium text-brass-deep">{f.kind}</p>
            <p className="font-serif-display text-[22px] text-ink md:text-[26px]">{f.destination}</p>
          </div>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
