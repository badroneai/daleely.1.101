import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import SyllablesBlendingClient from "@/components/tools/SyllablesBlendingClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("syllables-blending")!;
const relatedTools = getToolsByCategory("arabic")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(
  tool.title,
  tool.description,
  tool.slug
);

const faq = [
  {
    question: "ما هي المقاطع في اللغة العربية؟",
    answer:
      "المقطع هو مجموعة من الحروف التي تنطق معاً. المقطع البسيط يتكون من حرف ساكن وحرف متحرك (مثل: با، تا، سا). تعلم المقاطع يساعد الأطفال على قراءة الكلمات بسهولة.",
  },
  {
    question: "كيف يساعد دمج المقاطع في القراءة؟",
    answer:
      "عندما يتعلم الطفل المقاطع، يمكنه دمجها لتكوين كلمات كاملة. مثلاً: با + ب = باب. هذه الطريقة تجعل القراءة أسهل وأسرع.",
  },
  {
    question: "في أي مرحلة يجب تعليم المقاطع والدمج؟",
    answer:
      "عادة ما يتم تعليم المقاطع والدمج في الصفوف 3-4 بعد إتقان الحروف والحركات. لكن يمكن البدء بالتعريف البسيط في نهاية الصف الثاني.",
  },
  {
    question: "كيف أساعد طفلي في تعلم المقاطع؟",
    answer:
      "ابدأ بمقاطع بسيطة (حرف + حركة)، استخدم أمثلة واضحة، اربط المقاطع بكلمات مألوفة، واستخدم التكرار والمراجعة. الألعاب التفاعلية والتمارين تساعد كثيراً.",
  },
  {
    question: "ما الفرق بين المقطع والكلمة؟",
    answer:
      "المقطع هو جزء من الكلمة (مثل: با، تا)، بينما الكلمة هي مجموعة من المقاطع (مثل: باب = با + ب). تعلم المقاطع هو الخطوة الأولى نحو قراءة الكلمات الكاملة.",
  },
];

const relatedArticles: Array<{ slug: string; title: string }> = [
  {
    slug: "teaching-arabic-letters",
    title: "كيف تساعد طفلك في تعلم الحروف العربية",
  },
  {
    slug: "arabic-reading-tips",
    title: "نصائح لتحسين مهارات القراءة العربية",
  },
];

interface PageProps {
  searchParams: { grade?: string };
}

export default function SyllablesBlendingPage({ searchParams }: PageProps) {
  // قراءة grade من query params، مع fallback إلى "all" إذا لم يكن موجوداً
  const grade = (searchParams.grade as GradeLevel | undefined) || "all";

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "أدوات", href: "/tools" },
        { label: "اللغة العربية", href: "/arabic" },
        { label: tool.title },
      ]}
    >
      <ToolTemplate
        tool={tool}
        faq={faq}
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        <SyllablesBlendingClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
