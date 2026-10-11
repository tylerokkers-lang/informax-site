import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import { PLANNED_BULK_NOTE } from "@/lib/product-status";
import CloudCta from "@/components/cloud/CloudCta";
import SameCodeDemo from "@/components/real/SameCodeDemo";
import { AppShot } from "@/components/real/Shots";
import AnalyticsPanel from "@/components/real/AnalyticsPanel";
import TouchpointCard from "@/components/real/TouchpointCard";

export const metadata: Metadata = {
  title: "Informax for Hotels: an Access Point for every part of the stay",
  description:
    "Rooms, the spa, the gym, restaurants, bars and public areas, each with an Access Point you can update any time. Change what guests see without replacing a thing.",
  alternates: { canonical: "/hotels" },
};

const PLACES = [
  { place: "Room 324", shows: "Hotel Guest Directory", body: "Breakfast times, services and local information, on the card in the room." },
  { place: "Spa", shows: "Treatment Guide", body: "The latest treatments and prices, at the spa." },
  { place: "Gym", shows: "Class Schedule", body: "This week's classes, changed in a minute." },
  { place: "Lobby Lounge", shows: "Afternoon Tea", body: "Afternoon Tea information, in the lounge." },
  { place: "Reception", shows: "Hotel and local information", body: "Useful information, or your own website, at the desk." },
  { place: "Public Areas", shows: "Organised by place", body: "Group Reception, the Lobby Lounge and other areas together under one heading." },
];

export default function HotelsPage() {
  return (
    <>
      <PageHero
        eyebrow="For hotels"
        title={<>Every part of the stay,<br /><span className="text-cream-mute">one scan away.</span></>}
        lede="Give each room, restaurant, spa and public area the information it needs. Update any of it from one place, without replacing a single card."
        primary={{ label: "Enquire", href: "/enquire" }}
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
        visual={<AppShot name="hotel-spaces" alt="Spaces for a hotel in Informax Cloud: Bedrooms, Spa, Gym, restaurants, Bar and Public Areas" crop={0.95} />}
      />

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Spaces for a hotel</Kicker>
            <Display>
              Organised like <Soft>your property.</Soft>
            </Display>
            <Lede className="mt-8">
              Bedrooms group floors, and floors group rooms. Each room, the Spa, the Gym, each restaurant and bar, and each public area such as Reception or the Lobby Lounge is a Space that decides what its Access Points show.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid gap-x-14 md:grid-cols-2">
          {PLACES.map((p, i) => (
            <Reveal key={p.place} delay={(i % 2) * 0.06} className="border-t border-line py-8">
              <p className="text-[14px] font-semibold text-brass-deep">{p.place}</p>
              <h3 className="mt-2 font-serif-display text-[28px] text-ink">{p.shows}</h3>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-ink-mute">{p.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-mute">
          <span className="mr-2 inline-block rounded-full bg-ink/5 px-3 py-0.5 text-[12.5px] font-semibold text-ink">Coming soon</span>
          {PLANNED_BULK_NOTE}
        </p>
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Room 324</Kicker>
            <Display dark>
              A conference weekend. <Soft dark>Same Access Point.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Normally Room 324 opens the Hotel Guest Directory. For the conference it shows Conference Information, until the end time you choose. Then it goes back by itself.
            </Lede>
          </Reveal>
        </Head>
        <SameCodeDemo variant="room" />
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal blur>
            <Kicker>Presented properly</Kicker>
            <Display>
              A welcome card <Soft>worth keeping.</Soft>
            </Display>
            <Lede className="mt-8">
              Informax can supply framed A5 Access Points for rooms and public areas. Or print your own. No special hardware, no app, just scan.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <TouchpointCard />
          </Reveal>
        </div>
      </Section>

      <Section>
        <AnalyticsPanel variant="hotel" />
      </Section>

      <CloudCta lead="Make every Access Point" line="work harder." secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }} />
    </>
  );
}
