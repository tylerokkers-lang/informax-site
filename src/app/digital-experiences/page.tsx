import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import CloudCta from "@/components/cloud/CloudCta";
import DirectoryShowcase from "@/components/story/DirectoryShowcase";
import PhoneFilm from "@/components/product/PhoneFilm";

export const metadata: Metadata = {
  title: "Digital Experiences: Digital Guest Directories for Hotels",
  description:
    "Informax designs digital guest directories and guest information for hotels. Everything a guest needs, beautifully presented, easy to find and always current.",
  alternates: { canonical: "/digital-experiences" },
};

const BENEFITS = [
  { title: "Answers in seconds", body: "Opening times, menus, Wi-Fi and services, from the Access Point in their room." },
  { title: "Fewer repeat questions", body: "Reception spends less time answering what the directory already explains." },
  { title: "Always current", body: "Change it once in Informax Cloud and every room shows the new version." },
  { title: "Unmistakably yours", body: "Designed around your brand, your tone and your property. No templates." },
  { title: "Nothing to download", body: "It opens straight away in the phone's own browser." },
  { title: "Everything, once", body: "Dining, Spa, services and local knowledge, gathered in one place." },
];

const CREATE = [
  { title: "Guest Directories", body: "The complete guide to your property, in every room." },
  { title: "Spa & treatment menus", body: "Treatments, rituals and booking, at the Spa and in the room." },
  { title: "Restaurant & bar menus", body: "Current menus at the table, the bar and in-room dining." },
  { title: "Meetings & Events packs", body: "Floor plans, layouts and menus for planners and delegates." },
  { title: "Welcome & local guides", body: "Arrival information and the best of the area." },
];

const STEPS = [
  { n: "01", title: "We design it", body: "Around your brand, your guests and the way your property runs." },
  { n: "02", title: "We connect it", body: "Each experience becomes a Space in Informax Cloud, with Access Points where guests need them." },
  { n: "03", title: "It stays current", body: "Update it whenever something changes. Nothing is reprinted or replaced." },
];

export default function DigitalExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Digital Experiences"
        title={
          <>
            Ease of information.
            <br />
            <span className="text-cream-mute">Designed for your guests.</span>
          </>
        }
        lede="Informax designs digital guest directories and guest information that feel like part of your hotel: beautifully presented, easy to find and always current."
        primary={{ label: "Talk to Informax", href: "/enquire" }}
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
        visual={<DirectoryShowcase tone="dark" />}
      />

      {/* Why ease of information matters */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Ease of information</Kicker>
            <Display>
              When information is easy, <Soft>the stay is easier.</Soft>
            </Display>
            <Lede className="mt-8">
              Guests shouldn&rsquo;t have to search, call or queue to find out
              when breakfast ends. A well-designed directory answers before the
              question is asked.
            </Lede>
          </Reveal>
        </Head>
        <RevealStagger className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <RevealStaggerItem key={b.title} className="border-t border-line py-8">
              <span className="mb-6 block font-serif-display text-[15px] italic text-brass-deep">0{i + 1}</span>
              <h3 className="font-serif-display text-[26px] leading-tight text-ink">{b.title}</h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-ink-mute">{b.body}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      {/* The guest directory */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal blur>
            <Kicker>Guest Directories</Kicker>
            <Display>
              Your whole hotel, <Soft>in the guest&rsquo;s hand.</Soft>
            </Display>
            <Lede className="mt-8">
              A digital Guest Directory designed around your property. Dining,
              Spa, services, the room itself and the best of the area, laid out
              the way a guest actually looks for things.
            </Lede>
            <ul className="mt-10 max-w-md">
              {["Designed to match your brand", "Opens from any Informax Access Point", "Connected to every room from one Space"].map((l) => (
                <li key={l} className="border-t border-line py-4 text-[15.5px] text-ink">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <DirectoryShowcase />
          </Reveal>
        </div>
      </Section>

      {/* What we create */}
      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>What we create</Kicker>
            <Display dark>
              Every piece of guest information, <Soft dark>designed.</Soft>
            </Display>
          </Reveal>
        </Head>
        <RevealStagger className="border-t border-white/10">
          {CREATE.map((c, i) => (
            <RevealStaggerItem key={c.title} className="grid gap-2 border-b border-white/10 py-7 md:grid-cols-[80px_1fr_1fr] md:items-baseline md:gap-10">
              <span className="font-serif-display text-[15px] italic text-brass-light">0{i + 1}</span>
              <h3 className="font-serif-display text-[clamp(22px,2.6vw,32px)] leading-tight text-white">{c.title}</h3>
              <p className="max-w-[40ch] text-[15.5px] leading-relaxed text-cream-mute">{c.body}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      {/* How we work */}
      <Section>
        <Head>
          <Reveal blur>
            <Kicker>How we work</Kicker>
            <Display>
              Designed by us. <Soft>Kept current by you.</Soft>
            </Display>
          </Reveal>
        </Head>
        <RevealStagger className="grid grid-cols-1 border-l border-t border-line md:grid-cols-3">
          {STEPS.map((s) => (
            <RevealStaggerItem key={s.n} className="border-b border-r border-line p-8 md:p-10">
              <span className="mb-10 block font-serif-display text-[15px] italic text-brass-deep">{s.n}</span>
              <h3 className="font-serif-display text-[30px] leading-[1.05] text-ink">{s.title}</h3>
              <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-ink-mute">{s.body}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      {/* Update anywhere */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal blur>
            <Kicker>Always current</Kicker>
            <Display>
              A new season. <Soft>A new directory in every room.</Soft>
            </Display>
            <Lede className="mt-8">
              Publish the winter Guest Directory from a phone and all four
              hundred rooms show it straight away.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneFilm variant="update" space="directory" captions="light" />
          </Reveal>
        </div>
      </Section>

      {/* Built in hospitality */}
      <Section>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal blur>
            <Kicker>Built in hospitality</Kicker>
            <Display>
              Made by people who have <Soft>worked the front office.</Soft>
            </Display>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-mute md:text-[18px]">
              Informax was born from nearly a decade of first-hand experience
              across front office, meetings and events, and guest relations. We
              know which questions guests ask, and when.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block border-b border-ink pb-1 text-[15px] font-medium text-ink transition-colors hover:border-brass-deep hover:text-brass-deep"
            >
              Read our story
            </Link>
          </Reveal>
        </div>
      </Section>

      <CloudCta />
    </>
  );
}
