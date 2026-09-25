import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import TouchPoint from "@/components/cloud/TouchPoint";
import Placements from "@/components/cloud/Placements";
import TouchPointStays from "@/components/cloud/TouchPointStays";
import CloudCta from "@/components/cloud/CloudCta";
import { ManyTouchPointsFilm, TouchScanFilm } from "@/components/product/MicroFilms";

export const metadata: Metadata = {
  title: "Informax Touch Points: Put Hotel Information Where Guests Are",
  description:
    "Informax Touch Points are placed throughout your hotel. Guests touch or scan and the connected Space opens instantly, and you can change what it shows without replacing anything.",
  alternates: { canonical: "/touch-points" },
};

function HeroVisual() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden border border-white/10 bg-gradient-to-b from-[#1d1b24] to-[#111116] py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(243,210,156,0.2),transparent_62%)]" />
      <TouchPoint label="Spa" size="lg" active />
    </div>
  );
}

export default function TouchPointsPage() {
  return (
    <>
      <PageHero
        eyebrow="Informax Touch Points"
        title={<>Installed once.<br /><span className="italic text-glow">Updated endlessly.</span></>}
        lede="A Touch Point is a permanent connection to a Space. The Hotel can change what it does without ever changing the Touch Point."
        primary={{ label: "Talk to Informax", href: "/enquire" }}
        secondary={{ label: "See how it works", href: "/how-it-works" }}
        visual={<HeroVisual />}
      />

      <Section tone="dark" className="!pt-0">
        <Head>
          <Reveal blur>
            <Kicker dark>For the guest</Kicker>
            <Display dark>
              Immediate. <Soft dark>Nothing to learn.</Soft>
            </Display>
            <Lede dark className="mt-8">
              A guest only needs to care that the information opens the moment
              they want it. They can touch the Touch Point or scan it.
            </Lede>
          </Reveal>
        </Head>
        <TouchScanFilm tone="dark" />
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>Placement</Kicker>
            <Display dark>
              Put information where <Soft dark>guests need it.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Touch Points sit naturally in the places guests already are.
              Each one opens the Space that belongs to that part of the hotel.
            </Lede>
          </Reveal>
        </Head>
        <Placements />
      </Section>

      <Section tone="alt">
        <div className="grid gap-14 grid-cols-1 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal blur>
            <Kicker>What a Touch Point is</Kicker>
            <Display>
              A connection, <Soft>not a container.</Soft>
            </Display>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-mute md:text-[18px]">
              A Touch Point does not hold information of its own. It connects
              to a Space in Informax Cloud, and the Space decides what guests
              see. That is why a Touch Point never needs replacing when a menu,
              an offer or a website changes.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Over time</Kicker>
            <Display dark>
              The Touch Point stays. <Soft dark>Everything behind it can change.</Soft>
            </Display>
          </Reveal>
        </Head>
        <TouchPointStays />
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>One Space, many Touch Points</Kicker>
            <Display dark>
              One change. <Soft dark>Every Touch Point.</Soft>
            </Display>
          </Reveal>
        </Head>
        <ManyTouchPointsFilm tone="dark" />
      </Section>

      <CloudCta />
    </>
  );
}
