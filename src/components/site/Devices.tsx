import Image from "next/image";
import { SCREENS, type ScreenKey } from "@/lib/screens";

/**
 * A modern phone around a real screen. Several screens can be passed: they
 * are stacked and the `active` one crossfades in, so a demo can change what
 * the phone shows without moving the phone.
 */
export function Phone({
  screens,
  active = 0,
  className = "",
  sizes = "(min-width: 1024px) 320px, 70vw",
  priority = false,
  tone = "dark",
}: {
  screens: ScreenKey[];
  active?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`relative aspect-[390/844] rounded-[15%/7%] p-[3.2%] ${
        tone === "dark"
          ? "bg-[linear-gradient(150deg,#2c3340,#0c1018_60%)] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_80px_-30px_rgba(0,0,0,0.75)]"
          : "bg-[linear-gradient(150deg,#e9ecf1,#c7ccd4_60%)] shadow-[0_0_0_1px_rgba(11,21,36,0.08),0_40px_80px_-30px_rgba(11,21,36,0.45)]"
      } ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12.5%/5.8%] bg-white">
        {screens.map((key, i) => {
          const s = SCREENS[key];
          return (
            <Image
              key={`${key}-${i}`}
              src={s.src}
              alt={i === active ? s.alt : ""}
              aria-hidden={i === active ? undefined : true}
              fill
              sizes={sizes}
              priority={priority && i === active}
              className={`object-cover object-top transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[1.6%] h-[3.3%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      </div>
    </div>
  );
}

/** A quiet browser window around a real desktop screen. */
export function Browser({
  screen,
  className = "",
  sizes = "(min-width: 1180px) 1000px, 92vw",
  priority = false,
}: {
  screen: ScreenKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const s = SCREENS[screen];
  return (
    <figure
      className={`overflow-hidden rounded-[14px] bg-[#e9ecf1] shadow-[0_0_0_1px_rgba(11,21,36,0.08),0_50px_100px_-40px_rgba(6,10,18,0.55)] ${className}`}
    >
      <div className="flex h-8 items-center gap-1.5 px-3.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 h-4 flex-1 max-w-[220px] rounded-md bg-white/70" />
      </div>
      <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </figure>
  );
}
