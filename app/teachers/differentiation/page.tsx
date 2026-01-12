import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "التفريد",
  "نوته جاهزة للتفريد: نسختان من نفس الورقة (أساسي/متقدم) + دعم للمتعثرين وإثراء للمتفوقين",
  "teachers/differentiation"
);

export default function DifferentiationPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين", href: "/teachers" },
        { label: "التفريد" },
      ]}
    >
      <TeacherNoteTemplate
        title="التفريد"
        instructions="نوته جاهزة للتفريد - أنشئ نسختين من نفس الورقة (أساسي/متقدم) + دعم وإثراء"
        content={
          <div className="space-y-8">
            {/* نسختان من نفس الورقة */}
            <section className="bg-indigo-50 rounded-lg p-6 border-r-4 border-indigo-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                نسختان من نفس الورقة (أساسي/متقدم)
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هو التفريد؟</h3>
                  <p className="text-gray-700 mb-3">
                    توفير نفس المحتوى بمستويات مختلفة من الصعوبة. كل طالب يحصل على ما يناسبه.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">خطوات سريعة:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                    <li>أنشئ ورقة العمل الأساسية (للمستوى العادي)</li>
                    <li>أنشئ نسخة متقدمة (أرقام أكبر، أسئلة أصعب)</li>
                    <li>وزّع النسخ حسب مستوى كل طالب</li>
                    <li>راقب التقدم وعدّل حسب الحاجة</li>
                  </ol>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">مثال عملي:</h3>
                  <div className="bg-gray-50 p-4 rounded mt-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-2">النسخة الأساسية:</p>
                        <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                          <li>5 + 3 = ؟</li>
                          <li>7 - 2 = ؟</li>
                          <li>4 × 2 = ؟</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-2">النسخة المتقدمة:</p>
                        <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                          <li>25 + 37 = ؟</li>
                          <li>48 - 19 = ؟</li>
                          <li>7 × 13 = ؟</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* دعم المتعثرين */}
            <section className="bg-teal-50 rounded-lg p-6 border-r-4 border-teal-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                دعم المتعثرين
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">خطة قصيرة لدعم المتعثرين:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                    <li>حدد المهارة التي يواجه الطالب صعوبة فيها</li>
                    <li>ارجع للمستوى الأبسط من هذه المهارة</li>
                    <li>أنشئ ورقة عمل بسيطة (5-10 أسئلة)</li>
                    <li>أرفق إجابات نموذجية لمساعدة الطالب</li>
                    <li>راقب التقدم وعدّل حسب الحاجة</li>
                  </ol>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">استراتيجيات الدعم:</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">التبسيط:</p>
                      <p className="text-gray-700 text-xs">استخدم أرقاماً أصغر أو كلمات أبسط</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">التكرار:</p>
                      <p className="text-gray-700 text-xs">كرر نفس المفهوم بطرق مختلفة</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">التمثيل البصري:</p>
                      <p className="text-gray-700 text-xs">استخدم رسومات وأشكال لتوضيح المفهوم</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">الإجابات النموذجية:</p>
                      <p className="text-gray-700 text-xs">أرفق إجابات نموذجية لمساعدة الطالب</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">مثال عملي:</h3>
                  <div className="bg-gray-50 p-4 rounded mt-3">
                    <p className="text-sm text-gray-700 mb-2"><strong>المشكلة:</strong> طالب يواجه صعوبة في جدول الضرب 7</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>الحل:</strong></p>
                    <ol className="text-gray-700 text-xs space-y-1 list-decimal list-inside">
                      <li>ارجع لجدول الضرب 2 و 3 (أسهل)</li>
                      <li>أنشئ ورقة تدريب بسيطة (5 أسئلة)</li>
                      <li>بعد إتقانها، انتقل تدريجياً لجدول 7</li>
                      <li>استخدم ورقة دعم مع إجابات نموذجية</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* إثراء للمتفوقين */}
            <section className="bg-amber-50 rounded-lg p-6 border-r-4 border-amber-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                إثراء للمتفوقين
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">خطة قصيرة للإثراء:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                    <li>حدد الطلاب المتفوقين في المهارة</li>
                    <li>أنشئ ورقة إثراء بمستوى أعلى</li>
                    <li>استخدم أرقاماً أكبر أو مفاهيم متقدمة</li>
                    <li>أضف أسئلة تحتاج تفكير وتحليل</li>
                    <li>راقب التقدم وقدم تحديات جديدة</li>
                  </ol>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">استراتيجيات الإثراء:</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">زيادة الصعوبة:</p>
                      <p className="text-gray-700 text-xs">استخدم أرقاماً أكبر أو كلمات أصعب</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">التفكير النقدي:</p>
                      <p className="text-gray-700 text-xs">أسئلة تحتاج تفكير وتحليل</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">التطبيق العملي:</p>
                      <p className="text-gray-700 text-xs">ربط المهارة بمواقف حقيقية</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">الإبداع:</p>
                      <p className="text-gray-700 text-xs">اطلب من الطلاب إنشاء أمثلة جديدة</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">مثال عملي:</h3>
                  <div className="bg-gray-50 p-4 rounded mt-3">
                    <p className="text-sm text-gray-700 mb-2"><strong>الموقف:</strong> طالب متقن جدول الضرب 2-10</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>الإثراء:</strong></p>
                    <ol className="text-gray-700 text-xs space-y-1 list-decimal list-inside">
                      <li>أنشئ ورقة بجدول الضرب 11 و 12</li>
                      <li>أضف أسئلة تحتاج تفكير (مثل: &quot;ما هو ناتج 7 × 13؟&quot;)</li>
                      <li>اطلب من الطالب حل مسائل كلامية</li>
                      <li>شجعه على إنشاء مسائل جديدة</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* نصائح */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح للنجاح</h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>راقب مستوى كل طالب بانتظام</li>
                <li>عدّل المستوى حسب التقدم</li>
                <li>لا تخجل من إرجاع طالب لمستوى أبسط إذا احتاج</li>
                <li>احتفل بالنجاحات في جميع المستويات</li>
                <li>تذكر: الهدف هو التعلم، وليس المنافسة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
