"use client";

// Audio Player Component
// Handles playing audio files with fallback to Web Speech API
// Ready for future audio files integration

import { useState } from "react";
import { speakTextWithAudio } from "@/lib/audio/audio-player";
import { isSpeechAvailable, isSpeechEnabled } from "@/lib/speech";

interface AudioPlayerProps {
  text: string;
  className?: string;
  icon?: string;
  disabled?: boolean;
}

export default function AudioPlayer({ 
  text, 
  className = "", 
  icon = "🔊",
  disabled = false 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = async () => {
    if (disabled || isPlaying || !text || !isSpeechEnabled()) return;
    
    setIsPlaying(true);
    setError(null);
    
    try {
      // Try audio file first, fallback to Web Speech API
      await speakTextWithAudio(text);
    } catch (err) {
      console.error("Failed to play audio:", err);
      setError("فشل تشغيل الصوت");
    } finally {
      setIsPlaying(false);
    }
  };

  if (!isSpeechAvailable() && !text) {
    return null;
  }

  const speechEnabled = isSpeechEnabled();

  return (
    <button
      onClick={handlePlay}
      disabled={disabled || isPlaying || !speechEnabled}
      className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
        isPlaying
          ? "bg-primary-200 text-primary-700"
          : "bg-primary-100 hover:bg-primary-200 text-primary-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      aria-label={`استمع: ${text}`}
      title={`استمع: ${text}`}
    >
      <span className={`text-lg ${isPlaying ? "animate-pulse" : ""}`}>
        {isPlaying ? "⏸️" : icon}
      </span>
      {error && (
        <span className="ml-2 text-xs text-red-600" role="alert">
          {error}
        </span>
      )}
    </button>
  );
}
