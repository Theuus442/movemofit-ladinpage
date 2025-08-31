import { useEffect, useRef, useState } from "react";

export default function Lookbook() {
  // Remove o antigo Look 1 e usa o novo tênis fornecido
  const imgs = [
    "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fb08af7db36144141accc726a7ece0872?format=webp&width=1600",
    "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fb5b6674ec50143e28ca6e729d7a996aa?format=webp&width=1600",
    "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fa6de0943ee924279a26ef7b380a4b2e1?format=webp&width=1600",
    "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2F2ee08f3e8e7a467b98ed2baf130f71cf?format=webp&width=1600",
    "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fd4385365d82c463dbbe102882185877d?format=webp&width=1600",
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const total = Math.max(1, el.scrollWidth - el.clientWidth);
      setProgress(el.scrollLeft / total);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const onBarDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const el = trackRef.current!;
    const move = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      el.scrollLeft = pct * (el.scrollWidth - el.clientWidth);
    };
    move(e.clientX);
    const onMove = (ev: PointerEvent) => move(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  };

  return (
    <section className="relative w-full py-24">
      <h2 className="mx-auto mb-6 max-w-6xl px-6 font-serif text-4xl md:text-5xl">Lookbook</h2>
      <div className="no-scrollbar overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]" ref={trackRef}>
        <div className="mx-auto flex w-[180%] gap-8 px-6 md:w-[140%]" style={{ scrollSnapType: "x mandatory" }}>
          {imgs.map((src, i) => (
            <figure key={i} className="relative h-[60vh] min-w-[65vw] flex-[0_0_auto] overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10" style={{ scrollSnapAlign: "center" }}>
              <img src={src} alt={`Look ${i + 1}`} className="h-full w-full object-cover" />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm text-white/80">{`Look ${i + 1}`}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Barra personalizada para arrastar */}
      <div className="mx-auto mt-6 max-w-6xl px-6">
        <div
          className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
          onPointerDown={onBarDown}
        >
          <div className="absolute inset-y-0 left-0 rounded-full bg-brand" style={{ width: `${progress * 100}%` }} />
          <div
            className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow"
            style={{ left: `calc(${progress * 100}% )` }}
          />
        </div>
      </div>
    </section>
  );
}
