/** The approved hierarchy: Property, Space, Block, Access Point, with real-world examples. */
const LEVELS = [
  ["Property", "The hotel or restaurant"],
  ["Space", "An operational section"],
  ["Block", "A room, table or facility"],
  ["Access Point", "What guests scan"],
] as const;

const EXAMPLES = [
  ["A hotel", ["Marlowe Grand", "Bedrooms", "Room 324", "Bedside Table"]],
  ["A restaurant", ["Copper Table", "Terrace", "Table 7", "Table Card"]],
] as const;

export default function Flow({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const card = dark ? "bg-white/[0.07] text-white" : "bg-white text-ink shadow-[0_0_0_1px_rgba(11,21,36,0.08)]";
  const mute = dark ? "text-cream-mute" : "text-ink-mute";
  const arrow = <span aria-hidden className={`text-xl ${mute}`}>→</span>;
  return (
    <div className={className}>
      <ol className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch" aria-label="Property, Space, Block, Access Point">
        {LEVELS.map(([t, b], i) => (
          <li key={t} className="contents">
            <div className={`rounded-2xl px-5 py-4 ${card}`}>
              <p className="text-[16px] font-semibold">{t}</p>
              <p className={`mt-1 text-[13px] ${mute}`}>{b}</p>
            </div>
            {i < LEVELS.length - 1 && <span className="hidden self-center sm:block">{arrow}</span>}
          </li>
        ))}
      </ol>
      <div className="mt-5 space-y-4">
        {EXAMPLES.map(([label, names]) => (
          <div key={label}>
            <p className={`mb-1 px-5 text-[12px] ${mute}`}>{label}</p>
            <div className="grid gap-x-3 gap-y-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              {names.map((n, i) => (
                <span key={n} className="contents">
                  <span className={`px-5 text-[14.5px] ${dark ? "text-white" : "text-ink"}`}>{n}</span>
                  {i < names.length - 1 && <span aria-hidden className="hidden w-5 sm:block" />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
