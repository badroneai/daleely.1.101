import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import PlaceValueClient from "@/components/tools/PlaceValueClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("place-value")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  {
    question: "ما هي القيمة المنزلية؟",
    answer:
      "القيمة المنزلية تدل على قيمة كل رقم في العدد حسب موقعه: الآحاد، العشرات، المئات، الألوف. فمثلاً في العدد 4523 قيمة الرقم 5 هي 500 لأنه في منزلة المئات.",
  },
  {
    question: "في أي صف يتعلم الطفل القيمة المنزلية؟",
    answer:
      "تبدأ القيمة المنزلية في الصف الأول (العشرات) وتتوسع تدريجياً حتى الألوف وعشرات الألوف في الصف الثالث والرابع، وفق المنهج السعودي.",
  },
  {
    question: "كيف تساعد هذه الأداة طفلي؟",
    answer:
      "تدرّب الأداة على ثلاث مهارات: معرفة قيمة الرقم في منزلته، تكوين العدد من منازله، ومقارنة الأعداد — مع تلميح يشرح الطريقة بعد كل إجابة.",
  },
];

const relatedArticles = [
  { slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" },
];

interface PageProps {
  searchParams: Promise<{ grade?: string }>;
}

export default async function PlaceValuePage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;
  const grade = (gradeParam as GradeLevel | undefined) || "all";

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "أدوات", href: "/tools" },
        { label: "رياضيات", href: "/math" },
        { label: tool.title },
      ]}
    >
      <ToolTemplate tool={tool} faq={faq} relatedTools={relatedTools} relatedArticles={relatedArticles}>
        <PlaceValueClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
