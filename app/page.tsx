import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ContinueLearning from "@/components/ContinueLearning";
import Mascot from "@/components/home/Mascot";

const sections = [
  { href: "/student", emoji: "🎒", title: "اختر صفك", desc: "ابدأ التعلّم بأدوات صفك", grad: "from-orange-600 to-rose-600" },
  { href: "/math", emoji: "🔢", title: "رياضيات", desc: "ضرب، جمع، كسور وأكثر", grad: "from-sky-600 to-blue-700" },
  { href: "/arabic", emoji: "📚", title: "عربي", desc: "حروف، حركات، كلمات", grad: "from-emerald-600 to-teal-700" },
  { href: "/teachers", emoji: "👩‍🏫", title: "للمعلمين", desc: "أوراق عمل وأنشطة", grad: "from-violet-600 to-indigo-700" },
  { href: "/parents", emoji: "👨‍👩‍👧‍👦", title: "لأولياء الأمور", desc: "إرشادات للتعلّم المنزلي", grad: "from-pink-600 to-rose-700" },
];

export default function Home() {
  return (
    <PageLayout>
      <ContinueLearning />

      <Link
        href="/journey/grade5"
        className="block mb-10 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all focus-visible-ring"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl" aria-hidden="true">🗺️</span>
          <div>
            <p className="text-xl font-extrabold mb-1">ابدأ رحلة التعلّم</p>
            <p className="text-white/90 text-sm">مسار متدرّج محطة بعد محطة — مع توصية لما تتعلّمه الآن وهدف يومي ⭐</p>
          </div>
        </div>
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 px-6 py-10 sm:py-14 text-center text-white shadow-xl mb-12">
        <div aria-hidden="true" className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white/10" />
        <Mascot className="mx-auto mb-4 h-24 w-24 drop-shadow animate-float" />
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">أهلًا بك في دليلي!</h1>
        <p className="text-lg sm:text-xl text-white/95 mb-7 max-w-xl mx-auto">
          تعلّم الرياضيات والعربية باللعب — اجمع النجوم وأنت تتعلّم! 🌟
        </p>
        <Link
          href="/student"
          className="inline-block rounded-full bg-white text-indigo-700 font-bold text-lg px-8 py-4 shadow-lg hover:scale-105 active:scale-95 transition-transform focus-visible-ring"
        >
          ابدأ اللعب والتعلّم 🚀
        </Link>
      </section>

      {/* Sections */}
      <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">اختر ركنك</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sections.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            className={`group rounded-3xl bg-gradient-to-br ${s.grad} p-5 sm:p-6 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all focus-visible-ring slide-up`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="text-4xl sm:text-5xl mb-3 transition-transform group-hover:scale-110">{s.emoji}</div>
            <h3 className="text-lg sm:text-xl font-extrabold mb-1">{s.title}</h3>
            <p className="text-white text-sm">{s.desc}</p>
          </Link>
        ))}
      </div>

      {/* Trust strip */}
      <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
        <span>✓ مجاني بالكامل</span>
        <span>✓ بدون تسجيل</span>
        <span>✓ آمن للأطفال</span>
        <span>✓ يعمل على الجوال والآيباد</span>
      </div>
    </PageLayout>
  );
}
