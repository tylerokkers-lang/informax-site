import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoBand } from "@/components/x/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Informax was born from nearly a decade of hospitality experience. Today it builds Informax Cloud, connecting digital information with physical spaces throughout a hotel.",
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
      <section className="bg-paper pb-20 pt-[120px] md:pb-28 md:pt-[160px]">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="max-w-[1000px]">
            <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">About Informax</p>
            <h1 className="ix-hero-rise x-display mt-6 text-balance text-[clamp(46px,7vw,104px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
              Built in hospitality. <span className="text-ink-quiet">Designed for every business.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-14 md:grid-cols-12 md:pt-16">
            <Reveal className="md:col-span-4">
              <span className="text-[15px] font-semibold text-brass-deep">
                Our Story
              </span>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-8">
              <p className="x-title mb-8 text-[clamp(26px,3vw,38px)] leading-[1.2] text-ink">
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
              <p className="x-title text-[clamp(22px,2.4vw,30px)] leading-[1.35] text-ink">
                No generic templates. No unnecessary complexity. Just
                thoughtfully designed digital experiences that help people
                find what matters.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24 md:pb-32" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 border-t border-line pt-14 md:grid-cols-12 md:gap-16 md:pt-16">
            <Reveal className="md:col-span-4">
              <span className="text-[15px] font-semibold text-brass-deep">
                Our Purpose
              </span>
            </Reveal>
            <div className="space-y-14 md:col-span-8 md:space-y-16">
              <Reveal>
                <h2 id="mission-heading" className="mb-5 text-[15px] font-semibold text-brass-deep">
                  Our Mission
                </h2>
                <p className="x-title mb-6 max-w-[27ch] text-[clamp(28px,3.4vw,44px)] leading-[1.15] text-ink">
                  To simplify how businesses share information by making every guest interaction seamless, instant, and effortlessly manageable.
                </p>
                <p className="max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                  We empower hospitality businesses and beyond with smarter digital solutions that transform how information is delivered, managed, and experienced. Through Informax Cloud, businesses can keep digital content current in one intuitive platform, without the complexity of outdated printed materials.
                </p>
                <p className="mt-5 text-[16px] font-semibold text-ink">
                  Less administration. More flexibility. Better guest experiences.
                </p>
              </Reveal>
              <Reveal>
                <h2 className="mb-5 text-[15px] font-semibold text-brass-deep">
                  Our Vision
                </h2>
                <p className="x-title mb-6 max-w-[28ch] text-[clamp(28px,3.4vw,44px)] leading-[1.15] text-ink">
                  To become the global standard for how businesses connect people with information.
                </p>
                <p className="max-w-[62ch] text-[16.5px] leading-[1.85] text-ink-mute">
                  We envision a world where information is always accessible, accurate and up to date, without unnecessary printing, complicated systems or operational delays.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-950 py-24 text-cream md:py-36">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="mb-16 max-w-xl md:mb-20">
            <span className="mb-4 block text-[15px] font-semibold text-brass-light">
              What We Believe
            </span>
            <h2 className="x-title text-[clamp(32px,4.4vw,60px)] text-white">
              Three things that don&rsquo;t change.
            </h2>
          </Reveal>

          <RevealStagger className="flex flex-col border-t border-white/10 md:grid md:grid-cols-3 md:gap-x-12 md:border-t-0">
            {VALUES.map((v) => (
              <RevealStaggerItem
                key={v.n}
                className="border-b border-white/10 py-8 md:border-b-0 md:border-t md:py-0 md:pt-8"
              >
                <span className="x-num mb-4 block text-[14px] font-semibold text-brass-light">
                  {v.n}
                </span>
                <h3 className="mb-2.5 text-[20px] font-semibold tracking-[-0.015em] text-white">
                  {v.title}
                </h3>
                <p className="max-w-[32ch] text-[14.5px] leading-relaxed text-cream-mute">
                  {v.desc}
                </p>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section aria-labelledby="founder-h" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Reveal className="flex flex-col items-start justify-between gap-6 border-t border-line pt-12 md:flex-row md:items-center">
            <div>
              <h2 id="founder-h" className="x-title text-[clamp(26px,3vw,38px)] text-ink">Meet the founder.</h2>
              <p className="mt-3 max-w-[40rem] text-[17px] leading-relaxed text-ink-mute">Tyler Okkers, on the hotel experience behind Informax.</p>
            </div>
            <Link href="/tyler-okkers" className="ix-link group text-brass-deep hover:text-ink">
              Read about the founder <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <DemoBand title="Take control of what your guests see." lead="Tell us about your property and what you would like to connect." />
    </>
  );
}
