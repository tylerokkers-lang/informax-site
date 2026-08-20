import { Nfc, QrCode } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

export default function NoApp() {
  return (
    <section className="bg-panel border-y border-line py-20 md:py-24">
      <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>Zero Friction</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(26px,3.2vw,38px)] text-ink mb-4">
            No app. <Em>No friction.</Em>
          </h2>
          <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-[440px]">
            Tap or scan, and the hotel&rsquo;s digital experience opens
            instantly in the guest&rsquo;s own browser. There is no app
            store, no account and no download, just information, right when
            it&rsquo;s needed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-panel px-7 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-alt">
              <Nfc size={22} className="text-brass-deep" />
            </div>
            <span className="text-sm font-semibold text-ink">Tap (NFC)</span>
          </div>
          <span className="font-serif-display italic text-ink-mute text-lg">or</span>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-panel px-7 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-alt">
              <QrCode size={22} className="text-brass-deep" />
            </div>
            <span className="text-sm font-semibold text-ink">Scan (QR)</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
