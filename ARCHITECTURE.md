# البنية التقنية - Daleely.ai

**آخر تحديث:** اليوم  
**الإصدار:** 1.0

---

## 🏗️ مخطط البنية

### Frontend (Next.js App Router)
```
app/
├── [locale]/              # مستقبلي: دعم لغات متعددة
│   ├── [subject]/         # مستقبلي: مواد تعليمية جديدة
│   └── tools/
├── math/                  # Pillar الرياضيات
├── arabic/                # Pillar اللغة العربية
├── teachers/              # Pillar المعلمين
├── parents/               # Pillar أولياء الأمور
├── tools/                 # صفحات الأدوات
│   └── [slug]/page.tsx
├── articles/              # صفحات المقالات
│   └── [category]/[slug]/page.tsx
└── [trust pages]         # privacy, terms, contact
```

### Content/Data Layer
```
lib/
├── tools.ts               # بيانات الأدوات (TypeScript array)
├── articles.ts            # بيانات المقالات (TypeScript array)
├── types.ts               # TypeScript interfaces
└── [locale]/              # مستقبلي: بيانات متعددة اللغات
    ├── tools.ts
    └── articles.ts
```

### SEO/i18n Layer
```
app/
├── sitemap.ts            # Sitemap generator (يدعم locales مستقبلاً)
├── robots.ts             # Robots.txt generator
└── layout.tsx            # Root layout مع metadata + locale detection
```

### Audio/Speech Layer
```
lib/speech/
├── speech.ts             # واجهة موحدة (SpeechProvider)
├── web-speech.ts         # تنفيذ Web Speech API (مؤقت)
└── audio-files.ts       # مستقبلي: تنفيذ ملفات صوتية
```

### Component Layer
```
components/
├── templates/            # قوالب موحدة (Tool, Pillar, Article)
├── tools/               # مكونات الأدوات التفاعلية
└── [shared components]  # Header, Footer, Breadcrumbs, PageLayout
```

---

## 🏗️ نظرة عامة على البنية

```
Ddaleely.edu/
├── app/                    # Next.js App Router
│   ├── page.tsx           # الصفحة الرئيسية
│   ├── layout.tsx         # Layout الجذر
│   ├── globals.css        # الأنماط العامة
│   ├── math/              # Pillar الرياضيات
│   ├── arabic/            # Pillar اللغة العربية
│   ├── teachers/          # Pillar المعلمين
│   ├── parents/           # Pillar أولياء الأمور
│   ├── tools/             # صفحات الأدوات
│   ├── articles/          # صفحات المقالات
│   ├── privacy/           # سياسة الخصوصية
│   ├── terms/             # شروط الاستخدام
│   ├── contact/           # اتصل بنا
│   ├── sitemap.ts         # Sitemap generator
│   ├── robots.ts          # Robots.txt generator
│   └── not-found.tsx      # صفحة 404
│
├── components/            # المكونات القابلة لإعادة الاستخدام
│   ├── Header.tsx         # رأس الصفحة
│   ├── Footer.tsx         # تذييل الصفحة
│   ├── Breadcrumbs.tsx    # مسار التنقل
│   ├── PageLayout.tsx     # Layout للصفحات
│   ├── templates/         # قوالب الصفحات
│   │   ├── ToolTemplate.tsx      # قالب صفحة الأداة
│   │   ├── PillarTemplate.tsx    # قالب صفحة Pillar
│   │   └── ArticleTemplate.tsx   # قالب صفحة المقال
│   └── tools/             # مكونات الأدوات التفاعلية
│       ├── [ToolName].tsx        # منطق الأداة
│       └── [ToolName]Client.tsx  # Client wrapper
│
├── lib/                   # المكتبات والمساعدات
│   ├── types.ts           # TypeScript types
│   ├── tools.ts            # بيانات الأدوات
│   ├── articles.ts         # بيانات المقالات
│   ├── metadata.ts         # مساعدات SEO metadata
│   ├── analytics.ts        # نظام التتبع
│   ├── sounds.ts           # نظام أصوات التنبيه
│   └── speech/             # نظام النطق
│       ├── speech.ts       # واجهة موحدة للنطق
│       └── web-speech.ts   # تنفيذ Web Speech API
│
├── public/                # الملفات الثابتة
│   └── sounds/            # مستقبلي: ملفات صوتية
│       └── [locale]/[type]/[file].mp3
│
└── [config files]         # ملفات التكوين
```

