import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام - Daleely.ai",
  description: "شروط وأحكام استخدام موقع Daleely.ai",
  alternates: {
    canonical: "https://daleely.ai/terms",
  },
};

export default function TermsPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "شروط الاستخدام" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">شروط الاستخدام</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">القبول</h2>
            <p className="text-gray-600 leading-relaxed">
              باستخدامك لموقع Daleely.ai، أنت توافق على الالتزام بهذه الشروط والأحكام.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">الاستخدام المسموح</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              يمكنك استخدام الموقع للأغراض التعليمية فقط. يُمنع:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>استخدام الموقع لأغراض تجارية دون إذن</li>
              <li>محاولة اختراق أو تعطيل الموقع</li>
              <li>نسخ أو إعادة نشر المحتوى دون ذكر المصدر</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">المحتوى</h2>
            <p className="text-gray-600 leading-relaxed">
              جميع المحتويات والأدوات على الموقع مملوكة لـ Daleely.ai ومحمية بحقوق النشر.
              يمكنك استخدامها للأغراض التعليمية الشخصية فقط.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">إخلاء المسؤولية</h2>
            <p className="text-gray-600 leading-relaxed">
              نقدم الموقع &quot;كما هو&quot; دون أي ضمانات. لا نتحمل مسؤولية أي أضرار قد تنتج عن
              استخدام الموقع.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">التغييرات</h2>
            <p className="text-gray-600 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. استمرار استخدامك للموقع يعني
              موافقتك على الشروط المحدثة.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
