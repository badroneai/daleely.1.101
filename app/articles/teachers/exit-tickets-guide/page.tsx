import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("teachers", "exit-tickets-guide")!;
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

export default function ExitTicketsGuidePage() {
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
              بطاقات الخروج (Exit Tickets) هي طريقة فعالة لقياس فهم الطلاب في نهاية الدرس. في هذا المقال، نستعرض كيفية استخدامها مع قوالب جاهزة.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ما هي بطاقات الخروج؟
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                بطاقة خروج هي سؤال واحد أو سؤالين قصيرين في نهاية الدرس. يستغرق 1-2 دقيقة فقط، ويساعدك في معرفة من فهم الدرس ومن يحتاج دعم إضافي.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطوات الاستخدام (3 دقائق)
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>في آخر 2 دقيقة من الدرس، وزّع بطاقات خروج</li>
                <li>اطلب من الطلاب الإجابة على سؤال واحد</li>
                <li>اجمع البطاقات عند الخروج</li>
                <li>راجعها بسرعة (30 ثانية لكل بطاقة)</li>
                <li>استخدم النتائج لتخطيط الدرس التالي</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                أمثلة على أسئلة بطاقات الخروج
              </h2>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>للرياضيات:</strong> &quot;ما هو ناتج 7 × 8؟&quot;</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>للغة العربية:</strong> &quot;ما هي الحركة على الحرف ب في كلمة &apos;باب&apos;؟&quot;</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>سؤال فهم:</strong> &quot;اشرح بجملة واحدة ما تعلمته اليوم&quot;</p>
                </div>
              </div>
            </section>

            <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                بطاقة خروج جاهزة
              </h2>
              <p className="text-gray-700 mb-4">
                أنشئ بطاقة خروج (3 أسئلة) جاهزة للطباعة:
              </p>
              <Link
                href="/tools/worksheet-generator?template=exit-ticket"
                className="btn-primary inline-block"
              >
                أنشئ بطاقة خروج →
              </Link>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
