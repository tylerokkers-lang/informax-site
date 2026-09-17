import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

const VERTICALS = [
  {
    num: "01",
    title: "Hotels",
    desc: "Guest information, facilities, dining, services and experiences, all in one place.",
  },
  {
    num: "02",
    title: "Resorts",
    desc: "Activities, restaurants, pools, spas, entertainment and full property information.",
  },
  {
    num: "03",
    title: "Serviced Apartments",
    desc: "Property information, check-in instructions, facilities and local recommendations.",
  },
  {
    num: "04",
    title: "Boutique Hotels",
    desc: "A beautifully branded digital extension of the hotel's personality.",
  },
];

export default function Verticals() {
  return (
    <section id="for-hotels" className="scroll-mt-24 bg-panel border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <Reveal className="mb-16 max-w-xl md:mb-20">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            Built For Hospitality
          </span>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-[-0.01em] text-[clamp(28px,3.6vw,44px)] text-ink">
            Built for hospitality. <span className="italic text-brass-deep">Not adapted for it.</span>
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 border-t border-line md:grid-cols-2">
          {VERTICALS.map((v, i) => (
            <RevealStaggerItem
              key={v.title}
              className={`border-b border-line py-8 md:py-10 ${
                i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"
              }`}
            >
              <span className="mb-4 block font-serif-display text-[15px] italic text-brass-deep">
                {v.num}
              </span>
              <h3 className="mb-2.5 text-[19px] font-semibold text-ink">
                {v.title}
              </h3>
              <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-ink-mute">
                {v.desc}
              </p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
