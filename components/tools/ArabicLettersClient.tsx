"use client";

import { useState, useEffect } from "react";
import ArabicLetters from "./ArabicLetters";
import { setSoundEnabled as setGlobalSoundEnabled } from "@/lib/sounds";

export default function ArabicLettersClient() {
  const [gradeLevel, setGradeLevel] = useState<"1-2" | "3-4" | "5-6" | "all">("1-2");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mode, setMode] = useState<"quick" | "full">("quick");

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setMode(isMobile ? "quick" : "full");
  }, []);

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <select
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value as any)}
          className="input-field w-auto min-w-[120px]"
        >
          <option value="1-2">الصف 1-2</option>
          <option value="3-4">الصف 3-4</option>
          <option value="5-6">الصف 5-6</option>
          <option value="all">جميع المراحل</option>
        </select>
        <button
          onClick={() => {
            const newState = !soundEnabled;
            setSoundEnabled(newState);
            setGlobalSoundEnabled(newState);
          }}
          className={`btn-secondary text-sm ${soundEnabled ? "bg-primary-100" : ""}`}
        >
          {soundEnabled ? "🔊 الصوت مفعّل" : "🔇 الصوت معطّل"}
        </button>
      </div>
      <ArabicLetters
        gradeLevel={gradeLevel}
        soundEnabled={soundEnabled}
        mode={mode}
      />
    </div>
  );
}
