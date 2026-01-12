import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "حقيبة الطباعة السريعة",
  "نوته جاهزة لحقيبة الطباعة: ملفات جاهزة للطباعة مصنفة حسب الموضوع",
  "teachers/print-ready"
);

export default function PrintReadyPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين", href: "/teachers" },
        { label: "حقيبة الطباعة السريعة" },
      ]}
    >
      <TeacherNoteTemplate
        title="حقيبة الطباعة السريعة"
        instructions="نوته جاهزة لحقيبة الطباعة - ملفات جاهزة للطباعة مصنفة حسب الموضوع"
        content={
          <div className="space-y-8">
            {/* واجب منزلي */}
            <section className="bg-gray-50 rounded-lg p-6 border-r-4 border-gray-400">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                واجب منزلي
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هو الواجب المنزلي الجيد؟</h3>
                  <ul className="text-gray-700 space-y-2 text-sm list-disc list-inside">
                    <li>يراجع ما تم تعلمه في الصف</li>
                    <li>عدد أسئلة مناسب (3-5 أسئلة) وتتغير حسب كل مرحلة</li>
                    <li>مستوى صعوبة مناسب للمرحلة</li>
                    <li>واضح ومباشر</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">نصائح لإنشاء واجب منزلي:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm list-disc list-inside">
                    <li>استخدم نفس المفاهيم التي تم تعلمها في الصف</li>
                    <li>ابدأ بأسئلة سهلة ثم انتقل للأصعب</li>
                    <li>لا تجعل الواجب طويلاً جداً</li>
                    <li>تأكد من أن الطالب يستطيع حله بمفرده</li>
                  </ul>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg border-r-2 border-primary-300">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>استخدم مولّد أوراق العمل:</strong> أنشئ واجب منزلي جاهز بسرعة
                  </p>
                  <Link
                    href="/tools/worksheet-generator?template=homework"
                    className="btn-primary inline-block text-sm"
                  >
                    أنشئ واجب منزلي →
                  </Link>
                </div>
              </div>
            </section>

            {/* مراجعة قبل اختبار */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                مراجعة قبل اختبار
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هي ورقة المراجعة الجيدة؟</h3>
                  <ul className="text-gray-700 space-y-2 text-sm list-disc list-inside">
                    <li>تغطي جميع المفاهيم المهمة</li>
                    <li>عدد أسئلة مناسب (15-20 سؤال)</li>
                    <li>مستوى صعوبة مشابه للاختبار</li>
                    <li>تشمل أمثلة متنوعة</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">نصائح لإنشاء ورقة مراجعة:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm list-disc list-inside">
                    <li>راجع جميع الدروس التي سيتم اختبارها</li>
                    <li>استخدم أنواع أسئلة مشابهة للاختبار</li>
                    <li>ابدأ بأسئلة سهلة ثم انتقل للأصعب</li>
                    <li>أعطِ وقتاً كافياً للطلاب لحلها</li>
                  </ul>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg border-r-2 border-primary-300">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>استخدم مولّد أوراق العمل:</strong> أنشئ ورقة مراجعة جاهزة بسرعة
                  </p>
                  <Link
                    href="/tools/worksheet-generator?template=review"
                    className="btn-primary inline-block text-sm"
                  >
                    أنشئ ورقة مراجعة →
                  </Link>
                </div>
              </div>
            </section>

            {/* تقويم تشخيصي */}
            <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                تقويم تشخيصي
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هو التقويم التشخيصي؟</h3>
                  <p className="text-gray-700 mb-3">
                    تقييم لمعرفة مستوى الطلاب في المهارات الأساسية. يساعدك في تحديد من يحتاج دعم ومن جاهز للتحدي.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">نصائح لإنشاء تقويم تشخيصي:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm list-disc list-inside">
                    <li>ركز على المهارات الأساسية</li>
                    <li>استخدم أسئلة واضحة ومباشرة</li>
                    <li>أرفق إجابات نموذجية لتسهيل التصحيح</li>
                    <li>راقب الوقت - لا تجعله طويلاً جداً</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">كيف تستخدم النتائج:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm list-disc list-inside">
                    <li>حدد الطلاب الذين يحتاجون دعم إضافي</li>
                    <li>حدد الطلاب الجاهزين للتحدي</li>
                    <li>خطط للدروس القادمة بناءً على النتائج</li>
                    <li>راقب التقدم بمرور الوقت</li>
                  </ul>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg border-r-2 border-primary-300">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>استخدم مولّد أوراق العمل:</strong> أنشئ تقويم تشخيصي جاهز بسرعة
                  </p>
                  <Link
                    href="/tools/worksheet-generator?template=diagnostic"
                    className="btn-primary inline-block text-sm"
                  >
                    أنشئ تقويم تشخيصي →
                  </Link>
                </div>
              </div>
            </section>

            {/* نصائح عامة */}
            <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عامة</h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>احتفظ بنسخة من كل ورقة عمل تستخدمها</li>
                <li>صنّف الأوراق حسب الموضوع والمرحلة</li>
                <li>راجع الأوراق قبل الطباعة للتأكد من صحتها</li>
                <li>استخدم ورق عالي الجودة للطباعة</li>
                <li>احتفظ بنسخة رقمية من كل ورقة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
