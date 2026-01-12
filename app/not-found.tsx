import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { tools } from "@/lib/tools";

export default function NotFound() {
  const popularTools = tools.slice(0, 3);

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الصفحة غير موجودة" },
      ]}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة. لكن لا تقلق، يمكنك الاستمرار
            في التعلم مع أدواتنا التعليمية!
          </p>
        </div>

        <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg mb-8 text-right">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            💡 نصيحة تعليمية
          </h3>
          <p className="text-gray-700 leading-relaxed">
            إذا كنت تبحث عن أداة تعليمية معينة، جرب استخدام شريط البحث في الأعلى أو
            تصفح الأقسام المختلفة. يمكنك أيضاً البدء بأشهر الأدوات أدناه.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            أشهر الأدوات التعليمية
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card hover:border-primary-300 transition-colors text-center"
              >
                <div className="text-4xl mb-3">
                  {tool.category === "math" ? "🔢" : "📚"}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {tool.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <span className="btn-primary inline-block text-sm">
                  جرب الآن
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tools" className="btn-primary">
            عرض جميع الأدوات
          </Link>
          <Link href="/" className="btn-secondary">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
