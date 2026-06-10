// Telling-time engine — pure, framework-free.
//
// Book skill: قراءة الساعة. Levels follow the grade scope flags in
// CURRICULUM_MATRIX (hourOnly / halfHour / quarterHour / minutes). Terminology is
// the book's: عقرب الساعات، عقرب الدقائق، النصف ساعة، الربع ساعة، العدّ بالخمسات.

import type { SpeechStep } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export interface TellingTimeScope {
  hourOnly: boolean;
  halfHour: boolean;
  quarterHour: boolean;
  minutes: boolean;
  twentyFourHour: boolean;
}

export type TimeLevelId = "hour" | "half" | "quarter" | "minutes";

export interface TimeLevel {
  id: TimeLevelId;
  title: string;
  strategy: string;
}

export interface TimeQuestion {
  levelId: TimeLevelId;
  h: number; // 1..12 (hour hand)
  m: number; // 0..55
  answer: string; // e.g. "٨:٣٠"
  options: string[]; // 4 unique choices incl. answer
  hint: string;
  speech: SpeechStep[];
}

type Rnd = () => number;

const ALL_LEVELS: TimeLevel[] = [
  { id: "hour", title: "الساعة التامة", strategy: "عقرب الدقائق على ١٢" },
  { id: "half", title: "النصف ساعة", strategy: "عقرب الدقائق على ٦" },
  { id: "quarter", title: "الربع ساعة", strategy: "عقرب الدقائق على ٣ أو ٩" },
  { id: "minutes", title: "الدقائق (العدّ بالخمسات)", strategy: "عُدّ بالخمسات حول الساعة" },
];

export function availableLevels(scope: TellingTimeScope): TimeLevel[] {
  return ALL_LEVELS.filter((lvl) => {
    if (lvl.id === "hour") return scope.hourOnly;
    if (lvl.id === "half") return scope.halfHour;
    if (lvl.id === "quarter") return scope.quarterHour;
    return scope.minutes;
  });
}

function minutesForLevel(id: TimeLevelId): number[] {
  if (id === "hour") return [0];
  if (id === "half") return [0, 30];
  if (id === "quarter") return [0, 15, 30, 45];
  return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
}

export function formatTime(h: number, m: number): string {
  return `${toArabicDigits(h)}:${m === 0 ? "٠٠" : toArabicDigits(m).padStart(2, "٠")}`;
}

function pick<T>(arr: T[], rnd: Rnd): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function buildOptions(h: number, m: number, level: TimeLevelId, rnd: Rnd): string[] {
  const correct = formatTime(h, m);
  const opts = new Set<string>([correct]);
  const mins = minutesForLevel(level === "hour" ? "quarter" : level);
  let guard = 0;
  while (opts.size < 4 && guard < 40) {
    guard++;
    const dh = rnd() < 0.5 ? h : ((h - 1 + (rnd() < 0.5 ? 1 : 11)) % 12) + 1;
    const dm = pick(mins, rnd);
    opts.add(formatTime(dh, dm));
  }
  const arr = Array.from(opts);
  // shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuestion(level: TimeLevel, _scope: TellingTimeScope, rnd: Rnd = Math.random): TimeQuestion {
  const h = Math.floor(rnd() * 12) + 1;
  const m = pick(minutesForLevel(level.id), rnd);

  let hint: string;
  if (m === 0) hint = `عقرب الساعات (القصير) عند ${toArabicDigits(h)}، وعقرب الدقائق (الطويل) على ١٢ — أي الساعة تامة.`;
  else if (m === 30) hint = `عقرب الدقائق على ٦ يعني النصف ساعة (٣٠ دقيقة)، وعقرب الساعات بين ${toArabicDigits(h)} و${toArabicDigits((h % 12) + 1)}.`;
  else if (m === 15) hint = "عقرب الدقائق على ٣ يعني الربع ساعة (١٥ دقيقة).";
  else if (m === 45) hint = "عقرب الدقائق على ٩ يعني ثلاثة أرباع الساعة (٤٥ دقيقة).";
  else hint = `عُدّ بالخمسات من ١٢: كل رقم = ٥ دقائق، حتى يشير عقرب الدقائق إلى ${toArabicDigits(m)}.`;

  const speech: SpeechStep[] = m === 0 ? [{ type: "number", value: h }] : [{ type: "number", value: h }, { type: "pause", ms: 200 }, { type: "number", value: m }];

  return {
    levelId: level.id,
    h,
    m,
    answer: formatTime(h, m),
    options: buildOptions(h, m, level.id, rnd),
    hint,
    speech,
  };
}
