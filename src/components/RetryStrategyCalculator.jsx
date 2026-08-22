import { useMemo, useState } from "react";

export default function RetryStrategyCalculator() {
  const [baseDelayMs, setBaseDelayMs] = useState(1000);
  const [maxRetries, setMaxRetries] = useState(5);
  const [multiplier, setMultiplier] = useState(2);

  const attempts = useMemo(() => {
    const list = [];
    let delay = baseDelayMs;
    let cumulative = 0;
    for (let i = 1; i <= maxRetries; i++) {
      cumulative += delay;
      list.push({ attempt: i, delayMs: delay, cumulativeMs: cumulative });
      delay = delay * multiplier;
    }
    return list;
  }, [baseDelayMs, maxRetries, multiplier]);

  const formatMs = (ms) => (ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Base delay (ms)
          <input type="number" min="1" value={baseDelayMs} onChange={(e) => setBaseDelayMs(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Max retries
          <input type="number" min="1" max="10" value={maxRetries} onChange={(e) => setMaxRetries(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Backoff multiplier
          <input type="number" min="1" step="0.1" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="space-y-1">
        {attempts.map((a) => (
          <div key={a.attempt} className="flex justify-between bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-700 dark:text-slate-300">Attempt {a.attempt}</span>
            <span className="text-emerald-600 dark:text-emerald-400">wait {formatMs(a.delayMs)}</span>
            <span className="text-slate-500 dark:text-slate-500">total: {formatMs(a.cumulativeMs)}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Add random jitter (±20%) to each delay in production to avoid multiple clients retrying in sync ("thundering herd").</p>
    </div>
  );
}
