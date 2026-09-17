import { Eyebrow } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/constants";

export function LegalPage({
  title,
  updated,
  sections,
  contactQuestion,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: React.ReactNode }[];
  contactQuestion: string;
}) {
  return (
    <>
      <section className="bg-charcoal-950 text-cream text-center pt-[112px] pb-14 md:pt-[128px]">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <Eyebrow tone="dark" center>
            Legal
          </Eyebrow>
          <h1 className="font-serif-display font-medium text-[clamp(30px,4.2vw,46px)] text-white mb-3">
            {title}
          </h1>
          <div className="text-sm text-cream-mute">Last updated: {updated}</div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <div className="mx-auto max-w-[760px] rounded-3xl border border-line bg-panel px-7 py-12 sm:px-14">
            {sections.map((s, i) => (
              <div key={s.heading} className={i === 0 ? "" : "mt-9"}>
                <h2 className="font-serif-display font-medium text-[22px] text-ink mb-3.5">
                  {s.heading}
                </h2>
                <div className="text-[15.5px] leading-[1.8] text-ink-mute [&_a]:text-brass-deep [&_a]:underline [&_a]:underline-offset-2">
                  {s.body}
                </div>
              </div>
            ))}
            <div className="mt-11 pt-8 border-t border-line">
              <h2 className="font-serif-display font-medium text-[22px] text-ink mb-3">
                {contactQuestion}
              </h2>
              <p className="text-[15.5px] text-ink-mute">
                Contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-brass-deep underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
