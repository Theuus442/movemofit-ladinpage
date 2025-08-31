import { useEffect, useRef } from "react";

export default function ParticlesTransition({ hue = 326, active, onDone }: { hue?: number; active: boolean; onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const parts = Array.from({ length: 220 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * (6 + Math.random() * 6),
      vy: (Math.random() - 0.5) * (6 + Math.random() * 6),
      life: 0,
    }));

    let raf = 0; let t = 0;
    const draw = () => {
      t += 1/60;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.life += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.life);
        ctx.fillStyle = `hsla(${hue},100%,60%,${alpha})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      if (t > 1.2) { cancelAnimationFrame(raf); onDone && onDone(); return; }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, hue, onDone]);

  return active ? <canvas ref={canvasRef} className="fixed inset-0 z-50"/> : null;
}
