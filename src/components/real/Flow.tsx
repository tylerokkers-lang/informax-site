/** The product model in one line: Code, Space, live content. */
export default function Flow({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const items = [
    ["Code", "Stays where it is"],
    ["Space", "A real place: Room 324, Table 7"],
    ["Live content", "A PDF or a website"],
  ];
  return (
    <ol className={`flex flex-col gap-3 sm:flex-row sm:items-stretch ${className}`}>
      {items.map(([t, b], i) => (
        <li key={t} className="flex items-center gap-3 sm:flex-1">
          <div className={`flex-1 rounded-2xl px-5 py-4 ${dark ? "bg-white/[0.07] text-white" : "bg-white text-ink shadow-[0_0_0_1px_rgba(11,21,36,0.08)]"}`}>
            <p className="text-[16px] font-semibold">{t}</p>
            <p className={`mt-1 text-[13px] ${dark ? "text-cream-mute" : "text-ink-mute"}`}>{b}</p>
          </div>
          {i < items.length - 1 && (
            <span aria-hidden className={`hidden text-xl sm:block ${dark ? "text-cream-mute" : "text-ink-mute"}`}>→</span>
          )}
        </li>
      ))}
    </ol>
  );
}
