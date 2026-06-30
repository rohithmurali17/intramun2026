import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Committee } from "@/data/committees";

type Props = {
  committees: Committee[];
  sectionRef: React.RefObject<HTMLElement | null>;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function CommitteeVerticalStack({ committees, sectionRef }: Props) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);
  const count = committees.length;

  const updateProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section || count <= 1) return;

    const rect = section.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    if (travel <= 0) return;

    setProgress(clamp(-rect.top / travel, 0, 1));
  }, [count, sectionRef]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [updateProgress]);

  const exactIndex = useMemo(() => progress * Math.max(0, count - 1), [count, progress]);
  const activeIndex = clamp(Math.round(exactIndex), 0, count - 1);

  const scrollToIndex = (index: number) => {
    const section = sectionRef.current;
    if (!section || count <= 1) return;
    const rect = section.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    const target = window.scrollY + rect.top + (index / (count - 1)) * travel;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-20" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />

      <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative z-30 hidden lg:block">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <h3 className="mt-5 font-serif text-6xl leading-[0.92] tracking-tight">
            {committees[activeIndex]?.name}
          </h3>
          <p className="mt-4 max-w-sm font-serif text-2xl italic text-primary">
            {committees[activeIndex]?.fullForm}
          </p>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-foreground/65">
            {committees[activeIndex]?.tag}
          </p>
        </div>

        <div className="relative flex h-[calc(100svh-5rem)] min-h-[620px] w-full items-center justify-center overflow-hidden [perspective:1400px] max-sm:min-h-[560px]">
          {committees.map((committee, index) => {
            const offset = index - exactIndex;
            const abs = Math.abs(offset);
            const isActive = index === activeIndex;
            const translateY = offset * 68;
            const translateZ = -abs * 150;
            const scale = clamp(1 - abs * 0.09, 0.78, 1);
            const opacity = abs > 1.75 ? 0 : clamp(1 - abs * 0.52, 0, 1);
            const rotateX = offset * -7;

            return (
              <Link
                key={committee.slug}
                to="/committees/$slug"
                params={{ slug: committee.slug }}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                className="group absolute block h-[min(64svh,560px)] w-[min(88vw,520px)] overflow-hidden rounded-lg border border-border bg-background shadow-[0_40px_100px_-45px_oklch(0_0_0/0.85)] outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-primary md:h-[min(68svh,620px)] md:w-[min(58vw,680px)]"
                style={{
                  opacity,
                  pointerEvents: isActive ? "auto" : "none",
                  transform: `translate3d(0, ${translateY}%, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                  transition: "transform 720ms cubic-bezier(.22,1,.36,1), opacity 520ms ease",
                  zIndex: 50 - Math.round(abs * 10),
                  willChange: "transform, opacity",
                }}
              >
                <img
                  src={committee.img}
                  alt={committee.fullForm}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
                <div className="absolute inset-0 border border-primary/0 transition-colors duration-500 group-hover:border-primary/60" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">
                    Committee · {committee.n}
                  </p>
                  <h3 className="mt-3 font-display text-6xl leading-[0.82] tracking-wide text-foreground sm:text-7xl md:text-8xl">
                    {committee.name}
                  </h3>
                  <p className="mt-3 max-w-md font-serif text-xl italic text-primary md:text-2xl">
                    {committee.fullForm}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
                    {committee.tag}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-primary transition-all group-hover:gap-4">
                    Enter Committee <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:right-6">
        {committees.map((committee, index) => (
          <button
            key={committee.slug}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to ${committee.name}`}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "h-10 w-2 bg-primary" : "w-2 bg-foreground/30 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}