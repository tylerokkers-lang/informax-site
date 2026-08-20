import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { BtnGhost, BtnPrimary, Eyebrow, EmLight } from "@/components/ui";

const DEFAULT_META = [
  {
    title: "Start with a conversation",
    desc: "No pressure, no jargon, just a clear picture of what you need.",
  },
  {
    title: "Built around your business",
    desc: "Every project is designed from scratch, not pulled from a template.",
  },
  {
    title: "Websites from £1,200",
    desc: "A clear starting point, with functionality priced to what you need.",
  },
];

export default function FinalCta({
  eyebrow = "Ready When You Are",
  title = (
    <>
      Have something to <EmLight>build?</EmLight>
    </>
  ),
  description = "Tell us what you're looking to create and we'll work out the best way to bring it to life, whether that's a website, a brochure, a directory or something entirely bespoke.",
  primaryLabel = "Start a Project",
  primaryHref = "/enquire",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/services",
  meta = DEFAULT_META,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  meta?: { title: string; desc: string }[];
}) {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-line-dark bg-gradient-to-br from-charcoal-900 to-charcoal-950 px-6 py-16 md:px-10 md:py-20 text-center text-cream">
            <div className="pointer-events-none absolute -bottom-64 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,124,255,0.16),transparent_70%)] blur-[20px]" />

            <div className="relative">
              <Eyebrow tone="dark" center>
                {eyebrow}
              </Eyebrow>
              <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(30px,4vw,46px)] text-white mb-4">
                {title}
              </h2>
              <p className="text-cream-mute text-[17px] max-w-[520px] mx-auto mb-9">
                {description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-11">
                <BtnPrimary href={primaryHref}>{primaryLabel}</BtnPrimary>
                <BtnGhost href={secondaryHref} tone="dark">
                  {secondaryLabel}
                </BtnGhost>
              </div>

              {meta.length > 0 && (
                <div className="flex flex-wrap justify-center gap-10 border-t border-line-dark pt-9">
                  {meta.map((item) => (
                    <div key={item.title} className="max-w-[210px]">
                      <h5 className="text-[13.5px] font-semibold text-brass-light mb-1.5">
                        {item.title}
                      </h5>
                      <p className="text-[13px] text-cream-mute leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
