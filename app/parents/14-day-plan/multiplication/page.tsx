import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "خطة 14 يوم: تثبيت جدول الضرب",
  "خطة يومية لمدة 14 يوم لتثبيت جدول الضرب بشكل دائم. كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة",
  "parents/14-day-plan/multiplication"
);

const planDays = [
  {
    day: 1,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "تعرف على جدول 2 و 3. اضغط على كل رقم وكرره بصوت عالي.",
    questions: ["ما هو 2 × 5؟", "ما هو 3 × 4؟"],
  },
  {
    day: 2,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "راجع جدول 2 و 3. حاول حفظ 5 عمليات جديدة.",
    questions: ["ما هو 2 × 7؟", "ما هو 3 × 6؟"],
  },
  {
    day: 3,
    tool: "اختبار جدول الضرب",
    toolSlug: "multiplication-quiz",
    time: "10 دقائق",
    activity: "اختبر نفسك في جدول 2 و 3. هدفك: 8/10 صحيح.",
    questions: ["كم حصلت من 10؟", "ما هي العملية التي أخطأت فيها؟"],
  },
  {
    day: 4,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "تعرف على جدول 4 و 5. استمع للنطق وكرر.",
    questions: ["ما هو 4 × 3؟", "ما هو 5 × 6؟"],
  },
  {
    day: 5,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "راجع جدول 4 و 5. حاول حفظ 5 عمليات جديدة.",
    questions: ["ما هو 4 × 7؟", "ما هو 5 × 8؟"],
  },
  {
    day: 6,
    tool: "اختبار جدول الضرب",
    toolSlug: "multiplication-quiz",
    time: "10 دقائق",
    activity: "اختبر نفسك في جدول 2-5. هدفك: 7/10 صحيح.",
    questions: ["كم حصلت من 10؟", "ما هي الجداول التي تحتاج مراجعة؟"],
  },
  {
    day: 7,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "5 دقائق",
    activity: "مراجعة سريعة لجميع الجداول التي تعلمتها (2-5).",
    questions: ["ما هي الجداول التي تتذكرها بسهولة؟", "ما هي الجداول التي تحتاج ممارسة أكثر؟"],
  },
  {
    day: 8,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "تعرف على جدول 6 و 7. استمع وكرر.",
    questions: ["ما هو 6 × 4؟", "ما هو 7 × 3؟"],
  },
  {
    day: 9,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "راجع جدول 6 و 7. حاول حفظ 5 عمليات جديدة.",
    questions: ["ما هو 6 × 8؟", "ما هو 7 × 5؟"],
  },
  {
    day: 10,
    tool: "اختبار جدول الضرب",
    toolSlug: "multiplication-quiz",
    time: "10 دقائق",
    activity: "اختبر نفسك في جدول 6 و 7. هدفك: 8/10 صحيح.",
    questions: ["كم حصلت من 10؟", "ما هي العملية التي أخطأت فيها؟"],
  },
  {
    day: 11,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "تعرف على جدول 8 و 9. استمع وكرر.",
    questions: ["ما هو 8 × 4؟", "ما هو 9 × 3؟"],
  },
  {
    day: 12,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "راجع جدول 8 و 9. حاول حفظ 5 عمليات جديدة.",
    questions: ["ما هو 8 × 7؟", "ما هو 9 × 6؟"],
  },
  {
    day: 13,
    tool: "اختبار جدول الضرب",
    toolSlug: "multiplication-quiz",
    time: "10 دقائق",
    activity: "اختبر نفسك في جميع الجداول (2-9). هدفك: 15/20 صحيح.",
    questions: ["كم حصلت من 20؟", "ما هي الجداول التي تحتاج مراجعة؟"],
  },
  {
    day: 14,
    tool: "اختبار جدول الضرب",
    toolSlug: "multiplication-quiz",
    time: "10 دقائق",
    activity: "اختبار نهائي شامل. هدفك: 18/20 صحيح.",
    questions: ["كم حصلت من 20؟", "ما هي الجداول التي أتقنتها تماماً؟"],
  },
];

export default function Multiplication14DayPlanPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "خطة 14 يوم: تثبيت جدول الضرب" },
      ]}
    >
      <TeacherNoteTemplate
        title="خطة 14 يوم: تثبيت جدول الضرب"
        instructions="خطة يومية لمدة 14 يوم لتثبيت جدول الضرب بشكل دائم. كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة"
        content={
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية استخدام هذه الخطة</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>اتبع الخطة يومياً لمدة 14 يوم</li>
                <li>كل يوم: 5-10 دقائق فقط</li>
                <li>استخدم الأداة المحددة في كل يوم</li>
                <li>أجب على سؤالين المتابعة مع طفلك</li>
                <li>احتفل بالإنجازات الصغيرة</li>
              </ul>
            </section>

            {/* Daily Plan */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">الخطة اليومية</h2>
              <div className="space-y-6">
                {planDays.map((dayPlan) => (
                  <div
                    key={dayPlan.day}
                    className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          اليوم {dayPlan.day}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          الوقت: {dayPlan.time}
                        </p>
                      </div>
                      <Link
                        href={`/tools/${dayPlan.toolSlug}`}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        {dayPlan.tool} →
                      </Link>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-700 font-medium mb-2">النشاط:</p>
                      <p className="text-gray-700">{dayPlan.activity}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-r-2 border-yellow-400">
                      <p className="text-gray-700 font-medium mb-2">سؤالان للمتابعة:</p>
                      <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                        <li>{dayPlan.questions[0]}</li>
                        <li>{dayPlan.questions[1]}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح للنجاح</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>كن منتظماً - نفس الوقت كل يوم</li>
                <li>احتفل بالإنجازات الصغيرة</li>
                <li>لا تجبر الطفل - إذا كان متعباً، انتظر</li>
                <li>استخدم الصوت في البداية، ثم أطفئه تدريجياً</li>
                <li>راقب التقدم باستخدام لوحة المتابعة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
