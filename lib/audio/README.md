# نظام النطق المتقدم (Hybrid Audio System)

## نظرة عامة

نظام هجين يجمع بين:
- **Web Speech API** (الافتراضي - يعمل حالياً)
- **الصوتيات المسجلة** (جاهز للمستقبل)

## البنية

```
lib/audio/
├── audio-files.ts          # إدارة الملفات الصوتية (جاهز للمستقبل)
├── audio-player.ts         # مشغل الصوتيات (Hybrid System)
├── speech-manager.ts       # إدارة النطق المركزي
└── speech-settings.ts     # إعدادات المستخدم (localStorage)

components/audio/
├── AudioPlayer.tsx         # مشغل الصوتيات
├── SpeakableText.tsx       # نص قابل للنطق
├── SpeakableButton.tsx     # زر مع نطق
└── QuestionWithAudio.tsx  # سؤال مع نطق
```

## الاستخدام

### 1. SpeakableText
```tsx
import SpeakableText from "@/components/audio/SpeakableText";

<SpeakableText 
  text="مرحباً بك"
  buttonPosition="inline" // "before" | "after" | "inline"
  autoSpeak={false}
/>
```

### 2. AudioPlayer
```tsx
import AudioPlayer from "@/components/audio/AudioPlayer";

<AudioPlayer text="خمسة" />
```

### 3. SpeakableButton
```tsx
import SpeakableButton from "@/components/audio/SpeakableButton";

<SpeakableButton
  text="اضغط هنا"
  onClick={() => console.log("clicked")}
  audioButtonPosition="right"
/>
```

### 4. QuestionWithAudio
```tsx
import QuestionWithAudio from "@/components/audio/QuestionWithAudio";

<QuestionWithAudio
  question="ما هو 5 + 3؟"
  autoSpeak={false}
/>
```

## إضافة الصوتيات المسجلة (للمستقبل)

1. ضع الملفات في `public/audio/`:
   - `numbers/0.mp3`, `1.mp3`, ... `100.mp3`
   - `letters/alef.mp3`, `beh.mp3`, ...
   - `operations/add.mp3`, `subtract.mp3`, ...

2. حدث `lib/audio/audio-files.ts`:
```typescript
export const audioFiles: AudioFileMap = {
  numbers: {
    0: '/audio/numbers/0.mp3',
    1: '/audio/numbers/1.mp3',
    // ...
  },
  letters: {
    'أ': '/audio/letters/alef.mp3',
    'ب': '/audio/letters/beh.mp3',
    // ...
  },
  // ...
};
```

3. النظام سيتحول تلقائياً إلى الصوتيات المسجلة عند توفرها!

## الإعدادات

```typescript
import { getUserSpeechSettings, updateUserSpeechSettings } from "@/lib/audio/speech-settings";

// الحصول على الإعدادات
const settings = getUserSpeechSettings();

// تحديث الإعدادات
updateUserSpeechSettings({
  enabled: true,
  useAudioFiles: true,
  autoSpeak: false,
  speed: 1.0,
});
```

## ملاحظات

- النظام يعمل حالياً مع Web Speech API فقط
- الصوتيات المسجلة جاهزة للاستخدام عند إضافتها
- Fallback تلقائي: صوتيات مسجلة → Web Speech API
- الإعدادات محفوظة في localStorage
