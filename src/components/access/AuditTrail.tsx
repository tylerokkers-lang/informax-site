import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const ENTRIES = [
  { who: "Sarah", initials: "S", what: "changed Room 1001", detail: "Hotel Directory → Wedding Welcome · until tomorrow at 11:00", when: "Today, 14:12" },
  { who: "Informax", initials: "", what: "returned Room 1001 to Hotel Directory", detail: "Wedding Welcome ended as planned", when: "Tomorrow, 11:00", auto: true },
];

/** A short, human history: who, what, when, including the automatic return. */
export default function AuditTrail() {
  return (
    <RevealStagger className="rounded-[28px] bg-panel p-2 shadow-[0_0_0_1px_var(--line)] md:p-3">
      {ENTRIES.map((e, i) => (
        <RevealStaggerItem
          key={i}
          className={`flex items-start gap-4 rounded-[20px] px-4 py-4 md:px-5 ${i < ENTRIES.length - 1 ? "border-b border-line" : ""}`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
              e.auto ? "bg-charcoal-900 text-brass-light" : "bg-paper-alt text-ink"
            }`}
            aria-hidden
          >
            {e.auto ? "ix" : e.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] leading-snug text-ink">
              <span className="font-semibold">{e.who}</span> {e.what}
              {e.auto && <span className="ml-2 rounded-full bg-paper-alt px-2 py-0.5 text-[12px] font-medium text-ink-mute">Automatic</span>}
            </p>
            <p className="mt-1 text-[14px] text-ink-soft">{e.detail}</p>
            <p className="mt-1 text-[13px] text-ink-mute">{e.when}</p>
          </div>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
