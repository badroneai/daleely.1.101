import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ContinueLearning from "@/components/ContinueLearning";

export default function Home() {
  return (
    <PageLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          مختبر الأدوات التعليمية
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          أدوات تفاعلية مجانية لمساعدة أطفالك في تعلم الرياضيات واللغة العربية
        </p>
        <Link href="/student" className="btn-primary inline-block">
          ابدأ الآن
        </Link>
      </div>

      <ContinueLearning />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Link href="/student" className="card text-center hover:border-primary-300 transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up">
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-xl font-bold mb-2">الطالب</h2>
          <p className="text-gray-600">اختر صفك وابدأ التعلم مع الأدوات المناسبة لك</p>
        </Link>
        
        <Link href="/math" className="card text-center hover:border-primary-300 transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="text-4xl mb-4">🔢</div>
          <h2 className="text-xl font-bold mb-2">رياضيات</h2>
          <p className="text-gray-600">جدول الضرب، الجمع، الطرح، وأكثر</p>
        </Link>
        
        <Link href="/arabic" className="card text-center hover:border-primary-300 transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-xl font-bold mb-2">عربي</h2>
          <p className="text-gray-600">الحروف، الأصوات، الحركات</p>
        </Link>
        
        <Link href="/teachers" className="card text-center hover:border-primary-300 transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="text-4xl mb-4">👩‍🏫</div>
          <h2 className="text-xl font-bold mb-2">للمعلمين</h2>
          <p className="text-gray-600">مولّد أوراق العمل والأنشطة</p>
        </Link>
        
        <Link href="/parents" className="card text-center hover:border-primary-300 transition-all duration-200 hover:scale-[1.02] transform focus-visible-ring slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
          <h2 className="text-xl font-bold mb-2">لأولياء الأمور</h2>
          <p className="text-gray-600">إرشادات ونصائح للتعلم المنزلي</p>
        </Link>
      </div>
    </PageLayout>
  );
}
