import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Committee } from "@/data/committees";

type Props = {
  committees: Committee[];
  sectionRef?: React.RefObject<HTMLElement | null>;
};

export function CommitteeCarousel({ committees, sectionRef }: Props) {
  const [active, setActive] = useState(0);
  const [dragDX, setDragDX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const reduced = useRef(false);
  const activeRef = useRef(0);
  const raf = useRef<number>(0);
  const touchY = useRef<number | null>(null);
  const lastStep = useRef(0);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const count = committees.length;
  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(count - 1, i)),
    [count],
  );

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const scrollContainer = useCallback(() => {
    const el = sectionRef?.current || containerRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const viewport = window.innerHeight;
    const end = rect.height - viewport;
    if (end <= 0) return null;
    const progress = Math.max(0, Math.min(1, -rect.top / end));
    return { progress, end, rect, viewport };
  }, [sectionRef]);

  const scrollToIndex = useCallback(
    (i: number) => {
      const data = scrollContainer();
      if (!data) return;
    const targetProgress = count <= 1 ? 0 : (i + 0.08) / (count - 0.84);
      const targetScrollY = window.scrollY + data.rect.top + targetProgress * data.end;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    },
    [count, scrollContainer],
  );

  const go = useCallback(
    (dir: number) => {
      const next = clamp(activeRef.current + dir);
      scrollToIndex(next);
    },
    [clamp, scrollToIndex],
  );

  const isPinned = useCallback(() => {
    const data = scrollContainer();
    if (!data) return null;
    return data.rect.top <= 1 && data.rect.bottom >= data.viewport - 1 ? data : null;
  }, [scrollContainer]);

  const stepLocked = useCallback(
    (dir: number) => {
      const next = clamp(activeRef.current + dir);
      if (next === activeRef.current) return false;
      const now = window.performance.now();
      if (now - lastStep.current < 280) return true;
      lastStep.current = now;
      scrollToIndex(next);
      return true;
    },
    [clamp, scrollToIndex],
  );

  // Scroll-driven active index while the section is pinned
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const data = scrollContainer();
        if (!data) return;
        const next = Math.round(data.progress * (count - 1));
        setActive(clamp(next));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [clamp, count, scrollContainer]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isPinned()) return;
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir) return;
      if ((dir > 0 && activeRef.current >= count - 1) || (dir < 0 && activeRef.current <= 0)) return;
      e.preventDefault();
      stepLocked(dir);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchY.current == null || !isPinned()) return;
      const y = e.touches[0]?.clientY;
      if (y == null) return;
      const delta = touchY.current - y;
      if (Math.abs(delta) < 28) return;
      const dir = delta > 0 ? 1 : -1;
      if ((dir > 0 && activeRef.current >= count - 1) || (dir < 0 && activeRef.current <= 0)) return;
      e.preventDefault();
      if (stepLocked(dir)) touchY.current = y;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [count, isPinned, stepLocked]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current == null) return;
    setDragDX(e.clientX - dragStart.current);
  };
  const onPointerUp = () => {
    if (Math.abs(dragDX) > 60) go(dragDX < 0 ? 1 : -1);
    dragStart.current = null;
    setDragDX(0);
  };

  return (
    <div
      ref={containerRef}
      data-committee-carousel
      className="relative w-full select-none overflow-x-hidden"
      style={{ perspective: "1600px" }}
    >
      {/* Stage */}
      <div
        className="relative mx-auto h-[min(52svh,520px)] md:h-[min(58svh,600px)] flex items-center justify-center touch-pan-y"
        style={{ transformStyle: "preserve-3d" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {committees.map((c, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          const abs = Math.abs(offset);
          const isMobile = vw < 640;
          const angle = reduced.current ? 0 : offset * -32;
          const stepX = isMobile ? Math.min(130, vw * 0.32) : 220;
          const translateX = offset * stepX;
          const translateZ = -abs * (isMobile ? 120 : 170);
          const scale = isActive ? 1 : Math.max(0.78, 1 - abs * 0.1);
          const opacity = abs > 3 ? 0 : isActive ? 1 : Math.max(0.35, 1 - abs * 0.25);
          const dragShift = dragStart.current != null ? dragDX * 0.4 : 0;

          const cardInner = (
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]">
              <img
                src={c.img}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {isActive && (
                <div className="pointer-events-none absolute inset-0 ring-1 ring-primary/60 rounded-2xl shadow-[0_0_60px_-10px_var(--mun-gold)]" />
              )}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">
                  {c.n}
                </p>
                <h3 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight leading-none">
                  {c.name}
                </h3>
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60">
                  {c.fullForm}
                </p>
                {isActive && (
                  <div className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-primary">
                    Enter Committee <ArrowUpRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          );

          const style: React.CSSProperties = {
            transform: `translate(-50%, -50%) translateX(${translateX + dragShift}px) translateZ(${translateZ}px) rotateY(${angle}deg) scale(${scale})`,
            transition: dragStart.current == null ? "transform 700ms cubic-bezier(.22,1,.36,1), opacity 500ms ease" : "none",
            opacity,
            zIndex: 100 - abs,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          };

          return (
            <div
              key={c.slug}
              data-committee-card
              className="absolute top-1/2 left-1/2 h-[min(44svh,440px)] w-[min(74vw,300px)] md:h-[min(50svh,520px)] md:w-[min(34vw,360px)]"
              style={style}
              aria-hidden={!isActive}
            >
              {isActive ? (
                <Link
                  to="/committees/$slug"
                  params={{ slug: c.slug }}
                  className="block h-full w-full cursor-pointer"
                  draggable={false}
                >
                  {cardInner}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className="block h-full w-full cursor-pointer"
                  aria-label={`Show ${c.name}`}
                >
                  {cardInner}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          className="h-11 w-11 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center hover:border-primary/60 hover:text-primary transition-colors disabled:opacity-30"
          aria-label="Previous committee"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {committees.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2 bg-foreground/30 hover:bg-foreground/60"}`}
              aria-label={`Go to ${c.name}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === count - 1}
          className="h-11 w-11 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center hover:border-primary/60 hover:text-primary transition-colors disabled:opacity-30"
          aria-label="Next committee"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">
        Drag · Scroll · Arrows — click the front card to enter
      </p>
    </div>
  );
}