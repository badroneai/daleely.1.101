# Tool Playbook — the standard every interactive tool follows

**Status:** Active reference. **Reference implementation:** `multiplication-table`
(Batch 1). Replicate this shape to every other tool; do not invent per-tool
architecture.

This is the daleely-education "reference run": one tool was rebuilt to the gold
standard, the standard was written down here, and the rest replicate it.

---

## 1. Non-negotiables (from CONTEXT_PACK + child-safety)

- RTL Arabic only · no login · no PII · no ads · no external links · no open chat.
- Mobile/iPad-first, touch targets ≥ 44px, audio-first (Web Speech + audio-file fallback).
- Server Components by default; a tool's interactivity lives in one `"use client"` component.
- TypeScript strict. Reuse the shared templates (`ToolTemplate`) — no per-tool chrome.

## 2. Curriculum alignment ("قاعدة المألوف")

- Content is **original**, but every term, example, number range, and lesson order
  must match the official Saudi MoE textbook (عين) the child already studies.
  Never copy عين content; align to it.
- A tool teaches with **strategy-based levels in the book's order**, not random drill,
  and **explains the WHY** after every answer (the book's strategy), not just ✓/✗.
- Per-grade scope comes from `lib/CURRICULUM_MATRIX.ts` (`getToolScope(slug, grade)`).
  A grade with empty scope renders the empty state.

## 3. Architecture (reuse these primitives — do not re-implement)

- **Pure engine** in `lib/tools/<tool>/engine.ts`: levels, question generation,
  strategy hints, answer checking. Framework-free and unit-testable. Randomness is
  a parameter (`rnd = Math.random`) and is **only called from event handlers**,
  never during render (`react-hooks/purity`).
- **Speech** via `lib/audio/speak-sequence.ts` — a cancelable `AbortController`
  sequence. Never chain `setTimeout`s. Abort on next question / unmount.
- **Speech toggle** via `useSpeechEnabled()` (`lib/audio/speech-enabled-store.ts`).
  Never poll with `setInterval`.
- **Gamification** via `useToolProgress(slug)` + `recordResult()`
  (`lib/gamification/progress-store.ts`): stars for correct answers, streaks,
  mastery (10 correct). Ethical only — no timers, no loss/punishment, no pay-to-win.
- External stores are read through `useSyncExternalStore`, so state is SSR-safe and
  free of `set-state-in-effect`.

## 4. Accessibility

- Feedback in a `role="status" aria-live="polite"` region.
- Every input has a real `<label>` (or `sr-only`), `inputMode="numeric"` for numbers.
- Full keyboard support (`onKeyDown`, not the deprecated `onKeyPress`); visible focus
  via `focus-visible-ring`.

## 5. Verification gates (every tool PR)

`npm run lint` (0 errors) · `npm run typecheck` · `npm run build` · a runtime smoke
check of the tool page (renders, grade scope filters, no SSR crash). The 33 legacy
`react-hooks` warnings are burned down tool-by-tool as each is rebuilt to this
playbook; a rebuilt tool must add zero new warnings.

## 6. Replication checklist (per tool)

1. Read the tool's official textbook unit; capture terms + lesson order.
2. Write `lib/tools/<tool>/engine.ts` (levels + generation + hints).
3. Rebuild the `"use client"` component on the four primitives above.
4. Wire grade scope from `CURRICULUM_MATRIX`.
5. Pass the verification gates; the rebuilt tool's files must be warning-free.
