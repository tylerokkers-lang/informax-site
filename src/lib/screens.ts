/**
 * Real Informax Cloud screens, captured from the current product with fictional
 * data (Marlowe Grand, Copper Table). Generated from public/product/screens.
 * Replace a file under a new name when you re-capture it; the media is cached.
 */
const SCREENS = {
  "guest-room-324-conference": { w: 780, h: 1688 },
  "guest-room-324-directory": { w: 780, h: 1688 },
  "guest-table-7-terrace": { w: 780, h: 1688 },
  "guest-table-7-wine": { w: 780, h: 1688 },
  "guest-transition": { w: 780, h: 1688 },
  "hotel-activity": { w: 2720, h: 2000 },
  "hotel-code": { w: 2720, h: 2000 },
  "hotel-codes": { w: 2720, h: 2000 },
  "hotel-overview": { w: 2720, h: 1720 },
  "hotel-room-324-temporary": { w: 2720, h: 2000 },
  "hotel-room-324-versions": { w: 2720, h: 4400 },
  "hotel-room-324": { w: 2720, h: 2000 },
  "hotel-spaces": { w: 2720, h: 2200 },
  "hotel-team": { w: 2720, h: 1800 },
  "restaurant-codes": { w: 2720, h: 1800 },
  "restaurant-overview": { w: 2720, h: 1720 },
  "restaurant-spaces": { w: 2720, h: 2000 },
  "restaurant-table-7-temporary": { w: 2720, h: 2000 },
} as const;

export type ScreenName = keyof typeof SCREENS;

export function screen(name: ScreenName) {
  return { src: `/product/screens/${name}.webp`, ...SCREENS[name] };
}
