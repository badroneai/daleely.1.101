// Web Speech API implementation for Arabic text-to-speech
// This is a temporary implementation using browser's built-in TTS
// Can be replaced later with audio files or external TTS API

import type { SpeechProvider, MathOperation } from "../speech";

// Arabic number names
const arabicNumbers: { [key: number]: string } = {
  0: "صفر",
  1: "واحد",
  2: "اثنان",
  3: "ثلاثة",
  4: "أربعة",
  5: "خمسة",
  6: "ستة",
  7: "سبعة",
  8: "ثمانية",
  9: "تسعة",
  10: "عشرة",
  11: "أحد عشر",
  12: "اثنا عشر",
  13: "ثلاثة عشر",
  14: "أربعة عشر",
  15: "خمسة عشر",
  16: "ستة عشر",
  17: "سبعة عشر",
  18: "ثمانية عشر",
  19: "تسعة عشر",
  20: "عشرون",
  30: "ثلاثون",
  40: "أربعون",
  50: "خمسون",
  60: "ستون",
  70: "سبعون",
  80: "ثمانون",
  90: "تسعون",
  100: "مئة",
  200: "مئتان",
  300: "ثلاثمئة",
  400: "أربعمئة",
  500: "خمسمئة",
  600: "ستمئة",
  700: "سبعمئة",
  800: "ثمانمئة",
  900: "تسعمئة",
};

// Arabic letter names mapping
const arabicLetterNames: { [key: string]: string } = {
  أ: "ألف",
  ب: "باء",
  ت: "تاء",
  ث: "ثاء",
  ج: "جيم",
  ح: "حاء",
  خ: "خاء",
  د: "دال",
  ذ: "ذال",
  ر: "راء",
  ز: "زاي",
  س: "سين",
  ش: "شين",
  ص: "صاد",
  ض: "ضاد",
  ط: "طاء",
  ظ: "ظاء",
  ع: "عين",
  غ: "غين",
  ف: "فاء",
  ق: "قاف",
  ك: "كاف",
  ل: "لام",
  م: "ميم",
  ن: "نون",
  ه: "هاء",
  و: "واو",
  ي: "ياء",
};

export class WebSpeechProvider implements SpeechProvider {
  private enabled: boolean = false;
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private arabicVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      
      // Some browsers load voices asynchronously
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    
    this.voices = this.synth.getVoices();
    
    // Try to find an Arabic voice
    // Chrome/Edge: Look for "ar" in lang or name
    // Firefox: Look for Arabic in name
    this.arabicVoice =
      this.voices.find(
        (voice) =>
          voice.lang.startsWith("ar") ||
          voice.name.toLowerCase().includes("arabic") ||
          voice.name.toLowerCase().includes("عربي")
      ) || null;

    // Fallback to any available voice if no Arabic voice found
    if (!this.arabicVoice && this.voices.length > 0) {
      this.arabicVoice = this.voices[0];
    }
  }

  private speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth || !this.arabicVoice) {
        reject(new Error("Speech synthesis not available"));
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.arabicVoice;
      utterance.lang = "ar-SA"; // Arabic (Saudi Arabia)
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synth.speak(utterance);
    });
  }

  private numberToArabic(number: number): string {
    // Support numbers up to 999
    if (number < 0) {
      return number.toString();
    }
    
    if (number > 100 && number < 1000) {
      const hundreds = Math.floor(number / 100);
      const remainder = number % 100;
      
      if (remainder === 0) {
        return `${arabicNumbers[hundreds * 100] || `${arabicNumbers[hundreds]} مئة`}`;
      }
      
      const hundredsName = arabicNumbers[hundreds * 100] || `${arabicNumbers[hundreds]} مئة`;
      const remainderName = this.numberToArabic(remainder);
      return `${hundredsName} و ${remainderName}`;
    }
    
    if (number > 100) {
      return number.toString();
    }

    if (arabicNumbers[number]) {
      return arabicNumbers[number];
    }

    // For numbers 21-99, combine tens and ones
    if (number > 20 && number < 100) {
      const tens = Math.floor(number / 10) * 10;
      const ones = number % 10;
      
      if (ones === 0) {
        return arabicNumbers[tens] || number.toString();
      }
      
      const tensName = arabicNumbers[tens] || "";
      const onesName = arabicNumbers[ones] || "";
      
      return `${onesName} و ${tensName}`;
    }

    return number.toString();
  }

  async speakNumber(number: number): Promise<void> {
    const arabicText = this.numberToArabic(number);
    await this.speak(arabicText);
  }

  async speakLetter(letter: string, letterName: string): Promise<void> {
    // Use provided letterName, or try to find it in mapping
    const name = letterName || arabicLetterNames[letter] || letter;
    await this.speak(name);
  }

  async speakWord(word: string): Promise<void> {
    await this.speak(word);
  }

  async speakText(text: string): Promise<void> {
    await this.speak(text);
  }

  async speakOperation(operation: MathOperation): Promise<void> {
    const operationNames: { [key in MathOperation]: string } = {
      add: "زائد",
      subtract: "ناقص",
      multiply: "ضرب",
      divide: "قسمة",
    };
    const arabicText = operationNames[operation] || operation;
    await this.speak(arabicText);
  }

  isAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      this.synth !== null &&
      this.voices.length > 0
    );
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
