import { useEffect, useRef, useState } from "react";
import outroAsset from "@/assets/intramun-outro.mp4.asset.json";

export function LegacyVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    const vid = ref.current;
    if (!el || !vid) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio > 0.35);
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          vid.play().catch(() => {
            // Autoplay with sound blocked — retry muted
            vid.muted = true;
            setMuted(true);
            vid.play().catch(() => {});
          });
        } else {
          vid.pause();
        }
      },
      { threshold: [0, 0.35, 0.5, 0.75] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="legacy"
      className="relative py-24 md:py-32 bg-[oklch(0.12_0.045_190)] border-y border-border overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full blur-3xl bg-primary/10" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Legacy · Reel</p>
            <h2 className="mt-3 font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Champions of <span className="italic text-primary">the floor.</span>
            </h2>
          </div>
          {muted && (
            <button
              onClick={() => {
                if (ref.current) {
                  ref.current.muted = false;
                  setMuted(false);
                }
              }}
              className="hidden md:inline-flex font-mono text-[10px] tracking-[0.25em] uppercase border border-primary/50 text-primary px-4 py-2 hover:bg-primary/10 transition"
            >
              Unmute
            </button>
          )}
        </div>

        <div
          ref={wrapRef}
          className={`relative mx-auto max-w-[1200px] transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.97]"
          }`}
        >
          {/* Glass frame */}
          <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-primary/60 via-white/20 to-primary/30 shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)]">
            <div className="relative rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10">
              <video
                ref={ref}
                src={outroAsset.url}
                playsInline
                preload="metadata"
                controls
                className="w-full h-auto block"
              />
              {/* Glossy sheen overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-black/20 mix-blend-overlay" />
            </div>
          </div>

          {/* Soft edge fades to blend into surrounding sections */}
          <div className="pointer-events-none absolute -top-24 inset-x-0 h-24 bg-gradient-to-b from-[oklch(0.12_0.045_190)] to-transparent" />
          <div className="pointer-events-none absolute -bottom-24 inset-x-0 h-24 bg-gradient-to-t from-[oklch(0.12_0.045_190)] to-transparent" />

          <p className="mt-6 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/50">
            Previous Winners · INTRA MUN
          </p>
        </div>
      </div>
    </section>
  );
}