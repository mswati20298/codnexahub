import { useMemo, useState } from "react";

export default function TimeoutCalculator() {
  const [p99LatencyMs, setP99LatencyMs] = useState(800);
  const [retries, setRetries] = useState(2);
  const [bufferPct, setBufferPct] = useState(50);

  const results = useMemo(() => {
    const perAttemptTimeout = Math.round(p99LatencyMs * (1 + bufferPct / 100));
    const worstCaseTotal = perAttemptTimeout * (retries + 1);
    return { perAttemptTimeout, worstCaseTotal };
  }, [p99LatencyMs, retries, bufferPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          P99 latency (ms)
          <input type="number" min="1" value={p99LatencyMs} onChange={(e) => setP99LatencyMs(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Retry attempts
          <input type="number" min="0" value={retries} onChange={(e) => setRetries(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Safety buffer (%)
          <input type="number" min="0" value={bufferPct} onChange={(e) => setBufferPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Recommended timeout/attempt</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{results.perAttemptTimeout} ms</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Worst-case total (with retries)</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.worstCaseTotal} ms</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Setting timeout too close to your p99 latency causes false timeouts under normal load spikes — a buffer accounts for natural variance.</p>
    </div>
  );
}
