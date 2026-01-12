import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كم من الوقت يجب أن تستغرق الجلسة؟ - Daleely.ai",
  description: "دليل شامل لمدة الجلسات التعليمية المناسبة. حسب العمر، النشاط، والمستوى",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/how-long-session",
  },
  openGraph: {
    title: "كم من الوقت يجب أن تستغرق الجلسة؟ - Daleely.ai",
    description: "دليل شامل لمدة الجلسات التعليمية المناسبة",
    type: "article",
  },
};

export default function HowLongSessionPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "كم مرة نستخدم الأداة أسبوعياً؟",
      href: "/parents/faq/how-often-use-tool",
      description: "عدد المرات مرتبط بمدة الجلسة",
    },
    {
      title: "كيف أوازن بين التعلم والشاشة؟",
      href: "/parents/faq/balance-learning-screen",
      description: "مدة الجلسة جزء من التوازن",
    },
    {
      title: "ماذا لو رفض الطفل استخدام الأداة؟",
      href: "/parents/faq/child-refuses-tool",
      description: "الجلسة الطويلة قد تكون سبب الرفض",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "كم من الوقت يجب أن تستغرق الجلسة؟" },
      ]}
    >
      <ArticleTemplate
        title="كم من الوقت يجب أن تستغرق الجلسة؟"
        description="دليل شامل لمدة الجلسات التعليمية المناسبة. حسب العمر، النشاط، والمستوى"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                5-10 دقائق كافية للأطفال الصغار (6-8 سنوات)، و10-15 دقيقة للأطفال الأكبر (9-12 سنة). المهم هو الجودة وليس الكمية. استخدم{" "}
                <Link href="/parents/device-rules" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  قواعد استخدام الأجهزة
                </Link>{" "}
                لضمان التوازن.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مدة الجلسة حسب العمر</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">6-8 سنوات (الصف الأول والثاني)</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li><strong>المدة المثالية:</strong> 5-10 دقائق</li>
                    <li><strong>الحد الأقصى:</strong> 15 دقيقة</li>
                    <li><strong>السبب:</strong> الأطفال الصغار لديهم فترة انتباه قصيرة</li>
                    <li><strong>النصيحة:</strong> إذا كان الطفل يمل، اختصر المدة</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">9-10 سنوات (الصف الثالث والرابع)</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li><strong>المدة المثالية:</strong> 10-15 دقيقة</li>
                    <li><strong>الحد الأقصى:</strong> 20 دقيقة</li>
                    <li><strong>السبب:</strong> الأطفال في هذا العمر لديهم فترة انتباه أطول</li>
                    <li><strong>النصيحة:</strong> راقب مستوى التركيز</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">11-12 سنة (الصف الخامس والسادس)</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li><strong>المدة المثالية:</strong> 15-20 دقيقة</li>
                    <li><strong>الحد الأقصى:</strong> 30 دقيقة</li>
                    <li><strong>السبب:</strong> الأطفال الأكبر يمكنهم التركيز لفترة أطول</li>
                    <li><strong>النصيحة:</strong> يمكن تقسيم الجلسة إلى جزئين</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مدة الجلسة حسب نوع النشاط</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">أنشطة قصيرة (3-5 دقائق)</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>تعلم الحروف</li>
                    <li>أصوات الحروف</li>
                    <li>مراجعة سريعة</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">أنشطة متوسطة (5-10 دقائق)</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>جدول الضرب</li>
                    <li>الجمع والطرح</li>
                    <li>الحركات</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">أنشطة طويلة (10-15 دقيقة)</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>اختبارات شاملة</li>
                    <li>قراءة الساعة</li>
                    <li>المقاطع والدمج</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">أنشطة متقدمة (15-20 دقيقة)</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>تمارين إثراء</li>
                    <li>مراجعة شاملة</li>
                    <li>تحديات متقدمة</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">علامات تدل على أن الجلسة طويلة جداً</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>الطفل يبدأ بالتململ</li>
                <li>الطفل ينظر بعيداً عن الشاشة</li>
                <li>الطفل يطلب الذهاب للحمام بشكل متكرر</li>
                <li>زيادة عدد الأخطاء</li>
                <li>الطفل يشتكي من التعب</li>
              </ul>
              <div className="bg-yellow-50 rounded-lg p-4 mt-4 border-r-4 border-yellow-500">
                <p className="text-gray-700">
                  <strong>نصيحة:</strong> إذا لاحظت هذه العلامات، اختصر المدة في الجلسة القادمة.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عملية</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li><strong>ابدأ صغيراً:</strong> 5 دقائق في البداية، ثم زد تدريجياً</li>
                <li><strong>استخدم مؤقت:</strong> ضع مؤقتاً لمعرفة الوقت الفعلي</li>
                <li><strong>راقب التركيز:</strong> إذا كان الطفل يمل، اختصر المدة</li>
                <li><strong>كن مرناً:</strong> المدة المثالية تختلف من طفل لآخر</li>
                <li><strong>ركز على الجودة:</strong> 5 دقائق بجودة عالية أفضل من 20 دقيقة بجودة منخفضة</li>
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
          </div>
        }
      />
    </PageLayout>
  );
}
