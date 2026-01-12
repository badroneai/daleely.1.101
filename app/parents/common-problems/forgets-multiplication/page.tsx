import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import ForgetsMultiplicationContent from "@/components/parents/ForgetsMultiplicationContent";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "يحفظ ثم ينسى جدول الضرب — ما الحل؟ - Daleely.ai",
  description: "حلول عملية لمشكلة نسيان جدول الضرب بعد الحفظ. خطوات واضحة وأدوات مناسبة",
  alternates: {
    canonical: "https://daleely.ai/parents/common-problems/forgets-multiplication",
  },
  openGraph: {
    title: "يحفظ ثم ينسى جدول الضرب — ما الحل؟ - Daleely.ai",
    description: "حلول عملية لمشكلة نسيان جدول الضرب بعد الحفظ",
    type: "article",
  },
};

export default function ForgetsMultiplicationPage() {
  const mathTools = getToolsByCategory("math").filter(
    (t) => t.slug.includes("multiplication")
  );

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "مشاكل شائعة", href: "/parents/common-problems" },
        { label: "يحفظ ثم ينسى جدول الضرب" },
      ]}
    >
      <ArticleTemplate
        title="يحفظ ثم ينسى جدول الضرب — ما الحل؟"
        description="حلول عملية لمشكلة نسيان جدول الضرب بعد الحفظ. خطوات واضحة وأدوات مناسبة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={mathTools}
        content={<ForgetsMultiplicationContent />}
      />
    </PageLayout>
  );
}
