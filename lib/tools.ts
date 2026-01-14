import { Tool, GradeLevel } from "./types";
import { toolVisibilityRules, getToolScope, isGradeInRange as curriculumIsGradeInRange } from "./CURRICULUM_MATRIX";

// Helper function to create scopeByGrade for a tool
function createScopeByGrade(toolSlug: string): Record<string, any> {
  const scope: Record<string, any> = {};
  const grades: Array<"kg1" | "kg2" | "kg3" | "grade1" | "grade2" | "grade3" | "grade4" | "grade5" | "grade6" | "grade7" | "grade8" | "grade9" | "all"> = [
    "kg1", "kg2", "kg3",
    "grade1", "grade2", "grade3", "grade4", "grade5", "grade6",
    "grade7", "grade8", "grade9",
    "all",
  ];
  
  for (const grade of grades) {
    const toolScope = getToolScope(toolSlug, grade);
    if (toolScope) {
      scope[grade] = toolScope;
    }
  }
  
  return scope;
}

export const tools: Tool[] = [
  {
    slug: "multiplication-table",
    title: "جدول الضرب التفاعلي",
    description: "تعلم وحفظ جدول الضرب بطريقة تفاعلية ممتعة مع تمارين عملية",
    category: "math",
    gradeLevel: "all",
    keywords: ["جدول الضرب", "ضرب", "رياضيات", "الصف الثالث", "الصف الرابع"],
    visibility: toolVisibilityRules["multiplication-table"],
    scopeByGrade: createScopeByGrade("multiplication-table"),
  },
  {
    slug: "multiplication-quiz",
    title: "اختبار جدول الضرب",
    description: "اختبر معرفتك بجدول الضرب مع أسئلة متنوعة وتقييم فوري",
    category: "math",
    gradeLevel: "all",
    keywords: ["اختبار الضرب", "امتحان الضرب", "تدريب الضرب"],
    visibility: toolVisibilityRules["multiplication-quiz"],
    scopeByGrade: createScopeByGrade("multiplication-quiz"),
  },
  {
    slug: "mental-math-add-sub",
    title: "الجمع والطرح الذهني",
    description: "طور مهاراتك في الجمع والطرح الذهني مع تمارين تدريجية",
    category: "math",
    gradeLevel: "all",
    keywords: ["جمع", "طرح", "حساب ذهني", "الصف الأول", "الصف الثاني"],
    visibility: toolVisibilityRules["mental-math-add-sub"],
    scopeByGrade: createScopeByGrade("mental-math-add-sub"),
  },
  {
    slug: "telling-time",
    title: "قراءة الساعة",
    description: "تعلم قراءة الساعة بالعربية والإنجليزية مع تمارين تفاعلية",
    category: "math",
    gradeLevel: "all",
    keywords: ["الساعة", "الوقت", "قراءة الساعة"],
    visibility: toolVisibilityRules["telling-time"],
    scopeByGrade: createScopeByGrade("telling-time"),
  },
  {
    slug: "arabic-letters",
    title: "تعلم الحروف العربية",
    description: "تعرف على الحروف العربية مع أشكالها وأصواتها",
    category: "arabic",
    gradeLevel: "all",
    keywords: ["حروف عربية", "أبجدية", "تعلم الحروف"],
    visibility: toolVisibilityRules["arabic-letters"],
    scopeByGrade: createScopeByGrade("arabic-letters"),
  },
  {
    slug: "letter-sounds",
    title: "أصوات الحروف",
    description: "تعلم أصوات الحروف العربية مع أمثلة واضحة",
    category: "arabic",
    gradeLevel: "all",
    keywords: ["أصوات الحروف", "نطق الحروف"],
    visibility: toolVisibilityRules["letter-sounds"],
    scopeByGrade: createScopeByGrade("letter-sounds"),
  },
  {
    slug: "harakat",
    title: "الحركات العربية",
    description: "تعلم الفتحة والضمة والكسرة والسكون بطريقة تفاعلية",
    category: "arabic",
    gradeLevel: "all",
    keywords: ["الحركات", "الفتحة", "الضمة", "الكسرة"],
    visibility: toolVisibilityRules["harakat"],
    scopeByGrade: createScopeByGrade("harakat"),
  },
  {
    slug: "syllables-blending",
    title: "المقاطع والدمج",
    description: "تعلم تكوين المقاطع ودمج الحروف لقراءة الكلمات",
    category: "arabic",
    gradeLevel: "all",
    keywords: ["مقاطع", "دمج", "قراءة"],
    visibility: toolVisibilityRules["syllables-blending"],
    scopeByGrade: createScopeByGrade("syllables-blending"),
  },
  {
    slug: "sight-words-ar",
    title: "الكلمات البصرية العربية",
    description: "احفظ الكلمات الشائعة في اللغة العربية بسرعة",
    category: "arabic",
    gradeLevel: "all",
    keywords: ["كلمات بصرية", "كلمات شائعة"],
    visibility: toolVisibilityRules["sight-words-ar"],
    scopeByGrade: createScopeByGrade("sight-words-ar"),
  },
  {
    slug: "worksheet-generator",
    title: "مولّد أوراق العمل",
    description: "أنشئ أوراق عمل مخصصة للرياضيات واللغة العربية",
    category: "teachers",
    gradeLevel: "all",
    keywords: ["أوراق عمل", "أنشطة", "تمارين"],
    // لا visibility أو scopeByGrade لأدوات المعلمين
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getToolsByGradeLevel(gradeLevel: string): Tool[] {
  return tools.filter((tool) => tool.gradeLevel === gradeLevel || tool.gradeLevel === "all");
}

/**
 * الحصول على الأدوات حسب المرحلة التعليمية
 * @param stage المرحلة: "kg" (رياض الأطفال), "elementary" (ابتدائي), "middle" (متوسط)
 */
export function getToolsByStage(stage: "kg" | "elementary" | "middle"): Tool[] {
  const kgGrades: Tool["gradeLevel"][] = ["kg1", "kg2", "kg3"];
  const elementaryGrades: Tool["gradeLevel"][] = ["grade1", "grade2", "grade3", "grade4", "grade5", "grade6"];
  const middleGrades: Tool["gradeLevel"][] = ["grade7", "grade8", "grade9"];

  const targetGrades = stage === "kg" ? kgGrades : stage === "elementary" ? elementaryGrades : middleGrades;

  return tools.filter(
    (tool) => targetGrades.includes(tool.gradeLevel) || tool.gradeLevel === "all"
  );
}

/**
 * ترجمة الصف إلى نص عربي
 */
export function getGradeLevelLabel(gradeLevel: Tool["gradeLevel"]): string {
  const labels: Record<Tool["gradeLevel"], string> = {
    kg1: "رياض الأطفال - المستوى الأول (3-4 سنوات)",
    kg2: "رياض الأطفال - المستوى الثاني (4-5 سنوات)",
    kg3: "رياض الأطفال - التمهيدي (5-6 سنوات)",
    grade1: "الصف الأول الابتدائي (6-7 سنوات)",
    grade2: "الصف الثاني الابتدائي (7-8 سنوات)",
    grade3: "الصف الثالث الابتدائي (8-9 سنوات)",
    grade4: "الصف الرابع الابتدائي (9-10 سنوات)",
    grade5: "الصف الخامس الابتدائي (10-11 سنة)",
    grade6: "الصف السادس الابتدائي (11-12 سنة)",
    grade7: "الصف الأول المتوسط (12-13 سنة)",
    grade8: "الصف الثاني المتوسط (13-14 سنة)",
    grade9: "الصف الثالث المتوسط (14-15 سنة)",
    all: "جميع الصفوف",
  };
  return labels[gradeLevel] || gradeLevel;
}

/**
 * الحصول على العمر المناسب للصف
 */
export function getGradeLevelAge(gradeLevel: Tool["gradeLevel"]): string {
  const ages: Record<Tool["gradeLevel"], string> = {
    kg1: "3-4 سنوات",
    kg2: "4-5 سنوات",
    kg3: "5-6 سنوات",
    grade1: "6-7 سنوات",
    grade2: "7-8 سنوات",
    grade3: "8-9 سنوات",
    grade4: "9-10 سنوات",
    grade5: "10-11 سنة",
    grade6: "11-12 سنة",
    grade7: "12-13 سنة",
    grade8: "13-14 سنة",
    grade9: "14-15 سنة",
    all: "جميع الأعمار",
  };
  return ages[gradeLevel] || "";
}

/**
 * الحصول على المرحلة التعليمية للصف
 */
export function getGradeLevelStage(gradeLevel: Tool["gradeLevel"]): "kg" | "elementary" | "middle" | "all" {
  if (gradeLevel === "all") return "all";
  if (gradeLevel.startsWith("kg")) return "kg";
  const gradeNum = parseInt(gradeLevel.replace("grade", ""));
  if (gradeNum >= 1 && gradeNum <= 6) return "elementary";
  if (gradeNum >= 7 && gradeNum <= 9) return "middle";
  return "all";
}

/**
 * الحصول على الأدوات من مسار التعلم (Learning Path)
 * @param learningPath مسار التعلم الذي يحتوي على خطوات مع toolSlug
 * @returns قائمة الأدوات المستخرجة من مسار التعلم
 */
export function getToolsFromLearningPath(
  learningPath: Array<{ step: number; title: string; description: string; toolSlug?: string }>
): Tool[] {
  const toolsFromPath: Tool[] = [];
  const seenSlugs = new Set<string>();

  for (const step of learningPath) {
    if (step.toolSlug && !seenSlugs.has(step.toolSlug)) {
      const tool = getToolBySlug(step.toolSlug);
      if (tool) {
        toolsFromPath.push(tool);
        seenSlugs.add(step.toolSlug);
      }
    }
  }

  return toolsFromPath;
}

/**
 * الحصول على الأدوات للصف مع مراعاة مسار التعلم و visibility
 * هذه الدالة تجمع الأدوات من:
 * 1. الأدوات المرتبطة بالصف مباشرة (getToolsByGradeLevel)
 * 2. الأدوات المذكورة في مسار التعلم (getToolsFromLearningPath)
 * ثم تفلتر حسب visibility و showBasics
 * ثم تزيل التكرار وتعيد قائمة موحدة
 * 
 * @param gradeLevel الصف الدراسي
 * @param learningPath مسار التعلم (اختياري)
 * @param showBasics إذا كان true، يعرض الأدوات المخفية افتراضياً للصفوف المتوسطة
 * @returns قائمة موحدة من الأدوات بدون تكرار
 */
export function getToolsForGrade(
  gradeLevel: string,
  learningPath?: Array<{ step: number; title: string; description: string; toolSlug?: string }>,
  showBasics: boolean = false
): Tool[] {
  // 1. جلب الأدوات المرتبطة بالصف مباشرة
  const toolsByGrade = getToolsByGradeLevel(gradeLevel);

  // 2. جلب الأدوات من مسار التعلم (إن وجد)
  const toolsFromPath = learningPath ? getToolsFromLearningPath(learningPath) : [];

  // 3. دمج القائمتين وإزالة التكرار
  const allTools = [...toolsByGrade, ...toolsFromPath];
  const uniqueTools = new Map<string, Tool>();

  for (const tool of allTools) {
    if (!uniqueTools.has(tool.slug)) {
      uniqueTools.set(tool.slug, tool);
    }
  }

  // 4. فلترة الأدوات حسب visibility
  const filteredTools: Tool[] = [];

  // إذا كان gradeLevel = "all"، اعرض جميع الأدوات بدون فلترة
  if (gradeLevel === "all") {
    return Array.from(uniqueTools.values());
  }

  // التحقق من أن gradeLevel هو GradeLevel صحيح
  const validGrade = gradeLevel as GradeLevel;

  for (const tool of Array.from(uniqueTools.values())) {
    // إذا لم يكن للأداة visibility، اعرضها (للتوافق مع الأدوات القديمة)
    if (!tool.visibility) {
      filteredTools.push(tool);
      continue;
    }

    const { minGrade, maxGrade, defaultHiddenForGrades } = tool.visibility;

    // التحقق من أن الصف ضمن النطاق
    const isInRange = isGradeInRange(gradeLevel as Tool["gradeLevel"], minGrade, maxGrade);
    if (!isInRange) {
      continue;
    }

    // التحقق من defaultHiddenForGrades
    if (defaultHiddenForGrades && defaultHiddenForGrades.includes(validGrade)) {
      // إذا كان showBasics = true، اعرض الأداة
      if (showBasics) {
        filteredTools.push(tool);
      }
      // وإلا، لا تعرضها
      continue;
    }

    // إذا وصلنا هنا، اعرض الأداة
    filteredTools.push(tool);
  }

  return filteredTools;
}

/**
 * التحقق من أن الصف ضمن النطاق (helper function)
 */
function isGradeInRange(grade: Tool["gradeLevel"], minGrade: Tool["gradeLevel"], maxGrade: Tool["gradeLevel"]): boolean {
  // Type guard: التحقق من أن القيم ليست "all"
  if (grade === "all" || minGrade === "all" || maxGrade === "all") {
    // إذا كان grade = "all"، اعرضه دائماً
    if (grade === "all") return true;
    // إذا كان minGrade أو maxGrade = "all"، اعرضه دائماً
    if (minGrade === "all" || maxGrade === "all") return true;
    return false;
  }
  
  // استخدام الدالة من CURRICULUM_MATRIX (بعد التأكد من أن جميع القيم GradeLevel)
  return curriculumIsGradeInRange(grade as GradeLevel, minGrade as GradeLevel, maxGrade as GradeLevel);
}
