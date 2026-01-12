import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "قواعد استخدام الأجهزة",
  "إرشادات لاستخدام الأجهزة بشكل متوازن بين التعلم والترفيه. قواعد واضحة لخلق روتين صحي",
  "parents/device-rules"
);

export default function DeviceRulesPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "قواعد استخدام الأجهزة" },
      ]}
    >
      <TeacherNoteTemplate
        title="قواعد استخدام الأجهزة"
        instructions="إرشادات لاستخدام الأجهزة بشكل متوازن بين التعلم والترفيه - اطبعها وعلقها في البيت"
        content={
          <div className="space-y-8">
            {/* Balance */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                كيف توازن بين التعلم والشاشة؟
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">1. حدد الوقت</h3>
                  <p className="text-gray-700 mb-2">
                    حدد وقتاً محدداً للتعلم (مثلاً: 10 دقائق يومياً). بعد انتهاء الوقت، أغلق الجهاز.
                  </p>
                  <div className="bg-gray-50 p-3 rounded mt-2">
                    <p className="text-sm text-gray-700"><strong>مثال:</strong> 10 دقائق تعلم + 20 دقيقة لعب = 30 دقيقة إجمالي</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">2. التعلم أولاً</h3>
                  <p className="text-gray-700 mb-2">
                    اجعل التعلم قبل الترفيه. &quot;بعد 10 دقائق من التعلم، يمكنك اللعب&quot;
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">3. استخدم مؤقت</h3>
                  <p className="text-gray-700 mb-2">
                    استخدم مؤقت أو منبه لتنبيه الطفل عند انتهاء وقت التعلم.
                  </p>
                </div>
              </div>
            </section>

            {/* Session Settings */}
            <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                إعدادات الجلسة
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">1. جلسة قصيرة</h3>
                  <p className="text-gray-700 mb-2">
                    جلسات قصيرة (5-10 دقائق) أفضل من جلسة طويلة واحدة. المهم هو الانتظام.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">2. الصوت / بدون صوت</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>مع الصوت:</strong> في البداية لمساعدة الطفل في التعلم<br />
                    <strong>بدون صوت:</strong> بعد إتقان المهارة لتعزيز الاستقلالية
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">3. إيقاف التنبيهات</h3>
                  <p className="text-gray-700 mb-2">
                    أوقف جميع التنبيهات والرسائل أثناء جلسة التعلم لتجنب التشتت.
                  </p>
                  <div className="bg-gray-50 p-3 rounded mt-2">
                    <p className="text-sm text-gray-700"><strong>نصيحة:</strong> استخدم وضع &quot;عدم الإزعاج&quot; على الجهاز</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                مكان الجلسة في البيت (روتين ثابت)
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">اختر مكاناً ثابتاً</h3>
                  <p className="text-gray-700 mb-2">
                    اختر مكاناً ثابتاً في البيت للتعلم (مثلاً: طاولة المطبخ، مكتب في غرفة الطفل).
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside mt-2">
                    <li>مكان هادئ بدون إزعاج</li>
                    <li>إضاءة جيدة</li>
                    <li>مكان مريح للجلوس</li>
                    <li>نفس المكان كل يوم لخلق روتين</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">لا تستخدم السرير</h3>
                  <p className="text-gray-700 mb-2">
                    لا تجعل الطفل يستخدم الجهاز في السرير - السرير للنوم فقط.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">لا تستخدم أثناء الأكل</h3>
                  <p className="text-gray-700 mb-2">
                    لا تجعل الطفل يستخدم الجهاز أثناء الأكل - الأكل للطعام فقط.
                  </p>
                </div>
              </div>
            </section>

            {/* Rules Summary */}
            <section className="bg-purple-50 rounded-lg p-6 border-r-4 border-purple-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">قواعد سريعة</h2>
              <div className="bg-white p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>10 دقائق تعلم يومياً (أو حسب ما يناسبك)</li>
                  <li>نفس الوقت كل يوم (مثلاً: بعد العشاء)</li>
                  <li>نفس المكان كل يوم</li>
                  <li>إيقاف التنبيهات أثناء الجلسة</li>
                  <li>الصوت في البداية، ثم أطفئه تدريجياً</li>
                  <li>لا تستخدم في السرير أو أثناء الأكل</li>
                  <li>التعلم أولاً، ثم الترفيه</li>
                </ul>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-pink-50 rounded-lg p-6 border-r-4 border-pink-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح مهمة</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>كن متسقاً - نفس القواعد كل يوم</li>
                <li>اشرح القواعد للطفل بوضوح</li>
                <li>كن مرناً - يمكن تعديل القواعد حسب الحاجة</li>
                <li>احتفل بالالتزام بالقواعد</li>
                <li>تذكر: الهدف هو التعلم، وليس قضاء الوقت على الشاشة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
