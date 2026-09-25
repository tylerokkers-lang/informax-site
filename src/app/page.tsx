import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import TouchPointStays from "@/components/cloud/TouchPointStays";
import ContentFormats from "@/components/cloud/ContentFormats";
import GuestDirectoryCallout from "@/components/cloud/GuestDirectoryCallout";
import CloudCta from "@/components/cloud/CloudCta";
import InfoMoments from "@/components/story/InfoMoments";
import PrintedHistory from "@/components/story/PrintedHistory";
import MeetCloud from "@/components/story/MeetCloud";
import AppFilm from "@/components/product/AppFilm";
import PhoneFilm from "@/components/product/PhoneFilm";
import SpacesShowcase from "@/components/product/SpacesShowcase";
import { ActivityFilm, ManyTouchPointsFilm, PermanentUrlFilm, TouchScanFilm } from "@/components/product/MicroFilms";

export const metadata: Metadata = {
  title: { absolute: "Informax | Hotel Information Management and Guest Experience Technology" },
  description:
    "Control what guests see. Informax gives hotels one place to manage the essential information behind every part of the property, and change it from anywhere without replacing a thing.",
  alternates: { canonical: "/" },
};

const CHANGES = ["Printed menus become outdated.", "Links change.", "Schedules change.", "Offers change.", "Web pages move.", "Staff replace signs."];

const PLACES = ["Spa", "Bedroom", "Lift lobby", "Restaurant", "Gym", "Meeting rooms", "Reception"];

export default function Home() {
  return (
    <>
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

      {/* 2. Why information matters */}
      <Section id="information">
        <Head>
          <Reveal blur>
            <Kicker>Why information matters</Kicker>
            <Display>
              Information is part of <Soft>the experience.</Soft>
            </Display>
          </Reveal>
        </Head>
        <InfoMoments />
        <Reveal className="mt-14 max-w-[40ch]">
          <p className="font-serif-display text-[clamp(22px,2.6vw,32px)] leading-[1.25] text-ink">
            Each is small. <Soft>Together, they shape how effortlessly a guest moves through the Hotel.</Soft>
          </p>
        </Reveal>
      </Section>

      {/* 3. The problem */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal blur>
            <Kicker>The quiet problem</Kicker>
            <Display>
              Information changes. <Soft>Physical spaces do not.</Soft>
            </Display>
            <Lede className="mt-8">
              What a guest needs today may be different tomorrow. Traditionally,
              changing the information means changing the physical material too.
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

      {/* 4. The concept */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>The idea</Kicker>
            <Display dark>
              One permanent connection. <Soft dark>Anything behind it can change.</Soft>
            </Display>
            <Lede dark className="mt-8">
              A physical Informax Touch Point stays in place. Your Hotel controls
              what guests see behind it.
            </Lede>
          </Reveal>
        </Head>
        <TouchPointStays />
        <p className="mt-14 font-serif-display text-[clamp(24px,2.8vw,34px)] text-white">
          Change the content. <Soft dark>Keep the connection.</Soft>
        </p>
      </Section>

      {/* 5. The product */}
      <MeetCloud>
        <AppFilm captions="dark" />
      </MeetCloud>

      {/* 6. Spaces */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Spaces</Kicker>
            <Display>
              Give every part of your Hotel <Soft>a Space.</Soft>
            </Display>
            <Lede className="mt-8">
              A Space is the permanent digital destination for a real part of
              your Hotel. Spa, Restaurants, Gym, Meetings, Guest Rooms, the Guest
              Directory: each one is a Space.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <SpacesShowcase />
        </Reveal>
        <div className="mt-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal blur>
            <Kicker>Permanent address</Kicker>
            <h3 className="font-serif-display text-[clamp(28px,3.6vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
              Each Space has one Informax address. <Soft>It never changes.</Soft>
            </h3>
            <Lede className="mt-6">
              Your Hotel decides what the Space serves. The address, and every
              Touch Point connected to it, stays exactly as it is.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <PermanentUrlFilm />
          </Reveal>
        </div>
      </Section>

      {/* 7. Update anytime */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Update anytime</Kicker>
            <Display>
              Change it from <Soft>anywhere.</Soft>
            </Display>
            <Lede className="mt-8">
              Your team can update a Space from a phone, a tablet or a desktop,
              wherever they are.
            </Lede>
            <ul className="mt-10 max-w-sm">
              {["No reprinting.", "No replacing physical Touch Points.", "No changing the permanent connection."].map((l) => (
                <li key={l} className="border-t border-line py-4 font-serif-display text-[21px] text-ink">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneFilm variant="update" space="spa" captions="light" />
          </Reveal>
        </div>
      </Section>

      {/* 8. Touch Points */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Touch Points</Kicker>
            <Display dark>
              Put information where <Soft dark>guests need it.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Touch Points connect guests to Spaces. They do not own the content.
              The Space does.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <TouchScanFilm tone="dark" />
        </Reveal>
        <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-cream-mute">
          {PLACES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Section>

      {/* 9. One Space, many Touch Points */}
      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>One Space, many Touch Points</Kicker>
            <Display dark>
              Update once. <Soft dark>Change everywhere.</Soft>
            </Display>
            <Lede dark className="mt-8">
              One Guest Directory Space. Four hundred Guest Room Touch Points.
              One change in Informax Cloud, and every room follows.
            </Lede>
          </Reveal>
        </Head>
        <ManyTouchPointsFilm tone="dark" />
      </Section>

      {/* 10. PDF or website */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Your content</Kicker>
            <Display>
              Your content. <Soft>Your choice.</Soft>
            </Display>
            <Lede className="mt-8">
              Upload a menu, brochure, guide, floor plan or directory as a PDF,
              or connect a page your Hotel already has. Switch whenever you
              want. The permanent Space stays the same.
            </Lede>
          </Reveal>
        </Head>
        <ContentFormats />
      </Section>

      {/* 11. Activity */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Activity</Kicker>
            <Display>
              See what <Soft>guests use.</Soft>
            </Display>
            <Lede className="mt-8">
              Which Spaces guests open, which Touch Points they use, and whether
              they arrived with Informax Touch, Informax Scan or directly.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <ActivityFilm tone="light" />
          </Reveal>
        </div>
      </Section>

      {/* 12. Guest Directory */}
      <Section>
        <GuestDirectoryCallout />
        <div className="mt-10">
          <Link
            href="/informax-cloud"
            className="text-[15px] font-medium text-ink-mute underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Explore Informax Cloud
          </Link>
        </div>
      </Section>

      <CloudCta />
    </>
  );
}
