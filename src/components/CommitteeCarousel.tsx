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

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      const targetProgress = i / (count - 1);
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

  // Scroll-driven active index while the section is pinned
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const data = scrollContainer();
        if (!data) return;
        const next = Math.floor(data.progress * (count - 1));
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
      className="relative w-full select-none"
      style={{ perspective: "1600px" }}
    >
      {/* Stage */}
      <div
        className="relative mx-auto h-[520px] md:h-[600px] flex items-center justify-center touch-pan-y"
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
          const angle = reduced.current ? 0 : offset * -32;
          const translateX = offset * 240;
          const translateZ = -abs * 180;
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
              className="absolute top-1/2 left-1/2 h-[440px] w-[300px] md:h-[520px] md:w-[360px]"
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