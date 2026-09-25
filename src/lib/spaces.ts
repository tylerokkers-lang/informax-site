import {
  BedDouble,
  BookOpen,
  Dumbbell,
  Presentation,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export interface Space {
  id: string;
  name: string;
  icon: LucideIcon;
  /** What guests find when they open this Space. */
  holds: string[];
  /** Demo only: how many Touch Points connect to this Space. */
  touchPoints: number;
  pdf: string;
  site: string;
}

export const SPACES: Space[] = [
  {
    id: "spa",
    name: "Spa",
    icon: Sparkles,
    holds: ["Treatments", "Booking", "Opening hours", "Offers"],
    touchPoints: 12,
    pdf: "Spa Treatments.pdf",
    site: "maisonaurelia.com/spa/book",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: UtensilsCrossed,
    holds: ["Menus", "Bookings", "Opening hours", "Specials"],
    touchPoints: 8,
    pdf: "Dinner Menu.pdf",
    site: "maisonaurelia.com/dining/menu",
  },
  {
    id: "gym",
    name: "Gym",
    icon: Dumbbell,
    holds: ["Class timetable", "Facilities", "Wellness information"],
    touchPoints: 5,
    pdf: "Class Timetable.pdf",
    site: "maisonaurelia.com/wellness/classes",
  },
  {
    id: "meetings",
    name: "Meetings & Events",
    icon: Presentation,
    holds: ["Floor plans", "Room layouts", "Menus", "Event information"],
    touchPoints: 9,
    pdf: "Meeting Rooms.pdf",
    site: "maisonaurelia.com/events/floorplans",
  },
  {
    id: "bedrooms",
    name: "Guest Rooms",
    icon: BedDouble,
    holds: ["Guest information", "Hotel services", "Room service", "Local information"],
    touchPoints: 400,
    pdf: "In-Room Dining.pdf",
    site: "maisonaurelia.com/stay",
  },
  {
    id: "directory",
    name: "Guest Directory",
    icon: BookOpen,
    holds: ["Full hotel directory", "Services", "FAQs", "Facilities"],
    touchPoints: 400,
    pdf: "GuestDirectory.pdf",
    site: "maisonaurelia.com/guest-directory",
  },
];

/** Spaces shown in the interactive Cloud demo (Guest Directory last, as one among many). */
export const DEMO_SPACES = ["spa", "restaurants", "gym", "meetings", "directory"].map(
  (id) => SPACES.find((s) => s.id === id)!,
);

export const PLACEMENTS = [
  { name: "Spa reception", space: "Spa", scene: "desk" },
  { name: "Lift lobby", space: "Guest Directory", scene: "lift" },
  { name: "Bedroom", space: "Guest Directory", scene: "bed" },
  { name: "Gym entrance", space: "Gym", scene: "wall" },
  { name: "Restaurant table", space: "Restaurants", scene: "table" },
  { name: "Conference corridor", space: "Meetings & Events", scene: "wall" },
  { name: "Reception desk", space: "Guest Directory", scene: "desk" },
  { name: "Pool", space: "Pool", scene: "pool" },
  { name: "Executive Lounge", space: "Executive Lounge", scene: "table" },
] as const;

export type PlacementScene = (typeof PLACEMENTS)[number]["scene"];
