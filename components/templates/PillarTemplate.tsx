import { Tool } from "@/lib/types";
import Link from "next/link";

interface PillarTemplateProps {
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers" | "parents";
  topTools: Tool[];
  toolsByGrade: {
    "1-2": Tool[];
    "3-4": Tool[];
    "5-6": Tool[];
  };
  learningPath: Array<{ step: number; title: string; description: string; toolSlug?: string }>;
  articles?: Array<{ slug: string; title: string }>;
  faq: Array<{ question: string; answer: string }>;
}

export default function PillarTemplate({
  title,
  description,
  category,
  topTools,
  toolsByGrade,
  learningPath,
  articles = [],
  faq,
}: PillarTemplateProps) {
  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* H1 + Introduction */}
      <div className="mb-12 slide-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Start Now - Top 3 Tools */}
      {topTools.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ابدأ الآن</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topTools.map((tool, index) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card text-center hover:border-primary-300 transition-all duration-200 focus-visible-ring slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">
                  {tool.category === "math" ? "🔢" : "📚"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <span className="btn-primary inline-block text-sm">
                  جرب الآن
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tools by Grade Level */}
      {(toolsByGrade["1-2"].length > 0 || toolsByGrade["3-4"].length > 0 || toolsByGrade["5-6"].length > 0) && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الأدوات حسب المرحلة الدراسية</h2>
          
          <div className="space-y-8">
            {/* Grades 1-2 */}
            {toolsByGrade["1-2"].length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">الصفوف 1-2</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {toolsByGrade["1-2"].map((tool, index) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{tool.title}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Grades 3-4 */}
            {toolsByGrade["3-4"].length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">الصفوف 3-4</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {toolsByGrade["3-4"].map((tool, index) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{tool.title}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Grades 5-6 */}
            {toolsByGrade["5-6"].length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">الصفوف 5-6</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {toolsByGrade["5-6"].map((tool, index) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{tool.title}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Learning Path */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">مسار التعلم</h2>
        <div className="space-y-4">
          {learningPath.map((step, index) => (
            <div
              key={step.step}
              className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg scale-in">
                {step.step}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-2">{step.description}</p>
                {step.toolSlug && (
                  <Link
                    href={`/tools/${step.toolSlug}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 focus-visible-ring rounded"
                  >
                    جرب الأداة →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      {articles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">مقالات مهمة</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/articles/${category}/${article.slug}`}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
}
