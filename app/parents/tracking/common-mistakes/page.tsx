import PageLayout from "@/components/PageLayout";
import CommonMistakesTracker from "@/components/parents/CommonMistakesTracker";
import PrintButton from "@/components/parents/PrintButton";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "سجل الأخطاء الشائعة",
  "لوحة متابعة منزلية: سجل الأخطاء الشائعة في الرياضيات والعربية لتتبع المشاكل وحلها",
  "parents/tracking/common-mistakes"
);

export default function CommonMistakesPage() {
  return (
    <>
      <PageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "لأولياء الأمور", href: "/parents" },
          { label: "لوحة متابعة منزلية", href: "/parents/tracking" },
          { label: "سجل الأخطاء الشائعة" },
        ]}
      >
        <div className="max-w-6xl mx-auto">
          <CommonMistakesTracker />
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
