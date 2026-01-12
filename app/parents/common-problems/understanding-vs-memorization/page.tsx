import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import UnderstandingVsMemorizationContent from "@/components/parents/UnderstandingVsMemorizationContent";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفهم vs الحفظ — ما الفرق في البيت؟ - Daleely.ai",
  description: "الفرق بين الفهم والحفظ في التعلم المنزلي. خطوات واضحة وأدوات مناسبة",
  alternates: {
    canonical: "https://daleely.ai/parents/common-problems/understanding-vs-memorization",
  },
  openGraph: {
    title: "الفهم vs الحفظ — ما الفرق في البيت؟ - Daleely.ai",
    description: "الفرق بين الفهم والحفظ في التعلم المنزلي",
    type: "article",
  },
};

export default function UnderstandingVsMemorizationPage() {
  const mathTools = getToolsByCategory("math");
  const arabicTools = getToolsByCategory("arabic");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "مشاكل شائعة", href: "/parents/common-problems" },
        { label: "الفهم vs الحفظ" },
      ]}
    >
      <ArticleTemplate
        title="الفهم vs الحفظ — ما الفرق في البيت؟"
        description="الفرق بين الفهم والحفظ في التعلم المنزلي. خطوات واضحة وأدوات مناسبة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={<UnderstandingVsMemorizationContent />}
      />
    </PageLayout>
  );
}
