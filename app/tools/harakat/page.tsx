import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import HarakatClient from "@/components/tools/HarakatClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("harakat")!;
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
    question: "ما هي الحركات العربية؟",
    answer:
      "الحركات العربية هي علامات صغيرة توضع فوق أو تحت الحروف لتحديد طريقة نطقها. الحركات الأساسية هي: الفتحة (َ)، الضمة (ُ)، الكسرة (ِ)، والسكون (ْ).",
  },
  {
    question: "ما الفرق بين الفتحة والضمة والكسرة؟",
    answer:
      "الفتحة (َ) توضع فوق الحرف وتنطق كصوت 'أ' قصير. الضمة (ُ) توضع فوق الحرف وتنطق كصوت 'و' قصير. الكسرة (ِ) توضع تحت الحرف وتنطق كصوت 'ي' قصير. السكون (ْ) يعني عدم وجود حركة على الحرف.",
  },
  {
    question: "في أي مرحلة يجب تعليم الحركات للأطفال؟",
    answer:
      "عادة ما يتم تعليم الحركات في الصفوف 3-4 بعد إتقان الحروف الأساسية. لكن يمكن البدء بالتعريف البسيط للحركات في الصف الثاني.",
  },
  {
    question: "كيف أساعد طفلي في تعلم الحركات؟",
    answer:
      "ابدأ بحركة واحدة في كل مرة، استخدم أمثلة واضحة وبسيطة، اربط الحركات بأصوات مألوفة، واستخدم التكرار والمراجعة. الألعاب التفاعلية والتمارين تساعد كثيراً.",
  },
  {
    question: "هل يجب حفظ الحركات بالترتيب؟",
    answer:
      "ليس بالضرورة. يمكن البدء بالفتحة لأنها الأسهل والأكثر استخداماً، ثم الضمة والكسرة، وأخيراً السكون. المهم هو الفهم والتمييز بين الحركات.",
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

export default function HarakatPage() {
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
        <HarakatClient />
      </ToolTemplate>
    </PageLayout>
  );
}
