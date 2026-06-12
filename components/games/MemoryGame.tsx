"use client";

import { useState } from "react";
import { getSkill } from "@/lib/games/feed";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { GameResult } from "./shared";

const PAIRS = 6;
const MATH_SKILLS = [
  { id: "mult", label: "الضرب" },
  { id: "add", label: "الجمع" },
  { id: "sub", label: "الطرح" },
  { id: "div", label: "القسمة" },
];

interface Card { id: string; pairId: number; text: string }

function buildCards(skillId: string): Card[] {
  const skill = getSkill(skillId)!;
  const used = new Set<string>();
  const pairs: { prompt: string; answer: string }[] = [];
  let guard = 0;
  while (pairs.length < PAIRS && guard < 200) {
    guard++;
    const q = skill.gen();
    if (used.has(q.answer)) continue;
    used.add(q.answer);
    pairs.push({ prompt: q.prompt, answer: q.answer });
  }
  const cards: Card[] = [];
  pairs.forEach((p, i) => {
    cards.push({ id: `q${i}`, pairId: i, text: p.prompt });
    cards.push({ id: `a${i}`, pairId: i, text: p.answer });
  });
  // deterministic-enough shuffle for first paint, then stable
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function MemoryGame() {
  const [skill, setSkill] = useState("mult");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const start = () => {
    setCards(buildCards(skill)); setFlipped([]); setMatched(new Set()); setMoves(0); setLock(false); setPhase("play");
  };

  const tap = (card: Card) => {
    if (lock || matched.has(card.pairId) || flipped.includes(card.id) || flipped.length === 2) return;
    const nf = [...flipped, card.id];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves((m) => m + 1);
      const [aId, bId] = nf;
      const a = cards.find((c) => c.id === aId)!;
      const b = cards.find((c) => c.id === bId)!;
      if (a.pairId === b.pairId) {
        const nm = new Set(matched); nm.add(a.pairId); setMatched(nm); setFlipped([]);
        if (nm.size === PAIRS) { recordResult("games", "memory", true, PAIRS); setPhase("done"); }
      } else {
        setLock(true);
        setTimeout(() => { setFlipped([]); setLock(false); }, 750);
      }
    }
  };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5">
        <p className="text-lg text-gray-700">اقلب البطاقات وطابِق كل مسألة بناتجها.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {MATH_SKILLS.map((s) => (
            <button key={s.id} type="button" onClick={() => setSkill(s.id)} className={`px-4 py-2 rounded-full font-semibold transition-colors focus-visible-ring ${skill === s.id ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{s.label}</button>
          ))}
        </div>
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ 🃏</button>
      </div>
    );
  }
  if (phase === "done") {
    return <GameResult score={PAIRS} onReplay={() => setPhase("intro")} note={`عدد المحاولات: ${toArabicDigits(moves)}`} />;
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-gray-500">طوبِق {toArabicDigits(matched.size)} / {toArabicDigits(PAIRS)} · محاولات {toArabicDigits(moves)}</p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
        {cards.map((card) => {
          const faceUp = flipped.includes(card.id) || matched.has(card.pairId);
          const done = matched.has(card.pairId);
          return (
            <button key={card.id} type="button" onClick={() => tap(card)} disabled={faceUp}
              className={`aspect-square rounded-xl grid place-items-center text-lg font-bold transition-colors focus-visible-ring ${done ? "bg-green-600 text-white" : faceUp ? "bg-primary-100 text-primary-900" : "bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:brightness-110"}`}>
              {faceUp ? card.text : "؟"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
