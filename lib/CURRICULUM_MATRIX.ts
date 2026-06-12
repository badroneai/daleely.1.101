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
  "place-value": {
    minGrade: "grade1",
    maxGrade: "grade5",
    defaultHiddenForGrades: ["grade6", "grade7", "grade8", "grade9"],
  },
  "fractions": {
    minGrade: "grade3",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "decimals": {
    minGrade: "grade4",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "fraction-operations": {
    minGrade: "grade4",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "number-theory": {
    minGrade: "grade4",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "measurement": {
    minGrade: "grade4",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "perimeter-area-volume": {
    minGrade: "grade4",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "algebra": {
    minGrade: "grade5",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "statistics": {
    minGrade: "grade5",
    maxGrade: "grade6",
    defaultHiddenForGrades: ["grade7", "grade8", "grade9"],
  },
  "geometry": {
    minGrade: "grade4",
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

// القيمة المنزلية: عدد منازل العدد حسب الصف
export const placeValueScope: Record<GradeLevel | "all", { digits: number }> = {
  kg1: { digits: 2 },
  kg2: { digits: 2 },
  kg3: { digits: 2 },
  grade1: { digits: 2 },
  grade2: { digits: 3 },
  grade3: { digits: 4 },
  grade4: { digits: 5 },
  grade5: { digits: 5 },
  grade6: { digits: 5 },
  grade7: { digits: 5 },
  grade8: { digits: 5 },
  grade9: { digits: 5 },
  all: { digits: 4 },
};

// الكسور: المقامات المتاحة حسب الصف
export const fractionsScope: Record<GradeLevel | "all", { dens: number[] }> = {
  kg1: { dens: [] },
  kg2: { dens: [] },
  kg3: { dens: [] },
  grade1: { dens: [] },
  grade2: { dens: [] },
  grade3: { dens: [2, 3, 4, 6, 8] },
  grade4: { dens: [2, 3, 4, 5, 6, 8, 10] },
  grade5: { dens: [2, 3, 4, 5, 6, 8, 10] },
  grade6: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade7: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade8: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade9: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  all: { dens: [2, 3, 4, 6, 8] },
};

// الكسور العشرية: عدد المنازل العشرية حسب الصف
export const decimalsScope: Record<GradeLevel | "all", { places: number }> = {
  kg1: { places: 0 },
  kg2: { places: 0 },
  kg3: { places: 0 },
  grade1: { places: 0 },
  grade2: { places: 0 },
  grade3: { places: 0 },
  grade4: { places: 2 },
  grade5: { places: 3 },
  grade6: { places: 3 },
  grade7: { places: 3 },
  grade8: { places: 3 },
  grade9: { places: 3 },
  all: { places: 2 },
};

// عمليات الكسور: المقامات المتاحة حسب الصف
export const fractionOpsScope: Record<GradeLevel | "all", { dens: number[] }> = {
  kg1: { dens: [] },
  kg2: { dens: [] },
  kg3: { dens: [] },
  grade1: { dens: [] },
  grade2: { dens: [] },
  grade3: { dens: [] },
  grade4: { dens: [2, 3, 4, 5, 6, 8] },
  grade5: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade6: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade7: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade8: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  grade9: { dens: [2, 3, 4, 5, 6, 8, 10, 12] },
  all: { dens: [2, 3, 4, 5, 6, 8] },
};

// القواسم والمضاعفات: أكبر عدد مستعمل حسب الصف
export const numberTheoryScope: Record<GradeLevel | "all", { max: number }> = {
  kg1: { max: 0 }, kg2: { max: 0 }, kg3: { max: 0 },
  grade1: { max: 0 }, grade2: { max: 0 }, grade3: { max: 0 },
  grade4: { max: 24 },
  grade5: { max: 50 },
  grade6: { max: 100 },
  grade7: { max: 100 }, grade8: { max: 100 }, grade9: { max: 100 },
  all: { max: 50 },
};

// أدوات إضافية للصف الخامس: مُفعَّلة ضمن نطاق الصفوف فقط
const enabledFrom = (start: GradeLevel): Record<GradeLevel | "all", { enabled: boolean }> => {
  const order: (GradeLevel | "all")[] = ["kg1", "kg2", "kg3", "grade1", "grade2", "grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "grade9"];
  const startIdx = order.indexOf(start);
  const out = {} as Record<GradeLevel | "all", { enabled: boolean }>;
  for (const g of order) out[g as GradeLevel] = { enabled: order.indexOf(g) >= startIdx };
  out.all = { enabled: true };
  return out;
};
export const measurementScope = enabledFrom("grade4");
export const pavScope = enabledFrom("grade4");
export const geometryScope = enabledFrom("grade4");
export const algebraScope = enabledFrom("grade5");
export const statisticsScope = enabledFrom("grade5");

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
    case "place-value":
      return placeValueScope[grade] || placeValueScope.all;
    case "fractions":
      return fractionsScope[grade] || fractionsScope.all;
    case "decimals":
      return decimalsScope[grade] || decimalsScope.all;
    case "fraction-operations":
      return fractionOpsScope[grade] || fractionOpsScope.all;
    case "number-theory":
      return numberTheoryScope[grade] || numberTheoryScope.all;
    case "measurement":
      return measurementScope[grade] || measurementScope.all;
    case "perimeter-area-volume":
      return pavScope[grade] || pavScope.all;
    case "geometry":
      return geometryScope[grade] || geometryScope.all;
    case "algebra":
      return algebraScope[grade] || algebraScope.all;
    case "statistics":
      return statisticsScope[grade] || statisticsScope.all;
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
