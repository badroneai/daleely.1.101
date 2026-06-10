import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import FractionsClient from "@/components/tools/FractionsClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("fractions")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  {
    question: "ما هو الكسر؟",
    answer:
      "الكسر يمثّل جزءاً من كلٍّ مقسوم إلى أجزاء متكافئة. يتكوّن من البسط (الرقم الأعلى: عدد الأجزاء المأخوذة) والمقام (الرقم الأسفل: عدد كل الأجزاء المتكافئة).",
  },
  {
    question: "في أي صف تبدأ الكسور؟",
    answer:
      "تبدأ الكسور البسيطة (مثل النصف والثلث والربع) في الصف الثالث الابتدائي وفق المنهج السعودي، ثم تتوسع في الصفوف التالية.",
  },
  {
    question: "كيف تدرّب هذه الأداة طفلي؟",
    answer:
      "تدرّب على ثلاث مهارات: تمثيل الكسر من شكل ملوّن، تمييز البسط والمقام، ومقارنة الكسور — مع شرح للطريقة بعد كل إجابة.",
  },
];

const relatedArticles = [
  { slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" },
];

interface PageProps {
  searchParams: Promise<{ grade?: string }>;
}

export default async function FractionsPage({ searchParams }: PageProps) {
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
        <FractionsClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
