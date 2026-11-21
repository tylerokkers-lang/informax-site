import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, DemoBand, Faq, Heading, Section } from "@/components/x/ui";
import { Reveal } from "@/components/Reveal";
import { PRICE } from "@/lib/cloud-plans";

export const metadata: Metadata = {
  title: "Informax Cloud pricing | Plans for your property",
  description: `Informax Cloud per property: ${PRICE.annual} a year upfront, equivalent to ${PRICE.annualMonthlyEquivalent} a month, or ${PRICE.introductoryMonthly} a month for ${PRICE.introductoryMonths} months, then ${PRICE.standardMonthly}.`,
  alternates: { canonical: "/pricing" },
};

const INCLUDED = [
  "Your property, Spaces and Scan Points",
  "PDF and website content",
  "Scan Points you can print as often as you need",
  "Temporary content with an end time, and scheduling",
  "The current PDF and two earlier versions to restore",
  "Your logo on the screen guests see first",
  "A main administrator and personal team sign-ins",
];

const QUESTIONS = [
  { q: "Why choose annual?", a: `The annual payment is ${PRICE.annual}. The monthly plan totals ${PRICE.monthlyFirstYear} over its first 12 months, so paying annually saves ${PRICE.annualSaving} over that period.` },
  { q: "What happens after the introductory months?", a: `The first ${PRICE.introductoryMonths} monthly payments are ${PRICE.introductoryMonthly} each. From month ${PRICE.introductoryMonths + 1}, the price is ${PRICE.standardMonthly} a month per property.` },
  { q: "Is VAT added?", a: "No. These are the total prices. Informax is not currently VAT registered." },
  { q: "Are design services included?", a: "You can upload your own PDFs or link your existing website. If you would like Informax to design your menus, directories or other materials, that is an optional service, quoted separately." },
  { q: "Can I see it before choosing?", a: "Yes. A demo uses our own sample menus and directories, so you can see the guest experience and how your team would work in Informax Cloud." },
];

function Plan({
  id,
  dark,
  badge,
  name,
  price,
  per,
  line,
  note,
  href,
  cta,
}: {
  id: string;
  dark: boolean;
  badge: string;
  name: string;
  price: string;
  per: string;
  line: string;
  note: string;
  href: string;
  cta: string;
}) {
  return (
    <article
      aria-labelledby={id}
      className={`flex flex-col rounded-[32px] p-8 sm:p-10 ${dark ? "bg-charcoal-950 text-cream" : "bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.07)]"}`}
    >
      <p className={`text-[13.5px] font-semibold ${dark ? "text-brass-light" : "text-brass-deep"}`}>{badge}</p>
      <h2 id={id} className={`x-title mt-3 text-[30px] ${dark ? "text-white" : "text-ink"}`}>
        {name}
      </h2>
      <p className="mt-8 flex items-baseline gap-2">
        <span className={`x-num text-[64px] font-semibold leading-none tracking-[-0.04em] ${dark ? "text-white" : "text-ink"}`}>{price}</span>
        <span className={`text-[16px] ${dark ? "text-cream-mute" : "text-ink-mute"}`}>{per}</span>
      </p>
      <p className={`mt-4 text-[17px] font-semibold ${dark ? "text-white" : "text-ink"}`}>{line}</p>
      <p className={`mt-3 text-[15.5px] leading-relaxed ${dark ? "text-white/70" : "text-ink-mute"}`}>{note}</p>
      <Link href={href} className={`ix-btn mt-10 w-full ${dark ? "ix-btn-primary" : "bg-ink text-white hover:bg-charcoal-800"}`}>
        {cta} <ArrowRight size={17} aria-hidden />
      </Link>
    </article>
  );
}

