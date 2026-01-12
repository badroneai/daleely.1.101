import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import LetterSoundsClient from "@/components/tools/LetterSoundsClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("letter-sounds")!;
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
    question: "ما الفرق بين الحرف وصوت الحرف؟",
    answer:
      "الحرف هو الرمز المكتوب (مثل: ب، ت، ث)، بينما صوت الحرف هو كيفية نطقه. من المهم تعليم الطفل كليهما معاً لبناء أساس قوي في القراءة.",
  },
  {
    question: "كيف أساعد طفلي في تعلم أصوات الحروف؟",
    answer:
      "استخدم الأمثلة الواضحة، كرر الصوت عدة مرات، اطلب من الطفل أن يكرر الصوت، واستخدم الكلمات المألوفة. الممارسة المنتظمة هي المفتاح.",
  },
  {
    question: "هل يجب تعليم جميع الأصوات دفعة واحدة؟",
    answer:
      "لا، ابدأ بالأصوات البسيطة والأكثر استخداماً (مثل: ب، ت، س، م)، ثم انتقل للأصوات الأصعب تدريجياً. المهم هو الفهم وليس السرعة.",
  },
  {
    question: "ما أهمية تعلم أصوات الحروف؟",
    answer:
      "تعلم أصوات الحروف هو الأساس لتعلم القراءة. عندما يعرف الطفل أصوات الحروف، يمكنه دمجها لقراءة الكلمات والجمل.",
  },
  {
    question: "كيف أعرف أن طفلي يتقن أصوات الحروف؟",
    answer:
      "عندما يستطيع الطفل نطق الصوت بشكل صحيح، وربطه بالحرف المكتوب، واستخدامه في كلمات بسيطة. يمكنك اختباره بطلب نطق كلمات تبدأ بالحرف.",
  },
];

const relatedArticles: Array<{ slug: string; title: string }> = [];

export default function LetterSoundsPage() {
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
        <LetterSoundsClient />
      </ToolTemplate>
    </PageLayout>
  );
}
