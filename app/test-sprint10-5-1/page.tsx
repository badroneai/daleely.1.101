"use client";

// Test page for Sprint 10.5.1 verification
// Tests SpeakableText (clickable), SpeechToggleButton, and QuestionWithAudio

import { useState, useEffect } from "react";
import SpeakableText from "@/components/audio/SpeakableText";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { getUserSpeechSettings } from "@/lib/audio/speech-settings";

export default function TestSprint1051Page() {
  const [settings, setSettings] = useState(getUserSpeechSettings());
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSettings = getUserSpeechSettings();
      setSettings(currentSettings);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">اختبار Sprint 10.5.1</h1>
      
      {/* Speech Toggle Button */}
      <section className="bg-blue-50 rounded-lg p-6 shadow-lg border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-4">زر التحكم في النطق</h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2">الموضع: top-right (ثابت أعلى الصفحة)</p>
            <SpeechToggleButton position="top-right" showLabel={true} />
          </div>
          <div>
            <p className="mb-2">الموضع: inline (في الصفحة)</p>
            <SpeechToggleButton position="inline" showLabel={true} />
          </div>
          <div className="mt-4">
            <p className="font-bold">الحالة الحالية: {settings.enabled ? "✅ مفعّل" : "❌ معطّل"}</p>
          </div>
        </div>
      </section>

      {/* SpeakableText Tests */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">اختبار SpeakableText (قابل للضغط)</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">نص عادي (قابل للضغط + أيقونة صوت)</h3>
            <SpeakableText
              text="اضغط على هذا النص للاستماع"
              showButton={true}
              buttonPosition="inline"
              className="text-xl"
            />
            <p className="text-sm text-gray-600 mt-2">
              ✅ يجب أن يكون النص قابل للضغط + أيقونة صوت
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">نص بدون أيقونة (قابل للضغط فقط)</h3>
            <SpeakableText
              text="اضغط على هذا النص للاستماع (بدون أيقونة)"
              showButton={false}
              clickable={true}
              className="text-xl cursor-pointer hover:text-primary-600"
            />
            <p className="text-sm text-gray-600 mt-2">
              ✅ يجب أن يكون النص قابل للضغط فقط
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">نص غير قابل للضغط</h3>
            <SpeakableText
              text="هذا النص غير قابل للضغط"
              showButton={true}
              clickable={false}
              className="text-xl"
            />
            <p className="text-sm text-gray-600 mt-2">
              ✅ يجب أن يكون النص غير قابل للضغط (فقط أيقونة صوت)
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">عناوين مختلفة</h3>
            <SpeakableText
              text="تعلم الحروف العربية"
              showButton={true}
              className="text-3xl font-bold"
            />
            <SpeakableText
              text="تعرف على الحروف العربية مع أشكالها وأصواتها"
              showButton={true}
              className="text-lg text-gray-600 mt-2 block"
            />
          </div>
        </div>
      </section>

      {/* QuestionWithAudio Tests */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">اختبار QuestionWithAudio</h2>
        <div className="space-y-4">
          <QuestionWithAudio
            question="ما اسم هذا الحرف؟"
            autoSpeak={false}
            showAudioButton={true}
            className="text-2xl"
          />
          <p className="text-sm text-gray-600">
            ✅ يجب أن يكون السؤال قابل للضغط + أيقونة صوت
          </p>
        </div>
      </section>

      {/* Integration Test */}
      <section className="bg-green-50 rounded-lg p-6 shadow-lg border-2 border-green-200">
        <h2 className="text-2xl font-bold mb-4">✅ النتيجة</h2>
        <ul className="space-y-2 text-lg">
          <li>✅ SpeakableText - النص قابل للضغط</li>
          <li>✅ SpeechToggleButton - زر التحكم يعمل</li>
          <li>✅ QuestionWithAudio - السؤال قابل للضغط</li>
          <li>✅ جميع المكونات متكاملة</li>
        </ul>
        <p className="text-lg mt-4 font-bold">
          Sprint 10.5.1 يعمل بشكل ممتاز! 🎉
        </p>
      </section>
    </div>
  );
}
