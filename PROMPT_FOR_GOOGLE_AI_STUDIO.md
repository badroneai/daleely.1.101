# برمبت تحويل تطبيق "دليلي" إلى Next.js 14

**انسخ هذا البرمبت بالكامل وأعطه لـ Google AI Studio**

---

## المهمة

لدي تطبيق React تفاعلي اسمه "دليلي" (Daleely) أنشأته في Google AI Studio. التطبيق يتكون من 3 ملفات:
- `index.tsx` (حوالي 1000 سطر)
- `index.html`
- `metadata.json`

**المطلوب:** تحويل هذا التطبيق بالكامل إلى Next.js 14 App Router مع تطبيق منهجية مشروع Daleely.ai بالكامل.

---

## 🎯 الهدف النهائي

تحويل التطبيق إلى:
- Next.js 14 App Router structure
- TypeScript صارم
- Server/Client Components منفصلة
- مكونات قابلة لإعادة الاستخدام
- متوافق مع بنية مشروع Daleely.ai الحالية

---

## 📋 المتطلبات الأساسية (Non-negotiables)

### 1. البنية (Architecture)
- **Next.js 14 App Router:** استخدام `app/` directory structure
- **TypeScript صارم:** جميع الملفات `.tsx` أو `.ts` مع types واضحة
- **Tailwind CSS فقط:** لا CSS مخصص إلا في `globals.css`
- **RTL عربي بالكامل:** `dir="rtl"` و `lang="ar"` في جميع الصفحات

### 2. Server vs Client Components
- **Server Components افتراضياً:** جميع المكونات Server Components ما أمكن
- **Client Components فقط عند الحاجة:** 
  - `"use client"` فقط للمكونات التي تحتاج:
    - `useState`, `useEffect`, `useRef`
    - Event handlers (`onClick`, `onChange`, etc.)
    - Browser APIs (localStorage, window, etc.)
    - React hooks (useContext, useReducer, etc.)

### 3. تقسيم الكود
**يجب تقسيم الملف الكبير (1000 سطر) إلى:**

```
components/
├── masar/                          # مجلد خاص بتطبيق "دليلي"
│   ├── TrackSelector.tsx          # Server Component (قائمة المسارات)
│   ├── TrackSelectorClient.tsx    # Client Component (إذا احتاج interactivity)
│   ├── StageSelector.tsx          # Server Component
│   ├── StageSelectorClient.tsx   # Client Component
│   ├── GameScreen.tsx             # Server Component
│   ├── GameScreenClient.tsx      # Client Component (اللعبة نفسها)
│   ├── ProfileScreen.tsx          # Server Component
│   ├── ProfileScreenClient.tsx   # Client Component
│   ├── BadgeSystem.tsx            # Server Component
│   ├── BadgeSystemClient.tsx     # Client Component
│   ├── SmartHints.tsx            # Client Component (نظام التلميحات)
│   ├── CharacterCustomization.tsx # Client Component
│   └── types.ts                   # TypeScript types للمسارات والمراحل
│
lib/
├── masar/                         # منطق التطبيق
│   ├── tracks.ts                 # بيانات المسارات (TypeScript array)
│   ├── badges.ts                 # بيانات الأوسمة
│   ├── gamification.ts            # منطق Gamification (نقاط، رتب، إلخ)
│   └── storage.ts                # localStorage helpers (Client-side فقط)
│
app/
└── masar/                         # صفحة التطبيق
    └── page.tsx                  # Server Component الرئيسي
```

### 4. البيانات (Data)
- **TypeScript arrays:** جميع البيانات في `lib/masar/tracks.ts` و `lib/masar/badges.ts`
- **لا قاعدة بيانات:** البيانات ثابتة في ملفات TypeScript
- **localStorage:** فقط للـ Client Components (النقاط، التقدم، إلخ)

### 5. SEO و Metadata
كل صفحة يجب أن تحتوي على:
```typescript
export const metadata: Metadata = {
  title: "دليلي - مسارات التعلم التفاعلية | Daleely.ai",
  description: "مسارات تعليمية تفاعلية مع نظام gamification",
  alternates: {
    canonical: "https://daleely.ai/masar",
  },
  openGraph: {
    title: "دليلي - مسارات التعلم التفاعلية",
    description: "مسارات تعليمية تفاعلية مع نظام gamification",
    type: "website",
  },
};
```

