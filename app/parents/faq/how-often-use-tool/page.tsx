import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كم مرة نستخدم الأداة أسبوعياً؟ - Daleely.ai",
  description: "إجابة شاملة عن عدد مرات استخدام الأدوات التعليمية أسبوعياً. نصائح عملية لضمان الانتظام والفعالية",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/how-often-use-tool",
  },
  openGraph: {
    title: "كم مرة نستخدم الأداة أسبوعياً؟ - Daleely.ai",
    description: "إجابة شاملة عن عدد مرات استخدام الأدوات التعليمية أسبوعياً",
    type: "article",
  },
};

export default function HowOftenUseToolPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "متى أستخدم خطة 14 يوم؟",
      href: "/parents/faq/when-use-14-day-plan",
      description: "خطط 14 يوم تساعد في ضمان الانتظام",
    },
    {
      title: "كم من الوقت يجب أن تستغرق الجلسة؟",
      href: "/parents/faq/how-long-session",
      description: "مدة الجلسة مرتبطة بعدد المرات",
    },
    {
      title: "كيف أوازن بين التعلم والشاشة؟",
      href: "/parents/faq/balance-learning-screen",
      description: "التوازن مهم عند الاستخدام المتكرر",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "كم مرة نستخدم الأداة أسبوعياً؟" },
      ]}
    >
      <ArticleTemplate
        title="كم مرة نستخدم الأداة أسبوعياً؟"
        description="إجابة شاملة عن عدد مرات استخدام الأدوات التعليمية أسبوعياً. نصائح عملية لضمان الانتظام والفعالية"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ننصح باستخدام الأداة 3-5 مرات أسبوعياً لمدة 5-10 دقائق في كل مرة. المهم هو الانتظام وليس الكمية. يمكنك استخدام{" "}
                <Link href="/parents/14-day-plan/multiplication" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  خطة 14 يوم الجاهزة
                </Link>{" "}
                لضمان الانتظام.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا 3-5 مرات أسبوعياً؟</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الأبحاث التربوية تشير إلى أن التعلم المنتظم أفضل من التعلم المكثف. 3-5 مرات أسبوعياً توفر توازناً مثالياً بين:
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside mb-4">
                <li><strong>التكرار الكافي:</strong> يسمح للطفل بتثبيت ما تعلمه</li>
                <li><strong>الوقت للراحة:</strong> يعطي الدماغ فرصة لمعالجة المعلومات</li>
                <li><strong>المرونة:</strong> لا يشكل ضغطاً على الطفل أو الأهل</li>
                <li><strong>الاستدامة:</strong> يمكن الحفاظ عليه على المدى الطويل</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">جدول مقترح للاستخدام</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3 مرات أسبوعياً (الحد الأدنى)</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>مثلاً: الاثنين، الأربعاء، الجمعة</li>
                  <li>مناسب للأطفال الصغار (6-8 سنوات)</li>
                  <li>مناسب للبداية أو عندما يكون الطفل مشغولاً</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">5 مرات أسبوعياً (المثالي)</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>مثلاً: من الاثنين إلى الجمعة</li>
                  <li>مناسب لمعظم الأطفال</li>
                  <li>يوفر توازناً مثالياً بين التعلم والراحة</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">⚠️ تحذير: لا تستخدم يومياً</h3>
                <p className="text-gray-700">
                  الاستخدام اليومي قد يؤدي إلى الملل والإرهاق. الأهم هو الجودة وليس الكمية. حتى 3 مرات أسبوعياً بجودة عالية أفضل من 7 مرات بجودة منخفضة.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تضمن الانتظام؟</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">1. اختر وقتاً ثابتاً</h3>
                  <p className="text-gray-700 text-sm">مثلاً: بعد العشاء مباشرة، أو قبل النوم</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">2. استخدم خطة 14 يوم</h3>
                  <p className="text-gray-700 text-sm">
                    <Link href="/parents/14-day-plan/multiplication" className="text-primary-700 hover:text-primary-800 underline">
                      خطط 14 يوم الجاهزة
                    </Link>{" "}
                    توفر هيكلاً واضحاً
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">3. استخدم لوحة المتابعة</h3>
                  <p className="text-gray-700 text-sm">
                    <Link href="/parents/tracking/weekly-points" className="text-primary-700 hover:text-primary-800 underline">
                      جدول النقاط الأسبوعي
                    </Link>{" "}
                    يساعد في تتبع الاستخدام
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">4. احتفل بالإنجازات</h3>
                  <p className="text-gray-700 text-sm">كافئ الطفل عند إكمال أسبوع كامل</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى تزيد عدد المرات؟</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>عندما يطلب الطفل المزيد (علامة إيجابية!)</li>
                <li>عندما يكون الطفل متحمساً ومتحفزاً</li>
                <li>عندما يكون لديك وقت إضافي (مثلاً: في الإجازات)</li>
                <li>عندما يكون الطفل قريباً من إتقان مهارة معينة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى تقلل عدد المرات؟</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>عندما يبدو الطفل متعباً أو مرهقاً</li>
                <li>عندما يرفض الاستخدام بشكل متكرر</li>
                <li>عندما يكون لديك التزامات أخرى</li>
                <li>عندما يكون الطفل مريضاً</li>
              </ul>
              <div className="bg-blue-50 rounded-lg p-4 mt-4 border-r-4 border-blue-500">
                <p className="text-gray-700">
                  <strong>تذكر:</strong> تقليل عدد المرات ليس فشلاً. الأهم هو الاستمرارية على المدى الطويل.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عملية</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li><strong>ابدأ صغيراً:</strong> 3 مرات أسبوعياً في البداية، ثم زد تدريجياً</li>
                <li><strong>كن مرناً:</strong> إذا فات يوم، لا تقلق - استمر في اليوم التالي</li>
                <li><strong>استخدم التنويع:</strong> استخدم أدوات مختلفة كل يوم</li>
                <li><strong>راقب التقدم:</strong> استخدم لوحة المتابعة لتتبع الاستخدام</li>
                <li><strong>احتفل بالإنجازات:</strong> حتى لو كانت صغيرة</li>
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
                استخدم هذه الموارد لضمان الانتظام:
              </p>
              <div className="space-y-3">
                <Link
                  href="/parents/14-day-plan/multiplication"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">خطة 14 يوم: تثبيت جدول الضرب</h3>
                  <p className="text-sm text-gray-600">خطة يومية جاهزة تضمن الانتظام</p>
                </Link>
                <Link
                  href="/parents/tracking/weekly-points"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">جدول النقاط الأسبوعي</h3>
                  <p className="text-sm text-gray-600">تتبع الاستخدام أسبوعياً</p>
                </Link>
              </div>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
