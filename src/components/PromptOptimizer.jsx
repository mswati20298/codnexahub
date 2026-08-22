import { useMemo, useState } from "react";

const FILLER_PHRASES = [
  "please note that", "it is important to", "in order to", "due to the fact that",
  "at this point in time", "for the purpose of", "in the event that", "with regard to",
];

function analyze(text) {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const foundFillers = FILLER_PHRASES.filter((f) => text.toLowerCase().includes(f));
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim());
  const avgSentenceLength = sentences.length > 0 ? words / sentences.length : 0;
  const estTokens = Math.ceil(text.length / 4);
  return { words, foundFillers, avgSentenceLength, estTokens };
}

const SAMPLE = "Please note that it is important to, in order to get good results, make sure that you provide clear instructions to the model at this point in time.";

export default function PromptOptimizer() {
  const [text, setText] = useState(SAMPLE);
  const stats = useMemo(() => analyze(text), [text]);

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm mb-4" />
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Words</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.words}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Est. tokens</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.estTokens}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Avg sentence length</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.avgSentenceLength.toFixed(1)}w</p>
        </div>
      </div>
      {stats.foundFillers.length > 0 ? (
        <div>
          <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">Filler phrases found (consider trimming):</p>
          <ul className="space-y-1">
            {stats.foundFillers.map((f) => (
              <li key={f} className="text-sm bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-1.5 text-amber-700 dark:text-amber-300">"{f}"</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-emerald-600 dark:text-emerald-400 text-sm">No common filler phrases detected.</p>
      )}
    </div>
  );
}
