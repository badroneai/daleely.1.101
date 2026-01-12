import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "هل يمكن استخدام أكثر من أداة في نفس اليوم؟ - Daleely.ai",
  description: "دليل شامل لاستخدام عدة أدوات في نفس اليوم. نصائح عملية، فوائد، ومحاذير",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/multiple-tools-same-day",
  },
  openGraph: {
    title: "هل يمكن استخدام أكثر من أداة في نفس اليوم؟ - Daleely.ai",
    description: "دليل شامل لاستخدام عدة أدوات في نفس اليوم",
    type: "article",
  },
};

export default function MultipleToolsSameDayPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "كم مرة نستخدم الأداة أسبوعياً؟",
      href: "/parents/faq/how-often-use-tool",
      description: "عدد المرات مرتبط بعدد الأدوات",
    },
    {
      title: "كم من الوقت يجب أن تستغرق الجلسة؟",
      href: "/parents/faq/how-long-session",
      description: "مدة الجلسة مهمة عند استخدام عدة أدوات",
    },
    {
      title: "كيف أوازن بين التعلم والشاشة؟",
      href: "/parents/faq/balance-learning-screen",
      description: "التوازن مهم عند استخدام عدة أدوات",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "هل يمكن استخدام أكثر من أداة في نفس اليوم؟" },
      ]}
    >
      <ArticleTemplate
        title="هل يمكن استخدام أكثر من أداة في نفس اليوم؟"
        description="دليل شامل لاستخدام عدة أدوات في نفس اليوم. نصائح عملية، فوائد، ومحاذير"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                نعم، لكن لا تجعل الجلسات متتالية. اترك فاصل زمني بين الجلسات. الأفضل: أداة واحدة في الصباح وأخرى في المساء. استخدم{" "}
                <Link href="/parents/tracking/weekly-points" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  لوحة المتابعة
                </Link>{" "}
                لتتبع الاستخدام.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">فوائد استخدام عدة أدوات في نفس اليوم</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>التنويع:</strong> يمنع الملل</li>
                <li><strong>التكامل:</strong> أدوات مختلفة تكمل بعضها</li>
                <li><strong>المرونة:</strong> يمكن التكيف مع جدول الطفل</li>
                <li><strong>التقدم السريع:</strong> يمكن تحقيق تقدم في عدة مجالات</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تستخدم عدة أدوات بشكل صحيح؟</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">قواعد الاستخدام الصحيح</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>اترك فاصل زمني:</strong> على الأقل ساعتين بين الجلسات
                  </li>
                  <li>
                    <strong>استخدم أدوات مختلفة:</strong> مثلاً: أداة رياضيات في الصباح، أداة عربية في المساء
                  </li>
                  <li>
                    <strong>لا تجعل الجلسات متتالية:</strong> لا تستخدم أداة مباشرة بعد الأخرى
                  </li>
                  <li>
                    <strong>راقب التعب:</strong> إذا كان الطفل متعباً، استخدم أداة واحدة فقط
                  </li>
                  <li>
                    <strong>استخدم لوحة المتابعة:</strong> لتتبع الاستخدام
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أمثلة على جداول يومية</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">مثال 1: طفل صغير (6-8 سنوات)</h3>
                  <ul className="text-gray-700 space-y-1 list-disc list-inside">
                    <li>الصباح (8:00): أداة عربية - 5 دقائق</li>
                    <li>المساء (6:00): أداة رياضيات - 5 دقائق</li>
                    <li><strong>المجموع:</strong> 10 دقائق موزعة على يوم</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">مثال 2: طفل متوسط (9-10 سنوات)</h3>
                  <ul className="text-gray-700 space-y-1 list-disc list-inside">
                    <li>الصباح (7:30): أداة رياضيات - 10 دقائق</li>
                    <li>المساء (5:00): أداة عربية - 10 دقائق</li>
                    <li><strong>المجموع:</strong> 20 دقيقة موزعة على يوم</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى لا تستخدم عدة أدوات؟</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>عندما يكون الطفل متعباً</li>
                <li>عندما يكون الطفل مريضاً</li>
                <li>عندما يكون الطفل مشغولاً</li>
                <li>عندما يكون الطفل يرفض الاستخدام</li>
                <li>عندما تكون الجلسة الأولى طويلة</li>
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
          </div>
        }
      />
    </PageLayout>
  );
}
