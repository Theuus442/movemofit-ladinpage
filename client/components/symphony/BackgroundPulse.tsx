import { useEffect, useRef } from "react";

export default function BackgroundPulse({ level }: { level: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const onResize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, `rgba(209,0,120,${0.05 + level * 0.2})`);
      grad.addColorStop(1, `rgba(255,255,255,${0.03 + level * 0.1})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // flowing lines
      const rows = 6;
      for (let r = 0; r < rows; r++) {
        const y = (r + 1) * (canvas.height / (rows + 1)) / (window.devicePixelRatio || 1);
        ctx.beginPath();
        for (let x = 0; x < canvas.width / (window.devicePixelRatio || 1); x += 6) {
          const amp = 8 + level * 40;
          const yy = y + Math.sin((x + performance.now() / (90 - level * 40)) / 40) * amp;
          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.06 + level * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      raf.current = requestAnimationFrame(draw);
    };
    onResize();
    window.addEventListener("resize", onResize);
    raf.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [level]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}
