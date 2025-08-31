import { useEffect, useRef } from "react";

interface Props {
  onScrollHintClick?: () => void;
}

export default function Hero({ onScrollHintClick }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // autoplay might be blocked; it's muted so usually allowed
      }
    };
    tryPlay();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white cursor-none">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="https://cdn.coverr.co/videos/coverr-athlete-on-the-track-9829/1080p.mp4"
        style={{ WebkitMaskImage: `radial-gradient(200px 200px at var(--orb-x,50%) var(--orb-y,50%), rgba(0,0,0,1), rgba(0,0,0,0.02) 60%, rgba(0,0,0,0) 70%)`, maskImage: `radial-gradient(200px 200px at var(--orb-x,50%) var(--orb-y,50%), rgba(0,0,0,1), rgba(0,0,0,0.02) 60%, rgba(0,0,0,0) 70%)`, transition: "-webkit-mask-image 120ms, mask-image 120ms" }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <h1 className="text-center font-serif text-[clamp(32px,7vw,80px)] tracking-tight leading-[1.05]">
          ESCUTE SEU CORPO.
        </h1>
      </div>

      <button
        onClick={onScrollHintClick}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-white"
        data-orb-hover
      >
        <span className="inline-flex items-center gap-2 animate-bounce">
          Scroll
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </button>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
    </section>
  );
}
