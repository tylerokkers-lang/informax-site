import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PRIMARY_CTA } from "@/lib/constants";

/** Closing statement. One action only. */
export default function CloudCta({
  lead = "Take control of",
  line = "what your guests see.",
}: {
  lead?: string;
  line?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-28 text-cream md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_0%,rgba(86,67,224,0.28),transparent_70%)]" />
      <div className="relative mx-auto max-w-8xl px-6 text-center md:px-10">
        <Reveal blur>
          <h2 className="mx-auto max-w-[18ch] font-serif-display text-[clamp(38px,6.4vw,84px)] font-medium leading-[1] tracking-[-0.02em] text-white">
            {lead} <span className="italic text-glow">{line}</span>
          </h2>
          <div className="relative mx-auto mt-14 flex w-fit justify-center">
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0693e3]/25 blur-[70px]" />
            <Image
              src="/product/informax-cloud-logo.png"
              alt="Informax Cloud"
              width={900}
              height={276}
              className="relative h-[64px] w-auto md:h-[84px]"
            />
          </div>
          <Link
            href="/enquire"
            className="group mt-10 inline-flex items-center gap-2.5 border-b border-white/50 pb-1 text-[17px] font-medium text-white transition-colors duration-300 hover:border-white"
          >
            {PRIMARY_CTA}
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
