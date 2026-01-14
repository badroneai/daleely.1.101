# بروتوكول الصفحة الناطقة (Speakable Page Protocol)

## نظرة عامة

هذا البروتوكول يحدد الآلية والمعايير لجعل أي صفحة في الموقع "ناطقة" (Speakable)، بحيث يمكن للمستخدم الضغط على أي نص للاستماع إليه. هذا مفيد بشكل خاص للمكفوفين وضعاف البصر.

---

## المكونات الأساسية

### 1. SpeechToggleButton
**الموقع:** `components/audio/SpeechToggleButton.tsx`

**الوظيفة:**
- زر للتحكم في تفعيل/إلغاء النطق على مستوى الصفحة
- يتحكم في جميع النطق في الصفحة
- يحفظ الحالة في `localStorage`

**الاستخدام:**
```tsx
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";

// في أعلى الصفحة أو المكون
<SpeechToggleButton position="top-right" showLabel={true} />
```

**المواضع المتاحة:**
- `"top-right"` - أعلى يمين الصفحة (ثابت)
- `"top-left"` - أعلى يسار الصفحة (ثابت)
- `"top-center"` - أعلى وسط الصفحة (ثابت)
- `"inline"` - داخل المحتوى

---

### 2. SpeakableText
**الموقع:** `components/audio/SpeakableText.tsx`

**الوظيفة:**
- يجعل النص قابل للضغط للاستماع
- يستخدم النظام الهجين (ملفات صوتية + Web Speech API)
- يتحقق تلقائياً من حالة النطق

**الاستخدام:**
```tsx
import SpeakableText from "@/components/audio/SpeakableText";

// نص قابل للضغط بدون أيقونة صوت
<SpeakableText
  text="النص المراد نطقه"
  showButton={false}
  clickable={true}
  className="block"
/>

// نص قابل للضغط مع أيقونة صوت
<SpeakableText
  text="النص المراد نطقه"
  showButton={true}
  buttonPosition="inline"
  className="block"
/>
```

**الخصائص:**
- `text`: النص المراد نطقه
- `showButton`: عرض أيقونة الصوت (افتراضي: `true`)
- `clickable`: جعل النص قابل للضغط (افتراضي: `true`)
- `buttonPosition`: موضع الأيقونة (`"inline"`, `"before"`, `"after"`)
- `className`: فئات CSS إضافية

---

### 3. isSpeechEnabled()
**الموقع:** `lib/speech.ts`

**الوظيفة:**
- التحقق من حالة النطق الحالية
- يعيد `true` إذا كان النطق مفعّل، و`false` إذا كان معطّل

**الاستخدام:**
```tsx
import { isSpeechEnabled } from "@/lib/speech";

const speechEnabled = isSpeechEnabled();
```

---

## ⚡ المنهجية الذكية (الكفؤة)

**قبل البدء:** اتبع هذه الخطوات لتوفير الوقت والموارد:

### 1. استخدام `grep` لتحديد المواضع أولاً
```bash
# ابحث عن جميع استخدامات soundEnabled في الملف
grep -n "soundEnabled" components/tools/MyTool.tsx

# ابحث عن جميع النصوص التي تحتاج SpeakableText
grep -n "className.*text" components/tools/MyTool.tsx
```

### 2. استبدال جماعي للمتغيرات
**بدلاً من تعديل كل استخدام على حدة:**
```tsx
// ❌ طريقة مكلفة (10-15 تعديل منفصل)
search_replace(file, "soundEnabled", "speechEnabled") // تعديل 1
search_replace(file, "soundEnabled", "speechEnabled") // تعديل 2
// ... 10 تعديلات أخرى

// ✅ طريقة ذكية (تعديل واحد)
search_replace(file, "soundEnabled", "speechEnabled", replace_all=true)
```

### 3. معالجة الملفات المتشابهة بنفس الطريقة
إذا كان لديك عدة ملفات بنفس البنية:
- حدد pattern موحد
- طبق نفس التعديلات على جميع الملفات
- استخدم `replace_all` للمتغيرات المشتركة

