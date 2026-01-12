import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "متى أستخدم خطة 14 يوم؟ - Daleely.ai",
  description: "دليل شامل لمعرفة متى تستخدم خطة 14 يوم. أنواع الخطط، فوائدها، كيفية الاستخدام",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/when-use-14-day-plan",
  },
  openGraph: {
    title: "متى أستخدم خطة 14 يوم؟ - Daleely.ai",
    description: "دليل شامل لمعرفة متى تستخدم خطة 14 يوم",
    type: "article",
  },
};

export default function WhenUse14DayPlanPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "كم مرة نستخدم الأداة أسبوعياً؟",
      href: "/parents/faq/how-often-use-tool",
      description: "خطط 14 يوم تساعد في ضمان الانتظام",
    },
    {
      title: "خطة 14 يوم: تثبيت جدول الضرب",
      href: "/parents/14-day-plan/multiplication",
      description: "مثال على خطة 14 يوم",
    },
    {
      title: "خطة 14 يوم: تحسين القراءة العربية",
      href: "/parents/14-day-plan/arabic-reading",
      description: "مثال آخر على خطة 14 يوم",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "متى أستخدم خطة 14 يوم؟" },
      ]}
    >
      <ArticleTemplate
        title="متى أستخدم خطة 14 يوم؟"
        description="دليل شامل لمعرفة متى تستخدم خطة 14 يوم. أنواع الخطط، فوائدها، كيفية الاستخدام"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                استخدم خطة 14 يوم عندما تريد تحقيق هدف محدد (مثلاً:{" "}
                <Link href="/parents/14-day-plan/multiplication" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  تثبيت جدول الضرب
                </Link>
                ،{" "}
                <Link href="/parents/14-day-plan/arabic-reading" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  تحسين القراءة
                </Link>
                ،{" "}
                <Link href="/parents/14-day-plan/mental-math" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  تقوية الحساب الذهني
                </Link>
                ). الخطة توفر هيكل واضح ومتابعة يومية.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى تستخدم خطة 14 يوم؟</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ عندما تريد تحقيق هدف محدد</h3>
                  <p className="text-gray-700 text-sm">مثلاً: تثبيت جدول الضرب، تحسين القراءة</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ عندما تريد الانتظام</h3>
                  <p className="text-gray-700 text-sm">الخطة توفر هيكلاً واضحاً</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ عندما تريد متابعة يومية</h3>
                  <p className="text-gray-700 text-sm">كل يوم له نشاط محدد</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ عندما تريد نتائج سريعة</h3>
                  <p className="text-gray-700 text-sm">14 يوم كافية لتحقيق تقدم واضح</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أنواع خطط 14 يوم المتاحة</h2>
              <div className="space-y-4">
                <Link
                  href="/parents/14-day-plan/multiplication"
                  className="block bg-blue-50 p-6 rounded-lg border-r-4 border-blue-500 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">تثبيت جدول الضرب</h3>
                  <p className="text-gray-700">خطة يومية لمدة 14 يوم لتثبيت جدول الضرب بشكل دائم</p>
                </Link>
                <Link
                  href="/parents/14-day-plan/arabic-reading"
                  className="block bg-green-50 p-6 rounded-lg border-r-4 border-green-500 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">تحسين القراءة العربية</h3>
                  <p className="text-gray-700">خطة يومية لمدة 14 يوم لتحسين القراءة (حروف/حركات/مقاطع)</p>
                </Link>
                <Link
                  href="/parents/14-day-plan/mental-math"
                  className="block bg-purple-50 p-6 rounded-lg border-r-4 border-purple-500 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">تقوية الحساب الذهني</h3>
                  <p className="text-gray-700">خطة يومية لمدة 14 يوم لتقوية مهارات الحساب الذهني</p>
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">فوائد استخدام خطة 14 يوم</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>الهيكل:</strong> كل يوم له نشاط محدد</li>
                <li><strong>الانتظام:</strong> يضمن الممارسة اليومية</li>
                <li><strong>المتابعة:</strong> يمكن تتبع التقدم يومياً</li>
                <li><strong>الوضوح:</strong> يعرف الأهل والطفل ما يجب فعله</li>
                <li><strong>النتائج:</strong> 14 يوم كافية لتحقيق تقدم واضح</li>
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
