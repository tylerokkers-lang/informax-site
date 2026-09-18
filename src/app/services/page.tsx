import type { Metadata } from "next";
import {
  BookOpen,
  FileText,
  LayoutGrid,
  Nfc,
  WandSparkles,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnGhost, BtnPrimary } from "@/components/ui";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services: Digital Guest Directories, Websites & Digital Information",
  description:
    "Informax's core services: digital guest directories for hospitality, custom website design and development, digital brochures and pamphlets, digital directories, and bespoke digital projects.",
  alternates: { canonical: "/services" },
};

const OTHER_SERVICES = [
  {
    icon: LayoutGrid,
    eyebrow: "Websites",
    title: "Custom-designed websites",
    desc: "Built around your business, its customers and its goals, not a generic template.",
    href: "/websites",
  },
  {
    icon: BookOpen,
    eyebrow: "Digital Brochures",
    title: "Brochures your business can share online",
    desc: "A professionally designed digital experience in place of a dull PDF attachment.",
    href: "/digital-information#brochures",
  },
  {
    icon: FileText,
    eyebrow: "Digital Pamphlets",
    title: "Focused information, built for digital use",
    desc: "Simple, attractive information for a specific service, product or event.",
    href: "/digital-information#brochures",
  },
  {
    icon: WandSparkles,
    eyebrow: "Bespoke Projects",
    title: "Something that doesn't fit neatly elsewhere",
    desc: "Talk to us. We design and build around exactly what you need.",
    href: "/enquire",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper pt-[140px] pb-16 md:pt-[180px] md:pb-20">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="max-w-3xl">
            <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
              Services
            </span>
            <h1 className="max-w-[17ch] font-serif-display font-medium leading-[1.08] tracking-[-0.01em] text-[clamp(34px,5.4vw,58px)] text-ink">
              One studio. A few ways to work with it.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Flagship: hospitality / digital guest directories */}
      <section className="scroll-mt-24 bg-charcoal-950 py-24 text-cream md:py-32">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
              Where We Started
            </span>
            <h2 className="mb-6 font-serif-display font-medium leading-[1.1] tracking-[-0.01em] text-[clamp(28px,3.8vw,46px)] text-white">
              Digital guest directories for hospitality.
            </h2>
            <p className="mb-9 max-w-[46ch] text-[16px] leading-relaxed text-cream-mute">
              Our specialist practice: a single digital directory guests
              reach by tap or scan, covering everything a hotel, resort or
              venue offers. It remains the product we know best, and the one
              most Informax projects still come back to.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <BtnPrimary href="/hospitality" tone="dark">
                Explore Hospitality
              </BtnPrimary>
              <BtnGhost href="/enquire" tone="dark">
                Start a project
              </BtnGhost>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-3 border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15">
              <Nfc size={18} className="text-brass-light" />
            </div>
            <p className="text-[14px] leading-relaxed text-cream-mute">
              Accessed by NFC tap, QR scan or a direct link. No app, no
              download, nothing for the guest to install.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The rest of the studio's work */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="mb-16 max-w-xl md:mb-20">
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
              Beyond Hospitality
            </span>
            <h2 className="font-serif-display font-medium leading-[1.12] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-ink">
              The same design thinking, for anything a business needs to
              share.
            </h2>
          </Reveal>

          <RevealStagger className="flex flex-col border-t border-line">
            {OTHER_SERVICES.map((s) => (
              <RevealStaggerItem key={s.title}>
                <a
                  href={s.href}
                  className="group flex flex-col gap-4 border-b border-line py-9 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
                >
                  <div className="flex items-start gap-5 sm:items-center">
                    <s.icon size={22} className="mt-1 shrink-0 text-brass-deep sm:mt-0" />
                    <div>
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-mute">
                        {s.eyebrow}
                      </span>
                      <h3 className="text-[19px] font-semibold text-ink transition-colors duration-300 group-hover:text-brass-deep">
                        {s.title}
                      </h3>
                      <p className="mt-1 max-w-[48ch] text-[14.5px] leading-relaxed text-ink-mute">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </a>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <FinalCta
        title={<>Not sure which one fits?</>}
        description="Tell us what you're trying to achieve and we'll recommend the right starting point."
      />
    </>
  );
}