export default function PricingPage() {
  return (
    <>
      <section aria-labelledby="pricing-h" className="bg-paper pb-12 pt-[120px] md:pb-16 md:pt-[160px]">
        <Container>
          <div className="mx-auto max-w-[900px] text-center">
            <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">Pricing</p>
            <h1 id="pricing-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(46px,7vw,96px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
              One price per property. <span className="text-ink-quiet">Everything included.</span>
            </h1>
            <p className="ix-hero-rise mx-auto mt-7 max-w-[36rem] text-[19px] leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "0.18s" }}>
              Every Space, Scan Point, update and team sign-in for your property. Pay yearly for the best value, or monthly with an introductory price.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Compare subscription plans" className="bg-paper pb-20 md:pb-28">
        <Container>
          <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-4 md:grid-cols-2">
            <Plan
              id="annual-h"
              dark
              badge="Best first-year value"
              name="Annual"
              price={PRICE.annualMonthlyEquivalent}
              per="a month, billed yearly"
              line={`${PRICE.annual} billed upfront per year`}
              note={`Save ${PRICE.annualSaving} in your first year compared with monthly billing.`}
              href="/signup?plan=annual"
              cta="Choose annual"
            />
            <Plan
              id="monthly-h"
              dark={false}
              badge="Introductory monthly offer"
              name="Monthly"
              price={PRICE.introductoryMonthly}
              per="a month to start"
              line={`First ${PRICE.introductoryMonths} months, then ${PRICE.standardMonthly}/month`}
              note={`${PRICE.monthlyFirstYear} over the first 12 months. Paid monthly.`}
              href="/signup?plan=monthly"
              cta="Choose monthly"
            />
          </div>

          {/* The first year, side by side: the comparison people otherwise work out on paper. */}
          <Reveal className="mx-auto mt-14 max-w-[980px]">
            <h2 className="text-[15px] font-semibold text-ink">Your first year, side by side</h2>
            <table className="mt-5 w-full border-collapse text-left text-[16px]">
              <caption className="sr-only">First-year cost per property for each plan</caption>
              <thead>
                <tr className="border-b border-line text-[13px] text-ink-mute">
                  <th scope="col" className="py-3 pr-4 font-semibold">Per property</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Annual</th>
                  <th scope="col" className="py-3 font-semibold">Monthly</th>
                </tr>
              </thead>
              <tbody className="x-num text-ink">
                <tr className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 font-medium text-ink-soft">Months 1 to {PRICE.introductoryMonths}</th>
                  <td className="py-4 pr-4" rowSpan={2}>{PRICE.annual} once</td>
                  <td className="py-4">{PRICE.introductoryMonthly} a month</td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 font-medium text-ink-soft">Months {PRICE.introductoryMonths + 1} to 12</th>
                  <td className="py-4">{PRICE.standardMonthly} a month</td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 font-semibold">First-year total</th>
                  <td className="py-4 pr-4 font-semibold">{PRICE.annual}</td>
                  <td className="py-4 font-semibold">{PRICE.monthlyFirstYear}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-mute">
              Total prices, with no VAT added: Informax is not currently VAT registered. Online subscriptions are being prepared for launch, and no payment is taken on this website.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="white" labelledBy="included-h">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Heading
              id="included-h"
              eyebrow="Included in both plans"
              title="The whole of Informax Cloud."
              soft="No tiers to compare."
              lead="Self-service setup and team invitations are part of the launch being prepared. Until then, we set your property up with you."
              size="md"
            />
            <ul className="border-t border-line">
              {INCLUDED.map((text) => (
                <li key={text} className="flex items-start gap-4 border-b border-line py-4 text-[17px] text-ink">
                  <Check size={19} aria-hidden className="mt-0.5 shrink-0 text-brass-deep" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="pricing-faq-h">
        <Container>
          <Faq id="pricing-faq-h" items={QUESTIONS} title="Before you choose." />
        </Container>
      </Section>

      <DemoBand title="See it before you choose." lead="A personal walkthrough of Informax Cloud and the guest experience, using sample menus and directories." />
    </>
  );
}
