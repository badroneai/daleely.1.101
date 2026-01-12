import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كيف أوازن بين التعلم والشاشة؟ - Daleely.ai",
  description: "دليل شامل لتحقيق التوازن بين التعلم والشاشة. قواعد عملية، نصائح فعالة",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/balance-learning-screen",
  },
  openGraph: {
    title: "كيف أوازن بين التعلم والشاشة؟ - Daleely.ai",
    description: "دليل شامل لتحقيق التوازن بين التعلم والشاشة",
    type: "article",
  },
};

export default function BalanceLearningScreenPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "قواعد استخدام الأجهزة",
      href: "/parents/device-rules",
      description: "قواعد مفصلة لاستخدام الأجهزة",
    },
    {
      title: "كم من الوقت يجب أن تستغرق الجلسة؟",
      href: "/parents/faq/how-long-session",
      description: "مدة الجلسة جزء من التوازن",
    },
    {
      title: "كم مرة نستخدم الأداة أسبوعياً؟",
      href: "/parents/faq/how-often-use-tool",
      description: "عدد المرات جزء من التوازن",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "كيف أوازن بين التعلم والشاشة؟" },
      ]}
    >
      <ArticleTemplate
        title="كيف أوازن بين التعلم والشاشة؟"
        description="دليل شامل لتحقيق التوازن بين التعلم والشاشة. قواعد عملية، نصائح فعالة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                حدد وقتاً محدداً للتعلم (10 دقائق)، اجعل التعلم قبل الترفيه، استخدم مؤقت، وأوقف التنبيهات. راجع{" "}
                <Link href="/parents/device-rules" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  &quot;قواعد استخدام الأجهزة&quot;
                </Link>{" "}
                لإرشادات مفصلة.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">قاعدة 10 دقائق</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <p className="text-gray-700 mb-4">
                  قاعدة بسيطة: <strong>10 دقائق تعلم + 20 دقيقة ترفيه = 30 دقيقة إجمالي</strong>
                </p>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>ابدأ بالتعلم أولاً (10 دقائق)</li>
                  <li>بعد إكمال التعلم، يمكن الترفيه (20 دقيقة)</li>
                  <li>استخدم مؤقت لضمان الالتزام</li>
                  <li>أوقف التنبيهات أثناء التعلم</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا التعلم أولاً؟</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>التركيز:</strong> الطفل يكون أكثر تركيزاً في البداية</li>
                <li><strong>الدافعية:</strong> الترفيه كمكافأة يحفز الطفل</li>
                <li><strong>الروتين:</strong> يخلق روتيناً صحياً</li>
                <li><strong>الاستدامة:</strong> يضمن إكمال التعلم</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تطبق التوازن عملياً؟</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1. حدد الوقت</h3>
                  <p className="text-gray-700">10 دقائق للتعلم، 20 دقيقة للترفيه</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2. استخدم مؤقت</h3>
                  <p className="text-gray-700">مؤقت واضح يساعد في الالتزام</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">3. أوقف التنبيهات</h3>
                  <p className="text-gray-700">وضع &quot;عدم الإزعاج&quot; أثناء التعلم</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4. احتفل بالإنجاز</h3>
                  <p className="text-gray-700">بعد إكمال التعلم، احتفل ثم ابدأ الترفيه</p>
                </div>
              </div>
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
                راجع القواعد المفصلة:
              </p>
              <Link
                href="/parents/device-rules"
                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-1">قواعد استخدام الأجهزة</h3>
                <p className="text-sm text-gray-600">قواعد مفصلة لاستخدام الأجهزة بشكل متوازن</p>
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
