import { useEffect, useState } from "react";
import bgm from "@/assets/intra-mun-music.mp3.asset.json";

const BARS = 5;

// Global audio singleton so the persistent controller and any UI buttons
// share exactly one player and stay in sync across route changes.
let globalAudio: HTMLAudioElement | null = null;
const listeners = new Set<(playing: boolean) => void>();

function getAudio() {
  if (!globalAudio) {
    globalAudio = new Audio(bgm.url);
    globalAudio.loop = true;
    globalAudio.volume = 0.35;
  }
  return globalAudio;
}

function notify(playing: boolean) {
  listeners.forEach((cb) => cb(playing));
}

export function useBgm() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = getAudio();
    setReady(true);

    const update = () => {
      const p = !a.paused;
      setPlaying(p);
      notify(p);
    };
    update();

    const onPlay = () => notify(true);
    const onPause = () => notify(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    const cb = (p: boolean) => setPlaying(p);
    listeners.add(cb);

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      listeners.delete(cb);
    };
  }, []);

  const toggle = async () => {
    const a = getAudio();
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {}
    } else {
      a.pause();
    }
  };

  return { playing, ready, toggle };
}

// Invisible audio controller that lives in the root layout.
// It starts the global audio after the splash intro and keeps it alive across routes.
export function BgmAudio() {
  const { ready } = useBgm();

  useEffect(() => {
    if (!ready) return;
    const a = getAudio();

    const onSplash = async (e: Event) => {
      const withSound = (e as CustomEvent<{ withSound: boolean }>).detail?.withSound;
      if (!withSound) return;
      try {
        await a.play();
      } catch {}
    };
    window.addEventListener("splash:complete", onSplash as EventListener);

    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("docmun:introSeen") === "1") {
      a.play().then(() => {}).catch(() => {
        const onFirst = async () => {
          try {
            await a.play();
          } catch {}
          window.removeEventListener("pointerdown", onFirst);
        };
        window.addEventListener("pointerdown", onFirst, { once: true });
      });
    }

    return () => {
      window.removeEventListener("splash:complete", onSplash as EventListener);
    };
  }, [ready]);

  return null;
}

export function BgmPlayer({ className }: { className?: string }) {
  const { playing, ready, toggle } = useBgm();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute background music" : "Play background music"}
      aria-pressed={playing}
      disabled={!ready}
      className={className}
    >
      <div className="flex h-4 items-end gap-[2px]">
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            className="block w-[2px] rounded-full bg-[color:var(--mun-gold)]"
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
