import { Tool } from "@/lib/types";
import Link from "next/link";
import { getGradeLevelLabel } from "@/lib/tools";

interface PillarTemplateProps {
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers" | "parents";
  topTools: Tool[];
  toolsByGrade: {
    kg?: {
      kg1: Tool[];
      kg2: Tool[];
      kg3: Tool[];
    };
    elementary?: {
      grade1: Tool[];
      grade2: Tool[];
      grade3: Tool[];
      grade4: Tool[];
      grade5: Tool[];
      grade6: Tool[];
    };
    middle?: {
      grade7: Tool[];
      grade8: Tool[];
      grade9: Tool[];
    };
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
      {((toolsByGrade.kg && (toolsByGrade.kg.kg1.length > 0 || toolsByGrade.kg.kg2.length > 0 || toolsByGrade.kg.kg3.length > 0)) ||
        (toolsByGrade.elementary && (toolsByGrade.elementary.grade1.length > 0 || toolsByGrade.elementary.grade2.length > 0 || toolsByGrade.elementary.grade3.length > 0 || toolsByGrade.elementary.grade4.length > 0 || toolsByGrade.elementary.grade5.length > 0 || toolsByGrade.elementary.grade6.length > 0)) ||
        (toolsByGrade.middle && (toolsByGrade.middle.grade7.length > 0 || toolsByGrade.middle.grade8.length > 0 || toolsByGrade.middle.grade9.length > 0))) && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الأدوات حسب المرحلة الدراسية</h2>
          
          <div className="space-y-12">
            {/* رياض الأطفال */}
            {toolsByGrade.kg && (toolsByGrade.kg.kg1.length > 0 || toolsByGrade.kg.kg2.length > 0 || toolsByGrade.kg.kg3.length > 0) && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-300 pb-2">رياض الأطفال</h3>
                <div className="space-y-6">
                  {toolsByGrade.kg.kg1.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("kg1")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.kg.kg1.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.kg.kg2.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("kg2")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.kg.kg2.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.kg.kg3.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("kg3")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.kg.kg3.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* التعليم الابتدائي */}
            {toolsByGrade.elementary && (toolsByGrade.elementary.grade1.length > 0 || toolsByGrade.elementary.grade2.length > 0 || toolsByGrade.elementary.grade3.length > 0 || toolsByGrade.elementary.grade4.length > 0 || toolsByGrade.elementary.grade5.length > 0 || toolsByGrade.elementary.grade6.length > 0) && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-300 pb-2">التعليم الابتدائي</h3>
                <div className="space-y-6">
                  {toolsByGrade.elementary.grade1.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade1")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.elementary.grade1.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.elementary.grade2.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade2")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.elementary.grade2.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.elementary.grade3.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade3")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.elementary.grade3.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.elementary.grade4.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade4")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.elementary.grade4.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.elementary.grade5.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade5")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.elementary.grade5.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.elementary.grade6.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade6")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.elementary.grade6.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* التعليم المتوسط */}
            {toolsByGrade.middle && (toolsByGrade.middle.grade7.length > 0 || toolsByGrade.middle.grade8.length > 0 || toolsByGrade.middle.grade9.length > 0) && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-300 pb-2">التعليم المتوسط</h3>
                <div className="space-y-6">
                  {toolsByGrade.middle.grade7.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade7")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.middle.grade7.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.middle.grade8.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade8")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.middle.grade8.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {toolsByGrade.middle.grade9.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">{getGradeLevelLabel("grade9")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {toolsByGrade.middle.grade9.map((tool, index) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <h5 className="font-semibold text-gray-900 mb-1">{tool.title}</h5>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
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
