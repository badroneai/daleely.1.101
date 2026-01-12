import PageLayout from "@/components/PageLayout";
import { tools } from "@/lib/tools";
import Link from "next/link";

export const metadata = {
  title: "الأدوات التعليمية - Daleely.ai",
  description: "استكشف جميع الأدوات التعليمية التفاعلية للرياضيات واللغة العربية",
  alternates: {
    canonical: "https://daleely.ai/tools",
  },
};

export default function ToolsPage() {
  const mathTools = tools.filter((t) => t.category === "math");
  const arabicTools = tools.filter((t) => t.category === "arabic");
  const teacherTools = tools.filter((t) => t.category === "teachers");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الأدوات" },
      ]}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            الأدوات التعليمية
          </h1>
          <p className="text-lg text-gray-600">
            اختر من مجموعة واسعة من الأدوات التفاعلية المجانية لمساعدة أطفالك في التعلم
          </p>
        </div>

        {/* Most Used */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الأكثر استخداماً</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.slice(0, 3).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card hover:border-primary-300 transition-colors"
              >
                <div className="text-4xl mb-3">
                  {tool.category === "math" ? "🔢" : "📚"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* By Category */}
        <div className="space-y-12">
          {/* Math */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">الرياضيات</h2>
              <Link href="/math" className="text-primary-600 hover:text-primary-700 font-medium">
                عرض الكل →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mathTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Arabic */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">اللغة العربية</h2>
              <Link href="/arabic" className="text-primary-600 hover:text-primary-700 font-medium">
                عرض الكل →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {arabicTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Teachers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">للمعلمين</h2>
              <Link href="/teachers" className="text-primary-600 hover:text-primary-700 font-medium">
                عرض الكل →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacherTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
