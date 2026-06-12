// Decimals engine — pure, framework-free. Grade-5 book skill: الكسور العشرية
// (الكسور الاعتيادية ↔ العشرية، مقارنة الكسور العشرية). Number of decimal places
// comes from the grade scope ({ places }) in CURRICULUM_MATRIX.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface DecimalsScope {
  places: number; // 1=أعشار, 2=أجزاء من مئة, 3=أجزاء من ألف
}

export type DecimalLevelId = "read" | "compare" | "convert";

export interface DecimalLevel {
  id: DecimalLevelId;
  title: string;
  strategy: string;
}

export interface DecimalQuestion {
  levelId: DecimalLevelId;
  answer: string;
  answerKind: "input" | "choice";
  options?: string[];
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const ALL_LEVELS: DecimalLevel[] = [
  { id: "read", title: "اقرأ الكسر العشري", strategy: "المقام يحدّد عدد المنازل العشرية" },
  { id: "compare", title: "مقارنة الكسور العشرية", strategy: "قارن المنازل من اليسار" },
  { id: "convert", title: "تحويل عشري ↔ اعتيادي", strategy: "أرقام ما بعد الفاصلة = البسط" },
];

export function availableLevels(_scope: DecimalsScope): DecimalLevel[] {
  return ALL_LEVELS;
}

const ARD = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function arStr(s: string): string {
  return s.split("").map((c) => (c >= "0" && c <= "9" ? ARD[Number(c)] : c)).join("");
}

/** Decimal label for num/denom, e.g. (7,10) -> "٠٫٧", (45,100) -> "٠٫٤٥". */
export function decimalLabel(num: number, denom: number): string {
  const places = String(denom).length - 1;
  const whole = Math.floor(num / denom);
  const frac = (num % denom).toString().padStart(places, "0");
  return `${toArabicDigits(whole)}٫${arStr(frac)}`;
}

function pick<T>(arr: T[], rnd: Rnd): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function denomsFor(places: number): number[] {
  const out: number[] = [];
  for (let p = 1; p <= Math.max(1, places); p++) out.push(Math.pow(10, p));
  return out;
}

function shuffle<T>(arr: T[], rnd: Rnd): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuestion(level: DecimalLevel, scope: DecimalsScope, rnd: Rnd = Math.random): DecimalQuestion {
  const denoms = denomsFor(scope.places);
  const denom = pick(denoms, rnd);
  const places = String(denom).length - 1;

  if (level.id === "read") {
    const num = Math.floor(rnd() * (denom - 1)) + 1; // 1..denom-1
    const correct = decimalLabel(num, denom);
    const opts = new Set<string>([correct]);
    let guard = 0;
    while (opts.size < 4 && guard < 40) {
      guard++;
      const d2 = pick(denoms, rnd);
      const n2 = Math.floor(rnd() * (d2 - 1)) + 1;
      opts.add(decimalLabel(n2, d2));
    }
    return {
      levelId: "read",
      answer: correct,
      answerKind: "choice",
      options: shuffle(Array.from(opts), rnd),
      prompt: `${toArabicDigits(num)}/${toArabicDigits(denom)} = ؟ (بالصورة العشرية)`,
      hint: `المقام ${toArabicDigits(denom)} يعني ${toArabicDigits(places)} ${places === 1 ? "منزلة عشرية" : "منازل عشرية"}؛ فالناتج ${correct}.`,
      speech: [],
    };
  }

  if (level.id === "compare") {
    let n1 = Math.floor(rnd() * (denom - 1)) + 1;
    let n2 = Math.floor(rnd() * (denom - 1)) + 1;
    let guard = 0;
    while (n1 === n2 && guard < 20) {
      n2 = Math.floor(rnd() * (denom - 1)) + 1;
      guard++;
    }
    const a = decimalLabel(n1, denom);
    const b = decimalLabel(n2, denom);
    const larger = n1 > n2 ? a : b;
    return {
      levelId: "compare",
      answer: larger,
      answerKind: "choice",
      options: shuffle([a, b], rnd),
      prompt: "أيّهما أكبر؟",
      hint: "عند تساوي عدد المنازل، الأكبر بسطًا أكبر قيمةً (قارن المنازل من اليسار).",
      speech: [],
    };
  }

  // convert: decimal -> numerator over its denom
  const num = Math.floor(rnd() * (denom - 1)) + 1;
  return {
    levelId: "convert",
    answer: String(num),
    answerKind: "input",
    prompt: `${decimalLabel(num, denom)} = (؟)/${toArabicDigits(denom)} — اكتب البسط`,
    hint: `الأرقام بعد الفاصلة هي البسط (${toArabicDigits(num)})، والمقام ${toArabicDigits(denom)} حسب عدد المنازل.`,
    speech: [{ type: "number", value: num }],
  };
}
