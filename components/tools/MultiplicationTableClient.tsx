"use client";

import { useState, useEffect } from "react";
import MultiplicationTable from "./MultiplicationTable";
import { getUserSpeechSettings } from "@/lib/audio/speech-settings";
import type { GradeLevel } from "@/lib/types";

interface MultiplicationTableClientProps {
  grade: GradeLevel | "all";
}

export default function MultiplicationTableClient({ grade }: MultiplicationTableClientProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mode, setMode] = useState<"quick" | "full">("quick");

  // Detect mobile/desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setMode(isMobile ? "quick" : "full");
    
    // Initialize soundEnabled from speech settings
    const settings = getUserSpeechSettings();
    setSoundEnabled(settings.enabled);
  }, []);

  return (
    <div className="mb-4">
      <MultiplicationTable
        grade={grade}
        soundEnabled={soundEnabled}
        mode={mode}
      />
    </div>
  );
}
