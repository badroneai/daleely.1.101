import PageLayout from "@/components/PageLayout";
import { generatePillarMetadata } from "@/lib/metadata";
import { getGradeLevelLabel, getGradeLevelAge } from "@/lib/tools";
import type { GradeLevel } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "الطالب",
  "اختر صفك أو فئتك العمرية للوصول إلى الأدوات التعليمية المناسبة لك في الرياضيات واللغة العربية",
  "student"
);

const allGrades = [
  { grade: "kg1" as const, stage: "kg" as const },
  { grade: "kg2" as const, stage: "kg" as const },
  { grade: "kg3" as const, stage: "kg" as const },
  { grade: "grade1" as const, stage: "elementary" as const },
  { grade: "grade2" as const, stage: "elementary" as const },
  { grade: "grade3" as const, stage: "elementary" as const },
  { grade: "grade4" as const, stage: "elementary" as const },
  { grade: "grade5" as const, stage: "elementary" as const },
  { grade: "grade6" as const, stage: "elementary" as const },
  { grade: "grade7" as const, stage: "middle" as const },
  { grade: "grade8" as const, stage: "middle" as const },
  { grade: "grade9" as const, stage: "middle" as const },
];

const gradesByStage = {
  kg: allGrades.filter((g) => g.stage === "kg"),
  elementary: allGrades.filter((g) => g.stage === "elementary"),
  middle: allGrades.filter((g) => g.stage === "middle"),
};

const stageMeta = {
  kg: { title: "رياض الأطفال", emoji: "🧸", heading: "from-pink-500 to-rose-600" },
  elementary: { title: "التعليم الابتدائي", emoji: "🎒", heading: "from-sky-500 to-blue-600" },
  middle: { title: "التعليم المتوسط", emoji: "🎓", heading: "from-violet-500 to-purple-600" },
} as const;

const tileGrads = [
  "from-sky-600 to-blue-700",
  "from-emerald-600 to-teal-700",
  "from-violet-600 to-indigo-700",
  "from-pink-600 to-rose-700",
  "from-orange-600 to-amber-700",
  "from-fuchsia-600 to-purple-700",
];

function GradeTile({ grade, index }: { grade: GradeLevel; index: number }) {
  const grad = tileGrads[index % tileGrads.length];
  return (
    <Link
      href={`/student/${grade}`}
      className={`block rounded-3xl bg-gradient-to-br ${grad} text-white p-5 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all focus-visible-ring slide-up`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <h3 className="text-xl font-extrabold mb-1">{getGradeLevelLabel(grade)}</h3>
      <p className="text-white/90 text-sm">{getGradeLevelAge(grade)}</p>
      <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">ابدأ ←</span>
    </Link>
  );
}

function StageSection({ stage }: { stage: keyof typeof stageMeta }) {
  const meta = stageMeta[stage];
  const list = gradesByStage[stage];
  if (list.length === 0) return null;
  return (
    <div>
      <h2 className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${meta.heading} text-white font-bold px-4 py-2 mb-5`}>
        <span aria-hidden="true">{meta.emoji}</span> {meta.title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((item, i) => (
          <GradeTile key={item.grade} grade={item.grade} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function StudentPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الطالب" }]}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">🎒 اختر صفك</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اضغط على صفك لتظهر لك الأدوات المناسبة لك في الرياضيات واللغة العربية.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/curriculum/grade5"
            className="block rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white p-5 text-center font-bold shadow-lg hover:shadow-xl transition-shadow focus-visible-ring"
          >
            📖 تصفّح منهج الصف الخامس كاملًا (٦ مواد) ←
          </Link>
        </div>

        <div className="space-y-10">
          <StageSection stage="kg" />
          <StageSection stage="elementary" />
          <StageSection stage="middle" />
        </div>
      </div>
    </PageLayout>
  );
}
