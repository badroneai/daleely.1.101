"use client";

import { useState } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { SkillPicker, GameResult } from "./shared";

const TIERS = [1, 2, 3, 5, 10];
const sumTiers = (n: number) => TIERS.slice(0, n).reduce((a, b) => a + b, 0);

export default function QuizShowGame() {
  const [skill, setSkill] = useState("mixed");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [opts, setOpts] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [used5050, setUsed] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [earned, setEarned] = useState(0);

  const gen = () => getSkill(skill)!.gen();
  const start = () => {
    setIdx(0); setUsed(false); setPicked(null); setEarned(0);
    const nq = gen(); setQ(nq); setOpts(nq.options); setPhase("play");
  };

  const use5050 = () => {
    if (used5050 || !q || picked) return;
    const wrongs = q.options.filter((o) => o !== q.answer);
    const keep = wrongs[Math.floor(Math.random() * wrongs.length)];
    setOpts(q.answer < keep ? [q.answer, keep] : [keep, q.answer]);
    setUsed(true);
  };

  const choose = (opt: string) => {
    if (!q || picked) return;
    setPicked(opt);
    const correct = opt === q.answer;
    setTimeout(() => {
      if (!correct) { setEarned(sumTiers(idx)); recordResult("games", "quiz-show", true, sumTiers(idx)); setPhase("done"); return; }
      if (idx >= TIERS.length - 1) { setEarned(sumTiers(TIERS.length)); recordResult("games", "quiz-show", true, sumTiers(TIERS.length)); setPhase("done"); return; }
      const ni = idx + 1; setIdx(ni); setUsed(false); setPicked(null);
      const nq = gen(); setQ(nq); setOpts(nq.options);
    }, 750);
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">خمسة أسئلة صاعدة! أجب صحيحًا واصعد — ولديك مساعدة ٥٠:٥٠ مرة واحدة.</p>
        <SkillPicker value={skill} onChange={setSkill} />
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ 🏆</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={earned} max={sumTiers(TIERS.length)} onReplay={() => setPhase("intro")} note="نقطة" />;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">السؤال {toArabicDigits(idx + 1)} / {toArabicDigits(TIERS.length)}</span>
        <span className="text-amber-700 font-bold">قيمة السؤال: {toArabicDigits(TIERS[idx])} ⭐</span>
      </div>
      <p className="text-2xl md:text-3xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
      <div className="grid grid-cols-2 gap-3">
        {opts.map((opt) => {
          const cls = picked ? (opt === q?.answer ? "bg-green-600 text-white" : opt === picked ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900") : "bg-gray-100 text-gray-900 hover:bg-primary-100";
          return <button key={opt} type="button" disabled={!!picked} onClick={() => choose(opt)} className={`py-4 rounded-xl text-xl font-bold transition-colors focus-visible-ring ${cls}`}>{opt}</button>;
        })}
      </div>
      <div className="text-center">
        <button type="button" onClick={use5050} disabled={used5050 || !!picked} className="btn-secondary disabled:opacity-40 focus-visible-ring">مساعدة ٥٠:٥٠</button>
      </div>
    </div>
  );
}
