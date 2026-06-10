// Multiplication engine — pure, framework-free, unit-testable.
//
// Mirrors the official Saudi MoE textbook sequence (كتاب الطالب، الصف الثالث،
// الفصلان ٤ و٥): concept (repeated addition + arrays) → anchors ٢/٥/١٠ → ١ و٠
// and the commutative property → the remaining facts ٣/٤/٦/٧ → real-world
// problems. Every term used here is the term the child sees in the book
// (العامل، الناتج، شبكة، خاصية الإبدال، العدّ القفزي، جملة الضرب).

import type { SpeechStep } from "@/lib/audio/speak-sequence";

export type MultLevelKind = "concept" | "anchors" | "commutative" | "facts" | "word";

export interface MultLevel {
  id: string;
  title: string;
  /** The book strategy this level trains. */
  strategy: string;
  kind: MultLevelKind;
  /** When set, the level only applies if the grade scope intersects these tables. */
  requiresTables?: number[];
}

export const MULT_LEVELS: MultLevel[] = [
  { id: "concept", title: "مفهوم الضرب", strategy: "الجمع المتكرر والشبكة", kind: "concept" },
  { id: "anchors", title: "المرتكزات (٢، ٥، ١٠)", strategy: "العدّ القفزي", kind: "anchors", requiresTables: [2, 5, 10] },
  { id: "commutative", title: "الإبدال والواحد والصفر", strategy: "خاصية الإبدال", kind: "commutative" },
  { id: "facts", title: "بقية الحقائق (٣، ٤، ٦، ٧…)", strategy: "المضاعفة والنماذج", kind: "facts", requiresTables: [3, 4, 6, 7, 8, 9] },
  { id: "word", title: "مسائل واقعية", strategy: "أفهم ← أخطّط ← أحل ← أتحقق", kind: "word" },
];

export interface MultQuestion {
  levelId: string;
  a: number;
  b: number;
  answer: number;
  /** Arabic question text the learner reads. */
  prompt: string;
  /** Strategy explanation shown after answering (book terminology). */
  hint: string;
  /** Cancelable speech steps for the question. */
  speech: SpeechStep[];
}

type Rnd = () => number;

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** Convert a non-negative integer to Arabic-Indic digits. */
export function toArabicDigits(n: number): string {
  return String(n)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? AR_DIGITS[Number(c)] : c))
    .join("");
}

function pick<T>(arr: T[], rnd: Rnd): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function intersect(scope: number[], filter: number[]): number[] {
  return scope.filter((t) => filter.includes(t));
}

/** Levels that apply to a grade, given its allowed multiplication tables. */
export function availableLevels(scope: number[]): MultLevel[] {
  if (scope.length === 0) return [];
  return MULT_LEVELS.filter((lvl) =>
    lvl.requiresTables ? intersect(scope, lvl.requiresTables).length > 0 : true
  );
}

function skipCount(step: number, times: number): string {
  const seq: number[] = [];
  for (let i = 1; i <= times; i++) seq.push(step * i);
  return seq.map(toArabicDigits).join("، ");
}

const WORD_CONTEXTS = [
  (a: number, b: number) =>
    `في قطار مدينة الألعاب ${toArabicDigits(a)} عربات، في كل عربة ${toArabicDigits(b)} مقاعد. كم مقعدًا في القطار؟`,
  (a: number, b: number) =>
    `${toArabicDigits(a)} علب، في كل علبة ${toArabicDigits(b)} أقلام. كم قلمًا في العلب جميعها؟`,
  (a: number, b: number) =>
    `${toArabicDigits(a)} مجموعات، في كل مجموعة ${toArabicDigits(b)} طلاب. كم طالبًا في المجموعات؟`,
];

function numberFact(a: number, b: number, levelId: string): MultQuestion {
  const prompt = `${toArabicDigits(a)} × ${toArabicDigits(b)} = ؟`;
  return {
    levelId,
    a,
    b,
    answer: a * b,
    prompt,
    hint: "",
    speech: [
      { type: "number", value: a },
      { type: "operation", value: "multiply" },
      { type: "number", value: b },
    ],
  };
}

