"use client";

import { useState, useEffect, useRef } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { SkillPicker, GameResult } from "./shared";

const DURATION = 45;
const LIVES = 3;

export default function WhackGame() {
  const [skill, setSkill] = useState("mixed");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [timeLeft, setTimeLeft] = useState(DURATION);

  const endAt = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(LIVES);

  const gen = () => getSkill(skill)!.gen();

  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(id);
        recordResult("games", "whack", true, scoreRef.current);
        setPhase("done");
      }
    }, 250);
    return () => clearInterval(id);
  }, [phase]);

  const start = () => {
    scoreRef.current = 0; setScore(0); livesRef.current = LIVES; setLives(LIVES);
    endAt.current = Date.now() + DURATION * 1000; setTimeLeft(DURATION); setQ(gen()); setPhase("play");
  };

  const hit = (opt: string) => {
    if (!q || timeLeft <= 0) return;
    if (opt === q.answer) { scoreRef.current += 1; setScore(scoreRef.current); }
    else {
      livesRef.current -= 1; setLives(livesRef.current);
      if (livesRef.current <= 0) { recordResult("games", "whack", true, scoreRef.current); setPhase("done"); return; }
    }
    setQ(gen());
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">اضرب الخلد الذي يحمل الإجابة الصحيحة بسرعة قبل انتهاء الوقت!</p>
        <SkillPicker value={skill} onChange={setSkill} />
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ 🔨</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={score} onReplay={() => setPhase("intro")} note="إصابة صحيحة" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-bold">
        <span className={timeLeft <= 10 ? "text-red-600" : "text-sky-700"}>⏱️ {toArabicDigits(timeLeft)}</span>
        <span className="text-amber-700">⭐ {toArabicDigits(score)}</span>
        <span aria-label={`المحاولات ${lives}`}>{"❤️".repeat(lives)}</span>
      </div>
      <p className="text-3xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {q?.options.map((opt) => (
          <button key={opt} type="button" onClick={() => hit(opt)}
            className="relative bg-amber-900 text-white rounded-full aspect-square grid place-items-center shadow-inner hover:bg-amber-800 active:scale-95 transition-all focus-visible-ring">
            <span className="absolute -top-2 text-2xl" aria-hidden="true">🐹</span>
            <span className="text-2xl font-extrabold">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
