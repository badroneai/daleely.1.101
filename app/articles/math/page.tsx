import PageLayout from "@/components/PageLayout";
import { getArticlesByCategory } from "@/lib/articles";
import Link from "next/link";

export const metadata = {
  title: "مقالات الرياضيات - Daleely.ai",
  description: "مقالات ونصائح تعليمية حول تعليم الرياضيات للأطفال",
  alternates: {
    canonical: "https://daleely.ai/articles/math",
  },
};

export default function MathArticlesPage() {
  const articles = getArticlesByCategory("math");

  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "مقالات", href: "/articles" },
        { label: "الرياضيات" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">مقالات الرياضيات</h1>
        <p className="text-lg text-gray-600 mb-8">
          استكشف مقالاتنا التعليمية المفيدة حول تعليم الرياضيات للأطفال.
        </p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/math/${article.slug}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-3">{article.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(article.publishedAt).toLocaleDateString("ar-SA")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
