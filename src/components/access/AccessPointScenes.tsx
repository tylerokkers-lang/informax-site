import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import AccessPoint, { type Colourway } from "./AccessPoint";

const SCENES: {
  place: string;
  where: string;
  colourway: Colourway;
  surface: string;
  glow: string;
  mount: "card" | "wall" | "stand";
  dark: boolean;
}[] = [
  {
    place: "Room 1001",
    where: "Bedside",
    colourway: "stone",
    surface: "bg-[linear-gradient(180deg,#f3eee6_0%,#e6ddcf_62%,#d9cdbb_62.2%,#d3c6b2_100%)]",
    glow: "bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,248,235,0.9),transparent_60%)]",
    mount: "card",
    dark: false,
  },
  {
    place: "Spa Reception",
    where: "Wall",
    colourway: "platinum",
    surface: "bg-[linear-gradient(180deg,#2c2f35_0%,#1b1d21_100%)]",
    glow: "bg-[radial-gradient(ellipse_at_50%_30%,rgba(223,227,234,0.16),transparent_62%)]",
    mount: "wall",
    dark: true,
  },
  {
    place: "The Terrace",
    where: "Table",
    colourway: "navy",
    surface: "bg-[linear-gradient(180deg,#e9e6e0_0%,#dcd7ce_64%,#7a5a41_64.2%,#5b412f_100%)]",
    glow: "bg-[radial-gradient(ellipse_at_70%_18%,rgba(255,255,255,0.85),transparent_58%)]",
    mount: "stand",
    dark: true,
  },
];

/**
 * The Access Point where it actually lives: a bedside card, a wall plate by
 * the Spa, a table stand on the Terrace. Materials are suggested, not
 * illustrated, so the object stays the hero.
 */
export default function AccessPointScenes() {
  return (
    <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
      {SCENES.map((s) => (
        <RevealStaggerItem key={s.place}>
          <figure className={`relative flex aspect-[5/4] items-center sm:aspect-[4/5] justify-center overflow-hidden rounded-[28px] ${s.surface}`}>
            <div className={`pointer-events-none absolute inset-0 ${s.glow}`} aria-hidden />
            <div className="relative flex flex-col items-center">
              {s.mount === "wall" ? (
                <div className="rounded-[34px] bg-[#0f1115]/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <AccessPoint place={s.place} colourway={s.colourway} size="md" />
                </div>
              ) : (
                <AccessPoint place={s.place} colourway={s.colourway} size="md" className="-rotate-[2deg]" />
              )}
              {s.mount === "stand" && (
                <span className="-mt-1 h-2.5 w-24 rounded-b-[10px] bg-[#0b1524] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.6)]" aria-hidden />
              )}
              {s.mount === "card" && <span className="mt-3 h-2 w-40 rounded-full bg-black/10 blur-[6px]" aria-hidden />}
            </div>
            <figcaption
              className={`absolute bottom-5 left-6 text-[13px] font-medium ${s.dark ? "text-white/70" : "text-ink-mute"}`}
            >
              {s.place} · {s.where}
            </figcaption>
          </figure>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
