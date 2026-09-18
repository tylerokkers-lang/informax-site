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
          <Reveal className="max-w-3xl">
            <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
              About Informax
            </span>
            <h1 className="max-w-[20ch] font-serif-display font-medium leading-[1.06] tracking-[-0.01em] text-[clamp(34px,5.6vw,62px)] text-ink">
              Built in hospitality. Designed for every business.
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
                Informax was born from nearly a decade of first-hand
                experience in hospitality.
              </p>
              <p className="mb-5 max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                Working across front office, meetings and events, and guest
                relations, our founder saw how much care went into creating
                exceptional guest experiences, and how often that work was
                let down by the way information was delivered.
              </p>
              <p className="mb-5 max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                Hotels invested in remarkable restaurants, spas, experiences
                and services, yet guests were expected to find them through
                printed directories, disconnected webpages or a rushed
                explanation at check-in. Important information was easily
                missed, materials quickly became outdated, and valuable
                opportunities to improve the guest experience and generate
                revenue were lost.
              </p>
              <p className="mb-5 max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                Informax began as a better way for hotels to connect guests
                with everything available to them: beautifully presented,
                easy to access and simple to keep current.
              </p>
              <p className="max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                But the challenge extends far beyond hospitality. Businesses
                everywhere have valuable information, services and stories
                that are difficult to find or poorly presented online.{" "}
                <strong className="font-semibold text-ink">
                  Today, Informax combines considered design and practical
                  technology to create digital guest directories for
                  hospitality, alongside distinctive websites and digital
                  information experiences for businesses more broadly.
                </strong>
              </p>
            </Reveal>
          </div>

          <div className="mt-14 border-t border-line pt-10 md:mt-16 md:pt-12">
            <Reveal className="max-w-[52ch]">
              <p className="font-serif-display text-[clamp(19px,2vw,24px)] font-medium italic leading-[1.5] text-ink">
                No generic templates. No unnecessary complexity. Just
                thoughtfully designed digital experiences that help people
                find what matters.
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
