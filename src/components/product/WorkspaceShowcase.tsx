import { AppSidebar, Badge, HotelHeader, HotelTabs, StatCardView } from "./ui";
import { HOTEL } from "./data";

/** People with access to the Hotel, as the People & access card shows them. Illustrative. */
const PEOPLE = [
  { email: `general.manager@${HOTEL.domain}`, status: "Active" as const },
  { email: `frontoffice@${HOTEL.domain}`, status: "Active" as const },
  { email: `spa@${HOTEL.domain}`, status: "Active" as const },
  { email: `events@${HOTEL.domain}`, status: "Invitation pending" as const },
];

/**
 * A Hotel's workspace in Informax Cloud: the Hotel header, its tabs, the
 * headline figures and who has access. Wording follows the production app.
 */
export default function WorkspaceShowcase() {
  return (
    <div
      className="ixp flex select-none overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(2,6,14,0.6)]"
      role="img"
      aria-label={`Informax Cloud, the ${HOTEL.name} workspace: Overview with interactions over 30 days and the people who have access.`}
    >
      <div className="hidden xl:flex">
        <AppSidebar active="Hotels" />
      </div>
      <div className="min-w-0 flex-1 px-5 pb-8 pt-7 sm:px-9 sm:pt-10" aria-hidden>
        <HotelHeader hotel={HOTEL.name} place={HOTEL.place} />
        <div className="hidden sm:block">
          <HotelTabs active="Overview" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.25fr]">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <StatCardView label="Interactions (30 days)" value="3,455" emphasis />
            <StatCardView label="People with access" value={String(PEOPLE.length)} />
          </div>
          <div className="ixp-card p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="ixp-label">People &amp; access</p>
              <span className="text-[13px] text-ix-bright">Invite someone</span>
            </div>
            <ul className="space-y-4">
              {PEOPLE.map((p) => (
                <li key={p.email} className="text-[14px]">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-ix-cream">{p.email}</p>
                    <Badge tone={p.status === "Active" ? "positive" : "warn"}>{p.status}</Badge>
                  </div>
                  <p className="mt-1 text-[12px] text-ix-muted">
                    {p.status === "Active" ? "Send password reset" : "Resend invitation"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
