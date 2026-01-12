import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "هل الأفضل الصوت أم بدونه؟ - Daleely.ai",
  description: "دليل شامل لاستخدام الصوت في الأدوات التعليمية. متى تستخدم الصوت ومتى لا تستخدمه، نصائح عملية",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/sound-or-no-sound",
  },
  openGraph: {
    title: "هل الأفضل الصوت أم بدونه؟ - Daleely.ai",
    description: "دليل شامل لاستخدام الصوت في الأدوات التعليمية",
    type: "article",
  },
};

export default function SoundOrNoSoundPage() {
  const arabicTools = getToolsByCategory("arabic");
  const mathTools = getToolsByCategory("math").slice(0, 2);

  const relatedArticles = [
    {
      title: "يرفض الحروف/الحركات",
      href: "/parents/common-problems/refuses-letters",
      description: "الصوت يساعد في حل مشكلة رفض التعلم",
    },
    {
      title: "خطة 14 يوم: تحسين القراءة العربية",
      href: "/parents/14-day-plan/arabic-reading",
      description: "الخطة تستخدم الصوت في البداية",
    },
    {
      title: "كيف أعرف أن الطفل فعلاً تحسن؟",
      href: "/parents/faq/how-know-improved",
      description: "الصوت يساعد في قياس التقدم",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "هل الأفضل الصوت أم بدونه؟" },
      ]}
    >
      <ArticleTemplate
        title="هل الأفضل الصوت أم بدونه؟"
        description="دليل شامل لاستخدام الصوت في الأدوات التعليمية. متى تستخدم الصوت ومتى لا تستخدمه، نصائح عملية"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...arabicTools, ...mathTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ابدأ بالصوت لمساعدة الطفل في التعلم، ثم أطفئه تدريجياً لتعزيز الاستقلالية. الصوت مفيد خاصة في البداية وفي تعلم الحروف والكلمات.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى تستخدم الصوت؟</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">✅ في البداية (أول 2-4 أسابيع)</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>يساعد الطفل في تعلم النطق الصحيح</li>
                    <li>يوفر دليلاً صوتياً للتعلم</li>
                    <li>يقلل من الحاجة لمساعدة الأهل</li>
                    <li>يجعل التعلم أكثر متعة</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">✅ في تعلم الحروف والكلمات</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>أصوات الحروف تحتاج للسماع</li>
                    <li>نطق الكلمات يحتاج للتدريب</li>
                    <li>الحركات تحتاج للسماع</li>
                    <li>المقاطع تحتاج للسماع</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">✅ عندما يكون الطفل مبتدئاً</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>الصوت يوفر دليلاً واضحاً</li>
                    <li>يساعد في بناء الثقة</li>
                    <li>يقلل من الأخطاء</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى لا تستخدم الصوت؟</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">⚠️ بعد إتقان المهارة</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>عندما يتقن الطفل المهارة (80% أو أكثر)</li>
                    <li>لتعزيز الاستقلالية</li>
                    <li>لاختبار الفهم الحقيقي</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">⚠️ في الاختبارات</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>لقياس الفهم الحقيقي</li>
                    <li>لتحضير الطفل للاختبارات المدرسية</li>
                    <li>لبناء الثقة في القدرات</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">⚠️ عندما يكون الطفل متقدماً</h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>الصوت قد يكون مزعجاً</li>
                    <li>الطفل لا يحتاجه</li>
                    <li>يبطئ من سرعة التعلم</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف تنتقل من الصوت إلى بدون صوت؟</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">خطة الانتقال التدريجي</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>الأسبوع 1-2:</strong> استخدم الصوت دائماً. هدفك: تعلم النطق الصحيح
                  </li>
                  <li>
                    <strong>الأسبوع 3-4:</strong> استخدم الصوت في 80% من الوقت. أطفئه في 20% من الوقت
                  </li>
                  <li>
                    <strong>الأسبوع 5-6:</strong> استخدم الصوت في 50% من الوقت. أطفئه في 50% من الوقت
                  </li>
                  <li>
                    <strong>الأسبوع 7-8:</strong> استخدم الصوت في 20% من الوقت. أطفئه في 80% من الوقت
                  </li>
                  <li>
                    <strong>بعد الأسبوع 8:</strong> استخدم الصوت فقط عند الحاجة (مثلاً: كلمة جديدة)
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عملية</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">1. ابدأ بالصوت دائماً</h3>
                  <p className="text-gray-700 text-sm">خاصة في تعلم الحروف والكلمات</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">2. راقب التقدم</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل يتقن المهارة، ابدأ بإطفاء الصوت</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">3. كن مرناً</h3>
                  <p className="text-gray-700 text-sm">إذا كان الطفل يحتاج الصوت، لا تتردد في استخدامه</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">4. استخدم الصوت في المراجعة</h3>
                  <p className="text-gray-700 text-sm">حتى بعد إتقان المهارة، الصوت مفيد في المراجعة</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">أخطاء شائعة يجب تجنبها</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>إطفاء الصوت مبكراً جداً:</strong> قد يؤدي لصعوبات في التعلم</li>
                <li><strong>استخدام الصوت دائماً:</strong> قد يعيق الاستقلالية</li>
                <li><strong>عدم الانتقال التدريجي:</strong> قد يسبب صعوبات</li>
                <li><strong>إجبار الطفل على عدم استخدام الصوت:</strong> قد يسبب إحباطاً</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى يجب أن تقلق؟</h2>
              <div className="bg-red-50 rounded-lg p-6 border-r-4 border-red-500">
                <p className="text-gray-700 mb-3">
                  عادة، استخدام الصوت أو عدمه ليس مشكلة. لكن يجب أن تقلق إذا:
                </p>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>الطفل لا يستطيع التعلم بدون الصوت بعد 3 أشهر</li>
                  <li>الطفل يعتمد كلياً على الصوت</li>
                  <li>الطفل لا يستطيع القراءة بدون الصوت</li>
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
                جرب هذه الأدوات مع الصوت:
              </p>
              <div className="space-y-3">
                <Link
                  href="/tools/letter-sounds"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">أصوات الحروف</h3>
                  <p className="text-sm text-gray-600">أداة مثالية لاستخدام الصوت</p>
                </Link>
                <Link
                  href="/tools/arabic-letters"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">تعلم الحروف العربية</h3>
                  <p className="text-sm text-gray-600">الصوت أساسي هنا</p>
                </Link>
              </div>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
