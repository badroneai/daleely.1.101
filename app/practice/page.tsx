import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { INTERACTIVE_SKILLS } from "@/lib/interactive";

export const metadata: Metadata = {
  title: "التدريب التفاعلي - Daleely.ai",
  description: "أنشطة تفاعلية حسّية: خط الأعداد، تكوين العدد، تلوين الكسر، إكمال الفراغ — لا نهائية ومتنوّعة.",
  alternates: { canonical: "https://daleely.ai/practice" },
};

const grads = ["from-sky-500 to-blue-600", "from-emerald-500 to-teal-600", "from-rose-500 to-pink-600", "from-amber-500 to-orange-600", "from-violet-500 to-purple-600"];

export default function PracticePage() {
  const items = [...INTERACTIVE_SKILLS, { id: "mixed", label: "منوّع", emoji: "🎲", desc: "خليط من كل الأنواع" }];
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "التدريب التفاعلي" }]}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">✏️ التدريب التفاعلي</h1>
          <p className="text-gray-600">أنشطة حسّية تتولّد لك بلا نهاية — المسها، حرّكها، لوّنها، وتعلّم!</p>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, i) => (
            <li key={s.id}>
              <Link href={`/practice/${s.id}`} className={`block h-full rounded-3xl bg-gradient-to-br ${grads[i % grads.length]} text-white p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all focus-visible-ring`}>
                <div className="text-4xl mb-2" aria-hidden="true">{s.emoji}</div>
                <h2 className="text-lg font-extrabold mb-1">{s.label}</h2>
                <p className="text-white/90 text-sm">{s.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
