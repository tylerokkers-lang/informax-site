"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[100] transition-[padding,background,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
          scrolled
            ? "py-1.5 bg-charcoal-950/97 border-line-dark shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]"
            : "py-2.5 bg-charcoal-950 border-transparent"
        }`}
      >
        <div className="mx-auto max-w-8xl px-6 md:px-8 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center shrink-0" aria-label="Informax home">
            <Image
              src="/informax-logo-white.png"
              alt="Informax"
              width={420}
              height={140}
              priority
              className="h-16 md:h-20 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-cream-mute py-1 transition-colors duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-brass-light after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/#digital-directory"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-line-dark px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-brass-light hover:text-brass-light hover:-translate-y-0.5"
            >
              See Informax in Action
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-line-dark shrink-0"
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
              className="fixed top-0 right-0 bottom-0 z-[150] w-[min(320px,84vw)] bg-charcoal-950 border-l border-line-dark px-8 pb-10 pt-28 flex flex-col gap-7"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-cream"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#digital-directory"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brass-light to-brass-deep px-6 py-3.5 text-sm font-semibold text-[#06231a]"
              >
                See Informax in Action
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
