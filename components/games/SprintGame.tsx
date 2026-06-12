"use client";

import { useState, useEffect, useRef } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { SkillPicker, GameResult } from "./shared";

const DURATION = 60;

export default function SprintGame() {
  const [skill, setSkill] = useState("mixed");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);

  const endAt = useRef(0);
  const scoreRef = useRef(0);

  const gen = () => getSkill(skill)!.gen();

  // Gentle countdown; finishing happens in the interval callback (not in an
  // effect body / updater), so it stays lint-safe and reads the clock off render.
  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(id);
        recordResult("games", "sprint", true, scoreRef.current);
        setPhase("done");
      }
    }, 250);
    return () => clearInterval(id);
  }, [phase]);

  const start = () => {
    scoreRef.current = 0; setScore(0);
    endAt.current = Date.now() + DURATION * 1000;
    setTimeLeft(DURATION); setQ(gen()); setPhase("play");
  };
  const choose = (opt: string) => {
    if (!q) return;
    if (opt === q.answer) { scoreRef.current += 1; setScore(scoreRef.current); }
    setQ(gen());
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">أجب أكبر عدد من الأسئلة الصحيحة خلال {toArabicDigits(DURATION)} ثانية!</p>
        <SkillPicker value={skill} onChange={setSkill} />
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ ⏱️</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={score} onReplay={() => setPhase("intro")} note="إجابة صحيحة" />;
  }

  const low = timeLeft <= 10;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-bold">
        <span className={`text-lg ${low ? "text-red-600" : "text-sky-700"}`}>⏱️ {toArabicDigits(timeLeft)}</span>
        <span className="text-amber-700">⭐ {toArabicDigits(score)}</span>
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {q?.options.map((opt) => (
          <button key={opt} type="button" onClick={() => choose(opt)} className="py-4 rounded-xl text-2xl font-bold bg-gray-100 text-gray-900 hover:bg-primary-100 transition-colors focus-visible-ring">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
