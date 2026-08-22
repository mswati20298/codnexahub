import { useMemo, useState } from "react";

function analyze(text) {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const estTokens = Math.ceil(chars / 4);
  const hasExamples = /example|e\.g\.|for instance/i.test(text);
  const hasFormat = /format|json|xml|markdown/i.test(text);
  const hasConstraints = /must|should|don't|never|always/i.test(text);
  return { words, chars, estTokens, hasExamples, hasFormat, hasConstraints };
}

const SAMPLE_A = "Summarize this article.";
const SAMPLE_B = "Summarize this article in 3 bullet points, focusing on key facts and numbers. Do not include opinions.";

export default function PromptComparison() {
  const [a, setA] = useState(SAMPLE_A);
  const [b, setB] = useState(SAMPLE_B);

  const statsA = useMemo(() => analyze(a), [a]);
  const statsB = useMemo(() => analyze(b), [b]);

  const renderStats = (stats) => (
    <div className="space-y-2 text-sm">
      <p className="text-slate-700 dark:text-slate-300">{stats.words} words · ~{stats.estTokens} tokens</p>
      <ul className="space-y-1">
        <li className={stats.hasExamples ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-500"}>{stats.hasExamples ? "✓" : "○"} Includes examples</li>
        <li className={stats.hasFormat ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-500"}>{stats.hasFormat ? "✓" : "○"} Specifies output format</li>
        <li className={stats.hasConstraints ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-500"}>{stats.hasConstraints ? "✓" : "○"} States constraints</li>
      </ul>
    </div>
  );

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <textarea value={a} onChange={(e) => setA(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm mb-3" />
          {renderStats(statsA)}
        </div>
        <div>
          <textarea value={b} onChange={(e) => setB(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm mb-3" />
          {renderStats(statsB)}
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500">This compares structural signals (length, specificity, format guidance) known to correlate with better prompt outcomes — it doesn't run either prompt against a model.</p>
    </div>
  );
}
