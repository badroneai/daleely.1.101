"use client";

import { useState } from "react";
import Link from "next/link";
import { getToolsByGradeLevel, getToolsByCategory } from "@/lib/tools";

type GradeLevel = "1-2" | "3-4" | "5-6";
type SkillLevel = "beginner" | "intermediate" | "advanced";
type Goal = "review" | "foundation" | "enrichment";
type TimeAvailable = "3" | "10" | "15";

interface ToolMethodology {
  title: string;
  steps: string[];
  tips: string[];
  relatedArticle?: string;
}

const toolMethodologies: Record<string, ToolMethodology> = {
  "multiplication-table": {
    title: "كيفية استخدام جدول الضرب التفاعلي",
    steps: [
      "ابدأ بجدول واحد (مثلاً: جدول 2)",
      "اضغط على كل رقم واستمع للنطق",
      "كرر النطق بصوت عالي",
      "تمرن على نفس الجدول لمدة 5 دقائق",
      "انتقل لجدول آخر بعد إتقان الأول",
    ],
    tips: [
      "استخدم الصوت في البداية لمساعدة الطفل",
      "لا تتعجل - التثبيت أهم من السرعة",
      "احتفل بكل جدول يتقنه الطفل",
      "مارس يومياً لمدة 5-10 دقائق",
    ],
    relatedArticle: "/parents/14-day-plan/multiplication",
  },
  "multiplication-quiz": {
    title: "كيفية استخدام اختبار جدول الضرب",
    steps: [
      "ابدأ بجدول واحد فقط (مثلاً: جدول 2)",
      "اختر عدد الأسئلة (10-15 سؤال)",
      "دع الطفل يجيب بدون ضغط",
      "راجع الإجابات الخاطئة مع الطفل",
      "احتفل بالإجابات الصحيحة",
    ],
    tips: [
      "لا تجعل الاختبار صعباً جداً",
      "الهدف هو التثبيت وليس التحدي",
      "استخدم الاختبار بعد إتقان الجدول",
      "لا تعاقب على الأخطاء",
    ],
    relatedArticle: "/parents/common-problems/forgets-multiplication",
  },
  "mental-math-add-sub": {
    title: "كيفية استخدام الجمع والطرح الذهني",
    steps: [
      "ابدأ بأرقام صغيرة (1-10)",
      "استخدم الصوت لمساعدة الطفل",
      "شجع الطفل على التفكير الذهني",
      "ارفع الصعوبة تدريجياً",
      "احتفل بكل إجابة صحيحة",
    ],
    tips: [
      "5 دقائق يومياً كافية",
      "لا تعطِ الطفل حاسبة",
      "استخدم أمثلة من الحياة اليومية",
      "راجع الأخطاء مع الطفل",
    ],
    relatedArticle: "/parents/14-day-plan/mental-math",
  },
  "arabic-letters": {
    title: "كيفية استخدام تعلم الحروف العربية",
    steps: [
      "ابدأ بحرف واحد فقط",
      "اضغط على الحرف واستمع للاسم",
      "كرر اسم الحرف بصوت عالي",
      "تمرن على نفس الحرف لمدة 3 دقائق",
      "انتقل لحرف آخر بعد إتقان الأول",
    ],
    tips: [
      "استخدم الصوت دائماً في البداية",
      "لا تجبر الطفل على تعلم كل الحروف دفعة واحدة",
      "احتفل بكل حرف يتعلمه الطفل",
      "مارس يومياً لمدة 5 دقائق",
    ],
    relatedArticle: "/parents/14-day-plan/arabic-reading",
  },
  "letter-sounds": {
    title: "كيفية استخدام أصوات الحروف",
    steps: [
      "ابدأ بحرف واحد فقط",
      "اضغط على الحرف واستمع للصوت",
      "كرر الصوت بصوت عالي",
      "تمرن على نفس الحرف لمدة 3 دقائق",
      "انتقل لحرف آخر بعد إتقان الأول",
    ],
    tips: [
      "أصوات الحروف أسهل من الحروف نفسها",
      "ابدأ من هنا إذا كان الطفل يرفض الحروف",
      "استخدم الصوت دائماً",
      "مارس يومياً لمدة 3-5 دقائق",
    ],
    relatedArticle: "/parents/common-problems/refuses-letters",
  },
  "harakat": {
    title: "كيفية استخدام الحركات العربية",
    steps: [
      "تعرف على الحركات: الفتحة والضمة والكسرة",
      "استمع لنطق كل حركة",
      "تمرن على قراءة كلمات بسيطة",
      "ارفع الصعوبة تدريجياً",
      "احتفل بكل كلمة يقرأها الطفل بشكل صحيح",
    ],
    tips: [
      "ابدأ بكلمات من 3 أحرف",
      "استخدم الصوت لمساعدة الطفل",
      "لا تجبر الطفل على القراءة السريعة",
      "مارس يومياً لمدة 5-10 دقائق",
    ],
    relatedArticle: "/parents/14-day-plan/arabic-reading",
  },
  "syllables-blending": {
    title: "كيفية استخدام المقاطع والدمج",
    steps: [
      "تعلم تكوين المقاطع (مثلاً: ب + ا = با)",
      "تمرن على دمج المقاطع",
      "اقرأ كلمات من 3 أحرف",
      "ارفع الصعوبة تدريجياً",
      "احتفل بكل كلمة يقرأها الطفل",
    ],
    tips: [
      "ابدأ بمقاطع بسيطة",
      "استخدم الصوت لمساعدة الطفل",
      "لا تجبر الطفل على القراءة السريعة",
      "مارس يومياً لمدة 5-10 دقائق",
    ],
    relatedArticle: "/parents/14-day-plan/arabic-reading",
  },
  "sight-words-ar": {
    title: "كيفية استخدام الكلمات البصرية العربية",
    steps: [
      "تعلم 5 كلمات بصرية شائعة",
      "احفظ الكلمات وكررها",
      "تمرن على قراءة الكلمات",
      "ارفع عدد الكلمات تدريجياً",
      "احتفل بكل كلمة يتعلمها الطفل",
    ],
    tips: [
      "ابدأ بكلمات بسيطة وشائعة",
      "استخدم الصوت لمساعدة الطفل",
      "مارس يومياً لمدة 5-10 دقائق",
      "راجع الكلمات القديمة مع الجديدة",
    ],
    relatedArticle: "/parents/14-day-plan/arabic-reading",
  },
  "telling-time": {
    title: "كيفية استخدام قراءة الساعة",
    steps: [
      "تعرف على الساعة الرقمية أولاً",
      "تمرن على قراءة الوقت بالعربية",
      "انتقل للساعة التناظرية",
      "تمرن على قراءة الوقت بالإنجليزية",
      "احتفل بكل وقت يقرأه الطفل بشكل صحيح",
    ],
    tips: [
      "ابدأ بأوقات بسيطة (مثلاً: 3:00)",
      "استخدم الصوت لمساعدة الطفل",
      "ارفع الصعوبة تدريجياً",
      "مارس يومياً لمدة 10 دقائق",
    ],
  },
};

