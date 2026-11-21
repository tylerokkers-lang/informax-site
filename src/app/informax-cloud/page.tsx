import type { Metadata } from "next";
import Image from "next/image";
import { Check, Clock3, FileStack, Globe, History, ImageIcon, LayoutGrid, MonitorSmartphone, QrCode, ScrollText, Users } from "lucide-react";
import Journey from "@/components/x/Journey";
import { BrowserFrame, PhoneFrame } from "@/components/x/Devices";
import { ButtonLink, Container, DemoBand, Faq, Heading, ScreenNote, Section } from "@/components/x/ui";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { CLOUD_LOGIN_URL, DEMO_CTA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Informax Cloud | The platform behind every Scan Point",
  description:
    "Organise your property into Spaces and Scan Points. Publish a PDF or website, schedule temporary content, restore earlier versions and keep every Scan Point current.",
  alternates: { canonical: "/informax-cloud" },
};

const FEATURES = [
  { icon: FileStack, title: "PDF or website", body: "Publish the PDFs you already make, or send a Scan Point to a page of your own website." },
  { icon: QrCode, title: "Print once", body: "A printed Scan Point never needs replacing. Place as many copies as you like." },
  { icon: Clock3, title: "Temporary content", body: "Set an end time. When it passes, the usual content returns by itself." },
  { icon: ScrollText, title: "Schedules", body: "Prepare content for the parts of the day, or the season, that change." },
  { icon: History, title: "Version history", body: "The current PDF and the two before it, each restorable." },
  { icon: Users, title: "Your team", body: "A main administrator and a personal sign-in for each colleague." },
  { icon: LayoutGrid, title: "Spaces", body: "Organised like your property, in your team's own words." },
  { icon: ImageIcon, title: "Your brand", body: "Your logo on the loading screen guests see first." },
  { icon: MonitorSmartphone, title: "Computer or phone", body: "Make a change from the office, or from the pass between services." },
  { icon: Globe, title: "Nothing for guests to install", body: "The phone's camera opens your content in the browser." },
];

const QUESTIONS = [
  { q: "Is Informax Cloud available today?", a: "The new Informax Cloud shown on this site is in development, and the screens are from its development build. Self-service setup and billing are being prepared for launch. Existing customers keep using their current account as they do today. Request a demo and we will show you the workflow and what it means for your property." },
  { q: "What can a Scan Point open?", a: "A PDF, such as your menu or guest directory, or a page on your own website. You can switch between the two whenever you like." },
  { q: "How quickly do changes appear?", a: "As soon as Cloud confirms it is live, anyone who scans gets the new version. A guest who already has the page open sees it when they refresh." },
  { q: "Can I edit a single dish inside Cloud?", a: "Not today. You upload the updated PDF, made the way you already make it, or link your website. If you would like us to design your menus and directories, that is a separate service." },
  { q: "Who can make changes?", a: "The main administrator looks after the account and invites colleagues. Each person signs in with their own details." },
];

