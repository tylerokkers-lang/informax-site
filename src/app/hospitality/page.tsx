import type { Metadata } from "next";
import { ArrowRight, BedDouble, Check, ConciergeBell, Flower2, MapPin, Sparkles, UtensilsCrossed, Wifi, X } from "lucide-react";
import { PhoneFrame } from "@/components/x/Devices";
import { PlacementScene } from "@/components/x/Placements";
import { LocalScreen, ReceptionScreen } from "@/components/x/GuestScreens";
import ScanPoint from "@/components/x/ScanPoint";
import FilmBand from "@/components/x/FilmBand";
import { Container, DemoBand, Faq, Heading, PrimaryActions, ScreenNote, Section } from "@/components/x/ui";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import { PLACEMENTS } from "@/lib/placements";

export const metadata: Metadata = {
  title: "Hospitality | Guest information for hotels and spas",
  description:
    "A guest directory, spa offers, dining hours and Wi-Fi in every room through Scan Points. Update once in Informax Cloud and every room follows, with no reprinting.",
  alternates: { canonical: "/hospitality" },
};

const USES = [
  { icon: BedDouble, title: "In-room directory", body: "Everything about the stay, by the bed and on the desk." },
  { icon: Flower2, title: "Spa and wellness", body: "Treatments, hours and this afternoon's offer." },
  { icon: UtensilsCrossed, title: "Dining", body: "Restaurant hours, room service and tonight's menu." },
  { icon: Wifi, title: "Wi-Fi and reception", body: "Network details and the answers guests ask for first." },
  { icon: Sparkles, title: "Upgrades and offers", body: "Suites, experiences and seasonal packages, shown at the right moment." },
  { icon: MapPin, title: "Local guide", body: "Your concierge's recommendations, kept up to date." },
];

/** Where the dinner row sits on the captured directory. */
const DINNER = { top: 0.318, height: 0.042 };

const QUESTIONS = [
  { q: "Do we need to visit every room to make a change?", a: "No. Every room's Scan Point is a printed copy of the same permanent Code. You change what it opens in Informax Cloud and every copy shows the update on the next scan." },
  { q: "Can different parts of the hotel show different things?", a: "Yes. Each purpose has its own Scan Point: the bedside directory, the bathroom spa card, the restaurant menu. Organise them in Spaces such as Bedrooms, Spa and Public Areas." },
  { q: "Does Informax take bookings or payments?", a: "No. Informax shows your information and offers. Guests book and pay with your team the way they do today, by phone or through your own booking pages." },
  { q: "Can we use our existing directory?", a: "Yes. Upload the PDF you already have, or link a page of your website. If you would like a new design, Informax can create one for you as a separate service." },
];

