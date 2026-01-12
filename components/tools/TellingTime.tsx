"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";
import { speakText, speakNumber, setSpeechEnabled } from "@/lib/speech";

interface TellingTimeProps {
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  soundEnabled: boolean;
  mode: "quick" | "full";
}

type TimeFormat = "arabic" | "english" | "both";

export default function TellingTime({
  gradeLevel,
  soundEnabled,
  mode,
}: TellingTimeProps) {
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("both");
  const [isTraining, setIsTraining] = useState(false);
  const [currentTime, setCurrentTime] = useState<{
    hours: number;
    minutes: number;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [showAnalog, setShowAnalog] = useState(true);

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    // Round to nearest 5 minutes for easier learning
    const roundedMinutes = Math.round(minutes / 5) * 5;
    return {
      hours,
      minutes: roundedMinutes === 60 ? 0 : roundedMinutes,
    };
  };

  const formatTimeArabic = (hours: number, minutes: number): string => {
    const hourNames = [
      "واحدة",
      "ثنتان",
      "ثلاث",
      "أربع",
      "خمس",
      "ست",
      "سبع",
      "ثمان",
      "تسع",
      "عشر",
      "إحدى عشرة",
      "ثنتا عشرة",
    ];

    if (minutes === 0) {
      return `${hourNames[hours - 1]} بالضبط`;
    } else if (minutes === 15) {
      return `الربع بعد ${hourNames[hours - 1]}`;
    } else if (minutes === 30) {
      return `النصف بعد ${hourNames[hours - 1]}`;
    } else if (minutes === 45) {
      const nextHour = hours === 12 ? 1 : hours + 1;
      return `الربع إلا ${hourNames[nextHour - 1]}`;
    } else if (minutes < 30) {
      return `${minutes} دقيقة بعد ${hourNames[hours - 1]}`;
    } else {
      const nextHour = hours === 12 ? 1 : hours + 1;
      const remainingMinutes = 60 - minutes;
      return `${remainingMinutes} دقيقة إلا ${hourNames[nextHour - 1]}`;
    }
  };

  const formatTimeEnglish = (hours: number, minutes: number): string => {
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${period}`;
  };

  const startTraining = () => {
    setIsTraining(true);
    setScore({ correct: 0, total: 0 });
    setQuestionCount(0);
    setSpeechEnabled(soundEnabled);
    const time = generateRandomTime();
    setCurrentTime(time);
    setUserAnswer("");
    setFeedback(null);
    trackEvent("start_training", { tool: "telling-time" });
    
    // Speak the time
    if (soundEnabled) {
      setTimeout(async () => {
        const arabicTime = formatTimeArabic(time.hours, time.minutes);
        await speakText(arabicTime);
      }, 300);
    }
  };

  const checkAnswer = (userInput: string, hours: number, minutes: number): boolean => {
    if (!userInput) return false;

    // Normalize user input
    const normalized = userInput.trim().toLowerCase();

    // Check Arabic format
    const arabicAnswer = formatTimeArabic(hours, minutes).toLowerCase();
    if (normalized.includes(arabicAnswer.split(" ")[0]) || normalized === arabicAnswer) {
      return true;
    }

    // Check English format
    const englishAnswer = formatTimeEnglish(hours, minutes).toLowerCase();
    const [timePart, period] = englishAnswer.split(" ");
    const [h, m] = timePart.split(":");
    
    // Check if user input matches time format
    if (normalized.includes(h) && normalized.includes(m)) {
      return true;
    }

    // Check numeric format (e.g., "3:15")
    const numericFormat = `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, "0")}`;
    if (normalized === numericFormat || normalized === `${hours}:${minutes.toString().padStart(2, "0")}`) {
      return true;
    }

    return false;
  };

  const handleAnswer = () => {
    if (!currentTime || !userAnswer) return;

    const isCorrect = checkAnswer(userAnswer, currentTime.hours, currentTime.minutes);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setQuestionCount((prev) => prev + 1);

    if (isCorrect) {
      trackEvent("answer_correct", { tool: "telling-time" });
      setFeedback("correct");
      if (soundEnabled) {
        playCorrectSound();
      }
    } else {
      trackEvent("answer_wrong", { tool: "telling-time" });
      setFeedback("wrong");
      if (soundEnabled) {
        playWrongSound();
        // Speak the correct answer
        setTimeout(async () => {
          const arabicTime = formatTimeArabic(currentTime.hours, currentTime.minutes);
          await speakText(arabicTime);
        }, 500);
      }
    }

    setTimeout(() => {
      const nextTime = generateRandomTime();
      setCurrentTime(nextTime);
      setUserAnswer("");
      setFeedback(null);
      
      // Speak the next time
      if (soundEnabled) {
        setTimeout(async () => {
          const arabicTime = formatTimeArabic(nextTime.hours, nextTime.minutes);
          await speakText(arabicTime);
        }, 300);
      }
    }, 2500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  const resetTraining = () => {
    setIsTraining(false);
    setCurrentTime(null);
    setUserAnswer("");
    setScore({ correct: 0, total: 0 });
    setQuestionCount(0);
    setFeedback(null);
  };

  // Calculate clock hand angles
  const getClockHands = (hours: number, minutes: number) => {
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    return { hourAngle, minuteAngle };
  };

  // Not started
  if (!isTraining) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">قراءة الساعة</h3>
          <p className="text-gray-600 mb-6">
            تعلم قراءة الساعة بالعربية والإنجليزية
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={() => {
              setTimeFormat("arabic");
              startTraining();
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            🕐 عربي فقط
          </button>
          <button
            onClick={() => {
              setTimeFormat("english");
              startTraining();
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            🕐 إنجليزي فقط
          </button>
          <button
            onClick={() => {
              setTimeFormat("both");
              startTraining();
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            🕐 الاثنان معاً
          </button>
        </div>

        <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg">
          <p className="text-primary-900 font-medium">
            💡 نصيحة: ابدأ بالعربي، ثم انتقل للإنجليزي عندما تشعر بالثقة
          </p>
        </div>
      </div>
    );
  }

  // Training in progress
  const { hourAngle, minuteAngle } = getClockHands(
    currentTime!.hours,
    currentTime!.minutes
  );

  const correctAnswerArabic = formatTimeArabic(currentTime!.hours, currentTime!.minutes);
  const correctAnswerEnglish = formatTimeEnglish(currentTime!.hours, currentTime!.minutes);

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-lg text-gray-700">
          النتيجة: {score.correct} / {score.total} | السؤال: {questionCount + 1}
        </p>
      </div>

      {/* Analog Clock */}
      {showAnalog && (
        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-gray-800 rounded-full bg-white">
            {/* Clock face */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={i}
                  className="absolute text-lg font-bold text-gray-800"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
            {/* Hour hand */}
            <div
              className="absolute bg-gray-800 rounded-full"
              style={{
                width: "6px",
                height: "60px",
                left: "50%",
                top: "50%",
                transformOrigin: "bottom center",
                transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                zIndex: 2,
              }}
            />
            {/* Minute hand */}
            <div
              className="absolute bg-gray-800 rounded-full"
              style={{
                width: "4px",
                height: "90px",
                left: "50%",
                top: "50%",
                transformOrigin: "bottom center",
                transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                zIndex: 1,
              }}
            />
            {/* Center dot */}
            <div
              className="absolute bg-gray-800 rounded-full"
              style={{
                width: "12px",
                height: "12px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
              }}
            />
          </div>
        </div>
      )}

      {/* Question and Answer */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <p className="text-2xl font-bold text-gray-900 mb-6">
          ما هو الوقت على الساعة؟
        </p>
        {timeFormat === "arabic" && (
          <p className="text-xl text-gray-600 mb-4">اكتب الوقت بالعربية</p>
        )}
        {timeFormat === "english" && (
          <p className="text-xl text-gray-600 mb-4">اكتب الوقت بالإنجليزية</p>
        )}
        {timeFormat === "both" && (
          <p className="text-xl text-gray-600 mb-4">
            اكتب الوقت بالعربية أو الإنجليزية
          </p>
        )}

        <div className="flex gap-4 justify-center items-center mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field text-center text-xl w-full max-w-md"
            placeholder="مثال: ثلاث والنصف أو 3:30 PM"
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
          <div className="mt-4">
            <p className="text-red-600 text-xl font-bold mb-2">✗ خطأ</p>
            <p className="text-gray-700">
              الإجابة الصحيحة: {correctAnswerArabic} أو {correctAnswerEnglish}
            </p>
          </div>
        )}
      </div>

      {/* Toggle analog clock */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAnalog(!showAnalog)}
          className="btn-secondary text-sm"
        >
          {showAnalog ? "إخفاء الساعة" : "إظهار الساعة"}
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={resetTraining} className="btn-secondary">
          إنهاء التدريب
        </button>
      </div>
    </div>
  );
}
