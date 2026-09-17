import Image from "next/image";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SERVICE_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-cream-mute pt-20 pb-8">
      <div className="mx-auto max-w-8xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-14 border-b border-line-dark">
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/informax-logo-white.png"
                alt="Informax"
                width={420}
                height={140}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-cream-mute">
              A digital design and development studio. We build websites,
              digital brochures, directories and bespoke digital experiences
              for businesses, including a specialist hospitality practice.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href="#"
                aria-label="Informax on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-dark transition-all duration-300 hover:border-brass-light hover:text-brass-light hover:-translate-y-0.5"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Informax on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-dark transition-all duration-300 hover:border-brass-light hover:text-brass-light hover:-translate-y-0.5"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <FooterCol title="Services" links={FOOTER_SERVICE_LINKS} />
          <FooterCol title="Company" links={FOOTER_COMPANY_LINKS} />

          <div>
            <h5 className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-cream-mute mb-5">
              Get in Touch
            </h5>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-cream-mute transition-colors hover:text-brass-light"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="pt-7 flex flex-wrap items-center justify-between gap-3 text-[13px] text-cream-mute">
          <div>© {new Date().getFullYear()} Informax. All rights reserved.</div>
          <div className="flex gap-6">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-brass-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h5 className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-cream-mute mb-5">
        {title}
      </h5>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-cream-mute transition-colors hover:text-brass-light"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
