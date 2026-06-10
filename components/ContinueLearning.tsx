"use client";

// Home "welcome back" widget — a returning child sees their stars and a one-tap
// way to resume the tool they've practiced most. New visitors see nothing (SSR
// renders null because there is no progress), so there's no flash or empty state.
// Content-independent: reads only the local progress store.

import Link from "next/link";
import { tools } from "@/lib/tools";
import { useAllProgress, totalStarsAcross } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export default function ContinueLearning() {
  const all = useAllProgress();
  const total = totalStarsAcross(all);
  if (total === 0) return null;

  const resume = tools
    .filter((t) => t.category === "math")
    .map((t) => ({ t, stars: all[t.slug]?.totalStars ?? 0 }))
    .filter((x) => x.stars > 0)
    .sort((a, b) => b.stars - a.stars)[0];

  return (
    <div className="mb-10 rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">👋</span>
        <div>
          <p className="font-bold text-gray-900">مرحبًا بعودتك!</p>
          <p className="text-amber-700 font-semibold">⭐ {toArabicDigits(total)} نجمة حتى الآن</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {resume && (
          <Link href={`/tools/${resume.t.slug}`} className="btn-primary focus-visible-ring">
            واصل: {resume.t.title}
          </Link>
        )}
        <Link href="/progress" className="btn-secondary focus-visible-ring">نجومي</Link>
      </div>
    </div>
  );
}
