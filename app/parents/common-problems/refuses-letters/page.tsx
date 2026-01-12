import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import RefusesLettersContent from "@/components/parents/RefusesLettersContent";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "يرفض الحروف/الحركات — كيف أتعامل معه؟ - Daleely.ai",
  description: "حلول عملية لمشكلة رفض الطفل للحروف والحركات. خطوات واضحة وأدوات مناسبة",
  alternates: {
    canonical: "https://daleely.ai/parents/common-problems/refuses-letters",
  },
  openGraph: {
    title: "يرفض الحروف/الحركات — كيف أتعامل معه؟ - Daleely.ai",
    description: "حلول عملية لمشكلة رفض الطفل للحروف والحركات",
    type: "article",
  },
};

export default function RefusesLettersPage() {
  const arabicTools = getToolsByCategory("arabic");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "مشاكل شائعة", href: "/parents/common-problems" },
        { label: "يرفض الحروف/الحركات" },
      ]}
    >
      <ArticleTemplate
        title="يرفض الحروف/الحركات — كيف أتعامل معه؟"
        description="حلول عملية لمشكلة رفض الطفل للحروف والحركات. خطوات واضحة وأدوات مناسبة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={arabicTools}
        content={<RefusesLettersContent />}
      />
    </PageLayout>
  );
}
