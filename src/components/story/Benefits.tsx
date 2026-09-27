import { Reveal } from "@/components/Reveal";

const GROUPS = [
  {
    title: "For your guests",
    items: [
      "Nothing to download. A tap or a scan opens it.",
      "Always the current version, never last season’s.",
      "The right information at the moment they need it.",
    ],
  },
  {
    title: "For your Hotel",
    items: [
      "Update once. Every Touch Point follows.",
      "No reprinting, and nothing installed to replace.",
      "Your team stays in control of what guests see.",
    ],
  },
];

/** What changes for the guest and for the Hotel. Two short lists. */
export default function Benefits() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
      {GROUPS.map((g, gi) => (
        <Reveal key={g.title} delay={gi * 0.08}>
          <h3 className="font-serif-display text-[24px] text-ink md:text-[28px]">{g.title}</h3>
          <ul className="mt-6 border-t border-line">
            {g.items.map((item) => (
              <li key={item} className="border-b border-line py-5 text-[17px] leading-snug text-ink-soft md:text-[19px]">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
