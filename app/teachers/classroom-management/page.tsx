import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "إدارة الصف",
  "نوته جاهزة لإدارة الصف: قواعد واضحة، تعزيز إيجابي، وحلول للمواقف الشائعة",
  "teachers/classroom-management"
);

export default function ClassroomManagementPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين", href: "/teachers" },
        { label: "إدارة الصف" },
      ]}
    >
      <TeacherNoteTemplate
        title="إدارة الصف"
        instructions="نوته جاهزة لإدارة الصف - قواعد وتعزيز وحلول للمواقف الشائعة"
        content={
          <div className="space-y-8">
            {/* قواعد الصف */}
            <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                قواعد الصف الواضحة
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">مبادئ القواعد الجيدة:</h3>
                  <ul className="text-gray-700 space-y-2 text-sm list-disc list-inside">
                    <li>قواعد واضحة وبسيطة (3-5 قواعد فقط)</li>
                    <li>مكتوبة بشكل إيجابي (ما نفعله، وليس ما لا نفعله)</li>
                    <li>معروضة بشكل واضح في الصف</li>
                    <li>يتم مراجعتها بانتظام</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">مثال على قواعد صف جيدة:</h3>
                  <div className="bg-gray-50 p-4 rounded mt-3">
                    <ol className="space-y-2 text-gray-700 text-sm">
                      <li><strong>نحترم بعضنا البعض:</strong> نستمع عندما يتحدث الآخرون</li>
                      <li><strong>نرفع أيدينا:</strong> عندما نريد التحدث</li>
                      <li><strong>نحافظ على نظافة الصف:</strong> نضع الأشياء في مكانها</li>
                      <li><strong>نحاول بجد:</strong> حتى لو كان الأمر صعباً</li>
                      <li><strong>نستمتع بالتعلم:</strong> معاً كفريق واحد</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* التعزيز الإيجابي */}
            <section className="bg-pink-50 rounded-lg p-6 border-r-4 border-pink-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                التعزيز الإيجابي
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هو التعزيز الإيجابي؟</h3>
                  <p className="text-gray-700 mb-3">
                    مكافأة السلوك الجيد لتعزيزه وتكراره. أكثر فعالية من العقاب في بناء عادات إيجابية.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">استراتيجيات فعالة:</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">مكافآت فورية:</p>
                      <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                        <li>كلمات إيجابية: &quot;ممتاز!&quot;، &quot;رائع!&quot;</li>
                        <li>إيماءات: إبهام للأعلى، ابتسامة</li>
                        <li>ملصقات أو نقاط</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">مكافآت جماعية:</p>
                      <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                        <li>وقت إضافي للعب</li>
                        <li>قصة إضافية</li>
                        <li>نشاط ممتع</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">نصائح مهمة:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm list-disc list-inside">
                    <li>كن محدداً: &quot;أحببت كيف ساعدت زميلك&quot; أفضل من &quot;عمل جيد&quot;</li>
                    <li>كن صادقاً: الأطفال يلاحظون المديح المزيف</li>
                    <li>ركز على الجهد وليس فقط النتيجة</li>
                    <li>كافئ السلوك الجيد فوراً</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* حلول مواقف شائعة */}
            <section className="bg-orange-50 rounded-lg p-6 border-r-4 border-orange-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                حلول للمواقف الشائعة
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">الطالب المشاغب:</h3>
                  <div className="bg-gray-50 p-3 rounded mt-2">
                    <p className="text-sm text-gray-700 mb-2"><strong>الحل:</strong></p>
                    <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                      <li>تجاهل السلوك البسيط (إذا كان يبحث عن الاهتمام)</li>
                      <li>إعطاء تحذير واضح وهادئ</li>
                      <li>إعطاء خيارات: &quot;يمكنك الجلوس بهدوء أو الجلوس في مكان آخر&quot;</li>
                      <li>إذا استمر، إخراجه مؤقتاً من النشاط</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">الطالب الخجول:</h3>
                  <div className="bg-gray-50 p-3 rounded mt-2">
                    <p className="text-sm text-gray-700 mb-2"><strong>الحل:</strong></p>
                    <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                      <li>لا تجبره على التحدث أمام الجميع</li>
                      <li>ابدأ بأسئلة سهلة في مجموعات صغيرة</li>
                      <li>امدحه عندما يتحدث (حتى لو كان صغيراً)</li>
                      <li>أعطه وقتاً للتفكير قبل الإجابة</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">الطلاب المتحدثون كثيراً:</h3>
                  <div className="bg-gray-50 p-3 rounded mt-2">
                    <p className="text-sm text-gray-700 mb-2"><strong>الحل:</strong></p>
                    <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                      <li>ضع قاعدة: &quot;نرفع أيدينا قبل التحدث&quot;</li>
                      <li>استخدم بطاقات: كل طالب لديه 3 بطاقات، يستخدم واحدة عند التحدث</li>
                      <li>امدح الطلاب الذين ينتظرون دورهم</li>
                      <li>أعطِ وقتاً محدداً لكل متحدث</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">عدم الاهتمام:</h3>
                  <div className="bg-gray-50 p-3 rounded mt-2">
                    <p className="text-sm text-gray-700 mb-2"><strong>الحل:</strong></p>
                    <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                      <li>غيّر طريقة الشرح: استخدم أنشطة تفاعلية</li>
                      <li>ربط الدرس بحياة الطلاب اليومية</li>
                      <li>استخدم قصص وأمثلة ممتعة</li>
                      <li>أعطِ فرصاً للحركة والنشاط</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* نصائح عامة */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح عامة</h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>كن متسقاً: نفس القواعد كل يوم</li>
                <li>كن عادلاً: نفس القواعد للجميع</li>
                <li>كن صبوراً: بناء عادات جيدة يحتاج وقت</li>
                <li>احتفل بالنجاحات الصغيرة</li>
                <li>تعلم من الأخطاء: كل يوم فرصة جديدة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
