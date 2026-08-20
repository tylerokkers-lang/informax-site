import {
  FileText,
  Mail,
  MessageSquare,
  Newspaper,
  Printer,
  Signpost,
  Calendar,
  Globe,
} from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const SCATTERED = [
  { icon: Globe, label: "Websites" },
  { icon: FileText, label: "PDFs" },
  { icon: Printer, label: "Printed Brochures" },
  { icon: Mail, label: "Emails" },
  { icon: Newspaper, label: "Documents" },
  { icon: Calendar, label: "Booking Systems" },
  { icon: MessageSquare, label: "Social Media" },
  { icon: Signpost, label: "Physical Signage" },
];

export default function ProblemStory() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(28px,3.6vw,42px)] text-ink mb-6">
              Most businesses have the right information.
              <br />
              It&rsquo;s just <Em>everywhere else.</Em>
            </h2>
            <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-[460px] mb-6">
              Services, offers, facilities, availability and policies: the
              information is usually there. It&rsquo;s just scattered across
              a website that&rsquo;s falling behind, a PDF nobody opens, a
              printed brochure that goes out of date, and a dozen other
              places customers never think to check.
            </p>
            <div className="pt-6 border-t border-line max-w-[460px]">
              <p className="font-serif-display italic text-[clamp(20px,2.2vw,25px)] leading-snug text-ink">
                Good information deserves good design.
              </p>
            </div>
          </Reveal>

          <RevealStagger className="grid grid-cols-2 gap-3">
            {SCATTERED.map((item) => (
              <RevealStaggerItem
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-4 transition-all duration-300 hover:border-brass hover:-translate-y-0.5"
              >
                <item.icon size={18} className="text-brass-deep shrink-0" />
                <span className="text-[14px] font-medium text-ink-soft">
                  {item.label}
                </span>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>

        <Reveal delay={0.15} className="mt-16 pt-14 border-t border-line max-w-2xl">
          <p className="text-ink-mute text-[17px] leading-relaxed">
            Informax brings that information together, designing and
            building the websites, brochures, directories and digital
            experiences businesses actually use to present themselves
            professionally.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
