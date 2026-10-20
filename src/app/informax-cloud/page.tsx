import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Browser, Phone } from "@/components/site/Devices";
import { DemoCta, Heading } from "@/components/site/Sections";
import { Reveal } from "@/components/Reveal";
import { CLOUD_LOGIN_URL, DEMO_CTA, SITE_URL } from "@/lib/constants";
import type { ScreenKey } from "@/lib/screens";

export const metadata: Metadata = {
  title: "Informax Cloud: one place for everything your guests see",
  description:
    "See the real Informax Cloud: what guests see right now at every Access Point, replace a PDF or use a website, temporary content that ends by itself, version history and updates to many Access Points at once.",
  alternates: { canonical: "/informax-cloud" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Informax Cloud",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "One place for restaurants and hotels to manage the information guests open from permanent Codes: menus, guest directories and offers.",
  url: `${SITE_URL}/informax-cloud`,
  publisher: { "@type": "Organization", name: "Informax", url: SITE_URL },
};

const FEATURES: { eyebrow: string; title: string; soft: string; body: string; screen: ScreenKey; points: string[] }[] = [
  {
    eyebrow: "At a glance",
    title: "What a guest sees.",
    soft: "Right now.",
    body: "Every Access Point opens on one clear answer: what a guest will see if they scan its Code at this moment, whether it is your usual content or something temporary, and who set it.",
    screen: "deskMenuBefore",
    points: ["Default or temporary, clearly marked", "Open it exactly as a guest would", "Applies to every copy of the Code"],
  },
  {
    eyebrow: "Change it",
    title: "Replace a PDF,",
    soft: "or use your website.",
    body: "Choose Replace, pick the new file and publish. Prefer your own web page? Point the Code at it instead, and switch back whenever you like.",
    screen: "deskMenuReplace",
    points: ["PDFs up to 20 MB, stored privately", "Or any secure web address", "Works from a computer or a phone"],
  },
  {
    eyebrow: "Temporary content",
    title: "Set it to end,",
    soft: "and it does.",
    body: "Publish something for a while: a menu for tonight, a spa offer until 18:00, information for a weekend event. When the time is up, the usual content comes back on its own.",
    screen: "deskSpaCompose",
    points: ["Quick choices, or an exact end time", "Start later if you need to", "End it early with one tap"],
  },
  {
    eyebrow: "Nothing is lost",
    title: "Every version,",
    soft: "kept for good.",
    body: "Each change creates a new version. Earlier versions are never edited or deleted, and any of them can be restored or shown again temporarily.",
    screen: "deskMenuPublished",
    points: ["A full history for every Access Point", "Restore in one step", "Who changed what, and when"],
  },
  {
    eyebrow: "At scale",
    title: "Update many",
    soft: "at once.",
    body: "Choose a type of Access Point, such as every Bathroom, check the list, and publish one PDF or website to all of them. You can undo it afterwards.",
    screen: "deskBulk",
    points: ["By type or by area", "Check the list before publishing", "Undo a whole update"],
  },
];

const INCLUDED = [
  "Your Access Points, organised by area",
  "PDF or website for every Access Point",
  "Temporary content with an end time",
  "Version history and restore",
  "Update many Access Points at once",
  "Team sign-ins with the right access",
  "Activity in plain language",
  "Works on phones, tablets and computers",
];

export default function InformaxCloudPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#16304f_0%,#0b1524_45%,#060a12_100%)] pb-10 pt-[130px] text-cream md:pt-[160px]">
        <div className="mx-auto max-w-8xl px-6 text-center md:px-10">
          <div className="ix-hero-rise">
            <p className="mb-5 text-[15px] font-semibold text-brass-light">Informax Cloud</p>
            <h1 className="mx-auto max-w-[16ch] text-balance font-serif-display text-[clamp(44px,6.4vw,88px)] leading-[0.98] text-white">
              One place for everything <span className="text-cream-mute">your guests see.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[40rem] text-[18px] leading-relaxed text-white/75">
              Menus, guest directories, spa treatments and offers. Manage them all from a computer or your phone, and every Code
              shows the latest version.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary">{DEMO_CTA.label}</Link>
              <a href={CLOUD_LOGIN_URL} className="ix-btn ix-btn-secondary-dark">Log in</a>
            </div>
          </div>
          <div className="relative mx-auto mt-16 max-w-[1080px]">
            <Browser screen="deskHotelOverview" priority className="w-full sm:w-[88%]" />
            <div className="absolute -bottom-6 right-0 w-[26%] max-w-[250px] sm:-bottom-10">
              <Phone screens={["cloudHotelOverviewPhone"]} sizes="(min-width: 640px) 250px, 26vw" />
            </div>
          </div>
          <p className="mt-14 text-[13px] text-cream-mute">Real Informax Cloud screens. The hotel and restaurant shown are fictional.</p>
        </div>
      </header>

      {FEATURES.map((f, i) => (
        <section key={f.title} className={`py-20 md:py-28 ${i % 2 ? "bg-paper-alt" : "bg-paper"}`}>
          <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className={i % 2 ? "lg:order-2" : undefined}>
              <Heading eyebrow={f.eyebrow} title={f.title} soft={f.soft} body={f.body} />
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
          <div>
            <Heading id="phone-h"
              dark
              center
              eyebrow="On your phone"
              title="Made for the middle of service."
              body="Everything works on a phone, with the same screens, so whoever is on shift can make the change."
            />
          </div>
          <div className="mx-auto mt-16 grid max-w-[900px] grid-cols-3 items-end gap-3 sm:gap-8">
            <Phone screens={["cloudMenuReplace"]} sizes="(min-width: 640px) 280px, 30vw" />
            <Phone screens={["cloudSpaTemporary"]} className="-translate-y-8" sizes="(min-width: 640px) 280px, 30vw" />
            <Phone screens={["cloudHotelOverviewPhone"]} sizes="(min-width: 640px) 280px, 30vw" />
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32" aria-labelledby="guest-h">
        <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <div>
            <Heading id="guest-h"
              eyebrow="What guests get"
              title="No app. No account."
              soft="Just the information."
              body="Guests scan the Code with their camera and your PDF opens full screen, easy to read and quick to load. If you use a website instead, they are taken straight to it."
            />
          </div>
          <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
            <Phone screens={["guestMenuAfter"]} tone="light" sizes="200px" />
            <Phone screens={["guestDirectoryAfter"]} tone="light" className="-translate-y-6" sizes="200px" />
            <Phone screens={["guestSpaOffer"]} tone="light" sizes="200px" />
          </div>
        </div>
      </section>

      <section className="bg-paper-alt py-24 md:py-28" aria-labelledby="included-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div>
            <Heading id="included-h" eyebrow="Included" title="Everything you need." soft="Nothing you don't." />
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-3 rounded-2xl bg-white px-5 py-5 text-[15.5px] font-medium text-ink shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
                <Check size={18} className="mt-0.5 shrink-0 text-brass-deep" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[52rem] text-[14.5px] leading-relaxed text-ink-mute">
            Good to know: content is a PDF or a web page, so menus are updated by replacing the file. A guest who already has a page
            open sees the change when they refresh. Informax shows your offers; it does not take bookings or payments.
          </p>
        </div>
      </section>

      <DemoCta title="See it with your own content." />
    </>
  );
}
