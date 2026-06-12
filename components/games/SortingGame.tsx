"use client";

import { useState } from "react";
import { getActivities } from "@/lib/content";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { GameResult } from "./shared";

interface SortItem { text: string; bucket: string }
function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}
function buildSort(): { buckets: string[]; items: SortItem[] } {
  const sorts = getActivities().filter((a) => a.kind === "sort").map((a) => (a.kind === "sort" ? { buckets: a.buckets, items: a.items } : { buckets: [], items: [] }));
  const items: SortItem[] = [];
  for (let i = 0; i < 6; i++) { const v = Math.floor(Math.random() * 19) + 2; items.push({ text: toArabicDigits(v), bucket: v % 2 === 0 ? "زوجي" : "فردي" }); }
  const evenOdd = { buckets: ["زوجي", "فردي"], items };
  const pool = [...sorts, evenOdd];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function SortingGame() {
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [data, setData] = useState<{ buckets: string[]; items: SortItem[] }>({ buckets: [], items: [] });
  const [order, setOrder] = useState<number[]>([]);
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const start = () => {
    const d = buildSort(); setData(d);
    setOrder(shuffle(d.items.map((_, i) => i)));
    setPlaced({}); setSel(null); setMistakes(0); setWrong(null); setPhase("play");
  };

  const tapBucket = (b: string) => {
    if (sel == null) return;
    if (data.items[sel].bucket === b) {
      const p = { ...placed, [sel]: b }; setPlaced(p); setSel(null);
      if (Object.keys(p).length === data.items.length) { recordResult("games", "sorting", true, data.items.length); setPhase("done"); }
    } else {
      setWrong(b); setMistakes((m) => m + 1); setTimeout(() => setWrong(null), 500);
    }
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">وزّع كل عنصر في السلّة الصحيحة بسرعة!</p>
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ 🗂️</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={data.items.length} onReplay={() => setPhase("intro")} note={`أخطاء: ${toArabicDigits(mistakes)}`} />;
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-gray-500">وزّعت {toArabicDigits(Object.keys(placed).length)} / {toArabicDigits(data.items.length)}</p>
      <div className="flex flex-wrap gap-2 justify-center min-h-[3rem]">
        {order.filter((i) => placed[i] == null).map((i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={`py-2 px-4 rounded-full font-semibold transition-colors focus-visible-ring ${sel === i ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
            {data.items[i].text}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {data.buckets.map((b) => (
          <button key={b} type="button" onClick={() => tapBucket(b)} className={`rounded-2xl border-2 p-3 text-right transition-colors focus-visible-ring ${wrong === b ? "border-red-500 bg-red-50" : "border-primary-200 bg-primary-50 hover:bg-primary-100"}`}>
            <p className="font-bold text-gray-900 mb-2">{b}</p>
            <div className="flex flex-wrap gap-1">
              {data.items.map((it, i) => placed[i] === b ? <span key={i} className="bg-green-600 text-white text-sm rounded-full px-3 py-1">{it.text}</span> : null)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