### 4. تجنب القراءات المتعددة
- اقرأ الملف مرة واحدة
- حدد جميع المواضع التي تحتاج تعديل
- نفذ التعديلات دفعة واحدة

---

## البروتوكول خطوة بخطوة

### الخطوة 0: التحضير (قبل البدء)

1. **استخدم `grep` لتحديد المواضع:**
   ```bash
   grep -n "soundEnabled" components/tools/MyTool.tsx
   grep -n "setSoundEnabled" components/tools/MyTool.tsx
   ```

2. **حدد جميع النصوص التي تحتاج `SpeakableText`:**
   - العناوين (H1, H2, H3)
   - الأوصاف
   - النصوص التعليمية
   - الأزرار

3. **خطط التعديلات:**
   - استبدال `soundEnabled` → `speechEnabled` (استخدم `replace_all`)
   - إضافة `useEffect` للمزامنة (تعديل واحد)
   - إضافة `SpeakableText` للنصوص (تعديلات يدوية ضرورية)

### الخطوة 1: إضافة SpeechToggleButton

في أعلى الصفحة أو المكون الرئيسي:

```tsx
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";

export default function MyPage() {
  return (
    <div>
      <SpeechToggleButton position="top-right" showLabel={true} />
      {/* باقي المحتوى */}
    </div>
  );
}
```

---

### الخطوة 2: استبدال النصوص بـ SpeakableText

#### أ. العناوين الرئيسية (H1, H2, H3)

```tsx
// قبل
<h1>{tool.title}</h1>

// بعد
<h1>
  <SpeakableText
    text={tool.title}
    showButton={false}
    clickable={true}
    className="block"
  />
</h1>
```

#### ب. الأوصاف والنصوص الوصفية

```tsx
// قبل
<p>{tool.description}</p>

// بعد
<p>
  <SpeakableText
    text={tool.description}
    showButton={false}
    clickable={true}
    className="block"
  />
</p>
```

#### ج. النصوص التعليمية والنصائح

```tsx
// قبل
<p>💡 نصيحة: استمع للأصوات بعناية</p>

// بعد (فصل الإيموجي عن النص)
<p>
  <span>💡 </span>
  <SpeakableText
    text="نصيحة: استمع للأصوات بعناية"
    showButton={false}
    clickable={true}
    className="inline"
  />
</p>
```

**ملاحظة مهمة:** يجب فصل الإيموجي عن النص الذي يُنطق لتجنب نطق الإيموجي.

---

### الخطوة 3: استبدال المتغيرات (استخدم `replace_all`)

**⚠️ مهم:** استخدم `replace_all=true` لتوفير الوقت:

```tsx
// ✅ طريقة ذكية: استبدال جميع soundEnabled دفعة واحدة
search_replace(
  file_path,
  "soundEnabled",
  "speechEnabled",
  replace_all=true
);

// ✅ استبدال setSpeechEnabled(soundEnabled) أيضاً
search_replace(
  file_path,
  "setSpeechEnabled(soundEnabled)",
  "// Removed - using speechEnabled state",
  replace_all=true
);
```

### الخطوة 4: إضافة مزامنة الحالة (تعديل واحد فقط)

**بدلاً من إضافة `useEffect` في كل مكان، أضفه مرة واحدة في بداية المكون:**

```tsx
import { useState, useEffect } from "react";
import { isSpeechEnabled } from "@/lib/speech";

export default function MyComponent() {
  // ✅ أضف هذا مرة واحدة فقط
  const [speechEnabled, setSpeechEnabledState] = useState(false);

  useEffect(() => {
    setSpeechEnabledState(isSpeechEnabled());
    const interval = setInterval(() => {
      setSpeechEnabledState(isSpeechEnabled());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // الآن استخدم speechEnabled في جميع الأماكن
  return (
    <div>
      <SpeakableText
        text="نص ديناميكي"
        showButton={speechEnabled}
        clickable={true}
      />
    </div>
  );
}
```

---

