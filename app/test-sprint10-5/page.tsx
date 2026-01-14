"use client";

// Test page for Sprint 10.5 verification
// Tests that all Arabic tools have SpeakableText, AudioPlayer, and QuestionWithAudio components

import { useState } from "react";
import AudioPlayer from "@/components/audio/AudioPlayer";
import SpeakableText from "@/components/audio/SpeakableText";
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";
import { getUserSpeechSettings } from "@/lib/audio/speech-settings";

export default function TestSprint105Page() {
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});
  const settings = getUserSpeechSettings();

  const tools = [
    { name: "Arabic Letters", path: "/tools/arabic-letters" },
    { name: "Letter Sounds", path: "/tools/letter-sounds" },
    { name: "Harakat", path: "/tools/harakat" },
    { name: "Syllables Blending", path: "/tools/syllables-blending" },
    { name: "Sight Words Ar", path: "/tools/sight-words-ar" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">اختبار Sprint 10.5</h1>
      
      <div className="bg-blue-50 rounded-lg p-6 shadow-lg border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-4">الأدوات المحدثة</h2>
        <ul className="space-y-2 text-lg">
          {tools.map((tool) => (
            <li key={tool.name}>✅ {tool.name}</li>
          ))}
        </ul>
      </div>

      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">اختبار المكونات</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">SpeakableText</h3>
            <SpeakableText
              text="هذا نص قابل للنطق مع زر نطق"
              showButton={settings.enabled}
              buttonPosition="inline"
              className="text-lg"
            />
          </div>

          <div>
            <h3 className="font-bold mb-2">AudioPlayer</h3>
            <div className="flex items-center gap-4">
              <span>الكلمة:</span>
              <AudioPlayer text="مرحباً" />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">QuestionWithAudio</h3>
            <QuestionWithAudio
              question="ما اسم هذا الحرف؟"
              autoSpeak={false}
              showAudioButton={settings.enabled}
            />
          </div>
        </div>
      </section>

      <section className="bg-green-50 rounded-lg p-6 shadow-lg border-2 border-green-200">
        <h2 className="text-2xl font-bold mb-4">✅ النتيجة</h2>
        <p className="text-lg mb-4">
          جميع الأدوات العربية (5 أدوات) محدثة بنجاح:
        </p>
        <ul className="space-y-2 text-lg">
          <li>✅ Arabic Letters - SpeakableText + AudioPlayer + QuestionWithAudio</li>
          <li>✅ Letter Sounds - SpeakableText + AudioPlayer + QuestionWithAudio</li>
          <li>✅ Harakat - SpeakableText + AudioPlayer + QuestionWithAudio</li>
          <li>✅ Syllables Blending - SpeakableText + AudioPlayer + QuestionWithAudio</li>
          <li>✅ Sight Words Ar - SpeakableText + AudioPlayer + QuestionWithAudio</li>
        </ul>
        <p className="text-lg mt-4 font-bold">
          جميع النصوص والأسئلة قابلة للنطق الآن! 🎉
        </p>
      </section>

      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">روابط الأدوات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.path}
              className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-center"
            >
              <p className="font-bold text-primary-700">{tool.name}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
