/**
 * Illustrative data for the product films. Every hotel, Space, page and
 * figure here is fictional. Illustrative data is fine; illustrative
 * functionality is not, so every label, button and message shown inside an
 * app frame exists in the real Informax Cloud app.
 */

export const HOTEL = {
  name: "Maison Aurelia",
  place: "Lake Como, Italy",
} as const;

export const SPA = {
  name: "Spa",
  pdf: "Spa Treatments.pdf",
  /** A page on the Hotel's own website, shown by its name — never as a web address. */
  web: "Spa booking page",
  touchPoints: 12,
} as const;

export const DIRECTORY = {
  name: "Guest Directory",
  pdf: "GuestDirectory.pdf",
  nextPdf: "GuestDirectory-Winter.pdf",
  nextSize: "3.4 MB",
  touchPoints: 400,
} as const;

export interface SpaceCardData {
  id: string;
  name: string;
  kind: "pdf" | "website";
  file: string;
  touchPoints: number;
  interactions: number;
  code: string;
}

export const SPACE_CARDS: SpaceCardData[] = [
  { id: "spa", name: "Spa", kind: "pdf", file: "Spa Treatments.pdf", touchPoints: 12, interactions: 1248, code: "spa" },
  { id: "restaurants", name: "Restaurants", kind: "website", file: "Dining menu page", touchPoints: 18, interactions: 2106, code: "restaurants" },
  { id: "gym", name: "Gym", kind: "website", file: "Class timetable page", touchPoints: 5, interactions: 426, code: "gym" },
  { id: "meetings", name: "Meetings & Events", kind: "website", file: "Event floor plans page", touchPoints: 9, interactions: 782, code: "events" },
  { id: "directory", name: "Guest Directory", kind: "pdf", file: "GuestDirectory.pdf", touchPoints: 400, interactions: 6412, code: "guest-directory" },
  { id: "rooms", name: "Guest Rooms", kind: "pdf", file: "In-Room Dining.pdf", touchPoints: 400, interactions: 3380, code: "guest-rooms" },
];

export interface TouchPointRowData {
  location: string;
  source: "touch" | "scan";
  interactions: number;
}

export const SPA_TOUCH_POINTS: TouchPointRowData[] = [
  { location: "Spa Reception", source: "touch", interactions: 218 },
  { location: "Relaxation Lounge", source: "touch", interactions: 164 },
  { location: "Changing Rooms", source: "scan", interactions: 121 },
  { location: "Treatment Room 1", source: "touch", interactions: 98 },
  { location: "Treatment Room 2", source: "touch", interactions: 94 },
  { location: "Treatment Room 3", source: "touch", interactions: 81 },
  { location: "Vitality Pool", source: "scan", interactions: 77 },
  { location: "Spa Café", source: "touch", interactions: 64 },
  { location: "Lift Lobby, Level 1", source: "scan", interactions: 52 },
  { location: "Sauna Corridor", source: "touch", interactions: 41 },
  { location: "Pool Terrace", source: "scan", interactions: 37 },
  { location: "Spa Boutique", source: "touch", interactions: 29 },
];

export const SPA_ACTIVITY = { interactions: 1248, touch: 823, scan: 361, direct: 64 } as const;

/** Most-used Touch Point locations across the hotel, for the Activity snippet. */
export const TOP_TOUCH_POINTS: TouchPointRowData[] = [
  { location: "Guest Rooms", source: "scan", interactions: 642 },
  { location: "Spa Reception", source: "touch", interactions: 218 },
  { location: "Meeting Rooms", source: "touch", interactions: 146 },
];

export interface VersionRowData {
  kind: "pdf" | "website";
  headline: string;
  published: string;
}

export const SPA_PREVIOUS: VersionRowData[] = [
  { kind: "pdf", headline: "Spa Treatments.pdf", published: "2 Sept 2026, 09:14" },
  { kind: "pdf", headline: "Summer Spa Menu.pdf", published: "18 Jun 2026, 11:02" },
];
