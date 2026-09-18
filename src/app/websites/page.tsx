import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { BtnGhost } from "@/components/ui";
import WebsitesHero from "@/components/sections/WebsitesHero";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Website Design & Development",
  description:
    "Custom website design and development built around your business. Responsive, SEO-ready and designed to grow with additional functionality.",
  alternates: { canonical: "/websites" },
};

const CAPABILITIES = [
  "Custom design",
  "Responsive layouts",
  "SEO foundations",
  "Contact & enquiry forms",
  "Animation",
  "Galleries",
  "Blog & CMS functionality",
  "Booking systems",
  "Payments",
  "Membership areas",
  "Reviews",
  "Third-party integrations",
  "Analytics",
];

export default function WebsitesPage() {
  return (
    <>
      <WebsitesHero />

      <section id="how-we-work" className="scroll-mt-24 bg-charcoal-950 py-24 text-cream md:py-32">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
              How We Work
            </span>
            <h2 className="mb-6 font-serif-display font-medium leading-[1.12] tracking-[-0.01em] text-[clamp(26px,3.4vw,40px)] text-white">
              We don&rsquo;t sell generic templates.
            </h2>
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-cream-mute">
              We design and build around the business, its customers, its
              goals and its brand, from a focused brochure site to something
              far more involved. Every project starts with a custom design;
              functionality is scoped to what it actually needs, not
              bundled in by default.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
            <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
              What Can Be Included
            </span>
            <ul className="flex flex-wrap gap-x-7 gap-y-4">
              {CAPABILITIES.map((cap) => (
                <li key={cap} className="text-[14.5px] font-medium text-cream-mute">
                  {cap}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <Reveal>
              <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
                Hospitality-First, Not Hospitality-Only
              </span>
              <h2 className="mb-6 font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(26px,3.2vw,38px)] text-ink">
                We build hotel and resort websites too, from the same studio
                as your guest directory.
              </h2>
              <p className="mb-8 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-mute">
                One brand voice across your entire digital presence, whether
                that&rsquo;s the site guests find you through, or the
                directory they use once they&rsquo;ve arrived.
              </p>
              <BtnGhost href="/hospitality" arrow>
                See our hospitality practice
              </BtnGhost>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta
        title={<>A website that works for your business.</>}
        description="Tell us about your business and what you need the site to do, and we'll put together a clear, honest proposal."
      />
    </>
  );
}
