import PageLayout from "@/components/PageLayout";
import StudentGradePageClient from "@/components/student/StudentGradePageClient";
import { getGradeLevelLabel, getToolsForGrade } from "@/lib/tools";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type GradeLevel = "kg1" | "kg2" | "kg3" | "grade1" | "grade2" | "grade3" | "grade4" | "grade5" | "grade6" | "grade7" | "grade8" | "grade9";

const validGradeLevels: GradeLevel[] = [
  "kg1", "kg2", "kg3",
  "grade1", "grade2", "grade3", "grade4", "grade5", "grade6",
  "grade7", "grade8", "grade9",
];

// Learning paths لكل مادة
const mathLearningPaths: Record<GradeLevel, Array<{ step: number; title: string; description: string; toolSlug?: string }>> = {
  kg1: [],
  kg2: [],
  kg3: [],
  grade1: [
    {
      step: 1,
      title: "الجمع والطرح الأساسي",
      description: "ابدأ بتعلم الجمع والطرح للأرقام الصغيرة (1-20)",
      toolSlug: "mental-math-add-sub",
    },
  ],
  grade2: [
    {
      step: 1,
      title: "الجمع والطرح الأساسي",
      description: "طور مهاراتك في الجمع والطرح للأرقام الأكبر",
      toolSlug: "mental-math-add-sub",
    },
  ],
  grade3: [
    {
      step: 1,
      title: "جدول الضرب",
      description: "تعلم جدول الضرب من 2 إلى 10 مع تمارين تفاعلية",
      toolSlug: "multiplication-table",
    },
    {
      step: 2,
      title: "اختبار الضرب",
      description: "اختبر معرفتك بجدول الضرب مع أسئلة متنوعة",
      toolSlug: "multiplication-quiz",
    },
  ],
  grade4: [
    {
      step: 1,
      title: "جدول الضرب",
      description: "تعلم جدول الضرب من 2 إلى 10 مع تمارين تفاعلية",
      toolSlug: "multiplication-table",
    },
    {
      step: 2,
      title: "اختبار الضرب",
      description: "اختبر معرفتك بجدول الضرب مع أسئلة متنوعة",
      toolSlug: "multiplication-quiz",
    },
  ],
  grade5: [
    {
      step: 1,
      title: "قراءة الساعة",
      description: "تعلم قراءة الساعة والوقت بالعربية والإنجليزية",
      toolSlug: "telling-time",
    },
  ],
  grade6: [
    {
      step: 1,
      title: "قراءة الساعة",
      description: "تعلم قراءة الساعة والوقت بالعربية والإنجليزية",
      toolSlug: "telling-time",
    },
  ],
  grade7: [],
  grade8: [],
  grade9: [],
};

const arabicLearningPaths: Record<GradeLevel, Array<{ step: number; title: string; description: string; toolSlug?: string }>> = {
  kg1: [],
  kg2: [],
  kg3: [],
  grade1: [
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
  ],
  grade2: [
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
  ],
  grade3: [
    {
      step: 1,
      title: "الحركات العربية",
      description: "تعلم الفتحة والضمة والكسرة والسكون",
      toolSlug: "harakat",
    },
    {
      step: 2,
      title: "المقاطع والدمج",
      description: "تعلم تكوين المقاطع ودمج الحروف لقراءة الكلمات",
      toolSlug: "syllables-blending",
    },
  ],
  grade4: [
    {
      step: 1,
      title: "الحركات العربية",
      description: "تعلم الفتحة والضمة والكسرة والسكون",
      toolSlug: "harakat",
    },
    {
      step: 2,
      title: "المقاطع والدمج",
      description: "تعلم تكوين المقاطع ودمج الحروف لقراءة الكلمات",
      toolSlug: "syllables-blending",
    },
  ],
  grade5: [
    {
      step: 1,
      title: "الكلمات البصرية",
      description: "احفظ الكلمات الشائعة في اللغة العربية",
      toolSlug: "sight-words-ar",
    },
  ],
  grade6: [
    {
      step: 1,
      title: "الكلمات البصرية",
      description: "احفظ الكلمات الشائعة في اللغة العربية",
      toolSlug: "sight-words-ar",
    },
  ],
  grade7: [],
  grade8: [],
  grade9: [],
};

interface PageProps {
  params: {
    gradeLevel: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { gradeLevel } = params;
  
  if (!validGradeLevels.includes(gradeLevel as GradeLevel)) {
    return {
      title: "الصف غير موجود - Daleely.ai",
    };
  }

  const gradeLabel = getGradeLevelLabel(gradeLevel as GradeLevel);
  
  return generatePillarMetadata(
    gradeLabel,
    `الأدوات التعليمية المناسبة ل${gradeLabel} في الرياضيات واللغة العربية`,
    `student/${gradeLevel}`
  );
}

export default function StudentGradePage({ params }: PageProps) {
  const { gradeLevel } = params;

  if (!validGradeLevels.includes(gradeLevel as GradeLevel)) {
    notFound();
  }

  const validGrade = gradeLevel as GradeLevel;
  const gradeLabel = getGradeLevelLabel(validGrade);
  
  // الحصول على مسارات التعلم
  const mathLearningPath = mathLearningPaths[validGrade] || [];
  const arabicLearningPath = arabicLearningPaths[validGrade] || [];
  
  // الحصول على الأدوات لكل مادة باستخدام الدالة الموحدة
  // هذه الدالة تجمع الأدوات من gradeLevel + Learning Path
  // showBasics سيتم تمريره من query params في Client Component
  const allMathTools = getToolsForGrade(validGrade, mathLearningPath, false);
  const allArabicTools = getToolsForGrade(validGrade, arabicLearningPath, false);
  
  // تصفية الأدوات حسب المادة
  const mathTools = allMathTools.filter((t) => t.category === "math");
  const arabicTools = allArabicTools.filter((t) => t.category === "arabic");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الطالب", href: "/student" },
        { label: gradeLabel },
      ]}
    >
      <StudentGradePageClient
        gradeLevel={validGrade}
        gradeLabel={gradeLabel}
        mathTools={mathTools}
        arabicTools={arabicTools}
        mathLearningPath={mathLearningPath}
        arabicLearningPath={arabicLearningPath}
      />
    </PageLayout>
  );
}
