// Unified question feed — "games = mechanics, skill = content". Every game pulls
// GameQuestions from a chosen skill; skills wrap our existing math engines and
// content activities, so games serve the whole curriculum with no new content.
// Math.random is used only inside gen() (called from handlers/effects, never in render).

import { getActivities } from "@/lib/content";

export interface GameQuestion {
  prompt: string;
  answer: string;
  options: string[]; // includes the answer; 2–4 choices
}

export interface GameSkill {
  id: string;
  label: string;
  subject: "math" | "science" | "social" | "life-skills";
  gen: () => GameQuestion;
}

const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function ar(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => AR[Number(d)]);
}
function rint(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function distractors(n: number): number[] {
  const cands = [n + 1, n - 1, n + 2, n - 2, n + 10, n - 10, n + 5].filter((x) => x > 0 && x !== n);
  const out: number[] = [];
  for (const c of shuffle(cands)) {
    if (!out.includes(c) && out.length < 3) out.push(c);
  }
  while (out.length < 3) out.push(n + out.length + 11);
  return out;
}
function numQ(prompt: string, answer: number): GameQuestion {
  return { prompt, answer: ar(answer), options: shuffle([answer, ...distractors(answer)].map(ar)) };
}
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

// --- content (activity quiz) pool ---
interface PoolQ { prompt: string; options: string[]; answer: string; subject: string }
const quizPool: PoolQ[] = getActivities()
  .filter((a) => a.kind === "quiz")
  .flatMap((a) => (a.kind === "quiz" ? a.questions.map((q) => ({ prompt: q.prompt, options: q.options, answer: q.answer, subject: a.subject })) : []));

function fromPool(subject: string): GameQuestion {
  const pool = quizPool.filter((q) => q.subject === subject);
  const q = pool.length ? pool[Math.floor(Math.random() * pool.length)] : quizPool[0];
  return { prompt: q.prompt, answer: q.answer, options: shuffle(q.options) };
}

export const GAME_SKILLS: GameSkill[] = [
  { id: "mult", label: "الضرب", subject: "math", gen: () => { const a = rint(2, 12), b = rint(2, 12); return numQ(`${ar(a)} × ${ar(b)}`, a * b); } },
  { id: "add", label: "الجمع", subject: "math", gen: () => { const a = rint(10, 99), b = rint(10, 99); return numQ(`${ar(a)} + ${ar(b)}`, a + b); } },
  { id: "sub", label: "الطرح", subject: "math", gen: () => { const a = rint(20, 99), b = rint(1, a - 1); return numQ(`${ar(a)} − ${ar(b)}`, a - b); } },
  { id: "div", label: "القسمة", subject: "math", gen: () => { const b = rint(2, 9), q = rint(2, 9); return numQ(`${ar(b * q)} ÷ ${ar(b)}`, q); } },
  {
    id: "prime", label: "الأعداد الأولية", subject: "math",
    gen: () => { const n = rint(2, 40); const a = isPrime(n) ? "أوليّ" : "غير أوليّ"; return { prompt: `هل ${ar(n)} عدد أوليّ؟`, answer: a, options: shuffle(["أوليّ", "غير أوليّ"]) }; },
  },
  { id: "science", label: "العلوم", subject: "science", gen: () => fromPool("science") },
  { id: "life", label: "المهارات", subject: "life-skills", gen: () => fromPool("life-skills") },
];

export function getSkill(id: string): GameSkill | null {
  if (id === "mixed") {
    return { id: "mixed", label: "منوّع", subject: "math", gen: () => GAME_SKILLS[Math.floor(Math.random() * GAME_SKILLS.length)].gen() };
  }
  return GAME_SKILLS.find((s) => s.id === id) ?? null;
}
