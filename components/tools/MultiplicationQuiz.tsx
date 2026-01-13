"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { playCorrectSound, playWrongSound, playCompleteSound } from "@/lib/sounds";
import { speakNumber, speakOperation, setSpeechEnabled } from "@/lib/speech";

interface MultiplicationQuizProps {
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

interface Question {
  a: number;
  b: number;
  answer: number;
  userAnswer?: number;
  isCorrect?: boolean;
}

export default function MultiplicationQuiz({
  gradeLevel,
  soundEnabled,
  mode,
}: MultiplicationQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeStarted, setTimeStarted] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Determine which tables to use based on grade level
  const getAvailableTables = () => {
    if (gradeLevel === "1-2") return [2, 3, 4, 5];
    if (gradeLevel === "3-4") return [2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (gradeLevel === "5-6") return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return [2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  const generateQuestions = (count: number = 10): Question[] => {
    const availableTables = getAvailableTables();
    const newQuestions: Question[] = [];

    for (let i = 0; i < count; i++) {
      const a = availableTables[Math.floor(Math.random() * availableTables.length)];
      const b = Math.floor(Math.random() * 12) + 1;
      newQuestions.push({
        a,
        b,
        answer: a * b,
      });
    }

    return newQuestions;
  };

  const startQuiz = () => {
    const questionCount = mode === "quick" ? 5 : 10;
    const newQuestions = generateQuestions(questionCount);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setIsStarted(true);
    setIsFinished(false);
    setScore({ correct: 0, total: 0 });
    setUserAnswer("");
    setSpeechEnabled(soundEnabled);
    setTimeStarted(Date.now());
    trackEvent("start_training", { tool: "multiplication-quiz" });
    
    // Speak the first question
    if (soundEnabled && newQuestions.length > 0) {
      setTimeout(async () => {
        const firstQuestion = newQuestions[0];
        await speakNumber(firstQuestion.a);
        setTimeout(async () => {
          await speakOperation("multiply");
          setTimeout(async () => {
            await speakNumber(firstQuestion.b);
          }, 300);
        }, 300);
      }, 300);
    }
  };

  const handleAnswer = () => {
    if (!userAnswer || currentIndex >= questions.length) return;

    const userNum = parseInt(userAnswer);
    const currentQuestion = questions[currentIndex];
    const isCorrect = userNum === currentQuestion.answer;

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQuestion,
      userAnswer: userNum,
      isCorrect,
    };
    setQuestions(updatedQuestions);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "multiplication-quiz" });
      if (soundEnabled) {
        playCorrectSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakNumber(currentQuestion.answer);
        }, 300);
      }
    } else {
      trackEvent("answer_wrong", { tool: "multiplication-quiz" });
      if (soundEnabled) {
        playWrongSound();
        // Speak the correct answer
        setTimeout(async () => {
          await speakNumber(currentQuestion.answer);
        }, 500);
      }
    }

    // Move to next question or finish
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer("");
        
        // Speak the next question
        if (soundEnabled && questions[currentIndex + 1]) {
          setTimeout(async () => {
            const nextQuestion = questions[currentIndex + 1];
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
    } else {
      setTimeout(() => {
        finishQuiz();
      }, 2000);
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    if (timeStarted) {
      const elapsed = Math.floor((Date.now() - timeStarted) / 1000);
      setTimeElapsed(elapsed);
    }
    trackEvent("session_complete", {
      tool: "multiplication-quiz",
      score: score.correct,
      total: score.total,
    });
    if (soundEnabled) {
      playCompleteSound();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  const resetQuiz = () => {
    setIsStarted(false);
    setIsFinished(false);
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswer("");
    setScore({ correct: 0, total: 0 });
    setTimeStarted(null);
    setTimeElapsed(0);
  };

  // Timer effect
  useEffect(() => {
    if (isStarted && !isFinished && timeStarted) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timeStarted) / 1000);
        setTimeElapsed(elapsed);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStarted, isFinished, timeStarted]);

  // Not started
  if (!isStarted) {
    return (
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">اختبار جدول الضرب</h3>
          <p className="text-gray-600 mb-6">
            {mode === "quick"
              ? "اختبار سريع: 5 أسئلة"
              : "اختبار كامل: 10 أسئلة"}
          </p>
          <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg mb-6 text-right">
            <p className="text-primary-900">
              💡 <strong>نصيحة:</strong> خذ وقتك في التفكير، الإجابات الصحيحة أهم من السرعة
            </p>
          </div>
        </div>
        <button onClick={startQuiz} className="btn-primary text-lg px-8 py-4">
          ابدأ الاختبار
        </button>
      </div>
    );
  }

  // Quiz in progress
  if (isStarted && !isFinished) {
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              السؤال {currentIndex + 1} من {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              الوقت: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={async () => {
              if (soundEnabled) {
                await speakNumber(currentQuestion.a);
                setTimeout(async () => {
                  await speakOperation("multiply");
                  setTimeout(async () => {
                    await speakNumber(currentQuestion.b);
                  }, 300);
                }, 300);
              }
            }}
            className="mb-8"
          >
            <p className="text-4xl md:text-5xl font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
              {currentQuestion.a} × {currentQuestion.b} = ?
            </p>
          </button>
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
              تأكيد
            </button>
          </div>
        </div>

        {/* Score so far */}
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-lg text-gray-700">
            النتيجة حتى الآن: {score.correct} / {score.total}
          </p>
        </div>
      </div>
    );
  }

  // Quiz finished - show results
  const percentage = Math.round((score.correct / score.total) * 100);
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  const needsPractice = percentage < 70;

  return (
    <div className="space-y-6">
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">انتهى الاختبار!</h3>
        
        <div className="mb-6">
          {isExcellent && (
            <div className="text-6xl mb-4">🎉</div>
          )}
          {isGood && !isExcellent && (
            <div className="text-6xl mb-4">👍</div>
          )}
          {needsPractice && (
            <div className="text-6xl mb-4">💪</div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-5xl font-bold text-primary-600 mb-2">
              {score.correct} / {score.total}
            </p>
            <p className="text-2xl font-semibold text-gray-700">
              {percentage}%
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-700">
              الوقت المستغرق: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </p>
          </div>

          {isExcellent && (
            <p className="text-xl font-semibold text-green-600">
              ممتاز! أنت متقن جدول الضرب 🎯
            </p>
          )}
          {isGood && !isExcellent && (
            <p className="text-xl font-semibold text-blue-600">
              جيد جداً! استمر في الممارسة 💪
            </p>
          )}
          {needsPractice && (
            <p className="text-xl font-semibold text-orange-600">
              تحتاج لمزيد من الممارسة. لا تقلق، استمر في المحاولة! 🌟
            </p>
          )}
        </div>
      </div>

      {/* Review wrong answers */}
      {questions.some((q) => !q.isCorrect) && (
        <div className="bg-orange-50 border-r-4 border-orange-500 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-900 mb-4">مراجعة الإجابات الخاطئة:</h4>
          <div className="space-y-2">
            {questions
              .filter((q) => !q.isCorrect)
              .map((q, idx) => (
                <div key={idx} className="text-gray-700">
                  <span className="font-semibold">
                    {q.a} × {q.b} = {q.answer}
                  </span>
                  {q.userAnswer !== undefined && (
                    <span className="text-red-600">
                      {" "}
                      (إجابتك: {q.userAnswer})
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={resetQuiz} className="btn-primary">
          اختبار جديد
        </button>
      </div>
    </div>
  );
}
