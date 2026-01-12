import PageLayout from "@/components/PageLayout";
import ToolSelectorClient from "@/components/parents/ToolSelectorClient";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "دليل اختيار الأداة",
  "اختر الأداة المناسبة لطفلك بناءً على عمره، مستواه، هدفه، والوقت المتاح",
  "parents/tool-selector"
);

export default function ToolSelectorPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "دليل اختيار الأداة" },
      ]}
    >
      <ToolSelectorClient />
    </PageLayout>
  );
}
