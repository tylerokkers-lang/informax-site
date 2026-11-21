import { PhoneFrame } from "@/components/x/Devices";

/**
 * Three benefits, each with a picture of itself. Three columns on wide
 * screens; on phones a horizontal row that snaps card by card, so the
 * section costs one screen of scrolling rather than three.
 */
function Copies() {
  const rooms = ["101", "102", "103", "104", "105", "201", "202", "203", "204", "205", "301", "302", "303", "304", "305"];
  return (
    <div className="flex h-full items-center justify-center bg-charcoal-950 px-6">
      <ul className="grid w-full max-w-[250px] grid-cols-5 gap-1.5">
        {rooms.map((r, n) => (
          <li key={r} className="x-lit flex aspect-[3/4] flex-col justify-between rounded-[8px] p-1.5" style={{ ["--d" as string]: `${0.6 + n * 0.05}s` }}>
            <span className="x-lit-dot block h-1.5 w-1.5 rounded-full" />
            <span className="x-num text-[9px] font-semibold text-white/70">{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Timeline() {
  return (
    <div className="flex h-full flex-col justify-center bg-[linear-gradient(180deg,#f3f5f8,#e9edf2)] px-6">
      <div className="x-num flex justify-between text-[11px] font-medium text-ink-mute">
        <span>09:00</span>
        <span>14:00</span>
        <span>18:00</span>
        <span>21:00</span>
      </div>
      <div className="relative mt-2.5 h-12 rounded-[10px] bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
        <div className="absolute inset-y-1.5 left-1.5 right-[59%] flex items-center overflow-hidden whitespace-nowrap rounded-[7px] bg-ink/6 px-2.5 text-[12px] font-medium text-ink-soft">Treatments</div>
        <div className="absolute inset-y-1.5 left-[42%] right-[25.5%] flex items-center overflow-hidden whitespace-nowrap rounded-[7px] bg-brass-deep px-2.5 text-[12px] font-semibold text-white">Offer</div>
        <div className="absolute inset-y-1.5 left-[75.5%] right-1.5 flex items-center overflow-hidden whitespace-nowrap rounded-[7px] bg-ink/6 px-2.5 text-[12px] font-medium text-ink-soft">Usual</div>
      </div>
      <p className="mt-3 text-[12px] text-ink-mute">Live at 14:00. Gone at 18:00, by itself.</p>
    </div>
  );
}

function Guest() {
  return (
    <div className="relative h-full overflow-hidden bg-[linear-gradient(180deg,#efe9df,#e4dccd)]">
      <div className="absolute left-1/2 top-6 w-[46%] max-w-[170px] -translate-x-1/2">
        <PhoneFrame screens={["guestMenuAfter"]} sizes="170px" />
      </div>
    </div>
  );
}

const BENEFITS = [
  {
    visual: <Copies />,
    title: "Print once. Update everywhere.",
    body: "One Scan Point in every room or on every table. Publish a change and every copy shows it at once.",
  },
  {
    visual: <Timeline />,
    title: "Right for the moment.",
    body: "Temporary and scheduled content ends on time by itself. Earlier versions are always one tap away.",
  },
  {
    visual: <Guest />,
    title: "Nothing for guests to install.",
    body: "The phone's camera opens your menu or directory in a moment. No app, no account, no waiting.",
  },
];

export default function Benefits() {
  return (
    <ul className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
      {BENEFITS.map((b) => (
        <li key={b.title} className="w-[80vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
          <div aria-hidden className="h-[200px] overflow-hidden rounded-[24px] md:h-[230px]">
            {b.visual}
          </div>
          <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-ink">{b.title}</h3>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-mute">{b.body}</p>
        </li>
      ))}
    </ul>
  );
}