export default function CloudPage() {
  return (
    <>
      {/* Hero: the product on a dark stage. */}
      <section aria-labelledby="cloud-hero-h" className="bg-paper px-3 pt-[76px] md:px-4 md:pt-[84px]">
       <div className="relative overflow-hidden rounded-[32px] bg-charcoal-950 pb-20 pt-16 text-cream md:rounded-[44px] md:pb-28 md:pt-24">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[30%] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-brass/20 blur-[160px]" />
        <Container wide className="relative">
          <div className="mx-auto max-w-[900px] text-center">
            <Image src="/brand/informax-cloud-logo-800.webp" alt="" width={200} height={53} priority className="ix-hero-rise mx-auto h-auto w-[170px] md:w-[200px]" />
            <h1 id="cloud-hero-h" className="ix-hero-rise x-display mt-10 text-balance text-[clamp(46px,7.2vw,104px)] text-white" style={{ ["--rise-delay" as string]: "0.08s" }}>
              Every Scan Point. <span className="text-cream-mute">One calm place.</span>
            </h1>
            <p className="ix-hero-rise mx-auto mt-7 max-w-[38rem] text-pretty text-[19px] leading-relaxed text-white/72 md:text-[20px]" style={{ ["--rise-delay" as string]: "0.18s" }}>
              Informax Cloud is where your team keeps every menu, directory and guest page current, across every room, table and desk, from a computer or a phone.
            </p>
            <div className="ix-hero-rise mt-10 flex flex-wrap justify-center gap-3" style={{ ["--rise-delay" as string]: "0.28s" }}>
              <ButtonLink href={DEMO_CTA.href} arrow>
                {DEMO_CTA.label}
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary-dark">
                See pricing
              </ButtonLink>
            </div>
          </div>
          <div className="ix-hero-rise relative mx-auto mt-16 max-w-[1120px] md:mt-20" style={{ ["--rise-delay" as string]: "0.4s", ["--rise-y" as string]: "40px" }}>
            <BrowserFrame screens={["deskHotelOverview"]} priority className="w-[88%] md:w-[84%]" sizes="(min-width: 1180px) 940px, 88vw" />
            <div className="absolute -bottom-[6%] right-0 w-[26%] md:w-[19%]">
              <PhoneFrame screens={["cloudHotelOverviewPhone"]} sizes="(min-width: 1024px) 220px, 26vw" />
            </div>
          </div>
          <div className="mt-16 text-center">
            <ScreenNote dark />
          </div>
        </Container>
       </div>
      </section>

      {/* The model */}
      <Section tone="alt" labelledBy="levels-h">
        <Container>
          <Heading
            id="levels-h"
            eyebrow="How Cloud is organised"
            title="Property, Space, Scan Point, Content."
            soft="Nothing else to learn."
            lead="Four levels that match how your property already runs. Your team always knows where to go, and guests always get the current version."
          />
          <div className="mt-14 md:mt-16">
            <Journey />
          </div>
        </Container>
      </Section>

      {/* Replace from a phone */}
      <Section tone="paper" labelledBy="replace-h">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Heading
              id="replace-h"
              eyebrow="Instant updates"
              title="Open. Replace. Published."
              soft="Before the next table sits down."
              lead={
                <>
                  <p>Cloud shows exactly what guests see right now, with the actions to change it directly underneath. Choose the new PDF, check it, publish. Every printed copy of that Scan Point follows at once.</p>
                  <p className="mt-4">No one walks the floor swapping cards. No one enters a guest room.</p>
                </>
              }
            />
            <RevealStagger className="grid grid-cols-3 items-end gap-3 sm:gap-5">
              {(["cloudMenuBefore", "cloudMenuReplace", "cloudMenuPublished"] as const).map((k, n) => (
                <RevealStaggerItem key={k} className={n === 1 ? "-translate-y-8" : ""}>
                  <PhoneFrame screens={[k]} tone="light" sizes="(min-width: 1024px) 200px, 30vw" />
                  <p className="mt-4 text-center text-[13px] font-semibold text-ink-mute">{["What guests see", "Choose the new PDF", "Live everywhere"][n]}</p>
                </RevealStaggerItem>
              ))}
            </RevealStagger>
          </div>
        </Container>
      </Section>

      {/* Temporary content */}
      <Section tone="dark" labelledBy="temp-h">
        <Container>
          <Heading
            id="temp-h"
            dark
            eyebrow="Temporary and scheduled content"
            title="A spa offer until 18:00."
            soft="Then back to normal, by itself."
            lead="Publish something for a set time: tonight's menu, an afternoon offer, a session that has moved. When it ends, Cloud returns the Scan Point to its usual content. Nobody has to remember."
          />
          <div className="mt-14 grid grid-cols-1 items-end gap-6 md:mt-16 lg:grid-cols-[1.5fr_0.5fr] lg:gap-8">
            <Reveal>
              <BrowserFrame screens={["deskSpaTemporary"]} sizes="(min-width: 1180px) 860px, 94vw" />
            </Reveal>
            <Reveal delay={0.1} className="mx-auto w-[58%] max-w-[260px] lg:w-full">
              <PhoneFrame screens={["guestSpaOffer"]} sizes="(min-width: 1024px) 260px, 58vw" />
              <p className="mt-4 text-center text-[13px] font-semibold text-cream-mute">What guests see until 18:00</p>
            </Reveal>
          </div>
          <div className="mt-6">
            <ScreenNote dark />
          </div>
        </Container>
      </Section>

      {/* Version history */}
      <Section tone="white" labelledBy="history-h">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <BrowserFrame screens={["deskMenuPublished"]} sizes="(min-width: 1180px) 700px, 94vw" />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Heading
                id="history-h"
                eyebrow="Version history"
                title="Change your mind?"
                soft="Restore in a tap."
                lead="Every Scan Point keeps the current PDF and the two versions before it. Restore either one, or show it temporarily. And every change records who made it and when."
                size="md"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Everything included */}
      <Section tone="alt" labelledBy="features-h">
        <Container>
          <Heading id="features-h" eyebrow="What is included" title="Everything a busy team needs." soft="Nothing it does not." />
          <RevealStagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] bg-line sm:grid-cols-2 lg:grid-cols-5 md:mt-16">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <RevealStaggerItem key={title} className="bg-white p-6 md:p-7">
                <Icon size={21} aria-hidden className="text-brass-deep" />
                <h3 className="mt-6 text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-mute">{body}</p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* What is available today, and what arrives with launch. */}
      <Section tone="white" labelledBy="status-h">
        <Container>
          <Heading
            id="status-h"
            eyebrow="Where things stand"
            title="Available today,"
            soft="and arriving at launch."
            lead="We would rather be precise than impressive. Here is what customers use now, and what the new Informax Cloud on this page adds."
            size="md"
          />
          <div className="mt-12 grid grid-cols-1 gap-x-16 md:grid-cols-2">
            {[
              {
                h: "Available today",
                dot: "bg-moss",
                items: [
                  "Scan Points that open a PDF or a page of your website",
                  "Temporary content with an end time",
                  "Version history, with earlier versions to restore",
                  "Personal sign-ins and a record of every change",
                  "Optional design of menus, directories and brochures",
                ],
              },
              {
                h: "Arriving with the new Informax Cloud",
                dot: "bg-brass",
                items: [
                  "The Property, Space and Scan Point workspace shown on this page",
                  "The phone-first workflow for replacing a menu between services",
                  "Online signup and subscription billing",
                  "Self-service setup and inviting your own team",
                ],
              },
            ].map((col) => (
              <Reveal key={col.h}>
                <h3 className="flex items-center gap-2.5 border-b border-line pb-4 text-[17px] font-semibold text-ink">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${col.dot}`} />
                  {col.h}
                </h3>
                <ul>
                  {col.items.map((t) => (
                    <li key={t} className="border-b border-line py-4 text-[16.5px] text-ink-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Existing customers */}
      <Section tone="paper" labelledBy="existing-h" tight>
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-white p-8 shadow-[0_0_0_1px_rgba(11,21,36,0.06)] md:flex-row md:items-center md:p-10">
            <div>
              <h2 id="existing-h" className="text-[20px] font-semibold tracking-[-0.015em] text-ink">Already an Informax customer?</h2>
              <p className="mt-2 max-w-[44rem] text-[16px] leading-relaxed text-ink-mute">
                Your current account keeps working as it does today. Sign in as usual.
              </p>
            </div>
            <a href={CLOUD_LOGIN_URL} className="ix-btn ix-btn-secondary shrink-0">
              <Check size={17} aria-hidden /> Customer log in
            </a>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="cloud-faq-h" className="pt-0! md:pt-0!">
        <Container>
          <Faq id="cloud-faq-h" items={QUESTIONS} />
        </Container>
      </Section>

      <DemoBand title="See Informax Cloud working for your property." />
    </>
  );
}
