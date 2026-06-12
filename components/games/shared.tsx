"use client";

// Shared bits for games: skill picker + end screen. Keeps each game small.

import { GAME_SKILLS } from "@/lib/games/feed";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export function SkillPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const all = [{ id: "mixed", label: "منوّع" }, ...GAME_SKILLS.map((s) => ({ id: s.id, label: s.label }))];
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {all.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors focus-visible-ring ${value === s.id ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

export function GameResult({ score, max, onReplay, note }: { score: number; max?: number; onReplay: () => void; note?: string }) {
  return (
    <div className="text-center py-8" role="status" aria-live="polite">
      <div className="text-5xl mb-3" aria-hidden="true">🎉</div>
      <p className="text-2xl font-bold text-gray-900 mb-1">
        نتيجتك: {toArabicDigits(score)}
        {typeof max === "number" ? ` / ${toArabicDigits(max)}` : ""}
      </p>
      {note && <p className="text-gray-600 mb-1">{note}</p>}
      <p className="text-amber-600 font-semibold mb-5">⭐ +١ نجمة</p>
      <button type="button" onClick={onReplay} className="btn-primary focus-visible-ring">العب مجددًا</button>
    </div>
  );
}
