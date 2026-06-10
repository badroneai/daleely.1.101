// Fractions engine — pure, framework-free.
//
// Book skill: الكسور (الأجزاء المتكافئة، البسط، المقام، الكسر الذي يمثّل الجزء
// الملوّن، مقارنة الكسور). Denominators come from the grade scope ({ dens }) in
// CURRICULUM_MATRIX.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface FractionsScope {
  dens: number[];
}

export type FractionLevelId = "represent" | "parts" | "compare";

export interface FractionLevel {
  id: FractionLevelId;
  title: string;
  strategy: string;
}

export interface Fraction {
  num: number;
  den: number;
}

export interface FractionQuestion {
  levelId: FractionLevelId;
  /** For "represent": the shape to draw (den parts, num shaded). */
  shape?: Fraction;
  /** Numeric answer ("parts") or the option string ("represent"/"compare"). */
  answer: string;
  answerKind: "input" | "choice";
  options?: string[];
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const ALL_LEVELS: FractionLevel[] = [
  { id: "represent", title: "تمثيل الكسر", strategy: "الجزء الملوّن من الأجزاء المتكافئة" },
  { id: "parts", title: "البسط والمقام", strategy: "البسط فوق الخط، المقام تحته" },
  { id: "compare", title: "مقارنة الكسور", strategy: "بالمقام نفسه: الأكبر بسطًا أكبر" },
];

export function fractionLabel(f: Fraction): string {
  return `${toArabicDigits(f.num)}/${toArabicDigits(f.den)}`;
}

export function availableLevels(scope: FractionsScope): FractionLevel[] {
  return scope.dens.length === 0 ? [] : ALL_LEVELS;
}

function pick<T>(arr: T[], rnd: Rnd): T {
  return arr[Math.floor(rnd() * arr.length)];
}

export function generateQuestion(level: FractionLevel, scope: FractionsScope, rnd: Rnd = Math.random): FractionQuestion {
  const den = pick(scope.dens, rnd);

  if (level.id === "represent") {
    const num = Math.floor(rnd() * (den - 1)) + 1; // 1..den-1
    const correct = fractionLabel({ num, den });
    const opts = new Set<string>([correct]);
    let guard = 0;
    while (opts.size < 4 && guard < 40) {
      guard++;
      const dn = rnd() < 0.5 ? den : pick(scope.dens, rnd);
      const nn = Math.floor(rnd() * (dn - 1)) + 1;
      opts.add(fractionLabel({ num: nn, den: dn }));
    }
    const options = Array.from(opts);
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return {
      levelId: "represent",
      shape: { num, den },
      answer: correct,
      answerKind: "choice",
      options,
      prompt: "ما الكسر الذي يمثّل الجزء الملوّن؟",
      hint: `عدد الأجزاء الملوّنة هو البسط (${toArabicDigits(num)})، وعدد كل الأجزاء المتكافئة هو المقام (${toArabicDigits(den)}).`,
      speech: [{ type: "number", value: num }, { type: "pause", ms: 150 }, { type: "number", value: den }],
    };
  }

  if (level.id === "parts") {
    const num = Math.floor(rnd() * (den - 1)) + 1;
    const askNum = rnd() < 0.5;
    return {
      levelId: "parts",
      answer: String(askNum ? num : den),
      answerKind: "input",
      prompt: `في الكسر ${fractionLabel({ num, den })}، ما ${askNum ? "البسط" : "المقام"}؟`,
      hint: askNum
        ? `البسط هو الرقم الأعلى (فوق الخط) = ${toArabicDigits(num)}.`
        : `المقام هو الرقم الأسفل (تحت الخط) = ${toArabicDigits(den)}.`,
      speech: [{ type: "number", value: askNum ? num : den }],
    };
  }

  // compare — same denominator, the larger numerator is the larger fraction
  let n1 = Math.floor(rnd() * (den - 1)) + 1;
  let n2 = Math.floor(rnd() * (den - 1)) + 1;
  let guard = 0;
  while (n1 === n2 && guard < 20) {
    n2 = Math.floor(rnd() * (den - 1)) + 1;
    guard++;
  }
  const f1 = { num: n1, den };
  const f2 = { num: n2, den };
  const larger = n1 > n2 ? f1 : f2;
  return {
    levelId: "compare",
    answer: fractionLabel(larger),
    answerKind: "choice",
    options: rnd() < 0.5 ? [fractionLabel(f1), fractionLabel(f2)] : [fractionLabel(f2), fractionLabel(f1)],
    prompt: `أيّهما أكبر؟`,
    hint: "عند تساوي المقام، الكسر ذو البسط الأكبر هو الأكبر (أجزاء ملوّنة أكثر).",
    speech: [],
  };
}
