// Algebra engine — pure. Grade-5 book skill: العبارات الجبرية والمعادلات وترتيب
// العمليات.
import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface AlgebraScope { enabled: boolean; }
export type AlgebraLevelId = "evaluate" | "order" | "equation";
export interface AlgebraLevel { id: AlgebraLevelId; title: string; strategy: string; }
export interface AlgebraQuestion {
  answer: string; answerKind: "input"; options?: string[]; prompt: string; hint: string; speech: SpeechStep[];
}
type Rnd = () => number;
const LEVELS: AlgebraLevel[] = [
  { id: "evaluate", title: "تقييم العبارة الجبرية", strategy: "عوّض قيمة المتغيّر ثم احسب" },
  { id: "order", title: "ترتيب العمليات", strategy: "الضرب والقسمة قبل الجمع والطرح" },
  { id: "equation", title: "حل المعادلة", strategy: "اعكس العملية لإيجاد المجهول" },
];
export function availableLevels(scope: AlgebraScope): AlgebraLevel[] {
  return scope.enabled ? LEVELS : [];
}
function r(min: number, max: number, rnd: Rnd): number { return Math.floor(rnd() * (max - min + 1)) + min; }
export function generateQuestion(level: AlgebraLevel, _scope: AlgebraScope, rnd: Rnd = Math.random): AlgebraQuestion {
  if (level.id === "evaluate") {
    const x = r(2, 9, rnd), k = r(1, 9, rnd), m = r(2, 6, rnd);
    const ans = m * x + k;
    return { answer: String(ans), answerKind: "input",
      prompt: `إذا كان س = ${toArabicDigits(x)}، فما قيمة (${toArabicDigits(m)} × س + ${toArabicDigits(k)})؟`,
      hint: `عوّض س = ${toArabicDigits(x)}: ${toArabicDigits(m)} × ${toArabicDigits(x)} + ${toArabicDigits(k)} = ${toArabicDigits(ans)}.`,
      speech: [{ type: "number", value: ans }] };
  }
  if (level.id === "order") {
    const a = r(2, 9, rnd), b = r(2, 9, rnd), c = r(2, 9, rnd);
    const ans = a + b * c;
    return { answer: String(ans), answerKind: "input",
      prompt: `${toArabicDigits(a)} + ${toArabicDigits(b)} × ${toArabicDigits(c)} = ؟`,
      hint: `الضرب أولًا: ${toArabicDigits(b)} × ${toArabicDigits(c)} = ${toArabicDigits(b * c)}، ثم + ${toArabicDigits(a)} = ${toArabicDigits(ans)}.`,
      speech: [{ type: "number", value: ans }] };
  }
  const x = r(2, 12, rnd), k = r(1, 9, rnd);
  const sum = x + k;
  return { answer: String(x), answerKind: "input",
    prompt: `س + ${toArabicDigits(k)} = ${toArabicDigits(sum)} — ما قيمة س؟`,
    hint: `اطرح ${toArabicDigits(k)} من الطرفين: س = ${toArabicDigits(sum)} − ${toArabicDigits(k)} = ${toArabicDigits(x)}.`,
    speech: [{ type: "number", value: x }] };
}
