import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ماذا لو رفض الطفل استخدام الأداة؟ - Daleely.ai",
  description: "حلول عملية لمشكلة رفض الطفل استخدام الأدوات التعليمية. أسباب الرفض، استراتيجيات فعالة",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/child-refuses-tool",
  },
  openGraph: {
    title: "ماذا لو رفض الطفل استخدام الأداة؟ - Daleely.ai",
    description: "حلول عملية لمشكلة رفض الطفل استخدام الأدوات التعليمية",
    type: "article",
  },
};

export default function ChildRefusesToolPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "طفلي يمل بسرعة",
      href: "/parents/common-problems/child-gets-bored",
      description: "الملل قد يكون سبباً في الرفض",
    },
    {
      title: "كم من الوقت يجب أن تستغرق الجلسة؟",
      href: "/parents/faq/how-long-session",
      description: "الجلسة الطويلة قد تكون سبب الرفض",
    },
    {
      title: "كيف أوازن بين التعلم والشاشة؟",
      href: "/parents/faq/balance-learning-screen",
      description: "التوازن مهم عند التعامل مع الرفض",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "ماذا لو رفض الطفل استخدام الأداة؟" },
      ]}
    >
      <ArticleTemplate
        title="ماذا لو رفض الطفل استخدام الأداة؟"
        description="حلول عملية لمشكلة رفض الطفل استخدام الأدوات التعليمية. أسباب الرفض، استراتيجيات فعالة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                لا تجبره. جرب: تغيير الوقت، جعله ممتعاً (نقاط/مكافآت)، أو اختيار أداة مختلفة. راجع مقال{" "}
                <Link href="/parents/common-problems/child-gets-bored" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  &quot;طفلي يمل بسرعة&quot;
                </Link>{" "}
                لحلول عملية. التعلم يجب أن يكون ممتعاً.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا يرفض الطفل استخدام الأداة؟</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>الملل:</strong> الأداة مملة أو سهلة جداً</li>
                <li><strong>الصعوبة:</strong> الأداة صعبة جداً</li>
                <li><strong>التعب:</strong> الطفل متعب أو مرهق</li>
                <li><strong>الوقت غير المناسب:</strong> الوقت المختار غير مناسب</li>
                <li><strong>الضغط:</strong> الضغط من الأهل</li>
                <li><strong>عدم الفهم:</strong> الطفل لا يفهم الهدف</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حلول فورية (يمكن تطبيقها الآن)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">1. غير الوقت</h3>
                  <p className="text-gray-700 text-sm">جرب وقتاً مختلفاً (مثلاً: الصباح بدلاً من المساء)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">2. اجعله ممتعاً</h3>
                  <p className="text-gray-700 text-sm">استخدم نظام النقاط أو المكافآت</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">3. غير الأداة</h3>
                  <p className="text-gray-700 text-sm">جرب أداة مختلفة تماماً</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">4. اختصر المدة</h3>
                  <p className="text-gray-700 text-sm">5 دقائق بدلاً من 10 دقائق</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">استراتيجيات طويلة المدى</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li><strong>ابني الثقة:</strong> ابدأ بأدوات سهلة لبناء الثقة</li>
                <li><strong>اجعله روتيناً:</strong> نفس الوقت كل يوم</li>
                <li><strong>استخدم المكافآت:</strong> مكافأة صغيرة بعد كل جلسة</li>
                <li><strong>شارك الطفل في الاختيار:</strong> دع الطفل يختار الأداة أحياناً</li>
                <li><strong>احتفل بالإنجازات:</strong> حتى لو كانت صغيرة</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى يجب أن تقلق؟</h2>
              <div className="bg-red-50 rounded-lg p-6 border-r-4 border-red-500">
                <p className="text-gray-700 mb-3">
                  الرفض العادي ليس مشكلة. لكن يجب أن تقلق إذا:
                </p>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>الرفض استمر لأكثر من أسبوعين</li>
                  <li>الرفض مصحوب بسلوك عدواني</li>
                  <li>الرفض يؤثر على أدائه في المدرسة</li>
                  <li>الطفل يرفض كل أنواع التعلم</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  في هذه الحالات، قد تحتاج لاستشارة متخصص.
                </p>
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
                راجع هذه المقالات للحلول العملية:
              </p>
              <div className="space-y-3">
                <Link
                  href="/parents/common-problems/child-gets-bored"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">طفلي يمل بسرعة</h3>
                  <p className="text-sm text-gray-600">حلول عملية لمشكلة الملل</p>
                </Link>
                <Link
                  href="/parents/tool-selector"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">دليل اختيار الأداة</h3>
                  <p className="text-sm text-gray-600">اختر الأداة المناسبة لطفلك</p>
                </Link>
              </div>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
