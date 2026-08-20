import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/constants";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Informax — Website Design, Digital Brochures & Directories",
    template: "%s — Informax",
  },
  description:
    "Informax designs and builds custom websites, digital brochures, digital directories and bespoke digital experiences for businesses — plus a specialist hospitality practice. Websites from £1,200.",
  keywords: [
    "website design",
    "website development",
    "custom websites",
    "business website design",
    "digital brochures",
    "digital directories",
    "digital guest directories",
    "hospitality websites",
    "hospitality technology",
    "custom digital experiences",
  ],
  authors: [{ name: "Informax" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Informax",
    title: "Informax — Website Design, Digital Brochures & Directories",
    description:
      "Digital experiences, designed around your business — websites, digital brochures, directories and bespoke digital projects. Websites from £1,200.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Informax — Website Design, Digital Brochures & Directories",
    description:
      "Digital experiences, designed around your business — websites, digital brochures, directories and bespoke digital projects.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      <body className="bg-paper text-ink-soft antialiased flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-charcoal-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
