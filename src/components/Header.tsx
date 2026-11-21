"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CONTACT_EMAIL, DEMO_CTA, NAV_LINKS, SOLUTION_LINKS } from "@/lib/constants";
import CloudEntrance from "@/components/CloudEntrance";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Solutions owns its own pages, so it is "active" on any of them. */
const SOLUTION_ROUTES = new Set(["/solutions", "/hospitality", "/restaurants"]);

/**
 * One header for every page: a light, translucent bar that firms up once
 * the page scrolls. Solutions opens a small menu (click, keyboard or hover);
 * below the xl breakpoint everything moves into a full-height sheet.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (menu && menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, menu]);

  // A click that follows a hover-open (the pointer arrived, then pressed) keeps the menu open rather than toggling it shut.
  const hoverAt = useRef(0);
  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!menu) hoverAt.current = Date.now();
    setMenu(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setMenu(false), 160);
  };

  const isActive = (href: string) => (href === "/solutions" ? SOLUTION_ROUTES.has(pathname) : pathname === href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || menu
            ? "bg-white/82 shadow-[0_1px_0_rgba(11,21,36,0.07)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-white/0"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-6 md:h-[72px] md:px-10">
          <Link href="/" className="flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass" aria-label="Informax home">
            <Image
              src="/brand/informax-logo-white-trim.png"
              alt="Informax"
              width={746}
              height={224}
              priority
              className="h-auto w-[108px] brightness-0 md:w-[118px]"
            />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const base = `relative flex h-10 items-center gap-1 rounded-full px-4 text-[14.5px] font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brass ${
                active ? "text-ink" : "text-ink-mute hover:text-ink"
              }`;
              if (link.href === "/solutions") {
                return (
                  <div key={link.href} ref={menuRef} className="relative" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
                    <button
                      type="button"
                      className={base}
                      aria-expanded={menu}
                      aria-controls="solutions-menu"
                      onClick={() => setMenu((v) => (v && Date.now() - hoverAt.current < 600 ? true : !v))}
                    >
                      {link.label}
                      <ChevronDown size={15} aria-hidden className={`transition-transform duration-300 ${menu ? "rotate-180" : ""}`} />
                      {active ? <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-px bg-ink" /> : null}
                    </button>
                    {/* Positioned by a plain wrapper: the animated layer owns its own transform. */}
                    <div className="absolute left-1/2 top-[calc(100%+10px)] w-[440px] -translate-x-1/2">
                    <AnimatePresence>
                      {menu ? (
                        <motion.div
                          id="solutions-menu"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="rounded-[22px] bg-white p-2.5 shadow-[0_0_0_1px_rgba(11,21,36,0.07),0_30px_60px_-20px_rgba(11,21,36,0.3)]"
                        >
                          <ul className="grid grid-cols-1 gap-0.5">
                            {SOLUTION_LINKS.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  onClick={() => setMenu(false)}
                                  className="flex flex-col rounded-[14px] px-4 py-3 transition-colors hover:bg-paper-alt focus-visible:bg-paper-alt focus-visible:outline-none"
                                >
                                  <span className="text-[15px] font-semibold text-ink">{s.label}</span>
                                  <span className="text-[13.5px] text-ink-mute">{s.body}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/solutions"
                            onClick={() => setMenu(false)}
                            className="mt-1.5 flex items-center justify-between rounded-[14px] bg-paper-alt px-4 py-3 text-[14px] font-semibold text-brass-deep transition-colors hover:text-ink"
                          >
                            See every solution <span aria-hidden>→</span>
                          </Link>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={base}>
                  {link.label}
                  {active ? <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-px bg-ink" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <CloudEntrance variant="header" tone="light" />
            <Link href={DEMO_CTA.href} className="ix-btn ix-btn-primary hidden min-h-10! rounded-full! px-5! text-[14px]! sm:inline-flex">
              {DEMO_CTA.label}
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="relative z-[160] flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brass xl:hidden"
            >
              <span className="relative block h-[1.5px] w-[18px]">
                <span className={`absolute left-0 h-[1.5px] w-[18px] bg-ink transition-transform duration-300 ${open ? "top-0 rotate-45" : "-top-[4px]"}`} />
                <span className={`absolute left-0 h-[1.5px] w-[18px] bg-ink transition-transform duration-300 ${open ? "top-0 -rotate-45" : "top-[4px]"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[150] overflow-y-auto bg-white/96 px-6 pb-12 pt-24 backdrop-blur-xl md:px-10"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
              className="mx-auto max-w-xl"
            >
              {[{ label: "Home", href: "/" }, ...NAV_LINKS.filter((l) => l.href !== "/solutions")].map((l) => (
                <motion.li key={l.href} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="x-title block border-b border-line py-4 text-[30px] text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }} className="pt-7">
                <p className="text-[13px] font-semibold text-ink-mute">Solutions</p>
                <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {[{ label: "All solutions", href: "/solutions" }, ...SOLUTION_LINKS].map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} onClick={() => setOpen(false)} className="block py-2.5 text-[18px] font-medium text-ink">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact" onClick={() => setOpen(false)} className="block py-2.5 text-[18px] font-medium text-ink">
                      Contact
                    </Link>
                  </li>
                </ul>
              </motion.li>
              <motion.li variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }} className="pt-8">
                <Link href={DEMO_CTA.href} onClick={() => setOpen(false)} className="ix-btn ix-btn-primary w-full">
                  {DEMO_CTA.label}
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 block text-center text-[15px] text-ink-mute">
                  {CONTACT_EMAIL}
                </a>
                <CloudEntrance variant="drawer" tone="light" />
              </motion.li>
            </motion.ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
