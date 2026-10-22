import type { Metadata } from "next";
import Link from "next/link";
import AccessPoint from "@/components/access/AccessPoint";
import Photo from "@/components/site/Photo";
import SeeItInAction from "@/components/site/SeeItInAction";
import MenuBeforeAfter from "@/components/site/MenuBeforeAfter";
import { Phone } from "@/components/site/Devices";
import { DemoCta, Story } from "@/components/site/Sections";
import { DEMO_CTA } from "@/lib/constants";
import { ComingSoonBadge, PreviewNote } from "@/components/site/ComingSoon";

export const metadata: Metadata = {
  title: "Restaurants: change your menu without reprinting",
  description:
    "Sold out of a dish? New special tonight? With Informax Cloud (coming soon) you replace your menu from your phone and every table's Code shows the latest version. No app for guests, no reprinting.",
  alternates: { canonical: "/restaurants" },
};

export default function RestaurantsPage() {
  return (
    <>
      <header className="relative min-h-[100svh] overflow-hidden bg-charcoal-950 text-cream">
        <Photo slot="restaurantTable" fill motion priority className="opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,18,0.92)_0%,rgba(6,10,18,0.7)_45%,rgba(6,10,18,0.15)_100%)]" aria-hidden />
        <div className="relative mx-auto grid min-h-[100svh] max-w-8xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-[120px] md:px-10 lg:grid-cols-[1fr_auto]">
          <div className="ix-hero-rise max-w-[44rem]">
            <p className="mb-5 flex flex-wrap items-center gap-3 text-[15px] font-semibold text-brass-light">
              Informax Cloud for restaurants <ComingSoonBadge />
            </p>
            <h1 className="text-balance font-serif-display text-[clamp(42px,5.2vw,72px)] leading-[1] text-white">
              A menu that&rsquo;s always right. <span className="text-cream-mute">Without printing a thing.</span>
            </h1>
            <p className="mt-7 max-w-[34rem] text-[18px] leading-relaxed text-white/78">
              Specials, sold-out dishes, a new wine, the Christmas menu. Change what guests see from your phone, and the Code on
              every table shows the latest version.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#see-it-in-action" className="ix-btn ix-btn-primary">See It in Action</a>
              <Link href={DEMO_CTA.href} className="ix-btn ix-btn-secondary-dark">{DEMO_CTA.label}</Link>
            </div>
            <div className="mt-8 max-w-[34rem]">
              <PreviewNote dark />
            </div>
          </div>
          <div className="relative mx-auto flex items-end gap-5 lg:mx-0">
            <AccessPoint place="Table 12" sub="Menu" size="md" className="mb-10 hidden sm:flex" />
            <div className="w-[240px] sm:w-[280px]">
              <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">What the guest sees</p>
              <Phone screens={["guestMenuAfter"]} priority sizes="280px" />
            </div>
          </div>
        </div>
      </header>

      {/* The moment it starts: the chef film, full width. */}
      <section className="relative isolate overflow-hidden bg-charcoal-950 text-cream" aria-labelledby="kitchen-h">
        <Photo slot="chefPass" fill motion sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,18,0.9)_0%,rgba(6,10,18,0.65)_55%,rgba(6,10,18,0.35)_100%)]" aria-hidden />
        <div className="relative mx-auto flex min-h-[70svh] max-w-8xl items-end px-6 pb-16 pt-28 md:min-h-[78vh] md:px-10 md:pb-24">
          <div className="max-w-[38rem]">
            <p className="mb-4 text-[15px] font-semibold text-brass-light">During dinner service</p>
            <h2 id="kitchen-h" className="text-balance font-serif-display text-[clamp(34px,4.8vw,62px)] leading-[1.02] text-white">
              The sea bass is finished. <span className="text-cream-mute">The hake is ready to serve.</span>
            </h2>
            <p className="mt-6 max-w-[32rem] text-[18px] leading-relaxed text-white/80">
              The kitchen has the replacement dish. The printed menus on the tables don&rsquo;t know that yet. With Informax, the
              menu every guest opens changes in the time it takes to upload one file.
            </p>
          </div>
        </div>
      </section>

      <MenuBeforeAfter />

      <Story
        tone="alt"
        flip
        eyebrow="Change it in seconds"
        title="Replace the menu"
        soft="from your phone."
        media={
          <div className="mx-auto flex max-w-[520px] items-end justify-center gap-4 sm:gap-6">
            <Phone screens={["cloudMenuReplace"]} tone="light" className="w-1/2" sizes="260px" />
            <Phone screens={["cloudMenuPublished"]} tone="light" className="w-1/2 sm:-mb-8" sizes="260px" />
          </div>
        }
      >
        <p>
          Open the menu in Informax Cloud, choose <strong className="font-semibold text-ink">Replace menu</strong> and pick the
          updated file. Informax Cloud tells you when it is live, and every earlier version stays in the history, ready to
          restore.
        </p>
        <p className="rounded-2xl bg-white px-5 py-4 text-[15px] text-ink-mute shadow-[0_0_0_1px_rgba(11,21,36,0.06)]">
          <strong className="font-semibold text-ink-soft">Good to know:</strong> menus are uploaded as PDFs, designed the way you
          already make them, or the Code can open your own website. Editing individual dishes inside Informax Cloud is not
          available today.
        </p>
      </Story>

      <Story
        tone="dark"
        eyebrow="Temporary menus"
        title="A menu for tonight."
        soft="Gone by tomorrow."
        media={
          <div className="mx-auto w-full max-w-[300px]">
            <Phone screens={["cloudMenuTemporary"]} sizes="300px" />
          </div>
        }
      >
        <p>
          Sunday lunch, a wine evening, a set menu for a private party. Publish a temporary menu for one, two or three hours, or
          choose exactly when it ends.
        </p>
        <p>When the time is up, every table goes back to your usual menu by itself. Nobody needs to remember to change it back.</p>
      </Story>

      <Story
        eyebrow="Every table"
        title="One Code for each menu."
        soft="As many copies as you like."
        media={
          <div className="relative overflow-hidden rounded-[28px]">
            <Photo slot="signatureDish" fill sizes="(min-width: 1024px) 560px, 100vw" />
            <div className="absolute inset-0 bg-black/25" aria-hidden />
            <div className="relative flex flex-wrap items-end justify-center gap-4 px-6 pb-16 pt-14 sm:gap-5">
              <AccessPoint place="Restaurant Menu" sub="Main Restaurant" size="md" />
              <AccessPoint place="Drinks Menu" sub="Bar" size="md" colourway="stone" />
              <AccessPoint place="Wine List" sub="Main Restaurant" size="md" colourway="graphite" />
            </div>
          </div>
        }
      >
        <p>
          Your Restaurant Menu, Drinks Menu and Wine List each have their own permanent Code. Print the same Code for every table
          that needs it: every copy opens the same, current menu.
        </p>
        <p>
          Give chefs, managers and waiters their own sign-in to Informax Cloud, each with the access their job needs.
        </p>
      </Story>

      <SeeItInAction initial="restaurant" />

      <DemoCta title="Never reprint a menu again." body="See Informax Cloud with your own menu, and talk to us about Codes for your tables." />
    </>
  );
}
