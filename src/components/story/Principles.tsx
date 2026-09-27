import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const PRINCIPLES = [
  {
    title: "Physical where it helps.",
    body: "Touch Points are made to sit naturally in a Hotel and stay in place for years.",
  },
  {
    title: "Digital where it changes.",
    body: "The information behind them can be updated at any time, by your own team.",
  },
  {
    title: "Controlled throughout.",
    body: "Your Hotel decides what guests see, where they see it and when it changes.",
  },
];

/** How Informax approaches the problem. Three statements and a way to learn more. */
export default function Principles() {
  return (
    <>
      <RevealStagger className="grid grid-cols-1 gap-x-12 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <RevealStaggerItem key={p.title} className="border-t border-line py-8">
            <h3 className="font-serif-display text-[22px] leading-snug text-ink md:text-[24px]">{p.title}</h3>
            <p className="mt-3 max-w-[32ch] text-[16px] leading-relaxed text-ink-mute">{p.body}</p>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
      <Link href="/about" className="ix-link group mt-6 text-brass-deep hover:text-ink">
        About Informax
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </>
  );
}
