import type { Metadata } from "next";
import MenuHero from "@/components/site/MenuHero";
import HotelShowcase from "@/components/site/HotelShowcase";
import SeeItInAction from "@/components/site/SeeItInAction";
import { Browser, Phone } from "@/components/site/Devices";
import { DemoCta, Heading, HowItWorksSteps, MoreLink, Possibilities } from "@/components/site/Sections";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Informax | Update your menus and guest information without reprinting" },
  description:
    "Informax connects permanent Codes in restaurants and hotels to digital information your team can update without reprinting. Informax Cloud, the platform behind it, is coming soon.",
  alternates: { canonical: "/" },
};

const FACTS = [
  { label: "The problem", title: "Printed information goes out of date.", body: "Menus, directories and offers change. The printed copies do not." },
  { label: "The solution", title: "Permanent Codes, current information.", body: "Guests scan a Code. Your team changes what it opens, without reprinting." },
  { label: "The platform", title: "Informax Cloud.", body: "Where you manage every Code and its content. Coming soon." },
];

export default function Home() {
  return (
    <>
      <MenuHero />

      {/* What Informax is, in one breath. */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="positioning-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 id="positioning-h" className="text-balance font-serif-display text-[clamp(32px,4.4vw,56px)] leading-[1.05] text-ink">
              Your information. Everywhere it needs to be. <span className="text-ink-mute">Always up to date.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[42rem] text-[18px] leading-relaxed text-ink-soft">
              From restaurant menus to hotel directories, Informax puts permanent Codes where guests need information, and Informax
              Cloud gives you one simple place to manage what they show. Update it once, and every connected Access Point stays up
              to date.
            </p>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
            {FACTS.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={i * 0.06} className="h-full rounded-[20px] bg-white px-6 py-7 text-left shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
                  <p className="text-[13px] font-semibold text-brass-deep">{f.label}</p>
                  <p className="mt-2 text-[18px] font-semibold leading-snug text-ink">{f.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-mute">{f.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HotelShowcase />

      {/* The real application. */}
      <section className="overflow-hidden bg-paper pt-24 md:pt-32" aria-labelledby="cloud-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Heading
              id="cloud-h"
              eyebrow="Informax Cloud · Coming soon"
              title="A first look at the platform."
              soft="Simple enough for any shift."
              body="Informax is the guest information solution. Informax Cloud is the platform that powers it: every Access Point shows exactly what a guest sees right now, with the actions to change it directly underneath."
            />
            <div className="shrink-0">
              <MoreLink href="/informax-cloud">Meet Informax Cloud</MoreLink>
            </div>
          </div>
          <Reveal className="relative mt-14">
            <Browser screen="deskSpaTemporary" className="w-full lg:w-[86%]" />
            <div className="absolute -bottom-10 right-0 hidden w-[23%] max-w-[250px] lg:block">
              <Phone screens={["cloudMenuPublished"]} tone="light" sizes="250px" />
            </div>
          </Reveal>
          <p className="mt-6 pb-4 text-[13px] text-ink-mute lg:mt-16">
            A preview of Informax Cloud, coming soon: real screens from the development build, with fictional businesses
            (Marlowe Grand Hotel and The Copper Table).
          </p>
        </div>
      </section>

      <SeeItInAction />

      <section className="bg-paper-alt py-24 md:py-32" aria-labelledby="how-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div>
            <Heading id="how-h" eyebrow="How it works" title="Three simple steps." soft="Then it just works." />
          </div>
          <HowItWorksSteps />
          <div className="mt-10">
            <MoreLink href="/how-it-works">More about how it works</MoreLink>
          </div>
        </div>
      </section>

      <Possibilities />

      <DemoCta />
    </>
  );
}
