import { useEffect, useRef } from "react";

// Wispy smoke/vapor trail that follows the cursor. Canvas-based particle
// system: on pointer move we spawn a few soft, gold-tinted particles that
// drift upward and dissipate. Skipped on coarse-pointer / touch devices.
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      r: number;
      hue: number;
    };
    const particles: P[] = [];
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastMoveT = 0;

    const spawn = (x: number, y: number, count: number, speed: number) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 0.4 + 0.15;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(a) * s + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(a) * s - 0.35 - Math.random() * 0.3,
          life: 0,
          max: 900 + Math.random() * 600,
          r: 14 + Math.random() * 22 + Math.min(speed * 0.6, 20),
          hue: 42 + Math.random() * 12, // warm gold
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveT);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      const speed = dist / dt * 16; // ~px per frame
      const count = Math.min(6, 1 + Math.floor(dist / 8));
      // Interpolate along the movement so fast swipes leave a continuous trail
      const steps = Math.min(6, Math.max(1, Math.floor(dist / 12)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        spawn(lastX + dx * t, lastY + dy * t, count, speed);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveT = now;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let prev = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(48, t - prev);
      prev = t;
      // Soft fade of the previous frame -> smoky decay
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.max) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vy -= 0.008 * (dt / 16); // gentle rise
        p.vx *= 0.985;
        p.r += 0.15 * (dt / 16);
        const k = p.life / p.max;
        const alpha = (1 - k) * 0.28;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 70%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 75%, 60%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, 70%, 55%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}