"use client";

export default function PrintButton() {
  return (
    <div className="print:hidden text-center mt-8">
      <button
        onClick={() => window.print()}
        className="btn-primary px-8 py-3 text-lg"
      >
        🖨️ طباعة الورقة
      </button>
    </div>
  );
}