### 6. Accessibility (A11y)
- **Semantic HTML:** استخدام `<nav>`, `<main>`, `<section>`, `<article>`, إلخ
- **ARIA attributes:** `aria-label`, `aria-describedby`, `role` عند الحاجة
- **Keyboard navigation:** جميع العناصر التفاعلية قابلة للوصول بالكيبورد
- **Focus management:** `focus-visible-ring` class من `globals.css`

### 7. Responsive Design
- **Mobile-first:** التصميم يبدأ من الجوال
- **Breakpoints:** استخدام Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- **Touch-friendly:** جميع الأزرار والعناصر التفاعلية `min-height: 44px`

---

## 🔧 القواعد التقنية

### 1. TypeScript Types
يجب تعريف جميع الـ types في `components/masar/types.ts`:

```typescript
export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  type: 'matching' | 'classification' | 'multiple-choice' | 'drag-drop';
  questions: Question[];
  starsRequired?: number; // للفتح
}

export interface Question {
  id: string;
  type: string;
  // ... حسب نوع السؤال
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: BadgeCondition;
}

export interface UserProgress {
  stars: number;
  badges: string[];
  rank: 'beginner' | 'explorer' | 'genius';
  unlockedStages: string[];
  characterColor?: string;
}
```

### 2. Server Components Structure
```typescript
// app/masar/page.tsx (Server Component)
import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import TrackSelectorClient from "@/components/masar/TrackSelectorClient";
import { getTracks } from "@/lib/masar/tracks";

export const metadata: Metadata = {
  // ... metadata
};

export default async function MasarPage() {
  const tracks = getTracks(); // Server-side data fetching
  
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "دليلي - مسارات التعلم", href: "/masar" },
      ]}
    >
      <TrackSelectorClient tracks={tracks} />
    </PageLayout>
  );
}
```

### 3. Client Components Structure
```typescript
// components/masar/TrackSelectorClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Track } from "./types";
import { getUserProgress } from "@/lib/masar/storage";

interface TrackSelectorClientProps {
  tracks: Track[];
}

export default function TrackSelectorClient({ tracks }: TrackSelectorClientProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  
  useEffect(() => {
    setProgress(getUserProgress());
  }, []);
  
  // ... rest of component
}
```

### 4. Gamification System
- **النقاط (Stars):** localStorage (Client-side فقط)
- **الأوسمة (Badges):** localStorage
- **الرتب (Ranks):** محسوبة من النقاط
- **التقدم (Progress):** localStorage

**ملف:** `lib/masar/gamification.ts`
```typescript
export function calculateRank(stars: number): 'beginner' | 'explorer' | 'genius' {
  if (stars < 50) return 'beginner';
  if (stars < 150) return 'explorer';
  return 'genius';
}

export function checkBadgeConditions(progress: UserProgress, badges: Badge[]): Badge[] {
  // منطق فحص شروط الأوسمة
}
```

### 5. Storage (localStorage)
**ملف:** `lib/masar/storage.ts` (Client-side فقط)
```typescript
"use client";

const STORAGE_KEY = 'daleely-masar-progress';

export function getUserProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null;
  // ... localStorage logic
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  // ... localStorage logic
}
```

---

## 📁 الهيكل النهائي المطلوب

```
app/
└── masar/
    └── page.tsx                    # Server Component الرئيسي

components/
└── masar/
    ├── TrackSelector.tsx          # Server Component
    ├── TrackSelectorClient.tsx   # Client Component
    ├── StageSelector.tsx          # Server Component
    ├── StageSelectorClient.tsx   # Client Component
    ├── GameScreen.tsx             # Server Component
    ├── GameScreenClient.tsx      # Client Component
    ├── ProfileScreen.tsx          # Server Component
    ├── ProfileScreenClient.tsx   # Client Component
    ├── BadgeSystem.tsx           # Server Component
    ├── BadgeSystemClient.tsx     # Client Component
    ├── SmartHints.tsx            # Client Component
    ├── CharacterCustomization.tsx # Client Component
    └── types.ts                  # TypeScript types

lib/
└── masar/
    ├── tracks.ts                 # بيانات المسارات
    ├── badges.ts                 # بيانات الأوسمة
    ├── gamification.ts           # منطق Gamification
    └── storage.ts                 # localStorage helpers (Client-side)
```

---

## 🎨 التصميم والأنماط

