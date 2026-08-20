import type { Metadata } from "next";
import { Clock, Mail, Sparkles } from "lucide-react";
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
  "A project designed entirely around your business and brand",
  "Websites from £1,200, priced honestly around what you need",
  "Brochures, directories, hospitality and bespoke work all welcome",
  "A clear, no-pressure proposal, never a hard sell",
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
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14 items-start">
          <div className="lg:sticky lg:top-[130px]">
            <h3 className="font-serif-display text-xl font-medium text-ink mb-3.5">
              What to expect
            </h3>
            <p className="text-[14.5px] text-ink-mute leading-relaxed mb-6">
              Every Informax enquiry starts with a conversation, not a sales
              pitch. We want to understand what you&rsquo;re trying to
              achieve before we suggest anything.
            </p>
            <ul className="flex flex-col gap-4">
              {SIDE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <span className="text-sm text-ink-soft leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
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
