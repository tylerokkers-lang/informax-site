import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import AccessPoint from "@/components/access/AccessPoint";
import { ComingSoonBadge, PreviewNote } from "@/components/site/ComingSoon";
import { Browser, Phone } from "@/components/site/Devices";
import { Heading } from "@/components/site/Sections";
import { Reveal } from "@/components/Reveal";
import { CLOUD_LOGIN_URL, DEMO_CTA, SITE_URL } from "@/lib/constants";
import type { ScreenKey } from "@/lib/screens";

export const metadata: Metadata = {
  title: "Meet Informax Cloud: coming soon",
  description:
    "Meet Informax Cloud, the platform behind Informax: one place for hotels and restaurants to manage the information guests see. In development, coming soon.",
  alternates: { canonical: "/informax-cloud" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Informax Cloud",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "The platform behind Informax, in development: one place for hotels and restaurants to manage the digital information guests open from permanent Codes.",
  url: `${SITE_URL}/informax-cloud`,
  publisher: { "@type": "Organization", name: "Informax", url: SITE_URL },
};

/**
 * How far along each part is. Everything on this page is in the development
 * build of Informax Cloud (V2) and none of it is publicly available yet.
 * "testing" marks parts that are built but still being verified (HANDOVER.md §0c).
 */
type Status = "built" | "testing";
const STATUS: Record<Status, string> = {
  built: "Working in the development build",
  testing: "Built, still in testing",
};

const LEVELS = [
  { name: "Your property", body: "The hotel or restaurant using Informax.", example: "Marlowe Grand Hotel" },
  { name: "Your spaces", body: "An area such as Bedrooms, Spa or Main Restaurant.", example: "Bedrooms" },
  { name: "Your Access Points", body: "A permanent Code placed where guests need information.", example: "Coffee Table" },
  { name: "Your content", body: "The digital information guests see when they access that Code.", example: "Guest Directory.pdf" },
];

const WORK = [
  { title: "Your property is set up", body: "Your hotel or restaurant, and its Spaces such as Bedrooms, Spa or Main Restaurant." },
  { title: "Codes go where guests need them", body: "Each Access Point gets one permanent Code, printed as often as you like." },
  { title: "Your team keeps it current", body: "Change what a Code opens in Informax Cloud. Every printed copy shows the update." },
];

const FEATURES: { title: string; soft: string; body: string; screen: ScreenKey; status: Status; points: string[] }[] = [
  {
    title: "One place",
    soft: "to manage everything.",
    body: "Manage the guest-facing information across your whole property from one place. Every Access Point opens on what a guest sees right now.",
    screen: "deskMenuBefore",
    status: "built",
    points: ["What guests see, at a glance", "Your usual content or something temporary, clearly marked", "From a computer or your phone"],
  },
  {
    title: "Update once.",
    soft: "Change everywhere.",
    body: "Replace the content behind a shared Access Point and every printed copy of its Code shows the new version. Upload a PDF, or point the Code at your own website.",
    screen: "deskMenuReplace",
    status: "built",
    points: ["One Code, printed as often as you need", "PDF or website", "Nothing to reprint"],
  },
  {
    title: "Temporary information",
    soft: "that ends on time.",
    body: "Publish something for a while, with a start and an end time. When it expires, your usual content comes back automatically.",
    screen: "deskSpaCompose",
    status: "built",
    points: ["Quick choices, or an exact end time", "Start now or later", "End it early whenever you like"],
  },
  {
    title: "Organise",
    soft: "your property.",
    body: "Arrange your Spaces and the Access Points inside them in a structure that matches your building, and see at a glance what is live and what is temporary.",
    screen: "deskBedrooms",
    status: "built",
    points: ["Spaces such as Bedrooms, Spa or Main Restaurant", "Access Points inside each Space", "Live, temporary or not set up, at a glance"],
  },
  {
    title: "Manage many Access Points",
    soft: "together.",
    body: "Choose a type of Access Point, such as every Bathroom, check the list, then publish one PDF or website to all of them, with the option to undo the whole update.",
    screen: "deskBulk",
    status: "testing",
    points: ["By type or by Space", "Check the list before publishing", "Undo a whole update"],
  },
  {
    title: "Version history",
    soft: "for every Access Point.",
    body: "Each change creates a new version. Earlier versions are kept, so you can review them and restore one when you need it.",
    screen: "deskMenuPublished",
    status: "built",
    points: ["Every earlier version kept", "Restore in one step", "Who changed what, and when"],
  },
];

function StatusTag({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-semibold ${
        status === "built" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "built" ? "bg-emerald-600" : "bg-amber-600"}`} aria-hidden />
      {STATUS[status]}
    </span>
  );
}

export default function InformaxCloudPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#16304f_0%,#0b1524_45%,#060a12_100%)] pb-10 pt-[124px] text-cream md:pt-[150px]">
        <div className="mx-auto max-w-8xl px-6 text-center md:px-10">
          <div className="ix-hero-rise">
            <ComingSoonBadge className="mb-6" />
            <h1 className="mx-auto text-balance font-serif-display text-[clamp(46px,7vw,96px)] leading-[0.98] text-white">
              Meet Informax Cloud.
            </h1>
            <p className="mx-auto mt-5 max-w-[30ch] text-balance font-serif-display text-[clamp(22px,2.6vw,32px)] leading-snug text-cream-mute">
              One platform. Every Access Point. Always up to date.
            </p>
            <p className="mx-auto mt-7 max-w-[42rem] text-[18px] leading-relaxed text-white/75">
              Informax Cloud gives hotels and restaurants one simple place to manage the digital information their guests see.
              Update a menu, change opening hours or publish a new offer — without replacing the printed Code.
            </p>
            <div className="mx-auto mt-8 max-w-[38rem] rounded-2xl bg-white/[0.06] px-5 py-4 text-[15px] leading-relaxed text-white/80 ring-1 ring-white/10">
              Informax Cloud is currently in development. We&rsquo;re building a simpler way for hospitality businesses to manage
              guest information.
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary">{DEMO_CTA.label}</Link>
              <a href="#how-it-works" className="ix-link text-brass-light hover:text-white">
                See How It Works <ArrowDown size={16} aria-hidden />
              </a>
            </div>
          </div>
          <div className="relative mx-auto mt-16 max-w-[1080px]">
            <Browser screen="deskHotelOverview" priority className="w-full sm:w-[88%]" />
            <div className="absolute -bottom-6 right-0 w-[26%] max-w-[250px] sm:-bottom-10">
              <Phone screens={["cloudSpacesPhone"]} sizes="(min-width: 640px) 250px, 26vw" />
            </div>
          </div>
          <div className="mt-14">
            <PreviewNote dark />
          </div>
        </div>
      </header>

      {/* How Informax and Informax Cloud fit together. */}
      <section id="how-it-works" className="scroll-mt-20 bg-paper py-24 md:py-28" aria-labelledby="ecosystem-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Heading
            id="ecosystem-h"
            center
            eyebrow="How it fits together"
            title="Informax is the guest information solution."
            soft="Informax Cloud is the platform that powers it."
          />
          <div className="mx-auto mt-14 grid max-w-[980px] grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <Reveal className="flex flex-col items-center rounded-[24px] bg-white p-8 text-center shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
              <AccessPoint place="Table 12" sub="Menu" size="md" />
              <h3 className="mt-6 font-serif-display text-[24px] text-ink">Informax</h3>
              <p className="mt-2 max-w-[24rem] text-[15.5px] leading-relaxed text-ink-soft">
                Permanent Codes at the Access Points around your property, where guests need information.
              </p>
            </Reveal>
            <div className="hidden items-center justify-center text-ink-mute md:flex" aria-hidden>
              <ArrowRight size={22} />
            </div>
            <Reveal delay={0.08} className="flex flex-col items-center rounded-[24px] bg-charcoal-950 p-8 text-center text-cream">
              <div className="w-[120px]">
                <Phone screens={["cloudMenuPublished"]} sizes="120px" />
              </div>
              <h3 className="mt-6 font-serif-display text-[24px] text-white">Informax Cloud</h3>
              <p className="mt-2 max-w-[24rem] text-[15.5px] leading-relaxed text-white/75">
                Where your team decides what every Code opens, and changes it whenever they need to.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-16 max-w-[980px]">
            <h3 className="text-center font-serif-display text-[26px] text-ink">How it will work</h3>
            <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
              {WORK.map((w, i) => (
                <li key={w.title} className="rounded-[20px] bg-paper-alt p-6">
                  <span className="text-[13px] font-semibold text-brass-deep">Step {i + 1}</span>
                  <p className="mt-2 text-[17px] font-semibold text-ink">{w.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{w.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Property, Spaces, Access Points, Content. */}
      <section className="bg-paper-alt py-24 md:py-32" aria-labelledby="structure-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Heading
            id="structure-h"
            eyebrow="How Informax Cloud is organised"
            title="Your property, in four simple layers."
            body="Everything in Informax Cloud follows the shape of your building, so it is easy to find what guests see in any room."
          />
          <ol className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Your property, your spaces, your Access Points, your content">
            {LEVELS.map((l, i) => (
              <li key={l.name} className="relative flex flex-col rounded-[22px] bg-white p-6 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
                <span className="text-[13px] font-semibold text-brass-deep">{i + 1}</span>
                <h3 className="mt-2 font-serif-display text-[22px] leading-tight text-ink">{l.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{l.body}</p>
                <p className="mt-auto pt-5">
                  <span className="inline-block rounded-full bg-paper-alt px-3 py-1 text-[13px] font-medium text-ink-soft">{l.example}</span>
                </p>
                {i < LEVELS.length - 1 ? (
                  <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-mute shadow-[0_0_0_1px_rgba(11,21,36,0.08)] lg:flex" aria-hidden>
                    <ArrowRight size={14} />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <Reveal className="mt-14">
            <Browser screen="deskSpaces" className="mx-auto max-w-[1000px]" />
          </Reveal>
          <div className="mx-auto mt-5 max-w-[1000px]">
            <PreviewNote>The Spaces of a hotel and the Access Points in each, as they appear in the development build. Fictional hotel.</PreviewNote>
          </div>
        </div>
      </section>

      <section id="what-it-offers" className="scroll-mt-20 bg-paper pb-4 pt-24 md:pt-32" aria-labelledby="offer-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Heading
            id="offer-h"
            eyebrow="What it will offer"
            title="Everything your guests see,"
            soft="in one simple place."
            body="These are the parts of Informax Cloud being built now. Each one is labelled honestly with how far along it is, and none of it is publicly available yet."
          />
          <p className="mt-8 flex flex-wrap items-center gap-3 text-[14.5px] text-ink-soft">
            <StatusTag status="built" />
            <StatusTag status="testing" />
          </p>
        </div>
      </section>

      {FEATURES.map((f, i) => (
        <section key={f.title} className={`py-20 md:py-28 ${i % 2 ? "bg-paper" : "bg-paper-alt"}`} aria-labelledby={`feature-${i}`}>
          <div className={`mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:gap-16 ${i % 2 ? "lg:grid-cols-[1.25fr_0.75fr]" : "lg:grid-cols-[0.75fr_1.25fr]"}`}>
            <div className={i % 2 ? "lg:order-2" : undefined}>
              <StatusTag status={f.status} />
              <div className="mt-5">
                <Heading id={`feature-${i}`} eyebrow={`Feature ${i + 1} of ${FEATURES.length}`} title={f.title} soft={f.soft} body={f.body} />
              </div>
              <ul className="mt-7 space-y-2.5">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15.5px] text-ink-soft">
                    <Check size={18} className="mt-0.5 shrink-0 text-brass-deep" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={0.08} className={i % 2 ? "lg:order-1" : undefined}>
              <Browser screen={f.screen} />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="overflow-hidden bg-charcoal-950 py-24 text-cream md:py-32" aria-labelledby="phone-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Heading
            id="phone-h"
            dark
            center
            eyebrow="On your phone"
            title="Made for the middle of service."
            body="The same screens work on a phone, so whoever is on shift can make the change."
          />
          <div className="mx-auto mt-16 grid max-w-[900px] grid-cols-3 items-end gap-3 sm:gap-8">
            <Phone screens={["cloudMenuReplace"]} sizes="(min-width: 640px) 280px, 30vw" />
            <Phone screens={["cloudSpaTemporary"]} className="-translate-y-8" sizes="(min-width: 640px) 280px, 30vw" />
            <Phone screens={["cloudSpacesPhone"]} sizes="(min-width: 640px) 280px, 30vw" />
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32" aria-labelledby="guest-h">
        <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <Heading
            id="guest-h"
            eyebrow="What guests get"
            title="No app. No account."
            soft="Just the information."
            body="Guests scan the Code with their camera and your PDF opens full screen, easy to read and quick to load. If you use a website instead, they are taken straight to it. A guest who already has the page open sees an update when they refresh."
          />
          <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
            <Phone screens={["guestMenuAfter"]} tone="light" sizes="200px" />
            <Phone screens={["guestDirectoryAfter"]} tone="light" className="-translate-y-6" sizes="200px" />
            <Phone screens={["guestSpaOffer"]} tone="light" sizes="200px" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal-950 py-24 text-cream md:py-32" aria-labelledby="soon-h">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brass/20 blur-[140px]" aria-hidden />
        <div className="relative mx-auto max-w-8xl px-6 text-center md:px-10">
          <ComingSoonBadge className="mb-6" />
          <h2 id="soon-h" className="mx-auto max-w-[18ch] text-balance font-serif-display text-[clamp(36px,5vw,64px)] leading-[1.02] text-white">
            Be among the first to use Informax Cloud.
          </h2>
          <p className="mx-auto mt-6 max-w-[40rem] text-[18px] leading-relaxed text-white/72">
            Informax Cloud is not publicly available yet. Talk to us about your hotel or restaurant, and we will show you where it
            is heading.
          </p>
          <ul className="mx-auto mt-8 max-w-[40rem] space-y-1 text-[14.5px] text-cream-mute">
            <li>Content is a PDF or a web page: menus are updated by replacing the file.</li>
            <li>Informax shows your information and offers. It does not take bookings or payments, or check availability.</li>
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary">{DEMO_CTA.label}</Link>
            <Link href="/enquire?interest=informax-cloud" className="ix-btn ix-btn-secondary-dark">Ask about Informax Cloud</Link>
          </div>
          <p className="mx-auto mt-10 max-w-[40rem] text-[14px] text-cream-mute">
            Already an Informax customer? Your current account keeps working as it does today.{" "}
            <a href={CLOUD_LOGIN_URL} className="whitespace-nowrap font-semibold text-cream underline-offset-4 hover:text-white hover:underline">Customer log in</a>
          </p>
        </div>
      </section>
    </>
  );
}
