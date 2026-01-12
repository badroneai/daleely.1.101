import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا - Daleely.ai",
  description: "تواصل مع فريق Daleely.ai للاستفسارات والاقتراحات",
  alternates: {
    canonical: "https://daleely.ai/contact",
  },
};

export default function ContactPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "تواصل معنا" },
      ]}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">تواصل معنا</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-600 mb-6 leading-relaxed">
            نحن هنا لمساعدتك! إذا كان لديك أي استفسار، اقتراح، أو ملاحظة حول الموقع
            أو الأدوات التعليمية، لا تتردد في التواصل معنا.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                البريد الإلكتروني
              </h3>
              <p className="text-gray-600">
                <a
                  href="mailto:info@daleely.ai"
                  className="text-primary-600 hover:text-primary-700"
                >
                  info@daleely.ai
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                أوقات الاستجابة
              </h3>
              <p className="text-gray-600">
                نحاول الرد على جميع الرسائل خلال 48 ساعة.
              </p>
            </div>

            <div className="bg-primary-50 border-r-4 border-primary-500 p-4 rounded mt-6">
              <p className="text-primary-900">
                <strong>ملاحظة:</strong> إذا كان استفسارك متعلقاً بخصوصية الأطفال أو
                حماية البيانات، سنعطيه أولوية عالية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
