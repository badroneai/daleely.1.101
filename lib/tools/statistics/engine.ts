// Statistics & probability engine — pure. Grade-5 book skill: المتوسط الحسابي
// والوسيط والمدى، والاحتمال.
import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface StatisticsScope { enabled: boolean; }
export type StatisticsLevelId = "mean" | "median" | "probability";
export interface StatisticsLevel { id: StatisticsLevelId; title: string; strategy: string; }
export interface StatisticsQuestion {
  answer: string; answerKind: "input" | "choice"; options?: string[]; prompt: string; hint: string; speech: SpeechStep[];
}
type Rnd = () => number;
const LEVELS: StatisticsLevel[] = [
  { id: "mean", title: "المتوسط الحسابي", strategy: "اجمع القيم واقسم على عددها" },
  { id: "median", title: "الوسيط", strategy: "رتّب القيم وخذ القيمة الوسطى" },
  { id: "probability", title: "الاحتمال", strategy: "الاحتمال = المرغوب ÷ الكلّي" },
];
export function availableLevels(scope: StatisticsScope): StatisticsLevel[] {
  return scope.enabled ? LEVELS : [];
}
function r(min: number, max: number, rnd: Rnd): number { return Math.floor(rnd() * (max - min + 1)) + min; }
function arList(xs: number[]): string { return xs.map(toArabicDigits).join("، "); }
function shuffle<T>(a: T[], rnd: Rnd): T[] {
  const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x;
}
export function generateQuestion(level: StatisticsLevel, _scope: StatisticsScope, rnd: Rnd = Math.random): StatisticsQuestion {
  if (level.id === "mean") {
    const n = 3;
    const mean = r(3, 9, rnd);
    const a = r(1, mean, rnd), b = r(1, mean, rnd), c = 3 * mean - a - b; // ensures integer mean
    const xs = [a, b, c].filter((v) => v >= 0);
    const vals = xs.length === 3 ? xs : [mean, mean, mean];
    const sum = vals.reduce((s, v) => s + v, 0);
    return { answer: String(Math.round(sum / vals.length)), answerKind: "input",
      prompt: `ما المتوسط الحسابي للقيم: ${arList(vals)}؟`,
      hint: `اجمعها (${toArabicDigits(sum)}) واقسم على عددها (${toArabicDigits(vals.length)}) = ${toArabicDigits(Math.round(sum / vals.length))}.`,
      speech: [{ type: "number", value: Math.round(sum / vals.length) }] };
  }
  if (level.id === "median") {
    const vals = [r(1, 5, rnd), r(6, 10, rnd), r(11, 15, rnd)];
    const sorted = [...vals].sort((x, y) => x - y);
    const med = sorted[1];
    const shown = shuffle(vals, rnd);
    return { answer: String(med), answerKind: "input",
      prompt: `ما وسيط القيم: ${arList(shown)}؟`,
      hint: `رتّبها: ${arList(sorted)}، والقيمة الوسطى هي ${toArabicDigits(med)}.`,
      speech: [{ type: "number", value: med }] };
  }
  // probability — as a fraction (MC)
  const total = r(4, 8, rnd);
  const want = r(1, total - 1, rnd);
  const correct = `${toArabicDigits(want)}/${toArabicDigits(total)}`;
  const opts = new Set<string>([correct]);
  let guard = 0;
  while (opts.size < 4 && guard < 40) {
    guard++;
    const t = r(4, 8, rnd), w = r(1, t - 1, rnd);
    opts.add(`${toArabicDigits(w)}/${toArabicDigits(t)}`);
  }
  return { answer: correct, answerKind: "choice", options: shuffle(Array.from(opts), rnd),
    prompt: `كيس فيه ${toArabicDigits(total)} كرات، منها ${toArabicDigits(want)} حمراء. ما احتمال سحب كرة حمراء؟`,
    hint: `الاحتمال = عدد الحمراء ÷ العدد الكلّي = ${correct}.`,
    speech: [] };
}
