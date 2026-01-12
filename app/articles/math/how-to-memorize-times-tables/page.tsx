import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

const article = getArticleBySlug("math", "how-to-memorize-times-tables")!;
const relatedTools = getToolsByCategory("math").slice(0, 2);
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

export default function HowToMemorizeTimesTablesPage() {
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
              حفظ جدول الضرب من أهم المهارات الأساسية في الرياضيات. في هذا المقال،
              سنستعرض طرقاً فعالة وممتعة لمساعدة طفلك في حفظ جدول الضرب بشكل دائم.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. ابدأ بالجداول البسيطة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ابدأ بجدول الضرب 2، ثم 3، ثم 4، ثم 5. هذه الجداول أسهل في الحفظ
                وتشكل أساساً قوياً للجداول الأصعب. لا تحاول تعليم الطفل جميع الجداول
                دفعة واحدة.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>جدول 2: الأرقام الزوجية (2، 4، 6، 8...)</li>
                <li>جدول 5: ينتهي بـ 0 أو 5</li>
                <li>جدول 10: بسيط جداً (10، 20، 30...)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. استخدم التكرار والمراجعة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                التكرار هو مفتاح الحفظ. اجعل طفلك يكرر كل جدول عدة مرات يومياً.
                يمكن تقسيم الوقت على فترات قصيرة (5-10 دقائق) عدة مرات في اليوم
                بدلاً من جلسة واحدة طويلة.
              </p>
              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg">
                <p className="text-primary-900 font-medium">
                  💡 نصيحة: استخدم بطاقات الفلاش أو التطبيقات التفاعلية لجعل
                  المراجعة أكثر متعة.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. اجعل التعلم ممتعاً
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الأطفال يتعلمون بشكل أفضل عندما يكون التعلم ممتعاً. استخدم الألعاب،
                الأغاني، والأنشطة التفاعلية. يمكنك أيضاً استخدام أدواتنا التعليمية
                التفاعلية التي تجعل التعلم أكثر جاذبية.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>ألعاب الضرب التفاعلية</li>
                <li>أغاني جدول الضرب</li>
                <li>مسابقات عائلية</li>
                <li>استخدام الأدوات التعليمية الرقمية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. ربط الجداول ببعضها
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ساعد طفلك على ربط الجداول ببعضها. على سبيل المثال، جدول 4 هو ضعف
                جدول 2، وجدول 6 هو ضعف جدول 3. هذا يساعد في الحفظ والفهم معاً.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. الممارسة المنتظمة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الممارسة المنتظمة أهم من الممارسة المكثفة. 10-15 دقيقة يومياً أفضل
                من ساعة واحدة في الأسبوع. اجعل ممارسة جدول الضرب جزءاً من الروتين
                اليومي لطفلك.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. الصبر والتحفيز
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                كل طفل يتعلم بوتيرة مختلفة. كن صبوراً واحتفل بالإنجازات الصغيرة.
                شجع طفلك على التقدم وليس على الكمال. التقدم التدريجي أفضل من
                الإتقان الفوري.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                الخلاصة
              </h2>
              <p className="text-gray-700 leading-relaxed">
                حفظ جدول الضرب يحتاج إلى وقت وصبر. استخدم طرقاً متنوعة، اجعل
                التعلم ممتعاً، ومارس بانتظام. مع المثابرة، سيحفظ طفلك جميع الجداول
                بسهولة.
              </p>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
