import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { getGradeCurriculum, getCurriculumGrades, curriculumStats } from "@/lib/curriculum";
import { normalizeLesson } from "@/lib/curriculum/types";

export function generateStaticParams() {
  return getCurriculumGrades().map((grade) => ({ grade }));
}

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
  const { grade } = await params;
  const c = getGradeCurriculum(grade);
  if (!c) return { title: "المنهج غير موجود - Daleely.ai" };
  return {
    title: `منهج ${c.titleAr} - Daleely.ai`,
    description: `تصفّح مواد ووحدات ودروس ${c.titleAr} مع الأدوات التفاعلية المرتبطة بها.`,
    alternates: { canonical: `https://daleely.ai/curriculum/${grade}` },
  };
}

export default async function CurriculumPage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade } = await params;
  const c = getGradeCurriculum(grade);
  if (!c) notFound();

  const stats = curriculumStats(c);

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "المناهج", href: "/student" }, { label: c.titleAr }]}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">📖 منهج {c.titleAr}</h1>
          <p className="text-gray-600">
            {c.subjects.length} مواد · {stats.units} وحدة · {stats.lessons} درسًا — منها {stats.interactive} درسًا تفاعليًّا بأدوات جاهزة.
          </p>
        </div>

        <div className="space-y-10">
          {c.subjects.map((subject) => (
            <section key={subject.id}>
              <h2 className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${subject.color} text-white font-bold px-4 py-2 mb-4`}>
                <span aria-hidden="true">{subject.emoji}</span> {subject.titleAr}
              </h2>

              <div className="space-y-5">
                {subject.units.map((unit) => (
                  <div key={unit.title} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3">{unit.title}</h3>
                    <ul className="space-y-2">
                      {unit.lessons.map((raw) => {
                        const lesson = normalizeLesson(raw, subject);
                        if (lesson.productType === "interactive" && lesson.toolSlug) {
                          return (
                            <li key={lesson.title}>
                              <Link
                                href={`/tools/${lesson.toolSlug}?grade=${c.grade}`}
                                className="flex items-center justify-between gap-3 rounded-lg bg-sky-50 hover:bg-sky-100 px-3 py-2 transition-colors focus-visible-ring"
                              >
                                <span className="text-gray-800">{lesson.title}</span>
                                <span className="shrink-0 text-sky-700 text-sm font-semibold">▶ تدرّب</span>
                              </Link>
                            </li>
                          );
                        }
                        const badge =
                          lesson.productType === "practice"
                            ? { text: "تدريب — قريبًا", cls: "text-amber-700 bg-amber-50" }
                            : { text: "درس", cls: "text-gray-500 bg-gray-50" };
                        return (
                          <li key={lesson.title} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2">
                            <span className="text-gray-700">{lesson.title}</span>
                            <span className={`shrink-0 text-xs font-semibold rounded-full px-2 py-0.5 ${badge.cls}`}>{badge.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          المصدر: {c.source}. الدروس التفاعلية مرتبطة بأدوات دليلي؛ بقية الدروس تُضاف تباعًا.
        </p>
      </div>
    </PageLayout>
  );
}
