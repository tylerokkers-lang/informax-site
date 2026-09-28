import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import AccessPoint, { type Colourway } from "./AccessPoint";

const WAYS: { colourway: Colourway; name: string }[] = [
  { colourway: "navy", name: "Informax Navy" },
  { colourway: "platinum", name: "Platinum" },
  { colourway: "stone", name: "Stone" },
  { colourway: "graphite", name: "Graphite" },
];

/** One structure, a small set of approved finishes. */
export default function Colourways() {
  return (
    <RevealStagger className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
      {WAYS.map((w) => (
        <RevealStaggerItem key={w.colourway} className="flex flex-col items-center">
          <AccessPoint place="Spa" colourway={w.colourway} size="md" className="max-sm:w-[140px]" />
          <p className="mt-5 text-[14px] font-medium text-ink-mute">{w.name}</p>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
