export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

export const PRIMARY_CTA = "Talk to Informax";

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

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "Digital Experiences", href: "/digital-experiences" },
  { label: "About", href: "/about" },
  { label: "Talk to Informax", href: "/enquire" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "Digital Experiences", href: "/digital-experiences" },
] as const;

export const FOOTER_ALSO_LINKS = [
  { label: "Websites", href: "/websites" },
  { label: "Digital Brochures & Directories", href: "/digital-information" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "About Informax", href: "/about" },
  { label: "Enquire", href: "/enquire" },
  { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
] as const;

export const ENQUIRY_INTERESTS = [
  "Informax Cloud",
  "Guest Directory",
  "Digital Experiences",
  "A demonstration",
  "Spa & Wellness",
  "Restaurants",
  "Meetings & Events",
  "Not sure yet",
] as const;
