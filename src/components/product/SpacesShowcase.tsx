import { Fragment } from "react";
import { Badge, ContentKindTile, NewSpaceButton, SpaceCard } from "./ui";
import { HOTEL, SPACE_CARDS } from "./data";

/**
 * A hotel's Spaces as the real app shows them. Desktop and tablet: the
 * app's Space cards in a grid. Phones: every Space at once as compact rows
 * (name, status, what guests see, Access Points) so the whole idea
 * is visible without swiping.
 */
export default function SpacesShowcase() {
  return (
    <div
      className="ixp select-none overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.6)]"
      role="img"
      aria-label={`Informax Cloud Spaces for ${HOTEL.name}: ${SPACE_CARDS.map((c) => c.name).join(", ")}. Each connects to its own Access Points.`}
    >
      <div className="px-4 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-9 lg:px-10" aria-hidden>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 px-1 sm:mb-7 sm:px-0">
          <div>
            <p className="ixp-label mb-1.5">{HOTEL.name}</p>
            <h2 className="text-[1.75rem] leading-[1.1] sm:text-[2.4rem]">Spaces</h2>
          </div>
          <span className="hidden sm:inline-flex">
            <NewSpaceButton />
          </span>
        </div>

        {/* Phones: all six, compact */}
        <ul className="space-y-2.5 sm:hidden">
          {SPACE_CARDS.map((c) => (
            <li key={c.id} className="ixp-card p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.0625rem] leading-snug">{c.name}</h3>
                <span className="ixp-tabular shrink-0 text-[12px] text-ix-dim">{c.touchPoints} Access Points</span>
              </div>
              <div className="mt-1.5">
                <Badge>Live</Badge>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ContentKindTile kind={c.kind} size={32} />
                <p className="min-w-0 flex-1 text-[13.5px] leading-snug text-ix-cream">
                  {c.file.split("/").map((part, i, all) => (
                    <Fragment key={i}>
                      {part}
                      {i < all.length - 1 && (
                        <>
                          /<wbr />
                        </>
                      )}
                    </Fragment>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Tablet and desktop: the app's Space cards */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {SPACE_CARDS.map((c) => (
            <SpaceCard key={c.id} space={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
