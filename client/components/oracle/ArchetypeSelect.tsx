import { Dumbbell, Infinity, Scale } from "lucide-react";
import { ARCHETYPES, type ArchetypeKey } from "./archetypes";
import { useContext } from "react";
import { OrchestratorContext } from "@/components/symphony/SymphonyRoot";

export default function ArchetypeSelect({ onSelect }: { onSelect: (key: ArchetypeKey) => void }) {
  const engine = useContext(OrchestratorContext);

  const handleHover = (key: ArchetypeKey) => {
    engine?.setTheme(key === "forca" ? "forca" : key === "resistencia" ? "resistencia" : "equilibrio");
    engine?.playHover();
  };

  const Icon = ({ k }: { k: ArchetypeKey }) => (
    k === "forca" ? <Dumbbell size={56} /> : k === "resistencia" ? <Infinity size={56} /> : <Scale size={56} />
  );

  return (
    <section className="relative grid min-h-screen place-items-center bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_50%_30%,rgba(209,0,120,0.08),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <h2 className="mb-10 font-serif text-[clamp(28px,6vw,64px)]">QUAL É A SUA JORNADA?</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {(Object.keys(ARCHETYPES) as ArchetypeKey[]).map((k) => (
            <button
              key={k}
              data-orb-hover
              onMouseEnter={() => handleHover(k)}
              onClick={() => { engine?.playClick(); engine?.setTheme(k); onSelect(k); }}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/5 to-white/[0.03] px-8 py-10 backdrop-blur transition-transform hover:scale-[1.02]"
              style={{ outlineColor: `hsl(${ARCHETYPES[k].colorHsl})` }}
            >
              <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full bg-white/10 text-white">
                <Icon k={k} />
              </div>
              <div className="text-lg font-semibold tracking-widest">{ARCHETYPES[k].label}</div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(300px_220px_at_50%_20%, hsl(${ARCHETYPES[k].colorHsl}/.25), transparent)` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
