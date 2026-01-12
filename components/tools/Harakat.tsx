"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { playClickSound, playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakText, speakWord, setSpeechEnabled } from "@/lib/speech";

interface HarakatProps {
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

const harakat = [
  {
    name: "الفتحة",
    symbol: "َ",
    description: "حركة قصيرة فوق الحرف",
    example: "بَ = با",
    words: [
      { word: "بَ", full: "با", meaning: "مع" },
      { word: "تَ", full: "تا", meaning: "حرف التاء" },
      { word: "سَ", full: "سا", meaning: "حرف السين" },
      { word: "مَ", full: "ما", meaning: "ما" },
      { word: "كَ", full: "كا", meaning: "مثل" },
    ],
  },
  {
    name: "الضمة",
    symbol: "ُ",
    description: "حركة قصيرة فوق الحرف",
    example: "بُ = بو",
    words: [
      { word: "بُ", full: "بو", meaning: "في" },
      { word: "تُ", full: "تو", meaning: "حرف التاء" },
      { word: "سُ", full: "سو", meaning: "حرف السين" },
      { word: "مُ", full: "مو", meaning: "من" },
      { word: "كُ", full: "كو", meaning: "مثل" },
    ],
  },
  {
    name: "الكسرة",
    symbol: "ِ",
    description: "حركة قصيرة تحت الحرف",
    example: "بِ = بي",
    words: [
      { word: "بِ", full: "بي", meaning: "في" },
      { word: "تِ", full: "تي", meaning: "حرف التاء" },
      { word: "سِ", full: "سي", meaning: "حرف السين" },
      { word: "مِ", full: "مي", meaning: "من" },
      { word: "كِ", full: "كي", meaning: "مثل" },
    ],
  },
  {
    name: "السكون",
    symbol: "ْ",
    description: "عدم وجود حركة على الحرف",
    example: "بْ = ب",
    words: [
      { word: "بْ", full: "ب", meaning: "حرف الباء" },
      { word: "تْ", full: "ت", meaning: "حرف التاء" },
      { word: "سْ", full: "س", meaning: "حرف السين" },
      { word: "مْ", full: "م", meaning: "حرف الميم" },
      { word: "كْ", full: "ك", meaning: "حرف الكاف" },
    ],
  },
];

type HarakaType = typeof harakat[0];

export default function Harakat({
  gradeLevel,
  soundEnabled,
  mode,
}: HarakatProps) {
  const [selectedHaraka, setSelectedHaraka] = useState<HarakaType | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    word: string;
    correctHaraka: HarakaType;
    options: HarakaType[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<HarakaType | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const handleHarakaClick = async (haraka: HarakaType) => {
    setSelectedHaraka(haraka);
    setSpeechEnabled(soundEnabled);
    if (soundEnabled) {
      playClickSound();
      // Speak the haraka name
      await speakText(haraka.name);
    }
    trackEvent("tool_open", { tool: "harakat", haraka: haraka.name });
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    setSpeechEnabled(soundEnabled);
    const question = generateQuestion();
    setSelectedAnswer(null);
    setFeedback(null);
    trackEvent("start_training", { tool: "harakat" });
    
    // Speak the word
    if (soundEnabled && question) {
      setTimeout(async () => {
        await speakWord(question.word);
      }, 300);
    }
  };

  const generateQuestion = () => {
    // Select a random haraka
    const correctHaraka = harakat[Math.floor(Math.random() * harakat.length)];
    // Select a random word from that haraka
    const wordIndex = Math.floor(Math.random() * correctHaraka.words.length);
    const word = correctHaraka.words[wordIndex].word;

    // Create options: correct answer + 2 random wrong answers
    const wrongOptions = harakat.filter((h) => h.name !== correctHaraka.name);
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [correctHaraka, ...shuffledWrong].sort(() => Math.random() - 0.5);

    const question = {
      word,
      correctHaraka,
      options,
    };
    
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setFeedback(null);
    return question;
  };

  const handleAnswer = (selectedHaraka: HarakaType) => {
    if (!currentQuestion) return;

    setSelectedAnswer(selectedHaraka);
    const isCorrect = selectedHaraka.name === currentQuestion.correctHaraka.name;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "harakat" });
      setFeedback("correct");
      if (soundEnabled) {
        playCorrectSound();
        // Speak the correct word
        setTimeout(async () => {
          await speakWord(currentQuestion.word);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "harakat" });
      setFeedback("wrong");
      if (soundEnabled) {
        playWrongSound();
        // Speak the correct word
        setTimeout(async () => {
          await speakWord(currentQuestion.word);
        }, 500);
      }
    }

    setTimeout(() => {
      const nextQuestion = generateQuestion();
      setSelectedAnswer(null);
      setFeedback(null);
      
      // Speak the next question word
      if (soundEnabled && nextQuestion) {
        setTimeout(async () => {
          await speakWord(nextQuestion.word);
        }, 300);
      }
    }, 2500);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
  };

