import { SPACES } from "@/lib/spaces";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

/** Every Space with what guests find in it. Light surface variant by default. */
export default function SpacesGrid({ dark = false }: { dark?: boolean }) {
  return (
    <RevealStagger
      className={`grid border-l border-t sm:grid-cols-2 lg:grid-cols-3 ${dark ? "border-white/10" : "border-line"}`}
    >
      {SPACES.map((sp, i) => (
        <RevealStaggerItem
          key={sp.id}
          className={`group border-b border-r p-7 md:p-9 ${dark ? "border-white/10" : "border-line"}`}
        >
          <div className="mb-14 flex items-center justify-between">
            <span
              className={`font-serif-display text-[15px] italic ${dark ? "text-brass-light" : "text-brass-deep"}`}
            >
              0{i + 1}
            </span>
            <sp.icon size={18} className={dark ? "text-cream-mute" : "text-ink-mute"} />
          </div>
          <h3 className={`font-serif-display text-[30px] leading-none ${dark ? "text-white" : "text-ink"}`}>
            {sp.name}
          </h3>
          <ul className="mt-6">
            {sp.holds.map((h) => (
              <li
                key={h}
                className={`border-t py-2.5 text-[14px] ${
                  dark ? "border-white/10 text-cream-mute" : "border-line text-ink-mute"
                }`}
              >
                {h}
              </li>
            ))}
          </ul>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
