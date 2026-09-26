"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal, preconnect } from "react-dom";
import { CLOUD_LOGIN_URL } from "@/lib/constants";

const CLOUD_ORIGIN = new URL(CLOUD_LOGIN_URL).origin;

/**
 * Brand assets, all cut from Informax Cloud's own official logo
 * (its public/brand/informax-logo.png, copied unchanged to
 * /brand/informax-cloud-logo.png) and only trimmed/resized for the web:
 * - the full INFORMAX CLOUD logo, lossless WebP;
 * - the Informax mark on its own (the logo's left-hand symbol, cropped
 *   exactly, no redrawing), for the header entrance.
 */
const CLOUD_LOGO = "/brand/informax-cloud-logo-800.webp";
const MARK = "/brand/informax-cloud-mark-72.png";

/** Fetch and decode the hand-off logo so it is ready before any click. */
function warmLogo() {
  const img = new Image();
  img.src = CLOUD_LOGO;
  img.decode?.().catch(() => {});
}

/**
 * The way into Informax Cloud.
 *
 * Performance first. Pointing at it warms the connection to informax.cloud
 * (DNS + TLS). A click is a plain link: the browser starts navigating
 * immediately and nothing here delays it. The hand-off screen — the Cloud's
 * own background and its logo — only fills the gap while the next page
 * loads, and is cleared if the visitor comes back with the Back button.
 */
export default function CloudEntrance({
  variant,
}: {
  variant: "header" | "drawer";
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Returning via Back restores this page from the bfcache as it was
    // left, overlay included — clear it.
    const reset = () => setLeaving(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  useEffect(() => {
    // The logo (~35 kB) loads only once the page itself has finished and
    // the browser is idle, so it never competes with the hero.
    let idle: number | undefined;
    const schedule = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(warmLogo, { timeout: 3000 })
        : window.setTimeout(warmLogo, 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
    };
  }, []);

  const warm = () => {
    preconnect(CLOUD_ORIGIN);
    warmLogo();
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // New tab / window / download: this page stays, so no hand-off screen.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    setLeaving(true);
  };

  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ix-bright";

  return (
    <>
      {variant === "header" ? (
        <a
          href={CLOUD_LOGIN_URL}
          onPointerEnter={warm}
          onFocus={warm}
          onTouchStart={warm}
          onClick={onClick}
          className={`group hidden md:inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.18] bg-white/[0.04] py-[7px] pl-3 pr-4 text-[13px] font-medium tracking-[0.01em] text-white/90 transition-[background-color,border-color,color] duration-300 hover:border-white/35 hover:bg-white/[0.08] hover:text-white ${focusRing}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} alt="" width={20} height={18} className="h-[18px] w-auto shrink-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          Log in to Informax Cloud
          <span
            aria-hidden
            className="text-white/55 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-white"
          >
            →
          </span>
        </a>
      ) : (
        <a
          href={CLOUD_LOGIN_URL}
          onFocus={warm}
          onTouchStart={warm}
          onClick={onClick}
          aria-label="Log in to Informax Cloud"
          className={`group mt-8 flex w-full items-center gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.04] px-3.5 py-3.5 min-[360px]:gap-3.5 min-[360px]:px-4 transition-colors duration-300 active:bg-white/[0.08] ${focusRing}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} alt="" width={30} height={27} className="h-[27px] w-auto shrink-0" />
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/50 min-[360px]:text-[11px] min-[360px]:tracking-[0.18em]">
              Informax Cloud
            </span>
            <span className="mt-1 text-[15px] font-medium text-white">Log in</span>
          </span>
          <span aria-hidden className="text-white/55">
            →
          </span>
        </a>
      )}

      {/* Portalled: the scrolled header's backdrop-filter would otherwise
          become the containing block and trap this inside the header. */}
      {leaving &&
        createPortal(
          <div className="ix-handoff fixed inset-0 z-[300] flex items-center justify-center bg-ix-navy-900">
            <div aria-hidden className="ix-handoff-glow pointer-events-none absolute inset-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CLOUD_LOGO}
              alt="Informax Cloud"
              width={800}
              height={213}
              decoding="sync"
              className="ix-handoff-logo relative h-auto w-[min(360px,68vw)]"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
