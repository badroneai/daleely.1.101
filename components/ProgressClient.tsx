"use client";

// Global progress / "نجومي" surface — aggregates the per-tool gamification into
// one persistent profile so stars feel meaningful across the whole app.
// Uses the existing progress store (localStorage); no accounts, no PII.

import Link from "next/link";
import { tools } from "@/lib/tools";
import { useAllProgress, totalStarsAcross } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

export default function ProgressClient() {
  const all = useAllProgress();
  const total = totalStarsAcross(all);
  const mathTools = tools.filter((t) => t.category === "math");
  const playedCount = mathTools.filter((t) => (all[t.slug]?.totalStars ?? 0) > 0).length;

  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-b from-primary-50 to-white rounded-2xl p-8 border border-primary-100">
        <p className="text-lg text-gray-600 mb-1">مجموع نجومك</p>
        <p className="text-6xl font-extrabold text-amber-500">⭐ {toArabicDigits(total)}</p>
        <p className="text-gray-500 mt-3">
          {total === 0
            ? "ابدأ أي أداة لتجمع نجومك الأولى!"
            : `أحسنت! تدرّبت على ${toArabicDigits(playedCount)} من ${toArabicDigits(mathTools.length)} أدوات.`}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">تقدّمك في أدوات الرياضيات</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {mathTools.map((tool) => {
            const tp = all[tool.slug];
            const stars = tp?.totalStars ?? 0;
            const mastered = tp ? Object.values(tp.levels).filter((l) => l.mastered).length : 0;
            return (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block card hover:border-primary-300 transition-colors focus-visible-ring"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{tool.title}</h3>
                    <span className="text-amber-600 font-bold whitespace-nowrap">⭐ {toArabicDigits(stars)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {mastered > 0 ? `أتقنت ${toArabicDigits(mastered)} مستوى` : "لم تبدأ بعد"}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-center text-xs text-gray-400">
        يُحفظ تقدّمك على هذا الجهاز فقط، بدون حساب أو بيانات شخصية.
      </p>
    </div>
  );
}
