// Curriculum data model — the reusable shape every grade's curriculum compiles to.
// See docs/CURRICULUM_PIPELINE.md for the method that produces this data.

// How a lesson is delivered in the product:
// - interactive: a hands-on tool exists (toolSlug) — drill/practice with feedback.
// - practice:    drillable, but its interactive tool isn't built yet (a gap).
// - lesson:      learn/read content (concept + key terms), not a drill.
export type ProductType = "interactive" | "practice" | "lesson";

export interface LessonSpec {
  title: string;
  productType?: ProductType; // defaults to the subject's defaultProductType
  toolSlug?: string; // interactive math tool: links to /tools/<toolSlug>
  activityId?: string; // interactive content activity: links to /learn/<activityId>
}

// A lesson may be written as a bare title (inherits the subject default) or a spec.
export type Lesson = string | LessonSpec;

export interface CurriculumUnit {
  title: string;
  lessons: Lesson[];
}

export interface CurriculumSubject {
  id: string;
  titleAr: string;
  emoji: string;
  /** Tailwind gradient stops, e.g. "from-sky-600 to-blue-700". */
  color: string;
  defaultProductType: ProductType;
  units: CurriculumUnit[];
}

export interface GradeCurriculum {
  grade: string; // e.g. "grade5"
  titleAr: string; // e.g. "الصف الخامس الابتدائي"
  /** Source note (book edition / extraction) for provenance. */
  source: string;
  subjects: CurriculumSubject[];
}

export interface NormalizedLesson {
  title: string;
  productType: ProductType;
  toolSlug?: string;
  activityId?: string;
}

/** Resolve a lesson to its effective product type + tool/activity. */
export function normalizeLesson(lesson: Lesson, subject: CurriculumSubject): NormalizedLesson {
  if (typeof lesson === "string") {
    return { title: lesson, productType: subject.defaultProductType };
  }
  return {
    title: lesson.title,
    productType: lesson.productType ?? subject.defaultProductType,
    toolSlug: lesson.toolSlug,
    activityId: lesson.activityId,
  };
}
