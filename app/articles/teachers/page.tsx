import PageLayout from "@/components/PageLayout";
import { getArticlesByCategory } from "@/lib/articles";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "مقالات للمعلمين",
  "مقالات عملية قصيرة للمعلمين والمعلمات: أوراق عمل جاهزة، أنشطة صفية، تقويم تكويني، وإدارة الصف",
  "articles/teachers"
);

const articles = getArticlesByCategory("teachers");

export default function TeachersArticlesPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "مقالات", href: "/articles" },
        { label: "للمعلمين" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">مقالات للمعلمين والمعلمات</h1>
        <p className="text-lg text-gray-600 mb-8">
          مقالات عملية قصيرة قابلة للتطبيق الفوري في الصف. كل مقال يحتوي على فكرة واحدة، خطوات واضحة، وورقة جاهزة.
        </p>

        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/teachers/${article.slug}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <p className="text-sm text-gray-500">
                تاريخ النشر: {new Date(article.publishedAt).toLocaleDateString("ar-SA")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
