// Sound management system for educational tools

export type SoundType = "correct" | "wrong" | "click" | "complete";

class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled: boolean = false;

  constructor() {
    // Create audio elements for different sound types
    this.initializeSounds();
  }

  private initializeSounds() {
    // Using Web Audio API tones as fallback since we don't have audio files yet
    // In production, these would be replaced with actual audio files
    if (typeof window !== "undefined") {
      // Create simple tone generators
      this.sounds.set("correct", this.createTone(800, 0.2, "sine"));
      this.sounds.set("wrong", this.createTone(400, 0.2, "sawtooth"));
      this.sounds.set("click", this.createTone(600, 0.1, "sine"));
      this.sounds.set("complete", this.createTone(1000, 0.3, "sine"));
    }
  }

  private createTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine"
  ): HTMLAudioElement {
    // Create a simple audio element that will use Web Audio API
    const audio = new Audio();
    
    // For now, we'll use a data URL with a simple beep
    // In production, replace with actual audio files
    audio.src = this.generateBeepDataURL(frequency, duration, type);
    audio.volume = 0.5;
    
    return audio;
  }

  private generateBeepDataURL(
    frequency: number,
    duration: number,
    type: OscillatorType
  ): string {
    // This is a placeholder - in production, use actual audio files
    // For now, return empty string and use Web Audio API directly
    return "";
  }

  public playSound(type: SoundType): void {
    if (!this.enabled) return;

    try {
      const sound = this.sounds.get(type);
      if (sound) {
        // Reset and play
        sound.currentTime = 0;
        sound.play().catch((error) => {
          // Fallback to Web Audio API if HTMLAudioElement fails
          this.playTone(type);
        });
      } else {
        // Fallback to Web Audio API
        this.playTone(type);
      }
    } catch (error) {
      // Silent fail - don't break the app if sound fails
      console.log("Sound playback failed:", error);
    }
  }

  private playTone(type: SoundType): void {
    if (typeof window === "undefined" || !window.AudioContext) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set frequency and type based on sound type
      switch (type) {
        case "correct":
          oscillator.frequency.value = 800;
          oscillator.type = "sine";
          break;
        case "wrong":
          oscillator.frequency.value = 400;
          oscillator.type = "sawtooth";
          break;
        case "click":
          oscillator.frequency.value = 600;
          oscillator.type = "sine";
          break;
        case "complete":
          oscillator.frequency.value = 1000;
          oscillator.type = "sine";
          break;
      }

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Silent fail
      console.log("Tone generation failed:", error);
    }
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }
}

// Singleton instance
let soundManagerInstance: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManagerInstance) {
    soundManagerInstance = new SoundManager();
  }
  return soundManagerInstance;
}

// Helper functions
export function playCorrectSound(): void {
  getSoundManager().playSound("correct");
}

export function playWrongSound(): void {
  getSoundManager().playSound("wrong");
}

export function playClickSound(): void {
  getSoundManager().playSound("click");
}

export function playCompleteSound(): void {
  getSoundManager().playSound("complete");
}

export function setSoundEnabled(enabled: boolean): void {
  getSoundManager().setEnabled(enabled);
}

export function isSoundEnabled(): boolean {
  return getSoundManager().isEnabled();
}
