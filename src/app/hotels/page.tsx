import type { Metadata } from "next";
import AccessPoint from "@/components/access/AccessPoint";
import HotelShowcase from "@/components/site/HotelShowcase";
import Photo from "@/components/site/Photo";
import { drawCodeOver } from "@/lib/photography";
import SeeItInAction from "@/components/site/SeeItInAction";
import { Browser, Phone } from "@/components/site/Devices";
import { DemoCta, Heading, Story } from "@/components/site/Sections";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Hotels: guest information that is always current",
  description:
    "Keep your hotel directory, restaurant hours, spa menus and guest offers up to date in every room, without replacing a single card. Informax Cloud for hotels.",
  alternates: { canonical: "/hotels" },
};

const USES = [
  { title: "Digital guest directory", what: "One directory PDF behind the Code in every room.", how: "Replace it once in Informax Cloud." },
  { title: "Restaurant hours", what: "Dinner now starts at 17:30 instead of 18:00.", how: "Upload the updated directory. Every room’s Code opens it." },
  { title: "Spa promotion with an end time", what: "This afternoon’s treatment offer, in every bathroom.", how: "Publish it as temporary content ending at 18:00." },
  { title: "Room upgrade invitation", what: "Ask guests if they would like a suite.", how: "Add the invitation to your guest information." },
];

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-2xl bg-white px-5 py-4 text-[15px] text-ink-mute shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">{children}</p>
);

