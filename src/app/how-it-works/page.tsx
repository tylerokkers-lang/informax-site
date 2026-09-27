import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import HowSteps from "@/components/cloud/HowSteps";
import TouchPointStays from "@/components/cloud/TouchPointStays";
import { ChangeContentFilm, PermanentUrlFilm } from "@/components/product/MicroFilms";
import CloudCta from "@/components/cloud/CloudCta";

export const metadata: Metadata = {
  title: "How Informax Works: Spaces, Touch Points and Informax Cloud",
  description:
    "Create a Space, connect Touch Points around your hotel and change what guests see any time from Informax Cloud. The physical Touch Point stays exactly where it is.",
  alternates: { canonical: "/how-it-works" },
};

const FAQ = [
  {
    q: "Do guests need to download anything?",
    a: "No. A guest touches or scans a Touch Point and the Space opens straight away on their phone.",
  },
  {
    q: "What happens to the Touch Points when we change our content?",
    a: "Nothing. Touch Points connect to a Space, and the Space owns the content. You change the Space in Informax Cloud and every connected Touch Point follows.",
  },
  {
    q: "Can one Space have many Touch Points?",
    a: "Yes. A Guest Directory Space can be connected to every bedroom. The hotel looks after one piece of content, and every room shows it.",
  },
  {
    q: "Can we use a page from our existing website?",
    a: "Yes. A Space can serve a PDF or a website, and you can switch between them whenever you like.",
  },
  {
    q: "Can we go back to something we published earlier?",
    a: "Yes. Informax Cloud keeps your version history, so an earlier version can be restored without changing the Space address or any Touch Point.",
  },
  {
    q: "Where can our team make changes?",
    a: "From a phone, a tablet or a desktop, wherever your team happens to be.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        image="/images/earth-horizon.jpg"
        title={<>Installed once.<br /><span className="text-cream-mute">Changed whenever.</span></>}
        lede="Create a Space, connect Touch Points and update what guests see from Informax Cloud. The physical Touch Point stays in place."
        primary={{ label: "Talk to Informax", href: "/enquire" }}
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
      />

      <Section tone="dark" className="!pt-0">
        <HowSteps dark />
      </Section>

      <Section tone="dark" divider>
        <Head>
          <Reveal blur>
            <Kicker dark>An example</Kicker>
            <Display dark>
              One Touch Point in the Spa. <Soft dark>Three different months.</Soft>
            </Display>
          </Reveal>
        </Head>
        <TouchPointStays />
      </Section>

      <Section tone="alt">
        <Head>
          <Reveal blur>
            <Kicker>In Informax Cloud</Kicker>
            <Display>
              Choose. Change. <Soft>Publish.</Soft>
            </Display>
            <Lede className="mt-8">
              Pick a Space, change what it serves and publish. It takes
              seconds, and no one has to walk the property.
            </Lede>
          </Reveal>
        </Head>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ChangeContentFilm />
          <PermanentUrlFilm />
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

      <CloudCta />
    </>
  );
}
