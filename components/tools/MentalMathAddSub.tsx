"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakNumber, speakText, setSpeechEnabled } from "@/lib/speech";

interface MentalMathAddSubProps {
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

type Operation = "add" | "subtract";

export default function MentalMathAddSub({
  gradeLevel,
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

  // Determine number range based on grade level
  const getNumberRange = () => {
    if (gradeLevel === "1-2") return { min: 1, max: 20 };
    if (gradeLevel === "3-4") return { min: 10, max: 100 };
    if (gradeLevel === "5-6") return { min: 50, max: 200 };
    return { min: 1, max: 50 };
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
      // For addition: ensure answer is within range
      const a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
      const maxB = Math.min(range.max - a, range.max - range.min);
      const b = maxB > 0 ? Math.floor(Math.random() * maxB) + 1 : 1;
      return {
        a,
        b,
        answer: a + b,
        operation: "add",
      };
    } else {
      // For subtraction: ensure result is positive
      const a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
      const b = Math.floor(Math.random() * a) + 1;
      return {
        a,
        b,
        answer: a - b,
        operation: "subtract",
      };
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    setQuestionCount(0);
    setSpeechEnabled(soundEnabled);
    const question = generateQuestion();
    setCurrentQuestion(question);
    setUserAnswer("");
    setFeedback(null);
    trackEvent("start_training", { tool: "mental-math-add-sub" });
    
    // Speak the question
    if (soundEnabled) {
      setTimeout(async () => {
        await speakNumber(question.a);
        setTimeout(async () => {
          await speakText(question.operation === "add" ? "زائد" : "ناقص");
          setTimeout(async () => {
            await speakNumber(question.b);
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
      if (soundEnabled) {
        playCorrectSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakNumber(currentQuestion.answer);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "mental-math-add-sub" });
      setFeedback("wrong");
      if (soundEnabled) {
        playWrongSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakNumber(currentQuestion.answer);
        }, 500);
      }
    }

    setTimeout(() => {
      const nextQuestion = generateQuestion();
      setCurrentQuestion(nextQuestion);
      setUserAnswer("");
      setFeedback(null);
      
      // Speak the next question
      if (soundEnabled) {
        setTimeout(async () => {
          await speakNumber(nextQuestion.a);
          setTimeout(async () => {
            await speakText(nextQuestion.operation === "add" ? "زائد" : "ناقص");
            setTimeout(async () => {
              await speakNumber(nextQuestion.b);
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
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            الجمع والطرح الذهني
          </h3>
          <p className="text-gray-600 mb-6">
            اختر نوع العملية وابدأ التدريب
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
            ➕ الجمع
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
            ➖ الطرح
          </button>
        </div>

        <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg">
          <p className="text-primary-900 font-medium">
            💡 نصيحة: ابدأ بالجمع، ثم انتقل للطرح عندما تشعر بالثقة
          </p>
        </div>
      </div>
    );
  }

  // Training in progress
  return (
    <div className="space-y-6">
      {/* Score and question count */}
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">النتيجة</p>
          <p className="text-lg font-bold text-gray-900">
            {score.correct} / {score.total}
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-600">عدد الأسئلة</p>
          <p className="text-lg font-bold text-gray-900">{questionCount}</p>
        </div>
      </div>

      {/* Question */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {currentQuestion?.a}{" "}
          {currentQuestion?.operation === "add" ? "+" : "−"}{" "}
          {currentQuestion?.b} = ?
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
            تحقق
          </button>
        </div>
        {feedback === "correct" && (
          <p className="text-green-600 text-xl font-bold mt-4">✓ صحيح! أحسنت</p>
        )}
        {feedback === "wrong" && (
          <p className="text-red-600 text-xl font-bold mt-4">
            ✗ خطأ. الإجابة الصحيحة: {currentQuestion?.answer}
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
          {operation === "add" ? "➖ التبديل للطرح" : "➕ التبديل للجمع"}
        </button>
        <button onClick={resetTraining} className="btn-secondary">
          إنهاء التدريب
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
