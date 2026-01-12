import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "كيف أتعامل مع الأخطاء المتكررة؟ - Daleely.ai",
  description: "دليل شامل للتعامل مع الأخطاء المتكررة في التعلم. استراتيجيات فعالة، نصائح عملية",
  alternates: {
    canonical: "https://daleely.ai/parents/faq/deal-with-repeated-errors",
  },
  openGraph: {
    title: "كيف أتعامل مع الأخطاء المتكررة؟ - Daleely.ai",
    description: "دليل شامل للتعامل مع الأخطاء المتكررة في التعلم",
    type: "article",
  },
};

export default function DealWithRepeatedErrorsPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  const relatedArticles = [
    {
      title: "الفهم vs الحفظ",
      href: "/parents/common-problems/understanding-vs-memorization",
      description: "الفهم يمنع الأخطاء المتكررة",
    },
    {
      title: "كيف أعرف أن الطفل فعلاً تحسن؟",
      href: "/parents/faq/how-know-improved",
      description: "تتبع الأخطاء يساعد في قياس التقدم",
    },
    {
      title: "يحفظ ثم ينسى جدول الضرب",
      href: "/parents/common-problems/forgets-multiplication",
      description: "النسيان قد يكون سبباً في الأخطاء المتكررة",
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "أسئلة الأهل الشائعة", href: "/parents#faq" },
        { label: "كيف أتعامل مع الأخطاء المتكررة؟" },
      ]}
    >
      <ArticleTemplate
        title="كيف أتعامل مع الأخطاء المتكررة؟"
        description="دليل شامل للتعامل مع الأخطاء المتكررة في التعلم. استراتيجيات فعالة، نصائح عملية"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={
          <div className="space-y-6">
            <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">الإجابة المختصرة</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                لا تعاقب. استخدم{" "}
                <Link href="/parents/tracking/common-mistakes" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  سجل الأخطاء الشائعة
                </Link>{" "}
                لتحديد المشكلة. راجع الأساسيات، استخدم أداة أبسط، أو استشر المعلم. راجع مقال{" "}
                <Link href="/parents/common-problems/understanding-vs-memorization" className="text-primary-700 hover:text-primary-800 underline font-medium">
                  &quot;الفهم vs الحفظ&quot;
                </Link>{" "}
                لضمان الفهم وليس فقط الحفظ.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا تحدث الأخطاء المتكررة؟</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>الحفظ بدون فهم:</strong> الطفل يحفظ لكن لا يفهم</li>
                <li><strong>عدم الممارسة الكافية:</strong> يحتاج ممارسة أكثر</li>
                <li><strong>صعوبة المادة:</strong> المادة صعبة جداً بالنسبة له</li>
                <li><strong>عدم التركيز:</strong> الطفل غير مركز</li>
                <li><strong>التعب:</strong> الطفل متعب أو مرهق</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">خطوات التعامل مع الأخطاء المتكررة</h2>
              <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>استخدم سجل الأخطاء:</strong>{" "}
                    <Link href="/parents/tracking/common-mistakes" className="text-primary-700 hover:text-primary-800 underline">
                      سجل الأخطاء الشائعة
                    </Link>{" "}
                    يساعدك في تحديد الخطأ المتكرر
                  </li>
                  <li>
                    <strong>حدد السبب:</strong> لماذا يخطئ الطفل؟ (حفظ بدون فهم، صعوبة، إلخ)
                  </li>
                  <li>
                    <strong>راجع الأساسيات:</strong> ارجع للمستوى الأبسط
                  </li>
                  <li>
                    <strong>استخدم استراتيجية مختلفة:</strong> جرب طريقة تعليم مختلفة
                  </li>
                  <li>
                    <strong>مارس بانتظام:</strong> الممارسة المنتظمة تساعد في التثبيت
                  </li>
                  <li>
                    <strong>احتفل بالتحسن:</strong> حتى لو كان صغيراً
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">استراتيجيات فعالة</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">1. راجع الأساسيات</h3>
                  <p className="text-gray-700 text-sm">ارجع للمستوى الأبسط وثبت الأساس</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">2. استخدم أمثلة</h3>
                  <p className="text-gray-700 text-sm">أمثلة من الحياة اليومية تساعد في الفهم</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">3. دعه يشرح</h3>
                  <p className="text-gray-700 text-sm">اطلب من الطفل شرح طريقة الحل</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">4. استخدم أدوات أبسط</h3>
                  <p className="text-gray-700 text-sm">أدوات أبسط تساعد في التثبيت</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">متى يجب أن تقلق؟</h2>
              <div className="bg-red-50 rounded-lg p-6 border-r-4 border-red-500">
                <p className="text-gray-700 mb-3">
                  الأخطاء المتكررة العادية ليست مشكلة. لكن يجب أن تقلق إذا:
                </p>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>الخطأ يتكرر لأكثر من شهر</li>
                  <li>الطفل لا يتحسن رغم المحاولات</li>
                  <li>الخطأ يؤثر على أدائه في المدرسة</li>
                  <li>الطفل يعاني من صعوبات في التعلم</li>
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
                استخدم هذه الموارد للتعامل مع الأخطاء:
              </p>
              <div className="space-y-3">
                <Link
                  href="/parents/tracking/common-mistakes"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">سجل الأخطاء الشائعة</h3>
                  <p className="text-sm text-gray-600">تتبع الأخطاء وحلها</p>
                </Link>
                <Link
                  href="/parents/common-problems/understanding-vs-memorization"
                  className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">الفهم vs الحفظ</h3>
                  <p className="text-sm text-gray-600">فهم الفرق يساعد في حل الأخطاء</p>
                </Link>
              </div>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
