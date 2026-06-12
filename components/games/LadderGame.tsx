"use client";

import { useState } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { SkillPicker, GameResult } from "./shared";

const GOAL = 12;
const MAX_Q = 20;

export default function LadderGame() {
  const [skill, setSkill] = useState("mixed");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [rung, setRung] = useState(0);
  const [asked, setAsked] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const gen = () => getSkill(skill)!.gen();
  const start = () => { setRung(0); setAsked(0); setPicked(null); setQ(gen()); setPhase("play"); };

  const choose = (opt: string) => {
    if (!q || picked) return;
    setPicked(opt);
    const correct = opt === q.answer;
    setTimeout(() => {
      const nRung = correct ? rung + 1 : Math.max(0, rung - 1);
      const nAsked = asked + 1;
      if (nRung >= GOAL || nAsked >= MAX_Q) {
        recordResult("games", "ladder", true, nRung);
        setRung(nRung); setPhase("done");
      } else {
        setRung(nRung); setAsked(nAsked); setPicked(null); setQ(gen());
      }
    }, 600);
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">اصعد السلّم! كل إجابة صحيحة ترفعك درجة. اصعد إلى القمة 🌟</p>
        <SkillPicker value={skill} onChange={setSkill} />
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ 🪜</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={rung} max={GOAL} onReplay={() => setPhase("intro")} note={rung >= GOAL ? "وصلت إلى القمة! 🎉" : "محاولة جيدة"} />;
  }

  return (
    <div className="flex gap-5">
      <div className="flex flex-col-reverse gap-1" aria-label={`الدرجة ${rung} من ${GOAL}`}>
        {Array.from({ length: GOAL }, (_, i) => (
          <div key={i} className={`w-10 h-7 rounded grid place-items-center text-sm ${i < rung ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}>
            {i + 1 === rung ? "🧗" : i === GOAL - 1 ? "🌟" : ""}
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-5">
        <p className="text-sm text-gray-500 text-center">الدرجة {toArabicDigits(rung)} / {toArabicDigits(GOAL)}</p>
        <p className="text-3xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
        <div className="grid grid-cols-2 gap-3">
          {q?.options.map((opt) => {
            const cls = picked ? (opt === q.answer ? "bg-green-600 text-white" : opt === picked ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900") : "bg-gray-100 text-gray-900 hover:bg-primary-100";
            return <button key={opt} type="button" disabled={!!picked} onClick={() => choose(opt)} className={`py-4 rounded-xl text-2xl font-bold transition-colors focus-visible-ring ${cls}`}>{opt}</button>;
          })}
        </div>
      </div>
    </div>
  );
}
