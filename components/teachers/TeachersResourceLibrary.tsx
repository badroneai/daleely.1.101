"use client";

import Link from "next/link";

export default function TeachersResourceLibrary() {
  return (
    <div className="space-y-8">
      {/* تحضير سريع (5 دقائق) */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">⚡</div>
          <h2 className="text-2xl font-bold text-gray-900">تحضير سريع (5 دقائق)</h2>
        </div>
        <p className="text-gray-600 mb-6">
          روتين افتتاح وختام جاهز + أنشطة قصيرة يمكن تطبيقها فوراً في الصف
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-primary-50 rounded-lg p-4 border-r-4 border-primary-500">
            <h3 className="font-semibold text-gray-900 mb-2">روتين الافتتاح</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>تحية الصف (30 ثانية)</li>
              <li>سؤال اليوم السريع (دقيقة)</li>
              <li>مراجعة سريعة للدرس السابق (دقيقتان)</li>
              <li>عرض أهداف الدرس (دقيقة ونصف)</li>
            </ul>
          </div>
          <div className="bg-primary-50 rounded-lg p-4 border-r-4 border-primary-500">
            <h3 className="font-semibold text-gray-900 mb-2">روتين الختام</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>تلخيص سريع (دقيقة)</li>
              <li>سؤال ختامي (30 ثانية)</li>
              <li>بطاقة خروج (دقيقة)</li>
              <li>تذكير بالواجب (30 ثانية)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href="/teachers/quick-prep"
            className="btn-primary inline-block"
          >
            أنشئ نشاط سريع جاهز
          </Link>
        </div>
      </section>

      {/* التقويم التكويني */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">📊</div>
          <h2 className="text-2xl font-bold text-gray-900">التقويم التكويني</h2>
        </div>
        <p className="text-gray-600 mb-6">
          بطاقات خروج، أسئلة سريعة، وسلالم تقدير بسيطة لتقييم فهم الطلاب
        </p>
        <div className="mt-4">
          <Link
            href="/teachers/formative-assessment"
            className="btn-primary inline-block"
          >
            أنشئ نوته التقويم التكويني →
          </Link>
        </div>
      </section>

      {/* إدارة الصف */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">👥</div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الصف</h2>
        </div>
        <p className="text-gray-600 mb-6">
          قواعد واضحة، تعزيز إيجابي، وحلول للمواقف الشائعة في الصف
        </p>
        <div className="mt-4">
          <Link
            href="/teachers/classroom-management"
            className="btn-primary inline-block"
          >
            أنشئ نوته إدارة الصف →
          </Link>
        </div>
      </section>

      {/* التفريد */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900">التفريد</h2>
        </div>
        <p className="text-gray-600 mb-6">
          نسختان من نفس الورقة (أساسي/متقدم) + دعم للمتعثرين وإثراء للمتفوقين
        </p>
        <div className="mt-4">
          <Link
            href="/teachers/differentiation"
            className="btn-primary inline-block"
          >
            أنشئ نوته التفريد →
          </Link>
        </div>
      </section>

      {/* حقيبة الطباعة السريعة */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">📦</div>
          <h2 className="text-2xl font-bold text-gray-900">حقيبة الطباعة السريعة</h2>
        </div>
        <p className="text-gray-600 mb-6">
          ملفات جاهزة للطباعة (PDF) مصنفة حسب الموضوع والمرحلة الدراسية: واجب منزلي، مراجعة قبل اختبار، تقويم تشخيصي
        </p>
        <div className="mt-4">
          <Link
            href="/teachers/print-ready"
            className="btn-primary inline-block"
          >
            أنشئ نوته حقيبة الطباعة →
          </Link>
        </div>
      </section>
    </div>
  );
}
