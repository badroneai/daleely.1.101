import Link from "next/link";
import { Tool } from "@/lib/types";

interface ArticleTemplateProps {
  title: string;
  description: string;
  content: React.ReactNode;
  category: "math" | "arabic" | "teachers" | "parents";
  publishedAt: string;
  relatedTools?: Tool[];
  relatedArticles?: Array<{ slug: string; title: string }>;
}

export default function ArticleTemplate({
  title,
  description,
  content,
  category,
  publishedAt,
  relatedTools = [],
  relatedArticles = [],
}: ArticleTemplateProps) {
  const categoryLabels = {
    math: "الرياضيات",
    arabic: "اللغة العربية",
    teachers: "للمعلمين",
    parents: "لأولياء الأمور",
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold text-sm">
            {categoryLabels[category]}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
        <p className="text-sm text-gray-500">
          تاريخ النشر: {new Date(publishedAt).toLocaleDateString("ar-SA")}
        </p>
      </div>

      {/* Content */}
      <article className="prose prose-lg max-w-none mb-12">
        {content}
      </article>

      {/* CTA - Try Tool */}
      {relatedTools.length > 0 && (
        <div className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            جرب الأداة الآن
          </h3>
          <div className="space-y-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">
                  {tool.title}
                </h4>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">مقالات ذات صلة</h2>
          <div className="space-y-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${category}/${article.slug}`}
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to category */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <Link
          href={`/articles`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← العودة إلى المقالات
        </Link>
      </div>
    </div>
  );
}
