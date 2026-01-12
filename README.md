# Daleely.ai - مختبر الأدوات التعليمية

منصة تعليمية تفاعلية مجانية للأطفال من 6-12 سنة في الرياضيات واللغة العربية.

## المميزات

- ✅ أدوات تفاعلية بدون تسجيل دخول
- ✅ تصميم جوال أولاً (Mobile-First)
- ✅ SEO محسّن بالكامل
- ✅ خصوصية الأطفال محمية
- ✅ واجهة عربية بالكامل

## التقنيات المستخدمة

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React

## التثبيت والتشغيل

```bash
# تثبيت الحزم
npm install

# تشغيل المشروع في وضع التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# تشغيل المشروع بعد البناء
npm start
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## البنية

```
├── app/                    # صفحات Next.js
│   ├── tools/             # صفحات الأدوات
│   ├── math/              # Pillar الرياضيات
│   ├── privacy/           # سياسة الخصوصية
│   └── ...
├── components/             # المكونات المشتركة
│   ├── templates/          # القوالب الموحدة
│   └── tools/              # مكونات الأدوات
├── lib/                    # المكتبات والمساعدات
└── public/                 # الملفات الثابتة
```

## Sprint 1 - المكتمل

- ✅ إعداد Next.js + TypeScript + Tailwind CSS
- ✅ البنية الأساسية
- ✅ القوالب الموحدة (Tool, Pillar)
- ✅ SEO الأساسي (sitemap, robots, meta tags)
- ✅ صفحات الثقة (privacy, terms, contact)
- ✅ صفحة 404 مخصصة
- ✅ أداة جدول الضرب
- ✅ Pillar /math
- ✅ Navigation + Breadcrumbs

## الخطوات التالية

- Sprint 2: أداة اختبار الضرب + مقالات رياضيات
- Sprint 3: الجمع والطرح الذهني
- Sprint 4: قراءة الساعة + تحسينات جوال
- Sprint 5: Pillar اللغة العربية + أداتان

## الرخصة

جميع الحقوق محفوظة © 2024 Daleely.ai
