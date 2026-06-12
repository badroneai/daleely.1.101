"use client";

// "Teach me first" — a worked example generated from the tool's own engine.
// Shows the problem, reveals the method (the book strategy), then the answer,
// before the child practises. Turns each tool into a tutor, not just a quiz.

import { useState } from "react";

export interface TeachSample {
  prompt: string;
  answer: string;
  hint: string;
}

const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function arabize(s: string): string {
  return s.replace(/[0-9]/g, (d) => AR[Number(d)]);
}

export default function TeachExample({
  sample,
  onAnother,
  onDone,
}: {
  sample: TeachSample;
  onAnother: () => void;
  onDone: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-white border-2 border-primary-500 rounded-xl p-6 text-center">
      <p className="text-primary-700 font-semibold mb-3">📚 لنتعلّم معًا — مثال محلول</p>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-relaxed">{arabize(sample.prompt)}</p>

      {!revealed ? (
        <button type="button" onClick={() => setRevealed(true)} className="btn-primary text-lg px-8 py-4 focus-visible-ring">
          كيف نحلّها؟
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-sky-50 p-4 text-right">
            <p className="text-sm font-bold text-sky-700 mb-1">الطريقة</p>
            <p className="text-gray-800 leading-relaxed">{arabize(sample.hint)}</p>
          </div>
          <p className="text-xl font-bold text-green-700">الناتج: {arabize(sample.answer)}</p>
          <div className="flex gap-3 justify-center pt-1">
            <button type="button" onClick={onAnother} className="btn-secondary focus-visible-ring">مثال آخر</button>
            <button type="button" onClick={onDone} className="btn-primary focus-visible-ring">الآن جرّب بنفسك ←</button>
          </div>
        </div>
      )}
    </div>
  );
}
