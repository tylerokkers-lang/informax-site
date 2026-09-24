import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnPrimary } from "@/components/ui";
import HomeHero from "@/components/cloud/HomeHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import SpacesGrid from "@/components/cloud/SpacesGrid";
import HowSteps from "@/components/cloud/HowSteps";
import TouchPointStays from "@/components/cloud/TouchPointStays";
import CloudDemo from "@/components/cloud/CloudDemo";
import TouchAndScan from "@/components/cloud/TouchAndScan";
import OneSpaceManyTouchPoints from "@/components/cloud/OneSpaceManyTouchPoints";
import ContentFormats from "@/components/cloud/ContentFormats";
import ActivityPanel from "@/components/cloud/ActivityPanel";
import GuestDirectoryCallout from "@/components/cloud/GuestDirectoryCallout";
import CloudCta from "@/components/cloud/CloudCta";

export const metadata: Metadata = {
  title: { absolute: "Informax Cloud | Connected Spaces and Touch Points for Hotels" },
  description:
    "Informax Cloud gives every part of your hotel a permanent digital Space. Connect Touch Points throughout the property and change what guests see from anywhere, without replacing a thing.",
  alternates: { canonical: "/" },
};

const CAPABILITIES = [
  {
    title: "Spaces",
    body: "A permanent digital destination for every real part of your hotel.",
  },
  {
    title: "PDF or website",
    body: "Serve what already exists. Change it whenever you like.",
  },
  {
    title: "Touch Points",
    body: "Connect them throughout the property. Install once.",
  },
  {
    title: "Activity",
    body: "See which Spaces guests use, and how they arrive.",
  },
];

const QUESTIONS = [
  "Which Spaces receive the most interaction?",
  "Which Touch Points are being used?",
  "When are guests interacting?",
  "How are guests accessing information?",
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>What Informax Cloud is</Kicker>
            <Display>
              A digital layer for the <Soft>physical hotel.</Soft>
            </Display>
            <Lede className="mt-8">
              Informax Cloud connects the information your hotel already has
              with the places guests actually are. Your team decides what each
              part of the property shows, and changes it from anywhere.
            </Lede>
          </Reveal>
        </Head>
        <RevealStagger className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <RevealStaggerItem key={c.title} className="border-t border-line py-8">
              <span className="mb-8 block font-serif-display text-[15px] italic text-brass-deep">0{i + 1}</span>
              <h3 className="font-serif-display text-[26px] leading-none text-ink">{c.title}</h3>
              <p className="mt-4 max-w-[26ch] text-[15px] leading-relaxed text-ink-mute">{c.body}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      <Section divider>
        <Head>
          <Reveal blur>
            <Kicker>Spaces</Kicker>
            <Display>
              Your hotel already has spaces. Now give them a <Soft>digital layer.</Soft>
            </Display>
            <Lede className="mt-8">
              A Space is a permanent digital destination for a real part of
              the hotel. The hotel decides what guests see when they open it.
            </Lede>
          </Reveal>
        </Head>
        <SpacesGrid />
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>How it works</Kicker>
            <Display dark>
              Simple to set up. <Soft dark>Simple to change.</Soft>
            </Display>
          </Reveal>
        </Head>
        <HowSteps dark />
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>The idea behind it all</Kicker>
            <Display dark>
              The Touch Point stays. <Soft dark>Everything behind it can change.</Soft>
            </Display>
          </Reveal>
        </Head>
        <TouchPointStays />
      </Section>

      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>Informax Cloud</Kicker>
            <Display>
              Change it from <Soft>anywhere.</Soft>
            </Display>
            <Lede className="mt-8">
              Your hotel never stands still. Menus change. Offers change.
              Schedules change. Informax Cloud lets your team update what
              guests see in seconds, without touching the Touch Points around
              your property.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <CloudDemo />
        </Reveal>
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Touch Points</Kicker>
            <Display dark>
              Put information where it <Soft dark>matters.</Soft>
            </Display>
            <Lede dark className="mt-8">
              A guest arrives at the Spa. Instead of searching the hotel
              website or calling Reception, they use the Touch Point beside
              them. The Spa Space opens instantly.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <TouchAndScan />
        </Reveal>
        <div className="mt-10">
          <BtnPrimary href="/touch-points" tone="dark">
            Explore Touch Points
          </BtnPrimary>
        </div>
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>One Space, many Touch Points</Kicker>
            <Display dark>
              One change. <Soft dark>Every Touch Point.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Four hundred bedrooms, one Guest Directory Space. The hotel
              looks after one piece of content, not four hundred. Change it
              once and every room follows.
            </Lede>
          </Reveal>
        </Head>
        <OneSpaceManyTouchPoints />
      </Section>

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Your content</Kicker>
            <Display>
              Your content. <Soft>Your way.</Soft>
            </Display>
            <Lede className="mt-8">
              Informax does not ask you to recreate what already exists.
              Upload a PDF or connect a page from your hotel website.
            </Lede>
          </Reveal>
        </Head>
        <ContentFormats />
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-14 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Activity</Kicker>
            <Display>
              See what guests <Soft>use.</Soft>
            </Display>
            <ol className="mt-10 max-w-md">
              {QUESTIONS.map((q, i) => (
                <li key={q} className="flex gap-5 border-t border-line py-4 text-[15.5px] text-ink">
                  <span className="font-serif-display italic text-brass-deep">0{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <ActivityPanel />
          </Reveal>
        </div>
      </Section>

      <Section>
        <GuestDirectoryCallout />
        <div className="mt-12">
          <Link href="/hospitality" className="text-[15px] font-medium text-ink-mute underline-offset-4 transition-colors hover:text-ink hover:underline">
            How hotels use Informax
          </Link>
        </div>
      </Section>

      <CloudCta />
    </>
  );
}
