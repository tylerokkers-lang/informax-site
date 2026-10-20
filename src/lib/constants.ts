export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

export const PRIMARY_CTA = "Request a Demo";

export const CLOUD_LOGIN_URL = "https://informax.cloud/login";

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

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Hotels", href: "/hotels" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "Contact", href: "/enquire" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "Hotels", href: "/hotels" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Informax Cloud", href: "/informax-cloud" },
] as const;

export const FOOTER_ALSO_LINKS = [
  { label: "Digital Experiences", href: "/digital-experiences" },
  { label: "Websites", href: "/websites" },
  { label: "Digital Brochures & Directories", href: "/digital-information" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "About Informax", href: "/about" },
  { label: "Request a Demo", href: "/enquire" },
  { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
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
  "Access Points",
  "Informax Cloud",
  "Something else",
  "Not sure yet",
] as const;
