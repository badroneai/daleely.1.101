"use client";

import { useState } from "react";

export default function WeeklyPointsTracker() {
  const [childName, setChildName] = useState("");
  const [weekFrom, setWeekFrom] = useState("");
  const [weekTo, setWeekTo] = useState("");
  const [activities, setActivities] = useState<Record<string, { activity: string; points: string; notes: string }>>({
    السبت: { activity: "", points: "", notes: "" },
    الأحد: { activity: "", points: "", notes: "" },
    الاثنين: { activity: "", points: "", notes: "" },
    الثلاثاء: { activity: "", points: "", notes: "" },
    الأربعاء: { activity: "", points: "", notes: "" },
    الخميس: { activity: "", points: "", notes: "" },
    الجمعة: { activity: "", points: "", notes: "" },
  });
  const [goal, setGoal] = useState("");
  const [reward, setReward] = useState("");

  const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

  const totalPoints = days.reduce((sum, day) => {
    const points = parseInt(activities[day]?.points || "0");
    return sum + (isNaN(points) ? 0 : points);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Editable Form - Screen Only */}
      <div className="print:hidden space-y-6">
        <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية الاستخدام</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>املأ المعلومات أدناه</li>
            <li>اكتب اسم الطفل والأسبوع</li>
            <li>أعطِ نقطة لكل جلسة تعلم (5-10 دقائق)</li>
            <li>أعطِ نقطة إضافية للإجابات الصحيحة (80% أو أكثر)</li>
            <li>احتفل عند الوصول لهدف الأسبوع</li>
          </ul>
        </section>

        {/* Input Fields */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات الجدول</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
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
              <label className="block text-gray-700 font-semibold mb-2">الأسبوع:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={weekFrom}
                  onChange={(e) => setWeekFrom(e.target.value)}
                  placeholder="من"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  dir="rtl"
                />
                <span className="self-center text-gray-600">إلى</span>
                <input
                  type="text"
                  value={weekTo}
                  onChange={(e) => setWeekTo(e.target.value)}
                  placeholder="إلى"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Table - Editable */}
        <section className="bg-white rounded-lg p-6 border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">جدول النقاط الأسبوعي</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-primary-100">
                  <th className="border border-gray-300 p-3 text-right">اليوم</th>
                  <th className="border border-gray-300 p-3 text-right">النشاط</th>
                  <th className="border border-gray-300 p-3 text-right">النقاط</th>
                  <th className="border border-gray-300 p-3 text-right">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border border-gray-300 p-3 font-semibold">{day}</td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={activities[day]?.activity || ""}
                        onChange={(e) =>
                          setActivities({
                            ...activities,
                            [day]: { ...activities[day], activity: e.target.value },
                          })
                        }
                        placeholder="اكتب النشاط"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <input
                        type="number"
                        value={activities[day]?.points || ""}
                        onChange={(e) =>
                          setActivities({
                            ...activities,
                            [day]: { ...activities[day], points: e.target.value },
                          })
                        }
                        placeholder="0"
                        className="w-20 p-2 border border-gray-200 rounded text-center focus:border-primary-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        value={activities[day]?.notes || ""}
                        onChange={(e) =>
                          setActivities({
                            ...activities,
                            [day]: { ...activities[day], notes: e.target.value },
                          })
                        }
                        placeholder="اكتب الملاحظات"
                        className="w-full p-2 border border-gray-200 rounded focus:border-primary-500 focus:outline-none"
                        dir="rtl"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={2} className="border border-gray-300 p-3 text-right">المجموع:</td>
                  <td className="border border-gray-300 p-3 text-center">{totalPoints}</td>
                  <td className="border border-gray-300 p-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Goals Section - Editable */}
        <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">أهداف الأسبوع</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-gray-700 font-semibold mb-2">الهدف الأساسي:</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="مثلاً: 20 نقطة"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                dir="rtl"
              />
              <p className="text-gray-600 text-sm mt-2">(مثلاً: 20 نقطة = 4 جلسات × 5 أيام)</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-gray-700 font-semibold mb-2">المكافأة عند الوصول للهدف:</label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="مثلاً: رحلة إلى الحديقة"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                dir="rtl"
              />
              <p className="text-gray-600 text-sm mt-2">
                (مثلاً: رحلة إلى الحديقة، لعبة مفضلة، وقت إضافي للعب)
              </p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>ضع الجدول في مكان واضح (مثلاً: على الثلاجة)</li>
            <li>املأ النقاط مباشرة بعد كل جلسة</li>
            <li>احتفل بالإنجازات الصغيرة</li>
            <li>لا تجعل الهدف صعباً جداً - الأهم هو الانتظام</li>
            <li>استخدم الملاحظات لتتبع التقدم والمشاكل</li>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">جدول نقاط أسبوعي</h1>
              </div>
            </div>
          </div>

          {/* Form Info */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>اسم الطفل:</strong> {childName || "_________________"}
            </p>
            <p className="text-gray-700">
              <strong>الأسبوع:</strong> من {weekFrom || "_______"} إلى {weekTo || "_______"}
            </p>
          </div>

          {/* Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-primary-100">
                  <th className="border border-gray-300 p-3 text-right">اليوم</th>
                  <th className="border border-gray-300 p-3 text-right">النشاط</th>
                  <th className="border border-gray-300 p-3 text-right">النقاط</th>
                  <th className="border border-gray-300 p-3 text-right">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border border-gray-300 p-3 font-semibold">{day}</td>
                    <td className="border border-gray-300 p-3">
                      {activities[day]?.activity || "_________________"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {activities[day]?.points || "___"}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {activities[day]?.notes || "_________________"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={2} className="border border-gray-300 p-3 text-right">المجموع:</td>
                  <td className="border border-gray-300 p-3 text-center">{totalPoints || "___"}</td>
                  <td className="border border-gray-300 p-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Goals */}
          <div className="mb-8 bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أهداف الأسبوع</h2>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>الهدف الأساسي:</strong> {goal || "_______"} نقطة
                </p>
                <p className="text-gray-600 text-sm">(مثلاً: 20 نقطة = 4 جلسات × 5 أيام)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>المكافأة عند الوصول للهدف:</strong> {reward || "_________________"}
                </p>
                <p className="text-gray-600 text-sm">
                  (مثلاً: رحلة إلى الحديقة، لعبة مفضلة، وقت إضافي للعب)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
