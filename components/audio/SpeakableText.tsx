"use client";

// SpeakableText Component
// Displays text with a play button for audio playback
// Text itself is clickable for speech
// Uses audio files if available, otherwise Web Speech API

import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { getUserSpeechSettings } from "@/lib/audio/speech-settings";
import { speakTextWithAudio } from "@/lib/audio/audio-player";
import { isSpeechEnabled } from "@/lib/speech";

interface SpeakableTextProps {
  text: string;
  autoSpeak?: boolean; // Auto-speak on mount
  showButton?: boolean; // Show play button
  buttonPosition?: "inline" | "before" | "after";
  className?: string;
  textClassName?: string;
  buttonClassName?: string;
  children?: React.ReactNode; // Custom content instead of text
  clickable?: boolean; // Make text clickable (default: true)
}

export default function SpeakableText({
  text,
  autoSpeak,
  showButton = true,
  buttonPosition = "inline",
  className = "",
  textClassName = "",
  buttonClassName = "",
  children,
  clickable = true,
}: SpeakableTextProps) {
  const [hasAutoSpoken, setHasAutoSpoken] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  // Check speech enabled status and listen for changes
  useEffect(() => {
    // Initial check
    setSpeechEnabled(isSpeechEnabled());
    
    // Listen for changes (check every 200ms)
    const interval = setInterval(() => {
      setSpeechEnabled(isSpeechEnabled());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Auto-speak on mount if enabled
  useEffect(() => {
    const userSettings = getUserSpeechSettings();
    const shouldAutoSpeak = (autoSpeak ?? userSettings.autoSpeak) && !hasAutoSpoken && text && speechEnabled;
    
    if (shouldAutoSpeak) {
      setHasAutoSpoken(true);
      speakTextWithAudio(text).catch(console.error);
    }
  }, [autoSpeak, hasAutoSpoken, text, speechEnabled]);

  const handleTextClick = async () => {
    if (!clickable || !speechEnabled || isSpeaking || !text) return;
    
    setIsSpeaking(true);
    try {
      await speakTextWithAudio(text);
    } catch (error) {
      console.error("Failed to speak text:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const displayText = children || text;

  if (!showButton && !clickable) {
    return <span className={className}>{displayText}</span>;
  }

  const textElement = clickable && speechEnabled ? (
    <span
      onClick={handleTextClick}
      className={`${textClassName} ${isSpeaking ? "opacity-70" : ""} cursor-pointer hover:text-primary-600 transition-colors select-none`}
      title="اضغط للاستماع"
    >
      {displayText}
    </span>
  ) : (
    <span className={textClassName}>{displayText}</span>
  );

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {buttonPosition === "before" && speechEnabled && (
        <AudioPlayer 
          text={text} 
          className={buttonClassName}
        />
      )}
      {textElement}
      {(buttonPosition === "inline" || buttonPosition === "after") && speechEnabled && (
        <AudioPlayer 
          text={text} 
          className={buttonClassName}
        />
      )}
    </span>
  );
}
