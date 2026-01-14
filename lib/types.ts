export type GradeLevel = "kg1" | "kg2" | "kg3" | "grade1" | "grade2" | "grade3" | "grade4" | "grade5" | "grade6" | "grade7" | "grade8" | "grade9";

export interface ToolVisibility {
  minGrade: GradeLevel;
  maxGrade: GradeLevel;
  defaultHiddenForGrades?: GradeLevel[];
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers";
  gradeLevel: GradeLevel | "all";
  keywords: string[];
  visibility?: ToolVisibility;
  scopeByGrade?: Record<GradeLevel | "all", any>;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers" | "parents";
  publishedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
