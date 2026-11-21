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
      <section className="bg-paper pb-4 pt-[120px] md:pt-[160px]">
        <div className="mx-auto max-w-[760px] px-6 md:px-8">
          <p className="text-[14px] font-semibold text-brass-deep">Legal</p>
          <h1 className="x-display mt-5 text-[clamp(40px,5.4vw,72px)] text-ink">{title}</h1>
          <p className="mt-5 text-[14px] text-ink-mute">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-paper pb-24 pt-10 md:pb-32">
        <div className="mx-auto max-w-8xl px-6 md:px-8">
          <div className="mx-auto max-w-[760px] border-t border-line pt-10">
            {sections.map((s, i) => (
              <div key={s.heading} className={i === 0 ? "" : "mt-9"}>
                <h2 className="mb-3.5 text-[21px] font-semibold tracking-[-0.015em] text-ink">
                  {s.heading}
                </h2>
                <div className="text-[16px] leading-[1.75] text-ink-soft [&_a]:text-brass-deep [&_a]:underline [&_a]:underline-offset-2">
                  {s.body}
                </div>
              </div>
            ))}
            <div className="mt-11 pt-8 border-t border-line">
              <h2 className="mb-3 text-[21px] font-semibold tracking-[-0.015em] text-ink">
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
