"use client";

// Test page for audio components
// This page is for testing only - will be removed later

import { useState, useEffect } from "react";
import SpeakableText from "@/components/audio/SpeakableText";
import SpeakableButton from "@/components/audio/SpeakableButton";
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { 
  speakNumberWithAudio, 
  speakLetterWithAudio, 
  speakOperationWithAudio,
  speakTextWithAudio 
} from "@/lib/audio/audio-player";
import { 
  getUserSpeechSettings, 
  updateUserSpeechSettings,
  initSpeechSettings 
} from "@/lib/audio/speech-settings";
import { isSpeechAvailable, setSpeechEnabled } from "@/lib/speech";

export default function TestAudioPage() {
  const [settings, setSettings] = useState(getUserSpeechSettings());
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    initSpeechSettings();
  }, []);

  const runTest = async (testName: string, testFn: () => Promise<void>) => {
    setIsTesting(true);
    setTestResults(prev => ({ ...prev, [testName]: "جاري الاختبار..." }));
    
    try {
      await testFn();
      setTestResults(prev => ({ ...prev, [testName]: "✅ نجح" }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [testName]: `❌ فشل: ${error}` }));
    } finally {
      setIsTesting(false);
    }
  };

  const testNumber = async () => {
    setSpeechEnabled(true);
    await speakNumberWithAudio(5);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await speakNumberWithAudio(10);
  };

  const testLetter = async () => {
    setSpeechEnabled(true);
    await speakLetterWithAudio("أ", "ألف");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await speakLetterWithAudio("ب", "باء");
  };

  const testOperation = async () => {
    setSpeechEnabled(true);
    await speakOperationWithAudio("add");
    await new Promise(resolve => setTimeout(resolve, 500));
    await speakOperationWithAudio("multiply");
  };

  const testText = async () => {
    setSpeechEnabled(true);
    await speakTextWithAudio("مرحباً");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await speakTextWithAudio("شكراً");
  };

  const handleSettingsChange = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateUserSpeechSettings(newSettings);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">اختبار شامل لنظام الصوت</h1>
      
      {/* System Status */}
      <section className="bg-blue-50 rounded-lg p-6 shadow-lg border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-4">حالة النظام</h2>
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-bold">Web Speech API:</span>{" "}
            {isSpeechAvailable() ? "✅ متاح" : "❌ غير متاح"}
          </p>
          <p className="text-lg">
            <span className="font-bold">الصوتيات المسجلة:</span>{" "}
            <span className="text-gray-600">⏳ جاهز للإضافة لاحقاً</span>
          </p>
        </div>
      </section>

      {/* Settings */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">الإعدادات</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => handleSettingsChange("enabled", e.target.checked)}
              className="w-5 h-5"
            />
            <span>تفعيل الصوت</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.useAudioFiles}
              onChange={(e) => handleSettingsChange("useAudioFiles", e.target.checked)}
              className="w-5 h-5"
            />
            <span>استخدام الصوتيات المسجلة (عند توفرها)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoSpeak}
              onChange={(e) => handleSettingsChange("autoSpeak", e.target.checked)}
              className="w-5 h-5"
            />
            <span>النطق التلقائي</span>
          </label>
        </div>
      </section>

      {/* Functional Tests */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">اختبارات الوظائف</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار الأرقام</p>
              <p className="text-sm text-gray-600">اختبار نطق الأرقام (5, 10)</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testNumber || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testNumber", testNumber)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار الحروف</p>
              <p className="text-sm text-gray-600">اختبار نطق الحروف (أ, ب)</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testLetter || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testLetter", testLetter)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار العمليات</p>
              <p className="text-sm text-gray-600">اختبار نطق العمليات (زائد, ضرب)</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testOperation || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testOperation", testOperation)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار النصوص</p>
              <p className="text-sm text-gray-600">اختبار نطق النصوص (مرحباً, شكراً)</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testText || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testText", testText)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Component Tests */}
      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">اختبار المكونات</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">SpeakableText</h3>
            <div className="space-y-2">
              <SpeakableText 
                text="مرحباً بك في موقع دليلي"
                buttonPosition="inline"
              />
              <SpeakableText 
                text="هذا نص قابل للنطق"
                buttonPosition="before"
              />
              <SpeakableText 
                text="النص مع زر بعد النص"
                buttonPosition="after"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">SpeakableButton</h3>
            <div className="space-y-2">
              <SpeakableButton
                text="اضغط هنا"
                onClick={() => alert("تم الضغط!")}
                className="btn-primary"
                audioButtonPosition="right"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">QuestionWithAudio</h3>
            <div className="space-y-2">
              <QuestionWithAudio
                question="ما هو 5 + 3؟"
                autoSpeak={false}
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">AudioPlayer (Standalone)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span>الرقم خمسة:</span>
                <AudioPlayer text="خمسة" />
              </div>
              <div className="flex items-center gap-4">
                <span>الحرف ألف:</span>
                <AudioPlayer text="ألف" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">اختبار الأرقام</h3>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 5, 10, 15, 20, 25, 30].map((num) => (
                <SpeakableText
                  key={num}
                  text={num.toString()}
                  className="text-xl font-bold"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
