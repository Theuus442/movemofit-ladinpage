import { useMemo } from "react";
import { useSectionProgress } from "@/hooks/useSectionProgress";

export default function Manifesto() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();

  const scale = useMemo(() => 1 - progress * 0.65, [progress]);
  const translate = useMemo(() => ({ x: progress * 0.42 * window.innerWidth, y: progress * -0.3 * window.innerHeight }), [progress]);

  return (
    <section ref={ref} className="relative h-[180vh] bg-black text-white">
      <div className="sticky top-0 h-screen">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, transformOrigin: "10% 10%" }}
        >
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline src="https://cdn.coverr.co/videos/coverr-athlete-on-the-track-9829/1080p.mp4" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-end px-6">
          <p className="max-w-xl text-lg md:text-2xl text-white/90">
            Criamos mais do que roupas. Criamos uma segunda pele que respira, move e celebra cada uma de suas conquistas. Esta é a tecnologia a serviço da sua determinação.
          </p>
        </div>
      </div>
    </section>
  );
}
