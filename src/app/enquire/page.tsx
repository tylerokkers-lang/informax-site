import type { Metadata } from "next";
import {
  Clock,
  FileCheck2,
  Layers,
  Mail,
  PoundSterling,
  Sparkles,
} from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
import { Eyebrow, EmLight } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Tell us what you're looking to create and we'll work out the best way to bring it to life, whether that's a website, a brochure, a directory or something bespoke.",
  alternates: { canonical: "/enquire" },
};

const SIDE_POINTS = [
  {
    icon: Sparkles,
    title: "Designed around you",
    desc: "Every project is built entirely around your business and brand, not a template.",
  },
  {
    icon: PoundSterling,
    title: "Honest pricing",
    desc: "Websites from £1,200, priced around what your project actually needs.",
  },
  {
    icon: Layers,
    title: "Any kind of project",
    desc: "Brochures, pamphlets, directories, hospitality and bespoke work, all welcome.",
  },
  {
    icon: FileCheck2,
    title: "No hard sell",
    desc: "A clear, no-pressure proposal. If it's not the right fit, we'll say so.",
  },
];

const PROCESS = [
  { step: "01", title: "Tell us", desc: "Share a few details about your business and what you're looking to create." },
  { step: "02", title: "We shape it", desc: "We work out the right approach and put together a clear, honest proposal." },
  { step: "03", title: "You decide", desc: "No pressure. Take the proposal away and come back whenever you're ready." },
];

export default function EnquirePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal-950 text-cream pt-[150px] pb-16 md:pt-[170px] md:pb-20">
        <div className="absolute inset-0 bg-grid-fade-dark pointer-events-none" />
        <div className="relative mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <div>
            <Eyebrow tone="dark">Enquire</Eyebrow>
            <h1 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(32px,4.4vw,50px)] text-white mb-5">
              Let&rsquo;s build <EmLight>something.</EmLight>
            </h1>
            <p className="text-cream-mute text-[17px] leading-relaxed max-w-[480px]">
              Tell us what you&rsquo;re looking to create and we&rsquo;ll
              work out the best way to bring it to life.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <MetaItem
              icon={Clock}
              title="We reply within one business day"
              desc="A short, no-pressure conversation about your project."
            />
            <MetaItem
              icon={Sparkles}
              title="Not sure what you need yet?"
              desc="That's fine. Tell us the problem and we'll help shape it."
            />
            <MetaItem
              icon={Mail}
              title="Prefer email?"
              desc={CONTACT_EMAIL}
              last
            />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-14 items-start">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[130px]">
            <div className="rounded-3xl border border-line bg-panel p-8 sm:p-9">
              <h3 className="font-serif-display text-xl font-medium text-ink mb-3.5">
                What to expect
              </h3>
              <p className="text-[14.5px] text-ink-mute leading-relaxed mb-7">
                Every Informax enquiry starts with a conversation, not a
                sales pitch. We want to understand what you&rsquo;re trying
                to achieve before we suggest anything.
              </p>
              <ul className="flex flex-col gap-5">
                {SIDE_POINTS.map((point) => (
                  <li key={point.title} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(86,67,224,0.08)]">
                      <point.icon size={16} className="text-brass-deep" />
                    </span>
                    <div>
                      <div className="text-[14px] font-semibold text-ink mb-0.5">
                        {point.title}
                      </div>
                      <p className="text-[13.5px] text-ink-mute leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-charcoal-950 p-8 sm:p-9 text-cream">
              <h3 className="font-serif-display text-lg font-medium text-white mb-6">
                How an enquiry works
              </h3>
              <div className="flex flex-col gap-6">
                {PROCESS.map((item, i) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass-light font-serif-display italic text-[13px] text-brass-light">
                        {item.step}
                      </span>
                      {i < PROCESS.length - 1 && (
                        <span className="mt-1.5 h-6 w-px bg-line-dark" />
                      )}
                    </div>
                    <div className="pt-1">
                      <div className="text-[14px] font-semibold text-white mb-0.5">
                        {item.title}
                      </div>
                      <p className="text-[13px] text-cream-mute leading-relaxed max-w-[280px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-panel p-6 sm:p-10 md:p-12">
            <EnquireForm />
          </div>
        </div>
      </section>
    </>
  );
}

function MetaItem({
  icon: Icon,
  title,
  desc,
  last = false,
}: {
  icon: typeof Clock;
  title: string;
  desc: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3.5 pb-4 ${
        last ? "" : "border-b border-line-dark"
      }`}
    >
      <Icon size={18} className="mt-0.5 shrink-0 text-brass-light" />
      <div>
        <div className="text-sm font-semibold text-white mb-0.5">{title}</div>
        <div className="text-[13px] text-cream-mute">{desc}</div>
      </div>
    </div>
  );
}
