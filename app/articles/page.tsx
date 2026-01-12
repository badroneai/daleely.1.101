import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata = {
  title: "المقالات التعليمية - Daleely.ai",
  description: "مقالات ونصائح تعليمية للرياضيات واللغة العربية",
  alternates: {
    canonical: "https://daleely.ai/articles",
  },
};

export default function ArticlesPage() {
  const mathArticles = getArticlesByCategory("math");
  const arabicArticles = getArticlesByCategory("arabic");
  const teacherArticles = getArticlesByCategory("teachers");
  const parentArticles = getArticlesByCategory("parents");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "المقالات" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">المقالات التعليمية</h1>
        <p className="text-lg text-gray-600 mb-8">
          استكشف مقالاتنا التعليمية المفيدة حول تعليم الأطفال الرياضيات واللغة العربية.
        </p>

        <div className="space-y-8">
          {mathArticles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">الرياضيات</h2>
                <Link
                  href="/articles/math"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  عرض الكل →
                </Link>
              </div>
              <div className="space-y-3">
                {mathArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/math/${article.slug}`}
                    className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {arabicArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">اللغة العربية</h2>
              <div className="space-y-3">
                {arabicArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/arabic/${article.slug}`}
                    className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {teacherArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">للمعلمين</h2>
              <div className="space-y-3">
                {teacherArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/teachers/${article.slug}`}
                    className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {parentArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">لأولياء الأمور</h2>
              <div className="space-y-3">
                {parentArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/parents/${article.slug}`}
                    className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {mathArticles.length === 0 &&
            arabicArticles.length === 0 &&
            teacherArticles.length === 0 &&
            parentArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">المقالات قريباً...</p>
              </div>
            )}
        </div>
      </div>
    </PageLayout>
  );
}
