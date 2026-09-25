import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { SITE_URL } from "@/lib/constants";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import ContentFormats from "@/components/cloud/ContentFormats";
import CloudCta from "@/components/cloud/CloudCta";
import { PermanentAddress } from "@/components/cloud/ProductPanels";
import AppFilm from "@/components/product/AppFilm";
import PhoneFilm from "@/components/product/PhoneFilm";
import SpacesShowcase from "@/components/product/SpacesShowcase";
import { TouchPointRows } from "@/components/product/ui";
import { SPA, SPA_TOUCH_POINTS } from "@/components/product/data";
import {
  ActivityFilm,
  ManyTouchPointsFilm,
  PermanentUrlFilm,
  TouchScanFilm,
  VersionsFilm,
} from "@/components/product/MicroFilms";

export const metadata: Metadata = {
  title: "Informax Cloud: Hotel Content Management for Every Space",
  description:
    "Informax Cloud is the control centre for guest information across your hotel. Give every Space a permanent address, serve a PDF or a website, connect Touch Points and change it all from anywhere.",
  alternates: { canonical: "/informax-cloud" },
};

const CONTROLS = [
  { title: "Spaces", body: "A permanent destination for every real part of the Hotel." },
  { title: "Current Content", body: "A PDF or a website, chosen by the Hotel." },
  { title: "Touch Points", body: "Every physical Touch Point, connected to its Space." },
  { title: "Activity", body: "Interactions by Space, by Touch Point and by method." },
  { title: "Previous Versions", body: "Every published version, one step from restored." },
  { title: "From anywhere", body: "Phone, tablet or desktop. Nothing to install." },
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
              Each Space shows its status, what guests currently see, how many
              Touch Points it has and its permanent address.
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
              One permanent address. <Soft>Change what is behind it.</Soft>
            </Display>
            <Lede className="mt-8">
              A Space&rsquo;s address never changes, so the Touch Points connected
              to it never need replacing.
            </Lede>
            <div className="mt-10">
              <PermanentAddress />
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
              The content changes. The permanent Space URL and every connected
              Touch Point stay exactly as they are.
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
              Upload menus, brochures, guides, floor plans or directories, or
              connect a page your Hotel already has. Switch whenever you want.
            </Lede>
          </Reveal>
        </Head>
        <ContentFormats />
      </Section>

      {/* Touch Points */}
      <Section tone="dark">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal blur>
            <Kicker dark>Touch Points</Kicker>
            <Display dark>
              Every Touch Point, <Soft dark>in one place.</Soft>
            </Display>
            <Lede dark className="mt-8">
              See every Touch Point connected to a Space, how guests use it and
              whether it is active. Each one opens the Space&rsquo;s current
              content.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="ixp relative max-h-[520px] select-none overflow-hidden rounded-[28px] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_70px_-30px_rgba(2,6,14,0.6)] sm:p-8"
              role="img"
              aria-label={`The Touch Points connected to the ${SPA.name} Space, with how many interactions each has had.`}
            >
              <div aria-hidden>
                <TouchPointRows rows={SPA_TOUCH_POINTS.slice(0, 6)} total={SPA.touchPoints} hero />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ix-navy-900 to-transparent" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>Informax Touch and Informax Scan</Kicker>
            <Display dark>
              Two ways in. <Soft dark>Both immediate.</Soft>
            </Display>
          </Reveal>
        </Head>
        <TouchScanFilm tone="dark" />
      </Section>

      {/* Activity */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Activity</Kicker>
            <Display>
              See what <Soft>guests use.</Soft>
            </Display>
            <Lede className="mt-8">
              Interactions by Space and by Touch Point, and how guests arrive:
              Informax Touch, Informax Scan or Direct.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <ActivityFilm tone="light" />
          </Reveal>
        </div>
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
              PDFs and websites together, newest first. Restore an earlier
              version in one step without touching a single Touch Point.
            </Lede>
          </Reveal>
        </div>
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
              A new Guest Directory for the winter season, published from a
              phone. Every Guest Room shows it straight away.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneFilm variant="update" space="directory" captions="light" />
          </Reveal>
        </div>
      </Section>

      {/* One Space, many Touch Points */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>One Space, many Touch Points</Kicker>
            <Display dark>
              Update once. <Soft dark>Change everywhere.</Soft>
            </Display>
          </Reveal>
        </Head>
        <ManyTouchPointsFilm tone="dark" />
      </Section>

      <CloudCta />
    </>
  );
}
