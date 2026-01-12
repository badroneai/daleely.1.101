"use client";

import { useState } from "react";
import { getToolsByCategory } from "@/lib/tools";
import Link from "next/link";

export default function ChildGetsBoredContent() {
  const [expandedContent, setExpandedContent] = useState(false);
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "يرفض الحروف/الحركات",
      href: "/parents/common-problems/refuses-letters",
      description: "إذا كان طفلك يرفض التعلم، قد يكون السبب مشابه",
    },
    {
      title: "يتوتر من الاختبار",
      href: "/parents/common-problems/test-anxiety",
      description: "التوتر قد يكون سبباً في الملل السريع",
    },
    {
      title: "الفهم vs الحفظ",
      href: "/parents/common-problems/understanding-vs-memorization",
      description: "فهم الفرق بين الفهم والحفظ يساعد في حل مشكلة الملل",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        ملل الطفل السريع من التحديات الشائعة التي يواجهها الأهل. في هذا المقال، نستعرض حلول عملية يمكن تطبيقها فوراً.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا يمل الطفل بسرعة؟</h2>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>المحتوى صعب جداً أو سهل جداً</li>
          <li>الجلسة طويلة جداً</li>
          <li>عدم وجود تفاعل أو تحفيز</li>
          <li>التعب أو الجوع</li>
          <li>عدم وجود هدف واضح</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خطة 5 دقائق</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li><strong>اختصر الوقت:</strong> بدلاً من 15 دقيقة، جرب 5 دقائق فقط</li>
          <li><strong>غير الأداة:</strong> إذا كان يستخدم أداة الرياضيات، جرب أداة العربية</li>
          <li><strong>أضف تحفيز:</strong> &quot;إذا أكملت 5 مسائل، ستحصل على نقطة&quot;</li>
          <li><strong>اختر الوقت المناسب:</strong> ليس بعد الأكل مباشرة أو قبل النوم</li>
          <li><strong>اجعله ممتعاً:</strong> استخدم الصوت، احتفل بكل إجابة صحيحة</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">استراتيجيات فعالة</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">1. جلسات قصيرة متعددة</h3>
            <p className="text-gray-700 text-sm">5 دقائق 3 مرات أفضل من 15 دقيقة مرة واحدة</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">2. تغيير الأداة</h3>
            <p className="text-gray-700 text-sm">استخدم أدوات مختلفة كل يوم</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">3. نظام النقاط</h3>
            <p className="text-gray-700 text-sm">أعطِ نقطة لكل إجابة صحيحة</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">4. اختيار الوقت</h3>
            <p className="text-gray-700 text-sm">اختر وقتاً يكون فيه الطفل نشطاً</p>
          </div>
        </div>
      </section>

      {/* Expandable Content */}
      <section className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
        <button
          onClick={() => setExpandedContent(!expandedContent)}
          className="w-full text-right flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {expandedContent ? "إخفاء المحتوى الإضافي" : "اقرأ المزيد: حلول متقدمة"}
          </h2>
          <span className="text-2xl">{expandedContent ? "▲" : "▼"}</span>
        </button>
        {expandedContent && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                علامات تدل على أن الطفل يمل
              </h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>يبدأ بالتململ والحركة المستمرة</li>
                <li>ينظر بعيداً عن الشاشة أو الأداة</li>
                <li>يطلب الذهاب للحمام أو شرب الماء بشكل متكرر</li>
                <li>يشتكي من التعب أو الصداع</li>
                <li>يرفض الإجابة أو يقول &quot;لا أعرف&quot; بسرعة</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                متى يجب أن تقلق؟
              </h3>
              <p className="text-gray-700 mb-3">
                الملل العادي ليس مشكلة، لكن إذا استمر طفلك في رفض التعلم لأكثر من أسبوعين، قد تحتاج لاستشارة متخصص.
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>إذا رفض التعلم تماماً لأكثر من أسبوعين</li>
                <li>إذا كان الملل يؤثر على أدائه في المدرسة</li>
                <li>إذا كان الملل مصحوباً بسلوك عدواني</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                نصائح للوقاية من الملل
              </h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>تنويع الأنشطة يومياً</li>
                <li>استخدام نظام المكافآت بشكل متوازن</li>
                <li>جعل التعلم جزءاً من الروتين اليومي</li>
                <li>الاستماع لطفلك وفهم ما يحب وما لا يحب</li>
              </ul>
            </div>

            {/* Related Articles */}
            <div className="bg-primary-50 rounded-lg p-6 border-r-4 border-primary-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">مقالات ذات صلة</h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{article.title}</h4>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ابدأ بهذه الأداة الآن</h2>
        <p className="text-gray-700 mb-4">
          جرب أداة قصيرة وممتعة - مثلاً: &quot;تعلم الحروف العربية&quot; أو &quot;الجمع والطرح الذهني&quot;
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/tools/arabic-letters"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">تعلم الحروف العربية</h3>
            <p className="text-sm text-gray-600">أداة تفاعلية قصيرة وممتعة</p>
          </Link>
          <Link
            href="/tools/mental-math-add-sub"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">الجمع والطرح الذهني</h3>
            <p className="text-sm text-gray-600">تمارين سريعة وممتعة</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
