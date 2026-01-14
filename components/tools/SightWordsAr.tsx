"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { playClickSound, playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakWord, setSpeechEnabled, isSpeechEnabled } from "@/lib/speech";
import { speakTextWithAudio } from "@/lib/audio/audio-player";
import AudioPlayer from "@/components/audio/AudioPlayer";
import SpeakableText from "@/components/audio/SpeakableText";
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import type { GradeLevel } from "@/lib/types";

interface SightWordsArProps {
  grade: GradeLevel | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

const sightWords = [
  {
    word: "هذا",
    meaning: "this",
    example: "هذا كتاب",
    category: "common",
  },
  {
    word: "هذه",
    meaning: "this (feminine)",
    example: "هذه قلم",
    category: "common",
  },
  {
    word: "ذلك",
    meaning: "that",
    example: "ذلك منزل",
    category: "common",
  },
  {
    word: "تلك",
    meaning: "that (feminine)",
    example: "تلك شجرة",
    category: "common",
  },
  {
    word: "في",
    meaning: "in",
    example: "الكتاب في الحقيبة",
    category: "preposition",
  },
  {
    word: "من",
    meaning: "from",
    example: "جئت من المدرسة",
    category: "preposition",
  },
  {
    word: "إلى",
    meaning: "to",
    example: "ذهبت إلى البيت",
    category: "preposition",
  },
  {
    word: "على",
    meaning: "on",
    example: "الكتاب على الطاولة",
    category: "preposition",
  },
  {
    word: "مع",
    meaning: "with",
    example: "ذهبت مع صديقي",
    category: "preposition",
  },
  {
    word: "كان",
    meaning: "was",
    example: "كان الطالب مجتهداً",
    category: "verb",
  },
  {
    word: "كانت",
    meaning: "was (feminine)",
    example: "كانت الطالبة مجتهدة",
    category: "verb",
  },
  {
    word: "يكون",
    meaning: "to be",
    example: "سيكون الطقس جميلاً",
    category: "verb",
  },
  {
    word: "قال",
    meaning: "said",
    example: "قال المعلم الدرس",
    category: "verb",
  },
  {
    word: "قالت",
    meaning: "said (feminine)",
    example: "قالت الطالبة الجواب",
    category: "verb",
  },
  {
    word: "ذهب",
    meaning: "went",
    example: "ذهب الولد إلى المدرسة",
    category: "verb",
  },
  {
    word: "جاء",
    meaning: "came",
    example: "جاء الضيف",
    category: "verb",
  },
  {
    word: "رأى",
    meaning: "saw",
    example: "رأى الولد القطة",
    category: "verb",
  },
  {
    word: "عرف",
    meaning: "knew",
    example: "عرف الجواب",
    category: "verb",
  },
  {
    word: "أكل",
    meaning: "ate",
    example: "أكل الطفل التفاحة",
    category: "verb",
  },
  {
    word: "شرب",
    meaning: "drank",
    example: "شرب الطفل الماء",
    category: "verb",
  },
];

type SightWordType = typeof sightWords[0];

export default function SightWordsAr({
  grade,
  soundEnabled,
  mode,
}: SightWordsArProps) {
  // Get scope from CURRICULUM_MATRIX
  const scope = getToolScope("sight-words-ar", grade);
  const [selectedWord, setSelectedWord] = useState<SightWordType | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    word: SightWordType;
    options: SightWordType[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<SightWordType | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);
  const [speechEnabled, setSpeechEnabledState] = useState(false);

  // Sync with global speech enabled state
  useEffect(() => {
    setSpeechEnabledState(isSpeechEnabled());
    const interval = setInterval(() => {
      setSpeechEnabledState(isSpeechEnabled());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleWordClick = async (word: SightWordType) => {
    setSelectedWord(word);
    if (speechEnabled) {
      playClickSound();
      // Speak the word
      await speakTextWithAudio(word.word);
    }
    trackEvent("tool_open", { tool: "sight-words-ar", word: word.word });
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    const question = generateQuestion();
    setSelectedAnswer(null);
    setFeedback(null);
    setShowMeaning(false);
    trackEvent("start_training", { tool: "sight-words-ar" });
    
    // Speak the question word
    if (speechEnabled && question) {
      setTimeout(async () => {
        await speakTextWithAudio(question.word.word);
      }, 300);
    }
  };

  const generateQuestion = () => {
    const randomWord = sightWords[Math.floor(Math.random() * sightWords.length)];
    const wrongOptions = sightWords
      .filter((w) => w.word !== randomWord.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const options = [randomWord, ...wrongOptions].sort(() => Math.random() - 0.5);

    const question = {
      word: randomWord,
      options,
    };
    
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setFeedback(null);
    setShowMeaning(false);
    
    return question;
  };

  const handleAnswer = (selectedWord: SightWordType) => {
    if (!currentQuestion) return;

    setSelectedAnswer(selectedWord);
    const isCorrect = selectedWord.word === currentQuestion.word.word;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "sight-words-ar" });
      setFeedback("correct");
      if (speechEnabled) {
        playCorrectSound();
        // Speak the correct word
        setTimeout(async () => {
          await speakTextWithAudio(currentQuestion.word.word);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "sight-words-ar" });
      setFeedback("wrong");
      if (speechEnabled) {
        playWrongSound();
        // Speak the correct word
        setTimeout(async () => {
          await speakTextWithAudio(currentQuestion.word.word);
        }, 500);
      }
    }

    setShowMeaning(true);

    setTimeout(() => {
      const nextQuestion = generateQuestion();
      setSelectedAnswer(null);
      setFeedback(null);
      setShowMeaning(false);
      
      // Speak the next question word
      if (speechEnabled && nextQuestion) {
        setTimeout(async () => {
          await speakTextWithAudio(nextQuestion.word.word);
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
    setShowMeaning(false);
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

        {currentQuestion && (
          <div className="text-center bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <QuestionWithAudio
                question="ما معنى هذه الكلمة؟"
                autoSpeak={false}
                showAudioButton={speechEnabled}
                className="text-2xl text-gray-700"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <p className="text-6xl font-bold text-primary-600">
                <SpeakableText
                  text={currentQuestion.word.word}
                  showButton={speechEnabled}
                  buttonPosition="inline"
                  className="block cursor-pointer hover:text-primary-700 transition-colors"
                />
              </p>
            </div>
            {showMeaning && (
              <p className="text-xl text-gray-600 mb-4">
                <SpeakableText
                  text={currentQuestion.word.example}
                  showButton={false}
                  clickable={true}
                  className="block"
                />
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer?.word === option.word;
                const isCorrect = option.word === currentQuestion.word.word;
                const showFeedback = feedback !== null;

                let buttonClass = "p-6 rounded-lg font-semibold text-lg transition-all border-2 text-right ";
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
                    key={option.word}
                    onClick={() => !showFeedback && handleAnswer(option)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <p className="text-xl font-bold mb-1">
                      <SpeakableText
                        text={option.meaning}
                        showButton={false}
                        clickable={true}
                        className="block"
                      />
                    </p>
                    {showFeedback && isCorrect && (
                      <p className="text-sm text-gray-600">
                        <SpeakableText
                          text={option.example}
                          showButton={false}
                          clickable={true}
                          className="block"
                        />
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {feedback === "correct" && (
              <p className="text-green-600 text-xl font-bold">
                <SpeakableText
                  text="✓ صحيح! أحسنت"
                  showButton={false}
                  clickable={true}
                  className="block"
                />
              </p>
            )}
            {feedback === "wrong" && (
              <p className="text-red-600 text-xl font-bold">
                <SpeakableText
                  text={`✗ خطأ. الإجابة الصحيحة: ${currentQuestion.word.meaning}`}
                  showButton={false}
                  clickable={true}
                  className="block"
                />
              </p>
            )}
          </div>
        )}

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
      {selectedWord ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <p className="text-6xl font-bold text-primary-600">
                <SpeakableText
                  text={selectedWord.word}
                  showButton={speechEnabled}
                  buttonPosition="inline"
                  className="block cursor-pointer hover:text-primary-700 transition-colors"
                />
              </p>
            </div>
            <SpeakableText
              text={selectedWord.meaning}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-3xl font-bold text-gray-900 mb-2"
            />
            <SpeakableText
              text={selectedWord.example}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-lg text-gray-600 mb-4"
            />
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-semibold">
              <SpeakableText
                text={selectedWord.category === "common" ? "كلمة شائعة" : selectedWord.category === "preposition" ? "حرف جر" : "فعل"}
                showButton={false}
                clickable={true}
                className="inline"
              />
            </span>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSelectedWord(null)}
              className="btn-secondary"
            >
              <SpeakableText
                text="العودة للكلمات"
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
                text="الكلمات البصرية العربية"
                showButton={false}
                clickable={true}
                className="block"
              />
            </h3>
            <SpeakableText
              text="احفظ الكلمات الشائعة في اللغة العربية بسرعة"
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

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sightWords.map((word) => (
              <button
                key={word.word}
                onClick={() => handleWordClick(word)}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-primary-50 min-h-[120px] flex flex-col items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SpeakableText
                    text={word.word}
                    showButton={speechEnabled}
                    buttonPosition="inline"
                    className="text-3xl font-bold text-primary-600"
                  />
                </div>
                <SpeakableText
                  text={word.meaning}
                  showButton={speechEnabled}
                  buttonPosition="inline"
                  className="text-sm text-gray-600"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
