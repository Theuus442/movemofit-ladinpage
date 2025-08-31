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
        {/* Gradient mesh background with brand tint and subtle grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              `linear-gradient(135deg, hsl(${cfg.colorHsl}/.10) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.0) 100%),
               radial-gradient(700px 350px at 20% 0%, hsl(${cfg.colorHsl}/.22), transparent 60%),
               radial-gradient(700px 350px at 80% 100%, hsl(${cfg.colorHsl}/.14), transparent 60%),
               radial-gradient(900px 500px at 50% 50%, rgba(255,255,255,0.03), rgba(0,0,0,0))`
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 24px)," +
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 24px)"
          }}
        />
        {/* Soft animated brand blobs */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[60vh] w-[60vh] rounded-full blur-3xl opacity-25" style={{ background: `radial-gradient(circle at 30% 30%, hsl(${cfg.colorHsl}/.30), transparent 60%)` }} />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[50vh] w-[50vh] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle at 70% 70%, hsl(${cfg.colorHsl}/.22), transparent 60%)` }} />

        <a href={cfg.ctaLink} target="_blank" rel="noreferrer" data-orb-hover className="relative z-10 rounded-full bg-white px-8 py-4 text-black font-semibold tracking-widest shadow-2xl">
          MONTE SEU ECOSSISTEMA
        </a>
      </section>
    </div>
  );
}
