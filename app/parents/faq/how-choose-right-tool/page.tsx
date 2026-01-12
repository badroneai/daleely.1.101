import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كيف أختار الأداة المناسبة لطفلي؟ - Daleely.ai",
  description: "دليل شامل لاختيار الأداة التعليمية المناسبة. حسب العمر، المستوى، الهدف، والوقت",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/how-choose-right-tool",
  },
  openGraph: {
    title: "كيف أختار الأداة المناسبة لطفلي؟ - Daleely.ai",
    description: "دليل شامل لاختيار الأداة التعليمية المناسبة",
    type: "article",
  },
};

export default function HowChooseRightToolPage() {
  const mathTools = getToolsByCategory("math");
  const arabicTools = getToolsByCategory("arabic");

  const relatedArticles = [
    {
      title: "متى أرفع المستوى؟",
      href: "/parents/faq/when-raise-level",
      description: "اختيار المستوى المناسب جزء من اختيار الأداة",
    },
    {
      title: "دليل اختيار الأداة",
      href: "/parents/tool-selector",
      description: "استخدم الدليل التفاعلي لاختيار الأداة",
    },
    {
      title: "كم مرة نستخدم الأداة أسبوعياً؟",
      href: "/parents/faq/how-often-use-tool",
      description: "عدد المرات مرتبط باختيار الأداة",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "كيف أختار الأداة المناسبة لطفلي؟" },
      ]}
    >
      <ArticleTemplate
        title="كيف أختار الأداة المناسبة لطفلي؟"
        description="دليل شامل لاختيار الأداة التعليمية المناسبة. حسب العمر، المستوى، الهدف، والوقت"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                استخدم{" "}
                <Link href="/parents/tool-selector" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  دليل اختيار الأداة
                </Link>
                . اختر: عمر الطفل/الصف، مستوى الطفل (مبتدئ/متوسط/متقدم)، الهدف (مراجعة/تأسيس/إثراء)، والوقت المتاح. ستحصل على توصية مباشرة.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">العوامل الأربعة لاختيار الأداة</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2">1. عمر الطفل/الصف</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>6-8 سنوات: أدوات بسيطة ومرئية</li>
                    <li>9-10 سنوات: أدوات متوسطة</li>
                    <li>11-12 سنة: أدوات متقدمة</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">2. مستوى الطفل</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>مبتدئ: أدوات أساسية</li>
                    <li>متوسط: أدوات متوسطة</li>
                    <li>متقدم: أدوات إثراء</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                  <h3 className="font-semibold text-gray-900 mb-2">3. الهدف</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>مراجعة: أدوات سريعة</li>
                    <li>تأسيس: أدوات أساسية</li>
                    <li>إثراء: أدوات متقدمة</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">4. الوقت المتاح</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>3 دقائق: أدوات سريعة</li>
                    <li>10 دقائق: أدوات متوسطة</li>
                    <li>15 دقيقة: أدوات شاملة</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تستخدم دليل اختيار الأداة؟</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>اذهب إلى دليل اختيار الأداة:</strong>{" "}
                    <Link href="/parents/tool-selector" className="text-primary-700 hover:text-primary-800 underline">
                      /parents/tool-selector
                    </Link>
                  </li>
                  <li>
                    <strong>اختر العوامل الأربعة:</strong> العمر، المستوى، الهدف، الوقت
                  </li>
                  <li>
                    <strong>احصل على التوصية:</strong> ستحصل على توصية مباشرة بأداة أو أداتين
                  </li>
                  <li>
                    <strong>اقرأ المنهجية:</strong> كل أداة لها منهجية واضحة
                  </li>
                  <li>
                    <strong>ابدأ الاستخدام:</strong> ابدأ باستخدام الأداة الموصى بها
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عملية</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>ابدأ بسيطاً:</strong> ابدأ بأدوات بسيطة ثم تدرج</li>
                <li><strong>راقب التقدم:</strong> راقب كيف يتفاعل الطفل مع الأداة</li>
                <li><strong>كن مرناً:</strong> إذا لم تنجح أداة، جرب أخرى</li>
                <li><strong>استخدم التنويع:</strong> استخدم أدوات مختلفة كل يوم</li>
                <li><strong>استشر المعلم:</strong> المعلم يعرف مستوى الطفل</li>
              </ul>
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
                استخدم دليل اختيار الأداة:
              </p>
              <Link
                href="/parents/tool-selector"
                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-1">دليل اختيار الأداة</h3>
                <p className="text-sm text-gray-600">اختر الأداة المناسبة لطفلك في دقائق</p>
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
