import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import TouchPointStays from "@/components/cloud/TouchPointStays";
import InfoMoments from "@/components/story/InfoMoments";
import PrintedHistory from "@/components/story/PrintedHistory";
import HotelEnvironments from "@/components/story/HotelEnvironments";
import Benefits from "@/components/story/Benefits";
import Principles from "@/components/story/Principles";
import MeetCloud from "@/components/story/MeetCloud";

export const metadata: Metadata = {
  title: { absolute: "Informax | Hotel Information Management and Guest Experience Technology" },
  description:
    "Control what guests see. Informax puts the right information in the right place throughout your hotel, and keeps it current without replacing a thing.",
  alternates: { canonical: "/" },
};

const CHANGES = ["Menus change.", "Schedules change.", "Offers change.", "Links move.", "Prices change.", "Print goes out of date."];

/**
 * The homepage tells the story in order: why information matters, what
 * goes wrong with it, how Informax fixes that throughout a Hotel, what it
 * means for guests and staff — and only then reveals Informax Cloud.
 * Detailed product demonstrations live on /informax-cloud.
 */
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <VideoHero
        videoMp4="/video/home-hero.mp4"
        videoWebm="/video/home-hero.webm"
        poster="/video/home-hero-poster.jpg"
        eyebrow="Built for Hotels"
        headline="Control what guests see."
        subline="Essential information. Exactly where it belongs."
        description="Hotels depend on information every moment of the day. Informax gives you control over how it reaches your guests."
        primaryLabel="Discover Informax"
        primaryHref="#information"
        secondaryLabel="See how it works"
        secondaryHref="/how-it-works"
      />

      {/* 2. Why clear, controlled information matters */}
      <Section id="information">
        <Head>
          <Reveal blur>
            <Kicker>Why information matters</Kicker>
            <Display>
              Information is part of <Soft>the guest experience.</Soft>
            </Display>
          </Reveal>
        </Head>
        <InfoMoments />
        <Reveal className="mt-14 max-w-[36ch]">
          <p className="font-serif-display text-[clamp(22px,2.6vw,32px)] leading-[1.25] text-ink">
            Each is small. <Soft>Together, they shape how easily a guest moves through the Hotel.</Soft>
          </p>
        </Reveal>
      </Section>

      {/* 3. The problem with outdated, fragmented information */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal blur>
            <Kicker>The problem</Kicker>
            <Display>
              Information changes. <Soft>Physical spaces don&rsquo;t.</Soft>
            </Display>
            <Lede className="mt-8">
              Hotels already have the information guests need. The difficulty is keeping it current and in the
              right place. Printed material dates quickly, links scatter, and guests meet something that was true
              last month.
            </Lede>
            <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-ink-mute">
              {CHANGES.map((c) => (
                <li key={c} className="border-t border-line pt-3">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-10 font-serif-display text-[clamp(24px,2.8vw,34px)] text-ink">
              Informax separates <Soft>the two.</Soft>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PrintedHistory />
          </Reveal>
        </div>
      </Section>

      {/* 4. How Informax improves information delivery */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>How Informax works</Kicker>
            <Display dark>
              Update once. <Soft dark>Every touchpoint stays current.</Soft>
            </Display>
            <Lede dark className="mt-8">
              An Informax Touch Point stays exactly where guests find it. Behind it, your Hotel decides what they
              see, and can change it at any moment.
            </Lede>
          </Reveal>
        </Head>
        <TouchPointStays />
        <p className="mt-14 font-serif-display text-[clamp(24px,2.8vw,34px)] text-white">
          Control what guests see, <Soft dark>without replacing what they touch.</Soft>
        </p>
      </Section>

      {/* 5. Throughout the Hotel */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Throughout the Hotel</Kicker>
            <Display>
              The right information, <Soft>exactly where it belongs.</Soft>
            </Display>
            <Lede className="mt-8">
              Every part of a Hotel has something guests look for. Informax puts it there, and keeps it current.
            </Lede>
          </Reveal>
        </Head>
        <HotelEnvironments />
      </Section>

      {/* 6. Benefits for the guest and the Hotel */}
      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>Why it matters</Kicker>
            <Display>
              Better for guests. <Soft>Simpler for your team.</Soft>
            </Display>
          </Reveal>
        </Head>
        <Benefits />
      </Section>

      {/* 7. Approach */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Our approach</Kicker>
            <Display>
              Designed to disappear. <Soft>Built to last.</Soft>
            </Display>
          </Reveal>
        </Head>
        <Principles />
      </Section>

      {/* 8–9. Meet Informax Cloud, with the way into the product page */}
      <MeetCloud />
    </>
  );
}
