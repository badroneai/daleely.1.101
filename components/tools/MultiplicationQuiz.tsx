"use client";

// Multiplication-quiz tool — rebuilt to the Tool Playbook (Batch 2).
//
// Extends beyond multiplication to the book skill "حقائق الضرب والقسمة
// المترابطة" (fact families): a 10-question quiz mixing multiplication,
// division, and fact-family questions, with a results screen that reviews
// mistakes and explains the relationship. Reuses the playbook primitives.

import { useRef, useState, useEffect, useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import { trackEvent } from "@/lib/analytics";
import { useSpeechEnabled } from "@/lib/audio/speech-enabled-store";
import { useToolProgress, recordResult } from "@/lib/gamification/progress-store";
import { speakSequence } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import { generateQuiz, type QuizQuestion, type QuizScope } from "@/lib/tools/multiplication/quiz-engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "multiplication-quiz";
const QUIZ_LENGTH = 10;

interface MultiplicationQuizProps {
  grade: GradeLevel | "all";
}

type Phase = "intro" | "quiz" | "result";

export default function MultiplicationQuiz({ grade }: MultiplicationQuizProps) {
  const scope = useMemo<QuizScope>(() => {
    const s = getToolScope(SLUG, grade);
    return s && Array.isArray(s.tables) ? s : { tables: [], difficulty: "easy" };
  }, [grade]);

  const [speechEnabled, setSpeechEnabled] = useSpeechEnabled();
  const progress = useToolProgress(SLUG);

  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrong, setWrong] = useState<QuizQuestion[]>([]);

  const speechAbort = useRef<AbortController | null>(null);
  useEffect(() => () => speechAbort.current?.abort(), []);

  const speak = (q: QuizQuestion, includeAnswer = false) => {
    speechAbort.current?.abort();
    if (!speechEnabled) return;
    const controller = new AbortController();
    speechAbort.current = controller;
    const steps = includeAnswer
      ? [{ type: "number" as const, value: q.answer }]
      : [{ type: "pause" as const, ms: 250 }, ...q.speech];
    void speakSequence(steps, controller.signal);
  };

  const start = () => {
    const qs = generateQuiz(scope, QUIZ_LENGTH);
    setQuestions(qs);
    setIndex(0);
    setAnswer("");
    setFeedback(null);
    setScore(0);
    setStreak(0);
    setWrong([]);
    setPhase("quiz");
    trackEvent("start_training", { tool: SLUG });
    if (qs[0]) speak(qs[0]);
  };

  const current = questions[index];

  const check = () => {
    if (!current || answer.trim() === "" || feedback) return;
    const correct = Number(answer) === current.answer;
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);
    recordResult(SLUG, "quiz", correct, nextStreak);
    if (correct) setScore((s) => s + 1);
    else setWrong((w) => [...w, current]);
    setFeedback({ correct });
    trackEvent(correct ? "answer_correct" : "answer_wrong", { tool: SLUG });
    speak(current, true);
  };

  const next = () => {
    const ni = index + 1;
    if (ni >= questions.length) {
      speechAbort.current?.abort();
      setPhase("result");
      return;
    }
    setIndex(ni);
    setAnswer("");
    setFeedback(null);
    speak(questions[ni]);
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

  if (scope.tables.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-700 mb-2">لا يوجد اختبار ضرب متاح لهذا الصف الدراسي.</p>
        <p className="text-gray-500">اختبار الضرب متاح من الصف الثاني الابتدائي فما فوق.</p>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-amber-700" aria-label={`مجموع نجومك ${toArabicDigits(progress.totalStars)}`}>
            <span className="text-xl" aria-hidden="true">⭐</span>
            <span className="font-bold">{toArabicDigits(progress.totalStars)}</span>
          </div>
          {SpeechToggle}
        </div>
        <p className="text-lg text-gray-700">
          اختبار من {toArabicDigits(QUIZ_LENGTH)} أسئلة يجمع الضرب والقسمة وعائلات الحقائق المترابطة.
        </p>
        <button type="button" onClick={start} className="btn-primary text-lg px-8 py-4 focus-visible-ring">
          ابدأ الاختبار
        </button>
      </div>
    );
  }

  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const label = pct >= 90 ? "ممتاز! 🎉" : pct >= 70 ? "جيد جدًا 👍" : "تحتاج لمزيد من الممارسة 💪";
    return (
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="text-center bg-white border-2 border-primary-500 rounded-xl p-6">
          <p className="text-lg text-gray-600 mb-1">نتيجتك</p>
          <p className="text-4xl font-bold text-gray-900">
            {toArabicDigits(score)} / {toArabicDigits(questions.length)}
          </p>
          <p className="text-xl font-semibold text-primary-700 mt-2">{label}</p>
        </div>

        {wrong.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">راجع أخطاءك</h3>
            <ul className="space-y-3">
              {wrong.map((q, i) => (
                <li key={i} className="card">
                  <p className="font-semibold text-gray-900">{q.prompt}</p>
                  <p className="text-green-700 mt-1">الإجابة الصحيحة: {toArabicDigits(q.answer)}</p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{q.hint}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center">
          <button type="button" onClick={start} className="btn-primary focus-visible-ring">أعد الاختبار</button>
        </div>
      </div>
    );
  }

  // phase === "quiz"
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="text-sm text-gray-500">
          السؤال {toArabicDigits(index + 1)} من {toArabicDigits(questions.length)}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-amber-700 font-semibold" aria-label={`السلسلة ${toArabicDigits(streak)}`}>🔥 {toArabicDigits(streak)}</span>
          {SpeechToggle}
        </div>
      </div>

      <div className="bg-white border-2 border-primary-500 rounded-xl p-6 text-center">
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">{current?.prompt}</p>

        <div className="flex gap-3 justify-center items-center">
          <label htmlFor="quiz-answer" className="sr-only">إجابتك</label>
          <input
            id="quiz-answer"
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
            <button type="button" onClick={check} className="btn-primary text-lg px-8 py-4 focus-visible-ring">تحقّق</button>
          ) : (
            <button type="button" onClick={next} className="btn-primary text-lg px-8 py-4 focus-visible-ring">
              {index + 1 >= questions.length ? "النتيجة" : "التالي"}
            </button>
          )}
        </div>

        <div role="status" aria-live="polite" className="mt-5 min-h-[3rem]">
          {feedback && (
            <div className={feedback.correct ? "text-green-700" : "text-red-700"}>
              <p className="text-xl font-bold">
                {feedback.correct
                  ? `✓ أحسنت! ${toArabicDigits(current!.answer)} صحيحة`
                  : `✗ الإجابة الصحيحة: ${toArabicDigits(current!.answer)}`}
              </p>
              <p className="text-gray-700 mt-2 leading-relaxed">{current!.hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
