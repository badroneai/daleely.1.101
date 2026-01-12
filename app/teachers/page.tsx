import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "للمعلمين - Daleely.ai",
  description: "أدوات وموارد تعليمية للمعلمين والمعلمات",
  alternates: {
    canonical: "https://daleely.ai/teachers",
  },
};

export default function TeachersPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">للمعلمين والمعلمات</h1>
        <p className="text-lg text-gray-600 mb-8">
          قريباً: أدوات وموارد تعليمية للمعلمين
        </p>
      </div>
    </PageLayout>
  );
}
