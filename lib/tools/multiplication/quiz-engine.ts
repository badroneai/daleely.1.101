// Multiplication-quiz engine — pure, framework-free.
//
// Tests the book skill "حقائق الضرب والقسمة المترابطة" (fact families): a mix of
// multiplication facts, division facts, and fact-family questions derived from a
// known product. Grade scope (tables + difficulty) comes from CURRICULUM_MATRIX.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "./engine";

export interface QuizScope {
  tables: number[];
  difficulty: "easy" | "medium" | "hard";
}

export type QuizKind = "mult" | "div" | "family";

export interface QuizQuestion {
  kind: QuizKind;
  a: number;
  b: number;
  answer: number;
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

function pick<T>(arr: T[], rnd: Rnd): T {
  return arr[Math.floor(rnd() * arr.length)];
}

// kind weights per difficulty: [mult, div, family]
const MIX: Record<QuizScope["difficulty"], [number, number, number]> = {
  easy: [0.7, 0.3, 0.0],
  medium: [0.45, 0.3, 0.25],
  hard: [0.3, 0.35, 0.35],
};

function chooseKind(difficulty: QuizScope["difficulty"], rnd: Rnd): QuizKind {
  const [m, d] = MIX[difficulty];
  const r = rnd();
  if (r < m) return "mult";
  if (r < m + d) return "div";
  return "family";
}

function generateOne(scope: QuizScope, rnd: Rnd): QuizQuestion {
  const t = pick(scope.tables, rnd);
  const maxB = scope.difficulty === "easy" ? 5 : 10;
  const b = Math.floor(rnd() * maxB) + 1;
  const p = t * b;
  const kind = chooseKind(scope.difficulty, rnd);

  if (kind === "mult") {
    return {
      kind,
      a: t,
      b,
      answer: p,
      prompt: `${toArabicDigits(t)} × ${toArabicDigits(b)} = ؟`,
      hint: `حقيقة ضرب: ${toArabicDigits(t)} × ${toArabicDigits(b)} = ${toArabicDigits(p)}.`,
      speech: [
        { type: "number", value: t },
        { type: "operation", value: "multiply" },
        { type: "number", value: b },
      ],
    };
  }

  if (kind === "div") {
    return {
      kind,
      a: p,
      b,
      answer: t,
      prompt: `${toArabicDigits(p)} ÷ ${toArabicDigits(b)} = ؟`,
      hint: `حقائق مترابطة: بما أن ${toArabicDigits(t)} × ${toArabicDigits(b)} = ${toArabicDigits(p)}، فإن ${toArabicDigits(p)} ÷ ${toArabicDigits(b)} = ${toArabicDigits(t)}.`,
      speech: [
        { type: "number", value: p },
        { type: "operation", value: "divide" },
        { type: "number", value: b },
      ],
    };
  }

  return {
    kind: "family",
    a: p,
    b: t,
    answer: b,
    prompt: `بما أن ${toArabicDigits(t)} × ${toArabicDigits(b)} = ${toArabicDigits(p)}، فإن ${toArabicDigits(p)} ÷ ${toArabicDigits(t)} = ؟`,
    hint: `عائلة الحقائق: من جملة الضرب الواحدة نستنتج جملتي قسمة مترابطتين (${toArabicDigits(p)} ÷ ${toArabicDigits(t)} = ${toArabicDigits(b)}).`,
    speech: [
      { type: "number", value: p },
      { type: "operation", value: "divide" },
      { type: "number", value: t },
    ],
  };
}

/** Build a quiz of `count` questions for the grade's scope. */
export function generateQuiz(scope: QuizScope, count: number, rnd: Rnd = Math.random): QuizQuestion[] {
  if (scope.tables.length === 0) return [];
  const out: QuizQuestion[] = [];
  let lastPrompt = "";
  let guard = 0;
  while (out.length < count && guard < count * 12) {
    guard++;
    const q = generateOne(scope, rnd);
    if (q.prompt === lastPrompt) continue; // avoid back-to-back duplicates
    lastPrompt = q.prompt;
    out.push(q);
  }
  return out;
}
