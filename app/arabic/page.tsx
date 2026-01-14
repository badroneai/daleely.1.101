import PageLayout from "@/components/PageLayout";
import PillarTemplate from "@/components/templates/PillarTemplate";
import { getToolsByCategory, getToolsByGradeLevel, getToolsByStage } from "@/lib/tools";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "اللغة العربية",
  "أدوات تعليمية تفاعلية لتعلم اللغة العربية: الحروف، الأصوات، الحركات، المقاطع وأكثر",
  "arabic"
);

const arabicTools = getToolsByCategory("arabic");
const topTools = arabicTools.slice(0, 3);

// تجميع الأدوات حسب كل صف منفصلاً
const toolsByGrade = {
  kg: {
    kg1: getToolsByGradeLevel("kg1").filter((t) => t.category === "arabic"),
    kg2: getToolsByGradeLevel("kg2").filter((t) => t.category === "arabic"),
    kg3: getToolsByGradeLevel("kg3").filter((t) => t.category === "arabic"),
  },
  elementary: {
    grade1: getToolsByGradeLevel("grade1").filter((t) => t.category === "arabic"),
    grade2: getToolsByGradeLevel("grade2").filter((t) => t.category === "arabic"),
    grade3: getToolsByGradeLevel("grade3").filter((t) => t.category === "arabic"),
    grade4: getToolsByGradeLevel("grade4").filter((t) => t.category === "arabic"),
    grade5: getToolsByGradeLevel("grade5").filter((t) => t.category === "arabic"),
    grade6: getToolsByGradeLevel("grade6").filter((t) => t.category === "arabic"),
  },
  middle: {
    grade7: getToolsByGradeLevel("grade7").filter((t) => t.category === "arabic"),
    grade8: getToolsByGradeLevel("grade8").filter((t) => t.category === "arabic"),
    grade9: getToolsByGradeLevel("grade9").filter((t) => t.category === "arabic"),
  },
};

const learningPath = [
  {
    step: 1,
    title: "تعلم الحروف العربية",
    description: "تعرف على الحروف العربية مع أشكالها المختلفة",
    toolSlug: "arabic-letters",
  },
  {
    step: 2,
    title: "أصوات الحروف",
    description: "تعلم أصوات الحروف العربية مع أمثلة واضحة",
    toolSlug: "letter-sounds",
  },
  {
    step: 3,
    title: "الحركات العربية",
    description: "تعلم الفتحة والضمة والكسرة والسكون",
    toolSlug: "harakat",
  },
  {
    step: 4,
    title: "المقاطع والدمج",
    description: "تعلم تكوين المقاطع ودمج الحروف لقراءة الكلمات",
    toolSlug: "syllables-blending",
  },
  {
    step: 5,
    title: "الكلمات البصرية",
    description: "احفظ الكلمات الشائعة في اللغة العربية",
    toolSlug: "sight-words-ar",
  },
];

const articles = [
  {
    slug: "teaching-arabic-letters",
    title: "كيف تساعد طفلك في تعلم الحروف العربية",
  },
  {
    slug: "arabic-reading-tips",
    title: "نصائح لتحسين مهارات القراءة العربية",
  },
];

const faq = [
  {
    question: "ما هي أفضل طريقة لتعليم اللغة العربية للأطفال؟",
    answer:
      "أفضل طريقة هي البدء بالحروف والأصوات، ثم الانتقال للحركات والمقاطع، وأخيراً الكلمات والجمل. استخدم التكرار والمراجعة، واجعل التعلم ممتعاً باستخدام الألعاب والأنشطة التفاعلية.",
  },
  {
    question: "في أي عمر يجب أن يبدأ الطفل تعلم اللغة العربية؟",
    answer:
      "يمكن البدء من سن 4-5 سنوات بالحروف والأصوات البسيطة. الصف الأول هو الوقت المثالي لبدء التعلم المنهجي للقراءة والكتابة.",
  },
  {
    question: "كيف أساعد طفلي في تعلم الحروف العربية؟",
    answer:
      "ابدأ بحرف واحد في كل مرة، استخدم البطاقات والصور، اربط الحروف بأشياء من الحياة اليومية، واستخدم الأغاني والألعاب التفاعلية. الممارسة المنتظمة هي المفتاح.",
  },
  {
    question: "ما الفرق بين الحروف والأصوات؟",
    answer:
      "الحروف هي الرموز المكتوبة (أ، ب، ت...)، بينما الأصوات هي كيفية نطق هذه الحروف. من المهم تعليم الطفل كليهما معاً.",
  },
  {
    question: "كم من الوقت يحتاج الطفل لإتقان القراءة العربية؟",
    answer:
      "مع الممارسة المنتظمة (15-20 دقيقة يومياً)، يمكن للطفل أن يبدأ القراءة البسيطة خلال 3-6 أشهر. الإتقان الكامل يحتاج لوقت أطول وممارسة مستمرة.",
  },
];

export default function ArabicPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "اللغة العربية" },
      ]}
    >
      <PillarTemplate
        title="اللغة العربية"
        description="اكتشف مجموعة شاملة من الأدوات التفاعلية لتعلم اللغة العربية. من الحروف والأصوات إلى الحركات والمقاطع، كل شيء مصمم لمساعدة أطفالك في بناء أساس قوي في اللغة العربية بطريقة ممتعة وتفاعلية."
        category="arabic"
        topTools={topTools}
        toolsByGrade={toolsByGrade}
        learningPath={learningPath}
        articles={articles}
        faq={faq}
      />
    </PageLayout>
  );
}
