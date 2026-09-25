export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

export const PRIMARY_CTA = "Talk to Informax";

export const NAV_LINKS = [
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "Touch Points", href: "/touch-points" },
  { label: "About", href: "/about" },
  { label: "Enquire", href: "/enquire" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "Informax Cloud", href: "/informax-cloud" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Touch Points", href: "/touch-points" },
  { label: "Hospitality", href: "/hospitality" },
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
  "Touch Points",
  "A demonstration",
  "Guest Directory",
  "Meetings & Events",
  "Spa & Wellness",
  "Restaurants",
  "Not Sure Yet",
] as const;
