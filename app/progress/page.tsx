import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ProgressClient from "@/components/ProgressClient";

export const metadata: Metadata = {
  title: "نجومي - تقدّمي | Daleely.ai",
  description: "تابع نجومك وتقدّمك في أدوات دليلي التعليمية. يُحفظ على جهازك فقط بدون حساب.",
  alternates: { canonical: "https://daleely.ai/progress" },
  robots: { index: false, follow: true },
};

export default function ProgressPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "نجومي" },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">نجومي</h1>
        <p className="text-gray-600 mb-8">كل نجمة تجمعها من تدريباتك تظهر هنا. واصل التعلّم! 🌟</p>
        <ProgressClient />
      </div>
    </PageLayout>
  );
}
