import PageLayout from "@/components/PageLayout";
import WeeklyPointsTracker from "@/components/parents/WeeklyPointsTracker";
import PrintButton from "@/components/parents/PrintButton";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "جدول نقاط أسبوعي",
  "لوحة متابعة منزلية: جدول نقاط أسبوعي لتتبع الإنجازات والتقدم",
  "parents/tracking/weekly-points"
);

export default function WeeklyPointsPage() {
  return (
    <>
      <PageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "لأولياء الأمور", href: "/parents" },
          { label: "لوحة متابعة منزلية", href: "/parents/tracking" },
          { label: "جدول نقاط أسبوعي" },
        ]}
      >
        <div className="max-w-6xl mx-auto">
          <WeeklyPointsTracker />
          <PrintButton />
        </div>
      </PageLayout>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
          }
          body > *:not(script):not(.print\\:block) {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          nav, header, footer, aside, .sidebar, [role="navigation"], [role="banner"], [role="contentinfo"] {
            display: none !important;
          }
          button, .btn-primary {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}
