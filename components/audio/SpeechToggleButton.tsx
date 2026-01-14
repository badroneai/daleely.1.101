"use client";

// SpeechToggleButton Component
// Toggle button to enable/disable all speech on the page
// Controls all speech functionality globally

import { useState, useEffect } from "react";
import { getUserSpeechSettings, updateUserSpeechSettings } from "@/lib/audio/speech-settings";
import { setSpeechEnabled } from "@/lib/speech";

interface SpeechToggleButtonProps {
  className?: string;
  showLabel?: boolean;
  position?: "top-left" | "top-right" | "top-center" | "inline";
}

export default function SpeechToggleButton({
  className = "",
  showLabel = true,
  position = "top-right",
}: SpeechToggleButtonProps) {
  const [enabled, setEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const settings = getUserSpeechSettings();
    setEnabled(settings.enabled);
    setSpeechEnabled(settings.enabled);
    setIsLoading(false);
  }, []);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    setSpeechEnabled(newState);
    updateUserSpeechSettings({ enabled: newState });
  };

  if (isLoading) {
    return null;
  }

  const buttonContent = (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
        enabled
          ? "bg-primary-600 text-white hover:bg-primary-700"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } ${className}`}
      aria-label={enabled ? "إغلاق النطق" : "تفعيل النطق"}
      title={enabled ? "إغلاق النطق" : "تفعيل النطق"}
    >
      <span className="text-xl">{enabled ? "🔊" : "🔇"}</span>
      {showLabel && (
        <span>{enabled ? "النطق مفعّل" : "النطق معطّل"}</span>
      )}
    </button>
  );

  // Position-based rendering
  if (position === "top-left") {
    return <div className="fixed top-4 left-4 z-50">{buttonContent}</div>;
  }
  if (position === "top-right") {
    return <div className="fixed top-4 right-4 z-50">{buttonContent}</div>;
  }
  if (position === "top-center") {
    return <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">{buttonContent}</div>;
  }

  // Inline (default)
  return buttonContent;
}
