import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const POINTS = [
  {
    n: "01",
    title: "One edit, live everywhere",
    desc: "Change an opening time, launch an offer, update a menu. It's live the moment you save it.",
  },
  {
    n: "02",
    title: "No hardware to touch",
    desc: "The tag on the wall never changes. What appears behind it always can.",
  },
  {
    n: "03",
    title: "Fewer questions at the desk",
    desc: "The things guests ask every day are answered before they need to ask.",
  },
];

export default function HotelBenefit() {
  return (
    <section className="bg-charcoal-950 py-24 text-cream md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-light">
              For The Property
            </span>
            <h2 className="max-w-[14ch] font-serif-display font-medium leading-[1.1] tracking-[-0.01em] text-[clamp(28px,3.8vw,46px)] text-white">
              Control it centrally. Guests feel it instantly.
            </h2>
          </Reveal>

          <RevealStagger className="flex flex-col">
            {POINTS.map((p, i) => (
              <RevealStaggerItem
                key={p.n}
                className={`py-7 ${i !== 0 ? "border-t border-white/10" : ""}`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-serif-display text-[15px] italic text-brass-light">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-[18px] font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="max-w-[46ch] text-[15px] leading-relaxed text-cream-mute">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
