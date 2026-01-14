// Speech Manager - Centralized speech management
// Handles both pre-recorded audio files and Web Speech API
// Ready for future audio files integration

import { 
  speakNumberWithAudio, 
  speakLetterWithAudio, 
  speakOperationWithAudio, 
  speakTextWithAudio 
} from "./audio-player";
import type { MathOperation } from "../speech";

export interface SpeechManagerSettings {
  enabled: boolean;
  useAudioFiles: boolean; // Use pre-recorded audio files if available
  fallbackToTTS: boolean; // Fallback to Web Speech API if audio file not found
}

const defaultSettings: SpeechManagerSettings = {
  enabled: true,
  useAudioFiles: true, // Will use audio files when available
  fallbackToTTS: true, // Always fallback to Web Speech API
};

let settings: SpeechManagerSettings = { ...defaultSettings };

/**
 * Initialize speech manager with settings
 */
export function initSpeechManager(customSettings?: Partial<SpeechManagerSettings>): void {
  settings = { ...defaultSettings, ...customSettings };
}

/**
 * Get current settings
 */
export function getSpeechSettings(): SpeechManagerSettings {
  return { ...settings };
}

/**
 * Update settings
 */
export function updateSpeechSettings(newSettings: Partial<SpeechManagerSettings>): void {
  settings = { ...settings, ...newSettings };
}

/**
 * Speak a number
 */
export async function speakNumber(number: number): Promise<void> {
  if (!settings.enabled) return;
  
  if (settings.useAudioFiles) {
    await speakNumberWithAudio(number);
  } else {
    const { speakNumber: speakNumberTTS } = await import("../speech");
    await speakNumberTTS(number);
  }
}

/**
 * Speak a letter
 */
export async function speakLetter(letter: string, letterName: string): Promise<void> {
  if (!settings.enabled) return;
  
  if (settings.useAudioFiles) {
    await speakLetterWithAudio(letter, letterName);
  } else {
    const { speakLetter: speakLetterTTS } = await import("../speech");
    await speakLetterTTS(letter, letterName);
  }
}

/**
 * Speak an operation
 */
export async function speakOperation(operation: MathOperation): Promise<void> {
  if (!settings.enabled) return;
  
  if (settings.useAudioFiles) {
    await speakOperationWithAudio(operation);
  } else {
    const { speakOperation: speakOperationTTS } = await import("../speech");
    await speakOperationTTS(operation);
  }
}

/**
 * Speak text
 */
export async function speakText(text: string): Promise<void> {
  if (!settings.enabled) return;
  
  if (settings.useAudioFiles) {
    await speakTextWithAudio(text);
  } else {
    const { speakText: speakTextTTS } = await import("../speech");
    await speakTextTTS(text);
  }
}
