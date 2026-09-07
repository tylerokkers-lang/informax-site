export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

export const NAV_SERVICES = [
  {
    label: "Websites",
    href: "/websites",
    desc: "Custom-designed, custom-built websites.",
  },
  {
    label: "Digital Information",
    href: "/digital-information",
    desc: "Brochures, pamphlets and directories.",
  },
  {
    label: "Hospitality",
    href: "/hospitality",
    desc: "Digital guest experiences for hotels & venues.",
  },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Enquire", href: "/enquire" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { label: "Services Overview", href: "/services" },
  { label: "Websites", href: "/websites" },
  { label: "Digital Brochures", href: "/digital-information#brochures" },
  { label: "Digital Directories", href: "/digital-information#directories" },
  { label: "Hospitality", href: "/hospitality" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "Pricing", href: "/pricing" },
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
  "Website",
  "Digital Brochure",
  "Digital Pamphlet",
  "Digital Directory",
  "Hospitality",
  "Bespoke Project",
  "Multiple Services",
  "Not Sure Yet",
] as const;

