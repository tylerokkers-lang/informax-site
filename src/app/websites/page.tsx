import type { Metadata } from "next";
import {
  BadgeCheck,
  BarChart3,
  Calendar,
  CreditCard,
  FileEdit,
  Images,
  Layers,
  MessageSquare,
  Newspaper,
  Plug,
  Smartphone,
  Star,
  UserRound,
  Wand2,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnGhost, BtnPrimary, Em, Eyebrow } from "@/components/ui";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Website Design & Development",
  description:
    "Custom website design and development built around your business. Responsive, SEO-ready and designed to grow with additional functionality. Websites from £1,200.",
  alternates: { canonical: "/websites" },
};

const CAPABILITIES = [
  { icon: Layers, label: "Custom design" },
  { icon: Smartphone, label: "Responsive layouts" },
  { icon: BadgeCheck, label: "Mobile optimisation" },
  { icon: BarChart3, label: "SEO foundations" },
  { icon: MessageSquare, label: "Contact forms" },
  { icon: FileEdit, label: "Enquiry systems" },
  { icon: Wand2, label: "Animations" },
  { icon: Images, label: "Galleries" },
  { icon: Newspaper, label: "Blog functionality" },
  { icon: FileEdit, label: "CMS functionality" },
  { icon: Calendar, label: "Booking systems" },
  { icon: CreditCard, label: "Payment functionality" },
  { icon: UserRound, label: "Membership systems" },
  { icon: UserRound, label: "Customer portals" },
  { icon: Star, label: "Reviews" },
  { icon: Plug, label: "Integrations" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Wand2, label: "Custom functionality" },
];

export default function WebsitesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal-950 text-cream pt-[150px] pb-20 md:pt-[170px] md:pb-24">
        <div className="absolute inset-0 bg-grid-fade-dark pointer-events-none" />
        <div className="relative mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <Reveal>
            <Eyebrow tone="dark">Websites</Eyebrow>
            <h1 className="font-serif-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.16] text-white mb-6">
              A website built around your business.
            </h1>
            <p className="text-cream-mute text-[17px] leading-relaxed max-w-xl mb-9">
              We don&rsquo;t sell generic templates. We design and build
              websites around the business, its customers, its goals and its
              brand, from a focused brochure site to something far more
              involved.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <BtnPrimary href="/enquire">Start a Project</BtnPrimary>
              <BtnGhost href="/pricing" tone="dark">
                See Pricing
              </BtnGhost>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line-dark bg-charcoal-900 px-7 py-6">
              <div className="text-xs font-bold uppercase tracking-[0.1em] text-brass-light mb-2">
                Starting Point
              </div>
              <div className="font-serif-display text-3xl font-medium text-white mb-2">
                From £1,200
              </div>
              <p className="text-sm text-cream-mute leading-relaxed">
                A professionally designed and developed website. The exact
                price depends on your requirements.{" "}
                <a href="/pricing" className="text-brass-light underline underline-offset-2">
                  See how pricing works
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-28">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>What Can Be Included</Eyebrow>
            <h2 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(26px,3.2vw,38px)] text-ink mb-4">
              Websites that <Em>grow with what you need.</Em>
            </h2>
            <p className="text-ink-mute text-[16px] leading-relaxed">
              Every project starts with a custom-designed, responsive
              website. From there, functionality is added based on your
              requirements, not bundled in by default.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CAPABILITIES.map((cap) => (
              <RevealStaggerItem
                key={cap.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-4"
              >
                <cap.icon size={18} className="text-brass-deep shrink-0" />
                <span className="text-[13.5px] font-medium text-ink-soft">
                  {cap.label}
                </span>
              </RevealStaggerItem>
            ))}
          </RevealStagger>

          <Reveal delay={0.1} className="mt-8 max-w-2xl rounded-2xl border border-line bg-panel px-6 py-5">
            <p className="text-[14px] text-ink-mute leading-relaxed">
              <strong className="text-ink font-semibold">
                Not everything above is included at the starting price.
              </strong>{" "}
              £1,200 is the starting point for a professionally designed and
              developed website; additional functionality is scoped and
              priced separately depending on what your project needs.{" "}
              <a href="/pricing" className="text-brass-deep underline underline-offset-2">
                See the full pricing structure
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={<>A website that works for <Em>your business.</Em></>}
        description="Tell us about your business and what you need the site to do, and we'll put together a clear, honest proposal."
        primaryLabel="Start a Project"
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
