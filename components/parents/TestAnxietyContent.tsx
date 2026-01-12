"use client";

import Link from "next/link";
import ArticleExpandedContent from "./ArticleExpandedContent";

export default function TestAnxietyContent() {
  const relatedArticles = [
    {
      title: "طفلي يمل بسرعة",
      href: "/parents/common-problems/child-gets-bored",
      description: "الملل قد يكون سبباً في التوتر",
    },
    {
      title: "الفهم vs الحفظ",
      href: "/parents/common-problems/understanding-vs-memorization",
      description: "الفهم يقلل التوتر",
    },
    {
      title: "كيف أتعامل مع الأخطاء المتكررة؟",
      href: "/parents/tracking/common-mistakes",
      description: "تتبع الأخطاء يساعد في تقليل التوتر",
    },
  ];

  const additionalContent = {
    signs: [
      "يتعرق أو يرتجف قبل الاختبار",
      "يشتكي من الصداع أو آلام البطن",
      "لا يستطيع النوم ليلة الاختبار",
      "يرفض الذهاب للمدرسة يوم الاختبار",
      "يبكي أو يغضب عند ذكر الاختبار",
    ],
    whenToWorry: [
      "إذا كان التوتر يؤثر على صحته",
      "إذا كان التوتر يؤثر على أدائه في المدرسة",
      "إذا استمر التوتر لأكثر من شهر",
      "إذا كان التوتر مصحوباً بسلوك عدواني",
    ],
    preventionTips: [
      "غير المفهوم: &quot;لعبة&quot; بدلاً من &quot;اختبار&quot;",
      "ابدأ بأدوات سهلة لبناء الثقة",
      "لا تركز على النتيجة",
      "احتفل بالمحاولة وليس فقط النجاح",
      "مارس بانتظام لتقليل التوتر",
    ],
    advancedStrategies: [
      "استخدم تقنيات الاسترخاء",
      "علم الطفل التنفس العميق",
      "استخدم التصور الإيجابي",
      "كافئ الجهد وليس فقط النتيجة",
    ],
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        توتر الطفل من الاختبارات من المشاكل الشائعة. في هذا المقال، نستعرض حلول عملية يمكن تطبيقها فوراً.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا يتوتر الطفل من الاختبار؟</h2>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>خوف من الفشل</li>
          <li>ضغط من الأهل أو المعلم</li>
          <li>عدم الاستعداد الكافي</li>
          <li>تجربة سابقة سيئة</li>
          <li>عدم فهم أن الاختبار هو فرصة للتعلم</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خطة 5 دقائق</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li><strong>غير المفهوم:</strong> &quot;هذا ليس اختبار، هذا لعبة&quot; أو &quot;هذا تمرين فقط&quot;</li>
          <li><strong>ابدأ بسهل:</strong> استخدم أداة سهلة أولاً لبناء الثقة</li>
          <li><strong>لا تركز على النتيجة:</strong> &quot;المهم أن تحاول، وليس أن تحصل على 10/10&quot;</li>
          <li><strong>احتفل بالمحاولة:</strong> حتى لو أخطأ، احتفل بأنه حاول</li>
          <li><strong>مارس بانتظام:</strong> الممارسة المنتظمة تقلل التوتر</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">استراتيجيات فعالة</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">1. غير المفهوم</h3>
            <p className="text-gray-700 text-sm">&quot;لعبة&quot; بدلاً من &quot;اختبار&quot;</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">2. ابدأ بسهل</h3>
            <p className="text-gray-700 text-sm">استخدم أدوات سهلة لبناء الثقة</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">3. لا تركز على النتيجة</h3>
            <p className="text-gray-700 text-sm">المهم المحاولة وليس النتيجة</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">4. الممارسة المنتظمة</h3>
            <p className="text-gray-700 text-sm">الممارسة تقلل التوتر</p>
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
          ابدأ بأداة سهلة لبناء الثقة - مثلاً: &quot;جدول الضرب التفاعلي&quot; قبل &quot;اختبار جدول الضرب&quot;
        </p>
        <div className="space-y-3">
          <Link
            href="/tools/multiplication-table"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">جدول الضرب التفاعلي</h3>
            <p className="text-sm text-gray-600">ابدأ من هنا - أداة سهلة بدون ضغط</p>
          </Link>
          <Link
            href="/tools/multiplication-quiz"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">اختبار جدول الضرب</h3>
            <p className="text-sm text-gray-600">بعد بناء الثقة، جرب الاختبار</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
