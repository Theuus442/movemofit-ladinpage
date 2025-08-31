import { useEffect, useRef } from "react";

interface Props {
  intensity: number; // 0..1 audio-reactive
  awakened: boolean;
  cursor: { x: number; y: number } | null;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function NeuralNetworkCanvas({ intensity, awakened, cursor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const onResize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const initNodes = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 16000);
      const arr: Node[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
      nodesRef.current = arr;
    };

    const draw = () => {
      if (!awakened) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      // Update nodes
      for (const n of nodes) {
        n.x += n.vx * (1 + intensity * 0.8);
        n.y += n.vy * (1 + intensity * 0.8);
        if (n.x < -50) n.x = window.innerWidth + 50;
        if (n.x > window.innerWidth + 50) n.x = -50;
        if (n.y < -50) n.y = window.innerHeight + 50;
        if (n.y > window.innerHeight + 50) n.y = -50;
      }

      // Draw connections
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            // Cursor influence
            let boost = 0;
            if (cursor) {
              const dc = Math.hypot(((a.x + b.x) / 2) - cursor.x, ((a.y + b.y) / 2) - cursor.y);
              boost = Math.max(0, 1 - dc / 220) * 0.8;
            }
            const alpha = Math.max(0.02, 0.06 + intensity * 0.5 - d / (maxDist * 22)) + boost * 0.6;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes as faint points
      for (const n of nodes) {
        const r = 1.2 + intensity * 1.6;
        let pointAlpha = 0.08 + intensity * 0.25;
        if (cursor) {
          const dc = Math.hypot(n.x - cursor.x, n.y - cursor.y);
          pointAlpha += Math.max(0, 1 - dc / 200) * 0.5;
        }
        ctx.fillStyle = `rgba(255,255,255,${pointAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    onResize();
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [awakened, intensity, cursor]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
