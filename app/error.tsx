"use client";

// Friendly route-level error boundary (child-appropriate, no scary stack traces).

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4" aria-hidden="true">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ غير متوقّع</h1>
        <p className="text-gray-600 mb-6">لا تقلق — جرّب مرة أخرى أو عُد إلى الصفحة الرئيسية.</p>
        <div className="flex gap-3 justify-center">
          <button type="button" onClick={reset} className="btn-primary focus-visible-ring">حاول مجددًا</button>
          <Link href="/" className="btn-secondary focus-visible-ring">الرئيسية</Link>
        </div>
      </div>
    </div>
  );
}
