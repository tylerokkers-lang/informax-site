import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnPrimary, Em, Eyebrow, EmLight } from "@/components/ui";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Pricing: Websites from £1,200",
  description:
    "Custom website design and development starts from £1,200. See starting prices for booking systems, CMS, e-commerce, memberships and more.",
  alternates: { canonical: "/pricing" },
};

const BASE_INCLUDES = [
  "Custom design, built for your business",
  "A responsive layout across desktop, tablet and mobile",
  "Core pages (for example Home, About, Services, Contact)",
  "A working contact form",
  "SEO foundations: metadata, structure and performance",
  "Launch on modern, reliable hosting",
];

const DEPENDS_ON = [
  "Number of pages",
  "Design complexity",
  "Content requirements",
  "Number of sections",
  "Animations",
  "Integrations",
  "Functionality",
  "Forms",
  "CMS requirements",
  "Ongoing requirements",
];

const ADD_ONS = [
  {
    title: "Additional Page",
    price: "From £100",
    desc: "For additional pages beyond the agreed base website scope.",
  },
  {
    title: "Booking System",
    price: "From £250",
    desc: "For appointment, service, room, event or other booking functionality.",
  },
  {
    title: "Advanced Enquiry System",
    price: "From £150",
    desc: "For more advanced enquiry forms, conditional fields, lead handling or custom enquiry requirements.",
  },
  {
    title: "CMS & Content Management",
    price: "From £300",
    desc: "For functionality that lets you update relevant website content yourself.",
  },
  {
    title: "Blog",
    price: "From £200",
    desc: "For a custom blog or news section with article management.",
  },
  {
    title: "Online Payments",
    price: "From £250",
    desc: "For payment functionality and checkout integration.",
  },
  {
    title: "Membership / Login Area",
    price: "From £400",
    desc: "For customer accounts, member areas, protected content or login functionality.",
  },
  {
    title: "Reviews System",
    price: "From £150",
    desc: "For customer reviews, testimonials or review submission functionality.",
  },
  {
    title: "Advanced Animations",
    price: "From £200",
    desc: "For more advanced custom motion, interactions and animation work.",
  },
  {
    title: "Third-Party Integrations",
    price: "From £200",
    desc: "For connecting your website with external services, platforms or systems. The final cost depends on the complexity of the integration.",
  },
  {
    title: "E-Commerce",
    price: "From £500",
    desc: "For online shops, products, carts, checkout and related functionality. Larger or more complex stores are quoted individually.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-charcoal-950 text-cream text-center pt-[150px] pb-16 md:pt-[170px] md:pb-20">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Eyebrow tone="dark" center>
            Pricing
          </Eyebrow>
          <h1 className="font-serif-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.2] text-white mx-auto mb-5 max-w-2xl">
            Start with what you need. <EmLight>Add functionality as your project requires it.</EmLight>
          </h1>
          <p className="text-cream-mute text-[17px] max-w-xl mx-auto leading-relaxed">
            You shouldn&rsquo;t have to pay for functionality you don&rsquo;t
            need. Every project starts with a professional core website,
            priced from £1,200, then grows with the features your business
            actually requires.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal>
            <div className="rounded-3xl border border-line bg-panel p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-brass-deep block mb-3">
                  The Starting Point
                </span>
                <h2 className="font-serif-display font-medium text-2xl text-ink mb-2">
                  Custom Websites
                </h2>
                <div className="font-serif-display text-5xl font-medium text-ink mb-4">
                  From £1,200
                </div>
                <p className="text-[15px] text-ink-mute leading-relaxed mb-6">
                  £1,200 is the starting price for a professional custom
                  website. It is not a fixed package: the final price
                  depends on your requirements and the functionality you
                  need.
                </p>
                <BtnPrimary href="/enquire" className="w-full sm:w-auto justify-center">
                  Get a Quote
                </BtnPrimary>
              </div>

              <div className="border-t lg:border-t-0 lg:border-l border-line pt-8 lg:pt-0 lg:pl-12">
                <h3 className="text-sm font-semibold text-ink mb-4">
                  What&rsquo;s typically included at the starting price
                </h3>
                <ul className="flex flex-col gap-3 mb-8">
                  {BASE_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={16} className="text-moss shrink-0 mt-0.5" />
                      <span className="text-[14.5px] text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-semibold text-ink mb-4">
                  The final price depends on
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DEPENDS_ON.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-paper px-3.5 py-2 text-[12.5px] font-medium text-ink-mute"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-panel border-y border-line py-24 md:py-28">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-2xl mb-10">
            <Eyebrow>Add What You Need</Eyebrow>
            <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(26px,3.2vw,38px)] text-ink mb-4">
              £1,200 is the starting point, <Em>not the ceiling.</Em>
            </h2>
            <p className="text-ink-mute text-[16px] leading-relaxed">
              Once real functionality is involved, a project can become
              substantially more valuable than the starting price. The
              figures below give you a realistic idea of cost for the most
              common additions.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="max-w-2xl mb-10 flex items-start gap-3 rounded-2xl border border-line bg-panel px-5 py-4">
            <Info size={17} className="text-brass-deep shrink-0 mt-0.5" />
            <p className="text-[13.5px] text-ink-mute leading-relaxed">
              All prices below are starting prices. Final pricing depends on
              the scope, complexity and requirements of your project, and is
              confirmed before any work begins.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl border border-line bg-line overflow-hidden">
            {ADD_ONS.map((addon) => (
              <RevealStaggerItem
                key={addon.title}
                className="bg-panel px-7 py-7"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-[15px] font-semibold text-ink">
                    {addon.title}
                  </h4>
                  <span className="shrink-0 rounded-full bg-brass/10 px-2.5 py-1 text-[11px] font-bold text-brass-deep whitespace-nowrap">
                    {addon.price}
                  </span>
                </div>
                <p className="text-[13.5px] text-ink-mute leading-relaxed">
                  {addon.desc}
                </p>
              </RevealStaggerItem>
            ))}

            <RevealStaggerItem className="bg-panel px-7 py-7">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-[15px] font-semibold text-ink">
                  Ongoing Maintenance
                </h4>
                <span className="shrink-0 rounded-full bg-brass/10 px-2.5 py-1 text-[11px] font-bold text-brass-deep whitespace-nowrap">
                  From £75/mo
                </span>
              </div>
              <p className="text-[13.5px] text-ink-mute leading-relaxed mb-2">
                Covers security and software updates, uptime monitoring, and
                small text or image changes.
              </p>
              <p className="text-[12px] text-ink-mute leading-relaxed">
                Does not include new pages, new features or major design
                work. Larger changes are quoted separately.
              </p>
            </RevealStaggerItem>
          </RevealStagger>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-2xl">
            <Eyebrow>Beyond Websites</Eyebrow>
            <h2 className="font-serif-display font-medium text-[clamp(24px,2.8vw,32px)] leading-[1.2] text-ink mb-4">
              Brochures, directories, hospitality and bespoke work
            </h2>
            <p className="text-ink-mute text-[16px] leading-relaxed">
              Digital brochures, pamphlets, directories, hospitality guest
              experiences and bespoke projects are quoted individually based
              on scope. Get in touch with a sense of what you need and
              we&rsquo;ll put a proposal together.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        eyebrow="Let's Scope It Out"
        title={<>Tell us what you need. <EmLight>We&rsquo;ll tell you what it costs.</EmLight></>}
        description="No inflated packages and no hidden extras. Just a clear, honest quote based on your project."
        primaryLabel="Get a Quote"
      />
    </>
  );
}
