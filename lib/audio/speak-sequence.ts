// Cancelable speech sequencing.
//
// Replaces the old nested `setTimeout` pyramids used to chain "speak a, then
// operation, then b". A sequence runs step by step and bails out the instant its
// `AbortSignal` fires (question advanced, training stopped, component unmounted),
// so stale audio never overlaps the next question.

import { speakNumberWithAudio, speakOperationWithAudio } from "./audio-player";
import { speakText } from "../speech";
import type { MathOperation } from "../speech";

export type SpeechStep =
  | { type: "number"; value: number }
  | { type: "operation"; value: MathOperation }
  | { type: "text"; value: string }
  | { type: "pause"; ms: number };

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve();
    const id = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      resolve();
    }, { once: true });
  });
}

/** Speak the steps in order; stops early if `signal` aborts. */
export async function speakSequence(steps: SpeechStep[], signal?: AbortSignal): Promise<void> {
  for (const step of steps) {
    if (signal?.aborted) return;
    switch (step.type) {
      case "number":
        await speakNumberWithAudio(step.value);
        break;
      case "operation":
        await speakOperationWithAudio(step.value);
        break;
      case "text":
        await speakText(step.value);
        break;
      case "pause":
        await wait(step.ms, signal);
        break;
    }
  }
}
