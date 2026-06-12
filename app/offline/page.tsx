import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Mascot from "@/components/home/Mascot";

export const metadata = {
  title: "غير متصل - Daleely.ai",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <PageLayout>
      <div className="text-center py-16">
        <Mascot className="mx-auto h-24 w-24 mb-4 opacity-80" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">أنت غير متصل بالإنترنت</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          تأكّد من اتصالك ثم حاول مجددًا. بعض الصفحات التي زرتها من قبل قد تعمل بدون اتصال.
        </p>
        <Link href="/" className="btn-primary focus-visible-ring">المحاولة مرة أخرى</Link>
      </div>
    </PageLayout>
  );
}
