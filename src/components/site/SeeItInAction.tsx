"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import AccessPoint from "@/components/access/AccessPoint";
import Photo from "@/components/site/Photo";
import { Phone, type Highlight } from "@/components/site/Devices";
import { drawCodeOver, slotOr, type PhotoKey } from "@/lib/photography";
import type { ScreenKey } from "@/lib/screens";

type Visual =
  | { kind: "phone"; screen: ScreenKey; who: "Guest’s phone" | "Your phone · Informax Cloud"; highlight?: Highlight }
  | { kind: "code"; place: string; sub: string; photo: PhotoKey; note: string }
  | { kind: "scene"; label: string; photo: PhotoKey; note: string };

type Step = { title: string; body: string; visual: Visual };

const STORIES: Record<"restaurant" | "hotel", { label: string; intro: string; steps: Step[] }> = {
  restaurant: {
    label: "Restaurant",
    intro: "The kitchen runs out of sea bass halfway through dinner service. Here is the whole change, start to finish.",
    steps: [
      {
        title: "The kitchen runs out",
        body: "There is no more sea bass tonight, but it is still on the menu every guest opens when they scan the Code on their table.",
        visual: { kind: "phone", screen: "guestMenuBefore", who: "Guest’s phone", highlight: { top: 0.428, height: 0.043, tone: "warn" } },
      },
      {
        title: "The chef chooses an alternative",
        body: "Roast Cornish hake will take its place. The restaurant updates its menu PDF the way it always does.",
        visual: { kind: "scene", label: "In the restaurant", photo: slotOr("chefPass", "signatureDish"), note: "Tonight: roast Cornish hake" },
      },
      {
        title: "A manager updates the menu in Informax Cloud",
        body: "From a phone: open the Restaurant Menu, tap Update content and pick the new PDF. Informax Cloud confirms it is live, and the two previous PDF versions stay available to restore.",
        visual: { kind: "phone", screen: "cloudMenuReplace", who: "Your phone · Informax Cloud" },
      },
      {
        title: "Every table has the new menu",
        body: "Every Code for the Restaurant Menu now opens it. The next guest who scans, or anyone who refreshes an open menu, sees roast Cornish hake.",
        visual: { kind: "phone", screen: "guestMenuAfter", who: "Guest’s phone", highlight: { top: 0.428, height: 0.043, tone: "ok" } },
      },
      {
        title: "No new Codes to print",
        body: "The printed Codes stay exactly where they are. Nothing is reprinted, replaced or collected from the tables.",
        visual: { kind: "code", place: "Table 12", sub: "Menu", photo: "restaurantTable", note: "Same printed Code. Nothing to replace." },
      },
    ],
  },
  hotel: {
    label: "Hotel",
    intro: "The spa has more time free this afternoon. Here is how the hotel promotes it in every bathroom, just until 18:00.",
    steps: [
      {
        title: "A guest scans the bathroom Code",
        body: "A small Code card sits by the vanity in each bathroom.",
        visual: { kind: "code", place: "Bathroom", sub: "The Spa", photo: "hotelBathroom", note: "One Code in every bathroom." },
      },
      {
        title: "Spa information opens",
        body: "Treatments, prices and opening hours: the spa’s own menu, as a PDF.",
        visual: { kind: "phone", screen: "guestSpa", who: "Guest’s phone" },
      },
      {
        title: "The spa publishes this afternoon’s offer",
        body: "Open Temporary content, choose your offer PDF and set when it should end. In this example, the offer runs until 18:00.",
        visual: { kind: "phone", screen: "cloudSpaCompose", who: "Your phone · Informax Cloud" },
      },
      {
        title: "The same Code shows the offer",
        body: "Every guest who scans a bathroom Code now sees this afternoon’s offer and how to book it with the spa.",
        visual: { kind: "phone", screen: "guestSpaOffer", who: "Guest’s phone" },
      },
      {
        title: "At 18:00 it goes back by itself",
        body: "Informax Cloud shows when the offer ends and what comes back afterwards. Nobody needs to remember.",
        visual: { kind: "phone", screen: "cloudSpaTemporary", who: "Your phone · Informax Cloud" },
      },
    ],
  },
};

/**
 * A guided walkthrough of the real product, in five steps per industry. The
 * screens are real Informax Cloud captures with fictional businesses; nothing
 * here is connected to a live account, and the page says so.
 */
