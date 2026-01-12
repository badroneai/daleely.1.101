import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("teachers", "enrichment-for-advanced")!;
const relatedTools = getToolsByCategory("teachers");
const relatedArticles = getArticlesByCategory("teachers")
  .filter((a) => a.slug !== article.slug)
  .slice(0, 2);

export const metadata: Metadata = {
  title: `${article.title} - Daleely.ai`,
  description: article.description,
  alternates: {
    canonical: `https://daleely.ai/articles/teachers/${article.slug}`,
  },
  openGraph: {
    title: `${article.title} - Daleely.ai`,
    description: article.description,
    type: "article",
    publishedTime: article.publishedAt,
  },
};

export default function EnrichmentForAdvancedPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "مقالات", href: "/articles" },
        { label: "للمعلمين", href: "/articles/teachers" },
        { label: article.title },
      ]}
    >
      <ArticleTemplate
        title={article.title}
        description={article.description}
        category={article.category}
        publishedAt={article.publishedAt}
        relatedTools={relatedTools}
        relatedArticles={relatedArticles.map((a) => ({
          slug: a.slug,
          title: a.title,
        }))}
        content={
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              إثراء المحتوى للمتفوقين يساعد في تحدي الطلاب وتنمية مهاراتهم العليا. في هذا المقال، نستعرض استراتيجيات عملية لإثراء المحتوى.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطوات سريعة (3 دقائق)
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>حدد الطلاب المتفوقين في المهارة</li>
                <li>أنشئ ورقة إثراء بمستوى أعلى</li>
                <li>استخدم أرقاماً أكبر أو مفاهيم متقدمة</li>
                <li>اطبع الورقة واعطها للطلاب</li>
                <li>راقب التقدم وقدم تحديات جديدة</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                استراتيجيات الإثراء
              </h2>
              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">1. زيادة الصعوبة</h3>
                  <p className="text-gray-700 text-sm">استخدم أرقاماً أكبر أو كلمات أصعب</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">2. التفكير النقدي</h3>
                  <p className="text-gray-700 text-sm">أسئلة تحتاج تفكير وتحليل</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">3. التطبيق العملي</h3>
                  <p className="text-gray-700 text-sm">ربط المهارة بمواقف حقيقية</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2">4. الإبداع</h3>
                  <p className="text-gray-700 text-sm">اطلب من الطلاب إنشاء أمثلة جديدة</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                مثال عملي
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>الموقف:</strong> طالب متقن جدول الضرب 2-10</p>
                <p className="text-gray-700 mb-2"><strong>الإثراء:</strong></p>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                  <li>أنشئ ورقة بجدول الضرب 11 و 12</li>
                  <li>أضف أسئلة تحتاج تفكير (مثل: &quot;ما هو ناتج 7 × 13؟&quot;)</li>
                  <li>اطلب من الطالب حل مسائل كلامية</li>
                  <li>شجعه على إنشاء مسائل جديدة</li>
                </ol>
              </div>
            </section>

            <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ورقة إثراء جاهزة
              </h2>
              <p className="text-gray-700 mb-4">
                أنشئ ورقة إثراء للمتفوقين (15 سؤال بمستوى متقدم) جاهزة للطباعة:
              </p>
              <Link
                href="/tools/worksheet-generator?template=enrichment"
                className="btn-primary inline-block"
              >
                أنشئ ورقة إثراء →
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
