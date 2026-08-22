import { useMemo, useState } from "react";

function diffWords(a, b) {
  const wordsA = a.split(/(\s+)/);
  const wordsB = b.split(/(\s+)/);
  const maxLen = Math.max(wordsA.length, wordsB.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    if (wordsA[i] === wordsB[i]) {
      result.push({ type: "same", text: wordsA[i] ?? "" });
    } else {
      if (wordsA[i] !== undefined) result.push({ type: "removed", text: wordsA[i] });
      if (wordsB[i] !== undefined) result.push({ type: "added", text: wordsB[i] });
    }
  }
  return result;
}

const SAMPLE_A = "The quick brown fox jumps over the lazy dog.";
const SAMPLE_B = "The quick brown fox leaps over the sleepy dog.";

export default function ResponseDiffChecker() {
  const [a, setA] = useState(SAMPLE_A);
  const [b, setB] = useState(SAMPLE_B);

  const diff = useMemo(() => diffWords(a, b), [a, b]);
  const changedWords = diff.filter((d) => d.type !== "same").length;

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <textarea value={a} onChange={(e) => setA(e.target.value)} rows={6} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm" placeholder="Response A" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} rows={6} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm" placeholder="Response B" />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">{changedWords} word-level difference(s)</p>
      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-sm leading-relaxed">
        {diff.map((d, i) => (
          <span
            key={i}
            className={
              d.type === "added" ? "bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" :
              d.type === "removed" ? "bg-red-950/60 text-red-700 dark:text-red-300 line-through" :
              "text-slate-700 dark:text-slate-300"
            }
          >
            {d.text}
          </span>
        ))}
      </div>
    </div>
  );
}
