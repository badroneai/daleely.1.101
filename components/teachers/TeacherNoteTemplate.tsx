"use client";

import { useState } from "react";
import { getCurrentArabicDate } from "@/lib/date-utils";

interface TeacherNoteTemplateProps {
  title: string;
  content: React.ReactNode;
  instructions?: string;
}

export default function TeacherNoteTemplate({
  title,
  content,
  instructions,
}: TeacherNoteTemplateProps) {
  const [notes, setNotes] = useState<string>("");
  const dateInfo = getCurrentArabicDate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print-only wrapper - only visible when printing */}
      <div className="hidden print:block">
        <div className="bg-white min-h-screen p-8">
          {/* Header */}
          <div className="mb-8 border-b-2 border-gray-300 pb-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                بسم الله الرحمن الرحيم
              </p>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                {instructions && (
                  <p className="text-gray-600 text-sm">{instructions}</p>
                )}
              </div>
              <div className="text-left text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold mb-1">{dateInfo.dayName}</p>
                <p className="mb-1">التاريخ الهجري: {dateInfo.hijri}</p>
                <p>التاريخ الميلادي: {dateInfo.gregorian}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            {content}
          </div>

          {/* Notes Section */}
          <div className="mb-8 border-t-2 border-gray-300 pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ملاحظاتي:</h2>
            <div className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">
              {notes || " "}
            </div>
          </div>
        </div>
      </div>

      {/* Screen-only wrapper - hidden when printing */}
      <div className="print:hidden">
        <div className="bg-white min-h-screen p-8">
          {/* Header */}
          <div className="mb-8 border-b-2 border-gray-300 pb-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                بسم الله الرحمن الرحيم
              </p>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                {instructions && (
                  <p className="text-gray-600 text-sm">{instructions}</p>
                )}
              </div>
              <div className="text-left text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold mb-1">{dateInfo.dayName}</p>
                <p className="mb-1">التاريخ الهجري: {dateInfo.hijri}</p>
                <p>التاريخ الميلادي: {dateInfo.gregorian}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            {content}
          </div>

          {/* Notes Section */}
          <div className="mb-8 border-t-2 border-gray-300 pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ملاحظاتي:</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="اكتب ملاحظاتك هنا..."
              className="w-full min-h-[200px] p-4 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-gray-900 text-lg leading-relaxed"
              dir="rtl"
            />
          </div>

          {/* Print Button */}
          <div className="text-center">
            <button
              onClick={handlePrint}
              className="btn-primary px-8 py-3 text-lg"
            >
              🖨️ طباعة الورقة
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
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
          /* Hide everything except print content */
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
          /* Hide navigation, header, footer, sidebar */
          nav, header, footer, aside, .sidebar, [role="navigation"], [role="banner"], [role="contentinfo"] {
            display: none !important;
          }
          /* Hide print button and other UI elements */
          button, .btn-primary {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
