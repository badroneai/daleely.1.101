import type { Metadata } from "next";

export function generateToolMetadata(
  title: string,
  description: string,
  slug: string
): Metadata {
  return {
    title: `${title} - Daleely.ai`,
    description,
    alternates: {
      canonical: `https://daleely.ai/tools/${slug}`,
    },
    openGraph: {
      title: `${title} - Daleely.ai`,
      description,
      type: "website",
      url: `https://daleely.ai/tools/${slug}`,
      locale: "ar_SA",
    },
    keywords: [title, description, "أدوات تعليمية", "تعليم الأطفال"],
  };
}

export function generatePillarMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title: `${title} - Daleely.ai`,
    description,
    alternates: {
      canonical: `https://daleely.ai/${path}`,
    },
    openGraph: {
      title: `${title} - Daleely.ai`,
      description,
      type: "website",
      url: `https://daleely.ai/${path}`,
      locale: "ar_SA",
    },
  };
}
