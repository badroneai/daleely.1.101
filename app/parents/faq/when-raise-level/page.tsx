import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "متى أرفع المستوى؟ - Daleely.ai",
  description: "دليل شامل لمعرفة متى ترفع مستوى صعوبة التمارين. علامات الاستعداد، نصائح عملية",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/when-raise-level",
  },
  openGraph: {
    title: "متى أرفع المستوى؟ - Daleely.ai",
    description: "دليل شامل لمعرفة متى ترفع مستوى صعوبة التمارين",
    type: "article",
  },
};

export default function WhenRaiseLevelPage() {
  const mathTools = getToolsByCategory("math");
  const arabicTools = getToolsByCategory("arabic");

  const relatedArticles = [
    {
      title: "كيف أعرف أن الطفل فعلاً تحسن؟",
      href: "/parents/faq/how-know-improved",
      description: "معرفة التقدم يساعد في تحديد وقت رفع المستوى",
    },
    {
      title: "كيف أختار الأداة المناسبة لطفلي؟",
      href: "/parents/faq/how-choose-right-tool",
      description: "اختيار المستوى المناسب جزء من اختيار الأداة",
    },
    {
      title: "كيف أتعامل مع الأخطاء المتكررة؟",
      href: "/parents/faq/deal-with-repeated-errors",
      description: "الأخطاء المتكررة قد تشير لضرورة تغيير المستوى",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "متى أرفع المستوى؟" },
      ]}
    >
      <ArticleTemplate
        title="متى أرفع المستوى؟"
        description="دليل شامل لمعرفة متى ترفع مستوى صعوبة التمارين. علامات الاستعداد، نصائح عملية"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ارفع المستوى عندما ينجح طفلك في 80% من التمارين بسهولة. لا تتعجل - التثبيت أهم من السرعة. استخدم{" "}
                <Link href="/parents/tool-selector" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  دليل اختيار الأداة
                </Link>{" "}
                لاختيار المستوى المناسب.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">علامات الاستعداد لرفع المستوى</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ النجاح في 80% أو أكثر</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل ينجح في 8 من أصل 10 تمارين بسهولة</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ السرعة في الإجابة</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل يجيب بسرعة وبدون تردد</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ الثقة</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل واثقاً من إجاباته</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ الملل</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل يشتكي من سهولة التمارين</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى لا ترفع المستوى؟</h2>
              <div className="bg-red-50 rounded-lg p-6 border-r-4 border-red-500">
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li><strong>إذا كان النجاح أقل من 80%:</strong> الطفل يحتاج ممارسة أكثر</li>
                  <li><strong>إذا كان الطفل متردداً:</strong> يحتاج ثقة أكثر</li>
                  <li><strong>إذا كان الطفل يخطئ كثيراً:</strong> يحتاج تثبيت أكثر</li>
                  <li><strong>إذا كان الطفل متعباً:</strong> انتظر حتى يكون نشطاً</li>
                  <li><strong>إذا كان الطفل يرفض:</strong> لا تجبره</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف ترفع المستوى تدريجياً؟</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">خطة الانتقال التدريجي</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>الخطوة 1:</strong> تأكد من إتقان المستوى الحالي (80% أو أكثر لمدة أسبوع)
                  </li>
                  <li>
                    <strong>الخطوة 2:</strong> ارفع المستوى قليلاً (مثلاً: من أرقام 1-10 إلى 1-20)
                  </li>
                  <li>
                    <strong>الخطوة 3:</strong> راقب الأداء في المستوى الجديد
                  </li>
                  <li>
                    <strong>الخطوة 4:</strong> إذا كان الأداء جيداً (70% أو أكثر)، استمر
                  </li>
                  <li>
                    <strong>الخطوة 5:</strong> إذا كان الأداء ضعيفاً (أقل من 70%)، ارجع للمستوى السابق
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء شائعة يجب تجنبها</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>الرفع السريع جداً:</strong> قد يؤدي لصعوبات وإحباط</li>
                <li><strong>الرفع بناءً على الضغط:</strong> لا ترفع المستوى لأن الأهل الآخرين يفعلون ذلك</li>
                <li><strong>عدم المراقبة:</strong> راقب الأداء بعد رفع المستوى</li>
                <li><strong>عدم المرونة:</strong> إذا كان المستوى الجديد صعباً، ارجع للمستوى السابق</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عملية</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">1. استخدم دليل اختيار الأداة</h3>
                  <p className="text-gray-700 text-sm">
                    <Link href="/parents/tool-selector" className="text-primary-700 hover:text-primary-800 underline">
                      دليل اختيار الأداة
                    </Link>{" "}
                    يساعدك في اختيار المستوى المناسب
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">2. راقب التقدم</h3>
                  <p className="text-gray-700 text-sm">
                    استخدم{" "}
                    <Link href="/parents/tracking/weekly-points" className="text-primary-700 hover:text-primary-800 underline">
                      لوحة المتابعة
                    </Link>{" "}
                    لتتبع التقدم
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">3. كن صبوراً</h3>
                  <p className="text-gray-700 text-sm">التثبيت أهم من السرعة</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">4. احتفل بالإنجازات</h3>
                  <p className="text-gray-700 text-sm">احتفل بكل مستوى يتقنه الطفل</p>
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
          </div>
        }
      />
    </PageLayout>
  );
}
