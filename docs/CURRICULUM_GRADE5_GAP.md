# Grade 5 — gap report (interactive-tool backlog)

What the structured curriculum (`lib/curriculum/grade-5.ts`) needs as interactive
tools, beyond what already exists. Each tool is built via `docs/TOOL_PLAYBOOK.md`
in its own PR. Content subjects (science, social, لغتي, life-skills, art) are
`lesson` content and are surfaced in the hub as the owner's content lands.

## Already covered (existing tools, wired to grade-5 lessons)
- **place-value** → القيمة المنزلية ضمن البلايين، المقارنة بين الأعداد *(needs scope bump to billions/decimals)*
- **multiplication-table / -quiz** → أنماط/خصائص الضرب، الضرب والقسمة *(needs multi-digit scope)*
- **mental-math-add-sub** → الجمع والطرح ذهنيًّا، التقدير *(needs larger-number/decimal scope)*
- **fractions** → الكسور غير الفعلية، الكسور المتكافئة، مقارنة الكسور
- **telling-time** → وحدات الزمن، الزمن المنقضي

## Tools to build (prioritized)

| P | Tool | Skill (book) |
|---|---|---|
| **1** | **decimals** الكسور العشرية | القيمة المنزلية ضمن أجزاء الألف · مقارنة/ترتيب الكسور العشرية · الكسور الاعتيادية ↔ العشرية · جمع/طرح الكسور العشرية |
| **1** | **fraction-operations** (extend `fractions`) | جمع/طرح الكسور المتشابهة وغير المتشابهة · تبسيط الكسور · الأعداد الكسرية |
| **2** | **number-theory** القواسم والمضاعفات | القواسم المشتركة · الأعداد الأولية وغير الأولية · المضاعفات المشتركة (GCF/LCM) |
| **2** | **measurement** وحدات القياس | المنظومة المترية · الطول/الكتلة/السعة · التحويلات |
| **2** | **perimeter-area-volume** | محيط المستطيل/المضلع · مساحة المستطيل والمربع · حجم المنشور |
| **3** | **algebra** العبارات والمعادلات | العبارات الجبرية · ترتيب العمليات · معادلات الجمع/الطرح/الضرب · جداول الدوال |
| **3** | **statistics-probability** | المتوسط/الوسيط/المنوال · الاحتمال والكسور · النواتج الممكنة |
| **3** | **geometry** الأشكال والإحداثيات | الأشكال الرباعية · المستوى الإحداثي · الانسحاب/الانعكاس/الدوران |

## Scope extensions to existing tools
- `place-value`: digits up to billions + decimal places.
- `multiplication-*`: multi-digit factors for grade 5.
- `mental-math-add-sub`: larger numbers + decimal add/sub.
- `fractions`: add the operations level (becomes the fraction-operations tool).

## Method
Each row above is one PR following the playbook (engine + primitives + a11y +
gamification, content aligned to the book), then wired into the curriculum data
(`productType: "interactive"`, `toolSlug`). This is the same path every grade uses.
