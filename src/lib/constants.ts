export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

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

export const PRIMARY_CTA = "Enquire";

export const CLOUD_LOGIN_URL = "https://informax.cloud/login";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "Hotels", href: "/hotels" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "About", href: "/about" },
  { label: "Enquire", href: "/enquire" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "Hotels", href: "/hotels" },
  { label: "Restaurants", href: "/restaurants" },
] as const;

export const FOOTER_ALSO_LINKS = [
  { label: "Digital Experiences", href: "/digital-experiences" },
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
  "Codes for a hotel",
  "Codes for a restaurant",
  "Framed Code cards",
  "A demonstration",
  "Not sure yet",
] as const;
