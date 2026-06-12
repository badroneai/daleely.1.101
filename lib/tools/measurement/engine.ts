// Measurement engine — pure. Grade-5 book skill: وحدات القياس (الطول/الكتلة/السعة)
// في المنظومة المترية.
import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface MeasurementScope { enabled: boolean; }
export type MeasurementLevelId = "length" | "mass" | "capacity";
export interface MeasurementLevel { id: MeasurementLevelId; title: string; strategy: string; }
export interface MeasurementQuestion {
  answer: string; answerKind: "input"; options?: string[]; prompt: string; hint: string; speech: SpeechStep[];
}

type Rnd = () => number;
const LEVELS: MeasurementLevel[] = [
  { id: "length", title: "وحدات الطول", strategy: "المتر = ١٠٠ سم، الكيلومتر = ١٠٠٠ م" },
  { id: "mass", title: "وحدات الكتلة", strategy: "الكيلوغرام = ١٠٠٠ غرام" },
  { id: "capacity", title: "وحدات السعة", strategy: "اللتر = ١٠٠٠ مليلتر" },
];
export function availableLevels(scope: MeasurementScope): MeasurementLevel[] {
  return scope.enabled ? LEVELS : [];
}
const CONV: Record<MeasurementLevelId, { big: string; small: string; factor: number }[]> = {
  length: [
    { big: "متر", small: "سنتيمتر", factor: 100 },
    { big: "كيلومتر", small: "متر", factor: 1000 },
  ],
  mass: [{ big: "كيلوغرام", small: "غرام", factor: 1000 }],
  capacity: [{ big: "لتر", small: "مليلتر", factor: 1000 }],
};
export function generateQuestion(level: MeasurementLevel, _scope: MeasurementScope, rnd: Rnd = Math.random): MeasurementQuestion {
  const pairs = CONV[level.id];
  const pair = pairs[Math.floor(rnd() * pairs.length)];
  const value = Math.floor(rnd() * 8) + 2; // 2..9
  const result = value * pair.factor;
  return {
    answer: String(result),
    answerKind: "input",
    prompt: `${toArabicDigits(value)} ${pair.big} = ؟ ${pair.small}`,
    hint: `كل ${pair.big} = ${toArabicDigits(pair.factor)} ${pair.small}، فاضرب: ${toArabicDigits(value)} × ${toArabicDigits(pair.factor)} = ${toArabicDigits(result)}.`,
    speech: [{ type: "number", value: result }],
  };
}
