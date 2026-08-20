import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { BtnPrimary, Em, EmLight, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Informax is a digital design and development studio — we build websites, digital brochures, directories and bespoke digital experiences, with a specialist hospitality practice.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    num: "01",
    title: "Design first",
    desc: "Good information deserves good design. We start with how something should feel to use, not just how it should function.",
  },
  {
    num: "02",
    title: "Built around you",
    desc: "No shared templates. Every project is designed to feel like a natural extension of the business it belongs to.",
  },
  {
    num: "03",
    title: "Priced honestly",
    desc: "A clear starting point, with functionality priced to what you actually need — nothing bundled in to inflate the number.",
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
            We turn information businesses need to share into{" "}
            <EmLight>something worth using.</EmLight>
          </h1>
          <p className="text-cream-mute text-[17px] max-w-xl mx-auto leading-relaxed">
            Informax is a digital design and development studio — websites,
            digital brochures, directories and bespoke digital experiences,
            with a specialist hospitality practice.
          </p>
        </div>
      </section>

      <section className="bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-9 sm:p-11">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,124,255,0.14),transparent_55%)]" />
              <span className="absolute top-2 left-7 font-serif-display text-[140px] leading-none text-brass-light/[0.18]">
                &ldquo;
              </span>
              <div className="relative mt-20">
                <div className="text-xs font-bold uppercase tracking-[0.1em] text-brass-light mb-4">
                  A Message From Our Founder &amp; CEO
                </div>
                <p className="font-serif-display italic text-[19px] leading-[1.6] text-cream">
                  I started Informax because I kept seeing the same problem:
                  businesses with genuinely good things to say, presented
                  badly. We build the websites, brochures and directories
                  that fix that — properly designed, not templated. This is
                  just the beginning.
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
              It started in hospitality. <Em>It didn&rsquo;t stay there.</Em>
            </h2>
            <p className="text-ink-mute text-[16.5px] leading-[1.85] mb-5">
              Our founder spent almost ten years working across the
              hospitality industry, and kept seeing the same story play out:
              a hotel with a great spa, a great restaurant, a great story to
              tell — and no good way to actually tell it. Information was
              scattered across a tired website, a printed guide, and
              whatever reception had time to mention at check-in.
            </p>
            <p className="text-ink-mute text-[16.5px] leading-[1.85] mb-5">
              That problem turned out not to be unique to hotels. Talk to
              almost any business and you&rsquo;ll find the same thing —
              good information, badly presented, spread across too many
              places. Informax exists to fix that properly: through
              considered design and solid engineering, not templates.
            </p>
            <p className="text-ink-mute text-[16.5px] leading-[1.85] mb-8">
              <strong className="text-ink font-semibold">
                Today, that means websites, digital brochures, directories
                and bespoke digital projects
              </strong>{" "}
              for businesses across sectors — alongside a dedicated
              hospitality practice that still carries the lessons the
              company was built on.
            </p>
            <BtnPrimary href="/enquire">Start a Project</BtnPrimary>
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