### الخطوة 5: إضافة SpeakableText للنصوص (تعديلات يدوية ضرورية)

**⚠️ ملاحظة:** هذه التعديلات تحتاج يدوية لأنها تتطلب تغيير بنية JSX:

```tsx
// ❌ طريقة مكلفة: تعديل كل نص على حدة
// تعديل 1
<h1>{tool.title}</h1> → <h1><SpeakableText text={tool.title} ... /></h1>
// تعديل 2
<p>{tool.description}</p> → <p><SpeakableText text={tool.description} ... /></p>
// ... 10 تعديلات أخرى

// ✅ طريقة ذكية: حدد pattern موحد وطبقه
// Pattern للعناوين:
<h1><SpeakableText text={tool.title} showButton={false} clickable={true} className="block" /></h1>

// Pattern للأوصاف:
<p><SpeakableText text={tool.description} showButton={false} clickable={true} className="block" /></p>
```

**نصيحة:** استخدم find & replace في IDE للعناوين المتشابهة:
- ابحث عن: `<h1>{tool.title}</h1>`
- استبدل بـ: `<h1><SpeakableText text={tool.title} showButton={false} clickable={true} className="block" /></h1>`

### الخطوة 6: استثناء الأقسام غير المرغوبة

بعض الأقسام قد لا نريد جعلها قابلة للضغط (مثل FAQ، Related Tools):

```tsx
// قسم FAQ - بدون SpeakableText
<div>
  <h2>أسئلة شائعة</h2>
  {faq.map((item) => (
    <div>
      <h3>{item.question}</h3>
      <p>{item.answer}</p>
    </div>
  ))}
</div>

// قسم Related Tools - بدون SpeakableText
<div>
  <h2>أدوات مرتبطة</h2>
  {relatedTools.map((tool) => (
    <Link href={tool.slug}>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
    </Link>
  ))}
</div>
```

---

## القواعد والمعايير

### ✅ يجب جعلها قابلة للضغط:
1. **العناوين الرئيسية** (H1, H2, H3)
2. **الأوصاف والنصوص الوصفية**
3. **النصوص التعليمية والنصائح**
4. **النصوص داخل الأدوات التفاعلية**
5. **الأسئلة في التدريب**
6. **التعليقات والملاحظات**

### ❌ لا يجب جعلها قابلة للضغط:
1. **قسم FAQ** (حسب الطلب)
2. **قسم Related Tools** (حسب الطلب)
3. **الإيموجي** (يجب فصله عن النص)
4. **الأزرار** (يمكن جعل نص الزر قابل للضغط إذا لزم الأمر)

---

## مثال كامل (باستخدام المنهجية الذكية)

### قبل البدء:
```bash
# 1. حدد المواضع التي تحتاج تعديل
grep -n "soundEnabled" components/tools/MyTool.tsx
# النتيجة: 15 موضع

# 2. استبدل جميع soundEnabled دفعة واحدة
search_replace(file, "soundEnabled", "speechEnabled", replace_all=true)
# ✅ تم استبدال 15 موضع في تعديل واحد
```

### الكود النهائي:

