import { Reveal } from "@/components/Reveal";
import { BtnGhost, BtnPrimary, Eyebrow, EmLight } from "@/components/ui";

const META = [
  {
    title: "Free walkthrough",
    desc: "A short call to see how a directory would look for your property.",
  },
  {
    title: "Built around your brand",
    desc: "Every directory is designed for your property, not a shared template.",
  },
  {
    title: "The tag stays, content evolves",
    desc: "Update hours, offers and recommendations without new hardware.",
  },
];

export default function FinalCta() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-line-dark bg-gradient-to-br from-charcoal-900 to-charcoal-950 px-6 py-16 md:px-10 md:py-20 text-center text-cream">
            <div className="pointer-events-none absolute -bottom-64 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(111,224,172,0.16),transparent_70%)] blur-[20px]" />

            <div className="relative">
              <Eyebrow tone="dark" center>
                Ready When You Are
              </Eyebrow>
              <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(30px,4vw,46px)] text-white mb-4">
                Give guests the <EmLight>full picture.</EmLight>
              </h2>
              <p className="text-cream-mute text-[17px] max-w-[520px] mx-auto mb-9">
                Tell us about your property, and we&rsquo;ll help design a
                digital directory that puts everything you offer one tap
                away.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-11">
                <BtnPrimary href="/enquire">Start the Conversation</BtnPrimary>
                <BtnGhost href="/#digital-directory" tone="dark">
                  See Informax in Action
                </BtnGhost>
              </div>

              <div className="flex flex-wrap justify-center gap-10 border-t border-line-dark pt-9">
                {META.map((item) => (
                  <div key={item.title} className="max-w-[210px]">
                    <h5 className="text-[13.5px] font-semibold text-brass-light mb-1.5">
                      {item.title}
                    </h5>
                    <p className="text-[13px] text-cream-mute leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
