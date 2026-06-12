// Learning journey — orchestrates the curriculum into an ordered path of unique
// interactive destinations (tools + content activities), and derives each stage's
// mastery status from the progress store. Pure (no Date/random).

import { getGradeCurriculum } from "@/lib/curriculum";
import { normalizeLesson } from "@/lib/curriculum/types";
import type { ToolProgress } from "@/lib/gamification/progress-store";

export interface JourneyStage {
  key: string; // toolSlug or activityId (unique destination)
  kind: "tool" | "activity";
  title: string;
  href: string;
  subject: string;
  subjectTitle: string;
  emoji: string;
  color: string;
}

export type StageStatus = "done" | "started" | "new";

/** Ordered, de-duplicated interactive stages for a grade (curriculum order). */
export function buildJourney(grade: string): JourneyStage[] {
  const c = getGradeCurriculum(grade);
  if (!c) return [];
  const seen = new Set<string>();
  const stages: JourneyStage[] = [];
  for (const subject of c.subjects) {
    for (const unit of subject.units) {
      for (const raw of unit.lessons) {
        const l = normalizeLesson(raw, subject);
        if (l.productType !== "interactive") continue;
        const key = l.toolSlug ?? l.activityId;
        if (!key || seen.has(key)) continue;
        seen.add(key);
        stages.push({
          key,
          kind: l.toolSlug ? "tool" : "activity",
          title: l.title,
          href: l.toolSlug ? `/tools/${l.toolSlug}?grade=${grade}` : `/learn/${l.activityId}`,
          subject: subject.id,
          subjectTitle: subject.titleAr,
          emoji: subject.emoji,
          color: subject.color,
        });
      }
    }
  }
  return stages;
}

const MASTERY_STARS = 10;

export function stageStatus(stage: JourneyStage, all: Record<string, ToolProgress>): StageStatus {
  if (stage.kind === "activity") {
    const done = (all["content"]?.levels[stage.key]?.stars ?? 0) > 0;
    return done ? "done" : "new";
  }
  const tp = all[stage.key];
  if (!tp) return "new";
  const mastered = Object.values(tp.levels).some((l) => l.mastered) || tp.totalStars >= MASTERY_STARS;
  if (mastered) return "done";
  return tp.totalStars > 0 ? "started" : "new";
}
