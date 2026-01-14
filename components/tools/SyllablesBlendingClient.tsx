"use client";

import { useState, useEffect } from "react";
import SyllablesBlending from "./SyllablesBlending";
import { getUserSpeechSettings } from "@/lib/audio/speech-settings";
import type { GradeLevel } from "@/lib/types";

interface SyllablesBlendingClientProps {
  grade: GradeLevel | "all";
}

export default function SyllablesBlendingClient({ grade }: SyllablesBlendingClientProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mode, setMode] = useState<"quick" | "full">("quick");

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setMode(isMobile ? "quick" : "full");
    
    // Initialize soundEnabled from speech settings
    const settings = getUserSpeechSettings();
    setSoundEnabled(settings.enabled);
  }, []);

  return (
    <div className="mb-4">
      <SyllablesBlending
        grade={grade}
        soundEnabled={soundEnabled}
        mode={mode}
      />
    </div>
  );
}
