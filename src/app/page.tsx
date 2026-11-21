import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import HeroStage from "@/components/x/HeroStage";
import Placements from "@/components/x/Placements";
import Everywhere from "@/components/x/Everywhere";
import Journey from "@/components/x/Journey";
import ContentTypes from "@/components/x/ContentTypes";
import Steps from "@/components/x/Steps";
import ScanPoint from "@/components/x/ScanPoint";
import { Container, DemoBand, Heading, MoreLink, PrimaryActions, ScreenNote, Section } from "@/components/x/ui";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Informax | Digital experiences, Done Right." },
  description:
    "Hotels, restaurants and venues deliver menus and guest information through Informax Scan Points. One Scan Point. Unlimited placements. Instant updates.",
  alternates: { canonical: "/" },
};

const WHY = [
  { k: "What it is", v: "Scan Points on tables, in rooms and at the desk. Guests scan one with their phone and see what you published in Informax Cloud." },
  { k: "Who it is for", v: "Hotels, restaurants, spas, galleries, exhibitions and event venues." },
  { k: "Why it matters", v: "Guests always see current information, and your team changes it in moments without reprinting a thing." },
];

const COMPARE = [
  { k: "A dish sells out", before: "Staff explain it table by table", after: "The menu is updated before the next order" },
  { k: "Dinner hours change", before: "Reprint the directory for every room", after: "Publish once, every room follows" },
  { k: "A spa offer for this afternoon", before: "A card at reception, if anyone sees it", after: "On every Scan Point until 18:00, then gone" },
  { k: "A session moves room", before: "Handwritten signs and announcements", after: "The programme shows the new room on the next scan" },
  { k: "Something goes wrong", before: "Find and recall the printed copies", after: "Restore the previous version in a tap" },
];