---

## 📁 هيكل الملفات المهمة

### `/app/` - صفحات Next.js

#### الصفحات الرئيسية:
- `page.tsx` - الصفحة الرئيسية
- `layout.tsx` - Layout الجذر مع metadata
- `globals.css` - Tailwind CSS والأنماط المخصصة

#### Pillars:
- `math/page.tsx` - صفحة Pillar الرياضيات
- `arabic/page.tsx` - صفحة Pillar اللغة العربية
- `teachers/page.tsx` - صفحة Pillar المعلمين
- `parents/page.tsx` - صفحة Pillar أولياء الأمور

#### صفحات الأدوات:
- `tools/page.tsx` - قائمة جميع الأدوات
- `tools/[tool-slug]/page.tsx` - صفحة أداة محددة

#### صفحات المقالات:
- `articles/page.tsx` - قائمة جميع المقالات
- `articles/[category]/page.tsx` - قائمة مقالات فئة
- `articles/[category]/[slug]/page.tsx` - صفحة مقال محددة

#### صفحات Trust:
- `privacy/page.tsx` - سياسة الخصوصية
- `terms/page.tsx` - شروط الاستخدام
- `contact/page.tsx` - اتصل بنا

#### SEO:
- `sitemap.ts` - Sitemap generator
- `robots.ts` - Robots.txt generator
- `not-found.tsx` - صفحة 404 مخصصة

---

### `/components/` - المكونات

#### المكونات الأساسية:
- `Header.tsx` - رأس الصفحة مع التنقل
- `Footer.tsx` - تذييل الصفحة
- `Breadcrumbs.tsx` - مسار التنقل
- `PageLayout.tsx` - Layout wrapper للصفحات

#### القوالب:
- `templates/ToolTemplate.tsx` - قالب صفحة الأداة
  - H1 + Description
  - Educational Tip
  - Interactive Tool
  - FAQ with Schema
  - Related Tools
  - Related Articles

- `templates/PillarTemplate.tsx` - قالب صفحة Pillar
  - H1 + Introduction
  - Top Tools
  - Tools by Grade Level
  - Learning Path
  - Articles
  - FAQ

- `templates/ArticleTemplate.tsx` - قالب صفحة المقال
  - H1 + Meta
  - Content
  - Related Tools
  - Related Articles

#### مكونات الأدوات:
كل أداة لها ملفان:
- `[ToolName].tsx` - منطق الأداة (Server Component)
- `[ToolName]Client.tsx` - Client wrapper لإدارة الحالة

**الأدوات الحالية:**
- MultiplicationTable
- MultiplicationQuiz
- MentalMathAddSub
- TellingTime
- ArabicLetters
- LetterSounds
- Harakat
- SyllablesBlending
- SightWordsAr

---

### `/lib/` - المكتبات والمساعدات

#### `types.ts`
```typescript
interface Tool {
  slug: string;
  title: string;
  description: string;
  category: "math" | "arabic" | "teachers";
  gradeLevel: "1-2" | "3-4" | "5-6" | "all";
  keywords: string[];
}

interface Article {
  slug: string;
  title: string;
  description: string;
  category: "math" | "arabic";
  publishedAt: string;
}
```

#### `tools.ts`
- `tools[]` - مصفوفة جميع الأدوات
- `getToolBySlug()` - الحصول على أداة بالـ slug
- `getToolsByCategory()` - الحصول على أدوات حسب الفئة
- `getToolsByGradeLevel()` - الحصول على أدوات حسب المرحلة

#### `articles.ts`
- `articles[]` - مصفوفة جميع المقالات
- `getArticleBySlug()` - الحصول على مقال بالـ slug
- `getArticlesByCategory()` - الحصول على مقالات حسب الفئة

