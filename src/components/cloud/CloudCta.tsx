import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6, 147, 227,0.28),transparent_70%)]" />
      <div className="relative mx-auto max-w-8xl px-6 text-center md:px-10">
        <Reveal blur>
          <h2 className="mx-auto max-w-[18ch] font-serif-display text-[clamp(38px,6.4vw,80px)] leading-[1.02] text-white">
            {lead} <span className="text-cream-mute">{line}</span>
          </h2>
          <Link href="/enquire" className="ix-btn ix-btn-primary group mt-12">
            {PRIMARY_CTA}
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