export default function ToolSelectorClient() {
  const [gradeLevel, setGradeLevel] = useState<GradeLevel | "">("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel | "">("");
  const [goal, setGoal] = useState<Goal | "">("");
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable | "">("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const getRecommendations = () => {
    if (!gradeLevel || !skillLevel || !goal || !timeAvailable) {
      return null;
    }

    const allTools = getToolsByGradeLevel(gradeLevel);
    let recommendedTools = [...allTools];

    // Filter by skill level
    if (skillLevel === "beginner") {
      recommendedTools = recommendedTools.filter(
        (t) =>
          t.slug.includes("letters") ||
          t.slug.includes("sounds") ||
          t.slug.includes("add-sub") ||
          t.slug === "multiplication-table"
      );
    } else if (skillLevel === "intermediate") {
      // Keep all tools for intermediate
    } else if (skillLevel === "advanced") {
      recommendedTools = recommendedTools.filter(
        (t) =>
          t.slug.includes("quiz") ||
          t.slug.includes("mental") ||
          t.slug.includes("time") ||
          t.slug.includes("sight-words")
      );
    }

    // Filter by goal
    if (goal === "review") {
      recommendedTools = recommendedTools.filter(
        (t) => t.slug.includes("quiz") || t.slug === "multiplication-table"
      );
    } else if (goal === "foundation") {
      recommendedTools = recommendedTools.filter(
        (t) =>
          t.slug.includes("letters") ||
          t.slug.includes("sounds") ||
          t.slug.includes("table") ||
          t.slug.includes("add-sub") ||
          t.slug.includes("harakat")
      );
    } else if (goal === "enrichment") {
      recommendedTools = recommendedTools.filter(
        (t) =>
          t.slug.includes("quiz") ||
          t.slug.includes("mental") ||
          t.slug.includes("time") ||
          t.slug.includes("sight-words")
      );
    }

    // Filter by time - be more flexible
    if (timeAvailable === "3") {
      // For 3 minutes, prefer shorter tools but don't exclude others
      recommendedTools = recommendedTools.filter(
        (t) =>
          t.slug.includes("letters") ||
          t.slug.includes("sounds") ||
          t.slug === "multiplication-table"
      );
    } else if (timeAvailable === "10") {
      // For 10 minutes, most tools work
      // Don't filter too strictly
    } else if (timeAvailable === "15") {
      // For 15 minutes, prefer longer tools
      recommendedTools = recommendedTools.filter(
        (t) =>
          t.slug.includes("quiz") ||
          t.slug.includes("mental") ||
          t.slug.includes("time") ||
          t.slug.includes("syllables")
      );
    }

    // If no tools match, return all tools for the grade level
    if (recommendedTools.length === 0) {
      return allTools.slice(0, 2);
    }

    // Get top 2-3 recommendations
    return recommendedTools.slice(0, 3);
  };

  const recommendations = getRecommendations();
  const selectedMethodology = selectedTool ? toolMethodologies[selectedTool] : null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">دليل اختيار الأداة</h1>
      <p className="text-lg text-gray-600 mb-8">
        اختر الأداة المناسبة لطفلك بناءً على عمره، مستواه، هدفه، والوقت المتاح
      </p>

      {/* Decision Cards */}
      <div className="space-y-6 mb-8">
        {/* Grade Level */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">عمر الطفل / الصف</h2>
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                { value: "1-2", label: "الصف الأول والثاني", age: "6-8 سنوات" },
                { value: "3-4", label: "الصف الثالث والرابع", age: "8-10 سنوات" },
                { value: "5-6", label: "الصف الخامس والسادس", age: "10-12 سنة" },
              ] as Array<{ value: GradeLevel; label: string; age: string }>
            ).map((level) => (
              <button
                key={level.value}
                onClick={() => setGradeLevel(level.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  gradeLevel === level.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <div className="font-semibold text-gray-900">{level.label}</div>
                <div className="text-sm text-gray-600 mt-1">{level.age}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">مستوى الطفل</h2>
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                { value: "beginner", label: "مبتدئ", desc: "يبدأ التعلم" },
                { value: "intermediate", label: "متوسط", desc: "لديه أساسيات" },
                { value: "advanced", label: "متقدم", desc: "يريد التحدي" },
              ] as Array<{ value: SkillLevel; label: string; desc: string }>
            ).map((level) => (
              <button
                key={level.value}
                onClick={() => setSkillLevel(level.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  skillLevel === level.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <div className="font-semibold text-gray-900">{level.label}</div>
                <div className="text-sm text-gray-600 mt-1">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">الهدف</h2>
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                { value: "review", label: "مراجعة", desc: "تثبيت ما تعلمه" },
                { value: "foundation", label: "تأسيس", desc: "تعلم أساسيات جديدة" },
                { value: "enrichment", label: "إثراء", desc: "تحدي وتطوير" },
              ] as Array<{ value: Goal; label: string; desc: string }>
            ).map((g) => (
              <button
                key={g.value}
                onClick={() => setGoal(g.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  goal === g.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <div className="font-semibold text-gray-900">{g.label}</div>
                <div className="text-sm text-gray-600 mt-1">{g.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Available */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">وقت اليوم</h2>
          <div className="grid grid-cols-3 gap-4">
            {(
              [
                { value: "3", label: "3 دقائق", desc: "جلسة سريعة" },
                { value: "10", label: "10 دقائق", desc: "جلسة عادية" },
                { value: "15", label: "15 دقيقة", desc: "جلسة طويلة" },
              ] as Array<{ value: TimeAvailable; label: string; desc: string }>
            ).map((time) => (
              <button
                key={time.value}
                onClick={() => setTimeAvailable(time.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  timeAvailable === time.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <div className="font-semibold text-gray-900">{time.label}</div>
                <div className="text-sm text-gray-600 mt-1">{time.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="bg-primary-50 rounded-lg p-6 border-r-4 border-primary-500 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">التوصيات</h2>
          <p className="text-gray-700 mb-4">
            بناءً على اختياراتك، ننصحك بهذه الأدوات:
          </p>
          <div className="space-y-4">
            {recommendations.map((tool) => (
              <div
                key={tool.slug}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    <div className="flex gap-3">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        استخدم الأداة →
                      </Link>
                      {toolMethodologies[tool.slug] && (
                        <button
                          onClick={() =>
                            setSelectedTool(selectedTool === tool.slug ? null : tool.slug)
                          }
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg transition-colors"
                        >
                          {selectedTool === tool.slug ? "إخفاء المنهجية" : "عرض المنهجية"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {selectedTool === tool.slug && toolMethodologies[tool.slug] && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {toolMethodologies[tool.slug].title}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">الخطوات:</h5>
                        <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                          {toolMethodologies[tool.slug].steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">نصائح:</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                          {toolMethodologies[tool.slug].tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                      {toolMethodologies[tool.slug].relatedArticle && (
                        <div>
                          <Link
                            href={toolMethodologies[tool.slug].relatedArticle!}
                            className="text-primary-700 hover:text-primary-800 font-medium text-sm"
                          >
                            اقرأ المزيد: خطة 14 يوم ذات صلة →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/articles/parents"
              className="text-primary-700 hover:text-primary-800 font-medium text-sm"
            >
              اقرأ مقالات ذات صلة →
            </Link>
          </div>
        </div>
      )}

      {gradeLevel && skillLevel && goal && timeAvailable && (!recommendations || recommendations.length === 0) && (
        <div className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
          <p className="text-gray-700 mb-4">
            لم نجد أدوات مطابقة تماماً. ننصحك بتجربة جميع الأدوات المتاحة لطفلك واختيار ما يناسبه.
          </p>
          <Link href="/tools" className="btn-primary inline-block">
            تصفح جميع الأدوات →
          </Link>
        </div>
      )}
    </div>
  );
}
