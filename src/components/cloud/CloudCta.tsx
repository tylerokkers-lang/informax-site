import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PRIMARY_CTA } from "@/lib/constants";

/** Closing statement. One action only. */
export default function CloudCta({
  lead = "Your hotel is already full of information.",
  line = "Put it where guests need it.",
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
          <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-brass-light">
            Informax Cloud
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
