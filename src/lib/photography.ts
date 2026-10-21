/**
 * Every photograph on the site, by slot. Each slot names one specific use
 * case, so the site never becomes a collection of random stock images.
 * The full specification for each slot (subject, framing, crops, safe areas,
 * minimum size, licence) is in docs/photography-brief.md.
 *
 * `src` is empty until an appropriately licensed photograph is supplied.
 * While it is empty the slot renders a labelled placeholder (see Photo.tsx)
 * and the page must not go to production. To add a photograph: put the file
 * in public/photos/, set `src`, `width`, `height`, `licence` and `source`,
 * and check the `alt` text still describes it.
 */
export type PhotoSlot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** What the photograph must show. Used as the placeholder caption. */
  brief: string;
  /** The light of the scene, for the placeholder only. */
  tone: "candle" | "kitchen" | "linen" | "marble" | "spa" | "dusk";
  /** The licence the photograph is used under, e.g. "Unsplash Licence" or "Commissioned, all rights to Informax". */
  licence: string;
  /** Where it came from: the photographer and the page it was licensed from, or the shoot. */
  source: string;
  /**
   * True when the photograph itself shows a real, printed Informax Access
   * Point. The site then leaves out the drawn Code card it would otherwise
   * place over the photograph, so there are never two.
   */
  showsAccessPoint?: boolean;
};

const pending = { src: "", licence: "", source: "" };

export const PHOTOS = {
  restaurantRoom: {
    ...pending,
    width: 2400,
    height: 1600,
    alt: "An elegant contemporary restaurant in the evening, tables laid for dinner",
    brief: "Contemporary fine-dining room at dusk, warm light, tables laid",
    tone: "candle",
  },
  chefPass: {
    ...pending,
    width: 2400,
    height: 1600,
    alt: "A chef at the pass in a professional kitchen, finishing a dish",
    brief: "Chef at the pass in a calm professional kitchen",
    tone: "kitchen",
  },
  restaurantTable: {
    ...pending,
    width: 2000,
    height: 2500,
    alt: "A restaurant table for two with an Informax Code card beside the glasses",
    brief: "Table for two, linen and glassware, a discreet Code card by the candle",
    tone: "candle",
  },
  signatureDish: {
    ...pending,
    width: 2800,
    height: 1800,
    alt: "An editorial photograph of a plated fish dish on a dark ceramic plate",
    brief: "Editorial plate: roast hake, mussels, saffron broth",
    tone: "candle",
  },
  hotelLounge: {
    ...pending,
    width: 2800,
    height: 1600,
    alt: "A luxury hotel suite with a low coffee table and a Code card beside a book",
    brief: "Luxury suite sitting area, coffee table with a premium Code card",
    tone: "linen",
  },
  hotelBathroom: {
    ...pending,
    width: 2400,
    height: 2400,
    alt: "A marble hotel bathroom with a vanity, folded towels and a small Code card",
    brief: "Marble bathroom vanity, folded towels, a small Code card by the basin",
    tone: "marble",
  },
  spaTreatment: {
    ...pending,
    width: 2000,
    height: 1500,
    alt: "A calm spa treatment room with soft light and folded towels",
    brief: "Spa treatment room, soft daylight, stones and towels",
    tone: "spa",
  },
  hotelSuite: {
    ...pending,
    width: 2800,
    height: 1600,
    alt: "A premium hotel suite bedroom with a view at dusk",
    brief: "Premium suite bedroom with a city or garden view at dusk",
    tone: "dusk",
  },
  hospitalityTeam: {
    ...pending,
    width: 2400,
    height: 1600,
    alt: "A restaurant manager checking a phone at the front of house",
    brief: "Manager at front of house checking a phone before service",
    tone: "kitchen",
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof PHOTOS;

/** A slot is finished only when it has a photograph AND a recorded licence and source. */
export const photoReady = (p: PhotoSlot) => Boolean(p.src && p.licence && p.source);

/** True while any slot still needs its photograph. Production is blocked while this is true. */
export const PHOTOGRAPHY_PENDING = Object.values(PHOTOS).some((p) => !photoReady(p));

/** Whether to draw a Code card over this photograph (not when the photograph already shows a real one). */
export const drawCodeOver = (k: PhotoKey) => !(PHOTOS[k] as PhotoSlot).showsAccessPoint;
