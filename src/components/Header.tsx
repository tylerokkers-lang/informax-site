"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, NAV_SERVICES } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className="flex items-center gap-1.5 text-sm font-medium text-cream-mute py-1 transition-colors duration-300 hover:text-white"
              >
                Services
                <ChevronDown
                  size={15}
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
                    className="absolute left-1/2 top-full mt-3 w-[300px] -translate-x-1/2 rounded-2xl border border-line-dark bg-charcoal-900 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
                  >
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-charcoal-800"
                    >
                      All Services
                    </Link>
                    <div className="my-1 h-px bg-line-dark" />
                    {NAV_SERVICES.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setServicesOpen(false)}
                        className="block rounded-xl px-4 py-3 transition-colors hover:bg-charcoal-800"
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
                className="relative text-sm font-medium text-cream-mute py-1 transition-colors duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-brass-light after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/enquire"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brass-light to-brass-deep px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(60,46,176,0.5)]"
            >
              Start a Project
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
              className="fixed top-0 right-0 bottom-0 z-[150] w-[min(320px,84vw)] overflow-y-auto bg-charcoal-950 border-l border-line-dark px-8 pb-10 pt-28 flex flex-col gap-1"
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
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brass-light to-brass-deep px-6 py-3.5 text-sm font-semibold text-white"
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
