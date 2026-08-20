import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const THEMES = [
  {
    label: "Luxury Hotel",
    brand: "The Aldwyn",
    sub: "Est. London",
    header: "bg-gradient-to-br from-[#1c1913] to-[#2b2617] text-[#f2e4c9]",
    rows: ["Fine Dining", "The Cellar Bar", "Private Spa", "Turndown Service"],
    rowStyle: "text-[#3a3327]",
    rowBg: ["bg-[#f6f1e7]", "bg-[#fbf8f2]"],
    desc: "Reserved and editorial, brass-on-charcoal tones built for a five-star address.",
  },
  {
    label: "Boutique Hotel",
    brand: "Maren House",
    sub: "Independent · Coastal",
    header: "bg-gradient-to-br from-[#7a4632] to-[#a9613f] text-[#fdf1e8]",
    rows: ["Rooftop Terrace", "Studio Rooms", "Local Guides", "Late Checkout"],
    rowStyle: "text-[#5c3a2c]",
    rowBg: ["bg-[#fbeee4]", "bg-[#fff8f3]"],
    desc: "Warm terracotta tones with personality, a true extension of the brand.",
  },
  {
    label: "Resort",
    brand: "Isla Bay Resort",
    sub: "All-Inclusive",
    header: "bg-gradient-to-br from-[#123832] to-[#1f5a4f] text-[#e6f5f0]",
    rows: ["Beach Club", "Water Sports", "Kids' Club", "Evening Entertainment"],
    rowStyle: "text-[#1c4740]",
    rowBg: ["bg-[#eaf5f2]", "bg-[#f6fbfa]"],
    desc: "Coastal teal and sand tones with energetic, activity-first navigation.",
  },
];

export default function Showcase() {
  return (
    <section className="bg-panel border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Custom-Built, Every Time</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            Not another <Em>generic hotel app.</Em>
          </h2>
          <p className="text-ink-mute text-[17px] leading-relaxed">
            Informax digital directories are designed around your property
            rather than forcing your hotel into someone else&rsquo;s
            template.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {THEMES.map((theme) => (
            <RevealStaggerItem
              key={theme.label}
              className="rounded-3xl border border-line bg-paper p-7"
            >
              <div className="text-xs font-bold uppercase tracking-[0.08em] text-ink-mute mb-5">
                {theme.label}
              </div>
              <div className="overflow-hidden rounded-2xl border border-line">
                <div className={`px-5 pt-5 pb-4 text-center ${theme.header}`}>
                  <div className="font-serif-display text-[15px] font-medium">
                    {theme.brand}
                  </div>
                  <div className="mt-1 text-[9.5px] uppercase tracking-[0.1em] opacity-70">
                    {theme.sub}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 bg-white p-3">
                  {theme.rows.map((row, i) => (
                    <div
                      key={row}
                      className={`flex h-[30px] items-center rounded-lg border border-line-soft px-2.5 text-[10.5px] font-semibold ${theme.rowStyle} ${theme.rowBg[i % 2]}`}
                    >
                      {row}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-[13.5px] text-ink-mute leading-relaxed">
                {theme.desc}
              </p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
