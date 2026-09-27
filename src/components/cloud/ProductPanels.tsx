import { Check } from "lucide-react";

export function PermanentConnection() {
  const rows = [
    "A PDF is replaced",
    "A website is connected",
    "The Space is renamed",
    "Content is rolled back",
  ];
  return (
    <div className="rounded-[20px] bg-panel p-7 shadow-[0_0_0_1px_var(--line),0_12px_32px_-24px_rgba(11,21,36,0.35)] md:p-9">
      <div className="mb-2 text-[14px] font-semibold text-ink-mute">The Spa Space</div>
      <div className="font-serif-display text-[26px] leading-tight text-ink">One permanent connection.</div>
      <p className="mt-2 text-[15px] text-ink-mute">Its Touch Points stay connected when&hellip;</p>
      <ul className="mt-7">
        {rows.map((r) => (
          <li key={r} className="flex items-center justify-between gap-4 border-t border-line py-3.5 text-[15px] text-ink">
            {r}
            <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-moss">
              <Check size={14} /> Touch Points stay
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