export default function SeeItInAction({ initial = "restaurant", id = "see-it-in-action" }: { initial?: "restaurant" | "hotel"; id?: string }) {
  const [industry, setIndustry] = useState<"restaurant" | "hotel">(initial);
  const [step, setStep] = useState(0);
  const story = STORIES[industry];
  const current = story.steps[step];
  const last = story.steps.length - 1;

  const pick = (k: "restaurant" | "hotel") => {
    setIndustry(k);
    setStep(0);
  };
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = industry === "restaurant" ? "hotel" : "restaurant";
      pick(next);
      document.getElementById(`${id}-tab-${next}`)?.focus();
    }
  };

  return (
    <section id={id} className="scroll-mt-20 bg-paper py-24 md:py-32" aria-labelledby={`${id}-h`}>
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[15px] font-semibold text-brass-deep">See it in action</p>
            <h2 id={`${id}-h`} className="max-w-[16ch] text-balance font-serif-display text-[clamp(36px,4.8vw,60px)] leading-[1.02] text-ink">
              Informax Cloud, <span className="text-ink-mute">step by step.</span>
            </h2>
          </div>
          <div role="tablist" aria-label="Choose an industry" className="inline-flex rounded-full bg-ink/[0.06] p-1">
            {(Object.keys(STORIES) as ("restaurant" | "hotel")[]).map((k) => (
              <button
                key={k}
                id={`${id}-tab-${k}`}
                role="tab"
                type="button"
                aria-selected={industry === k}
                aria-controls={`${id}-panel`}
                tabIndex={industry === k ? 0 : -1}
                onClick={() => pick(k)}
                onKeyDown={onTabKey}
                className={`min-h-11 rounded-full px-6 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
                  industry === k ? "bg-white text-ink shadow-sm" : "text-ink-mute hover:text-ink"
                }`}
              >
                {STORIES[k].label}
              </button>
            ))}
          </div>
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${industry}`} className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16">
          <div>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">{story.intro}</p>
            <ol className="mt-8 space-y-2">
              {story.steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={`flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:px-5 ${
                      i === step ? "bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_12px_30px_-18px_rgba(11,21,36,0.35)]" : "hover:bg-ink/[0.03]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                        i < step ? "bg-brass/12 text-brass-deep" : i === step ? "bg-brass-deep text-white" : "bg-ink/[0.06] text-ink-mute"
                      }`}
                      aria-hidden
                    >
                      {i < step ? <Check size={14} /> : i + 1}
                    </span>
                    <span>
                      <span className={`block text-[16.5px] font-semibold ${i === step ? "text-ink" : "text-ink-soft"}`}>{s.title}</span>
                      {i === step ? <span className="mt-1 block max-w-[52ch] text-[15px] leading-relaxed text-ink-mute">{s.body}</span> : null}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-[56ch] rounded-2xl bg-ink/[0.04] px-5 py-4 text-[13.5px] leading-relaxed text-ink-mute">
              <strong className="font-semibold text-ink-soft">A preview of upcoming functionality, not a live account.</strong> Every
              screen is a real capture of Informax Cloud&rsquo;s development build, which is coming soon, using a fictional{" "}
              {industry === "restaurant" ? "restaurant" : "hotel"}. Captions outside the phones are ours.
            </p>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px]" aria-live="polite">
              <p className="mb-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                {current.visual.kind === "phone" ? current.visual.who : current.visual.kind === "scene" ? current.visual.label : "At the Scan Point"}
              </p>
              {current.visual.kind === "phone" ? (
                <Phone key={`${industry}-${step}`} screens={[current.visual.screen]} highlight={current.visual.highlight} tone="light" className="ixp-enter-fade" sizes="340px" />
              ) : current.visual.kind === "scene" ? (
                <div key={`${industry}-${step}`} className="ixp-enter-fade relative aspect-[390/844] overflow-hidden rounded-[28px]">
                  <Photo slot={current.visual.photo} fill sizes="340px" />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center bg-[linear-gradient(0deg,rgba(6,10,18,0.55),transparent)] px-4 pb-8 pt-24">
                    <p className="rounded-full bg-white/92 px-4 py-2 text-[13px] font-semibold text-ink shadow-lg">{current.visual.note}</p>
                  </div>
                </div>
              ) : (
                <div key={`${industry}-${step}`} className="ixp-enter-fade relative aspect-[390/844] overflow-hidden rounded-[28px]">
                  <Photo slot={current.visual.photo} fill sizes="340px" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/10">
                    {drawCodeOver(current.visual.photo) ? <AccessPoint place={current.visual.place} sub={current.visual.sub} size="lg" /> : null}
                    <p className="rounded-full bg-white/92 px-4 py-2 text-[13px] font-semibold text-ink shadow-lg">{current.visual.note}</p>
                  </div>
                </div>
              )}
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="ix-btn ix-btn-secondary min-h-11! px-4! disabled:opacity-40"
                >
                  <ArrowLeft size={16} aria-hidden /> Back
                </button>
                <span className="text-[13px] font-medium text-ink-mute">
                  Step {step + 1} of {story.steps.length}
                </span>
                {step < last ? (
                  <button type="button" onClick={() => setStep((s) => Math.min(last, s + 1))} className="ix-btn ix-btn-primary min-h-11! px-4!">
                    Next <ArrowRight size={16} aria-hidden />
                  </button>
                ) : (
                  <button type="button" onClick={() => setStep(0)} className="ix-btn ix-btn-secondary min-h-11! px-4!">
                    Start again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
