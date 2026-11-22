import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

const profileUrl = `${SITE_URL}/tyler-okkers`;
const title = "Tyler Okkers | Founder of Informax";
const description =
  "Tyler Okkers founded Informax to simplify how businesses manage and deliver digital information, and led the development of Informax Cloud.";
const personId = `${profileUrl}#person`;

/** The owner's biography, word for word (approved 21 November 2026). */
const BIOGRAPHY = [
  "Tyler Okkers founded Informax with a vision to simplify how businesses manage and deliver digital information.",
  "Drawing on his background in luxury hospitality, Tyler recognised the need for a more intuitive, efficient and reliable way for businesses to connect people with information.",
  "This vision led to the development of Informax Cloud, a platform designed to help businesses deliver seamless digital experiences.",
];

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

// Informax is the company; Informax Cloud is its product.
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
      jobTitle: "Founder",
      description: BIOGRAPHY[0],
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
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function FounderProfilePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileData).replace(/</g, "\\u003c") }} />
      <section aria-labelledby="founder-h" className="bg-paper pb-24 pt-[120px] md:pb-32 md:pt-[160px]">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <h1 id="founder-h" className="x-display text-[clamp(46px,7vw,96px)] text-ink">
            Tyler Okkers
          </h1>
          <p className="mt-4 text-[clamp(20px,2.2vw,26px)] text-ink-quiet">Founder of Informax</p>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:mt-20 md:grid-cols-[1fr_2fr] md:gap-16 md:pt-14">
            <h2 className="text-[15px] font-semibold text-brass-deep">Biography</h2>
            <div className="max-w-[60ch]">
              <div className="space-y-6 text-[19px] leading-[1.65] text-ink-soft">
                {BIOGRAPHY.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Link href="/informax-cloud" className="ix-link group text-brass-deep hover:text-ink">
                  Explore Informax Cloud <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/about" className="ix-link group text-brass-deep hover:text-ink">
                  About Informax <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
