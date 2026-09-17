import { Nfc, QrCode } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function NoApp() {
  return (
    <section className="bg-panel border-y border-line py-20 md:py-24">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-6 md:px-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            Zero Friction
          </span>
          <h2 className="mb-4 font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(26px,3.2vw,38px)] text-ink">
            No app. <span className="italic text-brass-deep">No friction.</span>
          </h2>
          <p className="max-w-[440px] text-[16.5px] leading-relaxed text-ink-mute">
            Tap or scan, and the hotel&rsquo;s digital experience opens
            instantly in the guest&rsquo;s own browser. There is no app
            store, no account and no download, just information, right when
            it&rsquo;s needed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center gap-8 border-t border-line pt-8 md:border-t-0 md:pt-0 md:pl-8">
          <div className="flex items-center gap-2.5">
            <Nfc size={20} className="text-brass-deep" />
            <span className="text-[15px] font-semibold text-ink">Tap (NFC)</span>
          </div>
          <span className="font-serif-display text-[16px] italic text-ink-mute">or</span>
          <div className="flex items-center gap-2.5">
            <QrCode size={20} className="text-brass-deep" />
            <span className="text-[15px] font-semibold text-ink">Scan (QR)</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
