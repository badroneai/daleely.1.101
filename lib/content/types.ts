// Content-interaction model — data-driven activities reused across all content
// subjects (science, social, لغتي, life-skills, art). One engine per kind, fed by
// per-lesson data (the "20% core"). See components/content/ContentPlayer.tsx.

export type ActivityKind = "quiz" | "matching" | "sort" | "sequence" | "label";

export interface QuizQuestion {
  prompt: string;
  options: string[];
  answer: string;
  hint?: string;
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface SortItem {
  text: string;
  bucket: string;
}

export interface LabelPoint {
  x: number; // 0..100 (percent of the SVG viewBox width)
  y: number; // 0..100
  label: string;
}

interface Base {
  id: string;
  title: string;
  subject: string; // subject id: science | social | arabic | life-skills | art | math
}

export type ContentActivity =
  | (Base & { kind: "quiz"; questions: QuizQuestion[] })
  | (Base & { kind: "matching"; pairs: MatchPair[] })
  | (Base & { kind: "sort"; buckets: string[]; items: SortItem[] })
  | (Base & { kind: "sequence"; items: string[] }) // items already in the correct order
  | (Base & { kind: "label"; svg: string; points: LabelPoint[] }); // svg inline; points overlaid
