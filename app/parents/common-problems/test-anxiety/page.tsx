import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import TestAnxietyContent from "@/components/parents/TestAnxietyContent";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "يتوتر من الاختبار — كيف أساعده؟ - Daleely.ai",
  description: "حلول عملية لمشكلة توتر الطفل من الاختبارات. خطوات واضحة وأدوات مناسبة",
  alternates: {
    canonical: "https://daleely.ai/parents/common-problems/test-anxiety",
  },
  openGraph: {
    title: "يتوتر من الاختبار — كيف أساعده؟ - Daleely.ai",
    description: "حلول عملية لمشكلة توتر الطفل من الاختبارات",
    type: "article",
  },
};

export default function TestAnxietyPage() {
  const mathTools = getToolsByCategory("math").filter((t) => t.slug.includes("quiz"));
  const arabicTools = getToolsByCategory("arabic");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "مشاكل شائعة", href: "/parents/common-problems" },
        { label: "يتوتر من الاختبار" },
      ]}
    >
      <ArticleTemplate
        title="يتوتر من الاختبار — كيف أساعده؟"
        description="حلول عملية لمشكلة توتر الطفل من الاختبارات. خطوات واضحة وأدوات مناسبة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={<TestAnxietyContent />}
      />
    </PageLayout>
  );
}
