import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "التقويم التكويني",
  "نوته جاهزة للتقويم التكويني: بطاقات خروج، أسئلة سريعة، وسلالم تقدير",
  "teachers/formative-assessment"
);

export default function FormativeAssessmentPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين", href: "/teachers" },
        { label: "التقويم التكويني" },
      ]}
    >
      <TeacherNoteTemplate
        title="التقويم التكويني"
        instructions="نوته جاهزة للتقويم التكويني - استخدمها لقياس فهم الطلاب أثناء التعلم"
        content={
          <div className="space-y-8">
            {/* بطاقات الخروج */}
            <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                بطاقات الخروج (Exit Tickets)
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هي بطاقات الخروج؟</h3>
                  <p className="text-gray-700 mb-3">
                    سؤال واحد أو سؤالين قصيرين في نهاية الدرس. يستغرق 1-2 دقيقة فقط، ويساعدك في معرفة من فهم الدرس ومن يحتاج دعم إضافي.
                  </p>
                  <div className="bg-gray-50 p-3 rounded mt-3">
                    <p className="text-sm text-gray-700"><strong>متى تستخدمها:</strong> في آخر 2 دقيقة من الدرس</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">خطوات الاستخدام:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                    <li>وزّع بطاقات خروج في آخر 2 دقيقة</li>
                    <li>اطلب من الطلاب الإجابة على سؤال واحد</li>
                    <li>اجمع البطاقات عند الخروج</li>
                    <li>راجعها بسرعة (30 ثانية لكل بطاقة)</li>
                    <li>استخدم النتائج لتخطيط الدرس التالي</li>
                  </ol>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">أمثلة على الأسئلة:</h3>
                  <ul className="text-gray-700 space-y-2 text-sm list-disc list-inside">
                    <li>للرياضيات: &quot;ما هو ناتج 7 × 8؟&quot;</li>
                    <li>للغة العربية: &quot;ما هي الحركة على الحرف ب في كلمة &apos;باب&apos;؟&quot;</li>
                    <li>سؤال فهم: &quot;اشرح بجملة واحدة ما تعلمته اليوم&quot;</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* أسئلة سريعة */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                أسئلة سريعة للتقويم التكويني
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هو التقويم التكويني؟</h3>
                  <p className="text-gray-700 mb-3">
                    قياس فهم الطلاب أثناء التعلم، وليس في النهاية. يساعدك في تعديل طريقة الشرح فوراً بناءً على فهم الطلاب.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">خطوات سريعة:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                    <li>في منتصف الدرس، اطرح سؤالاً سريعاً</li>
                    <li>اطلب من الطلاب الإجابة (شفهياً أو كتابياً)</li>
                    <li>راقب الإجابات</li>
                    <li>إذا كان معظم الطلاب فهموا، استمر</li>
                    <li>إذا كان هناك صعوبة، كرر الشرح بطريقة مختلفة</li>
                  </ol>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">أمثلة على الأسئلة:</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">للرياضيات:</p>
                      <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                        <li>&quot;ما هو ناتج 5 + 7؟&quot;</li>
                        <li>&quot;كم مرة 4 في 20؟&quot;</li>
                        <li>&quot;ما هو العدد الأكبر: 15 أم 23؟&quot;</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">للغة العربية:</p>
                      <ul className="text-gray-700 text-xs space-y-1 list-disc list-inside">
                        <li>&quot;ما اسم الحرف &apos;ب&apos;؟&quot;</li>
                        <li>&quot;ما معنى كلمة &apos;مدرسة&apos;؟&quot;</li>
                        <li>&quot;ما هي الحركة على الحرف في &apos;بَ&apos;؟&quot;</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* سلالم التقدير */}
            <section className="bg-purple-50 rounded-lg p-6 border-r-4 border-purple-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                سلالم التقدير البسيطة
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ما هي سلالم التقدير؟</h3>
                  <p className="text-gray-700 mb-3">
                    أدوات بسيطة لتقييم الأداء والفهم. تساعدك في تقييم الطلاب بشكل موضوعي وواضح.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">مثال على سلم تقدير بسيط:</h3>
                  <div className="bg-gray-50 p-4 rounded mt-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">ممتاز (4 نقاط):</span>
                        <span className="text-gray-700">يفهم تماماً ويطبق بشكل صحيح</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">جيد جداً (3 نقاط):</span>
                        <span className="text-gray-700">يفهم معظم المفاهيم</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">جيد (2 نقطة):</span>
                        <span className="text-gray-700">يفهم بعض المفاهيم</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">يحتاج تحسين (1 نقطة):</span>
                        <span className="text-gray-700">يحتاج دعم إضافي</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* نصائح */}
            <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح للنجاح</h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>استخدم التقويم التكويني بانتظام (ليس فقط في نهاية الدرس)</li>
                <li>كن سريعاً في المراجعة - لا تحتاج تحليل عميق</li>
                <li>استخدم النتائج فوراً لتعديل طريقة الشرح</li>
                <li>لا تستخدم التقويم التكويني كدرجة نهائية</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
