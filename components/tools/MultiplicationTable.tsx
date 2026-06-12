"use client";

// Multiplication tool — reference rebuild (Batch 1, Tool Playbook exemplar).
//
// Replaces the legacy random-drill version. It teaches with the book's
// strategy-based levels (مفهوم → مرتكزات → الإبدال → بقية الحقائق → مسائل),
// explains the WHY after every answer, and rewards mastery with stars/streaks.
//
// Standards demonstrated for the playbook:
// - state from external stores via hooks (no setInterval polling, no
//   set-state-in-effect): useSpeechEnabled, useToolProgress
// - cancelable speech via AbortController + speakSequence (no setTimeout pyramids)
// - randomness only in event handlers, never during render (react-hooks/purity)
// - accessibility: aria-live feedback, labeled input, keyboard support

import { useRef, useState, useEffect, useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import { trackEvent } from "@/lib/analytics";
import { useSpeechEnabled } from "@/lib/audio/speech-enabled-store";
import { useToolProgress, recordResult } from "@/lib/gamification/progress-store";
import { speakSequence } from "@/lib/audio/speak-sequence";
import {
  availableLevels,
  generateQuestion,
  toArabicDigits,
  type MultLevel,
  type MultQuestion,
} from "@/lib/tools/multiplication/engine";
import type { GradeLevel } from "@/lib/types";
import TeachExample from "./TeachExample";

const SLUG = "multiplication-table";

interface MultiplicationTableProps {
  grade: GradeLevel | "all";
}

export default function MultiplicationTable({ grade }: MultiplicationTableProps) {
  const scope = useMemo<number[]>(() => {
    const s = getToolScope(SLUG, grade);
    return Array.isArray(s) ? s : [];
  }, [grade]);
  const levels = useMemo(() => availableLevels(scope), [scope]);

  const [speechEnabled, setSpeechEnabled] = useSpeechEnabled();
  const progress = useToolProgress(SLUG);

  const [level, setLevel] = useState<MultLevel | null>(null);
  const [question, setQuestion] = useState<MultQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; hint: string } | null>(null);
  const [streak, setStreak] = useState(0);
  const [teach, setTeach] = useState<MultQuestion | null>(null);

  const speechAbort = useRef<AbortController | null>(null);

  // Abort any in-flight speech on unmount.
  useEffect(() => () => speechAbort.current?.abort(), []);

  const speak = (q: MultQuestion) => {
    speechAbort.current?.abort();
    if (!speechEnabled) return;
    const controller = new AbortController();
    speechAbort.current = controller;
    void speakSequence([{ type: "pause", ms: 250 }, ...q.speech], controller.signal);
  };

  const startLevel = (lvl: MultLevel) => {
    const q = generateQuestion(lvl, scope);
    setLevel(lvl);
    setQuestion(q);
    setAnswer("");
    setFeedback(null);
    setStreak(0);
    trackEvent("start_training", { tool: SLUG, level: lvl.id });
    speak(q);
  };

  const check = () => {
    if (!question || !level || answer.trim() === "" || feedback) return;
    const correct = Number(answer) === question.answer;
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);
    recordResult(SLUG, level.id, correct, nextStreak);
    setFeedback({ correct, hint: question.hint });
    trackEvent(correct ? "answer_correct" : "answer_wrong", { tool: SLUG, level: level.id });
    if (speechEnabled) {
      speechAbort.current?.abort();
      const controller = new AbortController();
      speechAbort.current = controller;
      void speakSequence([{ type: "number", value: question.answer }], controller.signal);
    }
  };

  const next = () => {
    if (!level) return;
    const q = generateQuestion(level, scope);
    setQuestion(q);
    setAnswer("");
    setFeedback(null);
    speak(q);
  };

  const exit = () => {
    speechAbort.current?.abort();
    setLevel(null);
    setQuestion(null);
    setFeedback(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (feedback) next();
    else check();
  };

  const SpeechToggle = (
    <button
      type="button"
      onClick={() => setSpeechEnabled(!speechEnabled)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors focus-visible-ring"
      aria-pressed={speechEnabled}
      aria-label={speechEnabled ? "إيقاف النطق" : "تفعيل النطق"}
    >
      <span className="text-xl" aria-hidden="true">{speechEnabled ? "🔊" : "🔇"}</span>
      <span>{speechEnabled ? "النطق مفعّل" : "النطق متوقّف"}</span>
    </button>
  );

  // No tables for this grade.
  if (scope.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-700 mb-2">لا توجد جداول ضرب متاحة لهذا الصف الدراسي.</p>
        <p className="text-gray-500">جدول الضرب متاح من الصف الثاني الابتدائي فما فوق.</p>
      </div>
    );
  }

  // Level map.
  if (!level) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-lg text-gray-700">اختر مستوى لتبدأ التدرّب بطريقة الكتاب خطوة بخطوة.</p>
          {SpeechToggle}
        </div>

        <div
          className="flex items-center gap-2 text-amber-700 bg-amber-50 rounded-lg px-4 py-2 w-fit"
          aria-label={`مجموع نجومك ${toArabicDigits(progress.totalStars)}`}
        >
          <span className="text-xl" aria-hidden="true">⭐</span>
          <span className="font-bold">{toArabicDigits(progress.totalStars)}</span>
          <span className="text-sm">نجمة</span>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {levels.map((lvl, i) => {
            const lp = progress.levels[lvl.id];
            return (
              <li key={lvl.id}>
                <button
                  type="button"
                  onClick={() => startLevel(lvl)}
                  className="w-full text-right card hover:border-primary-300 transition-colors focus-visible-ring"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {toArabicDigits(i + 1)}. {lvl.title}
                      </h3>
                      <p className="text-sm text-gray-500">الاستراتيجية: {lvl.strategy}</p>
                    </div>
                    {lp?.mastered && (
                      <span className="text-green-600 font-bold whitespace-nowrap" aria-label="مُتقَن">✓ مُتقَن</span>
                    )}
                  </div>
                  {lp && lp.stars > 0 && (
                    <p className="text-amber-600 text-sm mt-2">⭐ {toArabicDigits(lp.stars)}</p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // In-level play.
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{level.title}</h3>
          <p className="text-sm text-gray-500">الاستراتيجية: {level.strategy}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-700 font-semibold" aria-label={`السلسلة ${toArabicDigits(streak)}`}>
            🔥 {toArabicDigits(streak)}
          </span>
          <button type="button" onClick={() => setTeach(generateQuestion(level, scope))} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors focus-visible-ring">📚 تعلّم</button>
          {SpeechToggle}
        </div>
      </div>

      {teach ? (
        <TeachExample
          key={teach.prompt}
          sample={{ prompt: teach.prompt, answer: String(teach.answer), hint: teach.hint }}
          onAnother={() => setTeach(generateQuestion(level, scope))}
          onDone={() => setTeach(null)}
        />
      ) : (
      <div className="bg-white border-2 border-primary-500 rounded-xl p-6 text-center">
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
          {question?.prompt}
        </p>

        <div className="flex gap-3 justify-center items-center">
          <label htmlFor="mult-answer" className="sr-only">إجابتك</label>
          <input
            id="mult-answer"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={onKeyDown}
            disabled={!!feedback}
            className="input-field text-center text-3xl w-32"
            placeholder="؟"
            autoFocus
            autoComplete="off"
          />
          {!feedback ? (
            <button type="button" onClick={check} className="btn-primary text-lg px-8 py-4 focus-visible-ring">
              تحقّق
            </button>
          ) : (
            <button type="button" onClick={next} className="btn-primary text-lg px-8 py-4 focus-visible-ring">
              التالي
            </button>
          )}
        </div>

        <div role="status" aria-live="polite" className="mt-5 min-h-[3rem]">
          {feedback && (
            <div className={feedback.correct ? "text-green-700" : "text-red-700"}>
              <p className="text-xl font-bold">
                {feedback.correct
                  ? `✓ أحسنت! ${toArabicDigits(question!.answer)} صحيحة`
                  : `✗ الإجابة الصحيحة: ${toArabicDigits(question!.answer)}`}
              </p>
              <p className="text-gray-700 mt-2 leading-relaxed">{feedback.hint}</p>
            </div>
          )}
        </div>
      </div>
      )}

      <div className="flex justify-between items-center">
        <button type="button" onClick={exit} className="btn-secondary focus-visible-ring">
          ← المستويات
        </button>
        <span className="text-sm text-gray-500">
          نجوم هذا المستوى: ⭐ {toArabicDigits(progress.levels[level.id]?.stars ?? 0)}
        </span>
      </div>
    </div>
  );
}
