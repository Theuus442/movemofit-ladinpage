import OracleProducts from "@/components/oracle/OracleProducts";
import ZoomDetail from "@/components/flagship/ZoomDetail";
import Lookbook from "@/components/flagship/Lookbook";
import { ARCHETYPES, type ArchetypeKey } from "./archetypes";

export default function OracleExperience({ keySelected }: { keySelected: ArchetypeKey }) {
  const cfg = ARCHETYPES[keySelected];

  return (
    <div style={{ ['--brand' as any]: cfg.colorHsl } as React.CSSProperties}>
      <section className="relative grid h-[70vh] place-items-center bg-black text-white">
        <h2 className="px-6 text-center font-serif text-[clamp(28px,6vw,64px)]">{cfg.titleCTA}</h2>
      </section>
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <h3 className="mb-6 font-serif text-3xl">Constelação de Produtos</h3>
      </section>
      <OracleProducts items={cfg.products} />
      <ZoomDetail />
      <Lookbook />
      <section className="relative grid min-h-[60vh] place-items-center overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(800px 400px at 50% 20%, hsl(${cfg.colorHsl}/.18), transparent 60%)` }} />
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.4))" }} />
        <a href={cfg.ctaLink} target="_blank" rel="noreferrer" data-orb-hover className="relative z-10 rounded-full bg-white px-8 py-4 text-black font-semibold tracking-widest shadow-2xl">
          MONTE SEU ECOSSISTEMA
        </a>
      </section>
    </div>
  );
}
