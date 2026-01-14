import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import TellingTimeClient from "@/components/tools/TellingTimeClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("telling-time")!;
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
    question: "في أي عمر يجب أن يتعلم الطفل قراءة الساعة؟",
    answer:
      "عادة يبدأ تعلم قراءة الساعة في الصف الخامس (10-11 سنوات)، لكن يمكن البدء في الصف الرابع للأساليب البسيطة. المهم هو أن يكون الطفل قد أتقن الأرقام والعد.",
  },
  {
    question: "ما الفرق بين قراءة الساعة بالعربية والإنجليزية؟",
    answer:
      "القراءة بالعربية تستخدم مصطلحات مثل 'الربع' و'النصف' و'إلا'، بينما الإنجليزية تستخدم نظام 12 ساعة مع AM/PM. كلاهما مهم للطفل.",
  },
  {
    question: "كيف أساعد طفلي في تعلم قراءة الساعة؟",
    answer:
      "ابدأ بساعة حقيقية، اشرح حركة العقارب، استخدم أمثلة من الحياة اليومية، ومارس بانتظام. يمكنك أيضاً استخدام أدواتنا التفاعلية لجعل التعلم أكثر متعة.",
  },
  {
    question: "كم من الوقت يحتاج الطفل لإتقان قراءة الساعة؟",
    answer:
      "مع الممارسة المنتظمة (10-15 دقيقة يومياً)، يمكن للطفل أن يتقن قراءة الساعة خلال 2-3 أشهر. البداية قد تكون صعبة لكن مع الصبر سيتحسن.",
  },
  {
    question: "هل يجب أن يتعلم الطفل الساعة الرقمية أم التناظرية أولاً؟",
    answer:
      "ينصح بتعلم الساعة التناظرية (العقارب) أولاً لأنها تساعد في فهم مفهوم الوقت بشكل أفضل. بعد الإتقان، يمكن الانتقال للساعة الرقمية.",
  },
];

const relatedArticles: Array<{ slug: string; title: string }> = [];

interface PageProps {
  searchParams: { grade?: string };
}

export default function TellingTimePage({ searchParams }: PageProps) {
  // قراءة grade من query params، مع fallback إلى "all" إذا لم يكن موجوداً
  const grade = (searchParams.grade as GradeLevel | undefined) || "all";

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
        <TellingTimeClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
