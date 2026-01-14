"use client";

import { useState, useEffect, useMemo } from "react";
import { trackEvent } from "@/lib/analytics";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakNumber, speakOperation, setSpeechEnabled, isSpeechEnabled } from "@/lib/speech";
import { speakNumberWithAudio, speakOperationWithAudio } from "@/lib/audio/audio-player";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import SpeakableText from "@/components/audio/SpeakableText";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import type { GradeLevel } from "@/lib/types";

interface MultiplicationTableProps {
  grade: GradeLevel | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

export default function MultiplicationTable({
  grade,
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
  const [speechEnabled, setSpeechEnabledState] = useState(false);

  // Sync with global speech enabled state
  useEffect(() => {
    setSpeechEnabledState(isSpeechEnabled());
    const interval = setInterval(() => {
      setSpeechEnabledState(isSpeechEnabled());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Get available tables from scopeByGrade
  const availableTables: number[] = useMemo(() => {
    const scope = getToolScope("multiplication-table", grade);
    return Array.isArray(scope) ? scope : [];
  }, [grade]);
  
  // Set default selected table to first available table
  useEffect(() => {
    if (availableTables.length > 0 && !availableTables.includes(selectedTable)) {
      setSelectedTable(availableTables[0]);
    }
  }, [availableTables, selectedTable]);

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
    trackEvent("start_training", { tool: "multiplication-table" });
    
    // Speak the question using hybrid audio system
    if (speechEnabled) {
      setTimeout(async () => {
        await speakNumberWithAudio(question.a);
        setTimeout(async () => {
          await speakOperationWithAudio("multiply");
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

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "multiplication-table" });
      setFeedback("correct");
      if (speechEnabled) {
        playCorrectSound();
        // Speak the correct answer using hybrid audio system
        setTimeout(async () => {
          await speakNumberWithAudio(currentQuestion.answer);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "multiplication-table" });
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
            await speakOperationWithAudio("multiply");
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

  // Quick mode - single question at a time
  if (mode === "quick" && isTraining) {
    return (
      <div className="space-y-6">
        <SpeechToggleButton position="top-right" showLabel={true} />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            <SpeakableText
              text={`${currentQuestion?.a} × ${currentQuestion?.b} = ?`}
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

        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-lg text-gray-700">
            <SpeakableText
              text={`النتيجة: ${score.correct} / ${score.total}`}
              showButton={false}
              clickable={true}
              className="block"
            />
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
            <SpeakableText
              text="إنهاء التدريب"
              showButton={false}
              clickable={true}
              className="inline"
            />
          </button>
        </div>
      </div>
    );
  }

  // Show empty state if no tables available for this grade
  if (availableTables.length === 0) {
    return (
      <div className="space-y-6">
        <SpeechToggleButton position="top-right" showLabel={true} />
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            <SpeakableText
              text="لا توجد جداول ضرب متاحة لهذا الصف الدراسي."
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
          <p className="text-gray-500">
            <SpeakableText
              text="جدول الضرب متاح من الصف الثاني الابتدائي فما فوق."
              showButton={false}
              clickable={true}
              className="block"
            />
          </p>
        </div>
      </div>
    );
  }

  // Full mode - show full table
  if (mode === "full") {
    return (
      <div className="space-y-6">
        <SpeechToggleButton position="top-right" showLabel={true} />
        <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
          <label className="text-lg font-medium text-gray-700">
            <SpeakableText
              text="اختر الجدول:"
              showButton={false}
              clickable={true}
              className="block"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTables.map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSelectedTable(num);
                  if (speechEnabled) {
                    speakNumberWithAudio(num);
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
                if (speechEnabled) {
                  speakNumberWithAudio(selectedTable * num);
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
              <SpeakableText
                text="ابدأ التدريب"
                showButton={false}
                clickable={true}
                className="inline"
              />
            </button>
          </div>
        )}

        {isTraining && (
          <div className="bg-white border-2 border-primary-500 rounded-lg p-6">
            <p className="text-2xl font-bold text-gray-900 mb-4 text-center">
              <SpeakableText
                text={`${currentQuestion?.a} × ${currentQuestion?.b} = ?`}
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
                className="input-field text-center text-2xl w-32"
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
              <p className="text-green-600 text-xl font-bold mt-4 text-center">
                <SpeakableText
                  text="✓ صحيح! أحسنت"
                  showButton={false}
                  clickable={true}
                  className="block"
                />
              </p>
            )}
            {feedback === "wrong" && (
              <p className="text-red-600 text-xl font-bold mt-4 text-center">
                <SpeakableText
                  text={`✗ خطأ. الإجابة الصحيحة: ${currentQuestion?.answer}`}
                  showButton={false}
                  clickable={true}
                  className="block"
                />
              </p>
            )}
            <div className="bg-gray-100 rounded-lg p-4 text-center mt-4">
              <p className="text-lg text-gray-700">
                <SpeakableText
                  text={`النتيجة: ${score.correct} / ${score.total}`}
                  showButton={false}
                  clickable={true}
                  className="block"
                />
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
      <SpeechToggleButton position="top-right" showLabel={true} />
      <p className="text-lg text-gray-600">
        <SpeakableText
          text="اختر جدول الضرب الذي تريد التدرب عليه"
          showButton={speechEnabled}
          buttonPosition="inline"
          className="block"
        />
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
            <SpeakableText
              text={`جدول ${num}`}
              showButton={false}
              clickable={true}
              className="inline"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
