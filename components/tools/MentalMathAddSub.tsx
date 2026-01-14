"use client";

import { useState, useEffect, useMemo } from "react";
import { trackEvent } from "@/lib/analytics";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakNumber, speakOperation, setSpeechEnabled, isSpeechEnabled } from "@/lib/speech";
import { speakNumberWithAudio, speakOperationWithAudio } from "@/lib/audio/audio-player";
import AudioPlayer from "@/components/audio/AudioPlayer";
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import SpeakableText from "@/components/audio/SpeakableText";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import type { GradeLevel } from "@/lib/types";

interface MentalMathAddSubProps {
  grade: GradeLevel | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

type Operation = "add" | "subtract";

export default function MentalMathAddSub({
  grade,
  soundEnabled,
  mode,
}: MentalMathAddSubProps) {
  const [operation, setOperation] = useState<Operation>("add");
  const [isTraining, setIsTraining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    a: number;
    b: number;
    answer: number;
    operation: Operation;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [speechEnabled, setSpeechEnabledState] = useState(false);

  // Sync with global speech enabled state
  useEffect(() => {
    setSpeechEnabledState(isSpeechEnabled());
    const interval = setInterval(() => {
      setSpeechEnabledState(isSpeechEnabled());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Get scope from CURRICULUM_MATRIX
  const scope = useMemo(() => {
    return getToolScope("mental-math-add-sub", grade);
  }, [grade]);

  const maxNumber: number = scope && typeof scope === "object" && "maxNumber" in scope
    ? (scope.maxNumber as number)
    : 100;
  const withCarry: boolean = scope && typeof scope === "object" && "withCarry" in scope
    ? (scope.withCarry as boolean)
    : true;

  // Determine number range based on scope
  const getNumberRange = () => {
    // For grade1 (maxNumber: 20, withCarry: false), ensure no carry
    if (!withCarry) {
      // For addition without carry: ensure a + b < 10 (each digit)
      // For subtraction without carry: ensure a >= b and no borrowing
      return { min: 1, max: maxNumber, withCarry: false };
    }
    return { min: 1, max: maxNumber, withCarry: true };
  };

  const generateQuestion = (): {
    a: number;
    b: number;
    answer: number;
    operation: Operation;
  } => {
    const range = getNumberRange();
    const op = operation;

    if (op === "add") {
      if (!withCarry) {
        // For addition without carry: ensure no carry in any digit
        // For grade1 (maxNumber: 20): use numbers where sum <= maxNumber and no carry
        // Strategy: use numbers 1-9 for each digit, or ensure sum <= 9 per digit
        // Simplified for grade1: use numbers 1-9, sum <= 9 (no carry) OR numbers 10-20 but sum <= 20 with no carry in units
        // Best approach: use numbers 1-9, sum <= 9 (simple and clear)
        const a = Math.floor(Math.random() * 9) + 1; // 1-9
        const maxB = Math.min(9 - a, maxNumber - a); // Ensure a + b <= 9 (no carry) and <= maxNumber
        const b = maxB > 0 ? Math.floor(Math.random() * maxB) + 1 : 1;
        return {
          a,
          b,
          answer: a + b,
          operation: "add",
        };
      } else {
        // For addition with carry: ensure answer is within range
        const a = Math.floor(Math.random() * (maxNumber - 1)) + 1;
        const maxB = Math.min(maxNumber - a, maxNumber - 1);
        const b = maxB > 0 ? Math.floor(Math.random() * maxB) + 1 : 1;
        return {
          a,
          b,
          answer: a + b,
          operation: "add",
        };
      }
    } else {
      // For subtraction
      if (!withCarry) {
        // For subtraction without carry: ensure no borrowing
        // For grade1: use numbers 1-9, ensure a >= b and no borrowing needed
        const a = Math.floor(Math.random() * Math.min(9, maxNumber)) + 1; // 1-9 or 1-maxNumber
        const b = Math.floor(Math.random() * a) + 1; // 1 to a (no borrowing)
        return {
          a,
          b,
          answer: a - b,
          operation: "subtract",
        };
      } else {
        // For subtraction with carry: ensure result is positive
        const a = Math.floor(Math.random() * (maxNumber - 1)) + 1;
        const b = Math.floor(Math.random() * a) + 1;
        return {
          a,
          b,
          answer: a - b,
          operation: "subtract",
        };
      }
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    setQuestionCount(0);
    const question = generateQuestion();
    setCurrentQuestion(question);
    setUserAnswer("");
    setFeedback(null);
    trackEvent("start_training", { tool: "mental-math-add-sub" });
    
    // Speak the question using hybrid audio system
    if (speechEnabled) {
      setTimeout(async () => {
        await speakNumberWithAudio(question.a);
        setTimeout(async () => {
          await speakOperationWithAudio(question.operation);
          setTimeout(async () => {
            await speakNumberWithAudio(question.b);
          }, 300);
        }, 300);
      }, 300);
    }
  };

  const handleAnswer = () => {
    if (!currentQuestion || !userAnswer) return;

    const userNum = parseInt(userAnswer);
    const isCorrect = userNum === currentQuestion.answer;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setQuestionCount((prev) => prev + 1);

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "mental-math-add-sub" });
      setFeedback("correct");
      if (speechEnabled) {
        playCorrectSound();
        // Speak the correct answer using hybrid audio system
        setTimeout(async () => {
          await speakNumberWithAudio(currentQuestion.answer);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "mental-math-add-sub" });
      setFeedback("wrong");
      if (speechEnabled) {
        playWrongSound();
        // Speak the correct answer using hybrid audio system
        setTimeout(async () => {
          await speakNumberWithAudio(currentQuestion.answer);
        }, 500);
      }
    }

    setTimeout(() => {
      const nextQuestion = generateQuestion();
      setCurrentQuestion(nextQuestion);
      setUserAnswer("");
      setFeedback(null);
      
      // Speak the next question using hybrid audio system
      if (speechEnabled) {
        setTimeout(async () => {
          await speakNumberWithAudio(nextQuestion.a);
          setTimeout(async () => {
            await speakOperationWithAudio(nextQuestion.operation);
            setTimeout(async () => {
              await speakNumberWithAudio(nextQuestion.b);
            }, 300);
          }, 300);
        }, 300);
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  const resetTraining = () => {
    setIsTraining(false);
    setCurrentQuestion(null);
    setUserAnswer("");
    setScore({ correct: 0, total: 0 });
    setQuestionCount(0);
    setFeedback(null);
  };

  // Not started
  if (!isTraining) {
    return (
      <div className="space-y-6">
        <SpeechToggleButton position="top-right" showLabel={true} />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            <SpeakableText
              text="الجمع والطرح الذهني"
              showButton={false}
              clickable={true}
              className="block"
            />
          </h3>
          <p className="text-gray-600 mb-6">
            <SpeakableText
              text="اختر نوع العملية وابدأ التدريب"
              showButton={speechEnabled}
              buttonPosition="inline"
              className="block"
            />
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={() => {
              setOperation("add");
              startTraining();
            }}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
              operation === "add"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ➕ <SpeakableText
              text="الجمع"
              showButton={false}
              clickable={true}
              className="inline"
            />
          </button>
          <button
            onClick={() => {
              setOperation("subtract");
              startTraining();
            }}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
              operation === "subtract"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ➖ <SpeakableText
              text="الطرح"
              showButton={false}
              clickable={true}
              className="inline"
            />
          </button>
        </div>

        <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg">
          <p className="text-primary-900 font-medium">
            💡 <SpeakableText
              text="نصيحة: ابدأ بالجمع، ثم انتقل للطرح عندما تشعر بالثقة"
              showButton={false}
              clickable={true}
              className="inline"
            />
          </p>
        </div>
      </div>
    );
  }

  // Training in progress
  return (
    <div className="space-y-6">
      <SpeechToggleButton position="top-right" showLabel={true} />
      {/* Score and question count */}
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">
            <SpeakableText
              text="النتيجة"
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
          <p className="text-lg font-bold text-gray-900">
            <SpeakableText
              text={`${score.correct} / ${score.total}`}
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">
            <SpeakableText
              text="عدد الأسئلة"
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
          <p className="text-lg font-bold text-gray-900">
            <SpeakableText
              text={questionCount.toString()}
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          <SpeakableText
            text={`${currentQuestion?.a} ${currentQuestion?.operation === "add" ? "+" : "−"} ${currentQuestion?.b} = ?`}
            showButton={speechEnabled}
            buttonPosition="inline"
            className="block"
          />
        </p>
        <div className="flex gap-4 justify-center items-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field text-center text-3xl w-32"
            placeholder="?"
            autoFocus
          />
          <button onClick={handleAnswer} className="btn-primary text-lg px-8 py-4">
            <SpeakableText
              text="تحقق"
              showButton={false}
              clickable={true}
              className="inline"
            />
          </button>
        </div>
        {feedback === "correct" && (
          <p className="text-green-600 text-xl font-bold mt-4">
            <SpeakableText
              text="✓ صحيح! أحسنت"
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
        )}
        {feedback === "wrong" && (
          <p className="text-red-600 text-xl font-bold mt-4">
            <SpeakableText
              text={`✗ خطأ. الإجابة الصحيحة: ${currentQuestion?.answer}`}
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            setOperation(operation === "add" ? "subtract" : "add");
            setCurrentQuestion(generateQuestion());
            setUserAnswer("");
            setFeedback(null);
          }}
          className="btn-secondary"
        >
          {operation === "add" ? (
            <>➖ <SpeakableText text="التبديل للطرح" showButton={false} clickable={true} className="inline" /></>
          ) : (
            <>➕ <SpeakableText text="التبديل للجمع" showButton={false} clickable={true} className="inline" /></>
          )}
        </button>
        <button onClick={resetTraining} className="btn-secondary">
          <SpeakableText
            text="إنهاء التدريب"
            showButton={false}
            clickable={true}
            className="inline"
          />
        </button>
      </div>

      {/* Tips */}
      {questionCount > 0 && questionCount % 5 === 0 && (
        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg">
          <p className="text-blue-900 font-medium">
            🌟 رائع! استمر في الممارسة لتحسين سرعتك ودقتك
          </p>
        </div>
      )}
    </div>
  );
}
