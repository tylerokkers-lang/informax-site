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

export const metadata: Metadata = {
  title: "Informax Cloud: manage what every QR code shows",
  description:
    "Organise your property into Spaces, choose what each one shows, publish temporary content that ends on its own, and keep every previous version. The QR code never changes.",
  alternates: { canonical: "/informax-cloud" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Informax Cloud",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "One place to manage what people see when they scan QR codes placed around hotels, restaurants and other physical locations.",
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
        headline="Every QR code. One place to manage it."
        description="Choose what people see when they scan a QR code in each room, table or area of your business. Change it whenever you like. The printed code stays."
        primaryLabel="Enquire"
        primaryHref="/enquire"
        secondaryLabel="Informax for hotels"
        secondaryHref="/hotels"
      />

      {/* The model */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>How it fits together</Kicker>
            <Display>
              Codes live in Spaces. <Soft>Spaces decide what people see.</Soft>
            </Display>
            <Lede className="mt-8">
              A Space is a real place: a bedroom, the spa, a table on the terrace. Whatever a Space shows, every code assigned to it shows too.
            </Lede>
          </Reveal>
        </Head>
        <Reveal>
          <Flow />
        </Reveal>
        <Reveal className="mt-14">
          <AppShot name="hotel-overview" alt="Informax Cloud Overview for a hotel: Spaces, active Codes, temporary content running now and what needs attention" crop={0.74} />
          <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-ink-mute">
            Overview. See what is live, what is temporary and what needs attention, the moment you sign in.
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

      {/* Space detail */}
      <Section id="space">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>One Space</Kicker>
            <Display>
              Room 324, <Soft>at a glance.</Soft>
            </Display>
            <Lede className="mt-8">
              Every Space shows what a guest sees when they scan a code there, and what you can do about it: replace the content, use a website, or publish something temporary.
            </Lede>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-ink-mute">
              Add another code to the room later and it shows the same thing straight away.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <AppShot name="hotel-room-324" alt="Room 324 in Informax Cloud showing the Hotel Guest Directory to guests who scan a code in the room" crop={0.72} />
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

      {/* Codes */}
      <Section tone="alt" id="codes">
        <Head>
          <Reveal blur>
            <Kicker>Codes</Kicker>
            <Display>
              Every code, <Soft>and where it lives.</Soft>
            </Display>
            <Lede className="mt-8">
              Find any code by name or place, see its Space, and retire it if it is no longer used. A code keeps its place for good, however often the content changes.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <AppShot name="hotel-codes" alt="Codes list for a hotel in Informax Cloud" crop={0.8} />
          </Reveal>
          <Reveal delay={0.08}>
            <AppShot name="hotel-code" alt="A single code in Informax Cloud: its Space, what it shows and its history" crop={0.8} />
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
          <li>Search any room, table or code</li>
          <li>Switch between properties</li>
          <li>Light, dark or system appearance</li>
          <li>Works on a phone, tablet or desktop</li>
        </ul>
      </Section>

      <CloudCta
        lead="Bring your QR codes"
        line="to life."
        secondary={{ label: "Informax for hotels", href: "/hotels" }}
      />
    </>
  );
}
