import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("teachers", "remedial-plan-short")!;
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

export default function RemedialPlanShortPage() {
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
              خطة قصيرة لدعم الطلاب المتعثرين تساعد في علاج الضعف بسرعة. في هذا المقال، نستعرض خطوات عملية يمكن تطبيقها فوراً.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطوات سريعة (5 دقائق)
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>حدد المهارة التي يواجه الطالب صعوبة فيها</li>
                <li>ارجع للمستوى الأبسط من هذه المهارة</li>
                <li>أنشئ ورقة عمل بسيطة (5-10 أسئلة)</li>
                <li>اطبع الورقة واعطها للطالب</li>
                <li>راقب التقدم وعدّل حسب الحاجة</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                استراتيجيات الدعم
              </h2>
              <div className="space-y-3">
                <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-2">1. التبسيط</h3>
                  <p className="text-gray-700 text-sm">استخدم أرقاماً أصغر أو كلمات أبسط</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-2">2. التكرار</h3>
                  <p className="text-gray-700 text-sm">كرر نفس المفهوم بطرق مختلفة</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-2">3. التمثيل البصري</h3>
                  <p className="text-gray-700 text-sm">استخدم رسومات وأشكال لتوضيح المفهوم</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-2">4. الإجابات النموذجية</h3>
                  <p className="text-gray-700 text-sm">أرفق إجابات نموذجية لمساعدة الطالب</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                مثال عملي
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>المشكلة:</strong> طالب يواجه صعوبة في جدول الضرب 7</p>
                <p className="text-gray-700 mb-2"><strong>الحل:</strong></p>
                <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                  <li>ارجع لجدول الضرب 2 و 3 (أسهل)</li>
                  <li>أنشئ ورقة تدريب بسيطة (5 أسئلة)</li>
                  <li>بعد إتقانها، انتقل تدريجياً لجدول 7</li>
                  <li>استخدم ورقة دعم مع إجابات نموذجية</li>
                </ol>
              </div>
            </section>

            <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ورقة دعم جاهزة
              </h2>
              <p className="text-gray-700 mb-4">
                أنشئ ورقة دعم للمتعثرين (10 أسئلة مع إجابات) جاهزة للطباعة:
              </p>
              <Link
                href="/tools/worksheet-generator?template=remedial"
                className="btn-primary inline-block"
              >
                أنشئ ورقة دعم →
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
