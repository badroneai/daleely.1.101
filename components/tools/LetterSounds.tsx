"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { playClickSound } from "@/lib/sounds";
import { speakLetter, speakWord, setSpeechEnabled, isSpeechEnabled } from "@/lib/speech";
import { speakLetterWithAudio, speakTextWithAudio } from "@/lib/audio/audio-player";
import AudioPlayer from "@/components/audio/AudioPlayer";
import SpeakableText from "@/components/audio/SpeakableText";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import type { GradeLevel } from "@/lib/types";

interface LetterSoundsProps {
  grade: GradeLevel | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

const letterSounds = [
  { letter: "أ", sound: "أ", examples: ["أرنب", "أسد", "أم"] },
  { letter: "ب", sound: "ب", examples: ["باب", "بيت", "بحر"] },
  { letter: "ت", sound: "ت", examples: ["تاج", "تمر", "توت"] },
  { letter: "ث", sound: "ث", examples: ["ثعلب", "ثمر", "ثوب"] },
  { letter: "ج", sound: "ج", examples: ["جمل", "جبل", "جدار"] },
  { letter: "ح", sound: "ح", examples: ["حجر", "حليب", "حوت"] },
  { letter: "خ", sound: "خ", examples: ["خروف", "خبز", "خاتم"] },
  { letter: "د", sound: "د", examples: ["دب", "دولاب", "دجاجة"] },
  { letter: "ذ", sound: "ذ", examples: ["ذئب", "ذهب", "ذرة"] },
  { letter: "ر", sound: "ر", examples: ["رجل", "رمل", "ريح"] },
  { letter: "ز", sound: "ز", examples: ["زرافة", "زهرة", "زيت"] },
  { letter: "س", sound: "س", examples: ["سمك", "ساعة", "سفينة"] },
  { letter: "ش", sound: "ش", examples: ["شمس", "شجرة", "شباك"] },
  { letter: "ص", sound: "ص", examples: ["صقر", "صندوق", "صابون"] },
  { letter: "ض", sound: "ض", examples: ["ضفدع", "ضرس", "ضب"] },
  { letter: "ط", sound: "ط", examples: ["طائر", "طاولة", "طريق"] },
  { letter: "ظ", sound: "ظ", examples: ["ظبي", "ظل", "ظفر"] },
  { letter: "ع", sound: "ع", examples: ["عصفور", "عسل", "عنكبوت"] },
  { letter: "غ", sound: "غ", examples: ["غزال", "غيمة", "غرفة"] },
  { letter: "ف", sound: "ف", examples: ["فيل", "فستان", "فاكهة"] },
  { letter: "ق", sound: "ق", examples: ["قرد", "قلم", "قمر"] },
  { letter: "ك", sound: "ك", examples: ["كلب", "كتاب", "كأس"] },
  { letter: "ل", sound: "ل", examples: ["لبن", "لون", "ليمون"] },
  { letter: "م", sound: "م", examples: ["ماء", "مدرسة", "مفتاح"] },
  { letter: "ن", sound: "ن", examples: ["نمر", "نافذة", "نار"] },
  { letter: "ه", sound: "ه", examples: ["هدهد", "هواء", "هلال"] },
  { letter: "و", sound: "و", examples: ["وردة", "وطن", "وزة"] },
  { letter: "ي", sound: "ي", examples: ["يمامة", "يقطين", "يد"] },
];

export default function LetterSounds({
  grade,
  soundEnabled,
  mode,
}: LetterSoundsProps) {
  // Get scope from CURRICULUM_MATRIX
  const scope = getToolScope("letter-sounds", grade);
  const [selectedLetter, setSelectedLetter] = useState<typeof letterSounds[0] | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<typeof letterSounds[0] | null>(null);
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

  const handleLetterClick = async (letter: typeof letterSounds[0]) => {
    setSelectedLetter(letter);
    if (speechEnabled) {
      playClickSound();
      // Use hybrid audio system
      await speakLetterWithAudio(letter.letter, letter.sound);
    }
    trackEvent("tool_open", { tool: "letter-sounds", letter: letter.letter });
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    const question = generateQuestion();
    setUserAnswer("");
    setFeedback(null);
    trackEvent("start_training", { tool: "letter-sounds" });
    
    // Speak the sound using hybrid audio system
    if (speechEnabled && question) {
      setTimeout(async () => {
        await speakLetterWithAudio(question.letter, question.sound);
      }, 300);
    }
  };

  const generateQuestion = () => {
    const randomLetter = letterSounds[Math.floor(Math.random() * letterSounds.length)];
    setCurrentQuestion(randomLetter);
    return randomLetter;
  };

  const handleAnswer = () => {
    if (!currentQuestion || !userAnswer) return;

    const isCorrect = userAnswer.trim() === currentQuestion.letter;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "letter-sounds" });
      setFeedback("correct");
      // Speak the correct letter using hybrid audio system
      if (speechEnabled) {
        setTimeout(async () => {
          await speakLetterWithAudio(currentQuestion.letter, currentQuestion.sound);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "letter-sounds" });
      setFeedback("wrong");
      // Speak the correct letter using hybrid audio system
      if (speechEnabled) {
        setTimeout(async () => {
          await speakLetterWithAudio(currentQuestion.letter, currentQuestion.sound);
        }, 500);
      }
    }

