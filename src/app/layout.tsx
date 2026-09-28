import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CONTACT_EMAIL, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

const DEFAULT_TITLE = "Informax | Hotel Information Management with Informax Cloud";
const DEFAULT_DESCRIPTION =
  "Informax Cloud gives every hotel room and area its own Access Point, so hotels control the guest information behind it, schedule temporary content and manage it all from one place.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Informax",
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Informax" }],
  applicationName: "Informax",
  openGraph: {
    type: "website",
    // No site-wide url: each page is shared under its own address.
    siteName: "Informax",
    locale: "en_GB",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    // The image comes from app/opengraph-image.jpg (and per-route files).
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Informax",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    "Informax builds Informax Cloud, hotel information management that gives every room and area its own Access Point and controls the guest information behind it.",
  logo: `${SITE_URL}/icon.png`,
  sameAs: Object.values(SOCIAL_LINKS).filter(Boolean),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Cheap head start for the Informax Cloud sign-in; the full
            connection is warmed only when someone points at the link. */}
        <link rel="dns-prefetch" href="https://informax.cloud" />
      </head>
      <body className="bg-paper text-ink-soft antialiased flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-charcoal-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
