import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import WorksheetGeneratorClient from "@/components/tools/WorksheetGeneratorClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const tool = getToolBySlug("worksheet-generator")!;
const relatedTools = getToolsByCategory("teachers").filter((t) => t.slug !== tool.slug).slice(0, 2);

export const metadata: Metadata = generateToolMetadata(
  tool.title,
  tool.description,
  tool.slug
);

const faq = [
  {
    question: "كيف يمكنني استخدام مولّد أوراق العمل؟",
    answer:
      "اختر نوع التمرين (جدول الضرب، الجمع، الطرح، الحروف العربية، أو الكلمات العربية)، ثم حدد المرحلة الدراسية وعدد الأسئلة. اضغط على 'إنشاء ورقة العمل' ثم يمكنك طباعتها أو تحميلها.",
  },
  {
    question: "هل يمكنني طباعة أوراق العمل؟",
    answer:
      "نعم، يمكنك طباعة أوراق العمل مباشرة من المتصفح باستخدام زر 'طباعة'. سيتم تنسيق الورقة تلقائياً للطباعة مع إخفاء الأزرار غير الضرورية.",
  },
  {
    question: "هل يمكنني تضمين الإجابات في ورقة العمل؟",
    answer:
      "نعم، يمكنك تفعيل خيار 'تضمين الإجابات في ورقة العمل' قبل إنشاء الورقة. ستظهر الإجابات في صفحة منفصلة في نهاية الورقة.",
  },
  {
    question: "ما هي أنواع التمارين المتاحة؟",
    answer:
      "نوفر 5 أنواع من التمارين: جدول الضرب، الجمع، الطرح، الحروف العربية، والكلمات العربية. يمكنك اختيار النوع المناسب لاحتياجاتك.",
  },
  {
    question: "كم عدد الأسئلة التي يمكنني إنشاؤها؟",
    answer:
      "يمكنك إنشاء من 5 إلى 30 سؤال في كل ورقة عمل. استخدم شريط التمرير لاختيار العدد المناسب.",
  },
  {
    question: "هل يمكنني استخدام أوراق العمل في الفصل الدراسي؟",
    answer:
      "نعم، يمكنك استخدام أوراق العمل في الفصل الدراسي أو للواجبات المنزلية. الأوراق مناسبة للطباعة والاستخدام التعليمي.",
  },
];

const relatedArticles: Array<{ slug: string; title: string }> = [];

export default function WorksheetGeneratorPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "أدوات", href: "/tools" },
        { label: "للمعلمين", href: "/teachers" },
        { label: tool.title },
      ]}
    >
      <ToolTemplate
        tool={tool}
        faq={faq}
        relatedTools={relatedTools}
        relatedArticles={relatedArticles}
      >
        <WorksheetGeneratorClient />
      </ToolTemplate>
    </PageLayout>
  );
}
