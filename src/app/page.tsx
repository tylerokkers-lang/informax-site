import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import VideoHero from "@/components/sections/VideoHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import CloudCta from "@/components/cloud/CloudCta";
import SameCodeDemo from "@/components/real/SameCodeDemo";
import { AppShot, PhoneShot } from "@/components/real/Shots";
import Flow from "@/components/real/Flow";
import TouchpointCard from "@/components/real/TouchpointCard";

export const metadata: Metadata = {
  title: { absolute: "Informax | QR codes, made useful" },
  description:
    "The QR code stays. Everything behind it can change. Informax Cloud gives hotels and restaurants one place to manage what people see when they scan.",
  alternates: { canonical: "/" },
};

const HOTEL_PLACES = [
  ["Room 324", "Hotel Guest Directory"],
  ["Spa", "Treatment Guide"],
  ["Gym", "Class Schedule"],
  ["Lobby Lounge", "Afternoon Tea"],
  ["Reception", "Hotel and local information"],
];

export default function Home() {
  return (
    <>
      <VideoHero
        videoMp4="/video/home-hero.mp4"
        videoWebm="/video/home-hero.webm"
        poster="/video/home-hero-poster.jpg"
        eyebrow="Informax Cloud"
        headline={
          <>
            The QR code stays.
            <br />
            Everything behind it can change.
          </>
        }
        description="Informax Cloud gives businesses one place to manage what people see when they scan QR codes across their spaces."
        primaryLabel="Explore Informax Cloud"
        primaryHref="/informax-cloud"
        secondaryLabel="Enquire"
        secondaryHref="/enquire"
      />

      {/* Familiar by design */}
      <Section id="familiar">
        <Head>
          <Reveal blur>
            <Kicker>Familiar by design</Kicker>
            <Display>
              QR codes, <Soft>made useful.</Soft>
            </Display>
            <Lede className="mt-8">
              The world already knows how to scan. Informax gives businesses control over what happens next.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-3">
          {[
            ["No app", "Guests open their phone camera and scan. Nothing to download."],
            ["No special hardware", "Print your own codes, or use framed cards from Informax."],
            ["No new behaviour", "Everyone already knows what a QR code is for."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <h3 className="text-xl font-semibold text-ink">{t}</h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-ink-mute">{b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Same QR, different content: Room 324 */}
      <Section tone="dark" id="same-code">
        <Head>
          <Reveal blur>
            <Kicker dark>Print it once. Update it anytime.</Kicker>
            <Display dark>
              Same QR code. <Soft dark>Different content.</Soft>
            </Display>
            <Lede dark className="mt-8">
              A hotel changes what Room 324 shows for a conference weekend. The card in the room stays exactly where it is.
            </Lede>
          </Reveal>
        </Head>
        <SameCodeDemo variant="room" />
      </Section>

      {/* Informax Cloud */}
      <Section id="cloud">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Informax Cloud</Kicker>
            <Display>
              Every code, <Soft>in one place.</Soft>
            </Display>
            <Lede className="mt-8">
              Organise your property into Spaces. Each Space decides what people see when they scan a code placed there. Change it in Informax Cloud and the next scan shows the new content.
            </Lede>
            <Link href="/informax-cloud" className="ix-link mt-10 inline-flex">
              Explore Informax Cloud →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <AppShot name="hotel-overview" alt="Informax Cloud Overview for a hotel: Spaces, active Codes, temporary content running now and what needs attention" crop={0.7} />
          </Reveal>
        </div>
        <Reveal className="mt-16">
          <Flow />
        </Reveal>
      </Section>

      {/* Hotels */}
      <Section tone="alt" id="hotels">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <AppShot name="hotel-spaces" alt="Spaces in Informax Cloud for a hotel: Bedrooms with floors, Spa, Gym, Main Restaurant, Bar and Public Areas" crop={0.85} />
          </Reveal>
          <Reveal blur className="order-1 lg:order-2">
            <Kicker>For hotels</Kicker>
            <Display>
              Every part of the stay, <Soft>one scan away.</Soft>
            </Display>
            <Lede className="mt-8">
              Rooms, the spa, the gym, restaurants, bars and public areas each have their own Space. Each one shows what guests need there.
            </Lede>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {HOTEL_PLACES.map(([place, content]) => (
                <li key={place} className="flex items-baseline justify-between gap-6 py-3.5 text-[15px]">
                  <span className="font-semibold text-ink">{place}</span>
                  <span className="text-right text-ink-mute">{content}</span>
                </li>
              ))}
            </ul>
            <Link href="/hotels" className="ix-link mt-10 inline-flex">
              Informax for hotels →
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Restaurants */}
      <Section tone="dark" id="restaurants">
        <Head>
          <Reveal blur>
            <Kicker dark>For restaurants</Kicker>
            <Display dark>
              Table 7. <Soft dark>Two menus. One QR code.</Soft>
            </Display>
            <Lede dark className="mt-8">
              Table 7 normally opens the Terrace Menu. For an evening, it shows the Wine Pairing Menu. When the timer ends, the Terrace Menu is back.
            </Lede>
          </Reveal>
        </Head>
        <SameCodeDemo variant="table" />
        <div className="mt-12">
          <Link href="/restaurants" className="ix-link ix-link-dark inline-flex">
            Informax for restaurants →
          </Link>
        </div>
      </Section>

      {/* Temporary content */}
      <Section id="temporary">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Temporary content</Kicker>
            <Display>
              Change it for an hour. <Soft>Then it changes back.</Soft>
            </Display>
            <Lede className="mt-8">
              Show something different for an hour, a day or a promotion. Choose when it ends. Informax returns to the usual content on its own, so nobody has to remember.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <AppShot name="hotel-room-324-temporary" alt="Room 324 in Informax Cloud showing Conference Information now, ending tomorrow, then back to the Hotel Guest Directory" crop={0.62} offset={0.12} />
          </Reveal>
        </div>
      </Section>

      {/* Version history */}
      <Section tone="alt" id="versions">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <AppShot name="hotel-room-324-versions" alt="Version history for Room 324 in Informax Cloud, with Restore on each earlier version" crop={0.6} offset={0.5} />
          </Reveal>
          <Reveal blur className="order-1 lg:order-2">
            <Kicker>Version history</Kicker>
            <Display>
              Update without <Soft>losing what came before.</Soft>
            </Display>
            <Lede className="mt-8">
              Changed your mind? Every earlier version is still there. Restore one whenever you need it.
            </Lede>
          </Reveal>
        </div>
      </Section>

      {/* Physical touchpoints */}
      <Section id="touchpoints">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal blur>
            <Kicker>Physical touchpoints</Kicker>
            <Display>
              No special hardware. <Soft>No app. Just scan.</Soft>
            </Display>
            <Lede className="mt-8">
              Informax can supply premium framed QR cards for rooms and tables. Prefer your own materials? Print your codes yourself. Either way, what the code shows is managed in Informax Cloud.
            </Lede>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-ink-mute">
              Designed and printed guest information is an optional extra. The software is the product.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TouchpointCard />
          </Reveal>
        </div>
      </Section>

      {/* Real product, more of it */}
      <Section tone="alt" id="product">
        <Head>
          <Reveal blur>
            <Kicker>The real product</Kicker>
            <Display>
              This is Informax Cloud. <Soft>Not a mock-up.</Soft>
            </Display>
          </Reveal>
        </Head>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr_230px]">
          <Reveal>
            <AppShot name="hotel-codes" alt="Codes in Informax Cloud: every code, the Space it belongs to and its status" crop={0.78} />
            <p className="mt-4 text-[15px] text-ink-mute">Codes. Every code and where it lives.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <AppShot name="hotel-activity" alt="Activity in Informax Cloud: what changed and who changed it, in plain language" crop={0.78} />
            <p className="mt-4 text-[15px] text-ink-mute">Activity. What changed, and who changed it.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <PhoneShot name="guest-transition" alt="The Informax Cloud screen guests see for a moment before a website opens" />
            <p className="mt-4 text-center text-[15px] text-ink-mute">The guest sees a calm hand-off when a Space opens a website.</p>
          </Reveal>
        </div>
        <div className="mt-12">
          <Link href="/informax-cloud" className="ix-link inline-flex">
            See Informax Cloud →
          </Link>
        </div>
      </Section>

      <CloudCta
        lead="Bring your QR codes"
        line="to life."
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
      />
    </>
  );
}
