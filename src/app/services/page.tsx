import type { Metadata } from "next";
import {
  BookOpen,
  ConciergeBell,
  FileText,
  LayoutGrid,
  Monitor,
  WandSparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BtnGhost, Em, Eyebrow, EmLight } from "@/components/ui";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services — Websites, Digital Brochures, Directories & Hospitality",
  description:
    "Informax's core services: custom website design and development, digital brochures and pamphlets, digital directories, hospitality guest experiences, and bespoke digital projects.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    icon: Monitor,
    eyebrow: "01 — Websites",
    title: "Custom-designed websites, built around your business.",
    desc: "Professional, custom-designed websites built around the client's business — not a generic template.",
    examples: [
      "Business websites",
      "Service websites",
      "Brochure websites",
      "Hospitality websites",
      "Restaurant websites",
      "Portfolio websites",
      "Bespoke websites",
      "Lead-generation websites",
    ],
    cta: { label: "Explore Websites", href: "/websites" },
    tag: "From £1,200",
  },
  {
    icon: BookOpen,
    eyebrow: "02 — Digital Brochures",
    title: "Beautiful digital brochures your business can share online.",
    desc: "Instead of a dull PDF attachment, a professionally designed digital experience your business can share anywhere.",
    examples: [
      "Services",
      "Company information",
      "Sales",
      "Events",
      "Hospitality",
      "Property",
      "Products",
      "Corporate information",
    ],
    cta: { label: "Explore Digital Information", href: "/digital-information#brochures" },
  },
  {
    icon: FileText,
    eyebrow: "03 — Digital Pamphlets",
    title: "Simple, attractive information — designed for digital use.",
    desc: "Focused digital information documents designed specifically for a single service, product, event or purpose — not a printed page shrunk to fit a screen.",
    examples: [
      "Service one-pagers",
      "Event information",
      "Product sheets",
      "Welcome guides",
    ],
    cta: { label: "Explore Digital Information", href: "/digital-information#brochures" },
  },
  {
    icon: LayoutGrid,
    eyebrow: "04 — Digital Directories",
    title: "Custom directories that make information easy to find.",
    desc: "When there's a lot to communicate, a directory makes it navigable — accessed by QR, NFC, direct link or built into your website.",
    examples: [
      "Hotels",
      "Hospitality businesses",
      "Property businesses",
      "Venues",
      "Offices",
      "Organisations",
      "Events",
      "Other businesses",
    ],
    cta: { label: "Explore Digital Directories", href: "/digital-information#directories" },
  },
  {
    icon: ConciergeBell,
    eyebrow: "05 — Hospitality",
    title: "A specialist application of the wider Informax platform.",
    desc: "Digital guest directories and hospitality websites, designed specifically for hotels, resorts and venues — where Informax started, and still one of our specialisms.",
    examples: [
      "Digital guest directories",
      "Hotel & resort websites",
      "NFC & QR guest access",
      "Facilities, dining & offers",
    ],
    cta: { label: "Explore Hospitality", href: "/hospitality" },
  },
  {
    icon: WandSparkles,
    eyebrow: "06 — Bespoke Projects",
    title: "Have something different in mind?",
    desc: "If your idea doesn't fit neatly into a website, brochure or directory, talk to us. We design and build bespoke digital experiences around what you need.",
    examples: [],
    cta: { label: "Discuss Your Project", href: "/enquire" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-charcoal-950 text-cream text-center pt-[150px] pb-16 md:pt-[170px] md:pb-20">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Eyebrow tone="dark" center>
            Services
          </Eyebrow>
          <h1 className="font-serif-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.2] text-white mx-auto mb-5 max-w-2xl">
            Everything we design and build, <EmLight>in one place.</EmLight>
          </h1>
          <p className="text-cream-mute text-[17px] max-w-xl mx-auto leading-relaxed">
            Six ways to work with Informax — from a full website to a single
            bespoke idea.
          </p>
        </div>
      </section>

      <section className="bg-paper py-4 md:py-8">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title}>
            <div
              className={`mx-auto max-w-8xl px-6 md:px-8 py-16 md:py-20 ${
                i !== SERVICES.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-panel mb-6">
                    <service.icon size={26} className="text-brass-deep" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-brass-deep block mb-3">
                    {service.eyebrow}
                  </span>
                  <h2 className="font-serif-display font-medium text-[clamp(24px,2.8vw,34px)] leading-[1.2] text-ink mb-4">
                    {service.title}
                  </h2>
                  <p className="text-ink-mute text-[16px] leading-relaxed max-w-md mb-6">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-4">
                    <BtnGhost href={service.cta.href}>
                      {service.cta.label}
                    </BtnGhost>
                    {service.tag && (
                      <span className="text-sm font-semibold text-brass-deep">
                        {service.tag}
                      </span>
                    )}
                  </div>
                </div>

                {service.examples.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 content-start lg:pt-[76px]">
                    {service.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-full border border-line bg-panel px-4 py-2.5 text-[13px] font-semibold text-ink-soft"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <FinalCta
        title={<>Not sure which one fits? <Em>Let&rsquo;s talk it through.</Em></>}
        description="Tell us what you're trying to achieve and we'll recommend the right starting point — whether that's a website, a directory, a brochure, or something bespoke."
      />
    </>
  );
}
