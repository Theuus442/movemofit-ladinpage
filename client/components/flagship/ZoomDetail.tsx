import { useState } from "react";

interface HotspotInfo { x: number; y: number; text: string }

function Hotspot({ x, y, text }: HotspotInfo) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-8 w-8 place-items-center rounded-full bg-white text-black shadow-xl"
        aria-label="Hotspot"
      >
        +
      </button>
      {open && (
        <div className="mt-2 max-w-xs rounded-md bg-black/80 p-3 text-sm text-white backdrop-blur">
          {text}
        </div>
      )}
    </div>
  );
}

export default function ZoomDetail() {
  const hotspots: HotspotInfo[] = [
    { x: 30, y: 40, text: "Tecido AirFlow: respirabilidade máxima com toque suave." },
    { x: 60, y: 55, text: "Costura selada para conforto e durabilidade." },
    { x: 48, y: 70, text: "Painéis elásticos para mobilidade sem restrições." },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=2000&auto=format&fit=crop"
          alt="Close-up têxtil"
          className="h-[70vh] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
        <div className="pointer-events-auto absolute inset-0">
          {hotspots.map((hs, i) => (
            <Hotspot key={i} {...hs} />
          ))}
        </div>
      </div>
    </section>
  );
}
