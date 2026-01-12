import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "لأولياء الأمور - Daleely.ai",
  description: "إرشادات ونصائح لأولياء الأمور لمساعدة أطفالهم في التعلم",
  alternates: {
    canonical: "https://daleely.ai/parents",
  },
};

export default function ParentsPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">لأولياء الأمور</h1>
        <p className="text-lg text-gray-600 mb-8">
          قريباً: إرشادات ونصائح لمساعدة أطفالكم في التعلم
        </p>
      </div>
    </PageLayout>
  );
}
