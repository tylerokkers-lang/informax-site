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
    default: "Informax — Digital Guest Directories for Hotels",
    template: "%s — Informax",
  },
  description:
    "Informax gives hotels a digital guest directory guests reach with one tap or scan — no app required. Showcase dining, spa, facilities and offers the moment a guest walks in.",
  keywords: [
    "hotel digital directory",
    "digital hotel directory",
    "hotel guest information",
    "hotel guest experience technology",
    "digital guest directory",
    "hotel NFC",
    "NFC hotel information",
    "hotel QR directory",
    "hospitality technology",
  ],
  authors: [{ name: "Informax" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Informax",
    title: "Informax — Digital Guest Directories for Hotels",
    description:
      "Your hotel has more to say. Give guests a reason to discover it — a tap-to-access digital directory built for hospitality.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Informax — Digital Guest Directories for Hotels",
    description:
      "Your hotel has more to say. Give guests a reason to discover it.",
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
