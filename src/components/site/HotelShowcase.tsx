"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AccessPoint from "@/components/access/AccessPoint";
import Photo from "@/components/site/Photo";
import { Phone } from "@/components/site/Devices";
import { useSteps } from "@/components/site/useSteps";
import { drawCodeOver, type PhotoKey } from "@/lib/photography";
import type { ScreenKey } from "@/lib/screens";

const MOMENTS: { label: string; place: string; line: string; chip: string; photo: PhotoKey; screen: ScreenKey }[] = [
  {
    label: "Coffee-table directory",
    place: "Suite 401",
    line: "Dinner now starts at 17:30. Replace the directory once and every room has it.",
    chip: "New dinner hours, same Code",
    photo: "hotelLounge",
    screen: "guestDirectoryAfter",
  },
  {
    label: "Bathroom spa menu",
    place: "Bathroom",
    line: "Promote this afternoon’s treatments until 18:00. The spa menu comes back by itself.",
    chip: "Ends at 18:00 today",
    photo: "hotelBathroom",
    screen: "guestSpaOffer",
  },
  {
    label: "Room upgrades",
    place: "Suite 401",
    line: "Invite guests to ask about a suite. Your team takes every enquiry from there.",
    chip: "An invitation to enquire",
    photo: "hotelSuite",
    screen: "guestDirectoryBefore",
  },
];

/**
 * The hotel experience: one hotel, three Access Points, each showing real
 * guest content that the hotel can change without replacing the card.
 */
export default function HotelShowcase({ as = "section", heading = "h2" }: { as?: "section" | "header"; heading?: "h1" | "h2" }) {
  const { ref, step, choose, pauseProps } = useSteps(MOMENTS.length, 6000);
  const m = MOMENTS[step];
  const Wrap = as;
  const H = heading;

  return (
    <Wrap className={`relative overflow-hidden bg-[#0d1626] text-cream ${heading === "h1" ? "pt-[112px] md:pt-[136px]" : "pt-24 md:pt-32"} pb-20 md:pb-28`}>
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={heading === "h1" ? "ix-hero-rise" : undefined}>
            <p className="mb-5 text-[15px] font-semibold text-brass-light">Informax Cloud for hotels</p>
            <H className="max-w-[15ch] text-balance font-serif-display text-[clamp(40px,5.6vw,76px)] leading-[1] text-white">
              A better guest experience. <span className="text-cream-mute">One simple update.</span>
            </H>
          </div>
          <div>
            <p className="max-w-[34rem] text-[18px] leading-relaxed text-white/75">
              Your hotel directory, restaurant information, spa treatments and guest offers, accessible throughout your property
              and simple for your team to keep current.
            </p>
            {heading === "h2" ? (
              <Link href="/hotels" className="ix-link mt-5 text-brass-light hover:text-white">
                Informax for hotels <ArrowRight size={16} aria-hidden />
              </Link>
            ) : (
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#see-it-in-action" className="ix-btn ix-btn-primary">See It in Action</a>
                <Link href="/enquire" className="ix-btn ix-btn-secondary-dark">Request a Demo</Link>
              </div>
            )}
          </div>
        </div>

        <div ref={ref} {...pauseProps} className="mt-12 md:mt-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/10] lg:aspect-[21/10]">
            {MOMENTS.map((x, i) => (
              <Photo
                key={x.label}
                slot={x.photo}
                fill
                label={i === step}
                priority={heading === "h1" && i === 0}
                sizes="(min-width: 1180px) 1180px, 100vw"
                className={`transition-opacity duration-700 motion-reduce:transition-none ${i === step ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,18,0)_40%,rgba(6,10,18,0.35)_100%)]" aria-hidden />
            {drawCodeOver(m.photo) ? (
              <div className="absolute left-[7%] top-1/2 hidden -translate-y-1/2 md:block">
                <AccessPoint key={m.label} place={m.place} sub={m.label.replace(/ menu$/, "")} size="md" className="ixp-enter-fade" />
              </div>
            ) : null}
            <p key={`chip-${step}`} className="ixp-enter absolute left-4 top-4 rounded-full bg-white/92 px-3.5 py-2 text-[13px] font-semibold text-ink shadow-lg sm:left-6 sm:top-6" aria-live="polite">
              {m.chip}
            </p>
            <div className="absolute inset-x-0 bottom-[5%] top-[15%] flex items-center justify-center sm:left-auto sm:right-[6%] sm:top-[5%]">
              <Phone screens={MOMENTS.map((x) => x.screen)} active={step} className="h-full max-h-[560px] w-auto" sizes="260px" />
            </div>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {MOMENTS.map((x, i) => (
              <li key={x.label}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-pressed={i === step}
                  className={`h-full w-full rounded-2xl px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-light ${
                    i === step ? "bg-white/[0.09]" : "bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`block text-[15.5px] font-semibold ${i === step ? "text-white" : "text-cream"}`}>{x.label}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-cream-mute">{x.line}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-cream-mute">
            A preview of Informax Cloud, coming soon: real guest screens from the development build, fictional hotel. Informax
            shows your information and offers; bookings and upgrades stay with your team.
          </p>
        </div>
      </div>
    </Wrap>
  );
}
