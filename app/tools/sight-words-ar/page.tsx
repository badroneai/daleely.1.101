import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import SightWordsArClient from "@/components/tools/SightWordsArClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("sight-words-ar")!;
const relatedTools = getToolsByCategory("arabic")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(
  tool.title,
  tool.description,
  tool.slug
);

const faq = [
  {
    question: "ما هي الكلمات البصرية؟",
    answer:
      "الكلمات البصرية هي الكلمات الشائعة التي يراها الطفل كثيراً في النصوص العربية. هذه الكلمات يجب حفظها بسرعة لأنها تظهر بشكل متكرر وتساعد في تحسين سرعة القراءة.",
  },
  {
    question: "لماذا تعلم الكلمات البصرية مهم؟",
    answer:
      "تعلم الكلمات البصرية يحسن سرعة القراءة وطلاقة الطفل. عندما يعرف الطفل هذه الكلمات تلقائياً، يمكنه التركيز على فهم النص بدلاً من محاولة قراءة كل كلمة.",
  },
  {
    question: "كم عدد الكلمات البصرية التي يجب أن يتعلمها الطفل؟",
    answer:
      "يبدأ الطفل بتعلم 20-30 كلمة بصرية أساسية في الصفوف الأولى، ثم يضيف المزيد تدريجياً. في الصفوف المتقدمة (5-6)، يجب أن يعرف الطفل 100-200 كلمة بصرية شائعة.",
  },
  {
    question: "كيف أساعد طفلي في حفظ الكلمات البصرية؟",
    answer:
      "استخدم التكرار والمراجعة، اربط الكلمات بجمل وأمثلة، استخدم البطاقات التعليمية، ومارس القراءة اليومية. الألعاب التفاعلية والتمارين تساعد كثيراً في الحفظ.",
  },
  {
    question: "ما الفرق بين الكلمات البصرية والكلمات العادية؟",
    answer:
      "الكلمات البصرية هي كلمات شائعة جداً تظهر كثيراً في النصوص (مثل: هذا، في، من، كان). يجب حفظها بسرعة لأنها أساسية للقراءة. الكلمات العادية يمكن قراءتها باستخدام قواعد القراءة.",
  },
];

const relatedArticles: Array<{ slug: string; title: string }> = [
  {
    slug: "arabic-reading-tips",
    title: "نصائح لتحسين مهارات القراءة العربية",
  },
];

export default function SightWordsArPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "أدوات", href: "/tools" },
        { label: "اللغة العربية", href: "/arabic" },
        { label: tool.title },
      ]}
    >
      <ToolTemplate
        tool={tool}
        faq={faq}
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        <SightWordsArClient />
      </ToolTemplate>
    </PageLayout>
  );
}
