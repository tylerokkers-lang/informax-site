import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PlacementScene } from "@/components/x/Placements";
import ContentTypes from "@/components/x/ContentTypes";
import { Container, DemoBand, Heading, PrimaryActions, Section } from "@/components/x/ui";
import { Reveal } from "@/components/Reveal";
import { PLACEMENTS } from "@/lib/placements";

export const metadata: Metadata = {
  title: "Solutions | Hotels, restaurants, galleries and events",
  description:
    "Informax Scan Points and Informax Cloud for hotels, spas, restaurants, galleries, exhibitions and event venues: one platform for every place guests look.",
  alternates: { canonical: "/solutions" },
};

const byKey = (k: (typeof PLACEMENTS)[number]["key"]) => PLACEMENTS.find((p) => p.key === k)!;

const SECTORS = [
  {
    id: "galleries",
    eyebrow: "Galleries and exhibitions",
    title: "A guide for every room.",
    soft: "Current for every show.",
    body: "Put a Scan Point beside the wall text or at the entrance to each room. Visitors open the works list, the artist's notes or an audio guide page. When the exhibition changes, the Scan Points stay exactly where they are.",
    points: ["Works lists and wall texts", "Late openings and talks, with an end time", "Guides in other languages, each with its own Scan Point", "No app or account for visitors"],
    scene: byKey("gallery"),
  },
  {
    id: "events",
    eyebrow: "Events and venues",
    title: "A programme that keeps up.",
    soft: "However the day changes.",
    body: "Print Scan Points on lanyards, tables and signage. When a session moves room or a speaker changes, publish the new programme and every delegate sees it on their next scan.",
    points: ["Programmes, rooms and timings", "Venue maps and Wi-Fi details", "Temporary notices for the day", "One Scan Point, printed as often as you need"],
    scene: byKey("event"),
  },
];

const PRIMARY = [
  { href: "/hospitality", title: "Hospitality", body: "Hotels, resorts and spas. The directory, spa, dining and stay information in every room.", scene: byKey("room") },
  { href: "/restaurants", title: "Restaurants", body: "A Scan Point on every table, and menus that change with the kitchen.", scene: byKey("table") },
];

export default function SolutionsPage() {
  return (
    <>
      <section aria-labelledby="sol-h" className="bg-paper pb-12 pt-[120px] md:pb-16 md:pt-[160px]">
        <Container>
          <div className="mx-auto max-w-[920px] text-center">
            <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">Solutions</p>
            <h1 id="sol-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(46px,7vw,104px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
              One platform. <span className="text-ink-quiet">Every place guests look.</span>
            </h1>
            <p className="ix-hero-rise mx-auto mt-7 max-w-[38rem] text-[19px] leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "0.18s" }}>
              The same Scan Points and the same Informax Cloud, shaped around the way each kind of venue works.
            </p>
            <div className="ix-hero-rise mt-9" style={{ ["--rise-delay" as string]: "0.28s" }}>
              <PrimaryActions center cloudFirst={false} />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper" label="Hospitality and restaurants" className="pt-8! md:pt-12!">
        <Container wide>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {PRIMARY.map((x) => (
              <Reveal key={x.href}>
                <Link href={x.href} className="group block rounded-[32px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:rounded-[40px]">
                  <PlacementScene p={x.scene} compact className="aspect-[4/3.4] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.99]" />
                  <span className="mt-6 flex items-start justify-between gap-6 px-2">
                    <span>
                      <span className="x-title block text-[clamp(28px,3vw,40px)] text-ink">{x.title}</span>
                      <span className="mt-2 block max-w-[30rem] text-[17px] leading-relaxed text-ink-mute">{x.body}</span>
                    </span>
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={19} aria-hidden />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {SECTORS.map((s, n) => (
        <Section key={s.id} id={s.id} tone={n === 0 ? "white" : "alt"} labelledBy={`${s.id}-h`}>
          <Container wide>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <Reveal className={n % 2 ? "lg:order-2" : ""}>
                <PlacementScene p={s.scene} compact className="aspect-[4/3.6]" />
              </Reveal>
              <div className={n % 2 ? "lg:order-1" : ""}>
                <Heading id={`${s.id}-h`} eyebrow={s.eyebrow} title={s.title} soft={s.soft} size="md" lead={s.body} />
                <ul className="mt-8 space-y-3 border-t border-line pt-7">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[16px] text-ink">
                      <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-brass-deep" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13px] text-ink-mute">Guest pages shown are Informax sample designs for fictional venues.</p>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="paper" labelledBy="sol-types-h">
        <Container>
          <Heading id="sol-types-h" eyebrow="Wherever you use it" title="What a Scan Point can open." />
          <div className="mt-14 md:mt-16">
            <ContentTypes />
          </div>
        </Container>
      </Section>

      <DemoBand title="Tell us about your venue." lead="We will show you Informax Cloud and the guest experience, shaped around the spaces you run and the information your guests ask for." />
    </>
  );
}