### 1. استخدام Tailwind CSS فقط
- **لا CSS مخصص:** جميع الأنماط باستخدام Tailwind classes
- **استخدام classes من globals.css:**
  - `.btn-primary` للأزرار الأساسية
  - `.btn-secondary` للأزرار الثانوية
  - `.card` للبطاقات
  - `.focus-visible-ring` للوصولية

### 2. الألوان
- استخدام `primary-600`, `primary-700`, `primary-800` للألوان الأساسية
- استخدام `gray-50`, `gray-100`, `gray-200` للخلفيات
- استخدام `green-600`, `red-600` للنجاح/الفشل

### 3. Animations
- استخدام Framer Motion إذا كان موجوداً في الكود الأصلي
- أو استخدام CSS transitions من Tailwind
- استخدام classes من `globals.css`: `.fade-in`, `.slide-up`, `.scale-in`

---

## 🔍 الخطوات المطلوبة

### الخطوة 1: تحليل الكود الحالي
1. قراءة `index.tsx` بالكامل
2. تحديد جميع المكونات (Components)
3. تحديد جميع الـ states و hooks
4. تحديد جميع البيانات (tracks, stages, badges, etc.)
5. تحديد جميع الوظائف (functions)

### الخطوة 2: تقسيم الكود
1. **استخراج البيانات:** نقل جميع البيانات إلى `lib/masar/tracks.ts` و `lib/masar/badges.ts`
2. **استخراج Types:** تعريف جميع الـ types في `components/masar/types.ts`
3. **تقسيم المكونات:**
   - فصل كل مكون كبير إلى ملف منفصل
   - تحديد أي مكون يحتاج `"use client"`
   - إنشاء Server Components للمكونات التي لا تحتاج interactivity

### الخطوة 3: إنشاء البنية
1. إنشاء `app/masar/page.tsx` (Server Component)
2. إنشاء جميع المكونات في `components/masar/`
3. إنشاء جميع ملفات البيانات في `lib/masar/`
4. ربط كل شيء معاً

### الخطوة 4: تطبيق القواعد
1. إضافة `"use client"` فقط للمكونات التي تحتاجها
2. إضافة TypeScript types لجميع المكونات
3. إضافة metadata للصفحة الرئيسية
4. إضافة Accessibility attributes
5. التأكد من RTL في جميع المكونات

### الخطوة 5: الاختبار
1. التأكد من أن الكود يعمل بدون أخطاء
2. التأكد من أن جميع الميزات تعمل
3. التأكد من Responsive design
4. التأكد من Accessibility

---

## ✅ Checklist النهائي

قبل الانتهاء، تأكد من:

- [ ] جميع الملفات TypeScript مع types واضحة
- [ ] جميع Server Components بدون `"use client"`
- [ ] جميع Client Components مع `"use client"` في أول السطر
- [ ] جميع البيانات في `lib/masar/` (TypeScript arrays)
- [ ] localStorage فقط في Client Components
- [ ] metadata كامل للصفحة الرئيسية
- [ ] RTL في جميع المكونات (`dir="rtl"`, `lang="ar"`)
- [ ] Tailwind CSS فقط (لا CSS مخصص)
- [ ] Accessibility (ARIA, semantic HTML, keyboard navigation)
- [ ] Responsive design (Mobile-first)
- [ ] جميع المكونات قابلة لإعادة الاستخدام
- [ ] الكود منظم وقابل للقراءة
- [ ] لا توجد أخطاء TypeScript
- [ ] لا توجد console errors

---

## 📝 ملاحظات مهمة

1. **لا تغير المنطق:** الحفاظ على جميع الميزات والوظائف كما هي
2. **لا تغير التصميم:** الحفاظ على التصميم الأصلي قدر الإمكان
3. **فقط تغيير البنية:** الهدف هو تحويل البنية فقط، ليس إعادة كتابة التطبيق
4. **استخدام الكود الموجود:** لا تبتكر حلول جديدة، استخدم الكود الموجود وقسمه فقط

---

## 🚀 البدء

ابدأ بتحليل `index.tsx` وتقسيمه حسب الهيكل المطلوب أعلاه. بعد الانتهاء، قدم لي:

1. قائمة بجميع الملفات الجديدة التي أنشأتها
2. ملخص للتغييرات الرئيسية
3. أي مشاكل واجهتها وحلولها

**ابدأ الآن!**
