import { Badge, ContentKindTile } from "./ui";
import { SPA, SPACE_URL } from "./data";

/**
 * A single real-looking Space card that sits quietly in the hero: the
 * hotel above it is the physical property, this is the Cloud that runs it.
 * Static by design; the full story plays further down the page.
 */
export default function HeroSpaceChip() {
  return (
    <div
      className="ixp ixp-enter w-[268px] rounded-[20px] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.09),0_30px_60px_-24px_rgba(2,6,14,0.8)] backdrop-blur-md"
      style={{ animationDelay: "1.4s", animationFillMode: "backwards", background: "rgba(11,21,36,0.86)" }}
      aria-hidden
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[1.25rem] leading-snug">{SPA.name}</h3>
        <Badge>Live</Badge>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <ContentKindTile kind="website" size={36} />
        <div className="min-w-0">
          <p className="text-[12px] text-ix-dim">Guests currently see</p>
          <p className="truncate text-[14px] text-ix-cream">{SPA.web}</p>
        </div>
      </div>
      <code className="mt-4 block truncate font-mono text-[12px] text-ix-dim">{SPACE_URL}</code>
    </div>
  );
}
