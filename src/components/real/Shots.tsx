import { screen, type ScreenName } from "@/lib/screens";

/** A real Informax Cloud screen, shown in a quiet window frame. Fictional data only. */
export function AppShot({
  name,
  alt,
  className = "",
  priority = false,
  crop,
  offset = 0,
}: {
  name: ScreenName;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Show only the top part of a tall screen, as height / width. */
  crop?: number;
  /** With crop: where the visible slice starts, as a fraction of the screen's height. */
  offset?: number;
}) {
  const s = screen(name);
  const visible = crop ? Math.min(crop, (s.h / s.w) * (1 - offset)) : undefined;
  return (
    <figure
      className={`overflow-hidden rounded-[18px] bg-white shadow-[0_30px_80px_-30px_rgba(7,20,42,0.45),0_0_0_1px_rgba(11,21,36,0.08)] ${className}`}
    >
      <div className="relative w-full overflow-hidden" style={visible ? { aspectRatio: `1 / ${visible}` } : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.src}
          alt={alt}
          width={s.w}
          height={s.h}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={crop ? "absolute left-0 top-0 block h-auto w-full" : "block h-auto w-full"}
          style={crop && offset ? { transform: `translateY(-${offset * 100}%)` } : undefined}
        />
      </div>
    </figure>
  );
}

/** A real guest screen on a phone. */
export function PhoneShot({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: ScreenName;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const s = screen(name);
  return (
    <div
      className={`relative mx-auto w-full max-w-[250px] overflow-hidden rounded-[38px] border-[7px] border-[#0b1524] bg-[#0b1524] shadow-[0_30px_70px_-25px_rgba(7,20,42,0.55)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src}
        alt={alt}
        width={s.w}
        height={s.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full rounded-[30px]"
      />
    </div>
  );
}
