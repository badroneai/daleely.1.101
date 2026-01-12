import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("teachers", "quick-classroom-activities")!;
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

export default function QuickClassroomActivitiesPage() {
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
              الأنشطة الصفية السريعة (5 دقائق) تساعد في تحضير الطلاب للدرس وقياس فهمهم. في هذا المقال، نستعرض روتين افتتاح وختام جاهز يمكن تطبيقه فوراً.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                روتين الافتتاح (5 دقائق)
              </h2>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">1. تحية الصف (30 ثانية)</h3>
                  <p className="text-gray-700 text-sm">&quot;صباح الخير، كيف حالكم اليوم؟&quot;</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">2. سؤال اليوم السريع (دقيقة)</h3>
                  <p className="text-gray-700 text-sm">سؤال بسيط عن الدرس السابق أو موضوع اليوم</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">3. مراجعة سريعة (دقيقتان)</h3>
                  <p className="text-gray-700 text-sm">مراجعة 2-3 نقاط من الدرس السابق</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">4. عرض أهداف الدرس (دقيقة ونصف)</h3>
                  <p className="text-gray-700 text-sm">&quot;اليوم سنتعلم...&quot;</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                روتين الختام (5 دقائق)
              </h2>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">1. تلخيص سريع (دقيقة)</h3>
                  <p className="text-gray-700 text-sm">&quot;ما الذي تعلمناه اليوم؟&quot;</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">2. سؤال ختامي (30 ثانية)</h3>
                  <p className="text-gray-700 text-sm">سؤال واحد لقياس الفهم</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">3. بطاقة خروج (دقيقة)</h3>
                  <p className="text-gray-700 text-sm">سؤال سريع على ورقة صغيرة</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">4. تذكير بالواجب (30 ثانية)</h3>
                  <p className="text-gray-700 text-sm">&quot;الواجب المنزلي هو...&quot;</p>
                </div>
              </div>
            </section>

            <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                نشاط سريع جاهز
              </h2>
              <p className="text-gray-700 mb-4">
                أنشئ نشاط سريع (5 أسئلة) جاهز للطباعة:
              </p>
              <Link
                href="/tools/worksheet-generator?template=quick-activity"
                className="btn-primary inline-block"
              >
                أنشئ نشاط سريع →
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
