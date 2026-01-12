import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

const article = getArticleBySlug("arabic", "arabic-reading-tips")!;
const relatedTools = getToolsByCategory("arabic")
  .filter((t) => t.slug === "sight-words-ar" || t.slug === "syllables-blending")
  .slice(0, 2);
const relatedArticles = getArticlesByCategory("arabic")
  .filter((a) => a.slug !== article.slug)
  .slice(0, 2);

export const metadata: Metadata = {
  title: `${article.title} - Daleely.ai`,
  description: article.description,
  alternates: {
    canonical: `https://daleely.ai/articles/arabic/${article.slug}`,
  },
  openGraph: {
    title: `${article.title} - Daleely.ai`,
    description: article.description,
    type: "article",
    publishedTime: article.publishedAt,
  },
};

export default function ArabicReadingTipsPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "مقالات", href: "/articles" },
        { label: "اللغة العربية", href: "/articles/arabic" },
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
              تحسين مهارات القراءة العربية يحتاج إلى ممارسة منتظمة واستراتيجيات فعالة. في
              هذا المقال، سنستعرض طرقاً عملية لمساعدة أطفالك في تحسين قراءتهم.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. ابدأ بالكلمات البسيطة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ابدأ بكلمات قصيرة وبسيطة (2-3 أحرف)، ثم زد الصعوبة تدريجياً. استخدم كلمات
                مألوفة من الحياة اليومية لجعل القراءة أكثر معنى.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. استخدم طريقة المقاطع
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                علم الطفل كيفية تقسيم الكلمات إلى مقاطع. على سبيل المثال: &quot;مدرسة&quot;
                = &quot;مدر-سة&quot;. هذا يساعد في قراءة الكلمات الطويلة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. اقرأ بصوت عالٍ
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                شجع طفلك على القراءة بصوت عالٍ. هذا يساعده على سماع نفسه، وتحسين النطق،
                واكتشاف الأخطاء بنفسه.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. استخدم القصص المصورة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                القصص المصورة تجعل القراءة أكثر متعة. الصور تساعد الطفل على فهم المعنى،
                وتشجعه على الاستمرار في القراءة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. الممارسة اليومية
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                15-20 دقيقة قراءة يومياً أفضل من ساعة واحدة في الأسبوع. اجعل القراءة جزءاً
                من الروتين اليومي، مثل قراءة قصة قبل النوم.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. كن صبوراً ومشجعاً
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                كل طفل يتعلم بوتيرة مختلفة. كن صبوراً، واحتفل بالإنجازات الصغيرة. شجع
                طفلك على المحاولة حتى لو أخطأ.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                الخلاصة
              </h2>
              <p className="text-gray-700 leading-relaxed">
                تحسين مهارات القراءة يحتاج إلى صبر وممارسة منتظمة. استخدم طرقاً متنوعة،
                اجعل القراءة ممتعة، وكن مشجعاً. مع الوقت، ستصبح قراءة طفلك أفضل وأسرع.
              </p>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
