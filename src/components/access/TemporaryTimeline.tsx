import { Reveal } from "@/components/Reveal";

const STAGES = [
  { label: "What guests see now", title: "Hotel Directory", note: "The hotel’s Default Landing Page" },
  { label: "For a while", title: "Wedding Welcome", note: "Until tomorrow at 11:00", accent: true },
  { label: "Then", title: "Hotel Directory", note: "Back on its own" },
];

export const OCCASIONS = [
  "Weddings",
  "Conferences",
  "VIP arrivals",
  "Group stays",
  "Spa promotions",
  "Restaurant promotions",
  "Temporary notices",
  "Christmas programmes",
  "Corporate events",
];

/**
 * One room over time, in plain words: what guests see now, what they see
 * for a while, and what comes back afterwards. The line between stages is
 * the point: the room returns to the hotel's default without anyone
 * remembering to change it.
 */
export default function TemporaryTimeline() {
  return (
    <Reveal>
      <div className="rounded-[28px] bg-panel p-6 shadow-[0_0_0_1px_var(--line),0_30px_60px_-40px_rgba(11,21,36,0.35)] md:p-10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-serif-display text-[22px] text-ink md:text-[26px]">Room 1001</p>
          <p className="text-[13px] font-medium text-ink-mute">Floor 10</p>
        </div>
        <ol className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" aria-hidden />
          {STAGES.map((st) => (
            <li key={st.label} className="relative pl-8 md:pl-0 md:pr-6">
              <span
                className={`absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 md:static md:mb-6 md:block ${
                  st.accent ? "border-brass bg-brass" : "border-line bg-panel"
                }`}
                style={st.accent ? { boxShadow: "0 0 0 6px rgba(6,147,227,0.12)" } : undefined}
                aria-hidden
              />
              <p className={`text-[13px] font-semibold ${st.accent ? "text-brass-deep" : "text-ink-mute"}`}>{st.label}</p>
              <p className="mt-1 font-serif-display text-[20px] leading-snug text-ink md:text-[24px]">{st.title}</p>
              <p className="mt-1 text-[15px] text-ink-mute">{st.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
