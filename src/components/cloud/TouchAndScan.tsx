import TouchPoint from "./TouchPoint";

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[150px] w-[84px] rounded-[16px] border-[3px] border-[#3a3a48] bg-charcoal-950 shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
      <div className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-white/15" />
      {children}
    </div>
  );
}

export default function TouchAndScan() {
  return (
    <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
      <div className="bg-charcoal-950 p-8 md:p-12">
        <div className="relative mb-10 flex h-[190px] items-center justify-center">
          <div className="absolute left-[calc(50%-96px)] top-1/2 -translate-y-1/2">
            <TouchPoint label="Spa" size="sm" active />
          </div>
          <div className="absolute left-[calc(50%-6px)] top-[6px] -rotate-[14deg]">
            <PhoneShell>
              <div className="absolute inset-x-3 bottom-4 top-8 border border-glow/30 bg-glow/10" />
            </PhoneShell>
          </div>
        </div>
        <div className="font-serif-display text-[34px] leading-none text-white">Touch</div>
        <p className="mt-3 text-[15px] text-cream-mute">Bring your phone close.</p>
      </div>

      <div className="bg-charcoal-950 p-8 md:p-12">
        <div className="relative mb-10 flex h-[190px] items-center justify-center">
          <PhoneShell>
            <div className="absolute inset-3 top-8">
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-b border-l", "right-0 bottom-0 border-b border-r"].map((c) => (
                <span key={c} className={`absolute h-3 w-3 border-glow ${c}`} />
              ))}
              <div className="absolute inset-x-2 top-1/2 h-px bg-glow/60" />
            </div>
          </PhoneShell>
          <div className="absolute left-[calc(50%+58px)] top-1/2 -translate-y-1/2 opacity-90">
            <TouchPoint label="Spa" size="sm" />
          </div>
        </div>
        <div className="font-serif-display text-[34px] leading-none text-white">Scan</div>
        <p className="mt-3 text-[15px] text-cream-mute">Open with your camera.</p>
      </div>
    </div>
  );
}
