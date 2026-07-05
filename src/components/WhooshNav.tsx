import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import whooshAsset from "@/assets/whoosh.wav.asset.json";

// Global whoosh SFX played on route changes, hash-anchor clicks,
// and when a new <section> scrolls into view. Uses Web Audio API
// with a pre-decoded buffer so playback is instant (no fetch/decode
// delay per trigger).
let lastPlay = 0;
let audioCtx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loading: Promise<void> | null = null;

function ensureLoaded() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (!buffer && !loading) {
    loading = fetch(whooshAsset.url)
      .then((r) => r.arrayBuffer())
      .then((b) => audioCtx!.decodeAudioData(b))
      .then((decoded) => {
        buffer = decoded;
      })
      .catch(() => {});
  }
  return audioCtx;
}

function playWhoosh(volume = 0.45) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - lastPlay < 250) return;
  lastPlay = now;
  const ctx = ensureLoaded();
  if (!ctx || !buffer) return;
  if (ctx.state === "suspended") void ctx.resume();
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = volume;
  src.connect(gain).connect(ctx.destination);
  src.start(0);
}

// Warm up on first user interaction (browsers require a gesture to unlock audio).
if (typeof window !== "undefined") {
  const warm = () => {
    ensureLoaded();
    if (audioCtx?.state === "suspended") void audioCtx.resume();
  };
  window.addEventListener("pointerdown", warm, { once: false, passive: true });
  window.addEventListener("keydown", warm, { once: false, passive: true });
}

export function WhooshNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstRoute = useRef(true);
  const seen = useRef<Set<Element>>(new Set());

  // Route changes
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    playWhoosh(0.55);
  }, [pathname]);

  // Hash-anchor clicks (in-page section jumps + nav pane)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) playWhoosh(0.5);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // Sections scrolling into view
  useEffect(() => {
    seen.current = new Set();
    const sections = document.querySelectorAll("main section, section[id]");
    if (!sections.length) return;
    // Suppress firing on initial mount for already-visible sections
    const initTimer = window.setTimeout(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !seen.current.has(e.target)) {
              seen.current.add(e.target);
              playWhoosh(0.4);
            }
          }
        },
        { threshold: 0.35 }
      );
      // Mark currently visible ones as seen so they don't trigger immediately
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) seen.current.add(el);
        io.observe(el);
      });
      (window as unknown as { __whooshIO?: IntersectionObserver }).__whooshIO = io;
    }, 400);
    return () => {
      window.clearTimeout(initTimer);
      const io = (window as unknown as { __whooshIO?: IntersectionObserver }).__whooshIO;
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}