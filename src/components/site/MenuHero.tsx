"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AccessPoint from "@/components/access/AccessPoint";
import Photo from "@/components/site/Photo";
import { Phone, type Highlight } from "@/components/site/Devices";
import { useSteps } from "@/components/site/useSteps";
import { ComingSoonBadge } from "@/components/site/ComingSoon";
import { drawCodeOver, type PhotoKey } from "@/lib/photography";

/** Where the first main dish sits on the guest's menu (fractions of the screen height, measured from the captures). */
const DISH = { top: 0.428, height: 0.043 };

const STEPS: { label: string; line: string; detail: string; chip: string; photo: PhotoKey; dish: Highlight | null }[] = [
  {
    label: "The kitchen runs out",
    line: "The menu needs to change.",
    detail: "The restaurant runs out of sea bass during dinner service, but it is still on the menu every guest opens.",
    chip: "Sea bass: sold out tonight",
    photo: "chefPass",
    dish: { ...DISH, tone: "warn" },
  },
  {
    label: "The menu changes",
    line: "Make the change in seconds.",
    detail: "The manager opens Informax Cloud and replaces the menu PDF with an updated version featuring roast hake.",
    chip: "Replace menu · updated PDF",
    photo: "hospitalityTeam",
    dish: null,
  },
  {
    label: "Every Code is updated",
    line: "One update. Every table.",
    detail: "Guests scan the same permanent Code and see the new menu straight away. No reprinting. No replacing Codes. No outdated menus.",
    chip: "Same Code · new menu",
    photo: "restaurantTable",
    dish: { ...DISH, tone: "ok" },
  },
];

/**
 * The homepage hero: a restaurant runs out of an ingredient, a manager
 * replaces the menu PDF from a phone, and the guest scanning the same Code
 * sees the new menu. Every phone screen is a real Informax Cloud capture;
 * the chip, captions and the ring around the changed dish are ours.
 */
export default function MenuHero() {
  const { ref, step, choose, playing, intervalMs, pauseProps } = useSteps(STEPS.length, 6000);
  const staffFront = step === 1;
  const current = STEPS[step];

  return (
    <section className="relative overflow-hidden bg-charcoal-950 pb-16 pt-[112px] text-cream md:pb-24 md:pt-[136px]">
      <div className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-brass/15 blur-[140px]" aria-hidden />
      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="ix-hero-rise">
          <p className="mb-5 flex flex-wrap items-center gap-3 text-[15px] font-semibold text-brass-light">
            Informax Cloud for restaurants <ComingSoonBadge />
          </p>
          <h1 className="text-balance font-serif-display text-[clamp(42px,5.4vw,74px)] leading-[1] text-white">
            Your menu changes. <span className="text-cream-mute">Your Codes don&rsquo;t.</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-[18px] leading-relaxed text-white/75">
            Out of an ingredient? Introducing a new special? Update your menu from your phone and make the latest
            version available across your restaurant instantly.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#see-it-in-action" className="ix-btn ix-btn-primary">
              See It in Action
            </a>
            <Link href="/informax-cloud" className="ix-btn ix-btn-secondary-dark">
              Explore Informax Cloud
            </Link>
          </div>
        </div>

        <div ref={ref} {...pauseProps}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:aspect-square">
            {STEPS.map((s, i) => (
              <Photo
                key={s.photo}
                slot={s.photo}
                priority={i === 0}
                sizes="(min-width: 1024px) 640px, 100vw"
                label={i === step}
                fill
                className={`transition-opacity duration-700 motion-reduce:transition-none ${i === step ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.15)_0%,rgba(6,10,18,0)_40%,rgba(6,10,18,0.45)_100%)]" aria-hidden />

            <div
              className={`absolute bottom-[5%] left-[7%] w-[38%] max-w-[210px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                staffFront ? "z-20 scale-100 opacity-100" : "z-10 scale-[0.92] opacity-80"
              }`}
            >
              <p className="mb-2 whitespace-nowrap text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white/80 sm:text-[11px] sm:tracking-[0.14em]">Manager&rsquo;s phone</p>
              <Phone screens={["cloudMenuBefore", "cloudMenuReplace", "cloudMenuPublished"]} active={step} sizes="(min-width: 640px) 210px, 38vw" />
            </div>
            <div
              className={`absolute bottom-[5%] right-[7%] w-[40%] max-w-[224px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                staffFront ? "z-10 scale-[0.92] opacity-80" : "z-20 scale-100 opacity-100"
              }`}
            >
              <p className="mb-2 whitespace-nowrap text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white/80 sm:text-[11px] sm:tracking-[0.14em]">Guest&rsquo;s phone</p>
              <Phone
                screens={["guestMenuBefore", "guestMenuBefore", "guestMenuAfter"]}
                active={step}
                highlight={current.dish}
                sizes="(min-width: 640px) 224px, 40vw"
                priority
              />
            </div>
            {drawCodeOver("restaurantTable") ? (
              <div
                className={`absolute bottom-[4%] left-1/2 z-30 hidden -translate-x-1/2 transition-all duration-700 sm:block ${step === 2 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                aria-hidden
              >
                <AccessPoint place="Table 12" sub="Menu" size="sm" />
              </div>
            ) : null}
          </div>

          <div className="mt-5 min-h-[5.5em] sm:min-h-[4.4em]" aria-live="polite">
            <p key={step} className="ixp-enter mb-2 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 text-[13px] font-semibold text-white">
              <span className={`h-2 w-2 rounded-full ${step === 0 ? "bg-amber-400" : step === 1 ? "bg-brass-light" : "bg-emerald-400"}`} aria-hidden />
              {current.chip}
            </p>
            <p className="text-[15.5px] leading-snug text-white/85">
              <strong className="font-semibold text-white">{current.line}</strong> {current.detail}
            </p>
          </div>

          <ol className="mt-4 grid grid-cols-3 gap-2 sm:gap-3" aria-label="How the menu update works">
            {STEPS.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-current={i === step ? "step" : undefined}
                  className={`group relative h-full w-full overflow-hidden rounded-2xl px-3 py-3 text-left transition-colors sm:px-4 sm:py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-light ${
                    i === step ? "bg-white/[0.09]" : "bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`block text-[12px] font-semibold ${i === step ? "text-brass-light" : "text-cream-mute"}`}>Step {i + 1}</span>
                  <span className="mt-1 block text-[13.5px] font-semibold leading-snug text-white sm:text-[15px]">{s.label}</span>
                  {i === step && playing ? (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brass-light animate-[ix-step_var(--d)_linear_forwards]" style={{ ["--d" as string]: `${intervalMs}ms` }} aria-hidden />
                  ) : null}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[13px] text-cream-mute">
            A preview of Informax Cloud, coming soon: real screens from the development build, fictional restaurant. Guests with the
            menu already open see the change when they refresh.
            <a href="#see-it-in-action" className="inline-flex items-center gap-1 font-semibold text-brass-light hover:text-white">
              Walk through it <ArrowRight size={14} aria-hidden />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
