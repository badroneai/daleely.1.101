// Geometry engine — pure. Grade-5 book skill: الأشكال الرباعية، الزوايا،
// المستوى الإحداثي.
import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface GeometryScope { enabled: boolean; }
export type GeometryLevelId = "shape" | "angle" | "coordinates";
export interface GeometryLevel { id: GeometryLevelId; title: string; strategy: string; }
export interface GeometryQuestion {
  answer: string; answerKind: "input" | "choice"; options?: string[]; prompt: string; hint: string; speech: SpeechStep[];
}
type Rnd = () => number;
const LEVELS: GeometryLevel[] = [
  { id: "shape", title: "الأشكال الرباعية", strategy: "عرّف الشكل من خصائص أضلاعه وزواياه" },
  { id: "angle", title: "الزوايا", strategy: "القائمة ٩٠°، الحادة أصغر، المنفرجة أكبر" },
  { id: "coordinates", title: "المستوى الإحداثي", strategy: "(السيني، الصادي)" },
];
export function availableLevels(scope: GeometryScope): GeometryLevel[] {
  return scope.enabled ? LEVELS : [];
}
function r(min: number, max: number, rnd: Rnd): number { return Math.floor(rnd() * (max - min + 1)) + min; }
function pick<T>(a: T[], rnd: Rnd): T { return a[Math.floor(rnd() * a.length)]; }
function shuffle<T>(a: T[], rnd: Rnd): T[] {
  const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x;
}
export function generateQuestion(level: GeometryLevel, _scope: GeometryScope, rnd: Rnd = Math.random): GeometryQuestion {
  if (level.id === "shape") {
    const shapes = [
      { name: "المربع", desc: "أضلاعه الأربعة متساوية وزواياه قائمة" },
      { name: "المستطيل", desc: "كل ضلعين متقابلين متساويان وزواياه قائمة" },
      { name: "المعيّن", desc: "أضلاعه الأربعة متساوية وزواياه غير قائمة" },
      { name: "شبه المنحرف", desc: "له ضلعان متوازيان فقط" },
    ];
    const target = pick(shapes, rnd);
    return { answer: target.name, answerKind: "choice", options: shuffle(shapes.map((s) => s.name), rnd),
      prompt: `أيُّ شكل ${target.desc}؟`,
      hint: `الوصف ينطبق على ${target.name}.`, speech: [] };
  }
  if (level.id === "angle") {
    const kinds = [
      { name: "زاوية قائمة", lo: 90, hi: 90 },
      { name: "زاوية حادة", lo: 20, hi: 80 },
      { name: "زاوية منفرجة", lo: 100, hi: 160 },
    ];
    const k = pick(kinds, rnd);
    const deg = k.lo === k.hi ? k.lo : r(k.lo, k.hi, rnd);
    return { answer: k.name, answerKind: "choice", options: shuffle(kinds.map((x) => x.name), rnd),
      prompt: `زاوية قياسها ${toArabicDigits(deg)}° — ما نوعها؟`,
      hint: `القائمة = ٩٠°، الحادة أصغر من ٩٠°، المنفرجة أكبر من ٩٠°.`, speech: [] };
  }
  const x = r(1, 9, rnd), y = r(1, 9, rnd);
  const askX = rnd() < 0.5;
  return { answer: String(askX ? x : y), answerKind: "input",
    prompt: `النقطة (${toArabicDigits(x)}، ${toArabicDigits(y)}) — ما ${askX ? "الإحداثي السيني (الأول)" : "الإحداثي الصادي (الثاني)"}؟`,
    hint: `الإحداثي ${askX ? "السيني هو الأول" : "الصادي هو الثاني"} = ${toArabicDigits(askX ? x : y)}.`,
    speech: [{ type: "number", value: askX ? x : y }] };
}
