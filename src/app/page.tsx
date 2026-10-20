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
    "Informax Cloud gives restaurants and hotels one simple place to manage the information guests see. Update it once, and every connected Access Point stays up to date. No app for guests, no reprinting.",
  alternates: { canonical: "/" },
};

const FACTS = [
  { title: "No app, no account", body: "Guests scan a Code and the information opens." },
  { title: "No reprinting", body: "The printed Code stays. What it opens changes." },
  { title: "From your phone", body: "Replace a menu or directory in a few taps." },
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
              From restaurant menus to hotel directories, Informax Cloud gives you one simple place to manage the information
              your guests see. Update it once, and every connected Access Point stays up to date.
            </p>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
            {FACTS.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={i * 0.06} className="h-full rounded-[20px] bg-white px-6 py-6 text-center shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
                  <p className="text-[17px] font-semibold text-ink">{f.title}</p>
                  <p className="mt-1.5 text-[15px] text-ink-mute">{f.body}</p>
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
              eyebrow="Informax Cloud in action"
              title="The real product."
              soft="Simple enough for any shift."
              body="This is Informax Cloud. Every Access Point shows exactly what a guest sees right now, and the actions to change it are directly underneath."
            />
            <div className="shrink-0">
              <MoreLink href="/informax-cloud">Explore Informax Cloud</MoreLink>
            </div>
          </div>
          <Reveal className="relative mt-14">
            <Browser screen="deskSpaTemporary" className="w-full lg:w-[86%]" />
            <div className="absolute -bottom-10 right-0 hidden w-[23%] max-w-[250px] lg:block">
              <Phone screens={["cloudMenuPublished"]} tone="light" sizes="250px" />
            </div>
          </Reveal>
          <p className="mt-6 pb-4 text-[13px] text-ink-mute lg:mt-16">
            Real Informax Cloud screens with fictional businesses: Marlowe Grand Hotel and The Copper Table.
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
