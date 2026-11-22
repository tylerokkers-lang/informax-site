import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Showcase from "@/components/x/Showcase";
import Benefits from "@/components/x/Benefits";
import ScanPoint from "@/components/x/ScanPoint";
import { Container, ScreenNote } from "@/components/x/ui";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { DEMO_CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Informax | Digital experiences. Done right." },
  description:
    "Hotels, restaurants and venues deliver menus and guest information through Informax Scan Points. One Scan Point. Unlimited placements. Instant updates.",
  alternates: { canonical: "/" },
};

/*
 * The homepage is deliberately short: hero, the product working, three
 * benefits, who it is for, one closing action. Detail lives on the Informax
 * Cloud, How it works and Solutions pages.
 */

const INDUSTRIES = [
  { href: "/hospitality", title: "Hotels and spas", body: "Directories, spa and dining in every room", place: "Your stay", finish: "stone" },
  { href: "/restaurants", title: "Restaurants", body: "Menus that change with the kitchen", place: "Table 12", finish: "ivory" },
  { href: "/solutions#galleries", title: "Galleries", body: "A guide for every room and show", place: "Room 3", finish: "ivory" },
  { href: "/solutions#events", title: "Events and venues", body: "Programmes that keep up with the day", place: "Programme", finish: "graphite" },
] as const;

export default function Home() {
  return (
    <>
      {/* 1. Hero, and 2. Informax Cloud working: one continuous opening, so the product is in view at once. */}
      <section aria-labelledby="hero-h" className="bg-paper pb-14 pt-[92px] md:pb-20 md:pt-[124px]">
        <Container wide>
          <div className="mx-auto max-w-[1100px] text-center">
            <h1 id="hero-h" className="ix-hero-rise x-display text-[clamp(46px,7.6vw,116px)] text-ink" style={{ ["--rise-y" as string]: "22px" }}>
              Digital <span className="whitespace-nowrap">experiences.</span>
              <br className="hidden sm:block" /> <span className="text-brass-deep">Done right.</span>
            </h1>
            <p className="ix-hero-rise mx-auto mt-5 max-w-[34rem] text-pretty text-[17.5px] leading-[1.5] text-ink-soft md:mt-7 md:text-[21px]" style={{ ["--rise-delay" as string]: "0.12s" }}>
              Transform how guests access menus, directories and information. Update everything from one place, without reprinting a thing.
            </p>
            <div className="ix-hero-rise mt-7 flex flex-wrap justify-center gap-2.5 md:mt-9 md:gap-3" style={{ ["--rise-delay" as string]: "0.22s" }}>
              <Link href="/informax-cloud" className="ix-btn ix-btn-primary max-sm:px-5!">
                Explore Informax Cloud
                <ArrowRight size={17} aria-hidden className="-mr-0.5 max-sm:hidden" />
              </Link>
              <Link href={DEMO_CTA.href} className="ix-btn ix-btn-secondary max-sm:px-5!">
                {DEMO_CTA.label}
              </Link>
            </div>
          </div>

          <div className="ix-hero-rise mt-9 md:mt-12" style={{ ["--rise-delay" as string]: "0.36s", ["--rise-y" as string]: "36px", ["--rise-dur" as string]: "1.2s" }}>
            <div className="mx-auto max-w-[880px]">
              <div className="mb-3 md:mb-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="x-title text-[21px] text-ink md:text-[28px]">See Informax in action</h2>
                  <Link href="/informax-cloud" className="ix-link group shrink-0 text-[14px] text-brass-deep hover:text-ink md:text-[15px]">
                    <span className="max-sm:hidden">Explore Informax Cloud</span>
                    <span className="sm:hidden">Explore Cloud</span>
                    <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <p className="mt-0.5 text-[15px] leading-snug text-ink-mute">One Scan Point. Unlimited placements. Instant updates.</p>
              </div>
            </div>
            <Showcase />
            <div className="mx-auto mt-2 max-w-[880px] sm:mt-3">
              <ScreenNote>Real Informax Cloud screens (development build); the app still labels some items Access Points and Codes. Marlowe Grand is fictional.</ScreenNote>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Key benefits */}
      <section aria-labelledby="benefits-h" className="bg-white py-16 md:py-24">
        <Container>
          <Reveal className="mb-9 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
            <h2 id="benefits-h" className="x-title max-w-[22ch] text-balance text-[clamp(30px,4vw,52px)] text-ink">
              Always accurate. <span className="text-ink-quiet">Nothing for guests to install.</span>
            </h2>
            <Link href="/how-it-works" className="ix-link group shrink-0 text-brass-deep hover:text-ink">
              How it works <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <Benefits />
        </Container>
      </section>

      {/* 4. Industries */}
      <section aria-labelledby="industries-h" className="bg-paper py-16 md:py-24">
        <Container>
          <Reveal className="mb-9 md:mb-12">
            <h2 id="industries-h" className="x-title text-balance text-[clamp(30px,4vw,52px)] text-ink">
              Made for places <span className="text-ink-quiet">that care how guests are treated.</span>
            </h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {INDUSTRIES.map((x) => (
              <RevealStaggerItem key={x.href}>
                <Link
                  href={x.href}
                  className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_0_0_1px_rgba(11,21,36,0.06)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(11,21,36,0.1),0_24px_50px_-30px_rgba(11,21,36,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:min-h-[260px] md:p-6"
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-[16px] font-semibold leading-tight tracking-[-0.015em] text-ink md:text-[19px]">{x.title}</span>
                    <ArrowUpRight size={18} aria-hidden className="shrink-0 text-ink-mute transition-transform duration-500 group-hover:rotate-45 group-hover:text-ink" />
                  </span>
                  <span className="mt-1.5 max-w-[22ch] text-[13.5px] leading-snug text-ink-mute md:text-[15px]">{x.body}</span>
                  <ScanPoint
                    decorative
                    place={x.place}
                    finish={x.finish}
                    className="absolute -bottom-[18%] right-[10%] w-[38%] max-w-[110px] rotate-[-4deg] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:rotate-0"
                  />
                </Link>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* 5. Final call to action */}
      <section aria-labelledby="close-h" className="bg-paper px-3 pb-3 md:px-4 md:pb-4">
        <div className="relative overflow-hidden rounded-[28px] bg-charcoal-950 px-6 py-14 text-center md:rounded-[40px] md:py-20">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/25 blur-[120px]" />
          <Reveal className="relative mx-auto max-w-2xl">
            <h2 id="close-h" className="x-title text-balance text-[clamp(30px,4.4vw,56px)] text-white">
              See Informax with your property in mind.
            </h2>
            <p className="mx-auto mt-4 max-w-[30rem] text-[16.5px] leading-relaxed text-white/70">A short, personal walkthrough. No obligation.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary max-sm:px-5!">
                {DEMO_CTA.label}
                <ArrowRight size={17} aria-hidden className="-mr-0.5 max-sm:hidden" />
              </Link>
              <Link href="/informax-cloud" className="ix-btn ix-btn-secondary-dark max-sm:px-5!">
                Explore Informax Cloud
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
