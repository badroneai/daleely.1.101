import { GradeLevel, ToolVisibility } from "./types";

/**
 * مصفوفة المنهج الدراسي السعودي
 * تحدد القواعد التربوية لظهور الأدوات والمحتوى حسب الصف الدراسي
 */

// ترتيب الصفوف من الأصغر للأكبر
const gradeOrder: GradeLevel[] = [
  "kg1", "kg2", "kg3",
  "grade1", "grade2", "grade3", "grade4", "grade5", "grade6",
  "grade7", "grade8", "grade9",
];

/**
 * مقارنة صفين (للتحقق من الترتيب)
 */
export function compareGrades(grade1: GradeLevel, grade2: GradeLevel): number {
  const index1 = gradeOrder.indexOf(grade1);
  const index2 = gradeOrder.indexOf(grade2);
  return index1 - index2;
}

/**
 * التحقق من أن الصف ضمن النطاق
 */
export function isGradeInRange(grade: GradeLevel, minGrade: GradeLevel, maxGrade: GradeLevel): boolean {
  return compareGrades(grade, minGrade) >= 0 && compareGrades(grade, maxGrade) <= 0;
}

/**
 * قواعد visibility للأدوات التعليمية
 */
export const toolVisibilityRules: Record<string, ToolVisibility> = {
  // أدوات الرياضيات
  "multiplication-table": {
    minGrade: "grade2",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "multiplication-quiz": {
    minGrade: "grade2",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "mental-math-add-sub": {
    minGrade: "grade1",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "telling-time": {
    minGrade: "grade3",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  
  // أدوات اللغة العربية
  "arabic-letters": {
    minGrade: "kg1",
    maxGrade: "grade2",
    defaultHiddenForGrades: ["grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "grade9"],
  },
  "letter-sounds": {
    minGrade: "kg1",
    maxGrade: "grade2",
    defaultHiddenForGrades: ["grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "grade9"],
  },
  "harakat": {
    minGrade: "grade1",
    maxGrade: "grade4",
    defaultHiddenForGrades: ["grade5", "grade6", "grade7", "grade8", "grade9"],
  },
  "syllables-blending": {
    minGrade: "grade1",
    maxGrade: "grade4",
    defaultHiddenForGrades: ["grade5", "grade6", "grade7", "grade8", "grade9"],
  },
  "sight-words-ar": {
    minGrade: "grade3",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
};

/**
 * قواعد scopeByGrade للأدوات التعليمية
 * تحدد نطاق المحتوى داخل كل أداة حسب الصف
 */

// جدول الضرب: أي جداول تظهر لكل صف
export const multiplicationTableScope: Record<GradeLevel | "all", number[]> = {
  kg1: [],
  kg2: [],
  kg3: [],
  grade1: [],
  grade2: [2, 5, 10],
  grade3: [2, 3, 4, 5, 6, 10],
  grade4: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  grade5: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  grade6: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  grade7: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  grade8: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  grade9: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  all: [2, 3, 4, 5, 6, 7, 8, 9, 10],
};

// اختبار الضرب: نطاق الأسئلة حسب الصف
export const multiplicationQuizScope: Record<GradeLevel | "all", { tables: number[]; difficulty: "easy" | "medium" | "hard" }> = {
  kg1: { tables: [], difficulty: "easy" },
  kg2: { tables: [], difficulty: "easy" },
  kg3: { tables: [], difficulty: "easy" },
  grade1: { tables: [], difficulty: "easy" },
  grade2: { tables: [2, 5, 10], difficulty: "easy" },
  grade3: { tables: [2, 3, 4, 5, 6, 10], difficulty: "medium" },
  grade4: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "medium" },
  grade5: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "hard" },
  grade6: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "hard" },
  grade7: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "hard" },
  grade8: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "hard" },
  grade9: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "hard" },
  all: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], difficulty: "medium" },
};

// الجمع والطرح: حدود الأرقام حسب الصف
export const mentalMathScope: Record<GradeLevel | "all", { maxNumber: number; withCarry: boolean }> = {
  kg1: { maxNumber: 5, withCarry: false },
  kg2: { maxNumber: 10, withCarry: false },
  kg3: { maxNumber: 20, withCarry: false },
  grade1: { maxNumber: 20, withCarry: false },
  grade2: { maxNumber: 100, withCarry: true },
  grade3: { maxNumber: 100, withCarry: true },
  grade4: { maxNumber: 1000, withCarry: true },
  grade5: { maxNumber: 1000, withCarry: true },
  grade6: { maxNumber: 1000, withCarry: true },
  grade7: { maxNumber: 1000, withCarry: true },
  grade8: { maxNumber: 1000, withCarry: true },
  grade9: { maxNumber: 1000, withCarry: true },
  all: { maxNumber: 100, withCarry: true },
};

// قراءة الساعة: مستويات التعلم حسب الصف
export const tellingTimeScope: Record<GradeLevel | "all", { 
  hourOnly: boolean; 
  halfHour: boolean; 
  quarterHour: boolean; 
  minutes: boolean; 
  twentyFourHour: boolean;
}> = {
  kg1: { hourOnly: true, halfHour: false, quarterHour: false, minutes: false, twentyFourHour: false },
  kg2: { hourOnly: true, halfHour: true, quarterHour: false, minutes: false, twentyFourHour: false },
  kg3: { hourOnly: true, halfHour: true, quarterHour: true, minutes: false, twentyFourHour: false },
  grade1: { hourOnly: true, halfHour: true, quarterHour: true, minutes: false, twentyFourHour: false },
  grade2: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: false },
  grade3: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: false },
  grade4: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: true },
  grade5: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: true },
  grade6: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: true },
  grade7: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: true },
  grade8: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: true },
  grade9: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: true },
  all: { hourOnly: true, halfHour: true, quarterHour: true, minutes: true, twentyFourHour: false },
};

// أدوات اللغة العربية: مستويات التعلم حسب الصف
export const arabicToolsScope: Record<GradeLevel | "all", { level: "recognition" | "mastery" | "review" }> = {
  kg1: { level: "recognition" },
  kg2: { level: "recognition" },
  kg3: { level: "recognition" },
  grade1: { level: "mastery" },
  grade2: { level: "mastery" },
  grade3: { level: "review" },
  grade4: { level: "review" },
  grade5: { level: "review" },
  grade6: { level: "review" },
  grade7: { level: "review" },
  grade8: { level: "review" },
  grade9: { level: "review" },
  all: { level: "mastery" },
};

/**
 * الحصول على scope لأداة معينة حسب الصف
 */
export function getToolScope(toolSlug: string, grade: GradeLevel | "all"): any {
  switch (toolSlug) {
    case "multiplication-table":
      return multiplicationTableScope[grade] || multiplicationTableScope.all;
    case "multiplication-quiz":
      return multiplicationQuizScope[grade] || multiplicationQuizScope.all;
    case "mental-math-add-sub":
      return mentalMathScope[grade] || mentalMathScope.all;
    case "telling-time":
      return tellingTimeScope[grade] || tellingTimeScope.all;
    case "arabic-letters":
    case "letter-sounds":
    case "harakat":
    case "syllables-blending":
    case "sight-words-ar":
      return arabicToolsScope[grade] || arabicToolsScope.all;
    default:
      return null;
  }
}
