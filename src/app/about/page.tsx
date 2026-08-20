import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnPrimary, Em, EmLight, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Informax was built from years working the front desk of the hospitality industry — not a boardroom. Learn why we built a digital gateway for hotel guests.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    num: "01",
    title: "Built for hospitality, only",
    desc: "We don't split our attention across industries. Every decision is made for hotels, resorts and serviced apartments.",
  },
  {
    num: "02",
    title: "Designed around the property",
    desc: "No shared templates. Every directory is built to feel like a natural extension of the hotel it belongs to.",
  },
  {
    num: "03",
    title: "Priced to make sense",
    desc: "Straightforward pricing sized to your property — not the inflated fees some guest-directory providers charge.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal-950 text-cream text-center pt-[150px] pb-16 md:pt-[170px] md:pb-20">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Eyebrow tone="dark" center>
            About Informax
          </Eyebrow>
          <h1 className="font-serif-display font-medium text-[clamp(32px,4.6vw,50px)] leading-[1.2] text-white mx-auto mb-5 max-w-3xl">
            Built from the front desk, <EmLight>not a boardroom.</EmLight>
          </h1>
          <p className="text-cream-mute text-[17px] max-w-xl mx-auto leading-relaxed">
            Informax exists because one gap kept showing up at property
            after property — guests were never told everything a hotel had
            to offer.
          </p>
        </div>
      </section>

      <section className="bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-9 sm:p-11">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,171,111,0.14),transparent_55%)]" />
              <span className="absolute top-2 left-7 font-serif-display text-[140px] leading-none text-brass-light/[0.18]">
                &ldquo;
              </span>
              <div className="relative mt-20">
                <div className="text-xs font-bold uppercase tracking-[0.1em] text-brass-light mb-4">
                  A Message From Our Founder &amp; CEO
                </div>
                <p className="font-serif-display italic text-[19px] leading-[1.6] text-cream">
                  I founded Informax with one goal: to make every guest
                  journey simpler, smarter, and more connected. We&rsquo;re
                  giving hotels a way to put everything they offer directly
                  in front of guests, without apps or unnecessary barriers.
                  This is just the beginning.
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-6 bg-brass" />
              <div>
                <div className="text-[14.5px] font-semibold text-ink">
                  Tyler Okkers
                </div>
                <div className="text-[13px] text-ink-mute">
                  Founder &amp; CEO
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-serif-display font-medium text-[clamp(28px,3.6vw,40px)] leading-[1.18] text-ink mb-6">
              Almost a decade in hospitality, <Em>seeing the same gap.</Em>
            </h2>
            <p className="text-ink-mute text-[16.5px] leading-[1.85] mb-5">
              Our founder spent almost ten years working across the
              hospitality and hotel industry — and kept seeing the same
              story play out at property after property. Important
              information about a stay was going unsaid. If it wasn&rsquo;t
              communicated at check-in, guests could go through their
              entire visit without ever knowing everything the property
              had to offer.
            </p>
            <p className="text-ink-mute text-[16.5px] leading-[1.85] mb-5">
              There were always too many questions and never enough time to
              answer them all. And not every member of staff was equipped,
              or confident, to sell the property the way it deserved —
              through no fault of their own.
            </p>
            <p className="text-ink-mute text-[16.5px] leading-[1.85] mb-8">
              <strong className="text-ink font-semibold">
                With Informax, that changes.
              </strong>{" "}
              Everything a hotel offers — dining, spa, facilities,
              experiences, local knowledge — brought together into one
              digital directory a guest can reach with a single tap. And
              unlike many guest-directory providers charging outrageous
              fees for the privilege, Informax is priced to make sense —
              so properties of any size can give their guests the full
              picture.
            </p>
            <BtnPrimary href="/enquire">Start the Conversation</BtnPrimary>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>What We Believe</Eyebrow>
            <h2 className="font-serif-display font-medium text-[clamp(26px,3.2vw,38px)] leading-[1.18] text-ink">
              Three things that <Em>don&rsquo;t change.</Em>
            </h2>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {VALUES.map((v) => (
              <RevealStaggerItem key={v.title}>
                <span className="font-serif-display italic text-2xl text-brass-deep block mb-4">
                  {v.num}
                </span>
                <h4 className="font-serif-display text-lg font-medium text-ink mb-2.5">
                  {v.title}
                </h4>
                <p className="text-sm text-ink-mute leading-relaxed">
                  {v.desc}
                </p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
