import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("teachers", "ready-worksheets-by-grade")!;
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

export default function ReadyWorksheetsByGradePage() {
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
              أوراق العمل الجاهزة حسب الصف توفر الوقت والجهد للمعلمين. في هذا المقال، سنستعرض كيفية استخدام مولّد أوراق العمل لإنشاء أوراق جاهزة مناسبة لكل مرحلة دراسية.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطوات سريعة (3 دقائق)
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>اختر نوع التمرين (رياضيات أو عربية)</li>
                <li>حدد المرحلة الدراسية (1-2، 3-4، أو 5-6)</li>
                <li>اختر عدد الأسئلة (5-30)</li>
                <li>اضغط &quot;إنشاء ورقة العمل&quot;</li>
                <li>اطبع أو حمّل كـ PDF</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                أوراق عمل جاهزة حسب الصف
              </h2>
              
              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">الصف الأول والثاني:</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>الجمع والطرح (1-20)</li>
                  <li>جدول الضرب (2، 3، 4، 5)</li>
                  <li>الحروف العربية</li>
                  <li>الكلمات البسيطة</li>
                </ul>
              </div>

              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">الصف الثالث والرابع:</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>جدول الضرب (2-10)</li>
                  <li>الجمع والطرح (1-100)</li>
                  <li>الحركات العربية</li>
                  <li>المقاطع والدمج</li>
                </ul>
              </div>

              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">الصف الخامس والسادس:</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>جدول الضرب (2-12)</li>
                  <li>الجمع والطرح (1-200)</li>
                  <li>القسمة</li>
                  <li>الكلمات البصرية العربية</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ورقة جاهزة للطباعة
              </h2>
              <p className="text-gray-700 mb-4">
                استخدم مولّد أوراق العمل لإنشاء ورقة جاهزة الآن:
              </p>
              <Link
                href="/tools/worksheet-generator"
                className="btn-primary inline-block"
              >
                أنشئ ورقة عمل جاهزة →
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
