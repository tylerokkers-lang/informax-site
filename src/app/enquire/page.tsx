import type { Metadata } from "next";
import { ClipboardCheck, Clock, Layers, Mail, Sparkles } from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
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
    icon: ClipboardCheck,
    title: "Honest quotes",
    desc: "Every project is scoped and quoted around what it actually needs.",
  },
  {
    icon: Layers,
    title: "Any kind of project",
    desc: "Brochures, pamphlets, directories, hospitality and bespoke work, all welcome.",
  },
];

const PROCESS = [
  { step: "01", title: "Tell us", desc: "Share a few details about your business and what you're looking to create." },
  { step: "02", title: "We shape it", desc: "We work out the right approach and put together a clear, honest proposal." },
  { step: "03", title: "You decide", desc: "No pressure. Take the proposal away and come back whenever you're ready." },
];

export default function EnquirePage() {
  return (
    <section className="bg-paper pt-[140px] pb-24 md:pt-[180px] md:pb-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="mb-16 max-w-[20ch] md:mb-20">
          <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            Enquire
          </span>
          <h1 className="font-serif-display font-medium leading-[1.06] tracking-[-0.01em] text-[clamp(34px,5.4vw,58px)] text-ink">
            Let&rsquo;s build something.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-16 border-t border-line pt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pt-16">
          <div className="flex flex-col gap-12 lg:sticky lg:top-[140px] lg:self-start">
            <div>
              <p className="mb-8 max-w-[42ch] text-[15.5px] leading-relaxed text-ink-mute">
                Every Informax enquiry starts with a conversation, not a
                sales pitch. We want to understand what you&rsquo;re trying
                to achieve before we suggest anything.
              </p>
              <ul className="flex flex-col gap-6">
                {SIDE_POINTS.map((point) => (
                  <li key={point.title} className="flex items-start gap-4">
                    <point.icon size={18} className="mt-0.5 shrink-0 text-brass-deep" />
                    <div>
                      <div className="mb-0.5 text-[14.5px] font-semibold text-ink">
                        {point.title}
                      </div>
                      <p className="text-[14px] leading-relaxed text-ink-mute">
                        {point.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-8">
              <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
                How It Works
              </span>
              <div className="flex flex-col gap-6">
                {PROCESS.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="font-serif-display text-[14px] italic text-brass-deep">
                      {item.step}
                    </span>
                    <div>
                      <div className="mb-0.5 text-[14.5px] font-semibold text-ink">
                        {item.title}
                      </div>
                      <p className="max-w-[32ch] text-[14px] leading-relaxed text-ink-mute">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-line pt-8 text-[14px] text-ink-mute">
              <Clock size={16} className="shrink-0 text-brass-deep" />
              We reply within one business day.
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="-mt-6 flex items-center gap-3 text-[14px] text-ink-mute transition-colors hover:text-brass-deep"
            >
              <Mail size={16} className="shrink-0 text-brass-deep" />
              Prefer email? {CONTACT_EMAIL}
            </a>
          </div>

          <div className="border-t border-line pt-14 lg:border-t-0 lg:pt-0">
            <EnquireForm />
          </div>
        </div>
      </div>
    </section>
  );
}
