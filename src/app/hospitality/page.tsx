import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import PageHero from "@/components/cloud/PageHero";
import Section, { Head } from "@/components/cloud/Section";
import { Display, Kicker, Lede, Soft } from "@/components/cloud/type";
import SpacesGrid from "@/components/cloud/SpacesGrid";
import HotelScene from "@/components/cloud/HotelScene";
import GuestDirectoryCallout from "@/components/cloud/GuestDirectoryCallout";
import CloudCta from "@/components/cloud/CloudCta";

export const metadata: Metadata = {
  title: "Hospitality: Guest Information That Keeps Up With Your Hotel",
  description:
    "Menus, treatments, opening times and event details change constantly. Informax gives every part of your hotel a permanent digital Space, so guests always find current information.",
  alternates: { canonical: "/hospitality" },
};

const PROBLEMS = [
  ["Printed information becomes outdated.", "Every part of the hotel gets a Space that is always current."],
  ["Menus change.", "Replace the PDF in the Restaurants Space. Every Touch Point follows."],
  ["Spa treatments change.", "Update the Spa Space, or point it at your booking page."],
  ["Opening times change.", "Change them once, from anywhere, in seconds."],
  ["Meeting information changes.", "Floor plans, layouts and menus live in one Meetings & Events Space."],
  ["Guests struggle to find the right information.", "A Touch Point beside them opens exactly the right Space."],
  ["Information is scattered across websites, PDFs and departments.", "Informax Cloud brings it together, Space by Space."],
] as const;

export default function HospitalityPage() {
  return (
    <>
      <PageHero
        eyebrow="Hospitality"
        title={<>Change the information.<br /><span className="italic text-glow">Not the signage.</span></>}
        lede="Menus, treatments, opening times and event details change all the time. Informax keeps guests informed without reprinting, replacing or reinstalling anything."
        primary={{ label: "Talk to Informax", href: "/enquire" }}
        secondary={{ label: "Explore Informax Cloud", href: "/informax-cloud" }}
        visual={<HotelScene className="h-auto w-full" />}
      />

      <Section>
        <Head>
          <Reveal blur>
            <Kicker>The everyday problem</Kicker>
            <Display>
              Every hotel knows <Soft>these problems.</Soft>
            </Display>
          </Reveal>
        </Head>
        <div className="hidden grid-cols-2 gap-10 border-b border-line pb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute md:grid">
          <span>The problem</span>
          <span>With Informax</span>
        </div>
        <RevealStagger>
          {PROBLEMS.map(([problem, answer], i) => (
            <RevealStaggerItem key={problem} className="grid gap-3 border-b border-line py-7 md:grid-cols-2 md:gap-10">
              <div className="flex gap-5">
                <span className="font-serif-display text-[15px] italic text-brass-deep">0{i + 1}</span>
                <h3 className="font-serif-display text-[clamp(20px,2.2vw,27px)] leading-tight text-ink">{problem}</h3>
              </div>
              <p className="pl-9 text-[15.5px] leading-relaxed text-ink-mute md:pl-0">{answer}</p>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Section>

      <Section tone="dark">
        <Head>
          <Reveal blur>
            <Kicker dark>Every department</Kicker>
            <Display dark>
              Each part of the hotel gets its <Soft dark>own Space.</Soft>
            </Display>
            <Lede dark className="mt-8">
              The teams who know the information best keep it current. Guests
              always find the latest version, wherever they are.
            </Lede>
          </Reveal>
        </Head>
        <SpacesGrid dark />
      </Section>

      <Section tone="alt">
        <div className="grid gap-14 grid-cols-1 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal blur>
            <Kicker>Built in hospitality</Kicker>
            <Display>
              Made by people who have <Soft>worked the front office.</Soft>
            </Display>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-mute md:text-[18px]">
              Informax was born from nearly a decade of first-hand experience
              across front office, meetings and events, and guest relations.
              We saw how much care goes into a guest experience, and how often
              the way information is delivered lets it down.
            </p>
            <Link href="/about" className="mt-8 inline-block border-b border-ink pb-1 text-[15px] font-medium text-ink transition-colors hover:border-brass-deep hover:text-brass-deep">
              Read our story
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section>
        <GuestDirectoryCallout />
      </Section>

      <CloudCta />
    </>
  );
}
