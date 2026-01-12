import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ما الفرق بين الحفظ والفهم؟ - Daleely.ai",
  description: "دليل شامل للفرق بين الحفظ والفهم في التعلم. كيف تركز على الفهم، نصائح عملية",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/understanding-vs-memorization",
  },
  openGraph: {
    title: "ما الفرق بين الحفظ والفهم؟ - Daleely.ai",
    description: "دليل شامل للفرق بين الحفظ والفهم في التعلم",
    type: "article",
  },
};

export default function UnderstandingVsMemorizationFAQPage() {
  const mathTools = getToolsByCategory("math");
  const arabicTools = getToolsByCategory("arabic");

  const relatedArticles = [
    {
      title: "يحفظ ثم ينسى جدول الضرب",
      href: "/parents/common-problems/forgets-multiplication",
      description: "التركيز على الفهم يمنع النسيان",
    },
    {
      title: "كيف أتعامل مع الأخطاء المتكررة؟",
      href: "/parents/faq/deal-with-repeated-errors",
      description: "الفهم يمنع الأخطاء المتكررة",
    },
    {
      title: "الفهم vs الحفظ (مقال مفصل)",
      href: "/parents/common-problems/understanding-vs-memorization",
      description: "مقال مفصل عن الفهم والحفظ",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "ما الفرق بين الحفظ والفهم؟" },
      ]}
    >
      <ArticleTemplate
        title="ما الفرق بين الحفظ والفهم؟"
        description="دليل شامل للفرق بين الحفظ والفهم في التعلم. كيف تركز على الفهم، نصائح عملية"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                الحفظ هو تذكر المعلومات بدون فهم (ينسى بسرعة)، بينما الفهم هو فهم المفهوم والسبب (يدوم أطول). راجع مقال{" "}
                <Link href="/parents/common-problems/understanding-vs-memorization" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  &quot;الفهم vs الحفظ&quot;
                </Link>{" "}
                لمعرفة كيفية التركيز على الفهم.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الفرق الأساسي</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
                  <h3 className="font-semibold text-gray-900 mb-2">الحفظ:</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>تذكر المعلومات بدون فهم</li>
                    <li>ينسى بسرعة (خلال أيام أو أسابيع)</li>
                    <li>لا يستطيع التطبيق</li>
                    <li>مثال: حفظ جدول الضرب بدون فهم</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">الفهم:</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>فهم المفهوم والسبب</li>
                    <li>يدوم أطول (شهور أو سنوات)</li>
                    <li>يستطيع التطبيق</li>
                    <li>مثال: فهم أن 3 × 4 = 3 + 3 + 3 + 3</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تعرف إذا كان الطفل يحفظ أم يفهم؟</h2>
              <div className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">علامات الحفظ:</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside mb-4">
                  <li>يحفظ الإجابة لكن لا يستطيع شرحها</li>
                  <li>ينسى بسرعة بعد الحفظ</li>
                  <li>لا يستطيع استخدام المعلومة في مواقف جديدة</li>
                  <li>يحتاج تذكير مستمر</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">علامات الفهم:</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>يستطيع شرح طريقة الحل</li>
                  <li>يتذكر المعلومة لفترة طويلة</li>
                  <li>يستطيع استخدام المعلومة في مواقف جديدة</li>
                  <li>مستقل في التعلم</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تركز على الفهم؟</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li><strong>اشرح السبب:</strong> &quot;3 × 4 يعني 3 مجموعات من 4&quot;</li>
                <li><strong>استخدم أمثلة:</strong> &quot;إذا كان لدينا 3 أكياس وكل كيس فيه 4 تفاحات...&quot;</li>
                <li><strong>اربط بالمألوف:</strong> ربط المفهوم بشيء يعرفه الطفل</li>
                <li><strong>دعه يشرح:</strong> &quot;اشرح لي كيف حصلت على هذه الإجابة&quot;</li>
                <li><strong>استخدم الأدوات التفاعلية:</strong> الأدوات تساعد في الفهم</li>
              </ol>
            </section>

            <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مقالات ذات صلة</h2>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ابدأ الآن</h2>
              <p className="text-gray-700 mb-4">
                راجع المقال المفصل:
              </p>
              <Link
                href="/parents/common-problems/understanding-vs-memorization"
                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-1">الفهم vs الحفظ (مقال مفصل)</h3>
                <p className="text-sm text-gray-600">مقال شامل عن الفهم والحفظ مع أمثلة عملية</p>
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
