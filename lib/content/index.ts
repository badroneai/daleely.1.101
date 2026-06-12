import type { ContentActivity } from "./types";
import { ACTIVITIES } from "./activities";

export function getActivity(id: string): ContentActivity | null {
  return ACTIVITIES.find((a) => a.id === id) ?? null;
}

export function getActivities(): ContentActivity[] {
  return ACTIVITIES;
}

export function getActivityIds(): string[] {
  return ACTIVITIES.map((a) => a.id);
}

const KIND_LABEL: Record<ContentActivity["kind"], string> = {
  quiz: "اختبار مفاهيم",
  matching: "مطابقة",
  sort: "تصنيف",
  sequence: "ترتيب",
  label: "تسمية",
};

export function kindLabel(kind: ContentActivity["kind"]): string {
  return KIND_LABEL[kind];
}

export type { ContentActivity } from "./types";
