import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import intro from "@/assets/docmunsoc-intro.mp4.asset.json";

const SESSION_KEY = "docmun:introSeen";

export function SplashIntro() {
  const [mounted, setMounted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    setMounted(true);
    // Lock body scroll while splash is visible
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = (withSound: boolean) => {
    sessionStorage.setItem(SESSION_KEY, "1");
    window.dispatchEvent(
      new CustomEvent("splash:complete", { detail: { withSound } }),
    );
    setLeaving(true);
    setTimeout(() => setMounted(false), 700);
  };

  if (!mounted) return null;

  return (
    <div
      className={
        "fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-700 " +
        (leaving ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      <video
        ref={videoRef}
        src={intro.url}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        className={
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 " +
          (ended ? "opacity-0" : "opacity-100")
        }
      />

      {/* Dark scrim behind end-state so the choice UI never overlaps the video's last frame */}
      {ended && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Skip button */}
      {!ended && (
        <button
          type="button"
          onClick={() => {
            const v = videoRef.current;
            if (v) v.currentTime = Math.max(0, (v.duration || 0) - 0.05);
            setEnded(true);
          }}
          className="absolute bottom-6 right-6 rounded-full border border-white/30 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur transition-colors hover:border-white/70 hover:text-white"
        >
          Skip Intro
        </button>
      )}

      {/* End-of-video choice */}
      {ended && (
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center animate-fade-in">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[color:var(--mun-gold)]">
              Welcome Delegate
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white">
              How would you like to enter?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => finish(true)}
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--mun-gold)] bg-[color:var(--mun-gold)]/15 px-7 py-3 text-sm uppercase tracking-[0.2em] text-white transition-all hover:bg-[color:var(--mun-gold)]/30 hover:shadow-[var(--shadow-gold)]"
            >
              <Volume2 className="h-4 w-4 text-[color:var(--mun-gold)] transition-transform group-hover:scale-110" />
              Enter with Sound
            </button>
            <button
              type="button"
              onClick={() => finish(false)}
              className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-3 text-sm uppercase tracking-[0.2em] text-white/85 transition-all hover:border-white/80 hover:bg-white/10"
            >
              <VolumeX className="h-4 w-4 transition-transform group-hover:scale-110" />
              Enter Silently
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SplashIntro;