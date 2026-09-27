import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { SPACES } from "@/lib/spaces";
import TouchPoint from "./TouchPoint";

const STEPS = [
  {
    n: "01",
    title: "Create a Space",
    body: "Spa, Gym, Restaurant, Guest Directory or anywhere else.",
  },
  {
    n: "02",
    title: "Connect Touch Points",
    body: "Place Informax throughout your Hotel.",
  },
  {
    n: "03",
    title: "Change anytime",
    body: "Update what guests see from Informax Cloud.",
  },
];

function Visual({ i, dark }: { i: number; dark: boolean }) {
  if (i === 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {SPACES.slice(0, 4).map((s) => (
          <span key={s.id} className={`border px-3 py-1.5 text-[12px] ${dark ? "border-white/15 text-cream" : "border-line text-ink-soft"}`}>
            {s.name}
          </span>
        ))}
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="flex items-end gap-3">
        <TouchPoint label="Spa" size="sm" />
        <TouchPoint label="Gym" size="sm" />
        <TouchPoint label="Bar" size="sm" className="hidden sm:inline-block" />
      </div>
    );
  }
  return (
    <div className={`inline-flex items-center gap-3 border px-4 py-2.5 text-[12px] ${dark ? "border-white/15 text-cream" : "border-line text-ink-soft"}`}>
      Spa booking page
      <span className="bg-brass px-3 py-1 font-semibold text-white">Publish</span>
    </div>
  );
}

export default function HowSteps({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <RevealStagger className={`grid border-l border-t md:grid-cols-3 ${dark ? "border-white/10" : "border-line"}`}>
        {STEPS.map((st, i) => (
          <RevealStaggerItem key={st.n} className={`border-b border-r p-8 md:p-10 ${dark ? "border-white/10" : "border-line"}`}>
            <span className={`mb-10 block font-serif-display text-[15px] italic ${dark ? "text-brass-light" : "text-brass-deep"}`}>
              {st.n}
            </span>
            <h3 className={`font-serif-display text-[30px] leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>
              {st.title}
            </h3>
            <p className={`mt-4 max-w-[28ch] text-[15px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>
              {st.body}
            </p>
            <div className="mt-10">
              <Visual i={i} dark={dark} />
            </div>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
      <p className={`mt-10 max-w-[52ch] font-serif-display text-[clamp(20px,2.2vw,26px)] leading-snug ${dark ? "text-white" : "text-ink"}`}>
        The physical Touch Point stays in place.{" "}
        <span className={dark ? "text-cream-mute" : "text-ink-mute"}>
          The experience behind it can change whenever you want.
        </span>
      </p>
    </div>
  );
}
