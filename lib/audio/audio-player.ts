// Audio player for pre-recorded audio files
// Currently uses Web Speech API as fallback
// Ready for future audio files integration

import { getAudioFile, hasAudioFile } from "./audio-files";
import { speakText, speakNumber, speakLetter, speakOperation } from "../speech";
import type { MathOperation } from "../speech";

/**
 * Play audio file if exists, otherwise use Web Speech API
 */
export async function playAudioFile(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    
    audio.onended = () => resolve();
    audio.onerror = (error) => {
      console.warn(`Failed to play audio file: ${url}`, error);
      reject(error);
    };
    
    audio.play().catch((error) => {
      console.warn(`Failed to play audio: ${url}`, error);
      reject(error);
    });
  });
}

/**
 * Speak a number using audio file if available, otherwise use Web Speech API
 */
export async function speakNumberWithAudio(number: number): Promise<void> {
  const audioFile = getAudioFile("numbers", number);
  
  if (audioFile) {
    try {
      await playAudioFile(audioFile);
      return;
    } catch (error) {
      // Fallback to Web Speech API if audio file fails
      console.warn(`Audio file failed for number ${number}, using Web Speech API`);
    }
  }
  
  // Use Web Speech API as fallback
  await speakNumber(number);
}

/**
 * Speak a letter using audio file if available, otherwise use Web Speech API
 */
export async function speakLetterWithAudio(letter: string, letterName: string): Promise<void> {
  const audioFile = getAudioFile("letters", letter);
  
  if (audioFile) {
    try {
      await playAudioFile(audioFile);
      return;
    } catch (error) {
      // Fallback to Web Speech API if audio file fails
      console.warn(`Audio file failed for letter ${letter}, using Web Speech API`);
    }
  }
  
  // Use Web Speech API as fallback
  await speakLetter(letter, letterName);
}

/**
 * Speak an operation using audio file if available, otherwise use Web Speech API
 */
export async function speakOperationWithAudio(operation: MathOperation): Promise<void> {
  const audioFile = getAudioFile("operations", operation);
  
  if (audioFile) {
    try {
      await playAudioFile(audioFile);
      return;
    } catch (error) {
      // Fallback to Web Speech API if audio file fails
      console.warn(`Audio file failed for operation ${operation}, using Web Speech API`);
    }
  }
  
  // Use Web Speech API as fallback
  await speakOperation(operation);
}

/**
 * Speak text using audio file if available, otherwise use Web Speech API
 */
export async function speakTextWithAudio(text: string): Promise<void> {
  const audioFile = getAudioFile("words", text);
  
  if (audioFile) {
    try {
      await playAudioFile(audioFile);
      return;
    } catch (error) {
      // Fallback to Web Speech API if audio file fails
      console.warn(`Audio file failed for text ${text}, using Web Speech API`);
    }
  }
  
  // Use Web Speech API as fallback
  await speakText(text);
}
