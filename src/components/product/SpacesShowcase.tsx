import { NewSpaceButton, SpaceCard } from "./ui";
import { HOTEL, SPACE_CARDS } from "./data";

/**
 * A hotel's Spaces as the real app shows them: Space cards with status,
 * current content, Touch Point count and permanent URL. Static, and wide
 * enough on desktop to read as the product; on phones the cards scroll
 * sideways at real size instead of shrinking.
 */
export default function SpacesShowcase() {
  return (
    <div
      className="ixp select-none overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.6)]"
      role="img"
      aria-label={`Informax Cloud Spaces for ${HOTEL.name}: ${SPACE_CARDS.map((c) => c.name).join(", ")}. Each has its own permanent address.`}
    >
      <div className="px-5 pb-6 pt-7 sm:px-8 sm:pt-9 lg:px-10">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4" aria-hidden>
          <div>
            <p className="ixp-label mb-2">{HOTEL.name}</p>
            <h2 className="text-[2rem] leading-[1.1] sm:text-[2.4rem]">Spaces</h2>
          </div>
          <span className="hidden sm:inline-flex">
            <NewSpaceButton />
          </span>
        </div>
        <div
          className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3"
          aria-hidden
        >
          {SPACE_CARDS.map((c) => (
            <div key={c.id} className="w-[84%] shrink-0 snap-start sm:w-auto">
              <SpaceCard space={c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
