"use client";

// Fraction-operations tool — NEW (grade-5 gap), built on the Tool Playbook.
// Book skill: جمع/طرح الكسور المتشابهة، تبسيط الكسور.

import { useRef, useState, useEffect, useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import { trackEvent } from "@/lib/analytics";
import { useSpeechEnabled } from "@/lib/audio/speech-enabled-store";
import { useToolProgress, recordResult } from "@/lib/gamification/progress-store";
import { speakSequence } from "@/lib/audio/speak-sequence";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import {
  availableLevels,
  generateQuestion,
  type FractionOpLevel,
  type FractionOpQuestion,
  type FractionOpsScope,
} from "@/lib/tools/fraction-ops/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "fraction-operations";

interface FractionOpsProps {
  grade: GradeLevel | "all";
}

export default function FractionOps({ grade }: FractionOpsProps) {
  const scope = useMemo<FractionOpsScope>(() => {
    const s = getToolScope(SLUG, grade);
    return s && Array.isArray(s.dens) ? s : { dens: [] };
  }, [grade]);
  const levels = useMemo(() => availableLevels(scope), [scope]);

  const [speechEnabled, setSpeechEnabled] = useSpeechEnabled();
  const progress = useToolProgress(SLUG);

  const [level, setLevel] = useState<FractionOpLevel | null>(null);
  const [question, setQuestion] = useState<FractionOpQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; hint: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const speechAbort = useRef<AbortController | null>(null);
  useEffect(() => () => speechAbort.current?.abort(), []);

  const speak = (q: FractionOpQuestion) => {
    speechAbort.current?.abort();
    if (!speechEnabled || q.speech.length === 0) return;
    const controller = new AbortController();
    speechAbort.current = controller;
    void speakSequence([{ type: "pause", ms: 250 }, ...q.speech], controller.signal);
  };

  const startLevel = (lvl: FractionOpLevel) => {
    const q = generateQuestion(lvl, scope);
    setLevel(lvl);
    setQuestion(q);
    setAnswer("");
    setSelected(null);
    setFeedback(null);
    setStreak(0);
    trackEvent("start_training", { tool: SLUG, level: lvl.id });
    speak(q);
  };

  const settle = (correct: boolean) => {
    if (!level || !question) return;
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);
    recordResult(SLUG, level.id, correct, nextStreak);
    setFeedback({ correct, hint: question.hint });
    trackEvent(correct ? "answer_correct" : "answer_wrong", { tool: SLUG, level: level.id });
  };

  const check = () => {
    if (!question || answer.trim() === "" || feedback) return;
    settle(Number(answer) === Number(question.answer));
  };

  const choose = (opt: string) => {
    if (!question || feedback) return;
    setSelected(opt);
    settle(opt === question.answer);
  };

  const next = () => {
    if (!level) return;
    const q = generateQuestion(level, scope);
    setQuestion(q);
    setAnswer("");
    setSelected(null);
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

  if (scope.dens.length === 0 || levels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-700">تدريب عمليات الكسور متاح من الصف الرابع الابتدائي فما فوق.</p>
      </div>
    );
  }

  if (!level) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-lg text-gray-700">اختر مهارة: جمع، طرح، أو تبسيط الكسور.</p>
          {SpeechToggle}
        </div>
        <div className="flex items-center gap-2 text-amber-700 bg-amber-50 rounded-lg px-4 py-2 w-fit" aria-label={`مجموع نجومك ${toArabicDigits(progress.totalStars)}`}>
          <span className="text-xl" aria-hidden="true">⭐</span>
          <span className="font-bold">{toArabicDigits(progress.totalStars)}</span>
          <span className="text-sm">نجمة</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {levels.map((lvl) => {
            const lp = progress.levels[lvl.id];
            return (
              <li key={lvl.id}>
                <button type="button" onClick={() => startLevel(lvl)} className="w-full text-right card hover:border-primary-300 transition-colors focus-visible-ring">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{lvl.title}</h3>
                      <p className="text-sm text-gray-500">الاستراتيجية: {lvl.strategy}</p>
                    </div>
                    {lp?.mastered && <span className="text-green-600 font-bold whitespace-nowrap" aria-label="مُتقَن">✓ مُتقَن</span>}
                  </div>
                  {lp && lp.stars > 0 && <p className="text-amber-600 text-sm mt-2">⭐ {toArabicDigits(lp.stars)}</p>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{level.title}</h3>
          <p className="text-sm text-gray-500">الاستراتيجية: {level.strategy}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-700 font-semibold" aria-label={`السلسلة ${toArabicDigits(streak)}`}>🔥 {toArabicDigits(streak)}</span>
          {SpeechToggle}
        </div>
      </div>

      <div className="bg-white border-2 border-primary-500 rounded-xl p-6 text-center">
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">{question?.prompt}</p>

        {question?.answerKind === "input" ? (
          <div className="flex gap-3 justify-center items-center">
            <label htmlFor="fo-answer" className="sr-only">إجابتك</label>
            <input
              id="fo-answer"
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
              <button type="button" onClick={next} className="btn-primary text-lg px-8 py-4 focus-visible-ring">التالي</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mt-2 max-w-sm mx-auto">
            {question?.options?.map((opt) => {
              const isCorrect = feedback && opt === question.answer;
              const isWrongPick = feedback && opt === selected && opt !== question.answer;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(opt)}
                  disabled={!!feedback}
                  className={`py-4 rounded-lg text-2xl font-bold transition-colors focus-visible-ring ${
                    isCorrect ? "bg-green-600 text-white" : isWrongPick ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-5 min-h-[3rem]">
          {feedback && (
            <div className={feedback.correct ? "text-green-700" : "text-red-700"}>
              <p className="text-xl font-bold">
                {feedback.correct ? `✓ أحسنت! الإجابة ${question!.answer}` : `✗ الإجابة الصحيحة: ${question!.answer}`}
              </p>
              <p className="text-gray-700 mt-2 leading-relaxed">{feedback.hint}</p>
              {question?.answerKind === "choice" && (
                <button type="button" onClick={next} className="btn-primary mt-4 focus-visible-ring">التالي</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button type="button" onClick={exit} className="btn-secondary focus-visible-ring">← المهارات</button>
        <span className="text-sm text-gray-500">نجوم هذه المهارة: ⭐ {toArabicDigits(progress.levels[level.id]?.stars ?? 0)}</span>
      </div>
    </div>
  );
}
