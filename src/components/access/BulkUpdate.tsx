import { Reveal } from "@/components/Reveal";

const SCOPES = ["Entire hotel", "A floor", "A room range", "Selected rooms", "Selected areas"];
const ROOMS = Array.from({ length: 32 }, (_, i) => 301 + i);
const inRange = (n: number) => n >= 301 && n <= 328;

/**
 * A floor at a glance: Rooms 301–328 chosen as a range, sent to the
 * Conference Welcome until Friday, then home again on their own.
 */
export default function BulkUpdate() {
  return (
    <Reveal>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] bg-panel p-6 shadow-[0_0_0_1px_var(--line)] md:p-8">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {SCOPES.map((sc) => (
              <span
                key={sc}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                  sc === "A room range" ? "bg-charcoal-900 text-white" : "bg-paper-alt text-ink-mute"
                }`}
              >
                {sc}
              </span>
            ))}
          </div>
          <p className="mt-7 text-[13px] font-medium text-ink-mute">Floor 3</p>
          <div className="mt-3 grid grid-cols-8 gap-1.5 sm:gap-2" aria-label="Rooms 301 to 328 selected on Floor 3" role="img">
            {ROOMS.map((n) => (
              <span
                key={n}
                className={`flex aspect-square items-center justify-center rounded-[8px] text-[10px] font-medium sm:text-[11px] ${
                  inRange(n) ? "bg-brass text-white" : "bg-paper-alt text-ink-mute"
                }`}
                aria-hidden
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[28px] bg-charcoal-900 p-6 text-white md:p-8">
          <div>
            <p className="text-[13px] font-semibold text-brass-light">Rooms 301–328 · For a while</p>
            <p className="mt-2 font-serif-display text-[28px] leading-tight">Conference Welcome</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-[14px]">
              <div>
                <dt className="text-cream-mute">Until</dt>
                <dd className="mt-0.5 text-white">Friday · 11:00</dd>
              </div>
              <div>
                <dt className="text-cream-mute">Then</dt>
                <dd className="mt-0.5 text-white">Back to Hotel Directory</dd>
              </div>
            </dl>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="ix-btn ix-btn-primary pointer-events-none min-h-[42px] px-4 text-[14px]">Show in 28 rooms</span>
            <span className="text-[14px] font-medium text-cream-mute">Return all to normal</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
