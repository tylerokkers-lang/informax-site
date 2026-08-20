import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ConciergeBell,
  FileText,
  LayoutGrid,
  Monitor,
  WandSparkles,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const SERVICES = [
  {
    icon: Monitor,
    title: "Websites",
    desc: "Custom-designed websites built around your business, its customers and its goals.",
    href: "/websites",
    tag: "From £1,200",
  },
  {
    icon: BookOpen,
    title: "Digital Brochures",
    desc: "Beautiful digital brochures your business can share online — easy to send, easy to explore.",
    href: "/digital-information#brochures",
  },
  {
    icon: FileText,
    title: "Digital Pamphlets",
    desc: "Focused digital information designed for a specific service, product, event or purpose.",
    href: "/digital-information#brochures",
  },
  {
    icon: LayoutGrid,
    title: "Digital Directories",
    desc: "Custom digital directories that make large amounts of information simple to find.",
    href: "/digital-information#directories",
  },
  {
    icon: ConciergeBell,
    title: "Hospitality",
    desc: "Specialist digital guest experiences for hotels, venues and hospitality businesses.",
    href: "/hospitality",
  },
  {
    icon: WandSparkles,
    title: "Bespoke Projects",
    desc: "Have something different in mind? We design and build around exactly what you need.",
    href: "/enquire",
  },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="scroll-mt-24 bg-panel border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>What We Create</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            Websites, brochures, directories —{" "}
            <Em>and everything in between.</Em>
          </h2>
          <p className="text-ink-mute text-[17px] leading-relaxed">
            Every project starts with the same question: how should this
            information be presented? The answer shapes what we build.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl border border-line bg-line overflow-hidden">
          {SERVICES.map((service) => (
            <RevealStaggerItem key={service.title} className="bg-panel">
              <Link
                href={service.href}
                className="group flex h-full flex-col px-8 py-9 transition-colors duration-300 hover:bg-paper"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-paper">
                    <service.icon size={22} className="text-brass-deep" />
                  </div>
                  {service.tag && (
                    <span className="rounded-full bg-brass/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-brass-deep">
                      {service.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2.5">
                  {service.title}
                </h3>
                <p className="text-sm text-ink-mute leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brass-deep">
                  Learn more
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
