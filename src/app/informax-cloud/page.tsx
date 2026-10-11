import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SITE_URL } from "@/lib/constants";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import CloudCta from "@/components/cloud/CloudCta";
import { AppShot, PhoneShot } from "@/components/real/Shots";
import AnalyticsPanel from "@/components/real/AnalyticsPanel";
import Flow from "@/components/real/Flow";
import { LIVE_SPACE_CAPABILITIES, PLANNED_SPACE_CAPABILITIES } from "@/lib/product-status";

export const metadata: Metadata = {
  title: "Informax Cloud: manage what every Access Point shows",
  description:
    "Organise your property into Spaces, choose what each one shows, publish temporary content that ends on its own, and keep every previous version. The Access Point never changes.",
  alternates: { canonical: "/informax-cloud" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Informax Cloud",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "One place to manage what people see when they scan Access Points placed around hotels, restaurants and other physical locations.",
  url: `${SITE_URL}/informax-cloud`,
  publisher: { "@type": "Organization", name: "Informax", url: SITE_URL },
};

export default function InformaxCloudPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <VideoHero
        longHeadline
        videoMp4="/video/cloud-hero.mp4"
        videoWebm="/video/cloud-hero.webm"
        poster="/video/cloud-hero-poster.jpg"
        dim={0.42}
        eyebrow="Informax Cloud"
        headline="Every Access Point. One place to manage it."
        description="Choose what people see when they scan an Access Point in each room, table or area of your business. Change it whenever you like. The printed Access Point stays."
        primaryLabel="Enquire"
        primaryHref="/enquire"
        secondaryLabel="Informax for hotels"
        secondaryHref="/hotels"
      />

      {/* The model: what is live and what is planned (see lib/product-status.ts) */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>How it fits together</Kicker>
            <Display>
              One Space. Every Access Point. <Soft>Complete control.</Soft>
            </Display>
            <Lede className="mt-8">
              Organise your rooms, tables or areas into Spaces. Every room or table has its own Access Point and its own content, so Room 324 can show conference information while the other rooms keep the standard guest directory.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <Flow />
          <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-mute">
            An Access Point is the framed card or plaque guests scan with their phone. A Space is a real place: a bedroom, the spa, a table on the terrace. Restaurants work the same way: Table 7 can show the Wine Pairing Menu for an evening while other tables keep the Terrace Menu.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h3 className="text-[15px] font-semibold text-brass-deep">Available today</h3>
            <ul className="mt-4 space-y-3 text-[15.5px] leading-relaxed text-ink">
              {LIVE_SPACE_CAPABILITIES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="text-[15px] font-semibold text-ink-mute">
              Planned <span className="ml-2 rounded-full bg-ink/5 px-3 py-0.5 text-[12.5px] text-ink">Coming soon</span>
            </h3>
            <ul className="mt-4 space-y-3 text-[15.5px] leading-relaxed text-ink-mute">
              {PLANNED_SPACE_CAPABILITIES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <AppShot name="hotel-room-324" alt="Room 324 in Informax Cloud: the guest directory it shows now, and the three Access Points in the room that all show it" crop={0.74} />
          <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-mute">
            Room 324 is a Space. Its Welcome Card, Bedside and TV Access Points all show what the Space shows, and the other rooms are managed separately. From a Space you can replace its content, use a website, or publish something temporary.
          </p>
        </Reveal>
      </Section>

      {/* Spaces */}
      <Section tone="alt" id="spaces">
        <Head>
          <Reveal blur>
            <Kicker>Spaces</Kicker>
            <Display>
              Organised the way <Soft>your business is.</Soft>
            </Display>
            <Lede className="mt-8">
              A hotel has Bedrooms, floors and rooms, a Spa, a Gym, restaurants, a Bar and Public Areas. A restaurant has a Main Restaurant, a Terrace, a Bar and Private Dining. Each can hold Spaces inside it.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <AppShot name="hotel-spaces" alt="Spaces for a hotel in Informax Cloud" crop={0.9} />
            <p className="mt-4 text-[15px] text-ink-mute">A hotel. Bedrooms, Floor 3, Room 324, Spa, Gym, Public Areas.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <AppShot name="restaurant-spaces" alt="Spaces for a restaurant in Informax Cloud: Main Restaurant, Terrace, Bar and Private Dining" crop={0.9} />
            <p className="mt-4 text-[15px] text-ink-mute">A restaurant. Tables, Terrace, Bar and Private Dining.</p>
          </Reveal>
        </div>
      </Section>

      {/* Temporary content */}
      <Section tone="dark" id="temporary">
        <Head>
          <Reveal blur>
            <Kicker dark>Temporary content</Kicker>
            <Display dark>
              Change it for an hour. A day. A promotion. <Soft dark>Then it goes back.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Every piece of temporary content has an end time. When it passes, the Space returns to its usual content on its own. Nobody needs to remember to change it back.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <AppShot name="hotel-room-324-temporary" alt="Room 324 showing Conference Information now, ending tomorrow, then back to the Hotel Guest Directory" crop={0.7} offset={0.1} />
            <p className="mt-4 text-[15px] text-cream-mute">Hotel. Conference Information, then back to the Hotel Guest Directory.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <AppShot name="restaurant-table-7-temporary" alt="Table 7 showing the Wine Pairing Menu now, then back to the Terrace Menu" crop={0.7} offset={0.1} />
            <p className="mt-4 text-[15px] text-cream-mute">Restaurant. Wine Pairing Menu, then back to the Terrace Menu.</p>
          </Reveal>
        </div>
      </Section>

      {/* Version history */}
      <Section id="versions">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <AppShot name="hotel-room-324-versions" alt="Version history for Room 324 with Preview and Restore on every version" crop={0.6} offset={0.5} />
          </Reveal>
          <Reveal blur className="order-1 lg:order-2">
            <Kicker>Version history</Kicker>
            <Display>
              Update without <Soft>losing what came before.</Soft>
            </Display>
            <Lede className="mt-8">
              Previous versions stay available. Preview one, or restore it. History is never edited or deleted.
            </Lede>
          </Reveal>
        </div>
      </Section>

      {/* Access Points */}
      <Section tone="alt" id="codes">
        <Head>
          <Reveal blur>
            <Kicker>Access Points</Kicker>
            <Display>
              Every Access Point, <Soft>and where it lives.</Soft>
            </Display>
            <Lede className="mt-8">
              Find any Access Point by name or place, see its Space, and retire it if it is no longer used. An Access Point keeps its place for good, however often the content changes.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <AppShot name="hotel-codes" alt="The list of a hotel's Access Points in Informax Cloud" crop={0.8} />
          </Reveal>
          <Reveal delay={0.08}>
            <AppShot name="hotel-code" alt="A single Access Point in Informax Cloud: its Space, what it shows and its history" crop={0.8} />
          </Reveal>
        </div>
      </Section>

      {/* Analytics (planned: see lib/analytics-status.ts) */}
      <Section id="analytics">
        <AnalyticsPanel variant="cloud" />
      </Section>

      {/* Guest experience */}
      <Section tone="dark" id="guest">
        <Head>
          <Reveal blur>
            <Kicker dark>What guests see</Kicker>
            <Display dark>
              Scan. <Soft dark>It just opens.</Soft>
            </Display>
            <Lede dark className="mt-8">
              A PDF opens straight in the phone&rsquo;s browser. A website opens after a calm hand-off screen. No app, no account, no waiting.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["guest-room-324-directory", "Room 324. Hotel Guest Directory."],
              ["guest-room-324-conference", "Room 324, temporarily. Conference Information."],
              ["guest-table-7-wine", "Table 7, temporarily. Wine Pairing Menu."],
              ["guest-transition", "A website opens after a short hand-off."],
            ] as const
          ).map(([name, cap], i) => (
            <Reveal key={name} delay={i * 0.06}>
              <PhoneShot name={name} alt={cap} />
              <p className="mx-auto mt-5 max-w-[24ch] text-center text-[15px] text-cream-mute">{cap}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Activity and team */}
      <Section id="team">
        <Head>
          <Reveal blur>
            <Kicker>Your team</Kicker>
            <Display>
              Everyone has <Soft>their own account.</Soft>
            </Display>
            <Lede className="mt-8">
              Invite your team and choose what each person can do, by role and by property. Activity shows what changed and who changed it, in plain language.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <AppShot name="hotel-team" alt="Team in Informax Cloud: people, roles and access by hotel" crop={0.8} />
          </Reveal>
          <Reveal delay={0.08}>
            <AppShot name="hotel-activity" alt="Activity in Informax Cloud: what changed and who changed it" crop={0.8} />
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-x-10 gap-y-3 border-t border-line pt-8 text-[15px] text-ink-mute sm:grid-cols-2 lg:grid-cols-4">
          <li>Search any room, table or Access Point</li>
          <li>Switch between properties</li>
          <li>Light, dark or system appearance</li>
          <li>Works on a phone, tablet or desktop</li>
        </ul>
      </Section>

      <CloudCta
        lead="Make every Access Point"
        line="work harder."
        secondary={{ label: "Informax for hotels", href: "/hotels" }}
      />
    </>
  );
}
