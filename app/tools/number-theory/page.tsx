import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import NumberTheoryClient from "@/components/tools/NumberTheoryClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("number-theory")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  { question: "ما القاسم؟", answer: "القاسم عدد يقسم عددًا آخر دون باقٍ. مثال: ٣ قاسم للعدد ١٢ لأن ١٢ ÷ ٣ = ٤." },
  { question: "ما العدد الأوليّ؟", answer: "العدد الأوليّ عدد أكبر من ١ وقاسماه الوحيدان هما ١ ونفسه، مثل ٢، ٣، ٥، ٧، ١١." },
  { question: "ما القاسم المشترك الأكبر؟", answer: "أكبر عدد يقسم عددين معًا دون باقٍ. مثال: القاسم المشترك الأكبر لـ ١٢ و١٨ هو ٦." },
];

const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps {
  searchParams: Promise<{ grade?: string }>;
}

export default async function NumberTheoryPage({ searchParams }: PageProps) {
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
        <NumberTheoryClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
