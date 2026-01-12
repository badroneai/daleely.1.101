import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import MultiplicationQuizClient from "@/components/tools/MultiplicationQuizClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("multiplication-quiz")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(
  tool.title,
  tool.description,
  tool.slug
);

const faq = [
  {
    question: "كم عدد الأسئلة في الاختبار؟",
    answer:
      "الاختبار السريع يحتوي على 5 أسئلة (مناسب للجوال)، والاختبار الكامل يحتوي على 10 أسئلة (مناسب للديسكتوب). يمكنك إعادة الاختبار عدة مرات كما تشاء.",
  },
  {
    question: "كيف يتم تقييم النتيجة؟",
    answer:
      "النتيجة تُحسب بناءً على عدد الإجابات الصحيحة. 90% فأكثر تعتبر ممتاز، 70-89% جيد جداً، وأقل من 70% تحتاج لمزيد من الممارسة.",
  },
  {
    question: "هل يمكنني رؤية الإجابات الخاطئة؟",
    answer:
      "نعم، بعد انتهاء الاختبار ستظهر لك جميع الإجابات الخاطئة مع الإجابات الصحيحة لمساعدتك في التعلم.",
  },
  {
    question: "ما الفرق بين هذه الأداة وأداة جدول الضرب؟",
    answer:
      "أداة جدول الضرب تركز على التعلم والتدريب المستمر، بينما هذه الأداة تركز على الاختبار والتقييم مع عدد محدد من الأسئلة ونتيجة نهائية.",
  },
  {
    question: "كم مرة يجب أن يختبر الطفل نفسه؟",
    answer:
      "ينصح باختبار واحد يومياً بعد ممارسة جدول الضرب. الهدف هو التحسن التدريجي وليس الإتقان من المحاولة الأولى.",
  },
];

const relatedArticles = [
  {
    slug: "how-to-memorize-times-tables",
    title: "كيف تساعد طفلك في حفظ جدول الضرب",
  },
  {
    slug: "mental-math-tips",
    title: "نصائح لتحسين الحساب الذهني",
  },
];

export default function MultiplicationQuizPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "أدوات", href: "/tools" },
        { label: "رياضيات", href: "/math" },
        { label: tool.title },
      ]}
    >
      <ToolTemplate
        tool={tool}
        faq={faq}
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        <MultiplicationQuizClient />
      </ToolTemplate>
    </PageLayout>
  );
}
