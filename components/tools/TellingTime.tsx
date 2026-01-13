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
  const [showDigital, setShowDigital] = useState(false);

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

    // Validate inputs
    if (hours < 1 || hours > 12) {
      return `الساعة ${hours}`;
    }
    
    const hourName = hourNames[hours - 1];
    
    if (minutes === 0) {
      return `الساعة ${hourName}`;
    } else if (minutes === 15) {
      return `الساعة ${hourName} و خمسة عشر`;
    } else if (minutes === 30) {
      return `الساعة ${hourName} و ثلاثون`;
    } else if (minutes === 45) {
      const nextHour = hours === 12 ? 1 : hours + 1;
      return `الساعة ${hourNames[nextHour - 1]} إلا ربع`;
    } else {
      // For other minutes, use "الساعة X و Y" format
      const minuteText = formatMinutesArabic(minutes);
      if (minutes < 30) {
        return `الساعة ${hourName} و ${minuteText}`;
      } else {
        const nextHour = hours === 12 ? 1 : hours + 1;
        const remainingMinutes = 60 - minutes;
        const remainingText = formatMinutesArabic(remainingMinutes);
        return `الساعة ${hourNames[nextHour - 1]} إلا ${remainingText}`;
      }
    }
  };

  const formatMinutesArabic = (minutes: number): string => {
    // Arabic number names for minutes (masculine form for minutes)
    const numberNames: { [key: number]: string } = {
      1: "واحد",
      2: "اثنان",
      3: "ثلاثة",
      4: "أربعة",
      5: "خمسة",
      6: "ستة",
      7: "سبعة",
      8: "ثمانية",
      9: "تسعة",
      10: "عشرة",
      11: "أحد عشر",
      12: "اثنا عشر",
      13: "ثلاثة عشر",
      14: "أربعة عشر",
      15: "خمسة عشر",
      16: "ستة عشر",
      17: "سبعة عشر",
      18: "ثمانية عشر",
      19: "تسعة عشر",
      20: "عشرون",
      30: "ثلاثون",
      40: "أربعون",
      50: "خمسون",
    };

    if (numberNames[minutes]) {
      return numberNames[minutes];
    }

    // For numbers 21-29, 31-39, etc.
    if (minutes > 20 && minutes < 30) {
      const ones = minutes % 10;
      const onesName = numberNames[ones] || ones.toString();
      return `${onesName} و عشرون`;
    } else if (minutes > 30 && minutes < 40) {
      const ones = minutes % 10;
      const onesName = numberNames[ones] || ones.toString();
      return `${onesName} و ثلاثون`;
    } else if (minutes > 40 && minutes < 50) {
      const ones = minutes % 10;
      const onesName = numberNames[ones] || ones.toString();
      return `${onesName} و أربعون`;
    } else if (minutes > 50 && minutes < 60) {
      const ones = minutes % 10;
      const onesName = numberNames[ones] || ones.toString();
      return `${onesName} و خمسون`;
    }

    return `${minutes}`;
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
        if (timeFormat === "arabic" || timeFormat === "both") {
          const arabicTime = formatTimeArabic(time.hours, time.minutes);
          await speakText(arabicTime);
        }
        if (timeFormat === "english" || timeFormat === "both") {
          if (timeFormat === "both") {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          const englishTime = formatTimeEnglish(time.hours, time.minutes);
          await speakText(englishTime);
        }
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
          if (timeFormat === "arabic" || timeFormat === "both") {
            const arabicTime = formatTimeArabic(currentTime.hours, currentTime.minutes);
            await speakText(arabicTime);
          }
          if (timeFormat === "english" || timeFormat === "both") {
            if (timeFormat === "both") {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
            const englishTime = formatTimeEnglish(currentTime.hours, currentTime.minutes);
            await speakText(englishTime);
          }
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
          if (timeFormat === "arabic" || timeFormat === "both") {
            const arabicTime = formatTimeArabic(nextTime.hours, nextTime.minutes);
            await speakText(arabicTime);
          }
          if (timeFormat === "english" || timeFormat === "both") {
            if (timeFormat === "both") {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
            const englishTime = formatTimeEnglish(nextTime.hours, nextTime.minutes);
            await speakText(englishTime);
          }
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

  // Calculate clock hand angles - precise calculation
  const getClockHands = (hours: number, minutes: number) => {
    // Convert to 12-hour format for calculation (12 becomes 0 for angle calculation)
    // Hours: 12 should be treated as 0, 1-11 as 1-11
    const hourForAngle = hours % 12;
    
    // Hour hand calculation:
    // - Each hour = 30 degrees (360/12)
    // - Each minute moves hour hand by 0.5 degrees (30/60)
    // - Start at -90 degrees (top of clock = 12 o'clock)
    // Example: 12:55 → (0 * 30) + (55 * 0.5) - 90 = 0 + 27.5 - 90 = -62.5° (just past 12)
    // Example: 1:00 → (1 * 30) + (0 * 0.5) - 90 = 30 - 90 = -60° (at 1)
    const hourAngle = (hourForAngle * 30) + (minutes * 0.5) - 90;
    
    // Minute hand calculation:
    // - Each minute = 6 degrees (360/60)
    // - Start at -90 degrees (top of clock = 0 minutes)
    // Example: 55 minutes → (55 * 6) - 90 = 330 - 90 = 240° (at 11)
    const minuteAngle = (minutes * 6) - 90;
    
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

      {/* Digital Clock */}
      {showDigital && (
        <div className="flex justify-center mb-6">
          <div className="bg-white border-2 border-primary-300 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <p className="text-6xl md:text-8xl font-mono font-bold text-primary-600 mb-2">
                {formatTimeEnglish(currentTime!.hours, currentTime!.minutes).split(" ")[0]}
              </p>
              <p className="text-2xl font-semibold text-primary-500 mb-4">
                {formatTimeEnglish(currentTime!.hours, currentTime!.minutes).split(" ")[1]}
              </p>
              <button
                onClick={async () => {
                  if (soundEnabled && currentTime) {
                    setSpeechEnabled(true);
                    if (timeFormat === "arabic" || timeFormat === "both") {
                      const arabicTime = formatTimeArabic(currentTime.hours, currentTime.minutes);
                      await speakText(arabicTime);
                    }
                    if (timeFormat === "english" || timeFormat === "both") {
                      if (timeFormat === "both") {
                        await new Promise(resolve => setTimeout(resolve, 500));
                      }
                      const englishTime = formatTimeEnglish(currentTime.hours, currentTime.minutes);
                      await speakText(englishTime);
                    }
                  }
                }}
                className="btn-primary text-sm px-6 py-3"
              >
                🔊 استمع للوقت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analog Clock - SVG based for precision */}
      {showAnalog && currentTime && (
        <div className="flex justify-center">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="w-64 h-64 md:w-80 md:h-80"
          >
            {/* Clock face circle */}
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="white"
              stroke="#1f2937"
              strokeWidth="4"
              className="shadow-lg"
            />
            
            {/* Hour markers */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 160 + Math.cos(angle) * 130;
              const y1 = 160 + Math.sin(angle) * 130;
              const x2 = 160 + Math.cos(angle) * 140;
              const y2 = 160 + Math.sin(angle) * 140;
              return (
                <line
                  key={`marker-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#1f2937"
                  strokeWidth="3"
                />
              );
            })}
            
            {/* Hour numbers */}
            {Array.from({ length: 12 }, (_, i) => {
              const hourNumber = i === 0 ? 12 : i;
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 160 + Math.cos(angle) * 110;
              const y = 160 + Math.sin(angle) * 110;
              return (
                <text
                  key={`number-${i}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#1f2937"
                >
                  {hourNumber}
                </text>
              );
            })}
            
            {/* Minute hand */}
            <line
              x1="160"
              y1="160"
              x2={160 + Math.cos((currentTime.minutes * 6 - 90) * (Math.PI / 180)) * 100}
              y2={160 + Math.sin((currentTime.minutes * 6 - 90) * (Math.PI / 180)) * 100}
              stroke="#1f2937"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Hour hand - precise calculation */}
            <line
              x1="160"
              y1="160"
              x2={160 + Math.cos(((currentTime.hours % 12) * 30 + currentTime.minutes * 0.5 - 90) * (Math.PI / 180)) * 70}
              y2={160 + Math.sin(((currentTime.hours % 12) * 30 + currentTime.minutes * 0.5 - 90) * (Math.PI / 180)) * 70}
              stroke="#1f2937"
              strokeWidth="6"
              strokeLinecap="round"
            />
            
            {/* Center dot */}
            <circle
              cx="160"
              cy="160"
              r="8"
              fill="#1f2937"
            />
          </svg>
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

      {/* Toggle clocks */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setShowAnalog(!showAnalog)}
          className="btn-secondary text-sm"
        >
          {showAnalog ? "إخفاء الساعة العادية" : "إظهار الساعة العادية"}
        </button>
        <button
          onClick={() => setShowDigital(!showDigital)}
          className="btn-secondary text-sm"
        >
          {showDigital ? "إخفاء الساعة الرقمية" : "إظهار الساعة الرقمية"}
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
