import { ArrowRight, Check, X } from "lucide-react";
import AccessPoint from "@/components/access/AccessPoint";
import { Phone } from "@/components/site/Devices";
import { Reveal } from "@/components/Reveal";

const DISH = { top: 0.428, height: 0.043 } as const;

/**
 * The restaurant story on one screen: the menu a guest saw, the Code that
 * stayed exactly where it was, and the menu the next guest sees. The two
 * phone screens are real guest views; the rings around the dish are ours.
 */
export default function MenuBeforeAfter() {
  return (
    <section className="bg-paper py-24 md:py-32" aria-labelledby="before-after-h">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[15px] font-semibold text-brass-deep">One change, start to finish</p>
          <h2 id="before-after-h" className="text-balance font-serif-display text-[clamp(34px,4.6vw,58px)] leading-[1.03] text-ink">
            The sea bass runs out at seven. <span className="text-ink-mute">By ten past, every table knows.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-[1000px] grid-cols-2 items-end gap-x-4 gap-y-10 md:grid-cols-[1fr_auto_1fr] md:gap-x-10">
          <figure className="order-1">
            <figcaption className="mb-4 text-center">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-amber-700">Before</span>
              <span className="mt-1 block text-[15px] font-semibold text-ink">Sea bass on the menu</span>
            </figcaption>
            <Phone screens={["guestMenuBefore"]} tone="light" highlight={{ ...DISH, tone: "warn" }} className="mx-auto w-full max-w-[280px]" sizes="(min-width: 768px) 280px, 45vw" />
          </figure>

          <div className="order-3 col-span-2 flex flex-col items-center gap-5 md:order-2 md:col-span-1 md:mb-24">
            <AccessPoint place="Table 12" sub="Menu" size="md" />
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[13.5px] font-semibold text-emerald-800">
              <Check size={15} aria-hidden /> Same Code. Not reprinted.
            </p>
            <p className="flex max-w-[16rem] items-center gap-2 text-center text-[14px] leading-snug text-ink-mute">
              The manager replaces the menu PDF in Informax Cloud
              <span className="hidden shrink-0 md:inline-flex" aria-hidden>
                <ArrowRight size={16} />
              </span>
            </p>
          </div>

          <figure className="order-2 md:order-3">
            <figcaption className="mb-4 text-center">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-700">After</span>
              <span className="mt-1 block text-[15px] font-semibold text-ink">Roast hake tonight</span>
            </figcaption>
            <Phone screens={["guestMenuAfter"]} tone="light" highlight={{ ...DISH, tone: "ok" }} className="mx-auto w-full max-w-[280px]" sizes="(min-width: 768px) 280px, 45vw" />
          </figure>
        </div>

        <div className="mx-auto mt-20 grid max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-[24px] bg-paper-alt p-7 sm:p-8">
            <p className="text-[15px] font-semibold text-ink-soft">Printed menus</p>
            <ul className="mt-4 space-y-3">
              {["Reprint, or cross the dish out by hand", "Swap the card on every table", "Remind every server what is off tonight"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15.5px] text-ink-soft">
                  <X size={18} className="mt-0.5 shrink-0 text-ink-mute" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] bg-white p-7 shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_20px_50px_-30px_rgba(11,21,36,0.35)] sm:p-8">
            <p className="text-[15px] font-semibold text-brass-deep">With Informax</p>
            <ul className="mt-4 space-y-3">
              {["Replace one PDF from your phone", "Every table’s Code opens the new menu", "The old menu stays in the history, ready to restore"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15.5px] text-ink">
                  <Check size={18} className="mt-0.5 shrink-0 text-brass-deep" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-[1000px] text-[13px] text-ink-mute">
          A preview of Informax Cloud, coming soon: real guest screens from the development build, fictional restaurant. The
          times in the headline are an example.
        </p>
      </div>
    </section>
  );
}
