import { FileText, Globe } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PLACES = [
  { name: "Spa Reception", value: 842 },
  { name: "Room 1001", value: 614 },
  { name: "The Terrace", value: 488 },
  { name: "Ballroom Entrance", value: 351 },
  { name: "Room 324", value: 206 },
];

const OPENED = [
  { name: "Hotel Directory", kind: "pdf" as const, value: "3,412" },
  { name: "Spa booking page", kind: "web" as const, value: "1,208" },
  { name: "Dinner Menu", kind: "pdf" as const, value: "964" },
];

const QUIET = [
  { name: "Gym Studio", note: "No visits in 30 days" },
  { name: "Room 214", note: "No visits in 21 days" },
];

/**
 * The questions hotels ask, answered plainly: which Rooms & Areas guests
 * use, which PDFs and websites they open, how temporary information did,
 * and which Codes have gone quiet. Illustrative figures.
 */
export default function AnalyticsSnapshot() {
  const max = Math.max(...PLACES.map((p) => p.value));
  return (
    <Reveal>
      <div
        className="ixp grid grid-cols-1 gap-4 rounded-[28px] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.7)] sm:p-6 lg:grid-cols-2"
        role="img"
        aria-label="Informax Cloud insights, illustrative: the most used Rooms and Areas, the most opened PDFs and websites, how temporary content performed and which Codes have had no visits recently."
      >
        <div className="ixp-card p-6" aria-hidden>
          <p className="ixp-label">Most used Rooms &amp; Areas · 30 days</p>
          <ul className="mt-5 space-y-4">
            {PLACES.map((p) => (
              <li key={p.name}>
                <div className="flex items-baseline justify-between text-[14px]">
                  <span className="text-ix-cream">{p.name}</span>
                  <span className="ixp-tabular text-ix-muted">{p.value.toLocaleString("en-GB")}</span>
                </div>
                <div className="mt-2 h-[5px] rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-ix-brand" style={{ width: `${(p.value / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-4" aria-hidden>
          <div className="ixp-card p-6">
            <p className="ixp-label">Most opened PDFs and websites</p>
            <ul className="mt-3 divide-y divide-white/[0.06]">
              {OPENED.map((o) => (
                <li key={o.name} className="flex items-center justify-between gap-3 py-2.5 text-[14px]">
                  <span className="flex items-center gap-2.5 text-ix-cream">
                    {o.kind === "web" ? <Globe size={15} className="text-ix-dim" /> : <FileText size={15} className="text-ix-dim" />}
                    {o.name}
                  </span>
                  <span className="ixp-tabular text-ix-muted">{o.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="ixp-card p-5">
              <p className="ixp-label">Temporary content</p>
              <p className="mt-2 text-[14px] text-ix-cream">Wedding Welcome</p>
              <p className="ixp-display ixp-tabular mt-2 text-[2.1rem] font-semibold leading-none tracking-[-0.03em] text-white">126</p>
              <p className="mt-1.5 text-[12px] text-ix-dim">opens in two days</p>
            </div>
            <div className="ixp-card p-5">
              <p className="ixp-label">Codes to check</p>
              <ul className="mt-2 space-y-2">
                {QUIET.map((q) => (
                  <li key={q.name}>
                    <p className="text-[14px] text-ix-cream">{q.name}</p>
                    <p className="text-[12px] text-[#ff9b84]">{q.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
