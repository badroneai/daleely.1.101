"use client";

import Link from "next/link";

export default function ParentsResourceLibrary() {
  return (
    <div className="space-y-8">
      {/* خطة 14 يوم */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">📅</div>
          <h2 className="text-2xl font-bold text-gray-900">خطة 14 يوم جاهزة</h2>
        </div>
        <p className="text-gray-600 mb-6">
          خطط جاهزة لمدة 14 يوم لتحقيق أهداف تعليمية محددة. كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/parents/14-day-plan/multiplication"
            className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">🔢</div>
            <h3 className="font-semibold text-gray-900 mb-2">تثبيت جدول الضرب</h3>
            <p className="text-sm text-gray-700 mb-3">
              خطة يومية لمدة 14 يوم لتثبيت جدول الضرب بشكل دائم
            </p>
            <span className="text-blue-700 hover:text-blue-800 font-medium text-sm">
              ابدأ الخطة →
            </span>
          </Link>
          <Link
            href="/parents/14-day-plan/arabic-reading"
            className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">تحسين القراءة العربية</h3>
            <p className="text-sm text-gray-700 mb-3">
              خطة يومية لمدة 14 يوم لتحسين القراءة (حروف/حركات/مقاطع)
            </p>
            <span className="text-green-700 hover:text-green-800 font-medium text-sm">
              ابدأ الخطة →
            </span>
          </Link>
          <Link
            href="/parents/14-day-plan/mental-math"
            className="bg-purple-50 rounded-lg p-6 border-r-4 border-purple-500 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">🧮</div>
            <h3 className="font-semibold text-gray-900 mb-2">تقوية الحساب الذهني</h3>
            <p className="text-sm text-gray-700 mb-3">
              خطة يومية لمدة 14 يوم لتقوية مهارات الحساب الذهني
            </p>
            <span className="text-purple-700 hover:text-purple-800 font-medium text-sm">
              ابدأ الخطة →
            </span>
          </Link>
        </div>
      </section>

      {/* دليل اختيار الأداة */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900">دليل اختيار الأداة</h2>
        </div>
        <p className="text-gray-600 mb-6">
          اختر الأداة المناسبة لطفلك بناءً على عمره، مستواه، هدفه، والوقت المتاح
        </p>
        <div className="mt-4">
          <Link
            href="/parents/tool-selector"
            className="btn-primary inline-block"
          >
            ابدأ اختيار الأداة →
          </Link>
        </div>
      </section>

      {/* لوحة متابعة منزلية */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">📊</div>
          <h2 className="text-2xl font-bold text-gray-900">لوحة متابعة منزلية</h2>
        </div>
        <p className="text-gray-600 mb-6">
          صفحات جاهزة للطباعة لتتبع التقدم وتحويل الاستخدام إلى روتين منزلي
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/parents/tracking/weekly-points"
            className="bg-yellow-50 rounded-lg p-4 border-r-4 border-yellow-500 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-semibold text-gray-900 mb-1">جدول نقاط أسبوعي</h3>
            <p className="text-sm text-gray-600">تتبع النقاط والإنجازات أسبوعياً</p>
          </Link>
          <Link
            href="/parents/tracking/daily-habit"
            className="bg-pink-50 rounded-lg p-4 border-r-4 border-pink-500 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900 mb-1">تتبع عادة 10 دقائق</h3>
            <p className="text-sm text-gray-600">سجل يومي لعادة 10 دقائق يومياً</p>
          </Link>
          <Link
            href="/parents/tracking/common-mistakes"
            className="bg-orange-50 rounded-lg p-4 border-r-4 border-orange-500 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-900 mb-1">سجل الأخطاء الشائعة</h3>
            <p className="text-sm text-gray-600">تتبع الأخطاء في الرياضيات والعربية</p>
          </Link>
        </div>
      </section>

      {/* مكتبة مشاكل شائعة */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">💡</div>
          <h2 className="text-2xl font-bold text-gray-900">مشاكل شائعة وحلولها</h2>
        </div>
        <p className="text-gray-600 mb-6">
          حلول عملية للمشاكل الشائعة التي يواجهها الأهل مع أطفالهم في التعلم
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/parents/common-problems/child-gets-bored"
            className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">طفلي يمل بسرعة</h3>
            <p className="text-sm text-gray-600">ماذا أفعل؟</p>
          </Link>
          <Link
            href="/parents/common-problems/refuses-letters"
            className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">يرفض الحروف/الحركات</h3>
            <p className="text-sm text-gray-600">كيف أتعامل معه؟</p>
          </Link>
          <Link
            href="/parents/common-problems/forgets-multiplication"
            className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">يحفظ ثم ينسى جدول الضرب</h3>
            <p className="text-sm text-gray-600">ما الحل؟</p>
          </Link>
          <Link
            href="/parents/common-problems/test-anxiety"
            className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">يتوتر من الاختبار</h3>
            <p className="text-sm text-gray-600">كيف أساعده؟</p>
          </Link>
          <Link
            href="/parents/common-problems/understanding-vs-memorization"
            className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">الفهم vs الحفظ</h3>
            <p className="text-sm text-gray-600">ما الفرق في البيت؟</p>
          </Link>
        </div>
      </section>

      {/* قواعد استخدام الأجهزة */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">📱</div>
          <h2 className="text-2xl font-bold text-gray-900">قواعد استخدام الأجهزة</h2>
        </div>
        <p className="text-gray-600 mb-6">
          إرشادات لاستخدام الأجهزة بشكل متوازن بين التعلم والترفيه
        </p>
        <div className="mt-4">
          <Link
            href="/parents/device-rules"
            className="btn-primary inline-block"
          >
            اقرأ القواعد →
          </Link>
        </div>
      </section>
    </div>
  );
}
