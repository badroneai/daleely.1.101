"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { playClickSound } from "@/lib/sounds";
import { speakLetter, setSpeechEnabled } from "@/lib/speech";

interface ArabicLettersProps {
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

const arabicLetters = [
  { letter: "أ", name: "ألف", isolated: "أ", initial: "أ", medial: "ا", final: "ا" },
  { letter: "ب", name: "باء", isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب" },
  { letter: "ت", name: "تاء", isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" },
  { letter: "ث", name: "ثاء", isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" },
  { letter: "ج", name: "جيم", isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" },
  { letter: "ح", name: "حاء", isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" },
  { letter: "خ", name: "خاء", isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" },
  { letter: "د", name: "دال", isolated: "د", initial: "د", medial: "ـد", final: "ـد" },
  { letter: "ذ", name: "ذال", isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ" },
  { letter: "ر", name: "راء", isolated: "ر", initial: "ر", medial: "ـر", final: "ـر" },
  { letter: "ز", name: "زاي", isolated: "ز", initial: "ز", medial: "ـز", final: "ـز" },
  { letter: "س", name: "سين", isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" },
  { letter: "ش", name: "شين", isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" },
  { letter: "ص", name: "صاد", isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص" },
  { letter: "ض", name: "ضاد", isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض" },
  { letter: "ط", name: "طاء", isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط" },
  { letter: "ظ", name: "ظاء", isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ" },
  { letter: "ع", name: "عين", isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع" },
  { letter: "غ", name: "غين", isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ" },
  { letter: "ف", name: "فاء", isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف" },
  { letter: "ق", name: "قاف", isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق" },
  { letter: "ك", name: "كاف", isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك" },
  { letter: "ل", name: "لام", isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل" },
  { letter: "م", name: "ميم", isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم" },
  { letter: "ن", name: "نون", isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن" },
  { letter: "ه", name: "هاء", isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه" },
  { letter: "و", name: "واو", isolated: "و", initial: "و", medial: "ـو", final: "ـو" },
  { letter: "ي", name: "ياء", isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي" },
];

type LetterForm = "isolated" | "initial" | "medial" | "final";

export default function ArabicLetters({
  gradeLevel,
  soundEnabled,
  mode,
}: ArabicLettersProps) {
  const [selectedLetter, setSelectedLetter] = useState<typeof arabicLetters[0] | null>(null);
  const [showForm, setShowForm] = useState<LetterForm>("isolated");
  const [isTraining, setIsTraining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<typeof arabicLetters[0] | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const handleLetterClick = async (letter: typeof arabicLetters[0]) => {
    setSelectedLetter(letter);
    setSpeechEnabled(soundEnabled);
    if (soundEnabled) {
      playClickSound();
      // Speak the letter name
      await speakLetter(letter.letter, letter.name);
    }
    trackEvent("tool_open", { tool: "arabic-letters", letter: letter.letter });
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    setSpeechEnabled(soundEnabled);
    const question = generateQuestion();
    setUserAnswer("");
    setFeedback(null);
    trackEvent("start_training", { tool: "arabic-letters" });
    
    // Speak the letter
    if (soundEnabled && question) {
      setTimeout(async () => {
        await speakLetter(question.letter, question.name);
      }, 300);
    }
  };

  const generateQuestion = () => {
    const randomLetter = arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
    setCurrentQuestion(randomLetter);
    return randomLetter;
  };

  const handleAnswer = () => {
    if (!currentQuestion || !userAnswer) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.name.toLowerCase();

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "arabic-letters" });
      setFeedback("correct");
    } else {
      trackEvent("answer_wrong", { tool: "arabic-letters" });
      setFeedback("wrong");
    }

    setTimeout(() => {
      generateQuestion();
      setUserAnswer("");
      setFeedback(null);
    }, 1500);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setCurrentQuestion(null);
    setUserAnswer("");
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

        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={async () => {
              if (soundEnabled && currentQuestion) {
                await speakLetter(currentQuestion.letter, currentQuestion.name);
              }
            }}
            className="mb-6"
          >
            <p className="text-6xl font-bold text-primary-600 mb-2 hover:text-primary-700 transition-colors cursor-pointer">
              {currentQuestion?.letter}
            </p>
          </button>
          <p className="text-xl text-gray-600 mb-6">
            ما اسم هذا الحرف؟
          </p>
          <div className="flex gap-4 justify-center items-center">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnswer()}
              className="input-field text-center text-2xl w-64"
              placeholder="اكتب اسم الحرف"
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
              ✗ خطأ. الإجابة الصحيحة: {currentQuestion?.name}
            </p>
          )}
        </div>

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
      {selectedLetter ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <button
              onClick={async () => {
                if (soundEnabled) {
                  await speakLetter(selectedLetter.letter, selectedLetter.name);
                }
              }}
              className="mb-4"
            >
              <p className="text-8xl font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
                {selectedLetter.letter}
              </p>
            </button>
            <button
              onClick={async () => {
                if (soundEnabled) {
                  await speakLetter(selectedLetter.letter, selectedLetter.name);
                }
              }}
              className="mb-2"
            >
              <p className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer">
                {selectedLetter.name}
              </p>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">أشكال الحرف:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={async () => {
                  if (soundEnabled) {
                    await speakLetter(selectedLetter.letter, selectedLetter.name);
                  }
                }}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-2">منفصل</p>
                <p className="text-4xl font-bold text-primary-600">{selectedLetter.isolated}</p>
              </button>
              <button
                onClick={async () => {
                  if (soundEnabled) {
                    await speakLetter(selectedLetter.letter, selectedLetter.name);
                  }
                }}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-2">في البداية</p>
                <p className="text-4xl font-bold text-primary-600">{selectedLetter.initial}</p>
              </button>
              <button
                onClick={async () => {
                  if (soundEnabled) {
                    await speakLetter(selectedLetter.letter, selectedLetter.name);
                  }
                }}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-2">في الوسط</p>
                <p className="text-4xl font-bold text-primary-600">{selectedLetter.medial}</p>
              </button>
              <button
                onClick={async () => {
                  if (soundEnabled) {
                    await speakLetter(selectedLetter.letter, selectedLetter.name);
                  }
                }}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-2">في النهاية</p>
                <p className="text-4xl font-bold text-primary-600">{selectedLetter.final}</p>
              </button>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSelectedLetter(null)}
              className="btn-secondary"
            >
              العودة للحروف
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
              الحروف العربية
            </h3>
            <p className="text-gray-600 mb-4">
              اضغط على أي حرف لتعرف اسمه وأشكاله
            </p>
            <button onClick={startTraining} className="btn-primary">
              ابدأ التدريب
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-9 gap-3">
            {arabicLetters.map((letter) => (
              <button
                key={letter.letter}
                onClick={() => handleLetterClick(letter)}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-3xl font-bold text-primary-600 hover:bg-primary-50 min-h-[80px] flex items-center justify-center"
              >
                {letter.letter}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
