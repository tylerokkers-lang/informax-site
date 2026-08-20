import type { Metadata } from "next";
import { Check, Plus } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnPrimary, Em, Eyebrow, EmLight } from "@/components/ui";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Pricing — Websites from £1,200",
  description:
    "Website design and development starts from £1,200. Add booking systems, CMS, e-commerce, memberships and more, priced according to your requirements.",
  alternates: { canonical: "/pricing" },
};

const BASE_INCLUDES = [
  "Custom design, built for your business",
  "Responsive layout across desktop, tablet & mobile",
  "Core pages (e.g. Home, About, Services, Contact)",
  "A working contact form",
  "SEO foundations — metadata, structure & performance",
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
    title: "Booking System",
    desc: "For appointment, room, service or event bookings.",
  },
  {
    title: "Advanced Enquiry System",
    desc: "For more complex enquiry and lead-management requirements.",
  },
  {
    title: "CMS / Content Management",
    desc: "Allowing you to update website content yourself.",
  },
  {
    title: "Blog",
    desc: "Custom blog and article management functionality.",
  },
  {
    title: "Online Payments",
    desc: "Payment processing and checkout functionality.",
  },
  {
    title: "Membership / Login",
    desc: "Customer accounts, protected areas or membership functionality.",
  },
  {
    title: "Reviews",
    desc: "Customer review systems and review submission functionality.",
  },
  {
    title: "Advanced Animations",
    desc: "More complex motion and interactive experiences.",
  },
  {
    title: "Custom Integrations",
    desc: "Connecting your website with third-party platforms and systems.",
  },
  {
    title: "E-commerce",
    desc: "Online shops, products, carts and checkout.",
  },
  {
    title: "Ongoing Maintenance",
    desc: "Ongoing updates, changes and support after launch.",
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
            Start with £1,200. <EmLight>Build exactly what you need.</EmLight>
          </h1>
          <p className="text-cream-mute text-[17px] max-w-xl mx-auto leading-relaxed">
            You shouldn&rsquo;t have to pay for functionality you don&rsquo;t
            need. Start with a professional core website, then add what your
            project actually requires.
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
                  Website Design &amp; Development
                </h2>
                <div className="font-serif-display text-5xl font-medium text-ink mb-4">
                  From £1,200
                </div>
                <p className="text-[15px] text-ink-mute leading-relaxed mb-6">
                  A professionally designed and developed website — the
                  base for every Informax project.
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
                  The exact price depends on
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
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>Add What You Need</Eyebrow>
            <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(26px,3.2vw,38px)] text-ink mb-4">
              £1,200 is the starting point, <Em>not the ceiling.</Em>
            </h2>
            <p className="text-ink-mute text-[16px] leading-relaxed">
              More advanced projects — bookings, e-commerce, memberships,
              integrations — become substantially more valuable once real
              functionality is involved. Each is scoped and quoted against
              your specific requirements.
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
                  <span className="flex items-center gap-1 shrink-0 rounded-full bg-brass/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.03em] text-brass-deep">
                    <Plus size={10} />
                    Additional cost
                  </span>
                </div>
                <p className="text-[13.5px] text-ink-mute leading-relaxed">
                  {addon.desc}
                </p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-2xl">
            <Eyebrow>Beyond Websites</Eyebrow>
            <h2 className="font-serif-display font-medium text-[clamp(24px,2.8vw,32px)] leading-[1.2] text-ink mb-4">
              Brochures, directories, hospitality &amp; bespoke work
            </h2>
            <p className="text-ink-mute text-[16px] leading-relaxed">
              Digital brochures, pamphlets, directories, hospitality guest
              experiences and bespoke projects are quoted individually based
              on scope — get in touch with a sense of what you need and
              we&rsquo;ll put a proposal together.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        eyebrow="Let's Scope It Out"
        title={<>Tell us what you need. <EmLight>We&rsquo;ll tell you what it costs.</EmLight></>}
        description="No inflated packages, no hidden extras — just a clear, honest quote based on your project."
        primaryLabel="Get a Quote"
      />
    </>
  );
}
