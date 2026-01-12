import PageLayout from "@/components/PageLayout";
import TeachersResourceLibrary from "@/components/teachers/TeachersResourceLibrary";
import PillarTemplate from "@/components/templates/PillarTemplate";
import { getToolsByCategory } from "@/lib/tools";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "للمعلمين",
  "مكتبة موارد تعليمية شاملة للمعلمين والمعلمات: تحضير سريع، تقويم تكويني، إدارة الصف، تفريد التعليم، ومولّد أوراق العمل",
  "teachers"
);

const teachersTools = getToolsByCategory("teachers");
const topTools = teachersTools.slice(0, 3);

const toolsByGrade = {
  "1-2": [],
  "3-4": [],
  "5-6": [],
};

const learningPath = [
  {
    step: 1,
    title: "مولّد أوراق العمل",
    description: "أنشئ أوراق عمل مخصصة للرياضيات واللغة العربية مع قوالب جاهزة",
    toolSlug: "worksheet-generator",
  },
];

const articles: Array<{ slug: string; title: string }> = [
  { slug: "ready-worksheets-by-grade", title: "أوراق عمل جاهزة حسب الصف" },
  { slug: "quick-classroom-activities", title: "أنشطة صفية سريعة" },
  { slug: "exit-tickets-guide", title: "دليل بطاقات الخروج" },
  { slug: "formative-assessment-questions", title: "أسئلة تقويم تكويني" },
  { slug: "remedial-plan-short", title: "علاج الضعف: خطة قصيرة" },
  { slug: "enrichment-for-advanced", title: "إثراء للمتفوقين" },
];

const faq = [
  {
    question: "كيف يمكنني استخدام مكتبة الموارد؟",
    answer:
      "تصفح الأقسام المختلفة: تحضير سريع، التقويم التكويني، إدارة الصف، التفريد، وحقيبة الطباعة. كل قسم يحتوي على موارد جاهزة يمكن استخدامها فوراً.",
  },
  {
    question: "ما هي القوالب الجاهزة في مولّد أوراق العمل؟",
    answer:
      "نوفر 5 قوالب جاهزة: ورقة تدريب مع إجابة نموذجية، واجب منزلي، مراجعة قبل اختبار، تقويم تشخيصي، وإثراء للمتفوقين. كل قالب مصمم لهدف تعليمي محدد.",
  },
  {
    question: "هل يمكنني تحميل أوراق العمل كـ PDF؟",
    answer:
      "نعم، يمكنك تحميل أوراق العمل كـ PDF مباشرة من الأداة. لا حاجة لرفع أي ملفات، كل شيء يتم محلياً في المتصفح.",
  },
  {
    question: "كيف أستخدم بطاقات الخروج؟",
    answer:
      "بطاقات الخروج هي أسئلة سريعة في نهاية الدرس لقياس فهم الطلاب. استخدم قالب 'بطاقة خروج' في مولّد أوراق العمل لإنشاء بطاقات جاهزة.",
  },
  {
    question: "ما هو التفريد في التعليم؟",
    answer:
      "التفريد يعني توفير نسختين من نفس الورقة: نسخة أساسية للطلاب العاديين ونسخة متقدمة للمتفوقين. يمكنك أيضاً إنشاء أوراق دعم للمتعثرين.",
  },
];

export default function TeachersPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين" },
      ]}
    >
      <div className="max-w-6xl mx-auto">
        {/* H1 + Introduction */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            مكتبة موارد المعلمين والمعلمات
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            موارد تعليمية شاملة مصممة خصيصاً للمعلمين والمعلمات. من التحضير السريع إلى التفريد والإثراء، كل ما تحتاجه لإنشاء تجارب تعليمية فعالة وممتعة.
          </p>
        </div>

        {/* Resource Library Sections */}
        <TeachersResourceLibrary />

        {/* Tools Section */}
        {topTools.length > 0 && (
          <div className="mt-12 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الأدوات التفاعلية</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {topTools.map((tool) => (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="card text-center hover:border-primary-300 transition-colors"
                >
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <span className="btn-primary inline-block text-sm">
                    جرب الآن
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Articles Section */}
        {articles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">مقالات عملية</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {articles.map((article) => (
                <a
                  key={article.slug}
                  href={`/articles/teachers/${article.slug}`}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">أسئلة شائعة</h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
