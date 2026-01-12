import Link from "next/link";

const faq = [
  {
    slug: "how-often-use-tool",
    question: "كم مرة نستخدم الأداة أسبوعياً؟",
    shortAnswer: "ننصح باستخدام الأداة 3-5 مرات أسبوعياً لمدة 5-10 دقائق في كل مرة. المهم هو الانتظام وليس الكمية.",
  },
  {
    slug: "when-raise-level",
    question: "متى أرفع المستوى؟",
    shortAnswer: "ارفع المستوى عندما ينجح طفلك في 80% من التمارين بسهولة. لا تتعجل - التثبيت أهم من السرعة.",
  },
  {
    slug: "how-know-improved",
    question: "كيف أعرف أن الطفل فعلاً تحسن؟",
    shortAnswer: "راقب: سرعة الإجابة، ثقة الطفل، قلة الأخطاء، ورغبته في الممارسة.",
  },
  {
    slug: "sound-or-no-sound",
    question: "هل الأفضل الصوت أم بدونه؟",
    shortAnswer: "ابدأ بالصوت لمساعدة الطفل في التعلم، ثم أطفئه تدريجياً لتعزيز الاستقلالية.",
  },
  {
    slug: "how-long-session",
    question: "كم من الوقت يجب أن تستغرق الجلسة؟",
    shortAnswer: "5-10 دقائق كافية للأطفال الصغار (6-8 سنوات)، و10-15 دقيقة للأطفال الأكبر (9-12 سنة).",
  },
  {
    slug: "child-refuses-tool",
    question: "ماذا لو رفض الطفل استخدام الأداة؟",
    shortAnswer: "لا تجبره. جرب: تغيير الوقت، جعله ممتعاً (نقاط/مكافآت)، أو اختيار أداة مختلفة.",
  },
  {
    slug: "multiple-tools-same-day",
    question: "هل يمكن استخدام أكثر من أداة في نفس اليوم؟",
    shortAnswer: "نعم، لكن لا تجعل الجلسات متتالية. اترك فاصل زمني بين الجلسات.",
  },
  {
    slug: "deal-with-repeated-errors",
    question: "كيف أتعامل مع الأخطاء المتكررة؟",
    shortAnswer: "لا تعاقب. استخدم سجل الأخطاء الشائعة لتحديد المشكلة. راجع الأساسيات، استخدم أداة أبسط، أو استشر المعلم.",
  },
  {
    slug: "understanding-vs-memorization",
    question: "ما الفرق بين الحفظ والفهم؟",
    shortAnswer: "الحفظ هو تذكر المعلومات بدون فهم (ينسى بسرعة)، بينما الفهم هو فهم المفهوم والسبب (يدوم أطول).",
  },
  {
    slug: "balance-learning-screen",
    question: "كيف أوازن بين التعلم والشاشة؟",
    shortAnswer: "حدد وقتاً محدداً للتعلم (10 دقائق)، اجعل التعلم قبل الترفيه، استخدم مؤقت، وأوقف التنبيهات.",
  },
  {
    slug: "when-use-14-day-plan",
    question: "متى أستخدم خطة 14 يوم؟",
    shortAnswer: "استخدم خطة 14 يوم عندما تريد تحقيق هدف محدد (مثلاً: تثبيت جدول الضرب، تحسين القراءة، تقوية الحساب الذهني).",
  },
  {
    slug: "how-choose-right-tool",
    question: "كيف أختار الأداة المناسبة لطفلي؟",
    shortAnswer: "استخدم دليل اختيار الأداة. اختر: عمر الطفل/الصف، مستوى الطفل (مبتدئ/متوسط/متقدم)، الهدف (مراجعة/تأسيس/إثراء)، والوقت المتاح.",
  },
];

export default function ParentsFAQ() {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">أسئلة الأهل الشائعة</h2>
      <div className="space-y-4">
        {faq.map((item) => (
          <Link
            key={item.slug}
            href={`/parents/faq/${item.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.question}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.shortAnswer}</p>
            <p className="text-primary-700 hover:text-primary-800 font-medium text-sm mt-3">
              اقرأ المزيد →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
