import type { Finish } from "@/components/x/ScanPoint";
import type { ScreenKey } from "@/lib/screens";

/**
 * The settings the site shows a Scan Point in. Until real photography of an
 * Informax Scan Point in place is supplied, each setting is shown as a studio
 * scene: the plate on a surface in the setting's own materials. To use a
 * photograph, set `photo` (a licensed image in public/photos/, with its
 * licence recorded); the scene then shows the photograph and stops drawing
 * its own plate, because the photograph shows the real one. See
 * docs/photography-brief.md, "Scan Points in place".
 */
export type Placement = {
  key: "room" | "table" | "reception" | "gallery" | "event";
  label: string;
  /** Shown on the drawn plate. */
  place: string;
  sub: string;
  finish: Finish;
  studio: string;
  title: string;
  body: string;
  /** A captured guest screen, or a rendered sample page. */
  screen: ScreenKey | "reception" | "gallery" | "event";
  photo: { src: string; alt: string; width: number; height: number; licence: string; source: string } | null;
};

export const PLACEMENTS: Placement[] = [
  {
    key: "room",
    label: "Hotel rooms",
    place: "Your stay",
    sub: "Guest directory",
    finish: "stone",
    studio: "x-studio-room",
    title: "By the bed, on the desk, beside the bath.",
    body: "Every room carries the same Scan Point. Change the directory once and every room shows the new version, without anyone entering a room.",
    screen: "guestDirectoryAfter",
    photo: null,
  },
  {
    key: "table",
    label: "Restaurant tables",
    place: "Dinner",
    sub: "Tonight's menu",
    finish: "ivory",
    studio: "x-studio-table",
    title: "On every table, the menu the kitchen is cooking.",
    body: "When a dish sells out or the menu turns for the evening, publish the new PDF before the next table sits down.",
    screen: "guestMenuAfter",
    photo: null,
  },
  {
    key: "reception",
    label: "Reception desks",
    place: "Welcome",
    sub: "Wi-Fi and your stay",
    finish: "navy",
    studio: "x-studio-reception",
    title: "The questions guests ask first, answered before they ask.",
    body: "Wi-Fi details, breakfast times, check-out and the spa's offer of the day, at the desk and in the lift lobby.",
    screen: "reception",
    photo: null,
  },
  {
    key: "gallery",
    label: "Galleries",
    place: "Room 3",
    sub: "Works in this room",
    finish: "ivory",
    studio: "x-studio-gallery",
    title: "A guide for every room, current for every show.",
    body: "Wall texts, works lists and late openings. When the exhibition changes, the Scan Points on the wall stay where they are.",
    screen: "gallery",
    photo: null,
  },
  {
    key: "event",
    label: "Events",
    place: "Programme",
    sub: "Day two",
    finish: "graphite",
    studio: "x-studio-event",
    title: "A programme that keeps up with the day.",
    body: "Room changes, timings and speakers, on lanyards, tables and signage. Move a session and everyone sees it on their next scan.",
    screen: "event",
    photo: null,
  },
];
