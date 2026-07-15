let audioCtx: AudioContext | null = null;
let lastTick = 0;

export function playHoverTick() {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastTick < 90) return;
  lastTick = now;

  const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!Ctx) return;

  const ctx: AudioContext = audioCtx || new Ctx();
  audioCtx = ctx;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const t = ctx.currentTime;
  const volume = 0.06;

  const ticks = [
    { freq: 1500, delay: 0.0, duration: 0.028 },
    { freq: 1900, delay: 0.05, duration: 0.024 },
  ];

  for (const { freq, delay, duration } of ticks) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t + delay);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t + delay + duration);

    gain.gain.setValueAtTime(0, t + delay);
    gain.gain.linearRampToValueAtTime(volume, t + delay + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, t + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t + delay);
    osc.stop(t + delay + duration + 0.01);
  }
}
