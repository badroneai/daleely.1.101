// Speech settings management with localStorage persistence
// User preferences for speech functionality

import { updateSpeechSettings, getSpeechSettings, initSpeechManager } from "./speech-manager";

export interface UserSpeechSettings {
  enabled: boolean;
  useAudioFiles: boolean;
  autoSpeak: boolean; // Auto-speak questions/answers
  speed: number; // Speech speed (0.5 - 2.0)
}

const STORAGE_KEY = "daleely_speech_settings";

const defaultUserSettings: UserSpeechSettings = {
  enabled: true,
  useAudioFiles: true,
  autoSpeak: false,
  speed: 1.0,
};

/**
 * Load settings from localStorage
 */
export function loadSpeechSettings(): UserSpeechSettings {
  if (typeof window === "undefined") return defaultUserSettings;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultUserSettings, ...parsed };
    }
  } catch (error) {
    console.warn("Failed to load speech settings from localStorage", error);
  }
  
  return defaultUserSettings;
}

/**
 * Save settings to localStorage
 */
export function saveSpeechSettings(settings: UserSpeechSettings): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Update speech manager settings
    updateSpeechSettings({
      enabled: settings.enabled,
      useAudioFiles: settings.useAudioFiles,
    });
  } catch (error) {
    console.warn("Failed to save speech settings to localStorage", error);
  }
}

/**
 * Initialize speech settings on app load
 */
export function initSpeechSettings(): void {
  const userSettings = loadSpeechSettings();
  initSpeechManager({
    enabled: userSettings.enabled,
    useAudioFiles: userSettings.useAudioFiles,
    fallbackToTTS: true,
  });
}

/**
 * Get current user settings
 */
export function getUserSpeechSettings(): UserSpeechSettings {
  return loadSpeechSettings();
}

/**
 * Update user settings
 */
export function updateUserSpeechSettings(newSettings: Partial<UserSpeechSettings>): void {
  const current = loadSpeechSettings();
  const updated = { ...current, ...newSettings };
  saveSpeechSettings(updated);
}
