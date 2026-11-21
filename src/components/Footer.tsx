import Image from "next/image";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  DEMO_CTA,
  SOCIAL_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_ALSO_LINKS,
  FOOTER_PRODUCT_LINKS,
  FOOTER_SOLUTION_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-paper pb-10 pt-20 text-ink-mute md:pt-24">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-line pb-16 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass" aria-label="Informax home">
              <Image src="/brand/informax-logo-white-trim.png" alt="Informax" width={746} height={224} className="h-auto w-[128px] brightness-0" />
            </Link>
            <p className="x-title mt-6 max-w-[16ch] text-[26px] text-ink">Digital experiences, Done Right.</p>
            <p className="mt-4 max-w-[34ch] text-[14.5px] leading-relaxed">
              Informax Cloud keeps menus, guest information and every Scan Point current. Built in hospitality, in the United Kingdom.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary min-h-10! rounded-full! px-5! text-[14px]!">
                {DEMO_CTA.label}
              </Link>
              <a
                href={SOCIAL_LINKS.instagram || undefined}
                target={SOCIAL_LINKS.instagram ? "_blank" : undefined}
                rel={SOCIAL_LINKS.instagram ? "noopener noreferrer" : undefined}
                aria-label="Informax on Instagram"
                aria-disabled={SOCIAL_LINKS.instagram ? undefined : true}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink-mute transition-colors duration-300 hover:bg-ink/10 hover:text-ink aria-disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {SOCIAL_LINKS.linkedin ? (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Informax on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink-mute transition-colors duration-300 hover:bg-ink/10 hover:text-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          <FooterCol title="Product" links={FOOTER_PRODUCT_LINKS} />
          <FooterCol title="Solutions" links={FOOTER_SOLUTION_LINKS} />
          <FooterCol title="Company" links={FOOTER_COMPANY_LINKS} />
          <div>
            <h2 className="mb-5 text-[13px] font-semibold text-ink">Get in touch</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[14.5px] transition-colors hover:text-ink">
              {CONTACT_EMAIL}
            </a>
            <h2 className="mb-4 mt-9 text-[13px] font-semibold text-ink">Also from Informax</h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_ALSO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14.5px] transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-[13px]">
          <p>© {new Date().getFullYear()} Informax. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 text-[13px] font-semibold text-ink">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("http") ? (
              <a href={link.href} className="text-[14.5px] transition-colors hover:text-ink">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="text-[14.5px] transition-colors hover:text-ink">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
