import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Committee } from "@/data/committees";

type Props = { committees: Committee[] };

export function CommitteeExpandGrid({ committees }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col gap-3 md:h-[70svh] md:min-h-[560px] md:flex-row"
      onMouseLeave={() => setActive(null)}
    >
      {committees.map((committee, index) => {
        const isActive = active === index;
        const isDim = active !== null && !isActive;
        return (
          <Link
            key={committee.slug}
            to="/committees/$slug"
            params={{ slug: committee.slug }}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={[
              "group relative overflow-hidden rounded-lg border border-border bg-background outline-none",
              "transition-[flex-grow,filter,transform,box-shadow] duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]",
              "focus-visible:ring-2 focus-visible:ring-primary",
              "h-[320px] md:h-full",
              isActive
                ? "md:flex-[4] shadow-[0_30px_80px_-40px_oklch(0_0_0/0.85)]"
                : isDim
                  ? "md:flex-[1] brightness-[0.55] saturate-75"
                  : "md:flex-[1.4]",
            ].join(" ")}
          >
            <img
              src={committee.img}
              alt={committee.fullForm}
              draggable={false}
              className={[
                "absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
                isActive ? "scale-110" : "scale-100 group-hover:scale-105",
              ].join(" ")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/10" />
            <div className="absolute inset-0 border border-primary/0 transition-colors duration-500 group-hover:border-primary/60" />

            {/* Collapsed label — rotated on desktop */}
            <div
              className={[
                "absolute left-4 top-4 md:left-0 md:top-0 md:h-full md:w-14 md:flex md:flex-col md:items-center md:justify-between md:py-6",
                "transition-opacity duration-300",
                isActive ? "md:opacity-0" : "md:opacity-100",
              ].join(" ")}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">{committee.n}</p>
              <p className="hidden md:block font-display text-3xl tracking-[0.3em] [writing-mode:vertical-rl] rotate-180 text-foreground">
                {committee.name}
              </p>
              <span className="hidden md:block h-2 w-2 rounded-full bg-primary/60" />
            </div>

            {/* Expanded content */}
            <div
              className={[
                "absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10",
                "transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]",
                "md:translate-y-4 md:opacity-0",
                isActive ? "md:translate-y-0 md:opacity-100" : "",
                "translate-y-0 opacity-100",
              ].join(" ")}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">
                Committee · {committee.n}
              </p>
              <h3 className="mt-2 font-display text-5xl leading-[0.85] tracking-wide text-foreground md:text-6xl lg:text-7xl">
                {committee.name}
              </h3>
              <p className="mt-2 font-serif text-lg italic text-primary md:text-xl">
                {committee.fullForm}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
                {committee.tag}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-primary transition-all group-hover:gap-4">
                Enter Committee <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}