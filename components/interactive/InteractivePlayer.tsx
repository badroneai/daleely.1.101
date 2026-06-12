"use client";

import { useState } from "react";
import { getInteractiveSkill, type InteractiveTask } from "@/lib/interactive";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

const SESSION = 8;

// ---------- per-task views ----------
function FillTask({ task, onResult }: { task: Extract<InteractiveTask, { kind: "fill" }>; onResult: (ok: boolean, label: string) => void }) {
  const [v, setV] = useState("");
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" dir="ltr">{task.prompt.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)])}</p>
      <div className="flex gap-3 justify-center items-center">
        <label htmlFor="fill-in" className="sr-only">العدد المفقود</label>
        <input id="fill-in" type="text" inputMode="numeric" value={v} onChange={(e) => setV(e.target.value.replace(/[^0-9]/g, ""))} autoFocus className="input-field text-center text-3xl w-28" placeholder="☐" />
        <button type="button" onClick={() => onResult(Number(v) === task.answer, toArabicDigits(task.answer))} disabled={v === ""} className="btn-primary px-8 py-4 focus-visible-ring disabled:opacity-40">تحقّق</button>
      </div>
    </div>
  );
}

function LineTask({ task, onResult }: { task: Extract<InteractiveTask, { kind: "line" }>; onResult: (ok: boolean, label: string) => void }) {
  const ticks = Array.from({ length: 11 }, (_, i) => i);
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold text-gray-900 mb-6">أين يقع العدد {toArabicDigits(task.target)}؟</p>
      <svg viewBox="0 0 320 70" className="w-full max-w-md mx-auto">
        <line x1="20" y1="35" x2="300" y2="35" stroke="#1d4ed8" strokeWidth="3" />
        {ticks.map((i) => {
          const x = 20 + (i / 10) * 280;
          const val = i * task.step;
          return (
            <g key={i}>
              <line x1={x} y1="28" x2={x} y2="42" stroke="#1d4ed8" strokeWidth="2" />
              <text x={x} y="58" textAnchor="middle" fontSize="11" fill="#374151">{toArabicDigits(val)}</text>
              <circle cx={x} cy="35" r="11" fill="transparent" className="cursor-pointer" onClick={() => onResult(val === task.target, toArabicDigits(task.target))} />
            </g>
          );
        })}
      </svg>
      <p className="text-sm text-gray-500 mt-2">اضغط على موضع العدد على الخط.</p>
    </div>
  );
}

