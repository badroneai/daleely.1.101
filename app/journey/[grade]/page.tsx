import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import JourneyClient from "@/components/journey/JourneyClient";
import { getGradeCurriculum, getCurriculumGrades } from "@/lib/curriculum";

export function generateStaticParams() {
  return getCurriculumGrades().map((grade) => ({ grade }));
}

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
  const { grade } = await params;
  const c = getGradeCurriculum(grade);
  if (!c) return { title: "الرحلة غير موجودة - Daleely.ai" };
  return {
    title: `رحلة التعلّم — ${c.titleAr} | Daleely.ai`,
    description: `تابع رحلتك التعليمية في ${c.titleAr}: محطة بعد محطة، مع توصية لما تتعلّمه الآن.`,
    robots: { index: false },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade } = await params;
  const c = getGradeCurriculum(grade);
  if (!c) notFound();

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "رحلة التعلّم" }]}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">🗺️ رحلة التعلّم</h1>
          <p className="text-gray-600">{c.titleAr} — محطة بعد محطة حتى الإتقان.</p>
        </div>
        <JourneyClient grade={grade} />
      </div>
    </PageLayout>
  );
}
