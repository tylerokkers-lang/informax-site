import type { Metadata } from "next";
import Steps from "@/components/x/Steps";
import Everywhere from "@/components/x/Everywhere";
import { PhoneFrame } from "@/components/x/Devices";
import { Container, DemoBand, Faq, Heading, PrimaryActions, ScreenNote, Section } from "@/components/x/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Map your property, place your Scan Points, publish your content, and guests scan with their camera. Every printed copy follows each update. No app, no reprinting.",
  alternates: { canonical: "/how-it-works" },
};

const QUESTIONS = [
  { q: "Do guests need an app or an account?", a: "No. Guests scan the Scan Point with their phone's camera and the information opens in their browser." },
  { q: "What can a Scan Point open?", a: "A PDF, such as your menu or guest directory, or a page on your own website. You can switch between the two whenever you like." },
  { q: "Do I need to reprint anything when the content changes?", a: "No. A printed Scan Point never needs to change. You change what it opens in Informax Cloud, and every copy of that Scan Point shows the new content." },
  { q: "How quickly do changes appear?", a: "As soon as Informax Cloud confirms it is live, anyone who scans gets the new version. A guest who already has the page open sees it when they refresh." },
  { q: "Can I show something for a limited time?", a: "Yes. Publish temporary content with an end time, such as a menu for tonight or a spa offer until 18:00. When it ends, the usual content comes back by itself." },
  { q: "Can I go back to an earlier version?", a: "Yes. Each Scan Point keeps the current PDF and its two previous versions. You can restore either previous version." },
  { q: "Can I edit a single dish inside Informax Cloud?", a: "Not today. You upload the updated menu as a PDF, made the way you already make it, or point the Scan Point at your own website." },
  { q: "Who on my team can make changes?", a: "The main administrator invites colleagues, and each person signs in with their own details. Changes are recorded, so you can always see who changed what." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section aria-labelledby="how-h" className="bg-paper pb-8 pt-[120px] md:pt-[160px]">
        <Container>
          <div className="max-w-[900px]">
            <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">How it works</p>
            <h1 id="how-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(46px,7vw,104px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
              Four steps. <span className="text-ink-quiet">No technical knowledge.</span>
            </h1>
            <p className="ix-hero-rise mt-7 max-w-[38rem] text-[19px] leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "0.18s" }}>
              Informax puts a permanent Scan Point wherever guests need information. You decide what it opens, and you can change that whenever you like.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="paper" label="The four steps" className="pt-10! md:pt-14!">
        <Container>
          <Steps level="h2" />
        </Container>
      </Section>

      <Section tone="dark" labelledBy="copies-h">
        <Container>
          <Heading
            id="copies-h"
            dark
            eyebrow="The idea that makes it work"
            title="One Scan Point."
            soft="As many copies as you need."
            lead="A Scan Point serves one purpose, such as the bedside directory or the dinner menu. Print it for every room or every table. Every copy opens whatever you publish, the moment you publish it."
          />
          <Reveal className="mt-14 md:mt-16">
            <Everywhere />
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="both-h">
        <Container>
          <h2 id="both-h" className="sr-only">For your guests and for your team</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal className="overflow-hidden rounded-[32px] bg-charcoal-950 p-8 text-cream sm:p-10">
              <p className="text-[14px] font-semibold text-brass-light">For your guests</p>
              <h3 className="x-title mt-4 text-[clamp(28px,3vw,40px)] text-white">Scan. Read. That is all.</h3>
              <p className="mt-4 max-w-[28rem] text-[17px] leading-relaxed text-white/72">No app, no account, no waiting. The current menu or directory opens full screen, easy to read on any phone.</p>
              <div className="mt-10 flex justify-center gap-4">
                <PhoneFrame screens={["guestMenuAfter"]} className="w-[44%] max-w-[210px]" sizes="210px" />
                <PhoneFrame screens={["guestSpa"]} className="mt-12 w-[44%] max-w-[210px]" sizes="210px" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="overflow-hidden rounded-[32px] bg-white p-8 shadow-[0_0_0_1px_rgba(11,21,36,0.06)] sm:p-10">
              <p className="text-[14px] font-semibold text-brass-deep">For your team</p>
              <h3 className="x-title mt-4 text-[clamp(28px,3vw,40px)] text-ink">Open. Replace. Done.</h3>
              <p className="mt-4 max-w-[28rem] text-[17px] leading-relaxed text-ink-soft">Informax Cloud shows exactly what guests see right now, with the actions to change it directly underneath.</p>
              <div className="mt-10 flex justify-center gap-4">
                <PhoneFrame screens={["cloudMenuReplace"]} tone="light" className="w-[44%] max-w-[210px]" sizes="210px" />
                <PhoneFrame screens={["cloudMenuPublished"]} tone="light" className="mt-12 w-[44%] max-w-[210px]" sizes="210px" />
              </div>
            </Reveal>
          </div>
          <div className="mt-6">
            <ScreenNote />
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="how-faq-h">
        <Container>
          <Faq id="how-faq-h" items={QUESTIONS} title="The things people ask us." />
          <div className="mt-14">
            <PrimaryActions cloudFirst={false} />
          </div>
        </Container>
      </Section>

      <DemoBand />
    </>
  );
}
