// Place-value engine — pure, framework-free.
//
// Book skill: القيمة المنزلية (الآحاد، العشرات، المئات، الألوف…). Number size
// follows the grade scope ({ digits }) from CURRICULUM_MATRIX. Levels: قيمة الرقم
// (value of a digit in a place), تكوين العدد (build from place parts), المقارنة.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface PlaceValueScope {
  digits: number;
}

export type PlaceValueLevelId = "value" | "build" | "compare";

export interface PlaceValueLevel {
  id: PlaceValueLevelId;
  title: string;
  strategy: string;
}

export interface PlaceValueQuestion {
  levelId: PlaceValueLevelId;
  answer: number;
  prompt: string;
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const PLACE_NAMES = ["الآحاد", "العشرات", "المئات", "الألوف", "عشرات الألوف"];

const ALL_LEVELS: PlaceValueLevel[] = [
  { id: "value", title: "قيمة الرقم", strategy: "القيمة المنزلية تدل على قيمة كل رقم" },
  { id: "build", title: "تكوين العدد", strategy: "اجمع قيم المنازل" },
  { id: "compare", title: "المقارنة", strategy: "قارن من أكبر منزلة" },
];

export function availableLevels(_scope: PlaceValueScope): PlaceValueLevel[] {
  return ALL_LEVELS;
}

function randDigits(digits: number, rnd: Rnd): number {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(rnd() * (max - min + 1)) + min;
}

function digitAtPlace(n: number, place: number): number {
  return Math.floor(n / Math.pow(10, place)) % 10;
}

export function generateQuestion(
  level: PlaceValueLevel,
  scope: PlaceValueScope,
  rnd: Rnd = Math.random
): PlaceValueQuestion {
  const digits = Math.max(2, scope.digits);

  if (level.id === "value") {
    const n = randDigits(digits, rnd);
    const place = Math.floor(rnd() * digits); // 0..digits-1
    const d = digitAtPlace(n, place);
    const placeValue = d * Math.pow(10, place);
    return {
      levelId: "value",
      answer: placeValue,
      prompt: `في العدد ${toArabicDigits(n)}، ما قيمة رقم ${PLACE_NAMES[place]}؟`,
      hint: `رقم ${PLACE_NAMES[place]} هو ${toArabicDigits(d)}، وقيمته ${toArabicDigits(d)} × ${toArabicDigits(Math.pow(10, place))} = ${toArabicDigits(placeValue)}.`,
      speech: [{ type: "number", value: placeValue }],
    };
  }

  if (level.id === "build") {
    const n = randDigits(digits, rnd);
    const parts: string[] = [];
    for (let place = digits - 1; place >= 0; place--) {
      const d = digitAtPlace(n, place);
      parts.push(`${toArabicDigits(d)} ${PLACE_NAMES[place]}`);
    }
    return {
      levelId: "build",
      answer: n,
      prompt: `كوّن العدد: ${parts.join(" و")}.`,
      hint: `اجمع قيم المنازل لتحصل على ${toArabicDigits(n)}.`,
      speech: [{ type: "number", value: n }],
    };
  }

  // compare — answer is the larger number
  let a = randDigits(digits, rnd);
  let b = randDigits(digits, rnd);
  let guard = 0;
  while (a === b && guard < 20) {
    b = randDigits(digits, rnd);
    guard++;
  }
  const larger = Math.max(a, b);
  return {
    levelId: "compare",
    answer: larger,
    prompt: `أيّهما أكبر: ${toArabicDigits(a)} أم ${toArabicDigits(b)}؟ اكتب العدد الأكبر.`,
    hint: "قارن من اليسار (أكبر منزلة): أول منزلة يختلف فيها الرقمان تحدّد العدد الأكبر.",
    speech: [{ type: "number", value: larger }],
  };
}
