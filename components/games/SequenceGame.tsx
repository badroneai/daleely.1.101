"use client";

import { useState } from "react";
import { getActivities } from "@/lib/content";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { GameResult } from "./shared";

function arNum(n: number): string {
  return toArabicDigits(n);
}
function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}
function buildSequence(): { title: string; items: string[] } {
  const seqs = getActivities().filter((a) => a.kind === "sequence").map((a) => (a.kind === "sequence" ? { title: a.title, items: a.items } : { title: "", items: [] }));
  const nums: number[] = [];
  while (nums.length < 4) { const n = Math.floor(Math.random() * 90) + 10; if (!nums.includes(n)) nums.push(n); }
  const numSeq = { title: "رتّب الأعداد تصاعديًّا", items: [...nums].sort((a, b) => a - b).map(arNum) };
  const pool = [...seqs, numSeq];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function SequenceGame() {
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [seq, setSeq] = useState<{ title: string; items: string[] } | null>(null);
  const [display, setDisplay] = useState<{ text: string; idx: number }[]>([]);
  const [n, setN] = useState(0);
  const [placed, setPlaced] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const start = () => {
    const s = buildSequence(); setSeq(s);
    setDisplay(shuffle(s.items.map((text, idx) => ({ text, idx }))));
    setN(0); setPlaced(new Set()); setMistakes(0); setWrong(null); setPhase("play");
  };

  const tap = (idx: number) => {
    if (!seq || placed.has(idx)) return;
    if (idx === n) {
      const p = new Set(placed); p.add(idx); setPlaced(p);
      const nn = n + 1; setN(nn);
      if (nn === seq.items.length) { recordResult("games", "sequence", true, seq.items.length); setPhase("done"); }
    } else {
      setWrong(idx); setMistakes((m) => m + 1); setTimeout(() => setWrong(null), 500);
    }
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">رتّب العناصر بالترتيب الصحيح — اضغطها من الأول إلى الأخير.</p>
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ ↕️</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={seq?.items.length ?? 0} onReplay={() => setPhase("intro")} note={`أخطاء: ${toArabicDigits(mistakes)}`} />;
  }

  return (
    <div className="space-y-4">
      <p className="text-center font-bold text-gray-900">{seq?.title}</p>
      <p className="text-center text-sm text-gray-500">رتّبت {toArabicDigits(n)} / {toArabicDigits(seq?.items.length ?? 0)}</p>
      <div className="space-y-2 max-w-md mx-auto">
        {display.map(({ text, idx }) => {
          const isPlaced = placed.has(idx);
          return (
            <button key={idx} type="button" disabled={isPlaced} onClick={() => tap(idx)}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-semibold transition-colors focus-visible-ring ${isPlaced ? "bg-green-600 text-white" : wrong === idx ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
              {isPlaced && <span className="bg-white/30 rounded-full w-7 h-7 grid place-items-center text-sm">{toArabicDigits(idx + 1)}</span>}
              <span>{text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
