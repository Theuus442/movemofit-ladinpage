import { useEffect, useRef, useState } from "react";

interface Props { analyserLevel?: () => number }

export default function CursorOrb({ analyserLevel }: Props) {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [hovering, setHovering] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--orb-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--orb-y", `${e.clientY}px`);
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      setHovering(Boolean(t?.closest("[data-orb-hover]")));
    };
    window.addEventListener("pointermove", onMove as any, { passive: true });
    window.addEventListener("mouseover", onOver as any);
    return () => {
      window.removeEventListener("pointermove", onMove as any);
      window.removeEventListener("mouseover", onOver as any);
    };
  }, []);

  // subtle pulse with audio
  const [lvl, setLvl] = useState(0);
  useEffect(() => {
    if (!analyserLevel) return;
    const step = () => {
      setLvl(analyserLevel());
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [analyserLevel]);

  const size = 24 + lvl * 24 + (hovering ? 18 : 0);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mix-blend-screen" aria-hidden>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          width: size,
          height: size,
          background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(255,255,255,0.15))",
          filter: "blur(2px) saturate(1.4)",
          transition: "width 120ms ease, height 120ms ease",
        }}
      />
      {/* faint trail */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          width: size * 1.9,
          height: size * 1.9,
          background: "radial-gradient(circle, rgba(209,0,120,0.18), transparent 60%)",
          transition: "width 200ms ease, height 200ms ease, opacity 200ms",
        }}
      />
    </div>
  );
}
