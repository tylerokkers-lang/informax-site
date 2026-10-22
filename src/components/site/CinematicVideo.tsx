"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import type { VideoAsset } from "@/lib/videos";

const noSubscribe = () => () => {};

/**
 * Only one film plays at a time: the most visible one. Every mounted film
 * reports how much of it is on screen; the leader plays, the rest pause.
 */
const players = new Map<HTMLVideoElement, number>();
function arbitrate() {
  let leader: HTMLVideoElement | null = null;
  let best = 0.25; // must be at least a quarter visible to play
  for (const [v, ratio] of players) if (ratio > best) [leader, best] = [v, ratio];
  for (const v of players.keys()) {
    if (v === leader) {
      if (v.paused && !v.ended) {
        // iOS only autoplays a muted film; React sets `muted` as a property, so make sure of it before play().
        v.muted = true;
        v.defaultMuted = true;
        v.play().catch(() => undefined); // a film that plays once stays on its last frame (not restarted)
      }
    } else if (!v.paused) v.pause();
  }
}

/** Smaller file first among the formats a browser can play (it takes the first it supports). */
function sources(a: VideoAsset, phone: boolean) {
  const list = phone
    ? [{ src: a.webmMobile, type: "video/webm", bytes: a.bytes.webmMobile }, { src: a.mp4Mobile, type: "video/mp4", bytes: a.bytes.mp4Mobile }]
    : [{ src: a.webm, type: "video/webm", bytes: a.bytes.webm }, { src: a.mp4, type: "video/mp4", bytes: a.bytes.mp4 }];
  return list.sort((x, y) => x.bytes - y.bytes);
}

/**
 * A muted, looping background film. The poster (the film's exact first frame)
 * is always rendered, so the page never shifts and works without video. The
 * film itself is fetched only when it comes near the screen, plays only while
 * it is the most visible film on the page, and is never loaded for visitors
 * who prefer reduced motion or have data saving switched on.
 */
export default function CinematicVideo({
  slot,
  asset,
  alt,
  focus = "50% 50%",
  priority = false,
  className = "",
}: {
  /** The slot name, exposed as data-film for QA. */
  slot?: string;
  asset: VideoAsset;
  alt: string;
  /** Desktop object-position of the subject. Phone files are already cropped around their own focus, so they stay centred. */
  focus?: string;
  /** Above the fold: load the poster eagerly, at normal priority. A full-bleed poster is never the largest contentful
   * paint (Chrome treats viewport-filling images as background), so high priority would only slow the real one. */
  priority?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const saveData =
    hydrated && typeof navigator !== "undefined" && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const phone = hydrated && typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const allowed = hydrated && !reduce && !saveData;

  // Films never compete with the page's own content: nothing is fetched until the page has loaded and the browser is idle.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!allowed) return;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      // Safari has no requestIdleCallback.
      if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(() => setSettled(true), { timeout: 2000 });
      else timer = setTimeout(() => setSettled(true), 200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
    };
  }, [allowed]);

  // Then start fetching when the film is within about a screen of the viewport.
  useEffect(() => {
    if (!allowed || !settled || !box.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    io.observe(box.current);
    return () => io.disconnect();
  }, [allowed, settled]);

  // Report visibility to the arbiter once the film element exists.
  useEffect(() => {
    const v = video.current;
    if (!near || !v) return;
    players.set(v, 0);
    const io = new IntersectionObserver(
      ([e]) => {
        players.set(v, e.isIntersecting ? e.intersectionRatio : 0);
        arbitrate();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      players.delete(v);
      v.pause();
      arbitrate();
    };
  }, [near]);

  const poster = phone ? asset.posterMobile : asset.poster;
  // Centred on phones, the subject's focus point from 768px up (CSS, so the very first paint is right).
  const fit = "object-cover [object-position:50%_50%] md:[object-position:var(--focus)]";

  return (
    <div ref={box} data-film={slot} className={`absolute inset-0 overflow-hidden ${className}`} style={{ ["--focus" as string]: focus }}>
      <picture>
        <source media="(max-width: 767px)" srcSet={asset.posterMobile} width={asset.mobileWidth} height={asset.mobileHeight} />
        {/* A plain img, not next/image: the poster must be the film's exact first frame, unprocessed, or the swap to the film would shift. */}
        <img
          src={asset.poster}
          width={asset.width}
          height={asset.height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${fit}`}
        />
      </picture>
      {allowed && near ? (
        <video
          ref={video}
          muted
          loop={asset.loop !== false}
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full ${fit} transition-opacity duration-700 motion-reduce:transition-none ${playing ? "opacity-100" : "opacity-0"}`}
        >
          {sources(asset, phone).map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : null}
    </div>
  );
}
