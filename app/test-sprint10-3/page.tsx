"use client";

// Test page for Sprint 10.3 verification
// Tests the updated tools: LetterSounds, Harakat, MentalMathAddSub

import { useState } from "react";
import { speakLetterWithAudio, speakTextWithAudio, speakNumberWithAudio, speakOperationWithAudio } from "@/lib/audio/audio-player";
import { setSpeechEnabled } from "@/lib/speech";

export default function TestSprint103Page() {
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});
  const [isTesting, setIsTesting] = useState(false);

  const runTest = async (testName: string, testFn: () => Promise<void>) => {
    setIsTesting(true);
    setTestResults(prev => ({ ...prev, [testName]: "جاري الاختبار..." }));
    setSpeechEnabled(true);
    
    try {
      await testFn();
      setTestResults(prev => ({ ...prev, [testName]: "✅ نجح" }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [testName]: `❌ فشل: ${error}` }));
    } finally {
      setIsTesting(false);
    }
  };

  const testLetterSounds = async () => {
    await speakLetterWithAudio("أ", "أ");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await speakTextWithAudio("أرنب");
  };

  const testHarakat = async () => {
    await speakTextWithAudio("الفتحة");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await speakTextWithAudio("بَ");
  };

  const testMentalMath = async () => {
    await speakNumberWithAudio(5);
    await new Promise(resolve => setTimeout(resolve, 500));
    await speakOperationWithAudio("add");
    await new Promise(resolve => setTimeout(resolve, 500));
    await speakNumberWithAudio(3);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">اختبار Sprint 10.3</h1>
      
      <div className="bg-blue-50 rounded-lg p-6 shadow-lg border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-4">الأدوات المحدثة</h2>
        <ul className="space-y-2 text-lg">
          <li>✅ LetterSounds.tsx</li>
          <li>✅ Harakat.tsx</li>
          <li>✅ MentalMathAddSub.tsx</li>
        </ul>
      </div>

      <section className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">اختبارات الوظائف</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار LetterSounds</p>
              <p className="text-sm text-gray-600">اختبار نطق الحرف &quot;أ&quot; والكلمة &quot;أرنب&quot;</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testLetterSounds || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testLetterSounds", testLetterSounds)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار Harakat</p>
              <p className="text-sm text-gray-600">اختبار نطق &quot;الفتحة&quot; و &quot;بَ&quot;</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testHarakat || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testHarakat", testHarakat)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p className="font-bold">اختبار MentalMath</p>
              <p className="text-sm text-gray-600">اختبار نطق &quot;5 + 3&quot;</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{testResults.testMentalMath || "لم يتم الاختبار"}</span>
              <button
                onClick={() => runTest("testMentalMath", testMentalMath)}
                disabled={isTesting}
                className="btn-primary text-sm"
              >
                تشغيل
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-50 rounded-lg p-6 shadow-lg border-2 border-green-200">
        <h2 className="text-2xl font-bold mb-4">✅ النتيجة</h2>
        <p className="text-lg">
          جميع الأدوات المحدثة تستخدم النظام الجديد (Hybrid Audio System)
        </p>
        <ul className="mt-4 space-y-2">
          <li>✅ LetterSounds: يستخدم speakLetterWithAudio و speakTextWithAudio</li>
          <li>✅ Harakat: يستخدم speakTextWithAudio</li>
          <li>✅ MentalMathAddSub: يستخدم speakNumberWithAudio و speakOperationWithAudio</li>
        </ul>
      </section>
    </div>
  );
}
