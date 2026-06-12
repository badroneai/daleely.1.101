import PageLayout from "@/components/PageLayout";
import ToolTemplate from "@/components/templates/ToolTemplate";
import MeasurementClient from "@/components/tools/MeasurementClient";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { GradeLevel } from "@/lib/types";

const tool = getToolBySlug("measurement")!;
const relatedTools = getToolsByCategory("math").filter((t) => t.slug !== tool.slug).slice(0, 2);
export const metadata: Metadata = generateToolMetadata(tool.title, tool.description, tool.slug);

const faq = [
  { question: "ما المنظومة المترية؟", answer: "نظام وحدات القياس العشري: المتر للطول، الغرام للكتلة، اللتر للسعة، وتتضاعف بمقادير ١٠ و١٠٠ و١٠٠٠." },
  { question: "كيف أحوّل المتر إلى سنتيمتر؟", answer: "كل متر = ١٠٠ سنتيمتر، فنضرب عدد الأمتار في ١٠٠." },
];
const relatedArticles = [{ slug: "mental-math-tips", title: "نصائح لتحسين الحساب الذهني" }];

interface PageProps { searchParams: Promise<{ grade?: string }>; }
export default async function MeasurementPage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;
  const grade = (gradeParam as GradeLevel | undefined) || "all";
  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "أدوات", href: "/tools" }, { label: "رياضيات", href: "/math" }, { label: tool.title }]}>
      <ToolTemplate tool={tool} faq={faq} relatedTools={relatedTools} relatedArticles={relatedArticles}>
        <MeasurementClient grade={grade} />
      </ToolTemplate>
    </PageLayout>
  );
}
