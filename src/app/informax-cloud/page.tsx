import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { SITE_URL } from "@/lib/constants";
import { SPACES } from "@/lib/spaces";
import PageHero from "@/components/cloud/PageHero";
import CloudChrome from "@/components/cloud/CloudChrome";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import SpacesGrid from "@/components/cloud/SpacesGrid";
import ContentFormats from "@/components/cloud/ContentFormats";
import CloudDemo from "@/components/cloud/CloudDemo";
import OneSpaceManyTouchPoints from "@/components/cloud/OneSpaceManyTouchPoints";
import ActivityPanel from "@/components/cloud/ActivityPanel";
import CloudCta from "@/components/cloud/CloudCta";
import { PermanentAddress, VersionHistory, Devices } from "@/components/cloud/ProductPanels";

export const metadata: Metadata = {
  title: "Informax Cloud: Hotel Content Management for Every Space",
  description:
    "Create a Space for each part of your hotel, give it a permanent address and connect Touch Points. Serve a PDF or a website, and change it remotely from a phone, tablet or desktop.",
  alternates: { canonical: "/informax-cloud" },
};

const MODEL = [
  { lead: "A Space owns the content.", body: "The hotel chooses what each Space shows, as a PDF or a website." },
  { lead: "Touch Points connect to Spaces.", body: "A Touch Point never holds content of its own. It opens the Space it is connected to." },
  { lead: "Change the Space, and every Touch Point follows.", body: "One update reaches every connected Touch Point at once." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Informax Cloud",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "A hospitality content platform that connects digital information with physical locations throughout a hotel.",
  url: `${SITE_URL}/informax-cloud`,
  publisher: { "@type": "Organization", name: "Informax", url: SITE_URL },
};

function HeroVisual() {
  return (
    <CloudChrome>
      <div className="grid grid-cols-2 gap-px bg-white/10 p-px">
        {SPACES.slice(0, 4).map((sp) => (
          <div key={sp.id} className="bg-charcoal-900 p-5">
            <sp.icon size={16} className="mb-12 text-brass-light" />
            <div className="text-[13px] font-medium text-white">{sp.name}</div>
            <div className="mt-1 text-[11px] text-cream-mute">{sp.touchPoints} Touch Points</div>
          </div>
        ))}
      </div>
    </CloudChrome>
  );
}

export default function InformaxCloudPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Informax Cloud"
        title={<>Every part of your hotel, <span className="italic text-glow">one place.</span></>}
        lede="Create a Space for each part of your hotel. Give it a permanent address, connect Touch Points and change what guests see whenever you like."
        primary={{ label: "Talk to Informax", href: "/enquire" }}
        secondary={{ label: "See how it works", href: "/how-it-works" }}
        visual={<HeroVisual />}
      />

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Spaces</Kicker>
            <Display>
              Every part of your hotel becomes a <Soft>Space.</Soft>
            </Display>
            <Lede className="mt-8">
              Spa, Gym, Restaurants, Meetings, Bedrooms and the Guest
              Directory. Each one is a permanent digital destination for a
              real part of the hotel.
            </Lede>
          </Reveal>
        </Head>
        <SpacesGrid />
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-14 grid-cols-1 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal blur>
            <Kicker>Permanent address</Kicker>
            <Display>
              One permanent connection. <Soft>Change what is behind it.</Soft>
            </Display>
            <Lede className="mt-8">
              Every Space has its own permanent Informax address. Because it
              never changes, the Touch Points connected to it never need
              replacing.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <PermanentAddress />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Content</Kicker>
            <Display>
              Your content. <Soft>Your way.</Soft>
            </Display>
            <Lede className="mt-8">
              A Space can serve a PDF or a website, and you can switch between
              them at any time. Nothing has to be recreated.
            </Lede>
          </Reveal>
        </Head>
        <ContentFormats />
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Change content</Kicker>
            <Display dark>
              Change it from <Soft dark>anywhere.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Open a Space, change its content, publish. Every connected
              Touch Point is updated straight away.
            </Lede>
          </Reveal>
        </Head>
        <CloudDemo />
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>Scale</Kicker>
            <Display dark>
              Update once. <Soft dark>Change everywhere.</Soft>
            </Display>
          </Reveal>
        </Head>
        <OneSpaceManyTouchPoints />
      </Section>

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>The model</Kicker>
            <Display>
              Three rules. <Soft>Nothing to untangle.</Soft>
            </Display>
          </Reveal>
        </Head>
        <RevealStagger className="border-t border-line">
          {MODEL.map((m, i) => (
            <RevealStaggerItem key={m.lead} className="grid gap-3 border-b border-line py-8 md:grid-cols-[80px_1.1fr_1fr] md:gap-10">
              <span className="font-serif-display text-[15px] italic text-brass-deep">0{i + 1}</span>
              <h3 className="font-serif-display text-[clamp(22px,2.6vw,32px)] leading-tight text-ink">{m.lead}</h3>
              <p className="max-w-[40ch] text-[15.5px] leading-relaxed text-ink-mute">{m.body}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-14 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Activity</Kicker>
            <Display>
              See what guests <Soft>use.</Soft>
            </Display>
            <Lede className="mt-8">
              Interactions by Space, by Touch Point, by time of day and by how
              guests arrive: Informax Touch, Informax Scan or direct.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <ActivityPanel />
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid items-center gap-14 grid-cols-1 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <VersionHistory />
          </Reveal>
          <Reveal blur delay={0.1}>
            <Kicker dark>Version history</Kicker>
            <Display dark>
              Changed your mind? <Soft dark>Go back.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Every published version stays within reach. Restore an earlier
              one in moments, without touching a single Touch Point.
            </Lede>
            <div className="mt-12">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
                Manage from anywhere
              </div>
              <Devices />
            </div>
          </Reveal>
        </div>
      </Section>

      <CloudCta />
    </>
  );
}
