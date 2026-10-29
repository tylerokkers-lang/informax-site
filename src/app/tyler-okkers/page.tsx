import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const profileUrl = `${SITE_URL}/tyler-okkers`;
const title = "Tyler Okkers | Founder & CEO, Informax & Informax Cloud";
const description = "Tyler Okkers is the Founder and Chief Executive Officer of Informax and Informax Cloud, helping hotels and restaurants keep guest information current.";
const personId = `${profileUrl}#person`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/tyler-okkers" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: profileUrl,
    type: "profile",
    firstName: "Tyler",
    lastName: "Okkers",
    locale: "en_GB",
    siteName: "Informax",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Informax" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.jpg"] },
};

const profileData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${profileUrl}#profile`,
      url: profileUrl,
      name: title,
      description,
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Tyler Okkers",
      givenName: "Tyler",
      familyName: "Okkers",
      url: profileUrl,
      jobTitle: "Founder and Chief Executive Officer",
      description,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@id": `${profileUrl}#profile` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Informax",
      url: SITE_URL,
      founder: { "@id": personId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/informax-cloud#software`,
      name: "Informax Cloud",
      url: `${SITE_URL}/informax-cloud`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      creator: { "@id": personId },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function FounderProfilePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileData).replace(/</g, "\\u003c") }} />
      <section className="bg-paper pt-[140px] pb-20 md:pt-[180px] md:pb-28">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-[15px] font-semibold text-brass-deep">Founder profile</p>
            <h1 className="font-serif-display text-[clamp(44px,7vw,80px)] leading-[1.04] tracking-[-0.02em] text-ink">Tyler Okkers</h1>
            <p className="mt-7 max-w-[40ch] text-[clamp(21px,2.8vw,30px)] leading-snug text-ink-soft">Founder and Chief Executive Officer of Informax and Informax Cloud.</p>
          </div>
          <div className="mt-14 grid gap-8 border-t border-line pt-10 md:mt-20 md:grid-cols-[1fr_2fr] md:gap-16 md:pt-14">
            <h2 className="text-[15px] font-semibold text-brass-deep">About Tyler Okkers</h2>
            <div className="max-w-[62ch] space-y-6 text-[17px] leading-relaxed text-ink-mute">
              <p>Tyler Okkers is the Founder and Chief Executive Officer of Informax and Informax Cloud.</p>
              <p>Informax builds Informax Cloud, a platform for hotels and restaurants to manage the information guests see. Menus, guest directories, spa information and offers can be updated through the same printed QR codes, helping teams keep information current.</p>
              <p>Informax also offers design services to help businesses present their content clearly and consistently with their brand.</p>
              <div className="flex flex-wrap gap-6 pt-3">
                <Link href="/informax-cloud" className="ix-link text-brass-deep">Explore Informax Cloud</Link>
                <Link href="/" className="ix-link text-brass-deep">Visit Informax</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
