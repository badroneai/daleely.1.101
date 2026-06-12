// Perimeter / area / volume engine — pure. Grade-5 book skill: المحيط والمساحة
// والحجم.
import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface PavScope { enabled: boolean; }
export type PavLevelId = "perimeter" | "area" | "volume";
export interface PavLevel { id: PavLevelId; title: string; strategy: string; }
export interface PavQuestion {
  answer: string; answerKind: "input"; options?: string[]; prompt: string; hint: string; speech: SpeechStep[];
}
type Rnd = () => number;
const LEVELS: PavLevel[] = [
  { id: "perimeter", title: "محيط المستطيل", strategy: "المحيط = ٢ × (الطول + العرض)" },
  { id: "area", title: "مساحة المستطيل", strategy: "المساحة = الطول × العرض" },
  { id: "volume", title: "حجم المنشور", strategy: "الحجم = الطول × العرض × الارتفاع" },
];
export function availableLevels(scope: PavScope): PavLevel[] {
  return scope.enabled ? LEVELS : [];
}
function r(min: number, max: number, rnd: Rnd): number { return Math.floor(rnd() * (max - min + 1)) + min; }
export function generateQuestion(level: PavLevel, _scope: PavScope, rnd: Rnd = Math.random): PavQuestion {
  const l = r(2, 12, rnd), w = r(2, 9, rnd);
  if (level.id === "perimeter") {
    const ans = 2 * (l + w);
    return { answer: String(ans), answerKind: "input",
      prompt: `مستطيل طوله ${toArabicDigits(l)} وعرضه ${toArabicDigits(w)}. ما محيطه؟`,
      hint: `المحيط = ٢ × (${toArabicDigits(l)} + ${toArabicDigits(w)}) = ${toArabicDigits(ans)}.`,
      speech: [{ type: "number", value: ans }] };
  }
  if (level.id === "area") {
    const ans = l * w;
    return { answer: String(ans), answerKind: "input",
      prompt: `مستطيل طوله ${toArabicDigits(l)} وعرضه ${toArabicDigits(w)}. ما مساحته؟`,
      hint: `المساحة = ${toArabicDigits(l)} × ${toArabicDigits(w)} = ${toArabicDigits(ans)} وحدة مربعة.`,
      speech: [{ type: "number", value: ans }] };
  }
  const h = r(2, 6, rnd);
  const ans = l * w * h;
  return { answer: String(ans), answerKind: "input",
    prompt: `منشور أبعاده ${toArabicDigits(l)} و${toArabicDigits(w)} و${toArabicDigits(h)}. ما حجمه؟`,
    hint: `الحجم = ${toArabicDigits(l)} × ${toArabicDigits(w)} × ${toArabicDigits(h)} = ${toArabicDigits(ans)} وحدة مكعبة.`,
    speech: [{ type: "number", value: ans }] };
}
