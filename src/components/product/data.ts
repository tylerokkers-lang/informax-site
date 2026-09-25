/**
 * Illustrative data for the product films. Illustrative data is fine;
 * illustrative functionality is not, so every label, button and message
 * that appears in a film exists in the real Informax Cloud app.
 */

export const HOTEL = {
  name: "Fairmont Windsor Park",
  place: "Windsor, United Kingdom",
} as const;

/** A permanent Space address. Format is <origin>/s/<10-character code>. */
export const SPACE_URL = "go.informax.cloud/s/k3m9x7q2ab";

export const SPA = {
  name: "Spa",
  url: SPACE_URL,
  pdf: "Spa Treatments.pdf",
  web: "hotel.com/spa/book",
  touchPoints: 12,
} as const;

export interface SpaceCardData {
  id: string;
  name: string;
  file: string;
  touchPoints: number;
  interactions: number;
  code: string;
}

export const SPACE_CARDS: SpaceCardData[] = [
  { id: "spa", name: "Spa", file: "Spa Treatments.pdf", touchPoints: 12, interactions: 1248, code: "k3m9x7q2ab" },
  { id: "directory", name: "Guest Directory", file: "Guest Directory.pdf", touchPoints: 400, interactions: 6412, code: "h7t2c9wq4d" },
  { id: "meetings", name: "Meetings & Events", file: "Meeting Rooms.pdf", touchPoints: 9, interactions: 782, code: "p5r8v2nk3z" },
  { id: "gym", name: "Gym", file: "Class Timetable.pdf", touchPoints: 5, interactions: 426, code: "e4m7x9d2tb" },
];

export interface TouchPointRowData {
  location: string;
  source: "touch" | "scan";
  interactions: number;
}

export const SPA_TOUCH_POINTS: TouchPointRowData[] = [
  { location: "Spa Reception", source: "touch", interactions: 412 },
  { location: "Relaxation Lounge", source: "touch", interactions: 236 },
  { location: "Changing Rooms", source: "scan", interactions: 171 },
  { location: "Treatment Room 1", source: "touch", interactions: 98 },
  { location: "Treatment Room 2", source: "touch", interactions: 94 },
  { location: "Treatment Room 3", source: "touch", interactions: 81 },
  { location: "Vitality Pool", source: "scan", interactions: 77 },
  { location: "Spa Café", source: "touch", interactions: 64 },
  { location: "Lift Lobby, Level 1", source: "scan", interactions: 52 },
  { location: "Sauna Corridor", source: "touch", interactions: 41 },
  { location: "Pool Terrace", source: "scan", interactions: 37 },
  { location: "Guest Room Card", source: "touch", interactions: 29 },
];

export const SPA_ACTIVITY = { interactions: 1248, touch: 823, scan: 361, direct: 64 } as const;

export interface VersionRowData {
  kind: "pdf" | "website";
  headline: string;
  published: string;
}

export const SPA_PREVIOUS: VersionRowData[] = [
  { kind: "pdf", headline: "Spa Treatments.pdf", published: "2 Sept 2026, 09:14" },
  { kind: "pdf", headline: "Summer Spa Menu.pdf", published: "18 Jun 2026, 11:02" },
];
