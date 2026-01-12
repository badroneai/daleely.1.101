import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import MentalMathAddSubClient from "@/components/tools/MentalMathAddSubClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("mental-math-add-sub")!;
const relatedTools = getToolsByCategory("math")
  .filter((t) => t.slug !== tool.slug)
  .slice(0, 2);

export const metadata: Metadata = generateToolMetadata(
  tool.title,
  tool.description,
  tool.slug
);

const faq = [
  {
    question: "ما هو الحساب الذهني؟",
    answer:
      "الحساب الذهني هو القدرة على حل المسائل الحسابية (جمع، طرح، ضرب، قسمة) في العقل دون استخدام ورقة أو آلة حاسبة. هذه المهارة مهمة جداً في الحياة اليومية.",
  },
  {
    question: "في أي عمر يجب أن يبدأ الطفل تعلم الحساب الذهني؟",
    answer:
      "يمكن البدء من الصف الأول (6-7 سنوات) بالجمع والطرح البسيط للأرقام الصغيرة (1-20). مع التقدم في العمر، يمكن زيادة صعوبة المسائل تدريجياً.",
  },
  {
    question: "كيف أساعد طفلي في تحسين الحساب الذهني؟",
    answer:
      "ابدأ بمسائل بسيطة، استخدم أمثلة من الحياة اليومية، مارس بانتظام (10-15 دقيقة يومياً)، واستخدم الألعاب والأنشطة التفاعلية لجعل التعلم ممتعاً.",
  },
  {
    question: "كم من الوقت يحتاج الطفل لإتقان الحساب الذهني؟",
    answer:
      "يختلف الأمر من طفل لآخر، لكن مع الممارسة المنتظمة (10-15 دقيقة يومياً)، يمكن ملاحظة تحسن واضح خلال 2-3 أشهر. الإتقان الكامل يحتاج لوقت أطول.",
  },
  {
    question: "ما الفرق بين الجمع والطرح الذهني؟",
    answer:
      "الجمع أسهل عادة لأنه يتطلب إضافة أرقام. الطرح أصعب قليلاً لأنه يتطلب التفكير بالعكس. ينصح بالبدء بالجمع ثم الانتقال للطرح تدريجياً.",
  },
  {
    question: "هل يجب أن يحفظ الطفل النتائج؟",
    answer:
      "لا، الهدف هو فهم العملية وليس الحفظ. مع الممارسة، سيتذكر الطفل النتائج تلقائياً. المهم هو فهم كيفية الوصول للإجابة وليس حفظها فقط.",
  },
];

const relatedArticles = [
  {
    slug: "mental-math-tips",
    title: "نصائح لتحسين الحساب الذهني",
  },
];

export default function MentalMathAddSubPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "أدوات", href: "/tools" },
        { label: "رياضيات", href: "/math" },
        { label: tool.title },
      ]}
    >
      <ToolTemplate
        tool={tool}
        faq={faq}
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        <MentalMathAddSubClient />
      </ToolTemplate>
    </PageLayout>
  );
}