function BuildTask({ task, onResult }: { task: Extract<InteractiveTask, { kind: "build" }>; onResult: (ok: boolean, label: string) => void }) {
  const names = ["الآحاد", "العشرات", "المئات"];
  const [d, setD] = useState<number[]>(Array(task.digits).fill(0));
  const value = d.reduce((s, c, p) => s + c * Math.pow(10, p), 0);
  const set = (p: number, delta: number) => setD((arr) => arr.map((c, i) => (i === p ? Math.max(0, Math.min(9, c + delta)) : c)));
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold text-gray-900 mb-1">كوّن العدد: {toArabicDigits(task.target)}</p>
      <p className="text-gray-500 mb-5">العدد الآن: <span className="font-bold text-primary-700">{toArabicDigits(value)}</span></p>
      <div className="flex gap-3 justify-center" dir="rtl">
        {Array.from({ length: task.digits }, (_, p) => task.digits - 1 - p).map((p) => (
          <div key={p} className="bg-gray-50 rounded-xl p-3 w-24">
            <p className="text-xs text-gray-500 mb-1">{names[p]}</p>
            <button type="button" onClick={() => set(p, 1)} className="block w-full text-xl font-bold text-primary-600 focus-visible-ring rounded">▲</button>
            <p className="text-3xl font-extrabold text-gray-900">{toArabicDigits(d[p])}</p>
            <button type="button" onClick={() => set(p, -1)} className="block w-full text-xl font-bold text-primary-600 focus-visible-ring rounded">▼</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onResult(value === task.target, toArabicDigits(task.target))} className="btn-primary mt-5 px-8 py-3 focus-visible-ring">تحقّق</button>
    </div>
  );
}

function FractionTask({ task, onResult }: { task: Extract<InteractiveTask, { kind: "fraction" }>; onResult: (ok: boolean, label: string) => void }) {
  const [shaded, setShaded] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setShaded((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold text-gray-900 mb-5">لوّن {toArabicDigits(task.num)} من {toArabicDigits(task.den)} أجزاء</p>
      <div className="flex justify-center gap-1 mb-5" dir="rtl">
        {Array.from({ length: task.den }, (_, i) => (
          <button key={i} type="button" onClick={() => toggle(i)} aria-label={`جزء ${i + 1}`}
            className={`w-12 h-16 rounded border-2 border-primary-500 transition-colors focus-visible-ring ${shaded.has(i) ? "bg-primary-600" : "bg-white"}`} />
        ))}
      </div>
      <button type="button" onClick={() => onResult(shaded.size === task.num, `${toArabicDigits(task.num)}/${toArabicDigits(task.den)}`)} className="btn-primary px-8 py-3 focus-visible-ring">تحقّق</button>
    </div>
  );
}

// ---------- session ----------
export default function InteractivePlayer({ skillId }: { skillId: string }) {
  const skill = getInteractiveSkill(skillId);
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [task, setTask] = useState<InteractiveTask | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; label: string } | null>(null);
  const [score, setScore] = useState(0);

  if (!skill) return <p className="text-center text-gray-600 py-10">المهارة غير موجودة.</p>;

  const start = () => { setIndex(0); setScore(0); setFeedback(null); setTask(skill.gen()); setPhase("play"); };

  if (phase === "intro") {
    return (
      <div className="text-center space-y-5 py-4">
        <div className="text-5xl" aria-hidden="true">{skill.emoji}</div>
        <p className="text-lg text-gray-700">{skill.desc}</p>
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">ابدأ التدريب</button>
      </div>
    );
  }

  const onResult = (correct: boolean, label: string) => {
    if (feedback) return;
    if (correct) setScore((s) => s + 1);
    setFeedback({ correct, label });
  };
  const next = () => {
    const ni = index + 1;
    if (ni >= SESSION) { recordResult("interactive", skill.id, true, score); setPhase("done"); return; }
    setIndex(ni); setFeedback(null); setTask(skill.gen());
  };

  if (phase === "done") {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="text-5xl mb-3" aria-hidden="true">🎉</div>
        <p className="text-2xl font-bold text-gray-900 mb-1">أحسنت! نتيجتك {toArabicDigits(score)} / {toArabicDigits(SESSION)}</p>
        <p className="text-amber-600 font-semibold mb-5">⭐ +١ نجمة</p>
        <button type="button" onClick={() => { setPhase("play"); setIndex(0); setScore(0); setFeedback(null); setTask(skill.gen()); }} className="btn-primary focus-visible-ring">مرة أخرى</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-gray-500">{toArabicDigits(index + 1)} / {toArabicDigits(SESSION)}</span>
        <span className="text-amber-700">⭐ {toArabicDigits(score)}</span>
      </div>

      <div key={index}>
        {task?.kind === "fill" && <FillTask task={task} onResult={onResult} />}
        {task?.kind === "line" && <LineTask task={task} onResult={onResult} />}
        {task?.kind === "build" && <BuildTask task={task} onResult={onResult} />}
        {task?.kind === "fraction" && <FractionTask task={task} onResult={onResult} />}
      </div>

      <div role="status" aria-live="polite" className="text-center min-h-[3rem]">
        {feedback && (
          <div className={feedback.correct ? "text-green-700" : "text-red-700"}>
            <p className="text-xl font-bold">{feedback.correct ? "✓ أحسنت!" : `✗ الصحيح: ${feedback.label}`}</p>
            <button type="button" onClick={next} className="btn-primary mt-3 focus-visible-ring">التالي</button>
          </div>
        )}
      </div>
    </div>
  );
}
