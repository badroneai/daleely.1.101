import PageLayout from "@/components/PageLayout";
import { generatePillarMetadata } from "@/lib/metadata";
import { getGradeLevelLabel, getGradeLevelAge, getGradeLevelStage } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "الطالب",
  "اختر صفك أو فئتك العمرية للوصول إلى الأدوات التعليمية المناسبة لك في الرياضيات واللغة العربية",
  "student"
);

// جميع الصفوف المتاحة
const allGrades = [
  // رياض الأطفال
  { grade: "kg1" as const, stage: "kg" as const },
  { grade: "kg2" as const, stage: "kg" as const },
  { grade: "kg3" as const, stage: "kg" as const },
  // التعليم الابتدائي
  { grade: "grade1" as const, stage: "elementary" as const },
  { grade: "grade2" as const, stage: "elementary" as const },
  { grade: "grade3" as const, stage: "elementary" as const },
  { grade: "grade4" as const, stage: "elementary" as const },
  { grade: "grade5" as const, stage: "elementary" as const },
  { grade: "grade6" as const, stage: "elementary" as const },
  // التعليم المتوسط
  { grade: "grade7" as const, stage: "middle" as const },
  { grade: "grade8" as const, stage: "middle" as const },
  { grade: "grade9" as const, stage: "middle" as const },
];

// تجميع الصفوف حسب المرحلة
const gradesByStage = {
  kg: allGrades.filter((g) => g.stage === "kg"),
  elementary: allGrades.filter((g) => g.stage === "elementary"),
  middle: allGrades.filter((g) => g.stage === "middle"),
};

function getStageTitle(stage: "kg" | "elementary" | "middle"): string {
  const titles = {
    kg: "رياض الأطفال",
    elementary: "التعليم الابتدائي",
    middle: "التعليم المتوسط",
  };
  return titles[stage];
}

export default function StudentPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الطالب" },
      ]}
    >
      <div className="max-w-6xl mx-auto fade-in">
        {/* H1 + Introduction */}
        <div className="mb-12 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            مرحباً بك في قسم الطالب
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            اختر صفك أو فئتك العمرية للوصول إلى الأدوات التعليمية المناسبة لك. يمكنك اختيار مادة واحدة أو دمج عدة مواد لعرض الأدوات معاً.
          </p>
        </div>

        {/* Grades by Stage */}
        <div className="space-y-12 mb-12">
          {/* رياض الأطفال */}
          {gradesByStage.kg.length > 0 && (
            <div className="slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-300 pb-2">
                {getStageTitle("kg")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gradesByStage.kg.map((item, index) => (
                  <Link
                    key={item.grade}
                    href={`/student/${item.grade}`}
                    className="card text-center hover:border-primary-300 transition-all duration-200 focus-visible-ring slide-up hover:scale-[1.02] transform"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-5xl mb-4">🎒</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {getGradeLevelLabel(item.grade)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {getGradeLevelAge(item.grade)}
                    </p>
                    <span className="btn-primary inline-block text-sm">
                      اختر هذا الصف →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* التعليم الابتدائي */}
          {gradesByStage.elementary.length > 0 && (
            <div className="slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-300 pb-2">
                {getStageTitle("elementary")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gradesByStage.elementary.map((item, index) => (
                  <Link
                    key={item.grade}
                    href={`/student/${item.grade}`}
                    className="card text-center hover:border-primary-300 transition-all duration-200 focus-visible-ring slide-up hover:scale-[1.02] transform"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="text-5xl mb-4">📚</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {getGradeLevelLabel(item.grade)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {getGradeLevelAge(item.grade)}
                    </p>
                    <span className="btn-primary inline-block text-sm">
                      اختر هذا الصف →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* التعليم المتوسط */}
          {gradesByStage.middle.length > 0 && (
            <div className="slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-300 pb-2">
                {getStageTitle("middle")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gradesByStage.middle.map((item, index) => (
                  <Link
                    key={item.grade}
                    href={`/student/${item.grade}`}
                    className="card text-center hover:border-primary-300 transition-all duration-200 focus-visible-ring slide-up hover:scale-[1.02] transform"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-5xl mb-4">🎓</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {getGradeLevelLabel(item.grade)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {getGradeLevelAge(item.grade)}
                    </p>
                    <span className="btn-primary inline-block text-sm">
                      اختر هذا الصف →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
