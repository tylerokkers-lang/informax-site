import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

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
    <section
      id="for-hotels"
      className="scroll-mt-24 bg-panel border-y border-line py-24 md:py-32"
    >
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Built For Hospitality</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            Built for hospitality. <Em>Not adapted for it.</Em>
          </h2>
          <p className="text-ink-mute text-[17px] leading-relaxed">
            Informax is designed around the specific needs of hotels and
            hospitality businesses, not retrofitted from a generic
            directory product.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl border border-line bg-line overflow-hidden">
          {VERTICALS.map((v) => (
            <RevealStaggerItem
              key={v.title}
              className="bg-panel px-8 py-10 transition-colors duration-300 hover:bg-paper"
            >
              <span className="font-serif-display italic text-[15px] text-brass-deep block mb-6">
                {v.num}
              </span>
              <h3 className="text-lg font-semibold text-ink mb-2.5">
                {v.title}
              </h3>
              <p className="text-sm text-ink-mute leading-relaxed">{v.desc}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
