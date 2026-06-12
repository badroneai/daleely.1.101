// Fraction-operations engine — pure. Grade 5 book skills: جمع/طرح الكسور
// المتشابهة، تبسيط الكسور، الكسور المتكافئة. Denominators from the grade scope.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface FractionOpsScope {
  dens: number[];
}

export type FractionOpLevelId = "add" | "subtract" | "simplify";

export interface FractionOpLevel {
  id: FractionOpLevelId;
  title: string;
  strategy: string;
}

export interface FractionOpQuestion {
  levelId: FractionOpLevelId;
  answer: string;
  answerKind: "input" | "choice";
  options?: string[];
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const ALL_LEVELS: FractionOpLevel[] = [
  { id: "add", title: "جمع الكسور المتشابهة", strategy: "اجمع البسطين والمقام يبقى" },
  { id: "subtract", title: "طرح الكسور المتشابهة", strategy: "اطرح البسطين والمقام يبقى" },
  { id: "simplify", title: "تبسيط الكسور", strategy: "اقسم البسط والمقام على قاسمهما المشترك" },
];

export function availableLevels(scope: FractionOpsScope): FractionOpLevel[] {
  return scope.dens.length === 0 ? [] : ALL_LEVELS;
}

function pick<T>(arr: T[], rnd: Rnd): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}

function shuffle<T>(arr: T[], rnd: Rnd): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function frac(n: number, d: number): string {
  return `${toArabicDigits(n)}/${toArabicDigits(d)}`;
}

export function generateQuestion(level: FractionOpLevel, scope: FractionOpsScope, rnd: Rnd = Math.random): FractionOpQuestion {
  const den = pick(scope.dens, rnd);

  if (level.id === "add") {
    const a = Math.floor(rnd() * (den - 2)) + 1; // 1..den-2
    const b = Math.floor(rnd() * (den - a - 1)) + 1; // keep a+b < den
    return {
      levelId: "add",
      answer: String(a + b),
      answerKind: "input",
      prompt: `${frac(a, den)} + ${frac(b, den)} = (؟)/${toArabicDigits(den)} — اكتب البسط`,
      hint: `الكسور متشابهة (المقام نفسه)، فاجمع البسطين: ${toArabicDigits(a)} + ${toArabicDigits(b)} = ${toArabicDigits(a + b)}.`,
      speech: [{ type: "number", value: a + b }],
    };
  }

  if (level.id === "subtract") {
    let a = Math.floor(rnd() * (den - 1)) + 1;
    let b = Math.floor(rnd() * (den - 1)) + 1;
    if (a < b) [a, b] = [b, a];
    if (a === b) a = Math.min(den - 1, a + 1);
    return {
      levelId: "subtract",
      answer: String(a - b),
      answerKind: "input",
      prompt: `${frac(a, den)} − ${frac(b, den)} = (؟)/${toArabicDigits(den)} — اكتب البسط`,
      hint: `المقام نفسه، فاطرح البسطين: ${toArabicDigits(a)} − ${toArabicDigits(b)} = ${toArabicDigits(a - b)}.`,
      speech: [{ type: "number", value: a - b }],
    };
  }

  // simplify — choose a reducible fraction, ask for the simplest form (MC)
  let n = Math.floor(rnd() * (den - 1)) + 1;
  let g = gcd(n, den);
  let guard = 0;
  while (g === 1 && guard < 20) {
    n = Math.floor(rnd() * (den - 1)) + 1;
    g = gcd(n, den);
    guard++;
  }
  const simplest = frac(n / g, den / g);
  const opts = new Set<string>([simplest]);
  let guard2 = 0;
  while (opts.size < 4 && guard2 < 40) {
    guard2++;
    const dd = pick(scope.dens, rnd);
    const nn = Math.floor(rnd() * (dd - 1)) + 1;
    opts.add(frac(nn, dd));
  }
  return {
    levelId: "simplify",
    answer: simplest,
    answerKind: "choice",
    options: shuffle(Array.from(opts), rnd),
    prompt: `بسّط الكسر ${frac(n, den)} إلى أبسط صورة.`,
    hint: `اقسم البسط والمقام على قاسمهما المشترك الأكبر (${toArabicDigits(g)}): ${simplest}.`,
    speech: [],
  };
}
