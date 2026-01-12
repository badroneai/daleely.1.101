"use client";

import { useState } from "react";
import Link from "next/link";

interface RelatedArticle {
  title: string;
  href: string;
  description: string;
}

interface ArticleExpandedContentProps {
  relatedArticles: RelatedArticle[];
  additionalContent: {
    signs?: string[];
    whenToWorry?: string[];
    preventionTips?: string[];
    advancedStrategies?: string[];
    commonMistakes?: string[];
    successStories?: string[];
  };
}

export default function ArticleExpandedContent({
  relatedArticles,
  additionalContent,
}: ArticleExpandedContentProps) {
  const [expandedContent, setExpandedContent] = useState(false);

  return (
    <section className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
      <button
        onClick={() => setExpandedContent(!expandedContent)}
        className="w-full text-right flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          {expandedContent ? "إخفاء المحتوى الإضافي" : "اقرأ المزيد: معلومات متقدمة"}
        </h2>
        <span className="text-2xl">{expandedContent ? "▲" : "▼"}</span>
      </button>
      {expandedContent && (
        <div className="mt-6 space-y-6">
          {additionalContent.signs && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">علامات تدل على المشكلة</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                {additionalContent.signs.map((sign, idx) => (
                  <li key={idx}>{sign}</li>
                ))}
              </ul>
            </div>
          )}

          {additionalContent.whenToWorry && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">متى يجب أن تقلق؟</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                {additionalContent.whenToWorry.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {additionalContent.preventionTips && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">نصائح للوقاية</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                {additionalContent.preventionTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {additionalContent.advancedStrategies && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">استراتيجيات متقدمة</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                {additionalContent.advancedStrategies.map((strategy, idx) => (
                  <li key={idx}>{strategy}</li>
                ))}
              </ul>
            </div>
          )}

          {additionalContent.commonMistakes && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">أخطاء شائعة يجب تجنبها</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                {additionalContent.commonMistakes.map((mistake, idx) => (
                  <li key={idx}>{mistake}</li>
                ))}
              </ul>
            </div>
          )}

          {additionalContent.successStories && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">قصص نجاح</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                {additionalContent.successStories.map((story, idx) => (
                  <li key={idx}>{story}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="bg-primary-50 rounded-lg p-6 border-r-4 border-primary-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">مقالات ذات صلة</h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{article.title}</h4>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
