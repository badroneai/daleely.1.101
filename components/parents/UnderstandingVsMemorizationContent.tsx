"use client";

import Link from "next/link";
import ArticleExpandedContent from "./ArticleExpandedContent";

export default function UnderstandingVsMemorizationContent() {
  const relatedArticles = [
    {
      title: "يحفظ ثم ينسى جدول الضرب",
      href: "/parents/common-problems/forgets-multiplication",
      description: "التركيز على الفهم يمنع النسيان",
    },
    {
      title: "طفلي يمل بسرعة",
      href: "/parents/common-problems/child-gets-bored",
      description: "الفهم يجعل التعلم ممتعاً",
    },
    {
      title: "خطة 14 يوم: تثبيت جدول الضرب",
      href: "/parents/14-day-plan/multiplication",
      description: "خطة تركز على الفهم وليس فقط الحفظ",
    },
  ];

  const additionalContent = {
    signs: [
      "يحفظ الإجابة لكن لا يستطيع شرحها",
      "ينسى بسرعة بعد الحفظ",
      "لا يستطيع استخدام المعلومة في مواقف جديدة",
      "يحتاج تذكير مستمر",
    ],
    whenToWorry: [
      "إذا استمر الطفل في الحفظ بدون فهم لأكثر من شهرين",
      "إذا كان الحفظ يؤثر على أدائه في المدرسة",
      "إذا كان الطفل يعاني من صعوبات في التعلم",
    ],
    preventionTips: [
      "اشرح السبب دائماً",
      "استخدم أمثلة من الحياة اليومية",
      "اطلب من الطفل شرح طريقة الحل",
      "استخدم الأدوات التفاعلية",
      "ركز على الفهم وليس فقط الحفظ",
    ],
    advancedStrategies: [
      "استخدم طريقة &quot;التعليم المتبادل&quot;",
      "اربط المفاهيم ببعضها",
      "استخدم الألعاب والأنشطة التفاعلية",
      "كافئ الفهم وليس فقط الحفظ",
    ],
    commonMistakes: [
      "التركيز على الحفظ فقط",
      "عدم شرح السبب",
      "الضغط على الطفل للحفظ السريع",
      "عدم استخدام أمثلة من الحياة",
    ],
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        الفهم والحفظ كلاهما مهم، لكن الفهم يدوم أطول. في هذا المقال، نستعرض الفرق وكيفية التركيز على الفهم في البيت.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ما الفرق بين الفهم والحفظ؟</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
            <h3 className="font-semibold text-gray-900 mb-2">الحفظ:</h3>
            <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
              <li>تذكر المعلومات بدون فهم</li>
              <li>ينسى بسرعة</li>
              <li>لا يستطيع التطبيق</li>
              <li>مثال: حفظ جدول الضرب بدون فهم</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-2">الفهم:</h3>
            <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
              <li>فهم المفهوم والسبب</li>
              <li>يدوم أطول</li>
              <li>يستطيع التطبيق</li>
              <li>مثال: فهم أن 3 × 4 = 3 + 3 + 3 + 3</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خطة 5 دقائق</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li><strong>اشرح السبب:</strong> &quot;3 × 4 يعني 3 مجموعات من 4&quot;</li>
          <li><strong>استخدم أمثلة:</strong> &quot;إذا كان لدينا 3 أكياس وكل كيس فيه 4 تفاحات...&quot;</li>
          <li><strong>اربط بالمألوف:</strong> ربط المفهوم بشيء يعرفه الطفل</li>
          <li><strong>دعه يشرح:</strong> &quot;اشرح لي كيف حصلت على هذه الإجابة&quot;</li>
          <li><strong>استخدم الأدوات التفاعلية:</strong> الأدوات تساعد في الفهم</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تركز على الفهم؟</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">1. اشرح السبب</h3>
            <p className="text-gray-700 text-sm">لماذا 3 × 4 = 12؟ اشرح المفهوم</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">2. استخدم أمثلة</h3>
            <p className="text-gray-700 text-sm">أمثلة من الحياة اليومية</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">3. دعه يشرح</h3>
            <p className="text-gray-700 text-sm">اطلب من الطفل شرح طريقة الحل</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">4. استخدم الأدوات</h3>
            <p className="text-gray-700 text-sm">الأدوات التفاعلية تساعد في الفهم</p>
          </div>
        </div>
      </section>

      <ArticleExpandedContent
        relatedArticles={relatedArticles}
        additionalContent={additionalContent}
      />

      <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ابدأ بهذه الأداة الآن</h2>
        <p className="text-gray-700 mb-4">
          استخدم الأدوات التفاعلية التي تساعد في الفهم وليس فقط الحفظ
        </p>
        <div className="space-y-3">
          <Link
            href="/tools/multiplication-table"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">جدول الضرب التفاعلي</h3>
            <p className="text-sm text-gray-600">يساعد في فهم الضرب وليس فقط حفظه</p>
          </Link>
          <Link
            href="/tools/mental-math-add-sub"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">الجمع والطرح الذهني</h3>
            <p className="text-sm text-gray-600">يساعد في فهم العمليات الحسابية</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
