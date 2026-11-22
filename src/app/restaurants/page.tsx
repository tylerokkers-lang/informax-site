import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Photo from "@/components/site/Photo";
import { PhoneFrame } from "@/components/x/Devices";
import ScanPoint from "@/components/x/ScanPoint";
import FilmBand from "@/components/x/FilmBand";
import { Container, DemoBand, Faq, Heading, PrimaryActions, ScreenNote, Section } from "@/components/x/ui";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Restaurants | Digital menus that change with the kitchen",
  description:
    "A Scan Point on every table and menus you update from your phone in Informax Cloud. Temporary menus with an end time, no reprinting and no app for guests.",
  alternates: { canonical: "/restaurants" },
};

/** Where the changed dish sits on the captured menu. */
const DISH = { top: 0.428, height: 0.043 };

const MENUS = [
  { place: "Lunch", sub: "12:00 to 14:30", finish: "ivory" },
  { place: "Dinner", sub: "From 17:30", finish: "navy" },
  { place: "Wine", sub: "By the glass", finish: "stone" },
  { place: "Desserts", sub: "Tonight", finish: "graphite" },
] as const;

const QUESTIONS = [
  { q: "Do guests need an app?", a: "No. Guests scan the Scan Point with their phone's camera and the menu opens in their browser, full screen and easy to read." },
  { q: "Can I change a single dish inside Informax Cloud?", a: "Not today. You upload the updated menu as a PDF, made the way you already make it, or link a page of your website. If you would like us to design your menus, that is a separate service." },
  { q: "How fast is an update?", a: "As soon as Cloud confirms it is live, the next guest to scan sees it. A guest who already has the menu open sees it when they refresh." },
  { q: "Can I run a menu just for tonight?", a: "Yes. Publish a temporary menu for one, two or three hours, or until a time you choose. When it ends, your usual menu returns by itself." },
];

export default function RestaurantsPage() {
  return (
    <>
      <section aria-labelledby="rest-h" className="bg-paper px-3 pt-[76px] md:px-4 md:pt-[84px]">
        <div className="relative isolate flex min-h-[640px] overflow-hidden rounded-[32px] bg-charcoal-950 md:min-h-[min(820px,calc(100svh-100px))] md:rounded-[44px]">
          <Photo slot="restaurantTable" fill motion priority className="-z-10" label={false} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(6,10,18,0.94)_0%,rgba(6,10,18,0.8)_55%,rgba(6,10,18,0.55)_100%)] lg:bg-[linear-gradient(90deg,rgba(6,10,18,0.92)_0%,rgba(6,10,18,0.7)_45%,rgba(6,10,18,0.2)_100%)]" />
          <div className="mx-auto flex w-full max-w-8xl items-end px-6 pb-14 pt-24 md:items-center md:px-10 md:pb-20">
            <div className="max-w-[44rem]">
              <p className="ix-hero-rise text-[14px] font-semibold text-brass-light">Restaurants</p>
              <h1 id="rest-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(44px,6.6vw,96px)] text-white" style={{ ["--rise-delay" as string]: "0.08s" }}>
                The menu the kitchen <span className="text-white/75">is cooking tonight.</span>
              </h1>
              <p className="ix-hero-rise mt-7 max-w-[34rem] text-[19px] leading-relaxed text-white/78" style={{ ["--rise-delay" as string]: "0.18s" }}>
                A Scan Point on every table, and a menu you can change from your phone between services. When a dish sells out, every table knows.
              </p>
              <div className="ix-hero-rise mt-9" style={{ ["--rise-delay" as string]: "0.28s" }}>
                <PrimaryActions dark cloudFirst={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="paper" labelledBy="sold-h">
        <Container>
          <Heading
            id="sold-h"
            eyebrow="Before the next order"
            title="The sea bass is finished."
            soft="The menu says so."
            lead="Replace the menu PDF in Informax Cloud and every table's Scan Point opens the new version. No apologies table by table, and no reprint."
          />
          <div className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8 md:mt-16 lg:mx-auto lg:max-w-[900px]">
            <Reveal>
              <PhoneFrame screens={["guestMenuBefore"]} tone="light" highlight={{ ...DISH, tone: "warn" }} className="mx-auto w-full max-w-[280px]" sizes="(min-width: 768px) 280px, 38vw" />
              <p className="mt-5 text-center text-[13px] font-semibold text-ink-mute">At 19:00</p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col items-center gap-3">
              <ScanPoint place="Table 12" sub="Dinner menu" finish="ivory" className="w-[72px] sm:w-[120px]" />
              <ArrowRight size={20} aria-hidden className="text-ink-mute" />
            </Reveal>
            <Reveal delay={0.2}>
              <PhoneFrame screens={["guestMenuAfter"]} tone="light" highlight={{ ...DISH, tone: "ok" }} className="mx-auto w-full max-w-[280px]" sizes="(min-width: 768px) 280px, 38vw" />
              <p className="mt-5 text-center text-[13px] font-semibold text-ink">At 19:02</p>
            </Reveal>
          </div>
          <div className="mt-10 text-center">
            <ScreenNote>Real guest screens from the Informax Cloud development build. The Copper Table is a fictional restaurant; times are an example.</ScreenNote>
          </div>
        </Container>
      </Section>

      <FilmBand
        id="kitchen-h"
        slot="chefPass"
        eyebrow="From the pass"
        title="Change the menu without leaving the kitchen."
        body={<p>Informax Cloud works on a phone. Open the menu, choose the new PDF, publish, and get straight back to service.</p>}
      />

      <Section tone="paper" labelledBy="phone-h">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Heading
              id="phone-h"
              eyebrow="Informax Cloud on your phone"
              title="Replace. Publish."
              soft="Or just for tonight."
              lead="Swap the menu for good, or publish a temporary menu for one, two or three hours. When it ends, your usual menu comes back on its own."
              size="md"
            />
            <RevealStagger className="grid grid-cols-3 items-end gap-3 sm:gap-5">
              {(["cloudMenuReplace", "cloudMenuPublished", "cloudMenuTemporary"] as const).map((k, n) => (
                <RevealStaggerItem key={k} className={n === 1 ? "-translate-y-8" : ""}>
                  <PhoneFrame screens={[k]} tone="light" sizes="(min-width: 1024px) 200px, 30vw" />
                  <p className="mt-4 text-center text-[13px] font-semibold text-ink-mute">{["Choose the PDF", "Live everywhere", "Temporary menu"][n]}</p>
                </RevealStaggerItem>
              ))}
            </RevealStagger>
          </div>
          <div className="mt-8">
            <ScreenNote />
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="menus-h">
        <Container>
          <Heading
            id="menus-h"
            center
            eyebrow="One Scan Point for each menu"
            title="Lunch, dinner, wine, desserts."
            soft="Each one always current."
            lead="Give each menu its own Scan Point and place it on every table, at the bar and in the window. Print as many as you need: they all open the same, current menu."
          />
          <RevealStagger className="mx-auto mt-14 grid max-w-[820px] grid-cols-2 gap-6 sm:grid-cols-4 md:mt-16">
            {MENUS.map((m) => (
              <RevealStaggerItem key={m.place} className="px-3 sm:px-2">
                <ScanPoint place={m.place} sub={m.sub} finish={m.finish} />
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      <Section tone="alt" labelledBy="rest-faq-h">
        <Container>
          <Faq id="rest-faq-h" items={QUESTIONS} />
        </Container>
      </Section>

      <DemoBand title="See your menus, done right." />
    </>
  );
}
