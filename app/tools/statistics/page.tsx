import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import StatisticsClient from "@/components/tools/StatisticsClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("statistics")!;
const relatedTools = getToolsByCategory("math").filter((t) => t.slug !== tool.slug).slice(0, 2);
export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  { question: "كيف أحسب المتوسط الحسابي؟", answer: "اجمع القيم جميعها ثم اقسم الناتج على عددها." },
  { question: "ما الوسيط؟", answer: "القيمة الوسطى بعد ترتيب القيم تصاعديًّا." },
];
const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps { searchParams: Promise<{ grade?: string }>; }
export default async function StatisticsPage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;
  const grade = (gradeParam as GradeLevel | undefined) || "all";
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أدوات", href: "/tools" }, { label: "رياضيات", href: "/math" }, { label: tool.title }]}>
      <ToolTemplate tool={tool} faq={faq} relatedTools={relatedTools} relatedArticles={relatedArticles}>
        <StatisticsClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