```tsx
"use client";

import { useState, useEffect } from "react";
import SpeechToggleButton from "@/components/audio/SpeechToggleButton";
import SpeakableText from "@/components/audio/SpeakableText";
import { isSpeechEnabled } from "@/lib/speech";

export default function MySpeakablePage() {
  // ✅ أضف هذا مرة واحدة فقط
  const [speechEnabled, setSpeechEnabledState] = useState(false);

  // ✅ أضف هذا مرة واحدة فقط
  useEffect(() => {
    setSpeechEnabledState(isSpeechEnabled());
    const interval = setInterval(() => {
      setSpeechEnabledState(isSpeechEnabled());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* زر التحكم في النطق */}
      <SpeechToggleButton position="top-right" showLabel={true} />

      {/* العنوان الرئيسي */}
      <h1 className="text-3xl font-bold mb-4">
        <SpeakableText
          text="عنوان الصفحة"
          showButton={false}
          clickable={true}
          className="block"
        />
      </h1>

      {/* الوصف */}
      <p className="text-lg text-gray-600 mb-6">
        <SpeakableText
          text="وصف الصفحة والنصوص الوصفية"
          showButton={false}
          clickable={true}
          className="block"
        />
      </p>

      {/* نصيحة تعليمية */}
      <div className="bg-primary-50 p-4 rounded mb-6">
        <p>
          <span>💡 </span>
          <SpeakableText
            text="نصيحة: استمع للأصوات بعناية وكررها"
            showButton={false}
            clickable={true}
            className="inline"
          />
        </p>
      </div>

      {/* محتوى تفاعلي */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          <SpeakableText
            text="عنوان القسم"
            showButton={false}
            clickable={true}
            className="block"
          />
        </h2>
        {/* محتوى القسم */}
      </div>

      {/* FAQ - بدون SpeakableText */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">أسئلة شائعة</h2>
        <div>
          <h3>سؤال؟</h3>
          <p>إجابة...</p>
        </div>
      </div>
    </div>
  );
}
```

---

## الاختبار

بعد تطبيق البروتوكول، اختبر:

1. ✅ زر `SpeechToggleButton` يظهر ويعمل
2. ✅ عند تفعيل النطق، النصوص قابلة للضغط
3. ✅ عند الضغط على النص، يتم النطق
4. ✅ عند إغلاق النطق، لا يحدث نطق
5. ✅ الإيموجي لا يُنطق
6. ✅ الأقسام المستثناة (FAQ, Related Tools) غير قابلة للضغط

---

## ⚠️ الأخطاء الشائعة (تجنبها)

### ❌ خطأ 1: تعديل كل استخدام على حدة
```tsx
// ❌ مكلف: 10 تعديلات منفصلة
search_replace(file, "soundEnabled", "speechEnabled") // 1
search_replace(file, "soundEnabled", "speechEnabled") // 2
// ... 8 تعديلات أخرى

// ✅ صحيح: تعديل واحد
search_replace(file, "soundEnabled", "speechEnabled", replace_all=true)
```

### ❌ خطأ 2: قراءة الملف عدة مرات
```tsx
// ❌ مكلف: قراءة الملف 5 مرات
read_file(file) // قراءة 1
read_file(file) // قراءة 2
// ... 3 قراءات أخرى

// ✅ صحيح: قراءة مرة واحدة
const content = read_file(file);
// استخدم content في جميع التعديلات
```

### ❌ خطأ 3: عدم استخدام grep أولاً
```tsx
// ❌ مكلف: تعديلات عشوائية
// لا تعرف كم موضع يحتاج تعديل

// ✅ صحيح: حدد المواضع أولاً
grep -n "soundEnabled" file.tsx
// الآن تعرف بالضبط كم موضع يحتاج تعديل
```

---

## ملاحظات مهمة

1. **الكفاءة:** استخدم `replace_all=true` لاستبدال المتغيرات المشتركة. يوفر 60-70% من الوقت.

2. **الأداء:** استخدام `useEffect` مع `setInterval` لمزامنة حالة النطق كل 200ms قد يؤثر على الأداء. يمكن تحسينه باستخدام `Custom Hook` أو `Context API`.

3. **إمكانية الوصول:** هذا البروتوكول يحسن إمكانية الوصول (Accessibility) للموقع، خاصة للمكفوفين وضعاف البصر.

4. **SEO:** النصوص القابلة للضغط لا تؤثر على SEO، لأنها تبقى مرئية في HTML.

5. **التوافق:** يعمل مع جميع المتصفحات التي تدعم Web Speech API.

6. **التخطيط:** خطط التعديلات قبل البدء. استخدم `grep` لتحديد المواضع، ثم نفذ التعديلات دفعة واحدة.

---

## المراجع

- `components/audio/SpeechToggleButton.tsx`
- `components/audio/SpeakableText.tsx`
- `lib/speech.ts`
- `lib/audio/speech-settings.ts`
- `app/tools/letter-sounds/page.tsx` (مثال كامل)