#### `metadata.ts`
- `generateToolMetadata()` - إنشاء metadata لأداة
- `generatePillarMetadata()` - إنشاء metadata لـ Pillar
- `generateArticleMetadata()` - إنشاء metadata لمقال

#### `analytics.ts`
- `trackEvent()` - تتبع الأحداث
- `trackPageLeaveEarly()` - تتبع المغادرة المبكرة

#### `sounds.ts`
- `playCorrectSound()` - صوت الإجابة الصحيحة
- `playWrongSound()` - صوت الإجابة الخاطئة
- `playClickSound()` - صوت النقرة
- `playCompleteSound()` - صوت الإكمال
- `setSoundEnabled()` - تفعيل/تعطيل الصوت

#### `speech/` - نظام النطق

**`speech.ts`** - واجهة موحدة:
```typescript
interface SpeechProvider {
  speakNumber(number: number): Promise<void>;
  speakLetter(letter: string, letterName: string): Promise<void>;
  speakWord(word: string): Promise<void>;
  speakText(text: string): Promise<void>;
  isAvailable(): boolean;
  setEnabled(enabled: boolean): void;
  isEnabled(): boolean;
}
```

**`web-speech.ts`** - تنفيذ Web Speech API:
- استخدام `window.speechSynthesis`
- دعم اللغة العربية
- تحويل الأعداد إلى نطق عربي
- جاهز للاستبدال بملفات صوتية لاحقاً

---

## 🔧 التقنيات المستخدمة

### Core:
- **Next.js 14.2.0** - Framework (App Router)
- **React 18.3.0** - UI Library
- **TypeScript 5.3.0** - Type Safety

### Styling:
- **Tailwind CSS 3.4.0** - Utility-first CSS
- **PostCSS 8.4.0** - CSS Processing
- **Autoprefixer 10.4.0** - Browser Compatibility

### Development:
- **ESLint 8.57.0** - Linting
- **eslint-config-next** - Next.js ESLint config

### Audio:
- **Web Speech API** - Text-to-Speech (مؤقت)
- **Web Audio API** - Sound effects

---

## 🎨 أنماط التصميم

### الألوان (Tailwind):
- Primary: `primary-600`, `primary-700`, `primary-800`
- Secondary: `gray-50`, `gray-100`, `gray-200`
- Success: `green-600`, `green-700`
- Error: `red-600`, `red-700`

### المكونات المخصصة:
- `.btn-primary` - زر أساسي
- `.btn-secondary` - زر ثانوي
- `.card` - بطاقة
- `.input-field` - حقل إدخال

---

## 🔐 الأمان والخصوصية

- لا يوجد جمع بيانات شخصية حالياً
- نظام Analytics خفيف ومركز على الخصوصية
- صفحة Privacy Policy كاملة
- صفحة Terms of Use كاملة
- قسم خاص بخصوصية الأطفال في Privacy Policy

---

## 📱 Responsive Design

- **Mobile-first approach**
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## 🚀 الأداء

- **Static Generation** - معظم الصفحات static
- **Code Splitting** - تلقائي مع Next.js
- **Image Optimization** - جاهز للاستخدام
- **Font Optimization** - استخدام system fonts

---

## 🔄 نظام النطق

### الوضع الحالي:
- استخدام Web Speech API
- دعم اللغة العربية
- جاهز للاستبدال بملفات صوتية

### المستقبل:
- يمكن استبدال `web-speech.ts` بـ `audio-files.ts`
- الواجهة موحدة، فقط تغيير التنفيذ

---

## 📝 ملاحظات مهمة

1. **Server vs Client Components:**
   - معظم المكونات Server Components
   - Client Components فقط عند الحاجة للتفاعل

2. **State Management:**
   - استخدام React useState للـ state المحلي
   - لا حاجة لـ Redux/Zustand حالياً

3. **Data Fetching:**
   - البيانات في ملفات TypeScript (`lib/tools.ts`, `lib/articles.ts`)
   - يمكن تحويلها لـ API لاحقاً

