import PageLayout from "@/components/PageLayout";
import ArticleTemplate from "@/components/templates/ArticleTemplate";
import ChildGetsBoredContent from "@/components/parents/ChildGetsBoredContent";
import { getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "طفلي يمل بسرعة — ماذا أفعل؟ - Daleely.ai",
  description: "حلول عملية لمشكلة ملل الطفل السريع أثناء التعلم. خطوات واضحة وأدوات مناسبة",
  alternates: {
    canonical: "https://daleely.ai/parents/common-problems/child-gets-bored",
  },
  openGraph: {
    title: "طفلي يمل بسرعة — ماذا أفعل؟ - Daleely.ai",
    description: "حلول عملية لمشكلة ملل الطفل السريع أثناء التعلم",
    type: "article",
  },
};

export default function ChildGetsBoredPage() {
  const mathTools = getToolsByCategory("math").slice(0, 2);
  const arabicTools = getToolsByCategory("arabic").slice(0, 2);

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "مشاكل شائعة", href: "/parents/common-problems" },
        { label: "طفلي يمل بسرعة" },
      ]}
    >
      <ArticleTemplate
        title="طفلي يمل بسرعة — ماذا أفعل؟"
        description="حلول عملية لمشكلة ملل الطفل السريع أثناء التعلم. خطوات واضحة وأدوات مناسبة"
        category="parents"
        publishedAt="2024-02-15"
        relatedTools={[...mathTools, ...arabicTools]}
        content={<ChildGetsBoredContent />}
      />
    </PageLayout>
  );
}
