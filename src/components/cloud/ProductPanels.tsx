import { Check } from "lucide-react";

export function PermanentAddress() {
  const rows = [
    "A PDF is replaced",
    "A website is connected",
    "The Space is renamed",
    "Content is rolled back",
  ];
  return (
    <div className="border border-line bg-panel p-7 md:p-9">
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-ink-mute">The Spa Space</div>
      <div className="font-serif-display text-[26px] leading-tight text-ink">One permanent connection.</div>
      <p className="mt-2 text-[14px] text-ink-mute">Its Informax address does not change when&hellip;</p>
      <ul className="mt-7">
        {rows.map((r) => (
          <li key={r} className="flex items-center justify-between border-t border-line py-3.5 text-[14.5px] text-ink">
            {r}
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-moss">
              <Check size={13} /> Address stays
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
