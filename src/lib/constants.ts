export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

export const PRIMARY_CTA = "Request a Demo";

export const CLOUD_LOGIN_URL = "https://informax.cloud/login";

/*
 * Informax Cloud (V2) is in development and not publicly available. Its
 * Coming Soon page lives on this site (/informax-cloud). Do not link Coming
 * Soon calls to action to informax.cloud: that domain runs V1 and redirects
 * to its sign-in page. The only link there is the existing customers' log-in
 * (CLOUD_LOGIN_URL).
 */

/**
 * Official Informax social profiles, supplied by the owner. LinkedIn is still
 * to come: paste its full profile address here when it is available. An
 * empty entry shows its footer icon as inactive (never a guessed or dead
 * link) and is left out of the organisation's structured data.
 */
export const SOCIAL_LINKS = {
  linkedin: "",
  instagram: "https://www.instagram.com/informax_cloud/",
} as const;

/** The demo request is the site's one primary action. */
export const DEMO_CTA = { label: "Request a Demo", href: "/enquire" } as const;

/** Primary navigation. Solutions opens a small menu of its own pages. */
export const NAV_LINKS = [
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "Solutions", href: "/solutions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const SOLUTION_LINKS = [
  { label: "Hospitality", href: "/hospitality", body: "Hotels, resorts and spas" },
  { label: "Restaurants", href: "/restaurants", body: "Menus that change with the kitchen" },
  { label: "Galleries and exhibitions", href: "/solutions#galleries", body: "Guides for every room" },
  { label: "Events and venues", href: "/solutions#events", body: "Programmes that keep up" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customer log in", href: CLOUD_LOGIN_URL },
] as const;

export const FOOTER_SOLUTION_LINKS = [
  { label: "All solutions", href: "/solutions" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Galleries and exhibitions", href: "/solutions#galleries" },
  { label: "Events and venues", href: "/solutions#events" },
] as const;

export const FOOTER_ALSO_LINKS = [
  { label: "Digital Experiences", href: "/digital-experiences" },
  { label: "Websites", href: "/websites" },
  { label: "Digital Brochures & Directories", href: "/digital-information" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "About Informax", href: "/about" },
  { label: "Request a Demo", href: "/enquire" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
] as const;

export const ENQUIRY_INTERESTS = [
  "A demonstration",
  "Restaurant menus",
  "Hotel guest directory",
  "Spa & wellness",
  "Scan Points",
  "Content design",
  "Informax Cloud",
  "Something else",
  "Not sure yet",
] as const;
