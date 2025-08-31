import ArchetypeSelect from "@/components/oracle/ArchetypeSelect";
import OracleExperience from "@/components/oracle/OracleExperience";
import ParticlesTransition from "@/components/oracle/ParticlesTransition";
import ConstellationCanvas from "@/components/oracle/ConstellationCanvas";
import SymphonyRoot, { OrchestratorContext } from "@/components/symphony/SymphonyRoot";
import { useContext, useMemo, useRef, useState } from "react";
import { ARCHETYPES, type ArchetypeKey } from "@/components/oracle/archetypes";

export default function Index() {
  const topRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<ArchetypeKey | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const engine = useContext(OrchestratorContext);

  const hue = useMemo(() => {
    if (!selected) return 326; // brand default
    const h = ARCHETYPES[selected].colorHsl.split(" ")[0];
    return parseFloat(h);
  }, [selected]);

  return (
    <SymphonyRoot>
      <div ref={topRef} className="min-h-screen w-full bg-black text-white">
        <ConstellationCanvas level={0.12} hue={hue} />
        {!selected && (
          <ArchetypeSelect onSelect={(k) => { setTransitioning(true); setSelected(k); }} />
        )}
        {selected && (
          <>
            <OracleExperience keySelected={selected} />
            <ParticlesTransition active={transitioning} hue={hue} onDone={() => setTransitioning(false)} />
          </>
        )}
      </div>
    </SymphonyRoot>
  );
}
