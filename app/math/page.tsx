import PageLayout from "@/components/PageLayout";
import PillarTemplate from "@/components/templates/PillarTemplate";
import { getToolsByCategory, getToolsByGradeLevel } from "@/lib/tools";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "الرياضيات",
  "أدوات تعليمية تفاعلية لتعلم الرياضيات: جدول الضرب، الجمع، الطرح، قراءة الساعة وأكثر",
  "math"
);

const mathTools = getToolsByCategory("math");
const topTools = mathTools.slice(0, 3);

const toolsByGrade = {
  "1-2": getToolsByGradeLevel("1-2").filter((t) => t.category === "math"),
  "3-4": getToolsByGradeLevel("3-4").filter((t) => t.category === "math"),
  "5-6": getToolsByGradeLevel("5-6").filter((t) => t.category === "math"),
};

const learningPath = [
  {
    step: 1,
    title: "الجمع والطرح الأساسي",
    description: "ابدأ بتعلم الجمع والطرح للأرقام الصغيرة (1-20)",
    toolSlug: "mental-math-add-sub",
  },
  {
    step: 2,
    title: "جدول الضرب",
    description: "تعلم جدول الضرب من 2 إلى 10 مع تمارين تفاعلية",
    toolSlug: "multiplication-table",
  },
  {
    step: 3,
    title: "اختبار الضرب",
    description: "اختبر معرفتك بجدول الضرب مع أسئلة متنوعة",
    toolSlug: "multiplication-quiz",
  },
  {
    step: 4,
    title: "قراءة الساعة",
    description: "تعلم قراءة الساعة والوقت بالعربية والإنجليزية",
    toolSlug: "telling-time",
  },
];

const articles = [
  {
    slug: "how-to-memorize-times-tables",
    title: "كيف تساعد طفلك في حفظ جدول الضرب",
  },
  {
    slug: "mental-math-tips",
    title: "نصائح لتحسين الحساب الذهني",
  },
  {
    slug: "teaching-addition-subtraction",
    title: "كيفية تعليم الجمع والطرح للأطفال",
  },
];

const faq = [
  {
    question: "ما هي أفضل طريقة لتعليم الرياضيات للأطفال؟",
    answer:
      "أفضل طريقة هي الجمع بين الفهم والحفظ. ابدأ بالمفاهيم البسيطة والتمثيل البصري، ثم انتقل للتمارين التفاعلية. استخدم الألعاب والأنشطة العملية لجعل التعلم ممتعاً.",
  },
  {
    question: "في أي عمر يجب أن يبدأ الطفل تعلم الرياضيات؟",
    answer:
      "يمكن البدء من سن 4-5 سنوات بالمفاهيم الأساسية (الأرقام، العد، الأشكال). الجمع والطرح البسيط يبدأ في الصف الأول، والضرب في الصف الثالث.",
  },
  {
    question: "كيف أتأكد أن طفلي يفهم وليس فقط يحفظ؟",
    answer:
      "اطلب من الطفل شرح الطريقة، استخدم أمثلة عملية من الحياة اليومية، واختبر فهمه بأسئلة مختلفة. الفهم الحقيقي يظهر عندما يستطيع الطفل تطبيق المفهوم في مواقف جديدة.",
  },
  {
    question: "كم من الوقت يجب أن يقضيه الطفل في ممارسة الرياضيات يومياً؟",
    answer:
      "للأطفال في المرحلة الابتدائية، 15-20 دقيقة يومياً كافية. يمكن تقسيم الوقت على فترات قصيرة (10 دقائق صباحاً و10 دقائق مساءً) للحفاظ على التركيز.",
  },
  {
    question: "ماذا أفعل إذا كان طفلي يواجه صعوبة في الرياضيات؟",
    answer:
      "ابدأ من الأساسيات، استخدم التمثيل البصري واليدوي، كرر المفاهيم بطرق مختلفة، وكن صبوراً. إذا استمرت الصعوبة، قد تحتاج لاستشارة معلم أو أخصائي تعليمي.",
  },
];

export default function MathPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "رياضيات" },
      ]}
    >
      <PillarTemplate
        title="الرياضيات"
        description="اكتشف مجموعة شاملة من الأدوات التفاعلية لتعلم الرياضيات. من الجمع والطرح الأساسي إلى جدول الضرب وقراءة الساعة، كل شيء مصمم لمساعدة أطفالك في بناء أساس قوي في الرياضيات بطريقة ممتعة وتفاعلية."
        category="math"
        topTools={topTools}
        toolsByGrade={toolsByGrade}
        learningPath={learningPath}
        articles={articles}
        faq={faq}
      />
    </PageLayout>
  );
}
