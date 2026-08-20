import { ArrowRight, Nfc } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

export default function MeetInformax() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-panel border-y border-line py-24 md:py-28"
    >
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center mb-20">
          <Eyebrow center>Meet Informax</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            A digital gateway designed <Em>specifically for hospitality.</Em>
          </h2>
          <p className="text-ink-mute text-[17px] leading-relaxed">
            Guests simply tap or scan an Informax tag and instantly access
            the hotel&rsquo;s digital experience. No app. No downloads. No
            searching.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-8 md:gap-5">
          <RevealStaggerItem className="text-center">
            <span className="font-serif-display italic text-[13px] text-brass-deep block mb-1">
              01
            </span>
            <div className="max-w-[220px] mx-auto mb-5 rounded-3xl border border-line bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-2.5 shadow-[0_24px_50px_-24px_rgba(19,34,28,0.35)]">
              <div className="relative flex aspect-[9/16] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_45%,rgba(111,224,172,0.22),var(--charcoal-950)_65%)] p-4">
                <div className="relative h-[46px] w-[46px] rounded-full border border-brass-light">
                  <span className="absolute -inset-2.5 rounded-full border border-brass-light/35 animate-ripple" />
                  <span
                    className="absolute -inset-2.5 rounded-full border border-brass-light/35 animate-ripple"
                    style={{ animationDelay: "0.7s" }}
                  />
                  <Nfc
                    size={20}
                    className="absolute inset-0 m-auto text-brass-light"
                  />
                </div>
              </div>
            </div>
            <h4 className="font-serif-display text-[19px] font-medium text-ink mb-2">
              Guests Tap
            </h4>
            <p className="text-sm text-ink-mute max-w-[220px] mx-auto leading-relaxed">
              An NFC tag or QR code, in the room or around the property.
              Nothing to install.
            </p>
          </RevealStaggerItem>

          <RevealStaggerItem className="text-brass/60 flex justify-center rotate-90 md:rotate-0">
            <ArrowRight size={26} />
          </RevealStaggerItem>

          <RevealStaggerItem className="text-center">
            <span className="font-serif-display italic text-[13px] text-brass-deep block mb-1">
              02
            </span>
            <div className="max-w-[220px] mx-auto mb-5 rounded-3xl border border-line bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-2.5 shadow-[0_24px_50px_-24px_rgba(19,34,28,0.35)]">
              <div className="flex aspect-[9/16] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl bg-charcoal-950 p-4">
                <span className="self-start text-[9px] font-bold uppercase tracking-[0.08em] text-brass-light mb-0.5">
                  The Grand Hotel
                </span>
                {["Dining", "Spa & Wellness", "Guest Services", "Offers"].map(
                  (row) => (
                    <div
                      key={row}
                      className="flex w-full items-center gap-2 rounded-lg border border-line-dark bg-charcoal-850 px-2.5 py-[7px]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brass-light shrink-0" />
                      <span className="text-[9.5px] font-medium text-cream-mute">
                        {row}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            <h4 className="font-serif-display text-[19px] font-medium text-ink mb-2">
              It Opens
            </h4>
            <p className="text-sm text-ink-mute max-w-[220px] mx-auto leading-relaxed">
              The hotel&rsquo;s digital directory loads instantly in their
              phone&rsquo;s browser.
            </p>
          </RevealStaggerItem>

          <RevealStaggerItem className="text-brass/60 flex justify-center rotate-90 md:rotate-0">
            <ArrowRight size={26} />
          </RevealStaggerItem>

          <RevealStaggerItem className="text-center">
            <span className="font-serif-display italic text-[13px] text-brass-deep block mb-1">
              03
            </span>
            <div className="max-w-[220px] mx-auto mb-5 rounded-3xl border border-line bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-2.5 shadow-[0_24px_50px_-24px_rgba(19,34,28,0.35)]">
              <div className="flex aspect-[9/16] flex-col justify-center gap-2 overflow-hidden rounded-2xl bg-charcoal-950 p-4">
                <div className="h-11 w-full rounded-lg border border-line-dark bg-gradient-to-br from-brass-light/35 to-brass-light/10" />
                <div className="h-1.5 w-[90%] rounded bg-charcoal-850" />
                <div className="h-1.5 w-[70%] rounded bg-charcoal-850" />
                <div className="h-1.5 w-[50%] rounded bg-charcoal-850" />
              </div>
            </div>
            <h4 className="font-serif-display text-[19px] font-medium text-ink mb-2">
              They Explore
            </h4>
            <p className="text-sm text-ink-mute max-w-[220px] mx-auto leading-relaxed">
              Guests browse everything the property offers, at their own
              pace.
            </p>
          </RevealStaggerItem>
        </RevealStagger>
      </div>
    </section>
  );
}
