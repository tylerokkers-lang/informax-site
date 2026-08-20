import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const EXAMPLES = [
  {
    kind: "Website Concept",
    name: "Aldergate & Marsh",
    sub: "Professional Services",
    desc: "A confident, editorial website concept for a fictional advisory firm.",
    visual: (
      <div className="rounded-lg overflow-hidden bg-white border border-line-soft">
        <div className="flex items-center gap-1.5 border-b border-line-soft px-2.5 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          <span className="h-1.5 w-1.5 rounded-full bg-brass-light" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <div className="h-2 w-2/3 rounded-full bg-ink/70" />
          <div className="h-2 w-1/2 rounded-full bg-ink/40" />
          <div className="mt-1 grid grid-cols-2 gap-1.5">
            <div className="h-8 rounded bg-brass/15" />
            <div className="h-8 rounded bg-paper-alt" />
          </div>
        </div>
      </div>
    ),
  },
  {
    kind: "Digital Brochure Concept",
    name: "Selwyn Property Group",
    sub: "Property Brochure",
    desc: "A tablet-first brochure concept for showcasing a development.",
    visual: (
      <div className="rounded-lg overflow-hidden bg-white border border-line-soft p-3 flex flex-col gap-2">
        <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-coral-deep">
          Brochure
        </span>
        <div className="h-2 w-3/4 rounded-full bg-ink/70" />
        <div className="h-10 rounded bg-gradient-to-br from-coral-light/50 to-brass-light/25" />
        <div className="h-1.5 w-full rounded-full bg-ink-mute/25" />
      </div>
    ),
  },
  {
    kind: "Digital Directory Concept",
    name: "The Exchange",
    sub: "Office & Venue Directory",
    desc: "A tap-to-access directory concept for a multi-tenant office building.",
    visual: (
      <div className="rounded-lg overflow-hidden bg-white border border-line-soft p-3 flex flex-col gap-1.5">
        {["Reception", "Meeting Rooms", "Café"].map((r) => (
          <div
            key={r}
            className="flex items-center gap-2 rounded-md border border-line-soft px-2 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brass shrink-0" />
            <span className="text-[9px] font-semibold text-ink-soft">{r}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function ExamplesTeaser() {
  return (
    <section className="bg-panel border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>What This Could Look Like</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.15] tracking-tight text-[clamp(28px,3.6vw,44px)] text-ink mb-4">
            A sense of the <Em>range.</Em>
          </h2>
          <p className="text-ink-mute text-[17px] leading-relaxed">
            We&rsquo;re building out a full portfolio of client work. In the
            meantime, here are a few concept explorations — clearly not real
            client projects — that show the kind of range we work across.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {EXAMPLES.map((ex) => (
            <RevealStaggerItem
              key={ex.name}
              className="rounded-2xl border border-line bg-paper p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="rounded-full border border-line px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-mute">
                  Concept
                </span>
                <span className="text-[11px] font-semibold text-brass-deep">
                  {ex.kind}
                </span>
              </div>
              {ex.visual}
              <h4 className="font-serif-display text-[17px] font-medium text-ink mt-5 mb-1">
                {ex.name}
              </h4>
              <div className="text-[12px] text-ink-mute mb-2">{ex.sub}</div>
              <p className="text-[13.5px] text-ink-mute leading-relaxed">
                {ex.desc}
              </p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
