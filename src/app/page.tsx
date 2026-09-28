import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import MeetCloud from "@/components/story/MeetCloud";
import LocationFlow from "@/components/access/LocationFlow";
import AccessPointScenes from "@/components/access/AccessPointScenes";
import RoomsWorkflow from "@/components/access/RoomsWorkflow";
import TemporaryTimeline, { OCCASIONS } from "@/components/access/TemporaryTimeline";
import SpacesMap, { SPACE_EXAMPLES } from "@/components/access/SpacesMap";
import Colourways from "@/components/access/Colourways";
import BulkUpdate from "@/components/access/BulkUpdate";
import AnalyticsSnapshot from "@/components/access/AnalyticsSnapshot";
import AuditTrail from "@/components/access/AuditTrail";
import FitsAround from "@/components/access/FitsAround";

export const metadata: Metadata = {
  title: { absolute: "Informax | Hotel Information Management with Informax Cloud" },
  description:
    "Informax Cloud gives every hotel room and area its own Access Point, so hotels control the guest information behind it, schedule temporary content and manage it all from one place.",
  alternates: { canonical: "/" },
};

/**
 * The homepage explains Informax Cloud in the order a hotel thinks about
 * it: the idea, the physical Access Point, the everyday workflow, the
 * capabilities that save time (temporary content, Spaces, hotel-wide
 * changes), what the Hotel learns and how it fits alongside what they
 * already use.
 */
export default function Home() {
  return (
    <>
      {/* 1. Hero: the existing film, new message */}
      <VideoHero
        videoMp4="/video/home-hero.mp4"
        videoWebm="/video/home-hero.webm"
        poster="/video/home-hero-poster.jpg"
        eyebrow="Informax Cloud"
        headline="Hotel information, exactly where it needs to be."
        description="Informax Cloud gives every room and area its own Access Point, so hotels control what guests see, show temporary information when it matters and manage everything from one place."
        primaryLabel="Discover Informax Cloud"
        primaryHref="/informax-cloud"
        secondaryLabel="Enquire"
        secondaryHref="/enquire"
      />

      {/* 2. The whole idea */}
      <Section id="how-it-works">
        <Head>
          <Reveal blur>
            <Kicker>How it works</Kicker>
            <Display>
              One platform. <Soft>Every room and area.</Soft>
            </Display>
            <Lede className="mt-8">
              Shared information lives in Spaces, such as the Spa or Restaurants. Rooms and areas that need their
              own information can have it. Each place keeps a permanent Access Point, while what guests see can
              change whenever the hotel needs it to.
            </Lede>
          </Reveal>
        </Head>
        <LocationFlow />
      </Section>

      {/* 3. The Access Point */}
      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>Meet the Informax Access Point</Kicker>
            <Display>
              One permanent Access Point. <Soft>Unlimited possibilities behind it.</Soft>
            </Display>
            <Lede className="mt-8">
              The Access Point is the object guests find in the room, at the Spa or on the table. It carries a
              Code, its permanent identity, connected to a Room, Area or Space. The Access Point stays where it
              is; what its Code opens is managed in Informax Cloud.
            </Lede>
          </Reveal>
        </Head>
        <AccessPointScenes />
        <p className="mt-6 text-[13px] text-ink-mute">
          Illustrations. Access Point and Code designs are proven in real hotel conditions before production.
        </p>
      </Section>

      {/* 4. Spaces: shared information */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Spaces</Kicker>
            <Display>
              Shared information. <Soft>One place to update it.</Soft>
            </Display>
            <Lede className="mt-8">
              A Space holds the information many places share: the Spa, Restaurants, the Gym, Meetings &amp; Events,
              Guest Information. Every Access Point that follows a Space shows its latest version, so one update
              reaches all of them.
            </Lede>
          </Reveal>
        </Head>
        <SpacesMap />
        <Reveal className="mt-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink-mute">
            {SPACE_EXAMPLES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 5. Rooms & Areas: precise control */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Rooms &amp; Areas</Kicker>
            <Display dark>
              Every location, <Soft dark>under control.</Soft>
            </Display>
            <Lede dark className="mt-8">
              When one place needs its own information, Rooms &amp; Areas add precise control on top of Spaces:
              Room 324, Room 1001, the Ballroom, Reception. Informax Cloud is designed so that finding a place,
              seeing what guests see and changing it takes a few simple steps.
            </Lede>
          </Reveal>
        </Head>
        <RoomsWorkflow />
      </Section>

      {/* 6. Temporary content and the Default Landing Page */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Temporary content</Kicker>
            <Display>
              Change it now. Change it later. <Soft>Let Informax change it back.</Soft>
            </Display>
            <Lede className="mt-8">
              Show guests something for as long as it matters, then let the room go back to normal on its own.
              Every hotel keeps a Default Landing Page, so there is always a permanent place to return to.
            </Lede>
          </Reveal>
        </Head>
        <TemporaryTimeline />
        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink-mute">
            {OCCASIONS.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 7. Access Point design */}
      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>Access Point design</Kicker>
            <Display>
              Designed <Soft>to belong.</Soft>
            </Display>
            <Lede className="mt-8">
              Access Points come in approved colours to suit your hotel and its interiors. The Code keeps one
              controlled Informax design, so guests recognise it anywhere in the property.
            </Lede>
          </Reveal>
        </Head>
        <Colourways />
        <p className="mt-10 text-[13px] text-ink-mute">Illustrations. Final Code designs are tested in real conditions before production.</p>
      </Section>

      {/* 8. Hotel-wide control */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Hotel-wide control</Kicker>
            <Display>
              Change one room. <Soft>Or change the whole property.</Soft>
            </Display>
            <Lede className="mt-8">
              Built for changes across the whole property, a floor, a range of rooms or a hand-picked selection,
              and for putting everything back just as easily.
            </Lede>
          </Reveal>
        </Head>
        <BulkUpdate />
      </Section>

      {/* 9. Analytics */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Analytics</Kicker>
            <Display dark>
              Understand what guests <Soft dark>actually use.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Designed to answer the questions hotels ask: which rooms and areas guests use most, which PDFs and
              websites they open, how temporary information did, and which Codes have gone quiet.
            </Lede>
          </Reveal>
        </Head>
        <AnalyticsSnapshot />
      </Section>

      {/* 10. Audit */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal blur>
            <Kicker>Accountability</Kicker>
            <Display>
              Every change, <Soft>accounted for.</Soft>
            </Display>
            <Lede className="mt-8">
              A clear record of who changed what, for how long, and what came back automatically. Written the way
              people talk.
            </Lede>
          </Reveal>
          <AuditTrail />
        </div>
      </Section>

      {/* 11. Works with what hotels already use */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Works with what you have</Kicker>
            <Display dark>
              Informax fits <Soft dark>around your hotel.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Keep the systems you already use. Informax is built to control how guests reach them from the right
              place.
            </Lede>
          </Reveal>
        </Head>
        <FitsAround />
      </Section>

      {/* 12. Final call to action */}
      <MeetCloud
        id="enquire-cta"
        eyebrow="Informax Cloud"
        headline="A simpler way to control hotel information."
        body="Give every room and area a permanent Access Point and control the information behind it from Informax Cloud."
        primary={{ label: "Enquire about Informax Cloud", href: "/enquire" }}
        secondary={{ label: "Discover Informax Cloud", href: "/informax-cloud" }}
      />
    </>
  );
}
