import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { getActivities, kindLabel } from "@/lib/content";

export const metadata: Metadata = {
  title: "الأنشطة التفاعلية - Daleely.ai",
  description: "أنشطة تفاعلية للعلوم والاجتماعيات واللغة وغيرها: اختبار، مطابقة، تصنيف، ترتيب، تسمية.",
  alternates: { canonical: "https://daleely.ai/learn" },
};

const subjectName: Record<string, string> = {
  science: "العلوم",
  social: "الدراسات الاجتماعية",
  arabic: "لغتي",
  "life-skills": "المهارات الحياتية",
  art: "التربية الفنية",
  math: "الرياضيات",
};

const kindEmoji: Record<string, string> = { quiz: "❓", matching: "🔗", sort: "🗂️", sequence: "↕️", label: "📍" };

export default function LearnPage() {
  const activities = getActivities();
  const subjects = Array.from(new Set(activities.map((a) => a.subject)));

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أنشطة" }]}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">🧩 الأنشطة التفاعلية</h1>
          <p className="text-gray-600">تعلّم بالتفاعل: اختبار، مطابقة، تصنيف، ترتيب، وتسمية — لكل المواد.</p>
        </div>

        <Link
          href="/practice"
          className="block mb-8 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-700 text-white p-5 text-center font-bold shadow-lg hover:shadow-xl transition-shadow focus-visible-ring"
        >
          ✏️ جرّب التدريب التفاعلي الحسّي — أنشطة لا نهائية تتولّد لك! ←
        </Link>

        <div className="space-y-8">
          {subjects.map((s) => (
            <section key={s}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{subjectName[s] ?? s}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {activities.filter((a) => a.subject === s).map((a) => (
                  <li key={a.id}>
                    <Link href={`/learn/${a.id}`} className="flex items-center gap-3 card hover:border-primary-300 transition-colors focus-visible-ring">
                      <span className="text-2xl" aria-hidden="true">{kindEmoji[a.kind]}</span>
                      <span>
                        <span className="block font-bold text-gray-900">{a.title}</span>
                        <span className="block text-xs text-gray-500">{kindLabel(a.kind)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
