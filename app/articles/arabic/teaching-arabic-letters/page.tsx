import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

const article = getArticleBySlug("arabic", "teaching-arabic-letters")!;
const relatedTools = getToolsByCategory("arabic").slice(0, 2);
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

export default function TeachingArabicLettersPage() {
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
              تعلم الحروف العربية هو الخطوة الأولى في رحلة تعلم القراءة والكتابة. في هذا
              المقال، سنستعرض طرقاً فعالة لمساعدة أطفالك في تعلم الحروف العربية بطريقة
              سهلة وممتعة.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. ابدأ بحرف واحد في كل مرة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                لا تحاول تعليم الطفل جميع الحروف دفعة واحدة. ابدأ بحرف واحد، واتركه يتقنه
                قبل الانتقال للحرف التالي. هذا يساعد الطفل على التركيز والاحتفاظ بالمعلومة.
              </p>
              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg">
                <p className="text-primary-900 font-medium">
                  💡 نصيحة: ابدأ بالحروف الأسهل والأكثر استخداماً مثل: ب، ت، س، م، ن
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. استخدم البطاقات والصور
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                البطاقات المصورة تجعل التعلم أكثر جاذبية. استخدم بطاقات كبيرة وواضحة، مع
                صورة لكلمة تبدأ بالحرف. على سبيل المثال، حرف &quot;ب&quot; مع صورة &quot;باب&quot;.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. اربط الحروف بأشياء من الحياة اليومية
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                عندما ترى شيئاً يبدأ بحرف معين، أشر إليه واذكر الحرف. على سبيل المثال:
                &quot;انظر، هذا &quot;باب&quot; يبدأ بحرف &quot;ب&quot;&quot;. هذا يساعد الطفل على ربط
                الحروف بالعالم من حوله.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. استخدم الأغاني والألعاب
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الأطفال يتعلمون بشكل أفضل عندما يكون التعلم ممتعاً. استخدم أغاني الحروف،
                الألعاب التفاعلية، والتطبيقات التعليمية. يمكنك أيضاً استخدام أدواتنا
                التفاعلية لجعل التعلم أكثر متعة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. علم أشكال الحروف
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                كل حرف عربي له 4 أشكال: منفصل، في البداية، في الوسط، وفي النهاية. ابدأ
                بالشكل المنفصل، ثم انتقل للأشكال الأخرى تدريجياً.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. الممارسة المنتظمة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الممارسة المنتظمة أهم من الممارسة المكثفة. 10-15 دقيقة يومياً أفضل من ساعة
                واحدة في الأسبوع. اجعل ممارسة الحروف جزءاً من الروتين اليومي.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                الخلاصة
              </h2>
              <p className="text-gray-700 leading-relaxed">
                تعلم الحروف العربية يحتاج إلى صبر وممارسة منتظمة. ابدأ بحرف واحد، استخدم
                طرقاً متنوعة، واجعل التعلم ممتعاً. مع الوقت والصبر، سيتقن طفلك جميع
                الحروف بسهولة.
              </p>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
