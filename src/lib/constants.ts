export const SITE_URL = "https://informax.co.uk";
export const CONTACT_EMAIL = "info@informax.co.uk";

export const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Hotels", href: "/#for-hotels" },
  { label: "Digital Directories", href: "/#digital-directory" },
  { label: "About", href: "/about" },
  { label: "Enquire", href: "/enquire" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Hotels", href: "/#for-hotels" },
  { label: "Digital Directories", href: "/#digital-directory" },
  { label: "The Guest Journey", href: "/#guest-journey" },
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

export const PROPERTY_TYPES = [
  "Independent Hotel",
  "Hotel Group",
  "Resort",
  "Boutique Hotel",
  "Serviced Apartments",
  "Other",
] as const;

export const ENQUIRY_INTERESTS = [
  "Informax Tags",
  "Digital Directory",
  "Custom Hospitality Experience",
  "Multiple Properties",
  "Other",
] as const;
