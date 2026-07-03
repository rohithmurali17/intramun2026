import { useEffect, useRef, useState } from "react";

export function GlassCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch / coarse pointer devices
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
      );
      setHover(interactive);
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html, body, * { cursor: none !important; }
        }
      `}</style>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{
          width: hover ? 64 : 36,
          height: hover ? 64 : 36,
          borderRadius: 9999,
          border: "1px solid color-mix(in oklab, var(--mun-gold) 65%, transparent)",
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--mun-gold) 18%, transparent), color-mix(in oklab, white 6%, transparent) 60%, transparent 75%)",
          backdropFilter: "blur(6px) saturate(140%)",
          boxShadow:
            "0 0 20px color-mix(in oklab, var(--mun-gold) 25%, transparent), inset 0 0 12px color-mix(in oklab, white 10%, transparent)",
          transition: "width 220ms ease, height 220ms ease, background 220ms ease",
          willChange: "transform, width, height",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: "var(--mun-gold)",
          boxShadow: "0 0 10px var(--mun-gold)",
          willChange: "transform",
        }}
      />
    </>
  );
}