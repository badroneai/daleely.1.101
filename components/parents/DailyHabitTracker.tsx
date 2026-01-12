"use client";

import { useState } from "react";

export default function DailyHabitTracker() {
  const [childName, setChildName] = useState("");
  const [month, setMonth] = useState("");
  const [completedDays, setCompletedDays] = useState<Record<number, { checked: boolean; tool: string }>>({});
  const [weeklyGoals, setWeeklyGoals] = useState<Record<string, { completed: string; reward: string }>>({
    "الأسبوع 1": { completed: "", reward: "" },
    "الأسبوع 2": { completed: "", reward: "" },
    "الأسبوع 3": { completed: "", reward: "" },
    "الأسبوع 4": { completed: "", reward: "" },
  });

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const totalCompleted = Object.values(completedDays).filter((d) => d.checked).length;

  return (
    <div className="space-y-8">
      {/* Editable Form - Screen Only */}
      <div className="print:hidden space-y-6">
        <section className="bg-pink-50 rounded-lg p-6 border-r-4 border-pink-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية الاستخدام</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>املأ المعلومات أدناه</li>
            <li>ضع علامة ✓ في اليوم الذي أكمل فيه الطفل 10 دقائق من التعلم</li>
            <li>اكتب اسم الأداة المستخدمة في كل يوم</li>
            <li>احتفل عند إكمال أسبوع كامل (7 أيام متتالية)</li>
            <li>الهدف: 20 يوم على الأقل في الشهر</li>
          </ul>
        </section>

        {/* Input Fields */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات السجل</h2>
          <div className="grid md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2">الشهر:</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="اكتب اسم الشهر"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                dir="rtl"
              />
            </div>
          </div>
        </section>

        {/* Monthly Tracker - Editable */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">سجل 30 يوم</h2>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div
                key={day}
                className="border-2 border-gray-300 p-3 rounded-lg text-center"
              >
                <div className="font-semibold text-gray-900 mb-2">{day}</div>
                <button
                  onClick={() =>
                    setCompletedDays({
                      ...completedDays,
                      [day]: {
                        checked: !completedDays[day]?.checked,
                        tool: completedDays[day]?.tool || "",
                      },
                    })
                  }
                  className="text-2xl mb-2 w-full"
                >
                  {completedDays[day]?.checked ? "✓" : "☐"}
                </button>
                <input
                  type="text"
                  value={completedDays[day]?.tool || ""}
                  onChange={(e) =>
                    setCompletedDays({
                      ...completedDays,
                      [day]: {
                        checked: completedDays[day]?.checked || false,
                        tool: e.target.value,
                      },
                    })
                  }
                  placeholder="اسم الأداة"
                  className="w-full text-xs p-1 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                  dir="rtl"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              <strong>عدد الأيام المكتملة:</strong> {totalCompleted} / 30
            </p>
          </div>
        </section>

        {/* Weekly Goals - Editable */}
        <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">أهداف الأسبوع</h2>
          <div className="grid grid-cols-4 gap-4">
            {["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"].map((week) => (
              <div key={week} className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">{week}</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">الأيام المكتملة:</label>
                    <input
                      type="text"
                      value={weeklyGoals[week]?.completed || ""}
                      onChange={(e) =>
                        setWeeklyGoals({
                          ...weeklyGoals,
                          [week]: {
                            ...weeklyGoals[week],
                            completed: e.target.value,
                          },
                        })
                      }
                      placeholder="___ / 7"
                      className="w-full p-2 text-sm border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">المكافأة:</label>
                    <input
                      type="text"
                      value={weeklyGoals[week]?.reward || ""}
                      onChange={(e) =>
                        setWeeklyGoals({
                          ...weeklyGoals,
                          [week]: {
                            ...weeklyGoals[week],
                            reward: e.target.value,
                          },
                        })
                      }
                      placeholder="اكتب المكافأة"
                      className="w-full p-2 text-sm border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح لبناء العادة</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>اختر وقتاً ثابتاً كل يوم (مثلاً: بعد العشاء)</li>
            <li>ابدأ صغيراً - حتى 5 دقائق كافية في البداية</li>
            <li>استخدم نفس المكان كل يوم لخلق روتين</li>
            <li>احتفل بكل يوم مكتمل - حتى لو كان صغيراً</li>
            <li>لا تقلق إذا فات يوم - استمر في اليوم التالي</li>
            <li>الهدف هو الانتظام وليس الكمال</li>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">تتبع عادة 10 دقائق يومياً</h1>
              </div>
            </div>
          </div>

          {/* Form Info */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>اسم الطفل:</strong> {childName || "_________________"}
            </p>
            <p className="text-gray-700">
              <strong>الشهر:</strong> {month || "_________________"}
            </p>
          </div>

          {/* Tracker Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">سجل 30 يوم</h2>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="border-2 border-gray-300 p-3 rounded-lg text-center"
                >
                  <div className="font-semibold text-gray-900 mb-2">{day}</div>
                  <div className="text-2xl mb-2">
                    {completedDays[day]?.checked ? "✓" : "☐"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {completedDays[day]?.tool || "_________________"}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>عدد الأيام المكتملة:</strong> {totalCompleted || "___"} / 30
              </p>
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="mb-8 bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أهداف الأسبوع</h2>
            <div className="grid grid-cols-4 gap-4">
              {["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"].map((week) => (
                <div key={week} className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">{week}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    الأيام المكتملة: {weeklyGoals[week]?.completed || "___"} / 7
                  </p>
                  <p className="text-sm text-gray-600">
                    المكافأة: {weeklyGoals[week]?.reward || "_________________"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
