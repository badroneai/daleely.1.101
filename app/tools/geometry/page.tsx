import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import GeometryClient from "@/components/tools/GeometryClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("geometry")!;
const relatedTools = getToolsByCategory("math").filter((t) => t.slug !== tool.slug).slice(0, 2);
export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  { question: "ما الأشكال الرباعية؟", answer: "أشكال لها أربعة أضلاع، مثل المربع والمستطيل والمعيّن وشبه المنحرف، ويُميَّز كل منها بخصائص أضلاعه وزواياه." },
  { question: "ما المستوى الإحداثي؟", answer: "مستوٍ نحدّد فيه النقطة بزوج مرتّب (السيني، الصادي)؛ السيني أفقي والصادي رأسي." },
];
const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps { searchParams: Promise<{ grade?: string }>; }
export default async function GeometryPage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;
  const grade = (gradeParam as GradeLevel | undefined) || "all";
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أدوات", href: "/tools" }, { label: "رياضيات", href: "/math" }, { label: tool.title }]}>
      <ToolTemplate tool={tool} faq={faq} relatedTools={relatedTools} relatedArticles={relatedArticles}>
        <GeometryClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
