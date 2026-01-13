"use client";

import { useEffect } from "react";
import { Tool, FAQItem } from "@/lib/types";
import { trackEvent, trackPageLeaveEarly } from "@/lib/analytics";
import Link from "next/link";

interface ToolTemplateProps {
  tool: Tool;
  faq: FAQItem[];
  relatedTools?: Tool[];
  relatedArticles?: Array<{ slug: string; title: string }>;
  children: React.ReactNode; // The interactive tool component
}

export default function ToolTemplate({
  tool,
  faq,
  relatedTools = [],
  relatedArticles = [],
  children,
}: ToolTemplateProps) {
  useEffect(() => {
    trackEvent("tool_open", { tool: tool.slug });
    trackPageLeaveEarly();
  }, [tool.slug]);

  const handleStartTraining = () => {
    trackEvent("start_training", { tool: tool.slug });
  };

  return (
    <div className="max-w-4xl mx-auto fade-in">
      {/* H1 + Description */}
      <div className="mb-8 slide-up">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {tool.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {tool.description}
        </p>
      </div>


      {/* Educational Tip */}
      <div className="bg-primary-50 border-r-4 border-primary-500 p-4 mb-6 rounded slide-up" role="note" aria-label="نصيحة تعليمية">
        <p className="text-primary-900 font-medium">
          💡 نصيحة: {tool.category === "math" ? "مارس يومياً لمدة 10 دقائق لتحسين النتائج" : "استمع للأصوات بعناية وكررها"}
        </p>
      </div>

      {/* Interactive Tool */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 scale-in">
        {children}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">أسئلة شائعة</h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Schema FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">أدوات مرتبطة</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedTools.map((relatedTool, index) => (
              <Link
                key={relatedTool.slug}
                href={`/tools/${relatedTool.slug}`}
                className="card hover:border-primary-300 transition-all duration-200 focus-visible-ring slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {relatedTool.title}
                </h3>
                <p className="text-gray-600 text-sm">{relatedTool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">مقالات تساعدك</h2>
          <div className="space-y-3">
            {relatedArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/articles/${tool.category}/${article.slug}`}
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
