"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { DEMO_CTA, NAV_LINKS } from "@/lib/constants";
import CloudEntrance from "@/components/CloudEntrance";

// Routes that open with a full-bleed dark hero, so the header can start
// transparent over it. Every other route gets a solid header from the
// start, otherwise the white wordmark disappears against a light hero.
const TRANSPARENT_AT_TOP_ROUTES = new Set([
  "/",
  "/restaurants",
  "/hotels",
  "/informax-cloud",
  "/enquire",
  "/digital-experiences",
  "/digital-information",
  "/websites",
]);

/** Informax Cloud is in development: the nav says so wherever it names it. */
function SoonTag() {
  return (
    <span className="ml-1.5 inline-block translate-y-[-1px] rounded-full bg-brass-light/15 px-1.5 py-[1px] align-middle text-[10px] font-semibold uppercase tracking-[0.06em] text-brass-light">
      Soon
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const canBeTransparent = TRANSPARENT_AT_TOP_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(!canBeTransparent);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(!canBeTransparent || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [canBeTransparent]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background,box-shadow,border-color,backdrop-filter] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "border-line-dark bg-charcoal-950/90 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-8xl items-center justify-between gap-6 px-6 md:h-[76px] md:px-10">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Informax home">
            <Image src="/brand/informax-logo-white-trim.png" alt="Informax" width={746} height={224} priority className="h-[34px] w-auto md:h-[38px]" />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap py-1 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brass-light after:transition-all after:duration-300 ${
                    active ? "text-white after:w-full" : "text-cream-mute after:w-0 hover:text-white hover:after:w-full"
                  }`}
                >
                  {link.label}
                  {link.href === "/informax-cloud" ? <SoonTag /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <CloudEntrance variant="header" />
            <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary hidden min-h-10! px-4! text-[14px]! sm:inline-flex">
              {DEMO_CTA.label}
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brass-light xl:hidden"
            >
              <span className="relative block h-[1.5px] w-[18px] bg-cream">
                <span className={`absolute left-0 h-[1.5px] w-[18px] bg-cream transition-transform duration-300 ${open ? "top-0 rotate-45" : "-top-[6px] rotate-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-[18px] bg-cream transition-transform duration-300 ${open ? "top-0 -rotate-45" : "top-[6px] rotate-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[140] bg-black/60"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile"
              className="fixed bottom-0 right-0 top-0 z-[150] flex w-[min(320px,84vw)] flex-col gap-1 overflow-y-auto border-l border-line-dark bg-charcoal-950 px-8 pb-10 pt-24"
            >
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`py-3 text-lg font-medium transition-colors duration-300 ${active ? "text-brass-light" : "text-cream hover:text-brass-light"}`}
                  >
                    {link.label}
                    {link.href === "/informax-cloud" ? <SoonTag /> : null}
                  </Link>
                );
              })}
              <Link href={DEMO_CTA.href} onClick={() => setOpen(false)} className="ix-btn ix-btn-primary mt-6 w-full">
                {DEMO_CTA.label}
              </Link>
              <CloudEntrance variant="drawer" />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