export default function HospitalityPage() {
  const room = PLACEMENTS[0];
  return (
    <>
      <section aria-labelledby="hosp-h" className="bg-paper pb-16 pt-[120px] md:pb-24 md:pt-[160px]">
        <Container wide>
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">Hospitality</p>
              <h1 id="hosp-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(46px,7vw,104px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
                Every room. <span className="text-ink-quiet">Always current.</span>
              </h1>
            </div>
            <div className="ix-hero-rise lg:pb-3" style={{ ["--rise-delay" as string]: "0.18s" }}>
              <p className="text-[19px] leading-relaxed text-ink-soft">
                Your guest directory, spa, dining and stay information, in every room and at every desk. Change it once in Informax Cloud, and every room follows.
              </p>
              <div className="mt-8">
                <PrimaryActions cloudFirst={false} />
              </div>
            </div>
          </div>
          <div className="ix-hero-rise mt-14 md:mt-20" style={{ ["--rise-delay" as string]: "0.3s", ["--rise-y" as string]: "40px" }}>
            <PlacementScene p={room} className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/7.5]" />
          </div>
        </Container>
      </section>

      <Section tone="white" labelledBy="uses-h">
        <Container>
          <Heading id="uses-h" eyebrow="What hotels use it for" title="The whole stay," soft="one scan from every guest." />
          <RevealStagger className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {USES.map(({ icon: Icon, title, body }) => (
              <RevealStaggerItem key={title} className="flex gap-5 border-t border-line pt-7">
                <Icon size={22} aria-hidden className="mt-0.5 shrink-0 text-brass-deep" />
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-mute">{body}</p>
                </div>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      <Section tone="alt" labelledBy="hours-h">
        <Container>
          <Heading
            id="hours-h"
            eyebrow="One change, every room"
            title="Dinner moves to 17:30."
            soft="Every room knows before guests return."
            lead="Upload the new directory in Informax Cloud. The Scan Point by every bed is a copy of the same Code, so every room shows the update at once. Nobody prints, and nobody knocks."
          />
          <div className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8 md:mt-16 lg:mx-auto lg:max-w-[900px]">
            <Reveal>
              <PhoneFrame screens={["guestDirectoryBefore"]} highlight={{ ...DINNER, tone: "warn" }} className="mx-auto w-full max-w-[280px]" sizes="(min-width: 768px) 280px, 38vw" />
              <p className="mt-5 text-center text-[13px] font-semibold text-ink-mute">This morning</p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col items-center gap-3">
              <ScanPoint place="Your stay" sub="Guest directory" finish="stone" className="w-[72px] sm:w-[120px]" />
              <ArrowRight size={20} aria-hidden className="text-ink-mute" />
            </Reveal>
            <Reveal delay={0.2}>
              <PhoneFrame screens={["guestDirectoryAfter"]} highlight={{ ...DINNER, tone: "ok" }} className="mx-auto w-full max-w-[280px]" sizes="(min-width: 768px) 280px, 38vw" />
              <p className="mt-5 text-center text-[13px] font-semibold text-ink">After one update</p>
            </Reveal>
          </div>
          <div className="mt-10 text-center">
            <ScreenNote>Real guest screens from the Informax Cloud development build. Marlowe Grand is a fictional hotel.</ScreenNote>
          </div>
        </Container>
      </Section>

      <FilmBand
        id="spa-h"
        slot="spaTreatment"
        eyebrow="Spa and wellness"
        title="A quiet afternoon at the spa, filled."
        body={<p>Publish an offer for this afternoon only. It appears on every spa Scan Point, in every bathroom and by every bed, and disappears at 18:00 by itself.</p>}
      />

      <Section tone="paper" labelledBy="spa-flow-h">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Heading
              id="spa-flow-h"
              eyebrow="Temporary content"
              title="Until 18:00 today."
              soft="Then back to the treatments menu."
              lead="Choose the offer, set the end time, publish. Informax shows the offer; guests book with the spa by phone or your booking page, the way they do today."
              size="md"
            />
            <RevealStagger className="grid grid-cols-2 gap-4 sm:gap-6">
              <RevealStaggerItem>
                <PhoneFrame screens={["cloudSpaTemporary"]} tone="light" sizes="(min-width: 1024px) 240px, 42vw" />
                <p className="mt-4 text-center text-[13px] font-semibold text-ink-mute">Your team, in Cloud</p>
              </RevealStaggerItem>
              <RevealStaggerItem className="translate-y-10">
                <PhoneFrame screens={["guestSpaOffer"]} sizes="(min-width: 1024px) 240px, 42vw" />
                <p className="mt-4 text-center text-[13px] font-semibold text-ink-mute">Your guests, until 18:00</p>
              </RevealStaggerItem>
            </RevealStagger>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="desk-h">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <RevealStagger className="order-2 grid grid-cols-2 gap-4 sm:gap-6 lg:order-1">
              <RevealStaggerItem>
                <PhoneFrame label="A guest's phone showing the Marlowe Grand welcome page, with Wi-Fi details and times for the stay (an Informax sample design)" sizes="240px">
                  <ReceptionScreen />
                </PhoneFrame>
              </RevealStaggerItem>
              <RevealStaggerItem className="translate-y-10">
                <PhoneFrame label="A guest's phone showing the concierge's local recommendations (an Informax sample design)" sizes="240px">
                  <LocalScreen />
                </PhoneFrame>
              </RevealStaggerItem>
            </RevealStagger>
            <div className="order-1 lg:order-2">
              <Heading
                id="desk-h"
                eyebrow="Reception and concierge"
                title="The questions at the desk,"
                soft="answered in the room."
                lead="Wi-Fi details, breakfast times, check-out and the concierge's favourite places. Fewer calls to reception, and a front office team free for the conversations that matter."
                size="md"
              />
              <p className="mt-6 text-[13px] text-ink-mute">Sample designs for a fictional hotel.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="alt" labelledBy="scope-h" tight>
        <Container>
          <Reveal className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] bg-line md:grid-cols-2">
            <div className="bg-white p-8 md:p-10">
              <h2 id="scope-h" className="text-[20px] font-semibold tracking-[-0.015em] text-ink">What Informax does</h2>
              <ul className="mt-5 space-y-3">
                {["Shows your current information wherever guests are", "Publishes offers with an end time", "Keeps every printed Scan Point current", "Records who changed what, and when"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[16px] text-ink-soft">
                    <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-moss" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 md:p-10">
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-ink">What it leaves to your team</h2>
              <ul className="mt-5 space-y-3">
                {["Checking room or treatment availability", "Taking bookings or payments", "Applying prices or discounts"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[16px] text-ink-soft">
                    <X size={18} aria-hidden className="mt-0.5 shrink-0 text-ink-mute" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 text-[14px] text-ink-mute">
                <ConciergeBell size={16} aria-hidden /> Guests book with you, the way they do today.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="hosp-faq-h">
        <Container>
          <Faq id="hosp-faq-h" items={QUESTIONS} />
        </Container>
      </Section>

      <DemoBand title="See your hotel's guest journey, done right." />
    </>
  );
}
