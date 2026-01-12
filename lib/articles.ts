import { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "how-to-memorize-times-tables",
    title: "كيف تساعد طفلك في حفظ جدول الضرب",
    description:
      "دليل شامل لمساعدة أطفالك في حفظ جدول الضرب بطريقة فعالة وممتعة. نصائح عملية واستراتيجيات مجربة.",
    category: "math",
    publishedAt: "2024-01-15",
  },
  {
    slug: "mental-math-tips",
    title: "نصائح لتحسين الحساب الذهني",
    description:
      "اكتشف طرق فعالة لتحسين مهارات الحساب الذهني لدى أطفالك. تمارين وأنشطة عملية لتنمية القدرات العقلية.",
    category: "math",
    publishedAt: "2024-01-20",
  },
  {
    slug: "teaching-addition-subtraction",
    title: "كيفية تعليم الجمع والطرح للأطفال",
    description:
      "دليل عملي لتعليم الجمع والطرح للأطفال بطريقة سهلة وممتعة. استراتيجيات وأساليب فعالة للآباء والمعلمين.",
    category: "math",
    publishedAt: "2024-01-25",
  },
  {
    slug: "teaching-arabic-letters",
    title: "كيف تساعد طفلك في تعلم الحروف العربية",
    description:
      "دليل شامل لتعليم الحروف العربية للأطفال بطريقة فعالة وممتعة. نصائح عملية واستراتيجيات مجربة.",
    category: "arabic",
    publishedAt: "2024-02-01",
  },
  {
    slug: "arabic-reading-tips",
    title: "نصائح لتحسين مهارات القراءة العربية",
    description:
      "اكتشف طرق فعالة لتحسين مهارات القراءة العربية لدى أطفالك. تمارين وأنشطة عملية لتنمية القدرات اللغوية.",
    category: "arabic",
    publishedAt: "2024-02-05",
  },
];

export function getArticleBySlug(
  category: string,
  slug: string
): Article | undefined {
  return articles.find(
    (article) => article.category === category && article.slug === slug
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}
