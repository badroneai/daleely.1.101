import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import GamePlayer from "@/components/games/GamePlayer";
import { GAMES, getGame } from "@/lib/games/games";

export function generateStaticParams() {
  return GAMES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const g = getGame(id);
  if (!g) return { title: "اللعبة غير موجودة - Daleely.ai" };
  return { title: `${g.title} | Daleely.ai`, description: g.desc, robots: { index: false } };
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGame(id);
  if (!g) notFound();

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الألعاب", href: "/games" }, { label: g.title }]}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{g.emoji} {g.title}</h1>
          <p className="text-gray-600 text-sm mt-1">{g.desc}</p>
        </div>
        <div className="bg-white border-2 border-primary-500 rounded-2xl p-5 md:p-6">
          <GamePlayer id={id} />
        </div>
      </div>
    </PageLayout>
  );
}
