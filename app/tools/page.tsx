import PageLayout from "@/components/PageLayout";
import { tools } from "@/lib/tools";
import type { Tool } from "@/lib/types";
import Link from "next/link";

export const metadata = {
  title: "الأدوات التعليمية - Daleely.ai",
  description: "استكشف جميع الأدوات التعليمية التفاعلية للرياضيات واللغة العربية",
  alternates: {
    canonical: "https://daleely.ai/tools",
  },
};

const emojiBySlug: Record<string, string> = {
  "multiplication-table": "✖️",
  "multiplication-quiz": "📝",
  "mental-math-add-sub": "➕",
  "telling-time": "⏰",
  "place-value": "🔢",
  fractions: "🍕",
  decimals: "🔟",
  "fraction-operations": "➗",
  "number-theory": "🧮",
  "arabic-letters": "🔤",
  "letter-sounds": "🔊",
  harakat: "✏️",
  "syllables-blending": "🧩",
  "sight-words-ar": "👁️",
  "worksheet-generator": "📄",
};

const categoryStyle = {
  math: { emoji: "🔢", badge: "bg-sky-100", title: "text-sky-700", ring: "hover:ring-sky-300", heading: "from-sky-500 to-blue-600" },
  arabic: { emoji: "📚", badge: "bg-emerald-100", title: "text-emerald-700", ring: "hover:ring-emerald-300", heading: "from-emerald-500 to-teal-600" },
  teachers: { emoji: "👩‍🏫", badge: "bg-violet-100", title: "text-violet-700", ring: "hover:ring-violet-300", heading: "from-violet-500 to-purple-600" },
} as const;

function ToolCard({ tool }: { tool: Tool }) {
  const cat = categoryStyle[tool.category as keyof typeof categoryStyle] ?? categoryStyle.math;
  const emoji = emojiBySlug[tool.slug] ?? cat.emoji;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group flex items-start gap-4 rounded-2xl bg-white p-4 shadow-md ring-1 ring-transparent hover:shadow-xl hover:-translate-y-1 ${cat.ring} transition-all focus-visible-ring`}
    >
      <div className={`shrink-0 grid place-items-center h-14 w-14 rounded-2xl ${cat.badge} text-3xl transition-transform group-hover:scale-110`} aria-hidden="true">
        {emoji}
      </div>
      <div>
        <h3 className={`font-bold ${cat.title} mb-1`}>{tool.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
      </div>
    </Link>
  );
}

function Section({ title, href, tools: list, cat }: { title: string; href: string; tools: Tool[]; cat: typeof categoryStyle[keyof typeof categoryStyle] }) {
  if (list.length === 0) return null;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${cat.heading} text-white font-bold px-4 py-2`}>
          <span aria-hidden="true">{cat.emoji}</span> {title}
        </h2>
        <Link href={href} className="text-gray-500 hover:text-gray-800 font-medium">عرض الكل →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const mathTools = tools.filter((t) => t.category === "math");
  const arabicTools = tools.filter((t) => t.category === "arabic");
  const teacherTools = tools.filter((t) => t.category === "teachers");

  return (
    <PageLayout breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأدوات" }]}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">🧰 صندوق أدواتك</h1>
          <p className="text-lg text-gray-600">اختر أداة وابدأ اللعب والتعلّم — كل إجابة صحيحة تكسبك نجمة! ⭐</p>
        </div>

        <div className="space-y-12">
          <Section title="الرياضيات" href="/math" tools={mathTools} cat={categoryStyle.math} />
          <Section title="اللغة العربية" href="/arabic" tools={arabicTools} cat={categoryStyle.arabic} />
          <Section title="للمعلمين" href="/teachers" tools={teacherTools} cat={categoryStyle.teachers} />
        </div>
      </div>
    </PageLayout>
  );
}
