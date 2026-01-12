import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "خطة 14 يوم: تقوية الحساب الذهني",
  "خطة يومية لمدة 14 يوم لتقوية مهارات الحساب الذهني. كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة",
  "parents/14-day-plan/mental-math"
);

const planDays = [
  {
    day: 1,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على جمع أرقام صغيرة (1-10). ابدأ بجمع رقمين.",
    questions: ["ما هو 5 + 3؟", "ما هو 7 + 2؟"],
  },
  {
    day: 2,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على جمع أرقام أكبر (1-20). حاول حل 10 مسائل.",
    questions: ["ما هو 12 + 5؟", "ما هو 15 + 4؟"],
  },
  {
    day: 3,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على طرح أرقام صغيرة. ابدأ بطرح رقمين.",
    questions: ["ما هو 10 - 3؟", "ما هو 8 - 2؟"],
  },
  {
    day: 4,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على طرح أرقام أكبر (1-20). حاول حل 10 مسائل.",
    questions: ["ما هو 15 - 7؟", "ما هو 18 - 9؟"],
  },
  {
    day: 5,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "مراجعة: جمع وطرح مختلط. هدفك: 8/10 صحيح.",
    questions: ["كم مسألة حلتها بشكل صحيح؟", "ما هي المسألة التي أخطأت فيها؟"],
  },
  {
    day: 6,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على جمع أرقام أكبر (1-50). استخدم استراتيجيات ذهنية.",
    questions: ["ما هو 25 + 13؟", "ما هو 30 + 17؟"],
  },
  {
    day: 7,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "5 دقائق",
    activity: "مراجعة سريعة. حل 5 مسائل جمع وطرح مختلطة.",
    questions: ["ما هي المسألة الأسهل لك؟", "ما هي المسألة الأصعب لك؟"],
  },
  {
    day: 8,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على جمع أرقام أكبر (1-100). استخدم التجميع.",
    questions: ["ما هو 45 + 28؟", "ما هو 52 + 19؟"],
  },
  {
    day: 9,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "تمرن على طرح أرقام أكبر (1-100). استخدم الاستعارة.",
    questions: ["ما هو 67 - 29؟", "ما هو 84 - 36؟"],
  },
  {
    day: 10,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "مراجعة: جمع وطرح أرقام كبيرة. هدفك: 7/10 صحيح.",
    questions: ["كم مسألة حلتها بشكل صحيح؟", "ما هي الاستراتيجية التي استخدمتها؟"],
  },
  {
    day: 11,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "تعرف على جدول الضرب 2 و 3. استمع وكرر.",
    questions: ["ما هو 2 × 5؟", "ما هو 3 × 4؟"],
  },
  {
    day: 12,
    tool: "جدول الضرب التفاعلي",
    toolSlug: "multiplication-table",
    time: "10 دقائق",
    activity: "تعرف على جدول الضرب 4 و 5. استمع وكرر.",
    questions: ["ما هو 4 × 6؟", "ما هو 5 × 7؟"],
  },
  {
    day: 13,
    tool: "اختبار جدول الضرب",
    toolSlug: "multiplication-quiz",
    time: "10 دقائق",
    activity: "اختبر نفسك في جدول الضرب 2-5. هدفك: 12/15 صحيح.",
    questions: ["كم حصلت من 15؟", "ما هي الجداول التي تحتاج ممارسة أكثر؟"],
  },
  {
    day: 14,
    tool: "الجمع والطرح الذهني",
    toolSlug: "mental-math-add-sub",
    time: "10 دقائق",
    activity: "اختبار نهائي شامل: جمع وطرح وضرب مختلط. هدفك: 15/20 صحيح.",
    questions: ["كم حصلت من 20؟", "ما هي المهارة التي أتقنتها تماماً؟"],
  },
];

export default function MentalMath14DayPlanPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "خطة 14 يوم: تقوية الحساب الذهني" },
      ]}
    >
      <TeacherNoteTemplate
        title="خطة 14 يوم: تقوية الحساب الذهني"
        instructions="خطة يومية لمدة 14 يوم لتقوية مهارات الحساب الذهني. كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة"
        content={
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-purple-50 rounded-lg p-6 border-r-4 border-purple-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية استخدام هذه الخطة</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>اتبع الخطة يومياً لمدة 14 يوم</li>
                <li>كل يوم: 5-10 دقائق فقط</li>
                <li>استخدم الأداة المحددة في كل يوم</li>
                <li>أجب على سؤالين المتابعة مع طفلك</li>
                <li>شجع الطفل على التفكير الذهني قبل الكتابة</li>
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
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح للنجاح</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>شجع الطفل على التفكير الذهني - لا تعطه الحاسبة</li>
                <li>استخدم استراتيجيات بسيطة: التجميع، الاستعارة، التقسيم</li>
                <li>احتفل بكل إجابة صحيحة</li>
                <li>لا تعاقب على الأخطاء - استخدمها كفرصة للتعلم</li>
                <li>راقب التقدم باستخدام لوحة المتابعة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