/** Generate one question for a level, constrained to the grade's allowed tables. */
export function generateQuestion(level: MultLevel, scope: number[], rnd: Rnd = Math.random): MultQuestion {
  const factor = () => Math.floor(rnd() * 10) + 1; // 1..10

  switch (level.kind) {
    case "concept": {
      const a = pick(scope, rnd);
      const b = factor();
      const repeated = Array.from({ length: a }, () => toArabicDigits(b)).join(" + ");
      return {
        levelId: level.id,
        a,
        b,
        answer: a * b,
        prompt: `شبكة فيها ${toArabicDigits(a)} صفوف، في كل صف ${toArabicDigits(b)} نقاط. اكتب جملة الضرب وأوجد الناتج.`,
        hint: `الجمع المتكرر: ${repeated} = ${toArabicDigits(a * b)}، وهي نفسها جملة الضرب ${toArabicDigits(a)} × ${toArabicDigits(b)}.`,
        speech: [
          { type: "number", value: a },
          { type: "operation", value: "multiply" },
          { type: "number", value: b },
        ],
      };
    }

    case "anchors": {
      const a = pick(intersect(scope, [2, 5, 10]), rnd);
      const b = factor();
      const q = numberFact(a, b, level.id);
      q.hint = `عُدّ قفزيًا بالـ${toArabicDigits(a)}: ${skipCount(a, b)}. آخر عدد هو الناتج ${toArabicDigits(a * b)}.`;
      return q;
    }

    case "commutative": {
      const roll = rnd();
      const a = pick(scope, rnd);
      if (roll < 0.25) {
        return {
          levelId: level.id,
          a,
          b: 1,
          answer: a,
          prompt: `${toArabicDigits(a)} × ١ = ؟`,
          hint: "الضرب في الواحد: الناتج هو العدد نفسه.",
          speech: [{ type: "number", value: a }, { type: "operation", value: "multiply" }, { type: "number", value: 1 }],
        };
      }
      if (roll < 0.4) {
        return {
          levelId: level.id,
          a,
          b: 0,
          answer: 0,
          prompt: `${toArabicDigits(a)} × ٠ = ؟`,
          hint: "الضرب في صفر: الناتج دائمًا صفر.",
          speech: [{ type: "number", value: a }, { type: "operation", value: "multiply" }, { type: "number", value: 0 }],
        };
      }
      const b = factor();
      return {
        levelId: level.id,
        a: b,
        b: a,
        answer: a * b,
        prompt: `تعرف أن ${toArabicDigits(a)} × ${toArabicDigits(b)} = ${toArabicDigits(a * b)}. بخاصية الإبدال، كم ${toArabicDigits(b)} × ${toArabicDigits(a)}؟`,
        hint: `خاصية الإبدال: قلب العاملين لا يغيّر الناتج، فالجواب ${toArabicDigits(a * b)}.`,
        speech: [{ type: "number", value: b }, { type: "operation", value: "multiply" }, { type: "number", value: a }],
      };
    }

    case "facts": {
      const a = pick(intersect(scope, [3, 4, 6, 7, 8, 9]), rnd);
      const b = factor();
      const q = numberFact(a, b, level.id);
      q.hint =
        a % 2 === 0
          ? `المضاعفة: ${toArabicDigits(a)} × ${toArabicDigits(b)} = ضِعف ${toArabicDigits(a / 2)} × ${toArabicDigits(b)} = ${toArabicDigits(a * b)}.`
          : `استعمل النماذج أو العدّ القفزي بالـ${toArabicDigits(a)}: آخر عدد هو ${toArabicDigits(a * b)}.`;
      return q;
    }

    case "word": {
      const a = pick(scope, rnd);
      const b = factor();
      const context = pick(WORD_CONTEXTS, rnd);
      return {
        levelId: level.id,
        a,
        b,
        answer: a * b,
        prompt: context(a, b),
        hint: `أفهم: مجموعات متساوية. أخطّط: ${toArabicDigits(a)} × ${toArabicDigits(b)}. أحل: ${toArabicDigits(a * b)}. أتحقق: بالجمع المتكرر.`,
        speech: [{ type: "number", value: a }, { type: "operation", value: "multiply" }, { type: "number", value: b }],
      };
    }
  }
}
