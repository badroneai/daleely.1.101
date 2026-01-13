"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { playCorrectSound, playWrongSound, setSoundEnabled, isSoundEnabled } from "@/lib/sounds";
import { speakNumber, speakOperation, setSpeechEnabled } from "@/lib/speech";

interface MultiplicationTableProps {
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

export default function MultiplicationTable({
  gradeLevel,
  soundEnabled,
  mode,
}: MultiplicationTableProps) {
  const [selectedTable, setSelectedTable] = useState<number>(2);
  const [isTraining, setIsTraining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    a: number;
    b: number;
    answer: number;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Determine which tables to show based on grade level
  const getAvailableTables = () => {
    if (gradeLevel === "1-2") return [2, 3, 4, 5];
    if (gradeLevel === "3-4") return [2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (gradeLevel === "5-6") return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return [2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  const availableTables = getAvailableTables();

  const generateQuestion = () => {
    const a = selectedTable;
    const b = Math.floor(Math.random() * 12) + 1;
    return {
      a,
      b,
      answer: a * b,
    };
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    const question = generateQuestion();
    setCurrentQuestion(question);
    setUserAnswer("");
    setFeedback(null);
    setSpeechEnabled(soundEnabled);
    trackEvent("start_training", { tool: "multiplication-table" });
    
    // Speak the question
    if (soundEnabled) {
      setTimeout(async () => {
        await speakNumber(question.a);
        setTimeout(async () => {
          await speakOperation("multiply");
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

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "multiplication-table" });
      setFeedback("correct");
      if (soundEnabled) {
        playCorrectSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakNumber(currentQuestion.answer);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "multiplication-table" });
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
            await speakOperation("multiply");
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

  // Quick mode - single question at a time
  if (mode === "quick" && isTraining) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            {currentQuestion?.a} × {currentQuestion?.b} = ?
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

        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-lg text-gray-700">
            النتيجة: {score.correct} / {score.total}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setIsTraining(false);
              setCurrentQuestion(null);
            }}
            className="btn-secondary"
          >
            إنهاء التدريب
          </button>
        </div>
      </div>
    );
  }

  // Full mode - show full table
  if (mode === "full") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
          <label className="text-lg font-medium text-gray-700">اختر الجدول:</label>
          <div className="flex flex-wrap gap-2">
            {availableTables.map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSelectedTable(num);
                  if (soundEnabled) {
                    speakNumber(num);
                  }
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedTable === num
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => {
                if (soundEnabled) {
                  speakNumber(selectedTable * num);
                }
              }}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-primary-300 transition-colors"
            >
              <p className="text-sm text-gray-600 mb-1">{selectedTable} × {num}</p>
              <p className="text-xl font-bold text-gray-900">{selectedTable * num}</p>
            </button>
          ))}
        </div>

        {!isTraining && (
          <div className="text-center">
            <button onClick={startTraining} className="btn-primary">
              ابدأ التدريب
            </button>
          </div>
        )}

        {isTraining && (
          <div className="bg-white border-2 border-primary-500 rounded-lg p-6">
            <p className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {currentQuestion?.a} × {currentQuestion?.b} = ?
            </p>
            <div className="flex gap-4 justify-center items-center">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field text-center text-2xl w-32"
                placeholder="?"
                autoFocus
              />
              <button onClick={handleAnswer} className="btn-primary text-lg px-8 py-4">
                تحقق
              </button>
            </div>
            {feedback === "correct" && (
              <p className="text-green-600 text-xl font-bold mt-4 text-center">✓ صحيح! أحسنت</p>
            )}
            {feedback === "wrong" && (
              <p className="text-red-600 text-xl font-bold mt-4 text-center">
                ✗ خطأ. الإجابة الصحيحة: {currentQuestion?.answer}
              </p>
            )}
            <div className="bg-gray-100 rounded-lg p-4 text-center mt-4">
              <p className="text-lg text-gray-700">
                النتيجة: {score.correct} / {score.total}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Initial state - quick mode
  return (
    <div className="text-center space-y-6">
      <p className="text-lg text-gray-600">
        اختر جدول الضرب الذي تريد التدرب عليه
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {availableTables.map((num) => (
          <button
            key={num}
            onClick={() => {
              setSelectedTable(num);
              startTraining();
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
          >
            جدول {num}
          </button>
        ))}
      </div>
    </div>
  );
}
