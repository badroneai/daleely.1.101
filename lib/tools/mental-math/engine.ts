// Mental-math (addition & subtraction) engine — pure, framework-free.
//
// Book skill: الجمع والطرح مع إعادة التجميع + التقدير. Levels and number ranges
// follow the grade scope from CURRICULUM_MATRIX ({ maxNumber, withCarry }).
// Terminology matches the textbook: إعادة التجميع (regrouping/borrowing), التقدير
// (estimation by rounding to the nearest ten).

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface MentalMathScope {
  maxNumber: number;
  withCarry: boolean;
}

export type MentalMathLevelId = "add" | "subtract" | "estimate";

export interface MentalMathLevel {
  id: MentalMathLevelId;
  title: string;
  strategy: string;
}

export interface MentalMathQuestion {
  levelId: MentalMathLevelId;
  a: number;
  b: number;
  answer: number;
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const ALL_LEVELS: MentalMathLevel[] = [
  { id: "add", title: "الجمع", strategy: "إعادة التجميع (الحمل)" },
  { id: "subtract", title: "الطرح", strategy: "إعادة التجميع (الاستلاف)" },
  { id: "estimate", title: "التقدير", strategy: "التقريب لأقرب عشرة" },
];

/** Levels available for a grade: estimation needs at least 2-digit numbers. */
export function availableLevels(scope: MentalMathScope): MentalMathLevel[] {
  return ALL_LEVELS.filter((lvl) => (lvl.id === "estimate" ? scope.maxNumber >= 100 : scope.maxNumber > 0));
}

function randInt(min: number, max: number, rnd: Rnd): number {
  return Math.floor(rnd() * (max - min + 1)) + min;
}

function roundTen(n: number): number {
  return Math.round(n / 10) * 10;
}

function hasCarry(a: number, b: number): boolean {
  return (a % 10) + (b % 10) > 9;
}

function hasBorrow(a: number, b: number): boolean {
  return a % 10 < b % 10;
}

export function generateQuestion(
  level: MentalMathLevel,
  scope: MentalMathScope,
  rnd: Rnd = Math.random
): MentalMathQuestion {
  const max = scope.maxNumber;
  const lo = max <= 20 ? 1 : 10;

  if (level.id === "estimate") {
    const a = randInt(20, max, rnd);
    const b = randInt(20, max, rnd);
    const ra = roundTen(a);
    const rb = roundTen(b);
    return {
      levelId: "estimate",
      a,
      b,
      answer: ra + rb,
      prompt: `قدّر ناتج ${toArabicDigits(a)} + ${toArabicDigits(b)} بتقريب كل عدد لأقرب عشرة.`,
      hint: `قرّب: ${toArabicDigits(a)} ← ${toArabicDigits(ra)}، ${toArabicDigits(b)} ← ${toArabicDigits(rb)}. الناتج التقريبي ${toArabicDigits(ra + rb)}.`,
      speech: [
        { type: "number", value: a },
        { type: "operation", value: "add" },
        { type: "number", value: b },
      ],
    };
  }

  // add / subtract with a guard loop to honor the withCarry constraint
  let a = 0;
  let b = 0;
  for (let i = 0; i < 40; i++) {
    a = randInt(lo, max, rnd);
    b = randInt(lo, max, rnd);
    if (level.id === "subtract" && a < b) [a, b] = [b, a];
    const conflict =
      !scope.withCarry &&
      (level.id === "add" ? hasCarry(a, b) : hasBorrow(a, b));
    if (!conflict) break;
  }

  if (level.id === "add") {
    const carry = hasCarry(a, b);
    return {
      levelId: "add",
      a,
      b,
      answer: a + b,
      prompt: `${toArabicDigits(a)} + ${toArabicDigits(b)} = ؟`,
      hint: carry
        ? "اجمع الآحاد أولًا؛ إذا تجاوز الناتج ٩ احمل ١ إلى خانة العشرات (إعادة التجميع)."
        : "اجمع الآحاد ثم العشرات — لا حاجة لإعادة التجميع هنا.",
      speech: [
        { type: "number", value: a },
        { type: "operation", value: "add" },
        { type: "number", value: b },
      ],
    };
  }

  const borrow = hasBorrow(a, b);
  return {
    levelId: "subtract",
    a,
    b,
    answer: a - b,
    prompt: `${toArabicDigits(a)} − ${toArabicDigits(b)} = ؟`,
    hint: borrow
      ? "إذا كان رقم الآحاد في الأعلى أصغر، استلف ١٠ من خانة العشرات (إعادة التجميع)."
      : "اطرح الآحاد ثم العشرات — لا حاجة للاستلاف هنا.",
    speech: [
      { type: "number", value: a },
      { type: "operation", value: "subtract" },
      { type: "number", value: b },
    ],
  };
}
