import type { MetadataRoute } from "next";

// Web app manifest — makes daleely installable on a phone / iPad home screen and
// launchable full-screen like a native app. Next injects the manifest link, and
// app/icon.png + app/apple-icon.png are served automatically.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دليلي - مختبر الأدوات التعليمية",
    short_name: "دليلي",
    description:
      "أدوات تعليمية تفاعلية مجانية للأطفال من 6-12 سنة في الرياضيات واللغة العربية",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    lang: "ar",
    dir: "rtl",
    categories: ["education", "kids"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
