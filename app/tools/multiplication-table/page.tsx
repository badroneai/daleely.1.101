import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import MultiplicationTableClient from "@/components/tools/MultiplicationTableClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("multiplication-table")!;
const relatedTools = getToolsByCategory("math").filter((t) => t.slug !== tool.slug).slice(0, 2);

export const metadata: Metadata = generateToolMetadata(
  tool.title,
  tool.description,
  tool.slug
);

const faq = [
  {
    question: "ما هو أفضل وقت لممارسة جدول الضرب؟",
    answer:
      "ينصح بممارسة جدول الضرب يومياً لمدة 10-15 دقيقة. يمكن تقسيم الوقت على فترات قصيرة (5 دقائق صباحاً و5 دقائق مساءً) للحصول على أفضل النتائج.",
  },
  {
    question: "كيف أساعد طفلي في حفظ جدول الضرب؟",
    answer:
      "ابدأ بجدول واحد في كل مرة، استخدم التكرار والمراجعة، واجعل التعلم ممتعاً باستخدام الألعاب والأنشطة التفاعلية. الصبر والممارسة المنتظمة هما المفتاح.",
  },
  {
    question: "في أي عمر يجب أن يتعلم الطفل جدول الضرب؟",
    answer:
      "عادة يبدأ تعلم جدول الضرب في الصف الثالث (8-9 سنوات)، لكن يمكن البدء في الصف الثاني للجداول البسيطة (2، 3، 4، 5).",
  },
  {
    question: "كم من الوقت يحتاج الطفل لحفظ جدول الضرب؟",
    answer:
      "يختلف الأمر من طفل لآخر، لكن مع الممارسة المنتظمة (10-15 دقيقة يومياً)، يمكن للطفل أن يحفظ معظم الجداول خلال 2-3 أشهر.",
  },
  {
    question: "هل يجب حفظ جميع الجداول؟",
    answer:
      "نعم، لكن بشكل تدريجي. ابدأ بالجداول البسيطة (2، 3، 4، 5) ثم انتقل للجداول الأصعب. المهم هو الفهم وليس الحفظ فقط.",
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

interface PageProps {
  searchParams: { grade?: string };
}

export default function MultiplicationTablePage({ searchParams }: PageProps) {
  // قراءة grade من query params، مع fallback إلى "all" إذا لم يكن موجوداً
  const grade = (searchParams.grade as GradeLevel | undefined) || "all";

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
        <MultiplicationTableClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
