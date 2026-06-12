"use client";

// Generic content-activity player — renders any of the 5 interaction kinds
// (quiz, matching, sort, sequence, label) from data. Tap-based (no drag, iPad
// friendly). Reuses the gamification store for stars. Deterministic shuffling
// (seeded by activity id) keeps it free of Math.random-in-render.

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { recordResult } from "@/lib/gamification/progress-store";
import { toArabicDigits } from "@/lib/tools/multiplication/engine";
import type { ContentActivity, QuizQuestion, MatchPair, SortItem, LabelPoint } from "@/lib/content/types";

// --- deterministic shuffle (no Math.random) ---
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const a = arr.map((v, i) => ({ v, k: hash(seed + ":" + i) }));
  a.sort((x, y) => x.k - y.k);
  return a.map((x) => x.v);
}

const cardCorrect = "bg-green-600 text-white";
const cardWrong = "bg-red-600 text-white";
const cardIdle = "bg-gray-100 text-gray-900 hover:bg-gray-200";
const cardSel = "bg-primary-600 text-white";

function Done({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="text-center py-8" role="status" aria-live="polite">
      <div className="text-5xl mb-3" aria-hidden="true">🎉</div>
      <p className="text-2xl font-bold text-gray-900 mb-2">أحسنت! أكملت النشاط</p>
      <p className="text-amber-600 font-semibold mb-5">⭐ +١ نجمة</p>
      <button type="button" onClick={onReplay} className="btn-primary focus-visible-ring">أعد النشاط</button>
    </div>
  );
}

