import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import CloudCta from "@/components/cloud/CloudCta";
import SameCodeDemo from "@/components/real/SameCodeDemo";
import AnalyticsPanel from "@/components/real/AnalyticsPanel";
import { AppShot } from "@/components/real/Shots";

export const metadata: Metadata = {
  title: "Informax for Restaurants: change the menu without reprinting",
  description:
    "Every table, the terrace, the bar and private dining can show the right menu. Publish a temporary menu that ends on its own. No reprinting, no replacing table cards.",
  alternates: { canonical: "/restaurants" },
};

const AREAS = [
  { place: "Main Restaurant", body: "Each table is a Space with its own Access Point." },
  { place: "Terrace", body: "Table 7 on the terrace shows the Terrace Menu, then a different menu for an evening." },
  { place: "Bar", body: "A bar menu that changes with the season, or for a promotion." },
  { place: "Private Dining", body: "The Private Dining Menu, on the door card." },
];

export default function RestaurantsPage() {
  return (
    <>
      <PageHero
        eyebrow="For restaurants"
        title={<>The right menu,<br /><span className="text-cream-mute">at every table.</span></>}
        lede="Change what a table shows without replacing its card. Publish a temporary menu, choose when it ends, and let the usual menu return on its own."
        primary={{ label: "Enquire", href: "/enquire" }}
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
        visual={<AppShot name="restaurant-spaces" alt="Spaces for a restaurant in Informax Cloud: Main Restaurant, Terrace, Bar and Private Dining" crop={0.95} />}
      />

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Table 7</Kicker>
            <Display dark>
              Terrace Menu. Wine Pairing Menu. <Soft dark>Terrace Menu.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Same printed Access Point. No reprinting. No replacing table cards. The manager controls it from Informax Cloud.
            </Lede>
          </Reveal>
        </Head>
        <SameCodeDemo variant="table" />
      </Section>

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Spaces for a restaurant</Kicker>
            <Display>
              Organised like <Soft>your floor.</Soft>
            </Display>
            <Lede className="mt-8">
              Tables, the terrace, the bar and private dining are each a Space. A table can have its own Access Point, and the menu it shows is decided by its Space.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid gap-x-14 md:grid-cols-2">
          {AREAS.map((a, i) => (
            <Reveal key={a.place} delay={(i % 2) * 0.06} className="border-t border-line py-8">
              <h3 className="font-serif-display text-[28px] text-ink">{a.place}</h3>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-ink-mute">{a.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Temporary menu</Kicker>
            <Display>
              For one evening. <Soft>Then back to normal.</Soft>
            </Display>
            <Lede className="mt-8">
              Choose the menu, choose when it ends. Table 7 shows the Wine Pairing Menu until then, and the Terrace Menu afterwards.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <AppShot name="restaurant-table-7-temporary" alt="Table 7 showing the Wine Pairing Menu now, then back to the Terrace Menu" crop={0.7} offset={0.1} />
          </Reveal>
        </div>
      </Section>

      <Section>
        <AnalyticsPanel variant="restaurant" />
      </Section>

      <CloudCta lead="Make every Access Point" line="work harder." secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }} />
    </>
  );
}
