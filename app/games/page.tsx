import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { GAMES } from "@/lib/games/games";

export const metadata: Metadata = {
  title: "الألعاب التعليمية - Daleely.ai",
  description: "ألعاب تعليمية ممتعة تخدم المنهج: افقع البالون، الذاكرة، سباق الأرقام وأكثر — تعلّم باللعب.",
  alternates: { canonical: "https://daleely.ai/games" },
};

const grads = [
  "from-rose-500 to-pink-600",
  "from-sky-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
];

export default function GamesPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الألعاب" }]}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">🎮 الألعاب التعليمية</h1>
          <p className="text-gray-600">تعلّم باللعب! كل لعبة تشغّل مهارات منهجك — واكسب نجومًا.</p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES.map((g, i) => {
            const card = (
              <div className={`h-full rounded-3xl bg-gradient-to-br ${grads[i % grads.length]} text-white p-5 shadow-lg ${g.built ? "hover:shadow-2xl hover:-translate-y-1" : "opacity-60"} transition-all`}>
                <div className="text-4xl mb-2" aria-hidden="true">{g.emoji}</div>
                <h2 className="text-lg font-extrabold mb-1">{g.title}</h2>
                <p className="text-white/90 text-sm">{g.desc}</p>
                {!g.built && <span className="inline-block mt-2 text-xs bg-white/25 rounded-full px-2 py-0.5">قريبًا</span>}
              </div>
            );
            return (
              <li key={g.id}>
                {g.built ? (
                  <Link href={`/games/${g.id}`} className="block h-full focus-visible-ring rounded-3xl">{card}</Link>
                ) : (
                  <div aria-disabled="true">{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </PageLayout>
  );
}
