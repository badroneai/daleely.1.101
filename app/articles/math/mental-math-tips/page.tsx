import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

const article = getArticleBySlug("math", "mental-math-tips")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug === "mental-math-add-sub")
  .slice(0, 1);
const relatedArticles = getArticlesByCategory("math")
  .filter((a) => a.slug !== article.slug)
  .slice(0, 2);

export const metadata: Metadata = {
  title: `${article.title} - Daleely.ai`,
  description: article.description,
  alternates: {
    canonical: `https://daleely.ai/articles/math/${article.slug}`,
  },
  openGraph: {
    title: `${article.title} - Daleely.ai`,
    description: article.description,
    type: "article",
    publishedTime: article.publishedAt,
  },
};

export default function MentalMathTipsPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "مقالات", href: "/articles" },
        { label: "الرياضيات", href: "/articles/math" },
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
              الحساب الذهني مهارة مهمة تساعد الأطفال في حياتهم اليومية وتطور
              قدراتهم العقلية. في هذا المقال، سنستعرض طرقاً فعالة لتحسين الحساب
              الذهني لدى أطفالك.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. ابدأ بالأساسيات
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                تأكد من أن طفلك يتقن الجمع والطرح الأساسي قبل الانتقال للمستويات
                الأعلى. ابدأ بأرقام صغيرة (1-20) ثم زد الصعوبة تدريجياً.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. استخدم الاستراتيجيات الذهنية
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                علم طفلك استراتيجيات بسيطة مثل:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>التجميع:</strong> 7 + 8 = 7 + 3 + 5 = 10 + 5 = 15
                </li>
                <li>
                  <strong>التقريب:</strong> 48 + 25 ≈ 50 + 25 - 2 = 73
                </li>
                <li>
                  <strong>التحلل:</strong> 15 - 8 = 15 - 5 - 3 = 7
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. الممارسة اليومية
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                اجعل الحساب الذهني جزءاً من الحياة اليومية. اطلب من طفلك حساب
                الفواتير، عدد الألعاب، أو أي موقف عملي. هذا يجعل التعلم طبيعياً
                وممتعاً.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. الألعاب والأنشطة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                استخدم الألعاب التفاعلية والأنشطة الممتعة. يمكنك استخدام أدواتنا
                التعليمية أو إنشاء ألعاب بسيطة في المنزل.
              </p>
              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg">
                <p className="text-primary-900 font-medium">
                  💡 نصيحة: جرب لعبة &quot;من الأسرع&quot; حيث تطرح أسئلة حسابية بسيطة
                  ويتنافس الأطفال في الإجابة.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. التحفيز الإيجابي
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                احتفل بالإنجازات الصغيرة. شجع طفلك عندما يحل مسألة صعبة أو يحسن
                سرعته. التحفيز الإيجابي يبني الثقة ويشجع على الاستمرار.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                الخلاصة
              </h2>
              <p className="text-gray-700 leading-relaxed">
                تحسين الحساب الذهني يحتاج إلى صبر وممارسة منتظمة. استخدم طرقاً
                متنوعة، اجعل التعلم ممتعاً، وربطه بالحياة اليومية. مع الوقت، ستصبح
                مهارات طفلك في الحساب الذهني أقوى وأسرع.
              </p>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
