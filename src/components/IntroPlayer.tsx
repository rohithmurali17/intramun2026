import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

type Props = {
  audioUrl: string;
  segments: string[];
};

export function IntroPlayer({ audioUrl, segments }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Distribute timings proportionally to segment character length
  const timings = useMemo(() => {
    const weights = segments.map((s) => Math.max(s.replace(/\s+/g, " ").length, 1));
    const total = weights.reduce((a, b) => a + b, 0);
    const d = duration || 0;
    let acc = 0;
    return weights.map((w) => {
      const start = acc;
      acc += (w / total) * d;
      return { start, end: acc };
    });
  }, [segments, duration]);

  const activeIndex = useMemo(() => {
    if (!duration) return -1;
    for (let i = 0; i < timings.length; i++) {
      if (current >= timings[i].start && current < timings[i].end) return i;
    }
    return current >= duration ? timings.length - 1 : -1;
  }, [current, timings, duration]);

  useEffect(() => {
    const a = new Audio(audioUrl);
    a.preload = "auto";
    audioRef.current = a;
    let cancelled = false;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setCurrent(a.currentTime);
    const onPlay = () => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent("intro:playing", { detail: true }));
    };
    const onPause = () => {
      setPlaying(false);
      window.dispatchEvent(new CustomEvent("intro:playing", { detail: false }));
    };
    const onEnded = () => {
      setPlaying(false);
      window.dispatchEvent(new CustomEvent("intro:playing", { detail: false }));
    };

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);

    // Autoplay attempt
    const tryPlay = async () => {
      try {
        await a.play();
        if (cancelled) a.pause();
      } catch {
        const onFirst = async () => {
          try {
            await a.play();
            if (cancelled) a.pause();
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
      cancelled = true;
      a.pause();
      a.currentTime = 0;
      a.src = "";
      a.load();
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      audioRef.current = null;
      window.dispatchEvent(new CustomEvent("intro:playing", { detail: false }));
    };
  }, [audioUrl]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try { await a.play(); } catch {}
    } else {
      a.pause();
    }
  };

  const restart = async () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    try { await a.play(); } catch {}
  };

  return (
    <div className="mt-6 max-w-3xl">
      <p className="font-serif text-xl md:text-2xl leading-relaxed">
        {segments.map((seg, i) => {
          const isActive = i === activeIndex;
          const isPast = activeIndex > -1 && i < activeIndex;
          return (
            <span
              key={i}
              className={
                "transition-colors duration-300 " +
                (isActive
                  ? "text-primary"
                  : isPast
                  ? "text-foreground/85"
                  : "text-foreground/40")
              }
            >
              {seg}{" "}
            </span>
          );
        })}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-background/60 text-primary backdrop-blur hover:bg-primary/10 hover:border-primary transition-colors"
          aria-label={playing ? "Pause voiceover" : "Play voiceover"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={restart}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 backdrop-blur hover:text-primary hover:border-primary/60 transition-colors"
          aria-label="Restart voiceover"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50">
          Voiceover · Committee briefing
        </p>
      </div>
    </div>
  );
}

export default IntroPlayer;