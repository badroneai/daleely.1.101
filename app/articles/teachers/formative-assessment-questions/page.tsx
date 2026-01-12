import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("teachers", "formative-assessment-questions")!;
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

export default function FormativeAssessmentQuestionsPage() {
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
              التقويم التكويني يساعدك في قياس فهم الطلاب أثناء الدرس وليس بعده. في هذا المقال، نستعرض أسئلة سريعة يمكن استخدامها في أي وقت.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ما هو التقويم التكويني؟
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                التقويم التكويني هو قياس فهم الطلاب أثناء التعلم، وليس في النهاية. يساعدك في تعديل طريقة الشرح فوراً بناءً على فهم الطلاب.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطوات سريعة (دقيقتان)
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>في منتصف الدرس، اطرح سؤالاً سريعاً</li>
                <li>اطلب من الطلاب الإجابة (شفهياً أو كتابياً)</li>
                <li>راقب الإجابات</li>
                <li>إذا كان معظم الطلاب فهموا، استمر</li>
                <li>إذا كان هناك صعوبة، كرر الشرح بطريقة مختلفة</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                أمثلة على أسئلة سريعة
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">للرياضيات:</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>&quot;ما هو ناتج 5 + 7؟&quot;</li>
                    <li>&quot;كم مرة 4 في 20؟&quot;</li>
                    <li>&quot;ما هو العدد الأكبر: 15 أم 23؟&quot;</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">للغة العربية:</h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>&quot;ما اسم الحرف &apos;ب&apos;؟&quot;</li>
                    <li>&quot;ما معنى كلمة &apos;مدرسة&apos;؟&quot;</li>
                    <li>&quot;ما هي الحركة على الحرف في &apos;بَ&apos;؟&quot;</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                أسئلة سريعة جاهزة
              </h2>
              <p className="text-gray-700 mb-4">
                أنشئ مجموعة أسئلة سريعة (5 أسئلة) جاهزة للطباعة:
              </p>
              <Link
                href="/tools/worksheet-generator?template=quick-questions"
                className="btn-primary inline-block"
              >
                أنشئ أسئلة سريعة →
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
