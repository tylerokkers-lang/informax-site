import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Informax began in hospitality and builds digital guest directories for hotels, alongside websites and digital information for businesses more broadly.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    n: "01",
    title: "Design first",
    desc: "Good information deserves good design. We start with how something should feel to use, not just how it should function.",
  },
  {
    n: "02",
    title: "Built around you",
    desc: "No shared templates. Every project is designed to feel like a natural extension of the business it belongs to.",
  },
  {
    n: "03",
    title: "Honest, not padded",
    desc: "A clear scope and a straightforward quote. Nothing is bundled in just to inflate the number.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-paper pt-[140px] pb-20 md:pt-[180px] md:pb-28">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="max-w-[18ch]">
            <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
              About Informax
            </span>
            <h1 className="font-serif-display font-medium leading-[1.06] tracking-[-0.01em] text-[clamp(34px,5.6vw,62px)] text-ink">
              We turn information into something worth using.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-14 md:grid-cols-12 md:pt-16">
            <Reveal className="md:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
                Our Story
              </span>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-8">
              <p className="mb-6 font-serif-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.35] text-ink">
                It started in hospitality. It didn&rsquo;t stay there.
              </p>
              <p className="mb-5 max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                Our founder spent almost ten years working across the
                hospitality industry, and kept seeing the same story play
                out: a hotel with a great spa, a great restaurant, a great
                story to tell, and no good way to actually tell it.
                Information was scattered across a tired website, a printed
                guide, and whatever reception had time to mention at
                check-in.
              </p>
              <p className="max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                That problem turned out not to be unique to hotels. Talk to
                almost any business and you&rsquo;ll find the same thing:
                good information, badly presented and spread across too many
                places.{" "}
                <strong className="font-semibold text-ink">
                  Today, that means digital guest directories for hospitality
                  first, and websites and digital information for businesses
                  more broadly,
                </strong>{" "}
                built through considered design rather than templates.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-950 py-24 text-cream md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="mb-16 max-w-xl md:mb-20">
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
              What We Believe
            </span>
            <h2 className="font-serif-display font-medium leading-[1.12] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-white">
              Three things that don&rsquo;t change.
            </h2>
          </Reveal>

          <RevealStagger className="flex flex-col border-t border-white/10 md:grid md:grid-cols-3 md:gap-x-12 md:border-t-0">
            {VALUES.map((v) => (
              <RevealStaggerItem
                key={v.n}
                className="border-b border-white/10 py-8 md:border-b-0 md:border-t md:py-0 md:pt-8"
              >
                <span className="mb-4 block font-serif-display text-[15px] italic text-brass-light">
                  {v.n}
                </span>
                <h4 className="mb-2.5 text-[18px] font-semibold text-white">
                  {v.title}
                </h4>
                <p className="max-w-[32ch] text-[14.5px] leading-relaxed text-cream-mute">
                  {v.desc}
                </p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <FinalCta
        title={<>Have something to build?</>}
        description="Tell us about your property or business and what you're trying to create."
      />
    </>
  );
}
