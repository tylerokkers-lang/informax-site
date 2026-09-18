import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { BtnGhost, BtnPrimary } from "@/components/ui";

export default function FinalCta({
  eyebrow,
  title = <>Have something to build?</>,
  description,
  primaryLabel = "Start a Project",
  primaryHref = "/enquire",
  secondaryLabel,
  secondaryHref,
  meta = [],
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
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="border-t border-line pt-14 md:pt-16">
          {eyebrow && (
            <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
              {eyebrow}
            </span>
          )}
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="max-w-[16ch] font-serif-display font-medium leading-[1.08] tracking-[-0.01em] text-[clamp(32px,5vw,54px)] text-ink">
                {title}
              </h2>
              {description && (
                <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-ink-mute">
                  {description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-4">
              <BtnPrimary href={primaryHref} className="text-[17px]">
                {primaryLabel}
              </BtnPrimary>
              {secondaryLabel && secondaryHref && (
                <BtnGhost href={secondaryHref}>{secondaryLabel}</BtnGhost>
              )}
            </div>
          </div>

          {meta.length > 0 && (
            <div className="mt-16 flex flex-col flex-wrap gap-x-12 gap-y-6 border-t border-line pt-10 sm:flex-row">
              {meta.map((item) => (
                <div key={item.title} className="max-w-[260px]">
                  <h5 className="mb-1.5 text-[13.5px] font-semibold text-ink">
                    {item.title}
                  </h5>
                  <p className="text-[13.5px] leading-relaxed text-ink-mute">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
