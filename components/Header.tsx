import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200 focus-visible-ring rounded"
          >
            Daleely.ai
          </Link>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link 
              href="/tools" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 px-2 py-2 min-h-[44px] flex items-center rounded-md hover:bg-primary-50 focus-visible-ring"
            >
              أدوات
            </Link>
            <Link 
              href="/math" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 px-2 py-2 min-h-[44px] flex items-center rounded-md hover:bg-primary-50 focus-visible-ring"
            >
              رياضيات
            </Link>
            <Link 
              href="/arabic" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 px-2 py-2 min-h-[44px] flex items-center rounded-md hover:bg-primary-50 focus-visible-ring"
            >
              عربي
            </Link>
            <Link 
              href="/teachers" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 px-2 py-2 min-h-[44px] flex items-center rounded-md hover:bg-primary-50 focus-visible-ring"
            >
              للمعلمين
            </Link>
            <Link 
              href="/parents" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 px-2 py-2 min-h-[44px] flex items-center rounded-md hover:bg-primary-50 focus-visible-ring"
            >
              لأولياء الأمور
            </Link>
            <Link 
              href="/articles" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 px-2 py-2 min-h-[44px] flex items-center rounded-md hover:bg-primary-50 focus-visible-ring"
            >
              مقالات
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
