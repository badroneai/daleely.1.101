import type { ContentActivity } from "./types";

// Seed content activities (grade-5, aligned to the عين books) — one of each kind,
// the first slice of the per-subject "20% core". More are added the same way and
// linked from the curriculum hub.

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
    id: "social-caliphs-match",
    kind: "matching",
    subject: "social",
    title: "الاجتماعيات — الخلفاء الراشدون وإنجازاتهم",
    pairs: [
      { left: "أبو بكر الصديق", right: "جمع القرآن الكريم" },
      { left: "عمر بن الخطاب", right: "بدء التقويم الهجري" },
      { left: "عثمان بن عفان", right: "توحيد المصاحف" },
      { left: "علي بن أبي طالب", right: "رابع الخلفاء الراشدين" },
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
    id: "social-caliphs-sequence",
    kind: "sequence",
    subject: "social",
    title: "الاجتماعيات — ترتيب الخلفاء الراشدين",
    items: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"],
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
];
