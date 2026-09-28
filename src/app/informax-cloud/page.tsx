import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { SITE_URL } from "@/lib/constants";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import ContentFormats from "@/components/cloud/ContentFormats";
import CloudCta from "@/components/cloud/CloudCta";
import { PermanentConnection } from "@/components/cloud/ProductPanels";
import GuestDirectoryCallout from "@/components/cloud/GuestDirectoryCallout";
import AppFilm from "@/components/product/AppFilm";
import PhoneFilm from "@/components/product/PhoneFilm";
import SpacesShowcase from "@/components/product/SpacesShowcase";
import TouchPointsShowcase from "@/components/product/TouchPointsShowcase";
import WorkspaceShowcase from "@/components/product/WorkspaceShowcase";
import AccessPointScenes from "@/components/access/AccessPointScenes";
import {
  ActivityFilm,
  PermanentUrlFilm,
  VersionsFilm,
} from "@/components/product/MicroFilms";

export const metadata: Metadata = {
  title: "Informax Cloud: Hotel Content Management for Every Space",
  description:
    "Informax Cloud is the control centre for guest information across your hotel. Give every part of your hotel a Space, serve a PDF or a website, connect Access Points and change it all from anywhere.",
  alternates: { canonical: "/informax-cloud" },
};

const CONTROLS = [
  { title: "Spaces", body: "A permanent destination for every real part of the Hotel." },
  { title: "Current Content", body: "A PDF or a website, chosen by the Hotel." },
  { title: "Codes", body: "Every Code, connected to its Room, Area or Space." },
  { title: "Activity", body: "Interactions by Space, by Code and by room." },
  { title: "Previous Versions", body: "Every published version, one step from restored." },
  { title: "People & access", body: "Your team, each with their own sign-in." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Informax Cloud",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Hotel information management: one place to control the essential guest information behind every part of a hotel.",
  url: `${SITE_URL}/informax-cloud`,
  publisher: { "@type": "Organization", name: "Informax", url: SITE_URL },
};

export default function InformaxCloudPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <VideoHero
        videoMp4="/video/cloud-hero.mp4"
        videoWebm="/video/cloud-hero.webm"
        poster="/video/cloud-hero-poster.jpg"
        dim={0.42}
        eyebrow="Informax Cloud"
        headline="The control centre for guest information."
        description="One place to control what guests see across every Space in your Hotel."
        primaryLabel="Talk to Informax"
        primaryHref="/enquire"
        secondaryLabel="See how it works"
        secondaryHref="/how-it-works"
      />

      {/* What it controls */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>What Informax Cloud controls</Kicker>
            <Display>
              Everything guests see. <Soft>Nothing they don&rsquo;t.</Soft>
            </Display>
          </Reveal>
        </Head>
        <RevealStagger className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map((c, i) => (
            <RevealStaggerItem key={c.title} className="border-t border-line py-8">
              <span className="mb-6 block font-serif-display text-[15px] italic text-brass-deep">0{i + 1}</span>
              <h3 className="font-serif-display text-[26px] leading-none text-ink">{c.title}</h3>
              <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink-mute">{c.body}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      {/* Spaces */}
      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>Spaces</Kicker>
            <Display>
              Every part of your Hotel, <Soft>as a Space.</Soft>
            </Display>
            <Lede className="mt-8">
              Spa, Restaurants, Gym, Meetings &amp; Events, Guest Rooms. Each Space shows its status, what guests
              currently see and how many Access Points are connected to it.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <SpacesShowcase />
        </Reveal>
      </Section>

      {/* Current content */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal blur>
            <Kicker>Current Content</Kicker>
            <Display>
              One permanent connection. <Soft>Change what is behind it.</Soft>
            </Display>
            <Lede className="mt-8">
              Each Access Point&rsquo;s Code stays connected to its Space, so whatever the Space shows, the Access Point never needs replacing.
            </Lede>
            <div className="mt-10">
              <PermanentConnection />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PermanentUrlFilm />
          </Reveal>
        </div>
      </Section>

      {/* Change Content: the full product film */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Change Content</Kicker>
            <Display dark>
              Open the Space. <Soft dark>Change it. Publish.</Soft>
            </Display>
            <Lede dark className="mt-8">
              The content changes. The Space and every connected Access Point stay exactly as they are.
            </Lede>
          </Reveal>
        </Head>
        <AppFilm captions="dark" />
      </Section>

      {/* PDF or website */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>PDF or website</Kicker>
            <Display>
              Your content. <Soft>Your choice.</Soft>
            </Display>
            <Lede className="mt-8">
              Upload menus, brochures, guides, floor plans or directories, or connect a page your Hotel already
              has. Switch whenever you want.
            </Lede>
          </Reveal>
        </Head>
        <ContentFormats />
      </Section>

      {/* Previous versions */}
      <Section tone="dark">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <VersionsFilm tone="dark" />
          </Reveal>
          <Reveal blur delay={0.1}>
            <Kicker dark>Previous Versions</Kicker>
            <Display dark>
              Changed your mind? <Soft dark>Go back.</Soft>
            </Display>
            <Lede dark className="mt-8">
              PDFs and websites together, newest first. Restore an earlier version in one step without touching a
              single Access Point.
            </Lede>
          </Reveal>
        </div>
      </Section>

      {/* Code management */}
      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>Codes</Kicker>
            <Display>
              Every Code, <Soft>in one list.</Soft>
            </Display>
            <Lede className="mt-8">
              Where each one is, which Space it opens, how many are deployed and how often guests use it. What a
              Code opens is managed here, never by replacing the Access Point it sits in.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <TouchPointsShowcase />
        </Reveal>
      </Section>

      {/* Guest-facing: the Access Point */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>The Informax Access Point</Kicker>
            <Display>
              Where guests begin. <Soft>Always current.</Soft>
            </Display>
            <Lede className="mt-8">
              Guests use the Access Point with their own phone. Nothing to download, and they see what the Hotel
              has chosen for that place straight away.
            </Lede>
          </Reveal>
        </Head>
        <AccessPointScenes />
      </Section>

      {/* Activity */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Activity</Kicker>
            <Display>
              See what <Soft>guests use.</Soft>
            </Display>
            <Lede className="mt-8">
              Interactions by Space and by Code, and whether guests arrived through a Code or
              directly.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <ActivityFilm tone="light" />
          </Reveal>
        </div>
      </Section>

      {/* Hotel workspace and people */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Your Hotel</Kicker>
            <Display dark>
              One workspace. <Soft dark>Everyone on the same page.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Your Hotel&rsquo;s Spaces, Codes, Activity and people in one place. Everyone with access has
              their own sign-in, and you can see exactly who that is.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <WorkspaceShowcase />
        </Reveal>
      </Section>

      {/* Remote management */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Remote management</Kicker>
            <Display>
              Update it from <Soft>your phone.</Soft>
            </Display>
            <Lede className="mt-8">
              A new Guest Directory for the winter season, published from a phone. Every Guest Room shows it
              straight away.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneFilm variant="update" space="directory" captions="light" />
          </Reveal>
        </div>
      </Section>

      {/* Guest Directory */}
      <Section tone="alt">
        <GuestDirectoryCallout />
      </Section>

      <CloudCta />
    </>
  );
}
