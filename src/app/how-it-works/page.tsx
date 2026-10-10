import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import CloudCta from "@/components/cloud/CloudCta";
import SameCodeDemo from "@/components/real/SameCodeDemo";
import { AppShot } from "@/components/real/Shots";
import Flow from "@/components/real/Flow";
import { ANALYTICS_FAQ_ANSWER } from "@/lib/analytics-status";

export const metadata: Metadata = {
  title: "How Informax Works: print once, update anytime",
  description:
    "Organise your business into Spaces, place a QR code in each one, and choose what it shows in Informax Cloud. Change it whenever you like. The printed code never changes.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  { n: "1", t: "Organise into Spaces", b: "Rooms, tables, the spa, the terrace. Spaces mirror the real places in your business." },
  { n: "2", t: "Place the codes", b: "Print your own QR codes or use framed cards from Informax. Put them where people need them." },
  { n: "3", t: "Choose what each Space shows", b: "A PDF or a website. Add temporary content with an end time when you need it." },
  { n: "4", t: "Change it anytime", b: "Update in Informax Cloud. The next scan shows the new content. Nothing is reprinted." },
];

const FAQ = [
  { q: "What happens when temporary content ends?", a: "Every piece of temporary content has an end time. When it passes, the Space returns to its usual content automatically." },
  { q: "Do guests need to download anything?", a: "No. They open their phone camera and scan. There is no app and no account." },
  { q: "Do we need special hardware?", a: "No. Any printed QR code works. You can print your own, or ask Informax about framed A5 cards." },
  { q: "Do we need to reprint when information changes?", a: "No. The QR code stays in place. Change what its Space shows in Informax Cloud and the next scan opens the update." },
  { q: "Can one Space have several QR codes?", a: "Yes. Every code assigned to a Space shows what that Space shows, now and in future." },
  { q: "Can we use a page from our own website?", a: "Yes. A Space can show a PDF or a website, and you can switch between them whenever you like." },
  { q: "Can we go back to something we published earlier?", a: "Yes. Previous versions are kept. Preview one or restore it, and the printed code is untouched." },
  { q: "Can we see how often a code is scanned?", a: ANALYTICS_FAQ_ANSWER },
  { q: "Who can make changes?", a: "Your team, from a phone, a tablet or a desktop. Each person has their own account and a role that decides what they can do." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        image="/images/earth-horizon.jpg"
        title={<>Print once.<br /><span className="text-cream-mute">Update anytime.</span></>}
        lede="The QR code stays where it is. What it shows is managed in Informax Cloud, one Space at a time."
        primary={{ label: "Enquire", href: "/enquire" }}
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
      />

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>Four steps</Kicker>
            <Display>
              Simple to set up. <Soft>Simple to keep current.</Soft>
            </Display>
          </Reveal>
        </Head>
        <Reveal><Flow className="mb-14" /></Reveal>
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div>
                <span className="text-[14px] font-semibold text-brass-deep">Step {s.n}</span>
                <h3 className="mt-2 text-xl font-semibold text-ink">{s.t}</h3>
                <p className="mt-3 max-w-[30ch] leading-relaxed text-ink-mute">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>An example</Kicker>
            <Display dark>
              One QR code in Room 324. <Soft dark>Different information.</Soft>
            </Display>
          </Reveal>
        </Head>
        <SameCodeDemo variant="room" />
      </Section>

      <Section tone="alt">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal blur>
            <Kicker>In Informax Cloud</Kicker>
            <Display>
              Choose. Change. <Soft>Publish.</Soft>
            </Display>
            <Lede className="mt-8">
              Open a Space, replace its content, use a website, or publish something temporary. Every code in that Space shows the update.
            </Lede>
          </Reveal>
          <Reveal delay={0.1}>
            <AppShot name="hotel-room-324" alt="A Space in Informax Cloud with Replace content, Use a website and Publish temporary content" crop={0.72} />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal blur>
            <Kicker>Questions</Kicker>
            <Display>
              Good <Soft>questions.</Soft>
            </Display>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus size={18} className="shrink-0 text-ink-mute transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-[56ch] pb-7 text-[15.5px] leading-relaxed text-ink-mute">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <CloudCta lead="Bring your QR codes" line="to life." secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }} />
    </>
  );
}
