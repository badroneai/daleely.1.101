import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كيف أعرف أن الطفل فعلاً تحسن؟ - Daleely.ai",
  description: "دليل شامل لمعرفة علامات تحسن الطفل في التعلم. مؤشرات التقدم، نصائح عملية",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/how-know-improved",
  },
  openGraph: {
    title: "كيف أعرف أن الطفل فعلاً تحسن؟ - Daleely.ai",
    description: "دليل شامل لمعرفة علامات تحسن الطفل في التعلم",
    type: "article",
  },
};

export default function HowKnowImprovedPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "متى أرفع المستوى؟",
      href: "/parents/faq/when-raise-level",
      description: "معرفة التقدم يساعد في تحديد وقت رفع المستوى",
    },
    {
      title: "كيف أتعامل مع الأخطاء المتكررة؟",
      href: "/parents/faq/deal-with-repeated-errors",
      description: "تتبع الأخطاء يساعد في قياس التقدم",
    },
    {
      title: "كم مرة نستخدم الأداة أسبوعياً؟",
      href: "/parents/faq/how-often-use-tool",
      description: "الانتظام يساعد في قياس التقدم",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "كيف أعرف أن الطفل فعلاً تحسن؟" },
      ]}
    >
      <ArticleTemplate
        title="كيف أعرف أن الطفل فعلاً تحسن؟"
        description="دليل شامل لمعرفة علامات تحسن الطفل في التعلم. مؤشرات التقدم، نصائح عملية"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                راقب: سرعة الإجابة، ثقة الطفل، قلة الأخطاء، ورغبته في الممارسة. استخدم{" "}
                <Link href="/parents/tracking/weekly-points" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  لوحة المتابعة المنزلية
                </Link>{" "}
                لتتبع التقدم بشكل منتظم.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">علامات التحسن الواضحة</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ سرعة الإجابة</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل يجيب بسرعة أكبر من قبل</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ الثقة</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل واثقاً من إجاباته</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ قلة الأخطاء</h3>
                  <p className="text-gray-700 text-sm">إذا كان عدد الأخطاء أقل من قبل</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ الرغبة في الممارسة</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل يطلب الممارسة بنفسه</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تقيس التقدم بدقة؟</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">استخدم لوحة المتابعة</h3>
                <p className="text-gray-700 mb-4">
                  أفضل طريقة لقياس التقدم هي استخدام{" "}
                  <Link href="/parents/tracking/weekly-points" className="text-primary-700 hover:text-primary-800 underline font-medium">
                    جدول النقاط الأسبوعي
                  </Link>{" "}
                  أو{" "}
                  <Link href="/parents/tracking/common-mistakes" className="text-primary-700 hover:text-primary-800 underline font-medium">
                    سجل الأخطاء الشائعة
                  </Link>
                  . سجل:
                </p>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>عدد الإجابات الصحيحة كل أسبوع</li>
                  <li>عدد الأخطاء كل أسبوع</li>
                  <li>الوقت المستغرق في كل جلسة</li>
                  <li>مستوى الثقة (من 1 إلى 10)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مؤشرات التقدم على المدى القصير (أسبوع-شهر)</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>زيادة عدد الإجابات الصحيحة</li>
                <li>تقليل الوقت المستغرق</li>
                <li>زيادة الثقة في الإجابة</li>
                <li>تقليل الاعتماد على المساعدة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مؤشرات التقدم على المدى الطويل (شهر-3 أشهر)</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>إتقان المهارة (80% أو أكثر)</li>
                <li>القدرة على التطبيق في مواقف جديدة</li>
                <li>الاستقلالية في التعلم</li>
                <li>الرغبة في التحدي</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء شائعة في قياس التقدم</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>التركيز على النتيجة فقط:</strong> المهم هو التقدم وليس النتيجة المثالية</li>
                <li><strong>المقارنة مع الآخرين:</strong> كل طفل له سرعته الخاصة</li>
                <li><strong>عدم الصبر:</strong> التقدم يحتاج وقت</li>
                <li><strong>عدم التسجيل:</strong> بدون تسجيل، لا يمكنك قياس التقدم بدقة</li>
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
                استخدم هذه الموارد لتتبع التقدم:
              </p>
              <div className="space-y-3">
                <Link
                  href="/parents/tracking/weekly-points"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">جدول النقاط الأسبوعي</h3>
                  <p className="text-sm text-gray-600">تتبع التقدم أسبوعياً</p>
                </Link>
                <Link
                  href="/parents/tracking/common-mistakes"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">سجل الأخطاء الشائعة</h3>
                  <p className="text-sm text-gray-600">تتبع الأخطاء وقياس التحسن</p>
                </Link>
              </div>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
