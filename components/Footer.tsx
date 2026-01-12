import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2024 Daleely.ai - جميع الحقوق محفوظة</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              الخصوصية
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              الشروط
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
