"use client";

import { useState } from "react";

export default function CommonMistakesTracker() {
  const [childName, setChildName] = useState("");
  const [mathMistakes, setMathMistakes] = useState<
    Array<{ date: string; mistake: string; count: string; solution: string; improved: boolean | null }>
  >(Array.from({ length: 10 }, () => ({ date: "", mistake: "", count: "", solution: "", improved: null })));
  const [arabicMistakes, setArabicMistakes] = useState<
    Array<{ date: string; mistake: string; count: string; solution: string; improved: boolean | null }>
  >(Array.from({ length: 10 }, () => ({ date: "", mistake: "", count: "", solution: "", improved: null })));

  return (
    <div className="space-y-8">
      {/* Editable Form - Screen Only */}
      <div className="print:hidden space-y-6">
        <section className="bg-orange-50 rounded-lg p-6 border-r-4 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية الاستخدام</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>املأ المعلومات أدناه</li>
            <li>اكتب الخطأ الذي يكرره الطفل</li>
            <li>سجل عدد مرات تكرار الخطأ</li>
            <li>اكتب الحل أو الاستراتيجية المستخدمة</li>
            <li>راقب التحسن بمرور الوقت</li>
          </ul>
        </section>

        {/* Input Field */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات السجل</h2>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">اسم الطفل:</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="اكتب اسم الطفل"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              dir="rtl"
            />
          </div>
        </section>

        {/* Math Mistakes - Editable */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء الرياضيات</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 p-3 text-right">التاريخ</th>
                  <th className="border border-gray-300 p-3 text-right">الخطأ</th>
                  <th className="border border-gray-300 p-3 text-right">عدد المرات</th>
                  <th className="border border-gray-300 p-3 text-right">الحل/الاستراتيجية</th>
                  <th className="border border-gray-300 p-3 text-right">التحسن</th>
                </tr>
              </thead>
              <tbody>
                {mathMistakes.map((mistake, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={mistake.date}
                        onChange={(e) => {
                          const newMistakes = [...mathMistakes];
                          newMistakes[index].date = e.target.value;
                          setMathMistakes(newMistakes);
                        }}
                        placeholder="___/___/___"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={mistake.mistake}
                        onChange={(e) => {
                          const newMistakes = [...mathMistakes];
                          newMistakes[index].mistake = e.target.value;
                          setMathMistakes(newMistakes);
                        }}
                        placeholder="اكتب الخطأ"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <input
                        type="number"
                        value={mistake.count}
                        onChange={(e) => {
                          const newMistakes = [...mathMistakes];
                          newMistakes[index].count = e.target.value;
                          setMathMistakes(newMistakes);
                        }}
                        placeholder="___"
                        className="w-20 p-2 border border-gray-200 rounded text-center focus:border-primary-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={mistake.solution}
                        onChange={(e) => {
                          const newMistakes = [...mathMistakes];
                          newMistakes[index].solution = e.target.value;
                          setMathMistakes(newMistakes);
                        }}
                        placeholder="اكتب الحل"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            const newMistakes = [...mathMistakes];
                            newMistakes[index].improved = true;
                            setMathMistakes(newMistakes);
                          }}
                          className={`px-3 py-1 rounded text-sm ${
                            mistake.improved === true
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          تحسن
                        </button>
                        <button
                          onClick={() => {
                            const newMistakes = [...mathMistakes];
                            newMistakes[index].improved = false;
                            setMathMistakes(newMistakes);
                          }}
                          className={`px-3 py-1 rounded text-sm ${
                            mistake.improved === false
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          لم يتحسن
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Arabic Mistakes - Editable */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء اللغة العربية</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-gray-300 p-3 text-right">التاريخ</th>
                  <th className="border border-gray-300 p-3 text-right">الخطأ</th>
                  <th className="border border-gray-300 p-3 text-right">عدد المرات</th>
                  <th className="border border-gray-300 p-3 text-right">الحل/الاستراتيجية</th>
                  <th className="border border-gray-300 p-3 text-right">التحسن</th>
                </tr>
              </thead>
              <tbody>
                {arabicMistakes.map((mistake, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={mistake.date}
                        onChange={(e) => {
                          const newMistakes = [...arabicMistakes];
                          newMistakes[index].date = e.target.value;
                          setArabicMistakes(newMistakes);
                        }}
                        placeholder="___/___/___"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={mistake.mistake}
                        onChange={(e) => {
                          const newMistakes = [...arabicMistakes];
                          newMistakes[index].mistake = e.target.value;
                          setArabicMistakes(newMistakes);
                        }}
                        placeholder="اكتب الخطأ"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <input
                        type="number"
                        value={mistake.count}
                        onChange={(e) => {
                          const newMistakes = [...arabicMistakes];
                          newMistakes[index].count = e.target.value;
                          setArabicMistakes(newMistakes);
                        }}
                        placeholder="___"
                        className="w-20 p-2 border border-gray-200 rounded text-center focus:border-primary-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={mistake.solution}
                        onChange={(e) => {
                          const newMistakes = [...arabicMistakes];
                          newMistakes[index].solution = e.target.value;
                          setArabicMistakes(newMistakes);
                        }}
                        placeholder="اكتب الحل"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            const newMistakes = [...arabicMistakes];
                            newMistakes[index].improved = true;
                            setArabicMistakes(newMistakes);
                          }}
                          className={`px-3 py-1 rounded text-sm ${
                            mistake.improved === true
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          تحسن
                        </button>
                        <button
                          onClick={() => {
                            const newMistakes = [...arabicMistakes];
                            newMistakes[index].improved = false;
                            setArabicMistakes(newMistakes);
                          }}
                          className={`px-3 py-1 rounded text-sm ${
                            mistake.improved === false
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          لم يتحسن
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>لا تعاقب الطفل على الأخطاء - استخدمها كفرصة للتعلم</li>
            <li>ركز على الأخطاء المتكررة (3 مرات أو أكثر)</li>
            <li>استخدم استراتيجيات مختلفة لحل نفس المشكلة</li>
            <li>احتفل بالتحسن حتى لو كان صغيراً</li>
            <li>شارك السجل مع المعلم إذا لزم الأمر</li>
          </ul>
        </section>
      </div>

      {/* Print Version - Only the form */}
      <div className="hidden print:block">
        <div className="bg-white min-h-screen p-8">
          {/* Header */}
          <div className="mb-8 border-b-2 border-gray-300 pb-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-gray-900 mb-2">بسم الله الرحمن الرحيم</p>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">سجل الأخطاء الشائعة</h1>
              </div>
            </div>
          </div>

          {/* Form Info */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              <strong>اسم الطفل:</strong> {childName || "_________________"}
            </p>
          </div>

          {/* Math Mistakes Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء الرياضيات</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 p-3 text-right">التاريخ</th>
                    <th className="border border-gray-300 p-3 text-right">الخطأ</th>
                    <th className="border border-gray-300 p-3 text-right">عدد المرات</th>
                    <th className="border border-gray-300 p-3 text-right">الحل/الاستراتيجية</th>
                    <th className="border border-gray-300 p-3 text-right">التحسن</th>
                  </tr>
                </thead>
                <tbody>
                  {mathMistakes.map((mistake, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">
                        {mistake.date || "___/___/___"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {mistake.mistake || "_________________"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {mistake.count || "___"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {mistake.solution || "_________________"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {mistake.improved === true
                          ? "✓ تحسن"
                          : mistake.improved === false
                          ? "✗ لم يتحسن"
                          : "☐ تحسن ☐ لم يتحسن"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Arabic Mistakes Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء اللغة العربية</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 p-3 text-right">التاريخ</th>
                    <th className="border border-gray-300 p-3 text-right">الخطأ</th>
                    <th className="border border-gray-300 p-3 text-right">عدد المرات</th>
                    <th className="border border-gray-300 p-3 text-right">الحل/الاستراتيجية</th>
                    <th className="border border-gray-300 p-3 text-right">التحسن</th>
                  </tr>
                </thead>
                <tbody>
                  {arabicMistakes.map((mistake, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">
                        {mistake.date || "___/___/___"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {mistake.mistake || "_________________"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {mistake.count || "___"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {mistake.solution || "_________________"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {mistake.improved === true
                          ? "✓ تحسن"
                          : mistake.improved === false
                          ? "✗ لم يتحسن"
                          : "☐ تحسن ☐ لم يتحسن"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
