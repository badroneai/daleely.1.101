"use client";

import { useState } from "react";
import { getSkill, type GameQuestion } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { GameResult } from "./shared";

interface Tile { skill: string; label: string; emoji: string; count: number; pass: number }

const TILES: Tile[] = [
  { skill: "add", label: "جسر الجمع", emoji: "🌉", count: 3, pass: 2 },
  { skill: "sub", label: "كهف الطرح", emoji: "🕳️", count: 3, pass: 2 },
  { skill: "mult", label: "غابة الضرب", emoji: "🌲", count: 3, pass: 2 },
  { skill: "div", label: "نهر القسمة", emoji: "🌊", count: 3, pass: 2 },
  { skill: "science", label: "وادي العلوم", emoji: "🔬", count: 3, pass: 2 },
  { skill: "mixed", label: "قلعة الوحش", emoji: "🏰", count: 5, pass: 4 },
];

export default function AdventureGame() {
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [pos, setPos] = useState(0);
  const [qi, setQi] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [q, setQ] = useState<GameQuestion | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const genFor = (p: number) => getSkill(TILES[p].skill)!.gen();
  const start = () => { setPos(0); setQi(0); setCorrect(0); setMsg(null); setPicked(null); setQ(genFor(0)); setPhase("play"); };
  const enterTile = (p: number) => { setQi(0); setCorrect(0); setPicked(null); setQ(genFor(p)); };

  const choose = (opt: string) => {
    if (!q || picked) return;
    setPicked(opt);
    const ok = opt === q.answer;
    const nCorrect = ok ? correct + 1 : correct;
    if (ok) setCorrect(nCorrect);
    setTimeout(() => {
      const tile = TILES[pos];
      const nqi = qi + 1;
      if (nqi < tile.count) { setQi(nqi); setPicked(null); setQ(genFor(pos)); return; }
      // tile finished
      if (nCorrect >= tile.pass) {
        const nPos = pos + 1;
        if (nPos >= TILES.length) { recordResult("games", "adventure", true, TILES.length); setPos(nPos); setPhase("done"); return; }
        setMsg(`أحسنت! اجتزت ${tile.label} 🎉`);
        setPos(nPos);
        setTimeout(() => { setMsg(null); enterTile(nPos); }, 900);
      } else {
        setMsg("الوحش صدّك! حاول هذه المرحلة مجددًا 💪");
        setTimeout(() => { setMsg(null); enterTile(pos); }, 1100);
      }
    }, 600);
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">اعبر مراحل الجزيرة — كل مرحلة تحدٍّ من المنهج — حتى تهزم وحش القلعة! 🏰</p>
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ المغامرة 🗺️</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={TILES.length} max={TILES.length} onReplay={() => setPhase("intro")} note="هزمت وحش القلعة! 🏆" />;
  }

  const tile = TILES[pos];
  return (
    <div className="space-y-5">
      {/* map */}
      <div className="flex flex-wrap gap-2 justify-center">
        {TILES.map((t, i) => (
          <div key={t.label} className={`px-2 py-1 rounded-lg text-xl ${i < pos ? "bg-green-100" : i === pos ? "bg-primary-600 text-white" : "bg-gray-100 opacity-60"}`} title={t.label} aria-hidden="true">
            {i < pos ? "✅" : t.emoji}
          </div>
        ))}
      </div>

      {msg ? (
        <p className="text-center text-lg font-bold text-primary-700 py-8" role="status" aria-live="polite">{msg}</p>
      ) : (
        <>
          <p className="text-center font-bold text-gray-900">{tile.emoji} {tile.label}</p>
          <p className="text-center text-sm text-gray-500">سؤال {toArabicDigits(qi + 1)} / {toArabicDigits(tile.count)} · أصبت {toArabicDigits(correct)}</p>
          <p className="text-3xl font-extrabold text-center text-gray-900">{q?.prompt}</p>
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            {q?.options.map((opt) => {
              const cls = picked ? (opt === q.answer ? "bg-green-600 text-white" : opt === picked ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900") : "bg-gray-100 text-gray-900 hover:bg-primary-100";
              return <button key={opt} type="button" disabled={!!picked} onClick={() => choose(opt)} className={`py-4 rounded-xl text-2xl font-bold transition-colors focus-visible-ring ${cls}`}>{opt}</button>;
            })}
          </div>
        </>
      )}
    </div>
  );
}
