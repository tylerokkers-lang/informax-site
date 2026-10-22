import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import AccessPoint from "@/components/access/AccessPoint";
import Photo from "@/components/site/Photo";
import { Phone } from "@/components/site/Devices";
import { Reveal } from "@/components/Reveal";
import { DEMO_CTA } from "@/lib/constants";
import type { PhotoKey } from "@/lib/photography";

/** Section heading: an eyebrow in Cloud blue, a short headline with a quieter second half. */
export function Heading({
  eyebrow,
  title,
  soft,
  body,
  dark = false,
  center = false,
  as: H = "h2",
  id,
}: {
  eyebrow: string;
  title: string;
  soft?: string;
  body?: ReactNode;
  dark?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`mb-4 text-[15px] font-semibold ${dark ? "text-brass-light" : "text-brass-deep"}`}>{eyebrow}</p>
      <H id={id} className={`text-balance font-serif-display text-[clamp(34px,4.6vw,58px)] leading-[1.03] ${dark ? "text-white" : "text-ink"}`}>
        {title} {soft ? <span className={dark ? "text-cream-mute" : "text-ink-mute"}>{soft}</span> : null}
      </H>
      {body ? <div className={`mt-6 text-[18px] leading-relaxed ${dark ? "text-white/72" : "text-ink-soft"} ${center ? "mx-auto max-w-[40rem]" : "max-w-[40rem]"}`}>{body}</div> : null}
    </Reveal>
  );
}

const HOW = [
  {
    n: "1",
    title: "Place your Codes",
    body: "We help bring your information to the places your customers need it.",
    detail: "On tables, in rooms, by the vanity, at the spa. Each Code is permanent.",
  },
  {
    n: "2",
    title: "Manage your content",
    body: "Update menus, directories and guest information from Informax Cloud.",
    detail: "Upload a PDF or link your website, from a computer or your phone.",
  },
  {
    n: "3",
    title: "Keep everything current",
    body: "Your changes become available through the same permanent Codes. No reprinting required.",
    detail: "Need something just for today? Set an end time and it goes back by itself.",
  },
];

/** The product in three plain steps, with the object, the app and the guest's phone. */
export function HowItWorksSteps({ dark = false, level = "h3" }: { dark?: boolean; /** h2 when the steps sit directly under the page h1. */ level?: "h2" | "h3" }) {
  const H = level;
  return (
    <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
      {HOW.map((s, i) => (
        <li key={s.n}>
          <Reveal delay={i * 0.08} className={`flex h-full flex-col overflow-hidden rounded-[24px] ${dark ? "bg-white/[0.04]" : "bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06)]"}`}>
            <div className={`relative flex h-[260px] items-end justify-center overflow-hidden ${dark ? "bg-white/[0.03]" : "bg-paper-alt"}`}>
              {i === 0 ? (
                <div className="mb-10 flex origin-bottom items-end gap-3 max-[359px]:scale-[0.8] sm:gap-4">
                  <AccessPoint place="Table 12" sub="Menu" size="sm" />
                  <AccessPoint place="Room 401" sub="Guest Directory" size="sm" colourway="platinum" className="-translate-y-4" />
                  <AccessPoint place="Spa" sub="Treatments" size="sm" colourway="stone" />
                </div>
              ) : i === 1 ? (
                <Phone screens={["cloudMenuReplace"]} tone={dark ? "dark" : "light"} className="-mb-24 w-[170px]" sizes="170px" />
              ) : (
                <Phone screens={["guestMenuAfter"]} tone={dark ? "dark" : "light"} className="-mb-24 w-[170px]" sizes="170px" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-7">
              <span className={`text-[13px] font-semibold ${dark ? "text-brass-light" : "text-brass-deep"}`}>Step {s.n}</span>
              <H className={`mt-2 font-serif-display text-[24px] leading-tight ${dark ? "text-white" : "text-ink"}`}>{s.title}</H>
              <p className={`mt-3 text-[16px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{s.body}</p>
              <p className={`mt-3 text-[14.5px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>{s.detail}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

const USES: { group: string; photo: PhotoKey; items: string[]; future?: boolean }[] = [
  { group: "Restaurants", photo: "signatureDish", items: ["Menus", "Daily specials", "Drinks and wine lists", "Opening information", "Limited-time menus"] },
  { group: "Hotels", photo: "hotelSuite", items: ["Guest directories", "Restaurant hours", "Room service menus", "Spa treatment menus", "Guest offers and experiences"] },
  {
    group: "And beyond",
    photo: "spaTreatment",
    items: ["Spas and wellness", "Bars and lounges", "Event and meeting spaces", "Anywhere information changes"],
    future: true,
  },
];

/** What people can use it for, as three visual groups rather than a checklist. */
export function Possibilities() {
  return (
    <section className="bg-paper py-24 md:py-32" aria-labelledby="possibilities-h">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div>
          <Heading
            id="possibilities-h"
            eyebrow="More possibilities"
            title="One platform."
            soft="So many possibilities."
            body="Wherever information changes, Informax helps you keep it current."
          />
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {USES.map((u, i) => (
            <Reveal key={u.group} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
                <Photo slot={u.photo} className="aspect-[4/3]" sizes="(min-width: 768px) 380px, 100vw" />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif-display text-[24px] text-ink">{u.group}</h3>
                  <ul className="mt-4 space-y-2">
                    {u.items.map((t) => (
                      <li key={t} className="flex items-center gap-3 text-[15.5px] text-ink-soft">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                  {u.future ? (
                    <p className="mt-5 text-[13.5px] leading-relaxed text-ink-mute">
                      The same Codes and the same Informax Cloud work wherever guests need current information. Ask us about yours.
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The closing invitation on every page. */
export function DemoCta({
  title = "See what Informax could do for you.",
  body = "We will show you Informax Cloud with your own menus or guest information, and talk through where your Codes would go.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brass/20 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-8xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] text-balance font-serif-display text-[clamp(36px,5vw,64px)] leading-[1.02] text-white">{title}</h2>
          <p className="mx-auto mt-6 max-w-[38rem] text-[18px] leading-relaxed text-white/72">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary">
              {DEMO_CTA.label}
            </Link>
            <Link href="/how-it-works" className="ix-btn ix-btn-secondary-dark">
              How it works
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A two-column story block: words on one side, a real screen or photograph on the other. */
export function Story({
  eyebrow,
  title,
  soft,
  children,
  media,
  flip = false,
  tone = "light",
  id,
}: {
  eyebrow: string;
  title: string;
  soft?: string;
  children: ReactNode;
  media: ReactNode;
  flip?: boolean;
  tone?: "light" | "alt" | "dark";
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={`scroll-mt-20 py-24 md:py-32 ${dark ? "bg-charcoal-950 text-cream" : tone === "alt" ? "bg-paper-alt" : "bg-paper"}`}>
      <div className={`mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20`}>
        <div className={flip ? "lg:order-2" : undefined}>
          <Heading eyebrow={eyebrow} title={title} soft={soft} dark={dark} />
          <Reveal delay={0.06}>
            <div className={`mt-6 max-w-[34rem] space-y-4 text-[17.5px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{children}</div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className={flip ? "lg:order-1" : undefined}>
          {media}
        </Reveal>
      </div>
    </section>
  );
}

/** A plain text link with an arrow. */
export function MoreLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`ix-link ${dark ? "text-brass-light hover:text-white" : "text-brass-deep hover:text-ink"}`}>
      {children} <ArrowRight size={16} aria-hidden />
    </Link>
  );
}
