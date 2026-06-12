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
  bumpStreak();
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

// --- daily streak (date read only inside bumpStreak, which runs from event
// handlers via recordResult — never during render) ---

export interface StreakMeta {
  lastDate: string; // YYYY-MM-DD
  streak: number;
  todayCount: number;
}

const STREAK_KEY = "daleely_streak_v1";
const EMPTY_STREAK: StreakMeta = Object.freeze({ lastDate: "", streak: 0, todayCount: 0 });
let streakCache: StreakMeta | null = null;

function loadStreak(): StreakMeta {
  if (typeof window === "undefined") return EMPTY_STREAK;
  if (streakCache) return streakCache;
  let v: StreakMeta = EMPTY_STREAK;
  try {
    v = { ...EMPTY_STREAK, ...JSON.parse(window.localStorage.getItem(STREAK_KEY) || "{}") };
  } catch {
    v = EMPTY_STREAK;
  }
  streakCache = v;
  return v;
}

function dayString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function bumpStreak(): void {
  if (typeof window === "undefined") return;
  const now = new Date();
  const today = dayString(now);
  const prev = loadStreak();
  let next: StreakMeta;
  if (prev.lastDate === today) {
    next = { ...prev, todayCount: prev.todayCount + 1 };
  } else {
    const y = new Date(now);
    y.setDate(now.getDate() - 1);
    const continued = prev.lastDate === dayString(y);
    next = { lastDate: today, streak: continued ? prev.streak + 1 : 1, todayCount: 1 };
  }
  streakCache = next;
  try {
    window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  } catch {
    // best-effort
  }
  for (const l of listeners) l();
}

export function useStreak(): StreakMeta {
  return useSyncExternalStore(subscribe, loadStreak, () => EMPTY_STREAK);
}
