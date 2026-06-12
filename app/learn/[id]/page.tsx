import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import ContentPlayer from "@/components/content/ContentPlayer";
import { getActivity, getActivityIds } from "@/lib/content";

export function generateStaticParams() {
  return getActivityIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const a = getActivity(id);
  if (!a) return { title: "النشاط غير موجود - Daleely.ai" };
  return { title: `${a.title} | Daleely.ai`, description: `نشاط تفاعلي: ${a.title}`, robots: { index: false } };
}

export default async function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activity = getActivity(id);
  if (!activity) notFound();

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أنشطة", href: "/learn" }, { label: activity.title }]}>
      <div className="max-w-2xl mx-auto">
        <ContentPlayer activity={activity} />
      </div>
    </PageLayout>
  );
}
