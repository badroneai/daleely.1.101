"use client";

// SpeakableButton Component
// Button with integrated audio playback
// Uses audio files if available, otherwise Web Speech API

import AudioPlayer from "./AudioPlayer";

interface SpeakableButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  showAudioButton?: boolean;
  audioButtonPosition?: "left" | "right" | "inline";
}

export default function SpeakableButton({
  text,
  onClick,
  className = "",
  buttonType = "button",
  disabled = false,
  showAudioButton = true,
  audioButtonPosition = "right",
}: SpeakableButtonProps) {
  return (
    <div className="inline-flex items-center gap-2">
      {showAudioButton && audioButtonPosition === "left" && (
        <AudioPlayer text={text} />
      )}
      <button
        type={buttonType}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {text}
      </button>
      {showAudioButton && (audioButtonPosition === "right" || audioButtonPosition === "inline") && (
        <AudioPlayer text={text} />
      )}
    </div>
  );
}
