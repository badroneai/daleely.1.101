// Number-theory engine — pure. Grade-5 book skills: القواسم المشتركة، الأعداد
// الأولية وغير الأولية، المضاعفات المشتركة. Number range from the grade scope.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface NumberTheoryScope {
  max: number; // largest base number used (0 = unavailable)
}

export type NumberTheoryLevelId = "factor" | "prime" | "gcf";

export interface NumberTheoryLevel {
  id: NumberTheoryLevelId;
  title: string;
  strategy: string;
}

export interface NumberTheoryQuestion {
  levelId: NumberTheoryLevelId;
  answer: string;
  answerKind: "input" | "choice";
  options?: string[];
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const ALL_LEVELS: NumberTheoryLevel[] = [
  { id: "factor", title: "القواسم", strategy: "القاسم يقسم العدد دون باقٍ" },
  { id: "prime", title: "الأعداد الأولية", strategy: "الأوليّ قاسماه ١ ونفسه فقط" },
  { id: "gcf", title: "القاسم المشترك الأكبر", strategy: "أكبر عدد يقسم العددين معًا" },
];

export function availableLevels(scope: NumberTheoryScope): NumberTheoryLevel[] {
  return scope.max <= 0 ? [] : ALL_LEVELS;
}

function randInt(min: number, max: number, rnd: Rnd): number {
  return Math.floor(rnd() * (max - min + 1)) + min;
}
function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}
function divisors(n: number): number[] {
  const out: number[] = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) out.push(i);
  return out;
}
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
function shuffle<T>(arr: T[], rnd: Rnd): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuestion(level: NumberTheoryLevel, scope: NumberTheoryScope, rnd: Rnd = Math.random): NumberTheoryQuestion {
  const max = Math.max(12, scope.max);

  if (level.id === "factor") {
    const n = randInt(6, max, rnd);
    const facs = divisors(n).filter((d) => d > 1 && d < n);
    const correct = facs.length ? facs[Math.floor(rnd() * facs.length)] : 2;
    const opts = new Set<number>([correct]);
    let guard = 0;
    while (opts.size < 4 && guard < 60) {
      guard++;
      const cand = randInt(2, n - 1, rnd);
      if (n % cand !== 0) opts.add(cand);
    }
    return {
      levelId: "factor",
      answer: toArabicDigits(correct),
      answerKind: "choice",
      options: shuffle(Array.from(opts).map(toArabicDigits), rnd),
      prompt: `أيُّ عدد يقسم ${toArabicDigits(n)} دون باقٍ؟`,
      hint: `${toArabicDigits(correct)} يقسم ${toArabicDigits(n)} تمامًا (${toArabicDigits(n)} ÷ ${toArabicDigits(correct)} = ${toArabicDigits(n / correct)}).`,
      speech: [],
    };
  }

  if (level.id === "prime") {
    const n = randInt(2, Math.min(max, 50), rnd);
    const prime = isPrime(n);
    return {
      levelId: "prime",
      answer: prime ? "عدد أوليّ" : "عدد غير أوليّ",
      answerKind: "choice",
      options: rnd() < 0.5 ? ["عدد أوليّ", "عدد غير أوليّ"] : ["عدد غير أوليّ", "عدد أوليّ"],
      prompt: `هل العدد ${toArabicDigits(n)} أوليّ؟`,
      hint: prime
        ? `${toArabicDigits(n)} عدد أوليّ: قاسماه الوحيدان ١ و${toArabicDigits(n)}.`
        : `${toArabicDigits(n)} غير أوليّ: له قاسم آخر غير ١ ونفسه.`,
      speech: [],
    };
  }

  // gcf
  const a = randInt(6, max, rnd);
  const b = randInt(6, max, rnd);
  const g = gcd(a, b);
  return {
    levelId: "gcf",
    answer: String(g),
    answerKind: "input",
    prompt: `ما القاسم المشترك الأكبر للعددين ${toArabicDigits(a)} و${toArabicDigits(b)}؟`,
    hint: `أكبر عدد يقسم ${toArabicDigits(a)} و${toArabicDigits(b)} معًا هو ${toArabicDigits(g)}.`,
    speech: [{ type: "number", value: g }],
  };
}
