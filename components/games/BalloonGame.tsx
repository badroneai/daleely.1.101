"use client";

import { useState } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { SkillPicker, GameResult } from "./shared";

const ROUNDS = 10;
const LIVES = 3;
const colors = ["bg-rose-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500"];

export default function BalloonGame() {
  const [skill, setSkill] = useState("mixed");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(LIVES);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const gen = () => getSkill(skill)!.gen();

  const start = () => {
    setRound(1); setLives(LIVES); setScore(0); setPicked(null);
    setQ(gen()); setPhase("play");
  };

  const pop = (opt: string) => {
    if (!q || picked) return;
    setPicked(opt);
    const correct = opt === q.answer;
    const nScore = correct ? score + 1 : score;
    const nLives = correct ? lives : lives - 1;
    if (correct) setScore(nScore); else setLives(nLives);
    setTimeout(() => {
      if (round >= ROUNDS || nLives <= 0) {
        recordResult("games", "balloon", true, nScore);
        setPhase("done");
      } else {
        setRound(round + 1); setPicked(null); setQ(gen());
      }
    }, 650);
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">اختر المهارة ثم افقع البالون الذي يحمل الإجابة الصحيحة!</p>
        <SkillPicker value={skill} onChange={setSkill} />
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ 🎈</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={score} max={ROUNDS} onReplay={() => setPhase("intro")} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-gray-500">السؤال {toArabicDigits(round)}/{toArabicDigits(ROUNDS)}</span>
        <span className="text-amber-700">⭐ {toArabicDigits(score)}</span>
        <span aria-label={`المحاولات المتبقية ${lives}`}>{"❤️".repeat(lives)}</span>
      </div>
      <p className="text-3xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {q?.options.map((opt, i) => {
          const cls = picked ? (opt === q.answer ? "bg-green-600" : opt === picked ? "bg-red-600" : colors[i % 4]) : colors[i % 4];
          return (
            <button key={opt} type="button" disabled={!!picked} onClick={() => pop(opt)} style={{ animationDelay: `${i * 0.2}s` }}
              className={`animate-float ${cls} text-white text-2xl font-bold rounded-full aspect-square grid place-items-center shadow-lg hover:scale-105 active:scale-95 transition-transform focus-visible-ring`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
