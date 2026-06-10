// External store for the global "speech enabled" flag.
//
// Replaces the old per-component `setInterval` polling pattern. Components read
// the flag through `useSpeechEnabled()` (built on React's `useSyncExternalStore`,
// the SSR-safe primitive for subscribing to external state) — no polling, no
// `set-state-in-effect`.

import { useSyncExternalStore } from "react";
import { getUserSpeechSettings, updateUserSpeechSettings } from "./speech-settings";
import { setSpeechEnabled as setProviderEnabled } from "../speech";

const SETTINGS_KEY = "daleely_speech_settings";
const listeners = new Set<() => void>();
let cached: boolean | null = null;

function read(): boolean {
  if (typeof window === "undefined") return true;
  if (cached === null) cached = getUserSpeechSettings().enabled;
  return cached;
}

function emit(): void {
  for (const l of listeners) l();
}

/** Toggle speech globally: persist, update the provider singleton, notify subscribers. */
export function setSpeechEnabledGlobal(enabled: boolean): void {
  cached = enabled;
  updateUserSpeechSettings({ enabled });
  setProviderEnabled(enabled);
  emit();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === SETTINGS_KEY) {
      cached = null;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): boolean {
  return read();
}

function getServerSnapshot(): boolean {
  return true;
}

/** `[enabled, setEnabled]` — single source of truth for the speech toggle. */
export function useSpeechEnabled(): [boolean, (enabled: boolean) => void] {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return [enabled, setSpeechEnabledGlobal];
}