4. **SEO:**
   - جميع الصفحات محسّنة
   - Schema markup في جميع الصفحات المهمة

5. **Accessibility:**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation

---

## 📐 قواعد تسمية المجلدات

### للغات (i18n - مستقبلي):
```
app/
├── ar/                    # العربية (الحالية)
│   ├── math/
│   ├── arabic/
│   └── tools/
└── en/                    # الإنجليزية (مستقبلي)
    ├── math/
    ├── arabic/
    └── tools/
```

**قاعدة:** `app/[locale]/[path]` حيث `locale` هو كود اللغة (ar, en, fr, etc.)

### للمواد التعليمية (Subjects):
```
app/
├── math/                  # الرياضيات
├── arabic/                # اللغة العربية
├── science/              # مستقبلي: العلوم
└── english/              # مستقبلي: الإنجليزية
```

**قاعدة:** كل مادة لها مجلد منفصل في `app/` أو `app/[locale]/[subject]`

### للأدوات:
```
app/tools/
├── [slug]/page.tsx       # صفحة الأداة
└── page.tsx              # قائمة جميع الأدوات
```

**قاعدة:** `slug` يجب أن يكون URL-friendly، lowercase، مع hyphens

### للمقالات:
```
app/articles/
├── [category]/page.tsx           # قائمة مقالات الفئة
└── [category]/[slug]/page.tsx   # صفحة المقال
```

**قاعدة:** `category` يطابق `subject` (math, arabic, etc.)

---

## 🚀 Scalability Notes

### 1. إضافة لغة جديدة:
- إنشاء `app/[locale]/...` structure
- إضافة `lib/i18n/[locale].json`
- تحديث `app/layout.tsx` لدعم locale detection
- تحديث `app/sitemap.ts` ليشمل locale
- إضافة `hreflang` tags في metadata

### 2. إضافة مادة تعليمية جديدة:
- إنشاء `app/[subject]/page.tsx`
- إضافة أدوات في `lib/tools.ts` مع `category: "subject"`
- إضافة مقالات في `lib/articles.ts`
- تحديث Navigation في `components/Header.tsx`

### 3. إضافة نوع أداة جديد:
- تحديد القالب المناسب (ToolTemplate أو قالب جديد)
- إنشاء `components/tools/[ToolName].tsx` و `[ToolName]Client.tsx`
- إضافة صفحة `app/tools/[slug]/page.tsx`
- إضافة بيانات في `lib/tools.ts`

### 4. تحويل البيانات إلى API/DB:
- إنشاء `app/api/tools/route.ts` و `app/api/articles/route.ts`
- استبدال `lib/tools.ts` imports بـ API calls
- إضافة caching layer (Next.js cache أو Redis)
- الحفاظ على نفس interfaces في `lib/types.ts`

### 5. استبدال نظام النطق:
- إنشاء `lib/speech/audio-files.ts` مع نفس `SpeechProvider` interface
- استبدال `WebSpeechProvider` بـ `AudioFilesProvider` في `lib/speech.ts`
- إضافة ملفات صوتية في `public/sounds/[locale]/[type]/`
- لا حاجة لتغيير أي كود في الأدوات

### 6. إضافة نظام المستخدمين:
- إنشاء `app/auth/...` pages
- إضافة `lib/auth/...` utilities
- إضافة middleware للـ protected routes
- تحديث `lib/analytics.ts` لربط الأحداث بالمستخدمين

---

## 🔮 التوسعات المستقبلية

### قصيرة المدى:
- إضافة المزيد من الأدوات
- إضافة المزيد من المقالات
- تحسينات UX/UI

### متوسطة المدى:
- نظام المستخدمين (اختياري)
- تتبع التقدم
- لوحة تحكم للمعلمين
- دعم لغات متعددة

### طويلة المدى:
- API للبيانات
- قاعدة بيانات
- نظام المصادقة
- مواد تعليمية جديدة

---

**آخر تحديث:** اليوم