const SOLUTIONS = [
  { href: "/hospitality", title: "Hospitality", body: "Hotels, resorts and spas: the directory, spa, dining and stay information in every room.", tone: "bg-[#efe9df]", place: "Your stay", finish: "stone" },
  { href: "/restaurants", title: "Restaurants", body: "Menus on every table that change with the kitchen, from lunch to the last sitting.", tone: "bg-[#e8ecef]", place: "Table 12", finish: "ivory" },
  { href: "/solutions#galleries", title: "Galleries and exhibitions", body: "Works lists and wall texts for every room, current for every show.", tone: "bg-[#f1f0ed]", place: "Room 3", finish: "ivory" },
  { href: "/solutions#events", title: "Events and venues", body: "Programmes, rooms and timings that keep up with the day.", tone: "bg-[#e6e8ee]", place: "Programme", finish: "graphite" },
] as const;

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hero-h" className="relative overflow-hidden bg-paper pb-20 pt-[104px] md:pb-28 md:pt-[128px]">
        <Container wide>
          <div className="mx-auto max-w-[1100px] text-center">
            <p className="ix-hero-rise inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-medium text-ink-soft shadow-[0_0_0_1px_rgba(11,21,36,0.07)]" style={{ ["--rise-delay" as string]: "0s" }}>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass" />
              Informax Cloud for hospitality and venues
            </p>
            <h1
              id="hero-h"
              className="ix-hero-rise x-display mt-7 text-[clamp(50px,7.6vw,116px)] text-ink"
              style={{ ["--rise-delay" as string]: "0.08s", ["--rise-y" as string]: "26px" }}
            >
              Digital <span className="whitespace-nowrap">experiences,</span>
              <br className="hidden sm:block" /> <span className="text-brass-deep">Done Right.</span>
            </h1>
            <p
              className="ix-hero-rise mx-auto mt-7 max-w-[36rem] text-pretty text-[19px] leading-[1.55] text-ink-soft md:text-[21px]"
              style={{ ["--rise-delay" as string]: "0.2s" }}
            >
              Transform how guests access menus, directories and information. Update everything from one place, without reprinting a thing.
            </p>
            <div className="ix-hero-rise mt-9" style={{ ["--rise-delay" as string]: "0.3s" }}>
              <PrimaryActions center />
            </div>
          </div>
          <div className="ix-hero-rise mt-12 md:mt-14" style={{ ["--rise-delay" as string]: "0.45s", ["--rise-y" as string]: "40px", ["--rise-dur" as string]: "1.3s" }}>
            <HeroStage />
            <div className="mt-6 text-center">
              <ScreenNote>Real Informax Cloud and guest screens from the development build. Marlowe Grand is a fictional hotel.</ScreenNote>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. The idea, in one line */}
      <Section tone="white" labelledBy="idea-h">
        <Container>
          <Reveal className="max-w-[60rem]">
            <h2 id="idea-h" className="x-title text-balance text-[clamp(38px,6vw,84px)] text-ink">
              One Scan Point. <span className="text-ink-quiet">Unlimited placements.</span> Instant updates.
            </h2>
          </Reveal>
          <RevealStagger className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-10 md:mt-20 md:grid-cols-3 md:gap-12">
            {WHY.map((w) => (
              <RevealStaggerItem key={w.k}>
                <h3 className="text-[15px] font-semibold text-brass-deep">{w.k}</h3>
                <p className="mt-3 text-[19px] leading-[1.5] tracking-[-0.01em] text-ink">{w.v}</p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* 3. Where Scan Points live */}
      <Section tone="paper" labelledBy="places-h">
        <Container wide>
          <Heading
            id="places-h"
            center
            eyebrow="Scan Points in place"
            title="Wherever guests look,"
            soft="the right information."
            lead="A small, considered object on the table, by the bed or at the desk. Guests scan it with their phone's camera. No app, no account, no waiting."
          />
          <div className="mt-14 md:mt-16">
            <Placements />
          </div>
        </Container>
      </Section>

      {/* 4. Print once, update forever */}
      <Section tone="dark" labelledBy="everywhere-h">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading
              id="everywhere-h"
              dark
              eyebrow="Why it is different"
              title="Print once."
              soft="Update everywhere, instantly."
              lead="A Scan Point never changes once printed. Place it in 4 rooms or 400: when you publish an update, every copy shows it on the next scan. Nobody visits a room, and nothing is reprinted."
            />
            <Reveal>
              <MoreLink href="/how-it-works" dark>
                How it works
              </MoreLink>
            </Reveal>
          </div>
          <Reveal className="mt-14 md:mt-16">
            <Everywhere />
          </Reveal>
        </Container>
      </Section>

      {/* 5. Informax Cloud */}
      <Section tone="alt" labelledBy="cloud-h">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading
              id="cloud-h"
              eyebrow="Informax Cloud"
              title="The platform behind"
              soft="every Scan Point."
              lead="Four levels, the way your property already works. From the whole hotel down to the PDF a guest opens."
            />
            <Reveal>
              <MoreLink href="/informax-cloud">Explore Informax Cloud</MoreLink>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-16">
            <Journey />
          </div>
          <div className="mt-6">
            <ScreenNote />
          </div>
        </Container>
      </Section>

      {/* 6. What it delivers */}
      <Section tone="paper" labelledBy="types-h">
        <Container>
          <Heading
            id="types-h"
            eyebrow="What guests can open"
            title="Everything guests ask for,"
            soft="one scan away."
            lead="Use the PDFs you already make, or point a Scan Point at your own website. Informax can also design them for you."
          />
          <div className="mt-14 md:mt-16">
            <ContentTypes />
          </div>
        </Container>
      </Section>

      {/* 7. How it works */}
      <Section tone="white" labelledBy="steps-h">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading id="steps-h" eyebrow="How it works" title="Simple to set up." soft="Easy to keep current." />
            <Reveal>
              <MoreLink href="/how-it-works">The full walkthrough</MoreLink>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-16">
            <Steps />
          </div>
        </Container>
      </Section>

      {/* 8. Before and after */}
      <Section tone="paper" labelledBy="compare-h">
        <Container>
          <Heading id="compare-h" eyebrow="The difference" title="The moments that used to" soft="cost you an afternoon." />
          <Reveal className="mt-14 overflow-hidden rounded-[28px] bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06)] md:mt-16">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">What happens with printed materials, and what happens with Informax</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-5 text-[13px] font-semibold text-ink-mute md:px-8">When</th>
                  <th scope="col" className="hidden px-5 py-5 text-[13px] font-semibold text-ink-mute md:table-cell md:px-8">With printed materials</th>
                  <th scope="col" className="px-5 py-5 text-[13px] font-semibold text-brass-deep md:px-8">With Informax</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.k} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-6 align-top text-[16px] font-semibold text-ink md:w-[28%] md:px-8 md:text-[17px]">
                      {r.k}
                    </th>
                    <td className="hidden px-5 py-6 align-top text-[16px] text-ink-mute md:table-cell md:px-8">
                      <span className="flex items-start gap-3">
                        <Minus size={18} aria-hidden className="mt-0.5 shrink-0 text-ink-mute/60" />
                        {r.before}
                      </span>
                    </td>
                    <td className="px-5 py-6 align-top text-[16px] text-ink md:px-8">
                      <span className="flex items-start gap-3">
                        <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-moss" />
                        {r.after}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </Section>

      {/* 9. Who it is for */}
      <Section tone="paper" labelledBy="for-h" className="pt-0! md:pt-0!">
        <Container>
          <Heading id="for-h" eyebrow="Solutions" title="Made for places" soft="that care how guests are treated." />
          <RevealStagger className="mt-14 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2">
            {SOLUTIONS.map((s) => (
              <RevealStaggerItem key={s.href}>
                <Link
                  href={s.href}
                  className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:min-h-[300px] md:p-10 ${s.tone}`}
                >
                  <span className="flex items-start justify-between gap-6">
                    <span className="x-title text-[clamp(28px,3vw,40px)] text-ink">{s.title}</span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-ink transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={19} aria-hidden />
                    </span>
                  </span>
                  <span className="mt-10 max-w-[58%] text-[17px] leading-relaxed text-ink-soft">{s.body}</span>
                  <ScanPoint
                    decorative
                    place={s.place}
                    finish={s.finish}
                    className="absolute -bottom-[14%] right-[7%] w-[26%] max-w-[150px] rotate-[-4deg] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-0"
                  />
                </Link>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* 10. Built in hospitality */}
      <Section tone="white" labelledBy="origin-h">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <p className="text-[15px] font-semibold text-brass-deep">Built in hospitality</p>
              <h2 id="origin-h" className="x-title mt-5 text-balance text-[clamp(32px,4.2vw,56px)] text-ink">
                Designed by someone who has stood behind the desk.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pt-12">
              <p className="text-[18px] leading-[1.65] text-ink-soft">
                Informax was born from nearly a decade in hotel operations: front office, meetings and events, guest relations. It is built around how teams actually work during a busy shift, and around the questions guests actually ask.
              </p>
              <div className="mt-8">
                <MoreLink href="/about">About Informax</MoreLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <DemoBand />
    </>
  );
}
