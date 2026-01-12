import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import ArabicLettersClient from "@/components/tools/ArabicLettersClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("arabic-letters")!;
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
    question: "كم عدد الحروف العربية؟",
    answer:
      "الحروف العربية الأساسية هي 28 حرفاً، تبدأ بحرف الألف وتنتهي بحرف الياء. كل حرف له اسم وشكل مختلف حسب موقعه في الكلمة.",
  },
  {
    question: "ما هي أشكال الحروف العربية؟",
    answer:
      "كل حرف عربي له 4 أشكال: منفصل (عندما يكون وحده)، في البداية (عندما يبدأ الكلمة)، في الوسط (عندما يكون في وسط الكلمة)، وفي النهاية (عندما ينتهي الكلمة).",
  },
  {
    question: "كيف أساعد طفلي في تعلم الحروف العربية؟",
    answer:
      "ابدأ بحرف واحد في كل مرة، استخدم البطاقات والصور، اربط الحروف بأشياء من الحياة اليومية، واستخدم الألعاب والأغاني. الممارسة المنتظمة هي المفتاح.",
  },
  {
    question: "في أي عمر يجب أن يبدأ الطفل تعلم الحروف؟",
    answer:
      "يمكن البدء من سن 4-5 سنوات بالحروف البسيطة. الصف الأول هو الوقت المثالي لبدء التعلم المنهجي لجميع الحروف.",
  },
  {
    question: "هل يجب تعليم الحروف بالترتيب الأبجدي؟",
    answer:
      "ليس بالضرورة. يمكن البدء بالحروف الأسهل والأكثر استخداماً (مثل ب، ت، س، م)، ثم الانتقال للباقي تدريجياً.",
  },
];

const relatedArticles: Array<{ slug: string; title: string }> = [];

export default function ArabicLettersPage() {
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
        <ArabicLettersClient />
      </ToolTemplate>
    </PageLayout>
  );
}
