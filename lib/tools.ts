import { Tool } from "./types";

export const tools: Tool[] = [
  {
    slug: "multiplication-table",
    title: "جدول الضرب التفاعلي",
    description: "تعلم وحفظ جدول الضرب بطريقة تفاعلية ممتعة مع تمارين عملية",
    category: "math",
    gradeLevel: "3-4",
    keywords: ["جدول الضرب", "ضرب", "رياضيات", "الصف الثالث", "الصف الرابع"],
  },
  {
    slug: "multiplication-quiz",
    title: "اختبار جدول الضرب",
    description: "اختبر معرفتك بجدول الضرب مع أسئلة متنوعة وتقييم فوري",
    category: "math",
    gradeLevel: "3-4",
    keywords: ["اختبار الضرب", "امتحان الضرب", "تدريب الضرب"],
  },
  {
    slug: "mental-math-add-sub",
    title: "الجمع والطرح الذهني",
    description: "طور مهاراتك في الجمع والطرح الذهني مع تمارين تدريجية",
    category: "math",
    gradeLevel: "1-2",
    keywords: ["جمع", "طرح", "حساب ذهني", "الصف الأول", "الصف الثاني"],
  },
  {
    slug: "telling-time",
    title: "قراءة الساعة",
    description: "تعلم قراءة الساعة بالعربية والإنجليزية مع تمارين تفاعلية",
    category: "math",
    gradeLevel: "5-6",
    keywords: ["الساعة", "الوقت", "قراءة الساعة"],
  },
  {
    slug: "arabic-letters",
    title: "تعلم الحروف العربية",
    description: "تعرف على الحروف العربية مع أشكالها وأصواتها",
    category: "arabic",
    gradeLevel: "1-2",
    keywords: ["حروف عربية", "أبجدية", "تعلم الحروف"],
  },
  {
    slug: "letter-sounds",
    title: "أصوات الحروف",
    description: "تعلم أصوات الحروف العربية مع أمثلة واضحة",
    category: "arabic",
    gradeLevel: "1-2",
    keywords: ["أصوات الحروف", "نطق الحروف"],
  },
  {
    slug: "harakat",
    title: "الحركات العربية",
    description: "تعلم الفتحة والضمة والكسرة والسكون بطريقة تفاعلية",
    category: "arabic",
    gradeLevel: "3-4",
    keywords: ["الحركات", "الفتحة", "الضمة", "الكسرة"],
  },
  {
    slug: "syllables-blending",
    title: "المقاطع والدمج",
    description: "تعلم تكوين المقاطع ودمج الحروف لقراءة الكلمات",
    category: "arabic",
    gradeLevel: "3-4",
    keywords: ["مقاطع", "دمج", "قراءة"],
  },
  {
    slug: "sight-words-ar",
    title: "الكلمات البصرية العربية",
    description: "احفظ الكلمات الشائعة في اللغة العربية بسرعة",
    category: "arabic",
    gradeLevel: "5-6",
    keywords: ["كلمات بصرية", "كلمات شائعة"],
  },
  {
    slug: "worksheet-generator",
    title: "مولّد أوراق العمل",
    description: "أنشئ أوراق عمل مخصصة للرياضيات واللغة العربية",
    category: "teachers",
    gradeLevel: "all",
    keywords: ["أوراق عمل", "أنشطة", "تمارين"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getToolsByGradeLevel(gradeLevel: string): Tool[] {
  return tools.filter((tool) => tool.gradeLevel === gradeLevel || tool.gradeLevel === "all");
}
