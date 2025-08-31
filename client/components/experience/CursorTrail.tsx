import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    const step = () => {
      const arr = trail.current;
      arr.push({ x: pos.x, y: pos.y });
      if (arr.length > 12) arr.shift();
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [pos.x, pos.y]);

  const size = 10;

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
      {/* Trail dots */}
      {trail.current.map((p, i) => (
        <div
          key={i}
          style={{
            transform: `translate(${p.x - size / 2}px, ${p.y - size / 2}px) scale(${1 - i / 14})`,
            opacity: 0.12 * (1 - i / 14),
          }}
          className="absolute w-[10px] h-[10px] rounded-full bg-white mix-blend-screen"
        />
      ))}
      {/* Plus sign cursor */}
      <div
        style={{ transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)` }}
        className="absolute w-[12px] h-[12px] text-white"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
