import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const DEFAULT_TITLE = "Informax Cloud | Connected Spaces and Touch Points for Hotels";
const DEFAULT_DESCRIPTION =
  "Informax Cloud gives every part of your hotel a permanent digital Space. Connect Touch Points throughout the property and change what guests see from anywhere.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Informax",
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Informax" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Informax",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
    "Informax builds Informax Cloud, a hospitality content platform that connects digital information with physical locations throughout a hotel.",
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
      className={`${fraunces.variable} ${inter.variable}`}
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
