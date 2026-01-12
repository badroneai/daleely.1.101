"use client";

import Link from "next/link";
import ArticleExpandedContent from "./ArticleExpandedContent";

export default function ForgetsMultiplicationContent() {
  const relatedArticles = [
    {
      title: "الفهم vs الحفظ",
      href: "/parents/common-problems/understanding-vs-memorization",
      description: "فهم الفرق بين الفهم والحفظ يساعد في حل مشكلة النسيان",
    },
    {
      title: "خطة 14 يوم: تثبيت جدول الضرب",
      href: "/parents/14-day-plan/multiplication",
      description: "خطة يومية جاهزة لتثبيت جدول الضرب",
    },
    {
      title: "طفلي يمل بسرعة",
      href: "/parents/common-problems/child-gets-bored",
      description: "الملل قد يكون سبباً في النسيان",
    },
  ];

  const additionalContent = {
    signs: [
      "يحفظ الجدول اليوم وينساه غداً",
      "يحتاج تذكير مستمر",
      "لا يستطيع استخدام الجدول في مسائل حقيقية",
      "يحفظ بدون فهم المفهوم",
    ],
    whenToWorry: [
      "إذا استمر النسيان لأكثر من شهرين",
      "إذا كان النسيان يؤثر على أدائه في المدرسة",
      "إذا كان الطفل يعاني من صعوبات في التعلم",
    ],
    preventionTips: [
      "ركز على الفهم وليس فقط الحفظ",
      "استخدم الجداول في مواقف حقيقية",
      "مارس يومياً لمدة 5-10 دقائق",
      "اربط الجداول ببعضها",
      "استخدم خطة 14 يوم الجاهزة",
    ],
    advancedStrategies: [
      "استخدم تقنية التكرار المتباعد",
      "اربط الجداول بأمثلة من الحياة اليومية",
      "استخدم الألعاب والأنشطة التفاعلية",
      "كافئ التقدم وليس فقط النتيجة",
    ],
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        نسيان جدول الضرب بعد الحفظ من المشاكل الشائعة. في هذا المقال، نستعرض حلول عملية يمكن تطبيقها فوراً.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا ينسى الطفل جدول الضرب؟</h2>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>الحفظ بدون فهم</li>
          <li>عدم الممارسة المنتظمة</li>
          <li>حفظ كل الجداول دفعة واحدة</li>
          <li>عدم الربط بين الجداول</li>
          <li>عدم استخدام الجداول في مواقف حقيقية</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خطة 5 دقائق</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li><strong>ابدأ بجدول واحد:</strong> ركز على جدول واحد حتى يتقنه تماماً</li>
          <li><strong>مارس يومياً:</strong> حتى لو 5 دقائق فقط - المهم الانتظام</li>
          <li><strong>استخدم الاختبار:</strong> استخدم أداة &quot;اختبار جدول الضرب&quot; لقياس الفهم</li>
          <li><strong>اربط الجداول:</strong> &quot;جدول 4 هو ضعف جدول 2&quot;</li>
          <li><strong>استخدم في الحياة:</strong> &quot;إذا كان لدينا 3 أكياس وكل كيس فيه 5 تفاحات، كم تفاحة لدينا؟&quot;</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">استراتيجيات فعالة</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">1. جدول واحد في كل مرة</h3>
            <p className="text-gray-700 text-sm">لا تحفظ كل الجداول دفعة واحدة</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">2. الممارسة المنتظمة</h3>
            <p className="text-gray-700 text-sm">5 دقائق يومياً أفضل من ساعة أسبوعياً</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">3. ربط الجداول</h3>
            <p className="text-gray-700 text-sm">جدول 4 = ضعف جدول 2</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">4. الاستخدام العملي</h3>
            <p className="text-gray-700 text-sm">استخدم الجداول في مواقف حقيقية</p>
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
          استخدم أداة &quot;جدول الضرب التفاعلي&quot; للممارسة و &quot;اختبار جدول الضرب&quot; للقياس
        </p>
        <div className="space-y-3">
          <Link
            href="/tools/multiplication-table"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">جدول الضرب التفاعلي</h3>
            <p className="text-sm text-gray-600">للممارسة اليومية - استمع وكرر</p>
          </Link>
          <Link
            href="/tools/multiplication-quiz"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">اختبار جدول الضرب</h3>
            <p className="text-sm text-gray-600">لقياس الفهم والتقدم</p>
          </Link>
          <Link
            href="/parents/14-day-plan/multiplication"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">خطة 14 يوم: تثبيت جدول الضرب</h3>
            <p className="text-sm text-gray-600">خطة يومية جاهزة لمدة 14 يوم</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
