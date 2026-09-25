"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal, preconnect } from "react-dom";
import { CLOUD_LOGIN_URL } from "@/lib/constants";

const CLOUD_ORIGIN = new URL(CLOUD_LOGIN_URL).origin;

/** The Informax Cloud mark, drawn inline so it costs no download. */
export function CloudMark({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M7.2 18.5h9.9a4.4 4.4 0 0 0 .7-8.75A5.9 5.9 0 0 0 6.5 9.6 4.5 4.5 0 0 0 7.2 18.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * The way into Informax Cloud: a separate product, so it reads as a
 * doorway rather than another page of this site.
 *
 * Performance first. Pointing at it warms the connection to informax.cloud
 * (DNS + TLS), which is most of the cost of the first request. A click is
 * a plain link: the browser starts navigating immediately and nothing here
 * delays it. The hand-off screen only fills the gap while the next page
 * loads, and is cleared if the visitor comes back with the Back button.
 */
export default function CloudEntrance({
  variant,
  onNavigate,
}: {
  variant: "header" | "drawer";
  onNavigate?: () => void;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Returning via Back restores this page from the bfcache as it was
    // left, overlay included — clear it.
    const reset = () => setLeaving(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const warm = () => preconnect(CLOUD_ORIGIN);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // New tab / window / download: this page stays, so no hand-off screen.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    setLeaving(true);
    onNavigate?.();
  };

  const className =
    variant === "header"
      ? "group hidden md:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ix-brand pl-3 pr-4 py-2 text-[13.5px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset,0_8px_24px_-10px_rgba(6,147,227,0.8)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#0aa0f5] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)_inset,0_10px_30px_-10px_rgba(6,147,227,0.95)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ix-bright"
      : "group mt-8 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-ix-brand px-3 py-3.5 text-[13px] font-semibold min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-[14.5px] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset] transition-colors duration-200 active:bg-[#0aa0f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ix-bright";

  return (
    <>
      <a
        href={CLOUD_LOGIN_URL}
        onPointerEnter={warm}
        onFocus={warm}
        onTouchStart={warm}
        onClick={onClick}
        className={className}
      >
        <CloudMark size={variant === "header" ? 17 : 19} className="shrink-0" />
        Log in to Informax Cloud
        <span
          aria-hidden
          className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
            variant === "drawer" ? "hidden min-[360px]:inline" : ""
          }`}
        >
          →
        </span>
      </a>

      {/* Portalled: the scrolled header's backdrop-filter would otherwise
          become the containing block and trap this inside the header. */}
      {leaving &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className="ix-handoff fixed inset-0 z-[300] flex items-center justify-center bg-ix-navy-900"
          >
            <div className="ix-handoff-mark flex items-center gap-3 text-ix-cream">
              <CloudMark size={30} className="text-ix-brand" />
              <span className="text-[1.35rem] font-semibold tracking-[-0.01em]">
                Informax Cloud
              </span>
            </div>
            <span className="sr-only">Opening Informax Cloud…</span>
          </div>,
          document.body,
        )}
    </>
  );
}
