"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Tool } from "@/lib/types";

interface StudentGradePageClientProps {
  gradeLevel: string;
  gradeLabel: string;
  mathTools: Tool[];
  arabicTools: Tool[];
  mathLearningPath: Array<{ step: number; title: string; description: string; toolSlug?: string }>;
  arabicLearningPath: Array<{ step: number; title: string; description: string; toolSlug?: string }>;
}

export default function StudentGradePageClient({
  gradeLevel,
  gradeLabel,
  mathTools,
  arabicTools,
  mathLearningPath,
  arabicLearningPath,
}: StudentGradePageClientProps) {
  const searchParams = useSearchParams();
  const showBasics = searchParams.get("showBasics") === "true";
  const [selectedSubjects, setSelectedSubjects] = useState<Set<"math" | "arabic">>(new Set(["math", "arabic"]));

  const toggleSubject = (subject: "math" | "arabic") => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(subject)) {
      newSelected.delete(subject);
    } else {
      newSelected.add(subject);
    }
    // يجب أن يكون هناك مادة واحدة على الأقل مختارة
    if (newSelected.size > 0) {
      setSelectedSubjects(newSelected);
    }
  };

  // تجميع الأدوات حسب المادة المختارة
  const displayedTools: Array<{ tool: Tool; category: "math" | "arabic" }> = [];
  if (selectedSubjects.has("math")) {
    mathTools.forEach((tool) => displayedTools.push({ tool, category: "math" }));
  }
  if (selectedSubjects.has("arabic")) {
    arabicTools.forEach((tool) => displayedTools.push({ tool, category: "arabic" }));
  }

  // تجميع مسارات التعلم حسب المادة المختارة
  const displayedLearningPath: Array<{ step: number; title: string; description: string; toolSlug?: string; category: "math" | "arabic" }> = [];
  let stepCounter = 1;
  if (selectedSubjects.has("math")) {
    mathLearningPath.forEach((step) => {
      displayedLearningPath.push({ ...step, step: stepCounter++, category: "math" });
    });
  }
  if (selectedSubjects.has("arabic")) {
    arabicLearningPath.forEach((step) => {
      displayedLearningPath.push({ ...step, step: stepCounter++, category: "arabic" });
    });
  }

  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* H1 + Introduction */}
      <div className="mb-12 slide-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {gradeLabel}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          اختر المادة أو المواد التي تريد دراستها. يمكنك اختيار مادة واحدة أو دمج عدة مواد لعرض الأدوات معاً.
        </p>
      </div>

      {/* Subject Selection */}
      <div className="mb-12 slide-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">اختر المادة</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => toggleSubject("math")}
            className={`px-6 py-4 rounded-lg border-2 transition-all duration-200 focus-visible-ring ${
              selectedSubjects.has("math")
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-gray-300 hover:border-primary-300 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔢</span>
              <div className="text-right">
                <div className="font-bold text-lg">الرياضيات</div>
                <div className="text-sm opacity-75">{mathTools.length} أداة متاحة</div>
              </div>
            </div>
          </button>
          <button
            onClick={() => toggleSubject("arabic")}
            className={`px-6 py-4 rounded-lg border-2 transition-all duration-200 focus-visible-ring ${
              selectedSubjects.has("arabic")
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-gray-300 hover:border-primary-300 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <div className="text-right">
                <div className="font-bold text-lg">اللغة العربية</div>
                <div className="text-sm opacity-75">{arabicTools.length} أداة متاحة</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Tools by Selected Subjects */}
      {displayedTools.length > 0 && (
        <div className="mb-12 slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الأدوات المتاحة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTools.map((item, index) => (
              <Link
                key={item.tool.slug}
                href={`/tools/${item.tool.slug}?grade=${gradeLevel}`}
                className="card text-center hover:border-primary-300 transition-all duration-200 focus-visible-ring slide-up hover:scale-[1.02] transform"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-5xl mb-4">
                  {item.category === "math" ? "🔢" : "📚"}
                </div>
                <div className="text-xs text-primary-600 mb-2 font-semibold">
                  {item.category === "math" ? "رياضيات" : "عربي"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.tool.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.tool.description}</p>
                <span className="btn-primary inline-block text-sm">
                  جرب الآن
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Learning Path */}
      {displayedLearningPath.length > 0 && (
        <div className="mb-12 slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">مسار التعلم</h2>
          <div className="space-y-4">
            {displayedLearningPath.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg scale-in">
                  {step.step}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-primary-600 font-semibold">
                      {step.category === "math" ? "🔢 رياضيات" : "📚 عربي"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  {step.toolSlug && (
                    <Link
                      href={`/tools/${step.toolSlug}?grade=${gradeLevel}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 focus-visible-ring rounded"
                    >
                      جرب الأداة →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {displayedTools.length === 0 && (
        <div className="text-center py-12 slide-up">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            لا توجد أدوات متاحة حالياً
          </h3>
          <p className="text-gray-600 mb-4">
            اختر مادة أخرى أو عد لاختيار صف آخر
          </p>
          <Link
            href="/student"
            className="btn-primary inline-block"
          >
            ← العودة لاختيار الصف
          </Link>
        </div>
      )}
    </div>
  );
}
