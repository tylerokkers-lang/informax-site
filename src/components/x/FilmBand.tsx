import type { ReactNode } from "react";
import Photo from "@/components/site/Photo";
import { Reveal } from "@/components/Reveal";
import type { PhotoKey } from "@/lib/photography";

/**
 * A full-width film with a short statement over it. The film plays only
 * while it is the most visible one on the page (see CinematicVideo); the
 * poster stands in for reduced motion and data saving. The overlay keeps
 * the text above 4.5:1 on any frame.
 */
export default function FilmBand({
  slot,
  eyebrow,
  title,
  body,
  id,
  align = "left",
}: {
  slot: PhotoKey;
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  id: string;
  align?: "left" | "bottom";
}) {
  return (
    <section aria-labelledby={id} className="bg-paper px-3 md:px-4">
      <div className="relative isolate flex min-h-[560px] overflow-hidden rounded-[32px] bg-charcoal-950 md:min-h-[680px] md:rounded-[44px]">
        <Photo slot={slot} fill motion sizes="100vw" className="-z-10" label={false} />
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 ${
            align === "left"
              ? "bg-[linear-gradient(90deg,rgba(6,10,18,0.86)_0%,rgba(6,10,18,0.55)_45%,rgba(6,10,18,0.1)_100%)] max-lg:bg-[linear-gradient(0deg,rgba(6,10,18,0.94)_0%,rgba(6,10,18,0.8)_55%,rgba(6,10,18,0.5)_100%)]"
              : "bg-[linear-gradient(0deg,rgba(6,10,18,0.9)_0%,rgba(6,10,18,0.4)_55%,rgba(6,10,18,0.1)_100%)]"
          }`}
        />
        <div className={`mx-auto flex w-full max-w-8xl px-6 py-14 md:px-10 md:py-20 ${align === "left" ? "items-end lg:items-center" : "items-end"}`}>
          <Reveal className="max-w-[36rem]">
            <p className="text-[14px] font-semibold text-brass-light">{eyebrow}</p>
            <h2 id={id} className="x-title mt-5 text-balance text-[clamp(34px,4.6vw,62px)] text-white">
              {title}
            </h2>
            {body ? <div className="mt-6 text-[18px] leading-relaxed text-white/78">{body}</div> : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
