import type { Metadata } from "next";
import {
  Building2,
  Calendar,
  Compass,
  Link2,
  Nfc,
  Package,
  QrCode,
  ScrollText,
  Gift,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnGhost, Em, Eyebrow, EmLight } from "@/components/ui";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Digital Brochures, Pamphlets & Directories",
  description:
    "Turn information into an experience. Informax designs digital brochures, pamphlets and directories that make company, product, property and hospitality information easy to explore.",
  alternates: { canonical: "/digital-information" },
};

const BROCHURE_USES = [
  "Company brochures",
  "Service brochures",
  "Property brochures",
  "Event information",
  "Product information",
  "Hospitality information",
  "Sales material",
  "Welcome guides",
];

const DIRECTORY_USES = [
  { icon: Building2, label: "Hotels" },
  { icon: Building2, label: "Hospitality businesses" },
  { icon: Package, label: "Property businesses" },
  { icon: Compass, label: "Venues" },
  { icon: Building2, label: "Offices" },
  { icon: ScrollText, label: "Organisations" },
  { icon: Calendar, label: "Events" },
  { icon: Gift, label: "Other businesses" },
];

const ACCESS_METHODS = [
  { icon: QrCode, label: "QR codes" },
  { icon: Nfc, label: "NFC tap" },
  { icon: Link2, label: "Direct links" },
  { icon: Compass, label: "Website integration" },
];

export default function DigitalInformationPage() {
  return (
    <>
      <section className="bg-charcoal-950 text-cream text-center pt-[150px] pb-16 md:pt-[170px] md:pb-20">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Eyebrow tone="dark" center>
            Digital Information
          </Eyebrow>
          <h1 className="font-serif-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.2] text-white mx-auto mb-5 max-w-2xl">
            Beyond the website: the other information your business shares.
          </h1>
          <p className="text-cream-mute text-[17px] max-w-xl mx-auto leading-relaxed">
            Brochures, pamphlets and directories, designed as digital
            experiences rather than documents.
          </p>
        </div>
      </section>

      <section id="brochures" className="scroll-mt-24 bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <Reveal>
            <Eyebrow>Digital Brochures &amp; Pamphlets</Eyebrow>
            <h2 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(28px,3.4vw,40px)] text-ink mb-5">
              Turn information into <Em>an experience.</Em>
            </h2>
            <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-md mb-4">
              Instead of sending a dull PDF attachment, Informax designs a
              professionally built digital experience that is easy to
              share, easy to explore, and built to reflect your brand
              properly.
            </p>
            <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-md mb-8">
              Digital pamphlets follow the same principle at a smaller
              scale: simple, focused, attractive information built
              specifically for digital use, rather than a printed page
              shrunk to fit a screen.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <BtnGhost href="/enquire">Discuss a Brochure or Pamphlet</BtnGhost>
              <span className="text-sm text-ink-mute">
                Brochures{" "}
                <strong className="font-semibold text-brass-deep">
                  from £400
                </strong>{" "}
                &middot; Pamphlets{" "}
                <strong className="font-semibold text-brass-deep">
                  from £200
                </strong>
              </span>
            </div>
          </Reveal>

          <RevealStagger className="grid grid-cols-2 gap-3">
            {BROCHURE_USES.map((use) => (
              <RevealStaggerItem
                key={use}
                className="rounded-xl border border-line bg-panel px-4 py-4 text-[13.5px] font-medium text-ink-soft"
              >
                {use}
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section id="directories" className="scroll-mt-24 bg-panel border-y border-line py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <RevealStagger className="order-2 lg:order-1 grid grid-cols-2 gap-3">
            {DIRECTORY_USES.map((use) => (
              <RevealStaggerItem
                key={use.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-4"
              >
                <use.icon size={17} className="text-brass-deep shrink-0" />
                <span className="text-[13.5px] font-medium text-ink-soft">
                  {use.label}
                </span>
              </RevealStaggerItem>
            ))}
          </RevealStagger>

          <Reveal className="order-1 lg:order-2">
            <Eyebrow>Digital Directories</Eyebrow>
            <h2 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(28px,3.4vw,40px)] text-ink mb-5">
              Put the information where <Em>people need it.</Em>
            </h2>
            <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-md mb-6">
              Directories aren&rsquo;t limited to hotels. Anywhere there&rsquo;s
              a lot of information to manage, such as facilities, services,
              contacts or locations, a custom digital directory makes it
              navigable instead of overwhelming.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {ACCESS_METHODS.map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3.5 py-2 text-[12.5px] font-semibold text-ink-soft"
                >
                  <m.icon size={13} className="text-brass-deep" />
                  {m.label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <BtnGhost href="/enquire">Discuss a Directory</BtnGhost>
              <span className="text-sm text-ink-mute">
                Directories{" "}
                <strong className="font-semibold text-brass-deep">
                  from £900
                </strong>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-xl">
            <p className="text-ink-mute text-[15px] leading-relaxed">
              Looking for a hospitality guest directory specifically?{" "}
              <a href="/hospitality" className="text-brass-deep underline underline-offset-2">
                See our dedicated hospitality practice
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={<>Have information that deserves <EmLight>better design?</EmLight></>}
        description="Tell us what you're trying to communicate and we'll help you work out whether a brochure, pamphlet or directory is the right shape for it."
      />
    </>
  );
}
