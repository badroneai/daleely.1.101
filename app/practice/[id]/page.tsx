import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import InteractivePlayer from "@/components/interactive/InteractivePlayer";
import { INTERACTIVE_SKILLS, getInteractiveSkill } from "@/lib/interactive";

export function generateStaticParams() {
  return [...INTERACTIVE_SKILLS.map((s) => ({ id: s.id })), { id: "mixed" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = getInteractiveSkill(id);
  if (!s) return { title: "التدريب غير موجود - Daleely.ai" };
  return { title: `${s.label} | Daleely.ai`, description: s.desc, robots: { index: false } };
}

export default async function PracticeSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = getInteractiveSkill(id);
  if (!s) notFound();

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "التدريب التفاعلي", href: "/practice" }, { label: s.label }]}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{s.emoji} {s.label}</h1>
        </div>
        <div className="bg-white border-2 border-primary-500 rounded-2xl p-5 md:p-6">
          <InteractivePlayer skillId={id} />
        </div>
      </div>
    </PageLayout>
  );
}