function QuizMode({ questions, onDone }: { questions: QuizQuestion[]; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const q = questions[i];
  const opts = seededShuffle(q.options, q.prompt);
  const done = () => (i + 1 >= questions.length ? onDone() : (setI(i + 1), setPicked(null)));
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">السؤال {toArabicDigits(i + 1)} من {toArabicDigits(questions.length)}</p>
      <p className="text-xl md:text-2xl font-bold text-gray-900 mb-5 text-center">{q.prompt}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {opts.map((o) => {
          const cls = picked == null ? cardIdle : o === q.answer ? cardCorrect : o === picked ? cardWrong : cardIdle;
          return (
            <button key={o} type="button" disabled={picked != null} onClick={() => setPicked(o)} className={`py-4 px-3 rounded-xl text-lg font-bold transition-colors focus-visible-ring ${cls}`}>
              {o}
            </button>
          );
        })}
      </div>
      <div role="status" aria-live="polite" className="mt-4 min-h-[2.5rem] text-center">
        {picked != null && (
          <>
            <p className={picked === q.answer ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
              {picked === q.answer ? "✓ صحيح" : `✗ الصحيح: ${q.answer}`}
            </p>
            {q.hint && <p className="text-gray-600 text-sm mt-1">{q.hint}</p>}
            <button type="button" onClick={done} className="btn-primary mt-3 focus-visible-ring">{i + 1 >= questions.length ? "إنهاء" : "التالي"}</button>
          </>
        )}
      </div>
    </div>
  );
}

function MatchingMode({ pairs, onDone }: { pairs: MatchPair[]; onDone: () => void }) {
  const rights = seededShuffle(pairs.map((p) => p.right), "m");
  const [selL, setSelL] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const tapRight = (r: string) => {
    if (selL == null) return;
    if (pairs[selL].right === r) {
      const m = new Set(matched); m.add(selL); setMatched(m); setSelL(null); setWrong(null);
      if (m.size === pairs.length) onDone();
    } else {
      setWrong(r); setTimeout(() => setWrong(null), 600);
    }
  };
  return (
    <div>
      <p className="text-center text-gray-600 mb-4">اضغط كلمة من اليمين ثم ما يقابلها من اليسار.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((p, idx) => (
            <button key={p.left} type="button" disabled={matched.has(idx)} onClick={() => setSelL(idx)}
              className={`w-full py-3 px-3 rounded-lg font-semibold transition-colors focus-visible-ring ${matched.has(idx) ? cardCorrect : selL === idx ? cardSel : cardIdle}`}>
              {p.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rights.map((r) => {
            const isMatched = pairs.some((p, idx) => matched.has(idx) && p.right === r);
            return (
              <button key={r} type="button" disabled={isMatched} onClick={() => tapRight(r)}
                className={`w-full py-3 px-3 rounded-lg font-semibold transition-colors focus-visible-ring ${isMatched ? cardCorrect : wrong === r ? cardWrong : cardIdle}`}>
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-3" role="status" aria-live="polite">طوبِقَ {toArabicDigits(matched.size)} من {toArabicDigits(pairs.length)}</p>
    </div>
  );
}

function SortMode({ buckets, items, onDone }: { buckets: string[]; items: SortItem[]; onDone: () => void }) {
  const order = seededShuffle(items.map((_, i) => i), "s");
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const tapBucket = (b: string) => {
    if (sel == null) return;
    if (items[sel].bucket === b) {
      const p = { ...placed, [sel]: b }; setPlaced(p); setSel(null);
      if (Object.keys(p).length === items.length) onDone();
    } else {
      setWrong(b); setTimeout(() => setWrong(null), 600);
    }
  };
  return (
    <div>
      <p className="text-center text-gray-600 mb-4">اضغط عنصرًا ثم ضعه في السلّة المناسبة.</p>
      <div className="flex flex-wrap gap-2 justify-center mb-5 min-h-[3rem]">
        {order.filter((i) => placed[i] == null).map((i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={`py-2 px-4 rounded-full font-semibold transition-colors focus-visible-ring ${sel === i ? cardSel : cardIdle}`}>
            {items[i].text}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {buckets.map((b) => (
          <button key={b} type="button" onClick={() => tapBucket(b)} className={`rounded-2xl border-2 p-3 text-right transition-colors focus-visible-ring ${wrong === b ? "border-red-500 bg-red-50" : "border-primary-200 bg-primary-50 hover:bg-primary-100"}`}>
            <p className="font-bold text-gray-900 mb-2">{b}</p>
            <div className="flex flex-wrap gap-1">
              {items.map((it, i) => placed[i] === b ? <span key={i} className="bg-green-600 text-white text-sm rounded-full px-3 py-1">{it.text}</span> : null)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SequenceMode({ items, onDone }: { items: string[]; onDone: () => void }) {
  const display = seededShuffle(items.map((text, idx) => ({ text, idx })), "q");
  const [n, setN] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [placedIdx, setPlacedIdx] = useState<Set<number>>(new Set());
  const tap = (idx: number) => {
    if (placedIdx.has(idx)) return;
    if (idx === n) {
      const p = new Set(placedIdx); p.add(idx); setPlacedIdx(p); const nn = n + 1; setN(nn);
      if (nn === items.length) onDone();
    } else {
      setWrong(idx); setTimeout(() => setWrong(null), 600);
    }
  };
  return (
    <div>
      <p className="text-center text-gray-600 mb-4">اضغط العناصر بالترتيب الصحيح (الأول فالأول).</p>
      <div className="space-y-2">
        {display.map(({ text, idx }) => {
          const placed = placedIdx.has(idx);
          const rank = placed ? idx + 1 : null;
          return (
            <button key={idx} type="button" disabled={placed} onClick={() => tap(idx)}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-semibold transition-colors focus-visible-ring ${placed ? cardCorrect : wrong === idx ? cardWrong : cardIdle}`}>
              {rank && <span className="bg-white/30 rounded-full w-7 h-7 grid place-items-center text-sm">{toArabicDigits(rank)}</span>}
              <span>{text}</span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-sm text-gray-500 mt-3" role="status" aria-live="polite">رتّبت {toArabicDigits(n)} من {toArabicDigits(items.length)}</p>
    </div>
  );
}

function LabelMode({ svg, points, onDone }: { svg: string; points: LabelPoint[]; onDone: () => void }) {
  const labels = seededShuffle(points.map((p) => p.label), "l");
  const [sel, setSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);
  const tapPoint = (i: number) => {
    if (matched.has(i) || sel == null) return;
    if (points[i].label === sel) {
      const m = new Set(matched); m.add(i); setMatched(m); setSel(null);
      if (m.size === points.length) onDone();
    } else {
      setWrong(i); setTimeout(() => setWrong(null), 600);
    }
  };
  return (
    <div>
      <p className="text-center text-gray-600 mb-4">اختر اسمًا ثم اضغط موضعه على الصورة.</p>
      <div className="relative max-w-md mx-auto mb-5">
        <div className="rounded-xl overflow-hidden border" dangerouslySetInnerHTML={{ __html: svg }} />
        {points.map((p, i) => (
          <button key={i} type="button" onClick={() => tapPoint(i)} style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-sm font-bold grid place-items-center focus-visible-ring ${matched.has(i) ? "bg-green-600 text-white" : wrong === i ? "bg-red-600 text-white" : "bg-white border-2 border-primary-500 text-primary-700"}`}>
            {matched.has(i) ? "✓" : toArabicDigits(i + 1)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {labels.map((l) => {
          const used = points.some((p, i) => matched.has(i) && p.label === l);
          return (
            <button key={l} type="button" disabled={used} onClick={() => setSel(l)}
              className={`py-2 px-4 rounded-full font-semibold transition-colors focus-visible-ring ${used ? cardCorrect : sel === l ? cardSel : cardIdle}`}>
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContentPlayer({ activity }: { activity: ContentActivity }) {
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0); // bump to remount/replay

  const finish = () => {
    if (done) return;
    setDone(true);
    recordResult("content", activity.id, true, 1);
    trackEvent("session_complete", { tool: "content", level: activity.id });
  };
  const replay = () => { setDone(false); setRound((r) => r + 1); };

  return (
    <div className="bg-white border-2 border-primary-500 rounded-xl p-5 md:p-6" key={round}>
      <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">{activity.title}</h2>
      {done ? (
        <Done onReplay={replay} />
      ) : activity.kind === "quiz" ? (
        <QuizMode questions={activity.questions} onDone={finish} />
      ) : activity.kind === "matching" ? (
        <MatchingMode pairs={activity.pairs} onDone={finish} />
      ) : activity.kind === "sort" ? (
        <SortMode buckets={activity.buckets} items={activity.items} onDone={finish} />
      ) : activity.kind === "sequence" ? (
        <SequenceMode items={activity.items} onDone={finish} />
      ) : (
        <LabelMode svg={activity.svg} points={activity.points} onDone={finish} />
      )}
    </div>
  );
}
