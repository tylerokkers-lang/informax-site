import type { Metadata } from "next";
import { DemoCta, Heading, HowItWorksSteps } from "@/components/site/Sections";
import { Phone } from "@/components/site/Devices";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Place your Codes, manage your content in Informax Cloud, and keep everything current through the same permanent Codes. No app for guests and no reprinting.",
  alternates: { canonical: "/how-it-works" },
};

const QUESTIONS = [
  {
    q: "Do guests need an app or an account?",
    a: "No. Guests scan the Code with their phone's camera and the information opens in their browser.",
  },
  {
    q: "What can a Code open?",
    a: "A PDF, such as your menu or guest directory, or a page on your own website. You can switch between the two whenever you like.",
  },
  {
    q: "Do I need to reprint anything when the content changes?",
    a: "No. The Code is permanent. You change what it opens in Informax Cloud, and every copy of that Code shows the new content.",
  },
  {
    q: "How quickly do changes appear?",
    a: "As soon as Informax Cloud confirms it is live, anyone who scans the Code gets the new version. A guest who already has the page open sees it when they refresh.",
  },
  {
    q: "Can I show something for a limited time?",
    a: "Yes. Publish temporary content with an end time, such as a menu for tonight or a spa offer until 18:00. When it ends, the usual content comes back by itself.",
  },
  {
    q: "Can I go back to an earlier version?",
    a: "Yes. Every version is kept in the history, and you can restore any of them.",
  },
  {
    q: "Can I edit a single dish inside Informax Cloud?",
    a: "Not today. You upload the updated menu as a PDF, made the way you already make it, or point the Code at your own website.",
  },
  {
    q: "Who on my team can make changes?",
    a: "Everyone gets their own sign-in, and you decide what each person may do. Every change is recorded in plain language.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <header className="bg-paper pb-8 pt-[140px] md:pt-[170px]">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Heading
            as="h1"
            eyebrow="How it works"
            title="Three simple steps."
            soft="No technical knowledge needed."
            body="Informax puts a permanent Code wherever guests need information. You decide what it opens, and you can change that at any time."
          />
          <HowItWorksSteps level="h2" />
        </div>
      </header>

      <section className="bg-paper py-24 md:py-28" aria-labelledby="both-h">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-10">
          <h2 id="both-h" className="sr-only">For your guests and for your team</h2>
          <div className="rounded-[28px] bg-charcoal-950 p-8 text-cream sm:p-10">
            <p className="text-[15px] font-semibold text-brass-light">For your guests</p>
            <h3 className="mt-3 font-serif-display text-[30px] leading-tight text-white">Scan. Read. That&rsquo;s it.</h3>
            <p className="mt-4 max-w-[30rem] text-[16.5px] leading-relaxed text-white/75">
              No app, no account, no waiting. Your menu or directory opens full screen, easy to read on any phone.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Phone screens={["guestMenuAfter"]} className="w-[44%] max-w-[200px]" sizes="200px" />
              <Phone screens={["guestSpa"]} className="mt-10 w-[44%] max-w-[200px]" sizes="200px" />
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-8 shadow-[0_0_0_1px_rgba(11,21,36,0.06)] sm:p-10">
            <p className="text-[15px] font-semibold text-brass-deep">For your team</p>
            <h3 className="mt-3 font-serif-display text-[30px] leading-tight text-ink">Open. Replace. Done.</h3>
            <p className="mt-4 max-w-[30rem] text-[16.5px] leading-relaxed text-ink-soft">
              Informax Cloud shows exactly what guests see right now, with the actions to change it directly underneath.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Phone screens={["cloudMenuReplace"]} tone="light" className="w-[44%] max-w-[200px]" sizes="200px" />
              <Phone screens={["cloudMenuPublished"]} tone="light" className="mt-10 w-[44%] max-w-[200px]" sizes="200px" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-alt py-24 md:py-32" aria-labelledby="faq-h">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-[15px] font-semibold text-brass-deep">Questions</p>
            <h2 id="faq-h" className="font-serif-display text-[clamp(32px,4vw,50px)] leading-[1.05] text-ink">
              The things people ask us.
            </h2>
          </div>
          <div className="divide-y divide-line rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
            {QUESTIONS.map((x) => (
              <details key={x.q} className="group px-6 sm:px-8">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span className="text-[22px] font-normal text-brass-deep transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-[44rem] pb-6 text-[16px] leading-relaxed text-ink-soft">{x.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <DemoCta />
    </>
  );
}
