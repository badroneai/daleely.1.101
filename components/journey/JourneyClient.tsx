"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAllProgress, useStreak } from "@/lib/gamification/progress-store";
import { buildJourney, stageStatus, type JourneyStage, type StageStatus } from "@/lib/journey/journey";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";

const DAILY_GOAL = 3;

const statusDot: Record<StageStatus, string> = {
  done: "bg-green-600",
  started: "bg-amber-500",
  new: "bg-gray-300",
};
const statusIcon: Record<StageStatus, string> = { done: "✓", started: "•", new: "" };

export default function JourneyClient({ grade }: { grade: string }) {
  const all = useAllProgress();
  const streak = useStreak();
  const stages = useMemo(() => buildJourney(grade), [grade]);

  const withStatus = useMemo(
    () => stages.map((s) => ({ s, status: stageStatus(s, all) })),
    [stages, all]
  );
  const done = withStatus.filter((x) => x.status === "done").length;
  const total = stages.length;
  const next = withStatus.find((x) => x.status !== "done")?.s ?? null;
  const pct = total ? Math.round((done / total) * 100) : 0;

  // group by subject, preserving order
  const groups: { title: string; emoji: string; color: string; items: { s: JourneyStage; status: StageStatus }[] }[] = [];
  for (const x of withStatus) {
    let g = groups.find((gg) => gg.title === x.s.subjectTitle);
    if (!g) { g = { title: x.s.subjectTitle, emoji: x.s.emoji, color: x.s.color, items: [] }; groups.push(g); }
    g.items.push(x);
  }

  return (
    <div className="space-y-8">
      {/* streak + daily goal */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-4 py-2 font-bold">
          🔥 سلسلة {toArabicDigits(streak.streak)} {streak.streak === 1 ? "يوم" : "أيام"}
        </div>
        <div className={`flex items-center gap-2 rounded-full px-4 py-2 font-bold ${streak.todayCount >= DAILY_GOAL ? "bg-green-50 text-green-700" : "bg-sky-50 text-sky-700"}`}>
          🎯 هدف اليوم {toArabicDigits(Math.min(streak.todayCount, DAILY_GOAL))}/{toArabicDigits(DAILY_GOAL)}
          {streak.todayCount >= DAILY_GOAL && " ✓"}
        </div>
      </div>

      {/* what now */}
      {next ? (
        <Link href={next.href} className={`block rounded-3xl bg-gradient-to-br ${next.color} text-white p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all focus-visible-ring`}>
          <p className="text-white/90 mb-1">⭐ ماذا أتعلّم الآن؟</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl" aria-hidden="true">{next.emoji}</span>
            <div>
              <p className="text-xl font-extrabold">{next.title}</p>
              <p className="text-white/90 text-sm">{next.subjectTitle} — اضغط لتبدأ ←</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 text-center shadow-xl">
          <p className="text-3xl mb-1">🎉</p>
          <p className="text-xl font-extrabold">أكملت رحلة هذا الصف! أحسنت</p>
        </div>
      )}

      {/* overall progress */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
          <span>تقدّمك في الرحلة</span>
          <span>{toArabicDigits(done)} / {toArabicDigits(total)} محطة</span>
        </div>
        <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-600" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* map by subject */}
      <div className="space-y-6">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${g.color} text-white font-bold px-4 py-2 mb-3`}>
              <span aria-hidden="true">{g.emoji}</span> {g.title}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {g.items.map(({ s, status }) => (
                <li key={s.key}>
                  <Link href={s.href} title={s.title}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors focus-visible-ring ${status === "done" ? "border-green-200 bg-green-50 text-green-800" : status === "started" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                    <span className={`inline-grid place-items-center w-5 h-5 rounded-full text-white text-xs ${statusDot[status]}`} aria-hidden="true">{statusIcon[status]}</span>
                    <span className="max-w-[12rem] truncate">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">يُحفظ تقدّمك على هذا الجهاز فقط، بدون حساب.</p>
    </div>
  );
}
