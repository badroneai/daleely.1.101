import type { GradeCurriculum } from "./types";

// الصف الخامس الابتدائي — الفصل الدراسي الأول
// Source: كتب الطالب الرسمية (منصة عين) — scope & sequence extracted from each
// book's فهرس. Math lessons are wired to the interactive tools that cover each
// skill; the rest are "practice" (no tool yet) or "lesson" (learn content).
// See docs/CURRICULUM_PIPELINE.md.

export const grade5: GradeCurriculum = {
  grade: "grade5",
  titleAr: "الصف الخامس الابتدائي",
  source: "كتب الطالب — منصة عين (الفصل الدراسي الأول)",
  subjects: [
    {
      id: "math",
      titleAr: "الرياضيات",
      emoji: "🔢",
      color: "from-sky-600 to-blue-700",
      defaultProductType: "practice",
      units: [
        {
          title: "الفصل الأول: القيمة المنزلية",
          lessons: [
            { title: "القيمة المنزلية ضمن البلايين", productType: "interactive", toolSlug: "place-value" },
            { title: "المقارنة بين الأعداد", productType: "interactive", toolSlug: "place-value" },
            { title: "الكسور الاعتيادية والكسور العشرية", productType: "interactive", toolSlug: "decimals" },
            { title: "القيمة المنزلية ضمن أجزاء الألف", productType: "interactive", toolSlug: "decimals" },
            { title: "مقارنة الكسور العشرية", productType: "interactive", toolSlug: "decimals" },
            { title: "ترتيب الأعداد والكسور العشرية", productType: "interactive", toolSlug: "decimals" },
            { title: "خطة حل المسألة: التخمين والتحقق", productType: "lesson" },
          ],
        },
        {
          title: "الفصل الثاني: الجمع والطرح",
          lessons: [
            "تقريب الأعداد والكسور العشرية",
            { title: "تقدير نواتج الجمع والطرح", productType: "interactive", toolSlug: "mental-math-add-sub" },
            { title: "خطة حل المسألة: قرّر معقولية الإجابة", productType: "lesson" },
            "جمع الكسور العشرية وطرحها",
            { title: "خصائص الجمع", productType: "lesson" },
            { title: "الجمع والطرح ذهنيًّا", productType: "interactive", toolSlug: "mental-math-add-sub" },
          ],
        },
        {
          title: "الفصل الثالث: الضرب",
          lessons: [
            { title: "أنماط الضرب", productType: "interactive", toolSlug: "multiplication-table" },
            { title: "الضرب الذهني", productType: "interactive", toolSlug: "multiplication-table" },
            { title: "خاصية التوزيع", productType: "lesson" },
            "تقدير نواتج الضرب",
            { title: "الضرب في عدد من رقم واحد", productType: "interactive", toolSlug: "multiplication-quiz" },
            { title: "خطة حل المسألة: رسم صورة", productType: "lesson" },
            "الضرب في عدد من رقمين",
            { title: "خصائص الضرب", productType: "lesson" },
            "استعمالات حل المسألة",
          ],
        },
        {
          title: "الفصل الرابع: القسمة",
          lessons: [
            { title: "أنماط القسمة", productType: "interactive", toolSlug: "multiplication-quiz" },
            "تقدير نواتج القسمة",
            "القسمة باستعمال النماذج",
            { title: "القسمة على عدد من رقم واحد", productType: "interactive", toolSlug: "multiplication-quiz" },
            { title: "خطة حل المسألة: تمثيل المعطيات", productType: "lesson" },
            "تفسير باقي القسمة",
          ],
        },
        {
          title: "الفصل الخامس: العبارات الجبرية والمعادلات",
          lessons: [
            { title: "عبارات الجمع والطرح الجبرية", productType: "interactive", toolSlug: "algebra" },
            { title: "خطة حل المسألة: حل مسألة أبسط", productType: "lesson" },
            { title: "عبارات الضرب والقسمة الجبرية", productType: "interactive", toolSlug: "algebra" },
            { title: "ترتيب العمليات", productType: "interactive", toolSlug: "algebra" },
            { title: "معادلات الجمع والطرح", productType: "interactive", toolSlug: "algebra" },
            { title: "معادلات الضرب", productType: "interactive", toolSlug: "algebra" },
            "جداول الدوال",
          ],
        },
        {
          title: "الفصل السادس: الكسور الاعتيادية",
          lessons: [
            { title: "الكسور غير الفعلية", productType: "interactive", toolSlug: "fractions" },
            { title: "مقارنة الكسور الاعتيادية", productType: "interactive", toolSlug: "fractions" },
            "تقريب الكسور",
            "الأعداد الكسرية",
            "استعمال حل المسألة",
          ],
        },
        {
          title: "الفصل السابع: الإحصاء والاحتمال",
          lessons: [
            { title: "المتوسط الحسابي والوسيط والمنوال", productType: "interactive", toolSlug: "statistics" },
            { title: "التمثيل بالأعمدة", productType: "lesson" },
            { title: "الاحتمال", productType: "interactive", toolSlug: "statistics" },
            { title: "الاحتمال والكسور", productType: "interactive", toolSlug: "statistics" },
            { title: "تحديد النواتج الممكنة", productType: "interactive", toolSlug: "statistics" },
          ],
        },
        {
          title: "الفصل الثامن: القواسم والمضاعفات",
          lessons: [
            { title: "القواسم المشتركة", productType: "interactive", toolSlug: "number-theory" },
            { title: "الأعداد الأولية والأعداد غير الأولية", productType: "interactive", toolSlug: "number-theory" },
            { title: "الكسور المتكافئة", productType: "interactive", toolSlug: "fractions" },
            { title: "تبسيط الكسور", productType: "interactive", toolSlug: "fraction-operations" },
            { title: "المضاعفات المشتركة", productType: "interactive", toolSlug: "number-theory" },
            { title: "مقارنة الكسور الاعتيادية", productType: "interactive", toolSlug: "fractions" },
          ],
        },
        {
          title: "الفصل التاسع: جمع الكسور وطرحها",
          lessons: [
            { title: "جمع الكسور المتشابهة", productType: "interactive", toolSlug: "fraction-operations" },
            { title: "طرح الكسور المتشابهة", productType: "interactive", toolSlug: "fraction-operations" },
            "جمع الكسور غير المتشابهة",
            "طرح الكسور غير المتشابهة",
            "تقدير حل المسألة",
          ],
        },
        {
          title: "الفصل العاشر: وحدات القياس",
          lessons: [
            { title: "المنظومة المترية", productType: "interactive", toolSlug: "measurement" },
            { title: "وحدات الطول", productType: "interactive", toolSlug: "measurement" },
            { title: "وحدات الكتلة", productType: "interactive", toolSlug: "measurement" },
            { title: "وحدات السعة", productType: "interactive", toolSlug: "measurement" },
            { title: "وحدات الزمن", productType: "interactive", toolSlug: "telling-time" },
            { title: "حساب الزمن المنقضي", productType: "interactive", toolSlug: "telling-time" },
          ],
        },
        {
          title: "الفصل الحادي عشر: الأشكال الهندسية",
          lessons: [
            { title: "مفردات هندسية", productType: "lesson" },
            { title: "الأشكال الرباعية", productType: "interactive", toolSlug: "geometry" },
            { title: "المستوى الإحداثي", productType: "interactive", toolSlug: "geometry" },
            "الانسحاب في المستوى الإحداثي",
            "الانعكاس في المستوى الإحداثي",
            "الدوران في المستوى الإحداثي",
          ],
        },
        {
          title: "الفصل الثاني عشر: المحيط والمساحة والحجم",
          lessons: [
            { title: "محيط المستطيل", productType: "interactive", toolSlug: "perimeter-area-volume" },
            "محيط مضلع",
            { title: "مساحة المستطيل والمربع", productType: "interactive", toolSlug: "perimeter-area-volume" },
            "الأشكال الثلاثية الأبعاد",
            { title: "حجم المنشور", productType: "interactive", toolSlug: "perimeter-area-volume" },
          ],
        },
      ],
    },
    {
      id: "science",
      titleAr: "العلوم",
      emoji: "🔬",
      color: "from-emerald-600 to-teal-700",
      defaultProductType: "lesson",
      units: [
        { title: "الوحدة الأولى: تنوُّع الحياة", lessons: ["تصنيف المخلوقات الحية", "النباتات", "تكاثر البكتيريا", "دورات الحياة"] },
        { title: "الوحدة الثانية: الأنظمة البيئية", lessons: ["العلاقات في الأنظمة البيئية", "التكيُّف والبقاء", "الدورات في الأنظمة البيئية", "التغيرات في الأنظمة البيئية"] },
        { title: "الوحدة الثالثة: الأرض ومواردها", lessons: ["معالم سطح الأرض", "العمليات المؤثرة في سطح الأرض", "مصادر الطاقة", "الهواء والماء"] },
        { title: "الوحدة الرابعة: الطقس", lessons: ["الغلاف الجوي والطقس", "الغيوم والهطول", "العواصف", "المناخ"] },
        { title: "الوحدة الخامسة: المادة", lessons: ["العناصر", "المخاليط والفلزّات واللافلزّات", "تغيرات حالة المادة", "المركبات والتغيرات الكيميائية"] },
        { title: "الوحدة السادسة: القوى والطاقة", lessons: ["الشغل والطاقة", "الآلات البسيطة", "الصوت", "الضوء"] },
      ],
    },
    {
      id: "arabic",
      titleAr: "لغتي",
      emoji: "📚",
      color: "from-orange-600 to-rose-600",
      defaultProductType: "lesson",
      units: [
        {
          title: "الوحدة الأولى: أخلاق وفضائل",
          lessons: [
            "نص الاستماع: عبد الملك بن عبد العزيز",
            "نص الفهم القرائي: أخلاق المؤمنين",
            "الصنف اللغوي: جمع المذكر السالم",
            "الصنف اللغوي: الأفعال الخمسة",
            "الصنف اللغوي: أنواع الجموع",
            "الظاهرة الإملائية: الهمزة المتوسطة على الألف",
            "الظاهرة الإملائية: الهمزة المتوسطة على الواو",
            "الوظيفة النحوية: رفع المبتدأ والخبر بالعلامات الفرعية",
            "الوظيفة النحوية: رفع الفاعل بالعلامات الفرعية",
            "الرسم الكتابي: خط النسخ",
            "التواصل الكتابي: كتابة قصة مكتملة العناصر",
            "التواصل الشفهي: سرد قصة",
          ],
        },
        {
          title: "الوحدة الثانية: الوطن ولاء وعطاء",
          lessons: [
            "نص الاستماع: الحنين إلى الوطن",
            "نص الفهم القرائي: وطني المملكة العربية السعودية",
            "الصنف اللغوي: الاسم المقصور والمنقوص والممدود",
            "الظاهرة الإملائية: رسم الهمزة الممدودة (آ – أ)",
            "الظاهرة الإملائية: الهمزة المتوسطة على الياء",
            "الوظيفة النحوية: نصب المفعول به بالعلامات الفرعية",
            "الوظيفة النحوية: الاسم المجرور بحرف الجر",
            "الوظيفة النحوية: المعطوف",
            "الوظيفة النحوية: الصفة",
            "النص الشعري: أنا الرياض",
            "التواصل الكتابي: كتابة نص وصفي",
            "التواصل الشفهي: تقديم عرض شفهي وصفي",
          ],
        },
      ],
    },
    {
      id: "social",
      titleAr: "الدراسات الاجتماعية",
      emoji: "🗺️",
      color: "from-amber-600 to-orange-700",
      defaultProductType: "lesson",
      units: [
        { title: "الوحدة الأولى: الخلفاء الراشدون", lessons: ["الخليفة أبو بكر الصديق", "الخليفة عمر بن الخطاب", "الخليفة عثمان بن عفان", "الخليفة علي بن أبي طالب"] },
        { title: "الوحدة الثانية: التاريخ الإسلامي", lessons: ["الدولة الأموية", "الدولة العباسية", "الحضارة الإسلامية"] },
        { title: "الوحدة الثالثة: الأمن الوطني", lessons: ["الأمن", "أجهزة الأمن"] },
        { title: "الوحدة الرابعة: جغرافية المملكة العربية السعودية", lessons: ["الموقع والحدود", "مظاهر السطح", "الأودية", "المنطقة الساحلية والجُزُر", "المناطق الإدارية"] },
      ],
    },
    {
      id: "life-skills",
      titleAr: "المهارات الحياتية والأسرية",
      emoji: "🌱",
      color: "from-pink-600 to-rose-700",
      defaultProductType: "lesson",
      units: [
        { title: "الوحدة الأولى: صحتي وسلامتي", lessons: ["العلامات الحيوية في الجسم (درجة الحرارة - النبض)", "التعامل مع الأدوية"] },
        { title: "الوحدة الثانية: مهاراتي في الحياة", lessons: ["كيف تذاكر؟", "كيف تجيب عن أسئلة الاختبار؟"] },
        { title: "الوحدة الثالثة: مسكني", lessons: ["المسكن الصحي"] },
        { title: "الوحدة الرابعة: مجتمعي", lessons: ["آداب التعامل خارج المنزل"] },
        { title: "الوحدة الخامسة: غذائي", lessons: ["العناصر الغذائية", "البيض"] },
      ],
    },
    {
      id: "art",
      titleAr: "التربية الفنية",
      emoji: "🎨",
      color: "from-violet-600 to-indigo-700",
      defaultProductType: "lesson",
      units: [
        { title: "الوحدة الأولى: مجال الرسم", lessons: ["الخامات المختلفة والمنظور والنسب", "المآذن والقبب في العمارة الإسلامية", "الحرف الشعبية"] },
        { title: "الوحدة الثانية: مجال الزخرفة", lessons: ["تجريد وحدة زخرفية نباتية", "التوريق في الزخارف الإسلامية"] },
        { title: "الوحدة الثالثة: مجال الطباعة", lessons: ["مطبوعات بالتفريغ", "طباعة زخرفية بالتفريغ"] },
        { title: "الوحدة الرابعة: مجال الخزف", lessons: ["زخارف بارزة على المسطحات الطينية", "تشكيل المجسم بطريقة الشرائح الطينية"] },
      ],
    },
  ],
};
