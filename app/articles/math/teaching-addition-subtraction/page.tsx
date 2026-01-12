import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

const article = getArticleBySlug("math", "teaching-addition-subtraction")!;
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

export default function TeachingAdditionSubtractionPage() {
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
              الجمع والطرح هما أول العمليات الحسابية التي يتعلمها الأطفال. في هذا
              المقال، سنستعرض طرقاً فعالة لتعليم الجمع والطرح للأطفال بطريقة سهلة
              وممتعة.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. ابدأ بالمفاهيم الأساسية
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                قبل تعليم الجمع والطرح، تأكد من أن طفلك يفهم:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>الأرقام من 1 إلى 20</li>
                <li>مفهوم &quot;أكثر&quot; و &quot;أقل&quot;</li>
                <li>العد الأساسي</li>
                <li>مفهوم الكمية</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                استخدم أشياء ملموسة مثل الألعاب، الفواكه، أو الأزرار لمساعدة الطفل
                على فهم المفاهيم.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. تعليم الجمع أولاً
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الجمع أسهل من الطرح، لذا ابدأ به. استخدم هذه الطرق:
              </p>
              <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded-lg mb-4">
                <p className="text-primary-900 font-semibold mb-2">
                  طريقة العد:
                </p>
                <p className="text-primary-800">
                  ضع 3 تفاحات، ثم أضف 2 تفاحات أخرى. اطلب من الطفل أن يعد
                  الجميع: 1، 2، 3، 4، 5. النتيجة هي 5.
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>استخدم أصابع اليد للعد</li>
                <li>ارسم صور أو استخدم أشياء ملموسة</li>
                <li>ابدأ بأرقام صغيرة (1+1، 2+1، 2+2)</li>
                <li>زود الصعوبة تدريجياً</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. تعليم الطرح
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                بعد إتقان الجمع، انتقل للطرح. اشرح أن الطرح هو &quot;إزالة&quot; أو
                &quot;أخذ&quot;:
              </p>
              <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg mb-4">
                <p className="text-blue-900 font-semibold mb-2">مثال عملي:</p>
                <p className="text-blue-800">
                  لديك 5 تفاحات، أكلت 2. كم بقي؟ اطلب من الطفل أن يعد التفاحات
                  المتبقية: 1، 2، 3. النتيجة هي 3.
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>استخدم أمثلة من الحياة اليومية</li>
                <li>ابدأ بطرح أرقام صغيرة من أرقام أكبر</li>
                <li>تأكد من أن الطفل يفهم أن النتيجة يجب أن تكون أقل</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. استخدام الألعاب والأنشطة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                اجعل التعلم ممتعاً باستخدام الألعاب:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>لعبة البطاقات:</strong> اكتب مسائل على بطاقات واطلب من
                  الطفل حل them
                </li>
                <li>
                  <strong>ألعاب الطاولة:</strong> استخدم ألعاب تحتوي على عد وأرقام
                </li>
                <li>
                  <strong>التطبيقات التفاعلية:</strong> استخدم أدواتنا التعليمية
                  لجعل التعلم أكثر تفاعلية
                </li>
                <li>
                  <strong>الأنشطة اليومية:</strong> اطلب من الطفل حساب عدد الأطباق
                  على الطاولة، أو عدد الألعاب في الصندوق
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. الممارسة المنتظمة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                الممارسة المنتظمة أهم من الممارسة المكثفة. 10-15 دقيقة يومياً أفضل
                من ساعة واحدة في الأسبوع.
              </p>
              <div className="bg-green-50 border-r-4 border-green-500 p-4 rounded-lg">
                <p className="text-green-900 font-medium">
                  💡 نصيحة: اجعل ممارسة الرياضيات جزءاً من الروتين اليومي. يمكن
                  ممارسة 5 دقائق صباحاً و5 دقائق مساءً.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. التحفيز والصبر
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                كل طفل يتعلم بوتيرة مختلفة. كن صبوراً واحتفل بالإنجازات الصغيرة:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>احتفل عندما يحل الطفل مسألة صعبة</li>
                <li>استخدم المكافآت الصغيرة (ملصقات، كلمات تشجيعية)</li>
                <li>لا تضغط على الطفل إذا أخطأ</li>
                <li>ركز على التقدم وليس الكمال</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. الانتقال للحساب الذهني
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                عندما يتقن الطفل الجمع والطرح باستخدام الأشياء الملموسة، ابدأ
                بالانتقال للحساب الذهني:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>ابدأ بمسائل بسيطة (2+3، 5-2)</li>
                <li>استخدم استراتيجيات بسيطة (مثل العد من الرقم الأكبر)</li>
                <li>زود الصعوبة تدريجياً</li>
                <li>استخدم أدواتنا التفاعلية للتدريب</li>
              </ul>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                الخلاصة
              </h2>
              <p className="text-gray-700 leading-relaxed">
                تعليم الجمع والطرح للأطفال يحتاج إلى صبر وممارسة منتظمة. ابدأ
                بالمفاهيم الأساسية، استخدم أشياء ملموسة، اجعل التعلم ممتعاً، ومارس
                بانتظام. مع الوقت والصبر، سيتقن طفلك هذه المهارات الأساسية.
              </p>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
