"use client";

// Telling-time tool — rebuilt to the Tool Playbook (Batch 4).
//
// A clean SVG analog clock + multiple-choice reading, aligned to the book:
// levels الساعة التامة / النصف / الربع / الدقائق filtered by the grade scope,
// hints in the book's terms (عقرب الساعات/الدقائق، العدّ بالخمسات).

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
  type TimeLevel,
  type TimeQuestion,
  type TellingTimeScope,
} from "@/lib/tools/telling-time/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "telling-time";

interface TellingTimeProps {
  grade: GradeLevel | "all";
}

function handXY(angleDeg: number, length: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 100 + length * Math.sin(rad), y: 100 - length * Math.cos(rad) };
}

function Clock({ h, m }: { h: number; m: number }) {
  const hourAngle = ((h % 12) + m / 60) * 30;
  const minuteAngle = m * 6;
  const hour = handXY(hourAngle, 45);
  const minute = handXY(minuteAngle, 70);
  return (
    <svg viewBox="0 0 200 200" className="w-56 h-56 mx-auto" role="img" aria-label="ساعة عقاربية">
      <circle cx="100" cy="100" r="92" fill="white" stroke="#1d4ed8" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
        const p = handXY(n * 30, 76);
        return (
          <text key={n} x={p.x} y={p.y + 6} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#374151">
            {toArabicDigits(n)}
          </text>
        );
      })}
      <line x1="100" y1="100" x2={hour.x} y2={hour.y} stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      <line x1="100" y1="100" x2={minute.x} y2={minute.y} stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="5" fill="#111827" />
    </svg>
  );
}

export default function TellingTime({ grade }: TellingTimeProps) {
  const scope = useMemo<TellingTimeScope>(() => {
    const s = getToolScope(SLUG, grade);
    return s && typeof s.hourOnly === "boolean"
      ? s
      : { hourOnly: true, halfHour: false, quarterHour: false, minutes: false, twentyFourHour: false };
  }, [grade]);
  const levels = useMemo(() => availableLevels(scope), [scope]);

  const [speechEnabled, setSpeechEnabled] = useSpeechEnabled();
  const progress = useToolProgress(SLUG);

  const [level, setLevel] = useState<TimeLevel | null>(null);
  const [question, setQuestion] = useState<TimeQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; hint: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const speechAbort = useRef<AbortController | null>(null);
  useEffect(() => () => speechAbort.current?.abort(), []);

  const speak = (q: TimeQuestion) => {
    speechAbort.current?.abort();
    if (!speechEnabled) return;
    const controller = new AbortController();
    speechAbort.current = controller;
    void speakSequence([{ type: "pause", ms: 250 }, ...q.speech], controller.signal);
  };

  const startLevel = (lvl: TimeLevel) => {
    const q = generateQuestion(lvl, scope);
    setLevel(lvl);
    setQuestion(q);
    setSelected(null);
    setFeedback(null);
    setStreak(0);
    trackEvent("start_training", { tool: SLUG, level: lvl.id });
    speak(q);
  };

  const choose = (opt: string) => {
    if (!question || !level || feedback) return;
    const correct = opt === question.answer;
    const nextStreak = correct ? streak + 1 : 0;
    setSelected(opt);
    setStreak(nextStreak);
    recordResult(SLUG, level.id, correct, nextStreak);
    setFeedback({ correct, hint: question.hint });
    trackEvent(correct ? "answer_correct" : "answer_wrong", { tool: SLUG, level: level.id });
    speak(question);
  };

  const next = () => {
    if (!level) return;
    const q = generateQuestion(level, scope);
    setQuestion(q);
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

  if (levels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-700">لا يوجد تدريب على الساعة متاح لهذا الصف الدراسي.</p>
      </div>
    );
  }

  if (!level) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-lg text-gray-700">اختر مستوى قراءة الساعة المناسب لك.</p>
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

      <div className="bg-white border-2 border-primary-500 rounded-xl p-6">
        <p className="text-2xl font-bold text-gray-900 mb-4 text-center">كم الساعة؟</p>
        {question && <Clock h={question.h} m={question.m} />}

        <div className="grid grid-cols-2 gap-3 mt-6 max-w-sm mx-auto">
          {question?.options.map((opt) => {
            const isCorrect = feedback && opt === question.answer;
            const isWrongPick = feedback && opt === selected && opt !== question.answer;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(opt)}
                disabled={!!feedback}
                className={`py-4 rounded-lg text-2xl font-bold transition-colors focus-visible-ring ${
                  isCorrect
                    ? "bg-green-600 text-white"
                    : isWrongPick
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div role="status" aria-live="polite" className="mt-5 min-h-[3rem] text-center">
          {feedback && (
            <div className={feedback.correct ? "text-green-700" : "text-red-700"}>
              <p className="text-xl font-bold">
                {feedback.correct ? `✓ أحسنت! الساعة ${question!.answer}` : `✗ الصحيح: ${question!.answer}`}
              </p>
              <p className="text-gray-700 mt-2 leading-relaxed">{feedback.hint}</p>
              <button type="button" onClick={next} className="btn-primary mt-4 focus-visible-ring">التالي</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button type="button" onClick={exit} className="btn-secondary focus-visible-ring">← المستويات</button>
        <span className="text-sm text-gray-500">نجوم هذا المستوى: ⭐ {toArabicDigits(progress.levels[level.id]?.stars ?? 0)}</span>
      </div>
    </div>
  );
}
