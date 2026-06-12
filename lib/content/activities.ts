import type { ContentActivity } from "./types";

// Grade-5 content activities (aligned to the عين books) — the "20% core" for the
// content subjects, delivered through the shared content-activity library. Linked
// from the curriculum hub via each lesson's `activityId`.

const plantSvg = `
<svg viewBox="0 0 100 100" width="100%" role="img" aria-label="رسم نبات">
  <rect width="100" height="100" fill="#f0fdf4"/>
  <line x1="50" y1="22" x2="50" y2="80" stroke="#16a34a" stroke-width="3"/>
  <ellipse cx="33" cy="44" rx="13" ry="7" fill="#22c55e" transform="rotate(-25 33 44)"/>
  <ellipse cx="67" cy="56" rx="13" ry="7" fill="#22c55e" transform="rotate(25 67 56)"/>
  <circle cx="50" cy="16" r="9" fill="#f472b6"/>
  <circle cx="50" cy="16" r="3.5" fill="#fde047"/>
  <path d="M50 80 L40 92 M50 80 L50 94 M50 80 L60 92" stroke="#92400e" stroke-width="2.5" fill="none"/>
</svg>`;

export const ACTIVITIES: ContentActivity[] = [
  // ============================ العلوم ============================
  {
    id: "sci-classify-living-sort",
    kind: "sort",
    subject: "science",
    title: "العلوم — تصنيف المخلوقات الحية",
    buckets: ["حيوانات", "نباتات", "فطريات"],
    items: [
      { text: "الأسد", bucket: "حيوانات" },
      { text: "الجمل", bucket: "حيوانات" },
      { text: "النخلة", bucket: "نباتات" },
      { text: "الوردة", bucket: "نباتات" },
      { text: "عيش الغراب", bucket: "فطريات" },
      { text: "الخميرة", bucket: "فطريات" },
    ],
  },
  {
    id: "sci-life-cycle-sequence",
    kind: "sequence",
    subject: "science",
    title: "العلوم — دورة حياة الفراشة",
    items: ["البيضة", "اليرقة", "الشرنقة", "الفراشة"],
  },
  {
    id: "sci-simple-machines-quiz",
    kind: "quiz",
    subject: "science",
    title: "العلوم — الآلات البسيطة",
    questions: [
      { prompt: "أيٌّ ممّا يأتي آلة بسيطة؟", options: ["الرافعة (العتلة)", "الحاسوب", "الثلاجة", "الهاتف"], answer: "الرافعة (العتلة)", hint: "الآلة البسيطة قليلة الأجزاء وتسهّل أداء الشغل." },
      { prompt: "تُستعمل البكرة في…", options: ["رفع الأشياء إلى الأعلى بسهولة", "تبريد الطعام", "تسجيل الصوت"], answer: "رفع الأشياء إلى الأعلى بسهولة", hint: "البكرة تغيّر اتجاه القوة." },
      { prompt: "المستوى المائل يساعد على…", options: ["تحريك الأحمال للأعلى بجهد أقل", "إضاءة الغرفة", "قياس الحرارة"], answer: "تحريك الأحمال للأعلى بجهد أقل", hint: "السطح المائل يوزّع الجهد على مسافة أطول." },
    ],
  },
  {
    id: "sci-elements-sort",
    kind: "sort",
    subject: "science",
    title: "العلوم — فلزّات ولافلزّات",
    buckets: ["فلزّات", "لافلزّات"],
    items: [
      { text: "الحديد", bucket: "فلزّات" },
      { text: "الذهب", bucket: "فلزّات" },
      { text: "النحاس", bucket: "فلزّات" },
      { text: "الأكسجين", bucket: "لافلزّات" },
      { text: "الكربون", bucket: "لافلزّات" },
      { text: "الكبريت", bucket: "لافلزّات" },
    ],
  },
  {
    id: "sci-matter-states-sort",
    kind: "sort",
    subject: "science",
    title: "العلوم — حالات المادة",
    buckets: ["صلب", "سائل", "غاز"],
    items: [
      { text: "الجليد", bucket: "صلب" },
      { text: "الحجر", bucket: "صلب" },
      { text: "الماء", bucket: "سائل" },
      { text: "الحليب", bucket: "سائل" },
      { text: "بخار الماء", bucket: "غاز" },
      { text: "الأكسجين", bucket: "غاز" },
    ],
  },
  {
    id: "sci-ecosystem-match",
    kind: "matching",
    subject: "science",
    title: "العلوم — العلاقات في الأنظمة البيئية",
    pairs: [
      { left: "المنتِجات", right: "النباتات تصنع غذاءها" },
      { left: "المستهلكات", right: "الحيوانات تأكل غيرها" },
      { left: "المحلِّلات", right: "الفطريات والبكتيريا" },
      { left: "السلسلة الغذائية", right: "انتقال الطاقة بين الكائنات" },
    ],
  },
  {
    id: "sci-plant-parts-label",
    kind: "label",
    subject: "science",
    title: "العلوم — أجزاء النبات",
    svg: plantSvg,
    points: [
      { x: 50, y: 16, label: "الزهرة" },
      { x: 33, y: 40, label: "الورقة" },
      { x: 50, y: 60, label: "الساق" },
      { x: 50, y: 90, label: "الجذر" },
    ],
  },

  // ======================== الاجتماعيات ========================
  {
    id: "social-caliphs-sequence",
    kind: "sequence",
    subject: "social",
    title: "الاجتماعيات — ترتيب الخلفاء الراشدين",
    items: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"],
  },
  {
    id: "social-caliphs-match",
    kind: "matching",
    subject: "social",
    title: "الاجتماعيات — الخلفاء وإنجازاتهم",
    pairs: [
      { left: "أبو بكر الصديق", right: "جمع القرآن الكريم" },
      { left: "عمر بن الخطاب", right: "بدء التقويم الهجري" },
      { left: "عثمان بن عفان", right: "توحيد المصاحف" },
      { left: "علي بن أبي طالب", right: "رابع الخلفاء الراشدين" },
    ],
  },
  {
    id: "social-states-match",
    kind: "matching",
    subject: "social",
    title: "الاجتماعيات — الدولتان الأموية والعباسية",
    pairs: [
      { left: "الدولة الأموية", right: "عاصمتها دمشق" },
      { left: "الدولة العباسية", right: "عاصمتها بغداد" },
      { left: "معاوية بن أبي سفيان", right: "مؤسس الدولة الأموية" },
      { left: "الحضارة الإسلامية", right: "ازدهار العلوم والعمارة" },
    ],
  },
  {
    id: "social-landforms-match",
    kind: "matching",
    subject: "social",
    title: "الاجتماعيات — مظاهر السطح",
    pairs: [
      { left: "الجبل", right: "مرتفع كبير من الأرض" },
      { left: "الوادي", right: "منخفض يجري فيه الماء أحيانًا" },
      { left: "السهل", right: "أرض مستوية واسعة" },
      { left: "الهضبة", right: "مرتفع مستوي القمة" },
    ],
  },

  // ============================ لغتي ============================
  {
    id: "arabic-hamza-quiz",
    kind: "quiz",
    subject: "arabic",
    title: "لغتي — الهمزة المتوسطة",
    questions: [
      { prompt: "اختر الكتابة الصحيحة:", options: ["سؤال", "سءال", "سوءال"], answer: "سؤال", hint: "الهمزة المتوسطة المضمومة بعد ضمّ تُكتب على واو." },
      { prompt: "اختر الكتابة الصحيحة:", options: ["بئر", "بأر", "بءر"], answer: "بئر", hint: "الهمزة المتوسطة المكسورة تُكتب على نبرة (ياء)." },
      { prompt: "اختر الكتابة الصحيحة:", options: ["يأكل", "يؤكل", "يءكل"], answer: "يأكل", hint: "الهمزة الساكنة بعد فتح تُكتب على ألف." },
    ],
  },
  {
    id: "arabic-jamc-sort",
    kind: "sort",
    subject: "arabic",
    title: "لغتي — أنواع الجموع",
    buckets: ["جمع مذكر سالم", "جمع مؤنث سالم", "جمع تكسير"],
    items: [
      { text: "معلِّمون", bucket: "جمع مذكر سالم" },
      { text: "مسلمون", bucket: "جمع مذكر سالم" },
      { text: "معلِّمات", bucket: "جمع مؤنث سالم" },
      { text: "مسلمات", bucket: "جمع مؤنث سالم" },
      { text: "رجال", bucket: "جمع تكسير" },
      { text: "كُتُب", bucket: "جمع تكسير" },
    ],
  },

  // ===================== المهارات الحياتية =====================
  {
    id: "life-nutrition-sort",
    kind: "sort",
    subject: "life-skills",
    title: "المهارات — العناصر الغذائية",
    buckets: ["كربوهيدرات", "بروتينات", "فيتامينات ومعادن"],
    items: [
      { text: "الأرز", bucket: "كربوهيدرات" },
      { text: "الخبز", bucket: "كربوهيدرات" },
      { text: "اللحم", bucket: "بروتينات" },
      { text: "البيض", bucket: "بروتينات" },
      { text: "البرتقال", bucket: "فيتامينات ومعادن" },
      { text: "الجزر", bucket: "فيتامينات ومعادن" },
    ],
  },
  {
    id: "life-medicine-quiz",
    kind: "quiz",
    subject: "life-skills",
    title: "المهارات — سلامة الأدوية",
    questions: [
      { prompt: "متى تأخذ الدواء؟", options: ["بوصف الطبيب أو الوالدين", "متى أردت", "إذا أعجبني لونه"], answer: "بوصف الطبيب أو الوالدين", hint: "الدواء يُؤخذ بإشراف الكبار فقط." },
      { prompt: "أين تُحفظ الأدوية؟", options: ["في مكان آمن بعيد عن متناول الصغار", "على طاولة الطعام", "في غرفة اللعب"], answer: "في مكان آمن بعيد عن متناول الصغار" },
      { prompt: "وجدت دواءً لا تعرفه؟", options: ["أسأل شخصًا بالغًا ولا أتناوله", "أتذوّقه", "أعطيه لأخي"], answer: "أسأل شخصًا بالغًا ولا أتناوله" },
    ],
  },

  // ========================= التربية الفنية =========================
  {
    id: "art-terms-match",
    kind: "matching",
    subject: "art",
    title: "الفنية — مصطلحات فنية",
    pairs: [
      { left: "المنظور", right: "إظهار البُعد والعمق في الرسم" },
      { left: "التناسب", right: "العلاقة بين أحجام أجزاء العمل" },
      { left: "التوريق", right: "زخارف نباتية متشابكة" },
      { left: "الخزف", right: "تشكيل الطين وحرقه" },
    ],
  },
];
