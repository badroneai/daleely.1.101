import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import PavClient from "@/components/tools/PavClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("perimeter-area-volume")!;
const relatedTools = getToolsByCategory("math").filter((t) => t.slug !== tool.slug).slice(0, 2);
export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  { question: "كيف أحسب محيط المستطيل؟", answer: "المحيط = ٢ × (الطول + العرض). مثال: مستطيل ٥×٣ محيطه ٢×(٥+٣) = ١٦." },
  { question: "ما الفرق بين المساحة والحجم؟", answer: "المساحة للأشكال المسطحة (الطول × العرض)، والحجم للمجسمات (الطول × العرض × الارتفاع)." },
];
const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps { searchParams: Promise<{ grade?: string }>; }
export default async function PavPage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;
  const grade = (gradeParam as GradeLevel | undefined) || "all";
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أدوات", href: "/tools" }, { label: "رياضيات", href: "/math" }, { label: tool.title }]}>
      <ToolTemplate tool={tool} faq={faq} relatedTools={relatedTools} relatedArticles={relatedArticles}>
        <PavClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
