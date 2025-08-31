import { useEffect, useRef, useState, createContext, useMemo } from "react";
import { AudioOrchestrator } from "./AudioOrchestrator";
import CursorOrb from "./CursorOrb";
import BackgroundPulse from "./BackgroundPulse";

export const OrchestratorContext = createContext<AudioOrchestrator | null>(null);

export default function SymphonyRoot({ children }: { children: React.ReactNode }) {
  const engineRef = useRef<AudioOrchestrator | null>(null);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    // Audio desativado por solicitação do usuário
    engineRef.current = null;
    setStarted(false);
    setLevel(0);
  }, []);

  const engine = useMemo(() => engineRef.current, [engineRef.current]);
  return (
    <OrchestratorContext.Provider value={engine || null}>
      <div className="relative">
        <BackgroundPulse level={level} />
        {children}
        <CursorOrb />
      </div>
    </OrchestratorContext.Provider>
  );
}
