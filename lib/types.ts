export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers";
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  keywords: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers" | "parents";
  publishedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
