import { Badge, HotelTabs, InteractionTile, MoreIcon } from "./ui";
import { PlusIcon } from "./icons";
import { HOTEL } from "./data";

type Row = {
  location: string;
  kind: "touch" | "scan";
  status: "Active" | "Paused";
  deployed: number;
  space: string;
  interactions: number;
};

/** A Hotel's Touch Points as Informax Cloud lists them. Illustrative data. */
const ROWS: Row[] = [
  { location: "Spa Reception", kind: "touch", status: "Active", deployed: 1, space: "Spa", interactions: 218 },
  { location: "Guest Rooms", kind: "scan", status: "Active", deployed: 400, space: "Guest Directory", interactions: 642 },
  { location: "Restaurant Tables", kind: "touch", status: "Active", deployed: 40, space: "Restaurants", interactions: 1184 },
  { location: "Meeting Room Doors", kind: "touch", status: "Active", deployed: 9, space: "Meetings & Events", interactions: 146 },
  { location: "Gym Studio", kind: "scan", status: "Paused", deployed: 1, space: "Gym", interactions: 96 },
  { location: "Pool Terrace", kind: "scan", status: "Active", deployed: 1, space: "Spa", interactions: 37 },
];

const n = (v: number) => v.toLocaleString("en-GB");
/** The app's own wording (deploymentLabel / interactions in Informax Cloud). */
const deployed = (q: number) => (q === 1 ? "1 deployed" : `Shared · ${n(q)} deployed`);
const interactions = (c: number) => `${n(c)} interaction${c === 1 ? "" : "s"} · all time`;

export default function TouchPointsShowcase() {
  return (
    <div
      className="ixp select-none overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.6)]"
      role="img"
      aria-label={`Informax Cloud, ${HOTEL.name}, Touch Points: ${ROWS.map((r) => `${r.location}, connected to ${r.space}`).join("; ")}.`}
    >
      <div className="px-4 pb-4 pt-6 sm:px-8 sm:pb-6 sm:pt-9 lg:px-10" aria-hidden>
        <div className="mb-6 flex items-end justify-between gap-4 px-1 sm:px-0">
          <div>
            <p className="ixp-label mb-1.5">{HOTEL.name}</p>
            <h2 className="text-[1.75rem] leading-[1.1] sm:text-[2.4rem]">Touch Points</h2>
          </div>
          {/* .ixp-btn sets its own display, so visibility lives on a wrapper. */}
          <span className="hidden sm:block">
            <span className="ixp-btn ixp-btn-primary">
              <PlusIcon size={16} />
              New Touch Point
            </span>
          </span>
        </div>
        <div className="hidden sm:block">
          <HotelTabs active="Touch Points" />
        </div>

        <ul className="divide-y divide-white/[0.06] px-1 sm:px-0">
          {ROWS.map((r) => (
            <li key={r.location} className={`flex items-center gap-3.5 py-4 ${r.status === "Paused" ? "opacity-70" : ""}`}>
              <InteractionTile kind={r.kind} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-medium text-ix-cream">{r.location}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ix-dim">
                  <span>{r.kind === "touch" ? "Informax Touch" : "Informax Scan"}</span>
                  <Badge tone={r.status === "Active" ? "positive" : "warn"}>{r.status}</Badge>
                  <span className="ixp-tabular">{deployed(r.deployed)}</span>
                </p>
                <p className="mt-0.5 text-[13px] text-ix-dim">
                  Connected to {r.space} · <span className="ixp-tabular">{interactions(r.interactions)}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-ix-muted">
                  <MoreIcon size={18} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
