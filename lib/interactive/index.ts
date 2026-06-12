// Hands-on interactive practice — visual, manipulative tasks GENERATED from our
// math skills (no authored content, no AI). Infinite and varied: number line,
// build-the-number (base ten), shade-the-fraction, fill-the-blank.

export type InteractiveTask =
  | { kind: "fill"; prompt: string; answer: number }
  | { kind: "line"; max: number; step: number; target: number }
  | { kind: "build"; target: number; digits: number }
  | { kind: "fraction"; num: number; den: number };

export interface InteractiveSkill {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  gen: () => InteractiveTask;
}

function rint(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

function genFill(): InteractiveTask {
  const op = pick(["×", "+", "−"]);
  if (op === "×") { const a = rint(2, 12), b = rint(2, 12); return { kind: "fill", prompt: `${a} × ☐ = ${a * b}`, answer: b }; }
  if (op === "+") { const a = rint(5, 40), b = rint(5, 40); return { kind: "fill", prompt: `${a} + ☐ = ${a + b}`, answer: b }; }
  const a = rint(20, 90), b = rint(1, a - 1); return { kind: "fill", prompt: `${a} − ☐ = ${a - b}`, answer: b };
}
function genLine(): InteractiveTask {
  const max = pick([10, 20, 100]);
  const step = max / 10;
  const target = step * rint(0, 10);
  return { kind: "line", max, step, target };
}
function genBuild(): InteractiveTask {
  const digits = pick([2, 3]);
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return { kind: "build", target: rint(min, max), digits };
}
function genFraction(): InteractiveTask {
  const den = pick([2, 3, 4, 6, 8]);
  return { kind: "fraction", num: rint(1, den - 1), den };
}

export const INTERACTIVE_SKILLS: InteractiveSkill[] = [
  { id: "build", label: "كوّن العدد", emoji: "🧮", desc: "ابنِ العدد بالآحاد والعشرات والمئات", gen: genBuild },
  { id: "line", label: "خط الأعداد", emoji: "📏", desc: "حدّد موقع العدد على الخط", gen: genLine },
  { id: "fraction", label: "لوّن الكسر", emoji: "🍕", desc: "لوّن الأجزاء لتكوّن الكسر", gen: genFraction },
  { id: "fill", label: "أكمل الفراغ", emoji: "✏️", desc: "أوجد العدد المفقود", gen: genFill },
];

export function getInteractiveSkill(id: string): InteractiveSkill | null {
  if (id === "mixed") {
    return { id: "mixed", label: "منوّع", emoji: "🎲", desc: "خليط من كل الأنواع", gen: () => pick(INTERACTIVE_SKILLS).gen() };
  }
  return INTERACTIVE_SKILLS.find((s) => s.id === id) ?? null;
}
