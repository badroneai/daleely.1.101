import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مختبر الأدوات التعليمية - Daleely.ai",
  description: "أدوات تعليمية تفاعلية مجانية للأطفال من 6-12 سنة في الرياضيات واللغة العربية",
  metadataBase: new URL("https://daleely.ai"),
  openGraph: {
    title: "مختبر الأدوات التعليمية - Daleely.ai",
    description: "أدوات تعليمية تفاعلية مجانية للأطفال من 6-12 سنة",
    type: "website",
    locale: "ar_SA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body>{children}</body>
    </html>
  );
}
