// Audio files management
// This file will contain references to pre-recorded audio files
// Currently empty - ready for future audio files

export interface AudioFileMap {
  numbers?: { [key: number]: string };
  letters?: { [key: string]: string };
  operations?: { [key: string]: string };
  words?: { [key: string]: string };
  time?: { [key: string]: string };
}

// Audio files configuration
// Structure ready for future audio files
// Format: '/audio/category/filename.mp3'
export const audioFiles: AudioFileMap = {
  // Numbers: Will be added later
  // Example: numbers: { 0: '/audio/numbers/0.mp3', 1: '/audio/numbers/1.mp3', ... }
  
  // Letters: Will be added later
  // Example: letters: { 'أ': '/audio/letters/alef.mp3', 'ب': '/audio/letters/beh.mp3', ... }
  
  // Operations: Will be added later
  // Example: operations: { add: '/audio/operations/add.mp3', subtract: '/audio/operations/subtract.mp3', ... }
  
  // Words: Will be added later
  // Example: words: { correct: '/audio/words/correct.mp3', wrong: '/audio/words/wrong.mp3', ... }
  
  // Time: Will be added later
  // Example: time: { 'hour-1': '/audio/time/hour-1.mp3', ... }
};

/**
 * Check if an audio file exists for a given key
 */
export function hasAudioFile(category: keyof AudioFileMap, key: string | number): boolean {
  const categoryMap = audioFiles[category];
  if (!categoryMap) return false;
  return key in categoryMap;
}

/**
 * Get audio file path for a given key
 */
export function getAudioFile(category: keyof AudioFileMap, key: string | number): string | null {
  if (!hasAudioFile(category, key)) return null;
  const categoryMap = audioFiles[category];
  return (categoryMap as any)[key] || null;
}