export default function HotelsPage() {
  return (
    <>
      <HotelShowcase as="header" heading="h1" />

      <section className="bg-paper py-24 md:py-28" aria-labelledby="hotel-uses-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <Heading id="hotel-uses-h" eyebrow="At a glance" title="Four things your hotel can keep current." soft="Without replacing a card." />
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {USES.map((u, i) => (
              <li key={u.title} className="flex flex-col rounded-[22px] bg-white p-6 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
                <span className="text-[13px] font-semibold text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif-display text-[21px] leading-tight text-ink">{u.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{u.what}</p>
                <p className="mt-auto pt-4 text-[14px] font-medium text-ink">{u.how}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[22px] bg-white p-6 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
              <p className="text-[15px] font-semibold text-ink">What Informax does</p>
              <ul className="mt-3 space-y-2">
                {["Shows guests the information and offers you publish", "Ends temporary content at the time you set, then brings back your usual content", "Keeps every earlier version, ready to restore"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft"><Check size={17} className="mt-0.5 shrink-0 text-brass-deep" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[22px] bg-paper-alt p-6">
              <p className="text-[15px] font-semibold text-ink">What it does not do</p>
              <ul className="mt-3 space-y-2">
                {["Check room or treatment availability", "Take bookings or payments", "Apply discounts or prices for you"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft"><X size={17} className="mt-0.5 shrink-0 text-ink-mute" aria-hidden />{t}</li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-ink-mute">Guests book and enquire with your team, the way they do today.</p>
            </div>
          </div>
        </div>
      </section>

      <Story
        id="directory"
        tone="alt"
        eyebrow="The coffee-table directory"
        title="Restaurant hours changed?"
        soft="Every room knows."
        media={
          <div className="relative">
            <Photo slot="hotelLounge" className="aspect-[4/3] rounded-[24px]" sizes="(min-width: 1024px) 560px, 100vw" label={false} />
            <div className="absolute inset-0 flex items-end justify-center gap-4 p-6 sm:gap-6">
              <div className="w-[38%] max-w-[200px]">
                <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Before</p>
                <Phone screens={["guestDirectoryBefore"]} sizes="200px" />
              </div>
              <div className="w-[38%] max-w-[200px]">
                <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white">After</p>
                <Phone screens={["guestDirectoryAfter"]} sizes="200px" />
              </div>
            </div>
          </div>
        }
      >
        <p>
          A Code card on the coffee table opens your guest directory: dining times, in-room dining, the spa and how to reach
          reception. No app to download, nothing to sign in to.
        </p>
        <p>
          When the Garden Room starts dinner earlier, replace the directory once in Informax Cloud. Every room&rsquo;s card opens
          the new version. The card itself never changes.
        </p>
      </Story>

      <Story
        flip
        eyebrow="Bathroom spa menu"
        title="Fill the spa this afternoon."
        soft="Then put it back."
        media={
          <div className="mx-auto flex max-w-[520px] items-end justify-center gap-4 sm:gap-6">
            <div className="w-1/2">
              <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mute">Guest&rsquo;s phone</p>
              <Phone screens={["guestSpaOffer"]} tone="light" sizes="260px" />
            </div>
            <div className="w-1/2 sm:-mb-8">
              <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mute">Informax Cloud</p>
              <Phone screens={["cloudSpaTemporary"]} tone="light" sizes="260px" />
            </div>
          </div>
        }
      >
        <p>
          A small Code by the vanity opens the spa&rsquo;s treatment menu. When the spa has more time free, publish this
          afternoon&rsquo;s offer as temporary content with an end time. At 18:00 every bathroom goes back to the treatment menu by
          itself.
        </p>
        <Note>
          <strong className="font-semibold text-ink-soft">What it does and doesn&rsquo;t do:</strong> Informax shows the offer you
          publish. It does not check treatment availability, take bookings or apply discounts. Guests book with the spa in the
          way they do today, by phone or your booking page.
        </Note>
      </Story>

      <Story
        tone="alt"
        eyebrow="Room upgrades"
        title="Make your stay even more memorable."
        media={
          <div className="relative">
            <Photo slot="hotelSuite" className="aspect-[4/3] rounded-[24px]" sizes="(min-width: 1024px) 560px, 100vw" label={false} />
            <div className="absolute bottom-6 right-6 w-[40%] max-w-[220px]">
              <Phone screens={["guestDirectoryBefore"]} sizes="220px" />
            </div>
            {drawCodeOver("hotelSuite") ? (
              <div className="absolute bottom-8 left-6 hidden sm:block">
                <AccessPoint place="Suite 401" sub="Guest Directory" size="sm" colourway="platinum" />
              </div>
            ) : null}
          </div>
        }
      >
        <p>
          Invite guests to ask about a suite, a late check-out or a dinner experience, inside the guest information they already
          open. Change the invitation whenever your offers change.
        </p>
        <Note>
          This is a promotion, not a booking engine. Informax does not check room availability or take payment: guests contact
          your team, and your team takes it from there.
        </Note>
      </Story>

      <section className="bg-paper py-24 md:py-32" aria-labelledby="many-h">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-[15px] font-semibold text-brass-deep">Across the whole hotel</p>
              <h2 id="many-h" className="text-balance font-serif-display text-[clamp(34px,4.4vw,54px)] leading-[1.04] text-ink">
                Update every bathroom at once. <span className="text-ink-mute">Or every bedside.</span>
              </h2>
              <p className="mt-6 max-w-[32rem] text-[17.5px] leading-relaxed text-ink-soft">
                Group your Access Points by type, such as Bathroom, Coffee Table or Bedside Table, then publish one PDF or website to
                all of them. Every Code stays the same, each keeps its own history, and you can undo it afterwards.
              </p>
            </div>
            <Browser screen="deskBulk" />
          </div>
          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Browser screen="deskBedrooms" className="lg:order-1" />
            <div className="lg:order-2">
              <h3 className="text-balance font-serif-display text-[clamp(28px,3.4vw,40px)] leading-[1.06] text-ink">
                Organised the way your hotel is.
              </h3>
              <p className="mt-5 max-w-[30rem] text-[17.5px] leading-relaxed text-ink-soft">
                Bedrooms, the spa, restaurants and public areas each hold their own Access Points. At a glance you can see what is
                live, what is temporary and what still needs setting up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SeeItInAction initial="hotel" />

      <DemoCta
        title="Keep every guest up to date."
        body="See Informax Cloud with your own directory and spa menu, and talk to us about where your Codes would sit."
      />
    </>
  );
}
