import { useMemo, useState } from "react";

export default function WebhookRetryCalculator() {
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [baseDelayMin, setBaseDelayMin] = useState(1);

  const schedule = useMemo(() => {
    const list = [];
    let delay = baseDelayMin;
    let cumulative = 0;
    for (let i = 1; i <= maxAttempts; i++) {
      cumulative += delay;
      list.push({ attempt: i, delayMin: delay, cumulativeMin: cumulative });
      delay *= 2;
    }
    return list;
  }, [maxAttempts, baseDelayMin]);

  const formatMin = (min) => (min < 60 ? `${min.toFixed(min < 1 ? 1 : 0)} min` : `${(min / 60).toFixed(1)} hrs`);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Max retry attempts
          <input type="number" min="1" max="12" value={maxAttempts} onChange={(e) => setMaxAttempts(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Base delay (minutes)
          <input type="number" min="0.1" step="0.1" value={baseDelayMin} onChange={(e) => setBaseDelayMin(Number(e.target.value) || 0.1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="space-y-1">
        {schedule.map((s) => (
          <div key={s.attempt} className="flex justify-between bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-700 dark:text-slate-300">Retry {s.attempt}</span>
            <span className="text-emerald-600 dark:text-emerald-400">after {formatMin(s.delayMin)}</span>
            <span className="text-slate-500 dark:text-slate-500">total: {formatMin(s.cumulativeMin)}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">This models the exponential backoff pattern used by most webhook providers (Stripe, GitHub) for delivering failed webhooks.</p>
    </div>
  );
}
