"use client";

// QuestionWithAudio Component
// Question display with audio playback support
// Question itself is clickable for speech
// Uses audio files if available, otherwise Web Speech API

import SpeakableText from "./SpeakableText";

interface QuestionWithAudioProps {
  question: string;
  autoSpeak?: boolean;
  showAudioButton?: boolean;
  className?: string;
  questionClassName?: string;
  clickable?: boolean; // Make question clickable (default: true)
}

export default function QuestionWithAudio({
  question,
  autoSpeak = false,
  showAudioButton = true,
  className = "",
  questionClassName = "",
  clickable = true,
}: QuestionWithAudioProps) {
  return (
    <div className={className}>
      <SpeakableText
        text={question}
        autoSpeak={autoSpeak}
        showButton={showAudioButton}
        buttonPosition="inline"
        textClassName={questionClassName}
        clickable={clickable}
      />
    </div>
  );
}