  // Training mode
  if (isTraining) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-lg text-gray-700">
            النتيجة: {score.correct} / {score.total}
          </p>
        </div>

        {currentQuestion && (
          <div className="text-center bg-white rounded-xl shadow-lg p-8">
            <p className="text-4xl text-gray-600 mb-4">ما هي الحركة الصحيحة؟</p>
            <button
              onClick={async () => {
                if (soundEnabled) {
                  await speakWord(currentQuestion.word);
                }
              }}
              className="mb-8"
            >
              <p className="text-8xl font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
                {currentQuestion.word}
              </p>
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {currentQuestion.options.map((haraka) => {
                const isSelected = selectedAnswer?.name === haraka.name;
                const isCorrect = haraka.name === currentQuestion.correctHaraka.name;
                const showFeedback = feedback !== null;

                let buttonClass = "p-4 rounded-lg font-semibold text-lg transition-all border-2 ";
                if (showFeedback && isCorrect) {
                  buttonClass += "bg-green-100 border-green-500 text-green-700";
                } else if (showFeedback && isSelected && !isCorrect) {
                  buttonClass += "bg-red-100 border-red-500 text-red-700";
                } else if (isSelected) {
                  buttonClass += "bg-primary-100 border-primary-500 text-primary-700";
                } else {
                  buttonClass += "bg-white border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-primary-50";
                }

                return (
                  <button
                    key={haraka.name}
                    onClick={() => !showFeedback && handleAnswer(haraka)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <p className="text-2xl mb-2">{haraka.symbol}</p>
                    <p>{haraka.name}</p>
                  </button>
                );
              })}
            </div>

            {feedback === "correct" && (
              <p className="text-green-600 text-xl font-bold">✓ صحيح! أحسنت</p>
            )}
            {feedback === "wrong" && (
              <p className="text-red-600 text-xl font-bold">
                ✗ خطأ. الإجابة الصحيحة: {currentQuestion.correctHaraka.name}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button onClick={resetTraining} className="btn-secondary">
            إنهاء التدريب
          </button>
        </div>
      </div>
    );
  }

  // Browse mode
  return (
    <div className="space-y-6">
      {selectedHaraka ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <p className="text-6xl font-bold text-primary-600 mb-4">
              {selectedHaraka.symbol}
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {selectedHaraka.name}
            </p>
            <p className="text-lg text-gray-600">{selectedHaraka.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">أمثلة:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedHaraka.words.map((wordExample, index) => (
                <button
                  key={index}
                  onClick={async () => {
                    if (soundEnabled) {
                      await speakWord(wordExample.full);
                    }
                  }}
                  className="p-4 bg-gray-50 rounded-lg text-center hover:bg-primary-50 transition-colors"
                >
                  <p className="text-4xl font-bold text-primary-600 mb-2">
                    {wordExample.word}
                  </p>
                  <p className="text-xl text-gray-700 mb-1">{wordExample.full}</p>
                  <p className="text-sm text-gray-500">{wordExample.meaning}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSelectedHaraka(null)}
              className="btn-secondary"
            >
              العودة للحركات
            </button>
            <button onClick={startTraining} className="btn-primary">
              ابدأ التدريب
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              الحركات العربية
            </h3>
            <p className="text-gray-600 mb-4">
              اضغط على أي حركة لتعرف اسمها وأمثلتها
            </p>
            <button onClick={startTraining} className="btn-primary">
              ابدأ التدريب
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {harakat.map((haraka) => (
              <button
                key={haraka.name}
                onClick={() => handleHarakaClick(haraka)}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center min-h-[150px] flex flex-col items-center justify-center hover:bg-primary-50"
              >
                <p className="text-5xl font-bold text-primary-600 mb-3">
                  {haraka.symbol}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {haraka.name}
                </p>
                <p className="text-sm text-gray-600 mt-2">{haraka.example}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
