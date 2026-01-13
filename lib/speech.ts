// Unified Speech API for educational tools
// This is the main interface that all tools should use
// Implementation can be swapped (Web Speech API, audio files, TTS API, etc.)

export type MathOperation = "add" | "subtract" | "multiply" | "divide";

export interface SpeechProvider {
  /**
   * Speak a number in Arabic
   * @param number - The number to speak (0-100+)
   */
  speakNumber(number: number): Promise<void>;

  /**
   * Speak a letter name in Arabic
   * @param letter - The Arabic letter (e.g., "أ", "ب", "ت")
   * @param letterName - The name of the letter (e.g., "ألف", "باء", "تاء")
   */
  speakLetter(letter: string, letterName: string): Promise<void>;

  /**
   * Speak a word in Arabic
   * @param word - The Arabic word to speak
   */
  speakWord(word: string): Promise<void>;

  /**
   * Speak any text in Arabic
   * @param text - The text to speak
   */
  speakText(text: string): Promise<void>;

  /**
   * Speak a math operation in Arabic
   * @param operation - The math operation ("add", "subtract", "multiply", "divide")
   */
  speakOperation(operation: MathOperation): Promise<void>;

  /**
   * Check if speech is available
   */
  isAvailable(): boolean;

  /**
   * Enable or disable speech
   */
  setEnabled(enabled: boolean): void;

  /**
   * Check if speech is enabled
   */
  isEnabled(): boolean;
}

// Import the Web Speech API implementation
import { WebSpeechProvider } from "./speech/web-speech";

// Singleton instance
let speechProviderInstance: SpeechProvider | null = null;

/**
 * Get the speech provider instance
 */
export function getSpeechProvider(): SpeechProvider {
  if (!speechProviderInstance) {
    // Use Web Speech API as default implementation
    speechProviderInstance = new WebSpeechProvider();
  }
  return speechProviderInstance;
}

/**
 * Set a custom speech provider (useful for testing or switching implementations)
 */
export function setSpeechProvider(provider: SpeechProvider): void {
  speechProviderInstance = provider;
}

// Convenience functions for easy use in components

/**
 * Speak a number in Arabic
 */
export async function speakNumber(number: number): Promise<void> {
  const provider = getSpeechProvider();
  if (provider.isEnabled() && provider.isAvailable()) {
    await provider.speakNumber(number);
  }
}

/**
 * Speak a letter name in Arabic
 */
export async function speakLetter(letter: string, letterName: string): Promise<void> {
  const provider = getSpeechProvider();
  if (provider.isEnabled() && provider.isAvailable()) {
    await provider.speakLetter(letter, letterName);
  }
}

/**
 * Speak a word in Arabic
 */
export async function speakWord(word: string): Promise<void> {
  const provider = getSpeechProvider();
  if (provider.isEnabled() && provider.isAvailable()) {
    await provider.speakWord(word);
  }
}

/**
 * Speak any text in Arabic
 */
export async function speakText(text: string): Promise<void> {
  const provider = getSpeechProvider();
  if (provider.isEnabled() && provider.isAvailable()) {
    await provider.speakText(text);
  }
}

/**
 * Speak a math operation in Arabic
 */
export async function speakOperation(operation: MathOperation): Promise<void> {
  const provider = getSpeechProvider();
  if (provider.isEnabled() && provider.isAvailable()) {
    await provider.speakOperation(operation);
  }
}

/**
 * Enable or disable speech
 */
export function setSpeechEnabled(enabled: boolean): void {
  getSpeechProvider().setEnabled(enabled);
}

/**
 * Check if speech is enabled
 */
export function isSpeechEnabled(): boolean {
  return getSpeechProvider().isEnabled();
}

/**
 * Check if speech is available
 */
export function isSpeechAvailable(): boolean {
  return getSpeechProvider().isAvailable();
}
