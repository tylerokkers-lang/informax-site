"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, NAV_SERVICES } from "@/lib/constants";

// Routes whose hero is a full-bleed dark video that a transparent header
// can sit over. Every other page's hero is on a light background, so the
// header must be solid dark from the start there — otherwise the white
// wordmark disappears against it. Add a route here only if it opens with
// its own full-bleed dark video hero.
const TRANSPARENT_AT_TOP_ROUTES = new Set(["/", "/hospitality"]);

export default function Header() {
  const pathname = usePathname();
  const canBeTransparent = TRANSPARENT_AT_TOP_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(!canBeTransparent);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[100] transition-[padding,background,box-shadow,border-color,backdrop-filter] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
          scrolled
            ? "py-2.5 bg-charcoal-950/90 backdrop-blur-md border-line-dark"
            : "py-4 bg-transparent border-transparent"
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
              className="h-14 w-auto md:h-16"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className="flex items-center gap-1.5 text-[13.5px] font-medium tracking-[0.01em] text-cream-mute py-1 transition-colors duration-300 hover:text-white"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full mt-4 w-[300px] -translate-x-1/2 border border-line-dark bg-charcoal-950 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
                  >
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-charcoal-900"
                    >
                      All Services
                    </Link>
                    <div className="my-1 h-px bg-line-dark" />
                    {NAV_SERVICES.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-3 transition-colors hover:bg-charcoal-900"
                      >
                        <span className="block text-sm font-semibold text-white">
                          {service.label}
                        </span>
                        <span className="block text-xs text-cream-mute mt-0.5">
                          {service.desc}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13.5px] font-medium tracking-[0.01em] text-cream-mute py-1 transition-colors duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-brass-light after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
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
              className="lg:hidden flex h-9 w-9 items-center justify-center shrink-0"
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
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
                className="flex items-center justify-between py-3 text-lg font-medium text-cream"
              >
                Services
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden flex flex-col pl-4 border-l border-line-dark ml-1"
                  >
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="py-2.5 text-[15px] font-medium text-brass-light"
                    >
                      All Services
                    </Link>
                    {NAV_SERVICES.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setOpen(false)}
                        className="py-2.5 text-[15px] text-cream-mute"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-medium text-cream"
                >
                  {link.label}
                </Link>
              ))}
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
