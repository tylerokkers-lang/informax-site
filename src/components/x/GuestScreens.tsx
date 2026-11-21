import type { ReactNode } from "react";

/**
 * Sample guest pages rendered in HTML, for settings that have no captured
 * screen yet (reception, gallery, event, local guide). They are Informax
 * sample designs for fictional businesses, in the same style as the captured
 * guest PDFs. All measurements are in container units, so a page scales with
 * whatever phone holds it.
 */

const serif = "font-[Iowan_Old_Style,Palatino,Georgia,serif]";

function Page({ children, dark = false, tint }: { children: ReactNode; dark?: boolean; tint?: string }) {
  return (
    <div
      className={`flex h-full w-full flex-col px-[8cqw] pb-[8cqw] pt-[17cqw] ${dark ? "text-[#eef0f3]" : "text-[#1c1a17]"}`}
      style={{ background: tint ?? (dark ? "#0f1a2b" : "#f6f2ea") }}
    >
      {children}
    </div>
  );
}

function Masthead({ name, line, dark = false }: { name: string; line: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className={`${serif} text-[9cqw] leading-none tracking-[-0.01em]`}>{name}</p>
      <p className={`mt-[2.4cqw] text-[2.5cqw] font-medium uppercase tracking-[0.32em] ${dark ? "text-[#b9c2d0]" : "text-[#8a7f6e]"}`}>{line}</p>
      <div className={`mx-auto mt-[4.5cqw] h-px w-[16cqw] ${dark ? "bg-white/25" : "bg-[#1c1a17]/20"}`} />
    </div>
  );
}

function Row({ a, b, sub, tag, dark = false }: { a: string; b: string; sub?: string; tag?: string; dark?: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-[3cqw] border-b py-[2.8cqw] ${dark ? "border-white/10" : "border-[#1c1a17]/10"}`}>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-[2cqw] text-[3.5cqw] font-medium leading-tight">
          {a}
          {tag ? (
            <span className={`rounded-full border px-[1.8cqw] py-[0.4cqw] text-[2.2cqw] font-semibold uppercase tracking-[0.12em] ${dark ? "border-[#8ed1fc]/60 text-[#8ed1fc]" : "border-[#a7743a]/60 text-[#8a5a24]"}`}>
              {tag}
            </span>
          ) : null}
        </p>
        {sub ? <p className={`mt-[0.8cqw] text-[2.7cqw] leading-snug ${dark ? "text-white/55" : "text-[#1c1a17]/55"}`}>{sub}</p> : null}
      </div>
      <p className="shrink-0 text-[3.3cqw] tabular-nums">{b}</p>
    </div>
  );
}

function Heading2({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`${serif} mb-[1cqw] mt-[6cqw] text-center text-[5.4cqw] ${dark ? "text-white" : ""}`}>{children}</p>;
}

export function ReceptionScreen() {
  return (
    <Page dark>
      <Masthead dark name="Marlowe Grand" line="Welcome" />
      <p className="mt-[5cqw] text-center text-[3cqw] leading-relaxed text-white/70">Everything for your stay, always up to date.</p>
      <div className="mt-[6cqw] rounded-[3cqw] border border-white/15 px-[5cqw] py-[5cqw] text-center">
        <p className="text-[2.4cqw] font-semibold uppercase tracking-[0.28em] text-[#b9c2d0]">Wi-Fi</p>
        <p className={`${serif} mt-[2.5cqw] text-[6cqw]`}>Marlowe Guest</p>
        <p className="mt-[1.5cqw] text-[3.1cqw] text-white/70">
          Password <span className="font-semibold text-white">gardenroom</span>
        </p>
      </div>
      <Heading2 dark>Your stay</Heading2>
      <Row dark a="Breakfast" b="07:00 to 10:30" sub="The Garden Room" />
      <Row dark a="Check-out" b="11:00" sub="Late check-out on request" />
      <Row dark a="Concierge" b="Dial 0" />
      <Row dark a="Spa" b="09:00 to 20:00" tag="Offer today" />
    </Page>
  );
}

export function GalleryScreen({ late = true }: { late?: boolean }) {
  return (
    <Page tint="#f7f6f3">
      <Masthead name="Halden Gallery" line="Light and Matter" />
      <p className="mt-[5cqw] text-center text-[3cqw] leading-relaxed text-[#1c1a17]/65">Room 3. Works are listed clockwise from the entrance.</p>
      <Heading2>In this room</Heading2>
      <Row a="Morning Field" b="12" sub="Ines Varga, oil on linen, 2019" />
      <Row a="Salt Study IV" b="13" sub="Tomas Ekholm, cast glass, 2022" />
      <Row a="The Long Window" b="14" sub="Ines Varga, oil on board, 2021" />
      <Row a="Harbour, Late" b="15" sub="Ada Okafor, archival print, 2023" />
      {late ? (
        <div className="mt-[6cqw] rounded-[3cqw] bg-[#1c1a17] px-[5cqw] py-[4cqw] text-center text-white">
          <p className="text-[2.4cqw] font-semibold uppercase tracking-[0.26em] text-white/60">This Thursday</p>
          <p className={`${serif} mt-[1.5cqw] text-[5cqw]`}>Late opening until 21:00</p>
        </div>
      ) : null}
    </Page>
  );
}

export function EventScreen({ moved = true }: { moved?: boolean }) {
  return (
    <Page dark tint="#121620">
      <Masthead dark name="Northlight" line="Day two programme" />
      <Heading2 dark>Wednesday</Heading2>
      <Row dark a="Registration and coffee" b="08:30" sub="Foyer" />
      <Row dark a="Opening keynote" b="09:15" sub="Main Hall" />
      <Row dark a="Design for hospitality" b="10:30" sub={moved ? "Hall B" : "Studio 2"} tag={moved ? "Moved" : undefined} />
      <Row dark a="Lunch" b="12:30" sub="Terrace" />
      <Row dark a="Panel: the guest journey" b="14:00" sub="Main Hall" />
      <Row dark a="Drinks reception" b="17:30" sub="Roof Garden" />
    </Page>
  );
}

export function LocalScreen() {
  return (
    <Page tint="#f3efe7">
      <Masthead name="Around Mayfair" line="From our concierge" />
      <Heading2>To eat</Heading2>
      <Row a="A quiet supper" b="6 min" sub="Seasonal British cooking, book ahead" />
      <Row a="Late night" b="4 min" sub="Small plates until midnight" />
      <Heading2>To see</Heading2>
      <Row a="The park at dusk" b="8 min" sub="Enter by the north gate" />
      <Row a="Galleries on Cork Street" b="5 min" sub="Most open until 18:00" />
    </Page>
  );
}
