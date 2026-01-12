import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Daleely.ai
          </Link>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link 
              href="/tools" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2 min-h-[44px] flex items-center"
            >
              أدوات
            </Link>
            <Link 
              href="/math" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2 min-h-[44px] flex items-center"
            >
              رياضيات
            </Link>
            <Link 
              href="/arabic" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2 min-h-[44px] flex items-center"
            >
              عربي
            </Link>
            <Link 
              href="/teachers" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2 min-h-[44px] flex items-center"
            >
              للمعلمين
            </Link>
            <Link 
              href="/parents" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2 min-h-[44px] flex items-center"
            >
              لأولياء الأمور
            </Link>
            <Link 
              href="/articles" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-2 min-h-[44px] flex items-center"
            >
              مقالات
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
