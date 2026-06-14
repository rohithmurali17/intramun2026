import { useEffect, useRef, useState } from "react";
import bgm from "@/assets/intra-mun-music.mp3.asset.json";

const BARS = 5;

export function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio(bgm.url);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    setReady(true);

    // Try autoplay; browsers usually block until user gesture
    const tryPlay = async () => {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        // wait for first user interaction
        const onFirst = async () => {
          try {
            await a.play();
            setPlaying(true);
          } catch {}
          window.removeEventListener("pointerdown", onFirst);
          window.removeEventListener("keydown", onFirst);
        };
        window.addEventListener("pointerdown", onFirst, { once: true });
        window.addEventListener("keydown", onFirst, { once: true });
      }
    };
    tryPlay();

    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {}
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute background music" : "Play background music"}
      aria-pressed={playing}
      disabled={!ready}
      className="fixed top-4 right-4 z-[100] flex items-center gap-2 rounded-full border border-[color:var(--mun-gold)]/40 bg-background/70 px-3 py-2 backdrop-blur-md transition-all hover:border-[color:var(--mun-gold)] hover:shadow-[var(--shadow-gold)]"
    >
      <div className="flex h-5 items-end gap-[3px]">
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            className="block w-[3px] rounded-full bg-[color:var(--mun-gold)]"
            style={
              playing
                ? {
                    animation: `bgmBar 0.9s ease-in-out ${i * 0.12}s infinite`,
                    height: "60%",
                  }
                : { height: "20%", opacity: 0.55 }
            }
          />
        ))}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80">
        {playing ? "Sound on" : "Sound off"}
      </span>
      <style>{`
        @keyframes bgmBar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </button>
  );
}

export default BgmPlayer;