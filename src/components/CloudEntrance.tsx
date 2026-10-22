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
          aria-label="Customer log in to Informax Cloud"
          // Deliberately quiet: for existing V1 customers, secondary to the nav and to Request a Demo.
          className={`group hidden lg:inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1 py-2 text-[12.5px] font-medium text-cream-mute transition-colors duration-300 hover:text-white ${focusRing}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} alt="" width={20} height={18} className="h-[13px] w-auto shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
          Customer log in
        </a>
      ) : (
        <a
          href={CLOUD_LOGIN_URL}
          onFocus={warm}
          onTouchStart={warm}
          onClick={onClick}
          aria-label="Customer log in to Informax Cloud"
          className={`group mt-8 flex w-full items-center gap-2.5 border-t border-white/10 pt-6 text-[14px] font-medium text-cream-mute transition-colors duration-300 hover:text-white ${focusRing}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} alt="" width={20} height={18} className="h-[15px] w-auto shrink-0 opacity-70" />
          Customer log in
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
