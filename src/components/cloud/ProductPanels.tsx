import { Check, FileText, Globe, Laptop, Smartphone, Tablet } from "lucide-react";
import CloudChrome from "./CloudChrome";

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

export function VersionHistory() {
  const rows = [
    ["hotel.com/spa/book", "Live", "web"],
    ["Seasonal Offer.pdf", "Previous", "pdf"],
    ["Spa Treatments.pdf", "Earlier", "pdf"],
  ] as const;
  return (
    <CloudChrome>
      <div className="p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-white">Spa · Version history</span>
        </div>
        {rows.map(([name, state, kind], i) => (
          <div key={name} className="flex items-center gap-4 border-t border-white/10 py-4">
            {kind === "web" ? <Globe size={15} className="text-brass-light" /> : <FileText size={15} className="text-cream-mute" />}
            <span className="min-w-0 flex-1 truncate text-[13px] text-white">{name}</span>
            <span className={`text-[10px] uppercase tracking-[0.13em] ${i === 0 ? "text-moss" : "text-cream-mute"}`}>{state}</span>
            {i > 0 && <span className="border border-white/20 px-2.5 py-1 text-[10px] text-white">Restore</span>}
          </div>
        ))}
        <p className="mt-4 text-[11px] text-cream-mute">Restoring an earlier version does not change the Space address.</p>
      </div>
    </CloudChrome>
  );
}

export function Devices() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { icon: Smartphone, label: "Phone" },
        { icon: Tablet, label: "Tablet" },
        { icon: Laptop, label: "Desktop" },
      ].map((d) => (
        <div key={d.label} className="border border-white/12 bg-charcoal-900 p-5">
          <d.icon size={22} className="mb-10 text-brass-light" />
          <div className="text-[13px] text-white">{d.label}</div>
        </div>
      ))}
    </div>
  );
}
