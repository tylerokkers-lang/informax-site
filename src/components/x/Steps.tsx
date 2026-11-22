import { FilePlus2, LayoutGrid } from "lucide-react";
import { PhoneFrame } from "@/components/x/Devices";
import ScanPoint from "@/components/x/ScanPoint";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";

/** The four steps from setup to a guest's phone, each with a small picture of itself. */
export const STEPS = [
  {
    title: "Map your property",
    body: "Add your Spaces in Informax Cloud: Bedrooms, Spa, Restaurant, Reception. We can set it up with you.",
    visual: "spaces",
  },
  {
    title: "Place your Scan Points",
    body: "One Scan Point for each purpose, printed as often as you need, on tables, in rooms and at the desk.",
    visual: "plate",
  },
  {
    title: "Publish your content",
    body: "Upload a PDF or link a page of your website. Preview it, publish it, change it whenever you like.",
    visual: "publish",
  },
  {
    title: "Guests scan and see",
    body: "Their phone's camera opens the current version straight away. No app, no account, no download.",
    visual: "phone",
  },
] as const;

function Visual({ kind }: { kind: (typeof STEPS)[number]["visual"] }) {
  if (kind === "plate")
    return (
      <div className="flex h-full items-end justify-center gap-3 pb-3">
        <ScanPoint decorative place="Table 12" sub="Menu" finish="ivory" className="w-[36%]" />
        <ScanPoint decorative place="Suite 4" sub="Your stay" finish="navy" className="w-[36%] -translate-y-3" />
      </div>
    );
  if (kind === "spaces")
    return (
      <div className="flex h-full flex-col justify-center gap-2 px-2">
        {["Bedrooms", "Spa", "Restaurant", "Reception"].map((s, n) => (
          <div key={s} className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]" style={{ marginLeft: `${n * 6}%` }}>
            <LayoutGrid size={15} className="text-brass-deep" aria-hidden />
            <span className="text-[13px] font-semibold text-ink">{s}</span>
          </div>
        ))}
      </div>
    );
  if (kind === "publish")
    return (
      <div className="flex h-full flex-col justify-center gap-3 px-2">
        <div className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-3 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
          <FilePlus2 size={18} className="text-brass-deep" aria-hidden />
          <span className="text-[13px] font-semibold text-ink">Dinner menu, autumn.pdf</span>
        </div>
        <div className="flex items-center justify-center rounded-[12px] bg-brass-deep py-2.5 text-[13px] font-semibold text-white">Publish</div>
        <p className="text-center text-[12px] font-medium text-moss">Published. It is live now.</p>
      </div>
    );
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute left-1/2 top-3 w-[44%] -translate-x-1/2">
        <PhoneFrame screens={["guestMenuAfter"]} sizes="160px" />
      </div>
    </div>
  );
}

export default function Steps({ level = "h3" }: { level?: "h2" | "h3" }) {
  const H = level;
  return (
    <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s, i) => (
        <RevealStaggerItem key={s.title} className="flex flex-col rounded-[26px] bg-paper-alt p-5">
          <div aria-hidden className="h-[190px] rounded-[18px] bg-[linear-gradient(180deg,#f7f8fa,#eceff3)] p-3">
            <Visual kind={s.visual} />
          </div>
          <div className="px-2 pb-3 pt-6">
            <p className="x-num text-[13px] font-semibold text-brass-deep">Step {i + 1}</p>
            <H className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-ink">{s.title}</H>
            <p className="mt-2 text-[15.5px] leading-relaxed text-ink-mute">{s.body}</p>
          </div>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
