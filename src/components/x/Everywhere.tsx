import { Check, FileText } from "lucide-react";

/**
 * "One Scan Point. Unlimited placements. Instant updates." as a picture:
 * one publish in Informax Cloud, and every printed copy of that Scan Point
 * lights up in turn. Room numbers are illustrative. Pure CSS motion, which
 * holds the finished state for reduced motion.
 */
const ROOMS = [
  "101", "102", "103", "104", "105", "106",
  "201", "202", "203", "204", "205", "206",
  "301", "302", "303", "304", "305", "306",
  "401", "402", "403", "404", "Suite", "Pent.",
];

export default function Everywhere() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 rounded-[28px] bg-white/[0.03] p-5 ring-1 ring-white/8 sm:p-8 md:rounded-[36px] lg:grid-cols-[0.9fr_auto_1.3fr] lg:gap-8 lg:p-12">
      {/* The one update. */}
      <div className="ixp rounded-[22px] p-5 sm:p-6" aria-hidden>
        <p className="ixp-label">Bedrooms · Bedside Table</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#0693e3]/15 text-[#8ed1fc]">
            <FileText size={20} />
          </span>
          <div>
            <p className="ixp-display text-[17px] leading-tight">Guest Directory</p>
            <p className="text-[13px] text-[#a4adc0]">Winter edition · PDF</p>
          </div>
        </div>
        <div className="x-send mt-6 flex items-center justify-center gap-2 rounded-[12px] bg-[#0693e3] px-4 py-3 text-[14px] font-semibold text-white">
          <Check size={16} /> Publish to every copy
        </div>
        <p className="mt-4 text-[12.5px] text-[#7a849c]">One Scan Point, printed for every room.</p>
      </div>

      <div aria-hidden className="mx-auto hidden h-px w-16 bg-[linear-gradient(90deg,rgba(142,209,252,0),rgba(142,209,252,0.8))] lg:block" />

      {/* Every copy, wherever it is placed. */}
      <div>
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-2.5" aria-label="Printed copies of one Scan Point, in 24 rooms, all showing the update">
          {ROOMS.map((r, n) => (
            <li
              key={r}
              className={`x-lit relative aspect-[3/4] flex-col justify-between rounded-[10px] p-2 ${n >= 12 ? "hidden sm:flex" : "flex"}`}
              style={{ ["--d" as string]: `${0.9 + n * 0.05}s` }}
            >
              <span className="x-lit-dot block h-1.5 w-1.5 rounded-full" aria-hidden />
              <span className="x-num text-[11px] font-semibold text-white/70">{r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-cream-mute">Room numbers are illustrative. A Scan Point can be printed as many times as you need.</p>
      </div>
    </div>
  );
}
