// Reusable, ethical gamification store (Tool Playbook primitive).
//
// Persists per-tool, per-level progress (stars earned, best streak, mastery) in
// localStorage. Read through `useToolProgress()` (SSR-safe `useSyncExternalStore`).
//
// Ethics: stars reward correct answers only; there are no timers, no loss
// mechanics, no pay-to-win, no streak punishment. Mastery is a learning signal
// (10 correct answers in a level), never a paywall.

import { useSyncExternalStore } from "react";

export interface LevelProgress {
  stars: number;
  bestStreak: number;
  mastered: boolean;
}

export interface ToolProgress {
  levels: Record<string, LevelProgress>;
  totalStars: number;
}

type AllProgress = Record<string, ToolProgress>;

const KEY = "daleely_progress_v1";
const MASTERY_STARS = 10;
const EMPTY_TOOL: ToolProgress = Object.freeze({ levels: {}, totalStars: 0 });

const listeners = new Set<() => void>();
let cache: AllProgress | null = null;
const snapshots = new Map<string, ToolProgress>();

function loadAll(): AllProgress {
  if (typeof window === "undefined") return {};
  if (cache) return cache;
  try {
    cache = JSON.parse(window.localStorage.getItem(KEY) || "{}") as AllProgress;
  } catch {
    cache = {};
  }
  return cache;
}

function persist(data: AllProgress): void {
  cache = data;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // storage full / blocked — progress is best-effort, never fatal
    }
  }
  for (const l of listeners) l();
}

export function getToolProgress(slug: string): ToolProgress {
  return loadAll()[slug] ?? EMPTY_TOOL;
}

/** Record one answer; awards a star on success and updates streak/mastery. */
export function recordResult(
  slug: string,
  levelId: string,
  correct: boolean,
  currentStreak: number
): void {
  const all: AllProgress = { ...loadAll() };
  const prev = all[slug] ?? EMPTY_TOOL;
  const tool: ToolProgress = { levels: { ...prev.levels }, totalStars: prev.totalStars };
  const lvl = tool.levels[levelId] ?? { stars: 0, bestStreak: 0, mastered: false };
  const next: LevelProgress = { ...lvl };
  if (correct) {
    next.stars += 1;
    tool.totalStars += 1;
  }
  next.bestStreak = Math.max(next.bestStreak, currentStreak);
  next.mastered = next.mastered || next.stars >= MASTERY_STARS;
  tool.levels[levelId] = next;
  all[slug] = tool;
  persist(all);
}

export function resetToolProgress(slug: string): void {
  const all: AllProgress = { ...loadAll() };
  delete all[slug];
  persist(all);
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      for (const l of listeners) l();
    }
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

// `useSyncExternalStore` requires a stable snapshot reference when nothing
// changed; cache per-slug and only swap on a real (deep) change.
function snapshot(slug: string): ToolProgress {
  const current = getToolProgress(slug);
  const prev = snapshots.get(slug);
  if (prev && JSON.stringify(prev) === JSON.stringify(current)) return prev;
  snapshots.set(slug, current);
  return current;
}

export function useToolProgress(slug: string): ToolProgress {
  return useSyncExternalStore(
    subscribe,
    () => snapshot(slug),
    () => EMPTY_TOOL
  );
}

const EMPTY_ALL: AllProgress = Object.freeze({});

/** Total stars earned across every tool. */
export function totalStarsAcross(all: AllProgress): number {
  return Object.values(all).reduce((sum, t) => sum + (t.totalStars || 0), 0);
}

/** Whole-store progress (all tools), read SSR-safely. */
export function useAllProgress(): AllProgress {
  return useSyncExternalStore(subscribe, loadAll, () => EMPTY_ALL);
}
