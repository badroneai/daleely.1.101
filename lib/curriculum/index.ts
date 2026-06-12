import type { GradeCurriculum } from "./types";
import { grade5 } from "./grade-5";

// Registry of structured curricula. New grades are added here once their data
// module is authored via the pipeline (docs/CURRICULUM_PIPELINE.md).
const CURRICULA: Record<string, GradeCurriculum> = {
  grade5,
};

export function getGradeCurriculum(grade: string): GradeCurriculum | null {
  return CURRICULA[grade] ?? null;
}

export function getCurriculumGrades(): string[] {
  return Object.keys(CURRICULA);
}

export interface CurriculumStats {
  subjects: number;
  units: number;
  lessons: number;
  interactive: number;
  practice: number;
  lesson: number;
}

export function curriculumStats(c: GradeCurriculum): CurriculumStats {
  const s: CurriculumStats = { subjects: 0, units: 0, lessons: 0, interactive: 0, practice: 0, lesson: 0 };
  for (const subject of c.subjects) {
    s.subjects += 1;
    for (const unit of subject.units) {
      s.units += 1;
      for (const lesson of unit.lessons) {
        s.lessons += 1;
        const pt = typeof lesson === "string" ? subject.defaultProductType : lesson.productType ?? subject.defaultProductType;
        s[pt] += 1;
      }
    }
  }
  return s;
}

export type { GradeCurriculum } from "./types";
