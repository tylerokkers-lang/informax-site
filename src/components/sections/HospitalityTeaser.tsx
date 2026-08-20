import { ArrowRight, ConciergeBell } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

export default function HospitalityTeaser() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-panel px-8 py-12 sm:px-12 sm:py-14 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-charcoal-950 shrink-0">
              <ConciergeBell size={26} className="text-brass-light" />
            </div>

            <div>
              <Eyebrow>One Specialist Area</Eyebrow>
              <h2 className="font-serif-display font-medium leading-[1.2] text-[clamp(24px,2.8vw,32px)] text-ink mb-3">
                Built for every business. <Em>Designed for specific needs.</Em>
              </h2>
              <p className="text-ink-mute text-[15.5px] leading-relaxed max-w-xl">
                From hotel websites to digital guest directories, we create
                digital experiences that help hospitality businesses
                communicate more effectively with their guests. It is one
                of the specialisms Informax serves.
              </p>
            </div>

            <a
              href="/hospitality"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-brass hover:text-brass-deep hover:-translate-y-0.5"
            >
              Explore Hospitality
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
