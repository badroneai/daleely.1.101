"use client";

import { useState } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { SkillPicker } from "./shared";

const WIN = 5;
const NAMES = ["اللاعب الأول", "اللاعب الثاني"];

export default function DuelGame() {
  const [skill, setSkill] = useState("mixed");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [picked, setPicked] = useState<string | null>(null);
  const [winner, setWinner] = useState(0);

  const gen = () => getSkill(skill)!.gen();
  const start = () => { setTurn(0); setScores([0, 0]); setPicked(null); setQ(gen()); setPhase("play"); };

  const choose = (opt: string) => {
    if (!q || picked) return;
    setPicked(opt);
    const correct = opt === q.answer;
    setTimeout(() => {
      const ns = [...scores];
      if (correct) ns[turn] += 1;
      if (ns[turn] >= WIN) {
        setScores(ns); setWinner(turn); recordResult("games", "duel", true, WIN); setPhase("done");
      } else {
        setScores(ns); setTurn(1 - turn); setPicked(null); setQ(gen());
      }
    }, 650);
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">لاعبان على جهاز واحد! تناوبا على الإجابة، وأول من يبلغ {toArabicDigits(WIN)} نقاط يفوز.</p>
        <SkillPicker value={skill} onChange={setSkill} />
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ ⚔️</button>
      </div>
    );
  }
  if (phase === "done") {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="text-5xl mb-3" aria-hidden="true">🏆</div>
        <p className="text-2xl font-bold text-gray-900 mb-1">فاز {NAMES[winner]}!</p>
        <p className="text-gray-600 mb-5">{toArabicDigits(scores[0])} — {toArabicDigits(scores[1])}</p>
        <button type="button" onClick={() => setPhase("intro")} className="btn-primary focus-visible-ring">العب مجددًا</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 text-center">
        {NAMES.map((n, i) => (
          <div key={n} className={`rounded-xl p-3 ${turn === i ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700"}`}>
            <p className="text-sm">{n}</p>
            <p className="text-2xl font-extrabold">{toArabicDigits(scores[i])}</p>
          </div>
        ))}
      </div>
      <p className="text-center font-semibold text-primary-700">دور {NAMES[turn]}</p>
      <p className="text-3xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
      <div className="grid grid-cols-2 gap-3">
        {q?.options.map((opt) => {
          const cls = picked ? (opt === q.answer ? "bg-green-600 text-white" : opt === picked ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900") : "bg-gray-100 text-gray-900 hover:bg-primary-100";
          return <button key={opt} type="button" disabled={!!picked} onClick={() => choose(opt)} className={`py-4 rounded-xl text-2xl font-bold transition-colors focus-visible-ring ${cls}`}>{opt}</button>;
        })}
      </div>
    </div>
  );
}
