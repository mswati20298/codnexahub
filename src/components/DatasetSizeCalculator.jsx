import { useMemo, useState } from "react";

const RECOMMENDATIONS = [
  { task: "Style/tone adjustment", min: 50, ideal: 200 },
  { task: "Simple classification", min: 100, ideal: 500 },
  { task: "Structured output formatting", min: 200, ideal: 1000 },
  { task: "Complex reasoning/domain knowledge", min: 1000, ideal: 5000 },
];

export default function DatasetSizeCalculator() {
  const [taskIndex, setTaskIndex] = useState(1);
  const [avgExampleTokens, setAvgExampleTokens] = useState(300);

  const task = RECOMMENDATIONS[taskIndex];
  const minTokens = task.min * avgExampleTokens;
  const idealTokens = task.ideal * avgExampleTokens;

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Task type
        <select value={taskIndex} onChange={(e) => setTaskIndex(Number(e.target.value))} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
          {RECOMMENDATIONS.map((r, i) => <option key={r.task} value={i}>{r.task}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-6 max-w-xs">
        Avg tokens per example
        <input type="number" min="1" value={avgExampleTokens} onChange={(e) => setAvgExampleTokens(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Minimum examples</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{task.min.toLocaleString()}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500">~{minTokens.toLocaleString()} tokens</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Ideal examples</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{task.ideal.toLocaleString()}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500">~{idealTokens.toLocaleString()} tokens</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">General guidelines based on common fine-tuning practice — actual requirements vary significantly by base model and task complexity. Quality and diversity of examples matter as much as raw count.</p>
    </div>
  );
}
