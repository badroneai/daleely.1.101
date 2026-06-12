import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import DecimalsClient from "@/components/tools/DecimalsClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("decimals")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  {
    question: "ما الكسر العشري؟",
    answer:
      "الكسر العشري طريقة لكتابة الأجزاء باستعمال الفاصلة العشرية، مثل ٠٫٧ (سبعة أعشار) و٠٫٤٥ (خمسة وأربعون جزءًا من مئة). عدد المنازل بعد الفاصلة يحدّده المقام (١٠، ١٠٠، ١٠٠٠).",
  },
  {
    question: "في أي صف تبدأ الكسور العشرية؟",
    answer:
      "تبدأ الكسور العشرية في المرحلة الابتدائية العليا (الرابع/الخامس) وفق المنهج السعودي، وتتوسّع حتى أجزاء الألف في الصف الخامس.",
  },
  {
    question: "كيف تدرّب هذه الأداة طفلي؟",
    answer:
      "ثلاث مهارات: قراءة الكسر العشري من الكسر الاعتيادي، مقارنة الكسور العشرية، والتحويل بين الصورتين — مع شرح للطريقة بعد كل إجابة.",
  },
];

const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps {
  searchParams: Promise<{ grade?: string }>;
}

export default async function DecimalsPage({ searchParams }: PageProps) {
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
        <DecimalsClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
