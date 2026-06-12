import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import AlgebraClient from "@/components/tools/AlgebraClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("algebra")!;
const relatedTools = getToolsByCategory("math").filter((t) => t.slug !== tool.slug).slice(0, 2);
export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  { question: "ما العبارة الجبرية؟", answer: "عبارة تحتوي على متغيّر مثل س، نوجد قيمتها بتعويض قيمة المتغيّر ثم الحساب." },
  { question: "ما ترتيب العمليات؟", answer: "نُجري الضرب والقسمة قبل الجمع والطرح. مثال: ٢ + ٣ × ٤ = ٢ + ١٢ = ١٤." },
];
const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps { searchParams: Promise<{ grade?: string }>; }
export default async function AlgebraPage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;
  const grade = (gradeParam as GradeLevel | undefined) || "all";
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أدوات", href: "/tools" }, { label: "رياضيات", href: "/math" }, { label: tool.title }]}>
      <ToolTemplate tool={tool} faq={faq} relatedTools={relatedTools} relatedArticles={relatedArticles}>
        <AlgebraClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
