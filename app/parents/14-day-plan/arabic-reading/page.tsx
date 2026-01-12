import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePillarMetadata(
  "خطة 14 يوم: تحسين القراءة العربية",
  "خطة يومية لمدة 14 يوم لتحسين القراءة العربية (حروف/حركات/مقاطع). كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة",
  "parents/14-day-plan/arabic-reading"
);

const planDays = [
  {
    day: 1,
    tool: "تعلم الحروف العربية",
    toolSlug: "arabic-letters",
    time: "10 دقائق",
    activity: "تعرف على 5 حروف جديدة. اضغط على كل حرف واستمع لاسمه.",
    questions: ["ما هي الحروف التي تعلمتها اليوم؟", "ما هو اسم الحرف 'ب'؟"],
  },
  {
    day: 2,
    tool: "تعلم الحروف العربية",
    toolSlug: "arabic-letters",
    time: "10 دقائق",
    activity: "راجع الحروف التي تعلمتها أمس. تعلم 5 حروف جديدة.",
    questions: ["كم حرفاً تعرف الآن؟", "ما هو اسم الحرف 'ج'؟"],
  },
  {
    day: 3,
    tool: "أصوات الحروف",
    toolSlug: "letter-sounds",
    time: "10 دقائق",
    activity: "تعلم أصوات 5 حروف. استمع وكرر الصوت.",
    questions: ["ما هو صوت الحرف 'ب'؟", "ما هو صوت الحرف 'ت'؟"],
  },
  {
    day: 4,
    tool: "أصوات الحروف",
    toolSlug: "letter-sounds",
    time: "10 دقائق",
    activity: "راجع أصوات الحروف. تعلم أصوات 5 حروف جديدة.",
    questions: ["ما هو صوت الحرف 'ج'؟", "ما هو صوت الحرف 'ح'؟"],
  },
  {
    day: 5,
    tool: "تعلم الحروف العربية",
    toolSlug: "arabic-letters",
    time: "10 دقائق",
    activity: "مراجعة شاملة لجميع الحروف التي تعلمتها. حاول تسمية 10 حروف.",
    questions: ["كم حرفاً تتذكر الآن؟", "ما هي الحروف التي تحتاج ممارسة أكثر؟"],
  },
  {
    day: 6,
    tool: "الحركات العربية",
    toolSlug: "harakat",
    time: "10 دقائق",
    activity: "تعرف على الحركات: الفتحة والضمة والكسرة. استمع وكرر.",
    questions: ["ما هي الحركة على 'بَ'؟", "ما هي الحركة على 'بُ'؟"],
  },
  {
    day: 7,
    tool: "الحركات العربية",
    toolSlug: "harakat",
    time: "5 دقائق",
    activity: "مراجعة سريعة للحركات. حاول قراءة 5 كلمات بسيطة.",
    questions: ["ما هي الحركة على 'بِ'؟", "ما هي الحركة على 'بْ'؟"],
  },
  {
    day: 8,
    tool: "الحركات العربية",
    toolSlug: "harakat",
    time: "10 دقائق",
    activity: "تمرن على قراءة كلمات بسيطة مع الحركات. هدفك: 8/10 صحيح.",
    questions: ["كم كلمة قرأت بشكل صحيح؟", "ما هي الكلمة التي أخطأت فيها؟"],
  },
  {
    day: 9,
    tool: "المقاطع والدمج",
    toolSlug: "syllables-blending",
    time: "10 دقائق",
    activity: "تعلم تكوين المقاطع. ادمج حرفين ليكون مقطعاً.",
    questions: ["ما هو المقطع من 'ب' + 'ا'؟", "ما هو المقطع من 'ت' + 'ا'؟"],
  },
  {
    day: 10,
    tool: "المقاطع والدمج",
    toolSlug: "syllables-blending",
    time: "10 دقائق",
    activity: "تمرن على دمج المقاطع لقراءة كلمات. ابدأ بكلمات من 3 أحرف.",
    questions: ["ما هي الكلمة من 'ب' + 'ا' + 'ب'؟", "ما هي الكلمة من 'ت' + 'ا' + 'ب'؟"],
  },
  {
    day: 11,
    tool: "المقاطع والدمج",
    toolSlug: "syllables-blending",
    time: "10 دقائق",
    activity: "تمرن على قراءة كلمات أطول. ادمج مقاطع متعددة.",
    questions: ["ما هي الكلمة من 'م' + 'د' + 'ر' + 'س' + 'ة'؟", "كم مقطعاً في كلمة 'مدرسة'؟"],
  },
  {
    day: 12,
    tool: "الكلمات البصرية العربية",
    toolSlug: "sight-words-ar",
    time: "10 دقائق",
    activity: "تعلم 5 كلمات بصرية شائعة. احفظها وكررها.",
    questions: ["ما هي الكلمات التي تعلمتها اليوم؟", "ما معنى كلمة 'باب'؟"],
  },
  {
    day: 13,
    tool: "الكلمات البصرية العربية",
    toolSlug: "sight-words-ar",
    time: "10 دقائق",
    activity: "راجع جميع الكلمات البصرية. حاول قراءة 10 كلمات.",
    questions: ["كم كلمة بصرية تعرف الآن؟", "ما هي الكلمات التي تحتاج ممارسة أكثر؟"],
  },
  {
    day: 14,
    tool: "الحركات العربية",
    toolSlug: "harakat",
    time: "10 دقائق",
    activity: "اختبار نهائي: اقرأ 10 كلمات مختلفة. هدفك: 8/10 صحيح.",
    questions: ["كم كلمة قرأت بشكل صحيح؟", "ما هي المهارة التي أتقنتها تماماً؟"],
  },
];

export default function ArabicReading14DayPlanPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "لأولياء الأمور", href: "/parents" },
        { label: "خطة 14 يوم: تحسين القراءة العربية" },
      ]}
    >
      <TeacherNoteTemplate
        title="خطة 14 يوم: تحسين القراءة العربية"
        instructions="خطة يومية لمدة 14 يوم لتحسين القراءة العربية (حروف/حركات/مقاطع). كل يوم: 5-10 دقائق + أداة واحدة + سؤالين متابعة"
        content={
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية استخدام هذه الخطة</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>اتبع الخطة يومياً لمدة 14 يوم</li>
                <li>كل يوم: 5-10 دقائق فقط</li>
                <li>استخدم الأداة المحددة في كل يوم</li>
                <li>أجب على سؤالين المتابعة مع طفلك</li>
                <li>استخدم الصوت في البداية لمساعدة الطفل</li>
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
                <li>استخدم الصوت دائماً في البداية - يساعد الطفل في التعلم</li>
                <li>كن صبوراً - تعلم القراءة يحتاج وقت</li>
                <li>احتفل بكل تقدم صغير</li>
                <li>لا تجبر الطفل - إذا كان متعباً، انتظر</li>
                <li>راقب التقدم باستخدام لوحة المتابعة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
