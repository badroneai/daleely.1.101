import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import FractionOpsClient from "@/components/tools/FractionOpsClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("fraction-operations")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  {
    question: "كيف أجمع الكسور المتشابهة؟",
    answer:
      "الكسور المتشابهة لها المقام نفسه، فنجمع البسطين ويبقى المقام كما هو. مثال: ٢/٥ + ١/٥ = ٣/٥.",
  },
  {
    question: "ما معنى تبسيط الكسر؟",
    answer:
      "تبسيط الكسر يعني كتابته بأبسط صورة بقسمة البسط والمقام على قاسمهما المشترك الأكبر. مثال: ٦/٨ = ٣/٤.",
  },
  {
    question: "في أي صف تُدرّس هذه المهارات؟",
    answer:
      "تبدأ عمليات الكسور (الجمع والطرح والتبسيط) في المرحلة الابتدائية العليا (الرابع/الخامس) وفق المنهج السعودي.",
  },
];

const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps {
  searchParams: Promise<{ grade?: string }>;
}

export default async function FractionOperationsPage({ searchParams }: PageProps) {
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
        <FractionOpsClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
