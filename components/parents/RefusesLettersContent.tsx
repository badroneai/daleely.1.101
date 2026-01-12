"use client";

import Link from "next/link";
import ArticleExpandedContent from "./ArticleExpandedContent";

export default function RefusesLettersContent() {
  const relatedArticles = [
    {
      title: "طفلي يمل بسرعة",
      href: "/parents/common-problems/child-gets-bored",
      description: "الملل قد يكون سبباً في رفض التعلم",
    },
    {
      title: "يتوتر من الاختبار",
      href: "/parents/common-problems/test-anxiety",
      description: "التوتر قد يؤدي لرفض التعلم",
    },
    {
      title: "خطة 14 يوم: تحسين القراءة العربية",
      href: "/parents/14-day-plan/arabic-reading",
      description: "خطة يومية جاهزة لتحسين القراءة",
    },
  ];

  const additionalContent = {
    signs: [
      "يرفض فتح الكتاب أو الأداة",
      "يشتكي من الصداع أو التعب عند رؤية الحروف",
      "يطلب الذهاب للحمام بشكل متكرر",
      "يبكي أو يغضب عند محاولة تعليمه",
      "يقول &quot;لا أستطيع&quot; قبل المحاولة",
    ],
    whenToWorry: [
      "إذا استمر الرفض لأكثر من شهر",
      "إذا كان الرفض يؤثر على أدائه في المدرسة",
      "إذا كان الرفض مصحوباً بسلوك عدواني",
      "إذا كان الطفل يعاني من صعوبات في التعلم",
    ],
    preventionTips: [
      "ابدأ بالصوت قبل الحروف",
      "استخدم الألعاب والأنشطة التفاعلية",
      "كافئ كل تقدم صغير",
      "لا تجبر الطفل على التعلم",
      "استخدم الأدوات التفاعلية بدلاً من الكتب",
    ],
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        رفض الطفل للحروف والحركات من المشاكل الشائعة. في هذا المقال، نستعرض حلول عملية يمكن تطبيقها فوراً.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا يرفض الطفل الحروف/الحركات؟</h2>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>صعوبة المادة بالنسبة له</li>
          <li>عدم فهم الهدف من التعلم</li>
          <li>خوف من الفشل</li>
          <li>عدم وجود تحفيز</li>
          <li>الضغط الزائد من الأهل</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خطة 5 دقائق</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li><strong>ابدأ بالصوت:</strong> استخدم أداة &quot;أصوات الحروف&quot; - أسهل من الحروف نفسها</li>
          <li><strong>اجعله لعبة:</strong> &quot;دعنا نلعب لعبة الحروف&quot; بدلاً من &quot;دعنا نتعلم الحروف&quot;</li>
          <li><strong>ابدأ بحرف واحد:</strong> لا تجبره على تعلم كل الحروف دفعة واحدة</li>
          <li><strong>استخدم المكافآت:</strong> &quot;إذا تعلمت حرفاً واحداً، ستحصل على...&quot;</li>
          <li><strong>لا تجبره:</strong> إذا رفض تماماً، انتظر وعد في وقت آخر</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">استراتيجيات فعالة</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">1. ابدأ بالصوت</h3>
            <p className="text-gray-700 text-sm">أصوات الحروف أسهل من الحروف نفسها</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">2. اجعله لعبة</h3>
            <p className="text-gray-700 text-sm">استخدم كلمة &quot;لعب&quot; بدلاً من &quot;تعلم&quot;</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">3. حرف واحد فقط</h3>
            <p className="text-gray-700 text-sm">لا تجبره على تعلم كل الحروف دفعة واحدة</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">4. المكافآت</h3>
            <p className="text-gray-700 text-sm">كافئ كل تقدم صغير</p>
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
          ابدأ بأداة &quot;أصوات الحروف&quot; - أسهل من الحروف نفسها وأكثر متعة
        </p>
        <div className="space-y-3">
          <Link
            href="/tools/letter-sounds"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">أصوات الحروف</h3>
            <p className="text-sm text-gray-600">أداة سهلة وممتعة - ابدأ من هنا</p>
          </Link>
          <Link
            href="/tools/arabic-letters"
            className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">تعلم الحروف العربية</h3>
            <p className="text-sm text-gray-600">بعد إتقان الأصوات، انتقل للحروف</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