    setTimeout(() => {
      const nextQuestion = generateQuestion();
      setUserAnswer("");
      setFeedback(null);
      
      // Speak the next question sound using hybrid audio system
      if (speechEnabled && nextQuestion) {
        setTimeout(async () => {
          await speakLetterWithAudio(nextQuestion.letter, nextQuestion.sound);
        }, 300);
      }
    }, 2000);
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
        <SpeechToggleButton position="top-right" showLabel={true} />
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

        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <div className="mb-4">
            <SpeakableText
              text={`ما هو الحرف الذي يبدأ به صوت "${currentQuestion?.sound}"؟`}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-2xl text-gray-600"
            />
          </div>
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2">
              <SpeakableText
                text="أمثلة:"
                showButton={false}
                clickable={true}
                className="block"
              />
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {currentQuestion?.examples.map((example, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <SpeakableText
                    text={example}
                    showButton={speechEnabled}
                    buttonPosition="inline"
                    className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnswer()}
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
                text={`✗ خطأ. الإجابة الصحيحة: ${currentQuestion?.letter}`}
                showButton={false}
                clickable={true}
                className="block"
              />
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button onClick={resetTraining} className="btn-secondary">
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

  // Browse mode
  return (
    <div className="space-y-6">
      <SpeechToggleButton position="top-right" showLabel={true} />
      {selectedLetter ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <p className="text-8xl font-bold text-primary-600 mb-4">
              <SpeakableText
                text={selectedLetter.letter}
                showButton={false}
                clickable={true}
                className="block cursor-pointer hover:text-primary-700 transition-colors"
              />
            </p>
            <SpeakableText
              text={`صوت الحرف: ${selectedLetter.sound}`}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-3xl font-bold text-gray-900 mb-2"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              <SpeakableText
                text="أمثلة على الكلمات:"
                showButton={false}
                clickable={true}
                className="block"
              />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedLetter.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-lg text-center hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                >
                  <SpeakableText
                    text={example}
                    showButton={speechEnabled}
                    buttonPosition="inline"
                    className="text-3xl font-bold text-primary-600"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg mb-6">
            <span className="text-primary-900 font-medium">
              <span>💡 </span>
              <SpeakableText
                text="نصيحة: استمع للصوت وكرره عدة مرات. حاول نطق الكلمات الأمثلة بصوت عالٍ."
                showButton={speechEnabled}
                buttonPosition="inline"
                className="inline"
              />
            </span>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSelectedLetter(null)}
              className="btn-secondary"
            >
              <SpeakableText
                text="العودة للحروف"
                showButton={false}
                clickable={true}
                className="inline"
              />
            </button>
            <button onClick={startTraining} className="btn-primary">
              <SpeakableText
                text="ابدأ التدريب"
                showButton={false}
                clickable={true}
                className="inline"
              />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              <SpeakableText
                text="أصوات الحروف العربية"
                showButton={false}
                clickable={true}
                className="block"
              />
            </h3>
            <SpeakableText
              text="اضغط على أي حرف لتعرف صوته وأمثلة عليه"
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-gray-600 mb-4 block"
            />
            <button onClick={startTraining} className="btn-primary">
              <SpeakableText
                text="ابدأ التدريب"
                showButton={false}
                clickable={true}
                className="inline"
              />
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-9 gap-3">
            {letterSounds.map((letter) => (
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
