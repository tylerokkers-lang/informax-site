import type { Metadata } from "next";
import { MousePointerClick, QrCode, SquareCheckBig } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnGhost } from "@/components/ui";
import DigitalInformationHero from "@/components/sections/DigitalInformationHero";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Digital Brochures, Pamphlets & Directories",
  description:
    "Turn information into an experience. Informax designs digital brochures, pamphlets and directories that make company, product, property and hospitality information easy to explore.",
  alternates: { canonical: "/digital-information" },
};

const FLOW = [
  {
    n: "01",
    icon: QrCode,
    title: "Scan",
    desc: "A QR code, NFC tag or direct link. No app to find or install first.",
  },
  {
    n: "02",
    icon: SquareCheckBig,
    title: "Access",
    desc: "The content opens instantly, already organised, already on-brand.",
  },
  {
    n: "03",
    icon: MousePointerClick,
    title: "Act",
    desc: "Book, enquire, browse or share, right from what they're reading.",
  },
];

const BROCHURE_USES = [
  "Company brochures",
  "Service brochures",
  "Property brochures",
  "Event information",
  "Product information",
  "Sales material",
];

const DIRECTORY_USES = [
  "Hotels & venues",
  "Property businesses",
  "Offices",
  "Organisations",
  "Events",
  "Other businesses",
];

export default function DigitalInformationPage() {
  return (
    <>
      <DigitalInformationHero />

      {/* The flow: scan, access, act */}
      <section id="flow" className="scroll-mt-24 bg-charcoal-950 py-24 text-cream md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="mb-16 max-w-xl md:mb-20">
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
              How Guests Reach It
            </span>
            <h2 className="font-serif-display font-medium leading-[1.12] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-white">
              Documents, rebuilt as an experience.
            </h2>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-3">
            {FLOW.map((step) => (
              <RevealStaggerItem key={step.n}>
                <step.icon size={24} className="mb-6 text-brass-light" />
                <span className="mb-2 block font-serif-display text-[13px] italic text-brass-light">
                  {step.n}
                </span>
                <h3 className="mb-2 font-serif-display text-[22px] font-medium text-white">
                  {step.title}
                </h3>
                <p className="max-w-[30ch] text-[14.5px] leading-relaxed text-cream-mute">
                  {step.desc}
                </p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Brochures & pamphlets */}
      <section id="brochures" className="scroll-mt-24 bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
                Brochures &amp; Pamphlets
              </span>
              <h2 className="mb-6 font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(26px,3.2vw,38px)] text-ink">
                Turn information into an experience.
              </h2>
              <p className="mb-4 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-mute">
                Instead of a dull PDF attachment, a professionally designed
                digital experience that&rsquo;s easy to share, easy to
                explore, and built to reflect your brand properly.
              </p>
              <p className="mb-8 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-mute">
                Pamphlets follow the same principle at a smaller scale:
                focused, attractive information built specifically for
                digital use.
              </p>
              <BtnGhost href="/enquire" arrow>
                Discuss a brochure or pamphlet
              </BtnGhost>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-t border-line pt-8">
                <ul className="flex flex-wrap gap-x-8 gap-y-4">
                  {BROCHURE_USES.map((use) => (
                    <li
                      key={use}
                      className="text-[14.5px] font-medium text-ink-soft"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Directories */}
      <section
        id="directories"
        className="scroll-mt-24 bg-panel border-y border-line py-24 md:py-32"
      >
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
                Digital Directories
              </span>
              <h2 className="mb-6 font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(26px,3.2vw,38px)] text-ink">
                Put the information where people need it.
              </h2>
              <p className="mb-8 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-mute">
                Directories aren&rsquo;t limited to hotels. Anywhere there
                &rsquo;s a lot to manage, such as facilities, services,
                contacts or locations, a custom directory makes it navigable
                instead of overwhelming.
              </p>
              <BtnGhost href="/enquire" arrow>
                Discuss a directory
              </BtnGhost>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-t border-line pt-8">
                <ul className="flex flex-wrap gap-x-8 gap-y-4">
                  {DIRECTORY_USES.map((use) => (
                    <li
                      key={use}
                      className="text-[14.5px] font-medium text-ink-soft"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 max-w-[48ch] text-[14px] leading-relaxed text-ink-mute">
                Looking for a hospitality guest directory specifically?{" "}
                <a
                  href="/hospitality"
                  className="font-medium text-brass-deep underline underline-offset-2"
                >
                  See our dedicated hospitality practice
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta
        title={<>Information that deserves better design?</>}
        description="Tell us what you're trying to communicate and we'll help you work out the right shape for it."
      />
    </>
  );
}
