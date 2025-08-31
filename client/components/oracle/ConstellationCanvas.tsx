import { useEffect, useRef } from "react";

export default function ConstellationCanvas({ level = 0.1, hue = 326 }: { level?: number; hue?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const ptsRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      const arr = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
      ptsRef.current = arr;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = ptsRef.current;
      for (const p of pts) {
        p.x += p.vx * (1 + level);
        p.y += p.vy * (1 + level);
        if (p.x < 0) p.x = window.innerWidth; if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight; if (p.y > window.innerHeight) p.y = 0;
      }
      // connections
      const maxD = 150;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y; const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const alpha = Math.max(0, 0.05 + level * 0.5 - d / (maxD * 15));
            ctx.strokeStyle = `hsla(${hue},100%,60%,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // points
      for (const p of pts) {
        ctx.fillStyle = `hsla(${hue},100%,70%,${0.08 + level * 0.3})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2 + level * 1.5, 0, Math.PI * 2); ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [level, hue]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10"/>;
}
