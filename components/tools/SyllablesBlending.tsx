"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { playClickSound, playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakWord, speakText, setSpeechEnabled, isSpeechEnabled } from "@/lib/speech";
import { speakTextWithAudio } from "@/lib/audio/audio-player";
import AudioPlayer from "@/components/audio/AudioPlayer";
import SpeakableText from "@/components/audio/SpeakableText";
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import type { GradeLevel } from "@/lib/types";

interface SyllablesBlendingProps {
  grade: GradeLevel | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

const syllables = [
  {
    syllable: "با",
    parts: ["ب", "ا"],
    word: "باب",
    meaning: "باب",
  },
  {
    syllable: "تا",
    parts: ["ت", "ا"],
    word: "تاج",
    meaning: "تاج",
  },
  {
    syllable: "سا",
    parts: ["س", "ا"],
    word: "ساق",
    meaning: "ساق",
  },
  {
    syllable: "ما",
    parts: ["م", "ا"],
    word: "ماء",
    meaning: "ماء",
  },
  {
    syllable: "نا",
    parts: ["ن", "ا"],
    word: "نار",
    meaning: "نار",
  },
  {
    syllable: "لا",
    parts: ["ل", "ا"],
    word: "لام",
    meaning: "لام",
  },
  {
    syllable: "را",
    parts: ["ر", "ا"],
    word: "رأس",
    meaning: "رأس",
  },
  {
    syllable: "دا",
    parts: ["د", "ا"],
    word: "دار",
    meaning: "دار",
  },
];

const words = [
  {
    word: "باب",
    syllables: ["با", "ب"],
    parts: ["ب", "ا", "ب"],
    meaning: "باب",
  },
  {
    word: "ماء",
    syllables: ["ما", "ء"],
    parts: ["م", "ا", "ء"],
    meaning: "ماء",
  },
  {
    word: "نار",
    syllables: ["نا", "ر"],
    parts: ["ن", "ا", "ر"],
    meaning: "نار",
  },
  {
    word: "دار",
    syllables: ["دا", "ر"],
    parts: ["د", "ا", "ر"],
    meaning: "دار",
  },
  {
    word: "رأس",
    syllables: ["را", "س"],
    parts: ["ر", "ا", "س"],
    meaning: "رأس",
  },
  {
    word: "تاج",
    syllables: ["تا", "ج"],
    parts: ["ت", "ا", "ج"],
    meaning: "تاج",
  },
];

type SyllableType = typeof syllables[0];
type WordType = typeof words[0];

export default function SyllablesBlending({
  grade,
  soundEnabled,
  mode,
}: SyllablesBlendingProps) {
  // Get scope from CURRICULUM_MATRIX
  const scope = getToolScope("syllables-blending", grade);
  const [selectedSyllable, setSelectedSyllable] = useState<SyllableType | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMode, setTrainingMode] = useState<"syllables" | "words">("syllables");
  const [currentQuestion, setCurrentQuestion] = useState<{
    type: "syllable" | "word";
    syllable?: SyllableType;
    word?: WordType;
    parts: string[];
    correctAnswer: string;
    options: string[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showParts, setShowParts] = useState(false);
  const [speechEnabled, setSpeechEnabledState] = useState(false);

  // Sync with global speech enabled state
  useEffect(() => {
    setSpeechEnabledState(isSpeechEnabled());
    const interval = setInterval(() => {
      setSpeechEnabledState(isSpeechEnabled());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleSyllableClick = async (syllable: SyllableType) => {
    setSelectedSyllable(syllable);
    setSelectedWord(null);
    if (speechEnabled) {
      playClickSound();
      // Speak the syllable
      await speakTextWithAudio(syllable.syllable);
    }
    trackEvent("tool_open", { tool: "syllables-blending", syllable: syllable.syllable });
  };

  const handleWordClick = async (word: WordType) => {
    setSelectedWord(word);
    setSelectedSyllable(null);
    if (speechEnabled) {
      playClickSound();
      // Speak the word
      await speakTextWithAudio(word.word);
    }
    trackEvent("tool_open", { tool: "syllables-blending", word: word.word });
  };

  const startTraining = (mode: "syllables" | "words") => {
    setIsTraining(true);
    setTrainingMode(mode);
    setScore({ correct: 0, total: 0 });
    const question = generateQuestion(mode);
    setSelectedAnswer(null);
    setFeedback(null);
    setShowParts(false);
    trackEvent("start_training", { tool: "syllables-blending", mode });
    
    // Speak the question
    if (speechEnabled && question) {
      setTimeout(async () => {
        // Speak each part
        for (let i = 0; i < question.parts.length; i++) {
          await speakTextWithAudio(question.parts[i]);
          if (i < question.parts.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
      }, 300);
    }
  };

  const generateQuestion = (mode: "syllables" | "words") => {
    let question;
    if (mode === "syllables") {
      const randomSyllable = syllables[Math.floor(Math.random() * syllables.length)];
      const wrongOptions = syllables
        .filter((s) => s.syllable !== randomSyllable.syllable)
        .map((s) => s.syllable)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      const options = [randomSyllable.syllable, ...wrongOptions].sort(
        () => Math.random() - 0.5
      );

      question = {
        type: "syllable" as const,
        syllable: randomSyllable,
        parts: randomSyllable.parts,
        correctAnswer: randomSyllable.syllable,
        options,
      };
    } else {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const wrongOptions = words
        .filter((w) => w.word !== randomWord.word)
        .map((w) => w.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      const options = [randomWord.word, ...wrongOptions].sort(
        () => Math.random() - 0.5
      );

      question = {
        type: "word" as const,
        word: randomWord,
        parts: randomWord.parts,
        correctAnswer: randomWord.word,
        options,
      };
    }
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setFeedback(null);
    setShowParts(false);
    return question;
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "syllables-blending" });
      setFeedback("correct");
      if (speechEnabled) {
        playCorrectSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakTextWithAudio(currentQuestion.correctAnswer);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "syllables-blending" });
      setFeedback("wrong");
      if (speechEnabled) {
        playWrongSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakTextWithAudio(currentQuestion.correctAnswer);
        }, 500);
      }
    }

    setShowParts(true);

    setTimeout(() => {
      const nextQuestion = generateQuestion(trainingMode);
      setSelectedAnswer(null);
      setFeedback(null);
      setShowParts(false);
      
      // Speak the next question
      if (speechEnabled && nextQuestion) {
        setTimeout(async () => {
          for (let i = 0; i < nextQuestion.parts.length; i++) {
            await speakTextWithAudio(nextQuestion.parts[i]);
            if (i < nextQuestion.parts.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          }
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
    setShowParts(false);
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
                question={currentQuestion.type === "syllable"
                  ? "ما هو المقطع الناتج من دمج هذه الحروف؟"
                  : "ما هي الكلمة الناتجة من دمج هذه الحروف؟"}
                autoSpeak={false}
                showAudioButton={speechEnabled}
                className="text-2xl text-gray-700"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-center gap-4 mb-4 flex-wrap">
                {currentQuestion.parts.map((part, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <SpeakableText
                      text={part}
                      showButton={speechEnabled}
                      buttonPosition="inline"
                      className="text-6xl font-bold text-primary-600 bg-primary-50 p-4 rounded-lg hover:bg-primary-100 transition-colors"
                    />
                  </div>
                ))}
              </div>
              {showParts && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <p className="text-2xl text-gray-600">
                    = <SpeakableText
                      text={currentQuestion.correctAnswer}
                      showButton={speechEnabled}
                      buttonPosition="inline"
                      className="inline"
                    />
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showFeedback = feedback !== null;

                let buttonClass = "p-6 rounded-lg font-semibold text-2xl transition-all border-2 ";
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
                    key={option}
                    onClick={() => !showFeedback && handleAnswer(option)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <SpeakableText
                      text={option}
                      showButton={false}
                      clickable={true}
                      className="block"
                    />
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
                  text={`✗ خطأ. الإجابة الصحيحة: ${currentQuestion.correctAnswer}`}
                  showButton={false}
                  clickable={true}
                  className="block"
                />
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
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
      {selectedSyllable ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center gap-4 mb-4 flex-wrap">
              {selectedSyllable.parts.map((part, index) => (
                <div key={index} className="flex items-center gap-2">
                  <SpeakableText
                    text={part}
                    showButton={speechEnabled}
                    buttonPosition="inline"
                    className="text-6xl font-bold text-primary-600 bg-primary-50 p-4 rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-4xl font-bold text-gray-900">
                = <SpeakableText
                  text={selectedSyllable.syllable}
                  showButton={speechEnabled}
                  buttonPosition="inline"
                  className="inline"
                />
              </p>
            </div>
            <SpeakableText
              text={`مثال: ${selectedSyllable.word} = ${selectedSyllable.meaning}`}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-lg text-gray-600"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSelectedSyllable(null)}
              className="btn-secondary"
            >
              <SpeakableText
                text="العودة للمقاطع"
                showButton={false}
                clickable={true}
                className="inline"
              />
            </button>
            <button
              onClick={() => startTraining("syllables")}
              className="btn-primary"
            >
              <SpeakableText
                text="ابدأ التدريب"
                showButton={false}
                clickable={true}
                className="inline"
              />
            </button>
          </div>
        </div>
      ) : selectedWord ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              {selectedWord.parts.map((part, index) => (
                <div key={index} className="flex items-center gap-2">
                  <SpeakableText
                    text={part}
                    showButton={speechEnabled}
                    buttonPosition="inline"
                    className="text-5xl font-bold text-primary-600 bg-primary-50 p-3 rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-4xl font-bold text-gray-900">
                = <SpeakableText
                  text={selectedWord.word}
                  showButton={speechEnabled}
                  buttonPosition="inline"
                  className="inline"
                />
              </p>
            </div>
            <SpeakableText
              text={`المقاطع: ${selectedWord.syllables.join(" + ")}`}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-lg text-gray-600 mb-4"
            />
            <SpeakableText
              text={selectedWord.meaning}
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-xl text-gray-700"
            />
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
            <button onClick={() => startTraining("words")} className="btn-primary">
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
                text="المقاطع والدمج"
                showButton={false}
                clickable={true}
                className="block"
              />
            </h3>
            <SpeakableText
              text="تعلم تكوين المقاطع ودمج الحروف لقراءة الكلمات"
              showButton={speechEnabled}
              buttonPosition="inline"
              className="text-gray-600 mb-4 block"
            />
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => startTraining("syllables")}
                className="btn-primary"
              >
                <SpeakableText
                  text="تدريب المقاطع"
                  showButton={false}
                  clickable={true}
                  className="inline"
                />
              </button>
              <button onClick={() => startTraining("words")} className="btn-primary">
                <SpeakableText
                  text="تدريب الكلمات"
                  showButton={false}
                  clickable={true}
                  className="inline"
                />
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              <SpeakableText
                text="المقاطع البسيطة:"
                showButton={false}
                clickable={true}
                className="block"
              />
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {syllables.map((syllable) => (
                <button
                  key={syllable.syllable}
                  onClick={() => handleSyllableClick(syllable)}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-primary-50"
                >
                  <div className="flex justify-center gap-2 mb-2 flex-wrap">
                    {syllable.parts.map((part, index) => (
                      <span key={index} className="text-2xl font-bold text-primary-600">
                        <SpeakableText
                          text={part}
                          showButton={false}
                          clickable={true}
                          className="inline"
                        />
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className="text-3xl font-bold text-gray-900">
                      = <SpeakableText
                        text={syllable.syllable}
                        showButton={speechEnabled}
                        buttonPosition="inline"
                        className="inline"
                      />
                    </p>
                  </div>
                  <SpeakableText
                    text={syllable.word}
                    showButton={speechEnabled}
                    buttonPosition="inline"
                    className="text-sm text-gray-600"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              <SpeakableText
                text="الكلمات:"
                showButton={false}
                clickable={true}
                className="block"
              />
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {words.map((word) => (
                <button
                  key={word.word}
                  onClick={() => handleWordClick(word)}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-primary-50"
                >
                  <div className="flex justify-center gap-1 mb-2 flex-wrap">
                    {word.parts.map((part, index) => (
                      <span key={index} className="text-xl font-bold text-primary-600">
                        <SpeakableText
                          text={part}
                          showButton={false}
                          clickable={true}
                          className="inline"
                        />
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className="text-3xl font-bold text-gray-900">
                      = <SpeakableText
                        text={word.word}
                        showButton={speechEnabled}
                        buttonPosition="inline"
                        className="inline"
                      />
                    </p>
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
          </div>
        </>
      )}
    </div>
  );
}
