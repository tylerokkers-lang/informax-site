"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

// Routes whose hero is a full-bleed dark video that a transparent header
// can sit over. Every other page's hero is on a light background, so the
// header must be solid dark from the start there — otherwise the white
// wordmark disappears against it. Add a route here only if it opens with
// its own full-bleed dark video hero.
const TRANSPARENT_AT_TOP_ROUTES = new Set([
  "/",
  "/hospitality",
  "/digital-information",
  "/websites",
]);

export default function Header() {
  const pathname = usePathname();
  const canBeTransparent = TRANSPARENT_AT_TOP_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(!canBeTransparent);
  const [open, setOpen] = useState(false);
  const primaryLinks = NAV_LINKS.filter((l) => l.label !== "Enquire");

  useEffect(() => {
    const onScroll = () =>
      setScrolled(!canBeTransparent || window.scrollY > 40);
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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[100] transition-[padding,background,box-shadow,border-color,backdrop-filter] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
          scrolled
            ? "py-2 bg-charcoal-950/90 backdrop-blur-md border-line-dark"
            : "py-3 bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-8xl px-6 md:px-10 flex items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Informax home">
            <Image
              src="/informax-logo-white.png"
              alt="Informax"
              width={420}
              height={140}
              priority
              className="h-[72px] w-auto md:h-[86px]"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-7" aria-label="Primary">
            {primaryLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap text-[13.5px] font-medium tracking-[0.01em] py-1 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brass-light after:transition-all after:duration-300 ${
                    active
                      ? "text-white after:w-full"
                      : "text-cream-mute after:w-0 hover:text-white hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/enquire"
              className="hidden md:inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[13.5px] font-medium text-white transition-colors duration-300 hover:border-white"
            >
              Start a Project
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="xl:hidden flex h-9 w-9 items-center justify-center shrink-0"
            >
              <span className="relative block h-[1.5px] w-[18px] bg-cream">
                <span
                  className={`absolute left-0 h-[1.5px] w-[18px] bg-cream transition-transform duration-300 ${
                    open ? "top-0 rotate-45" : "-top-[6px] rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-[18px] bg-cream transition-transform duration-300 ${
                    open ? "top-0 -rotate-45" : "top-[6px] rotate-0"
                  }`}
                />
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile"
              className="fixed top-0 right-0 bottom-0 z-[150] w-[min(320px,84vw)] overflow-y-auto bg-charcoal-950 border-l border-line-dark px-8 pb-10 pt-24 flex flex-col gap-1"
            >
              {primaryLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`py-3 text-lg font-medium transition-colors duration-300 ${
                      active ? "text-brass-light" : "text-cream hover:text-brass-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/enquire"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex w-fit items-center gap-2 border-b border-white pb-1 text-[15px] font-medium text-white"
              >
                Start a Project
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
