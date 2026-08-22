import { useMemo, useState } from "react";

export default function LatencyEstimator() {
  const [outputTokens, setOutputTokens] = useState(500);
  const [tokensPerSecond, setTokensPerSecond] = useState(60);
  const [networkLatencyMs, setNetworkLatencyMs] = useState(200);
  const [timeToFirstTokenMs, setTimeToFirstTokenMs] = useState(400);

  const results = useMemo(() => {
    const generationTimeMs = (outputTokens / tokensPerSecond) * 1000;
    const totalMs = networkLatencyMs + timeToFirstTokenMs + generationTimeMs;
    return { generationTimeMs, totalMs };
  }, [outputTokens, tokensPerSecond, networkLatencyMs, timeToFirstTokenMs]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Expected output tokens
          <input type="number" min="0" value={outputTokens} onChange={(e) => setOutputTokens(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Generation speed (tokens/sec)
          <input type="number" min="1" value={tokensPerSecond} onChange={(e) => setTokensPerSecond(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Network round-trip (ms)
          <input type="number" min="0" value={networkLatencyMs} onChange={(e) => setNetworkLatencyMs(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Time to first token (ms)
          <input type="number" min="0" value={timeToFirstTokenMs} onChange={(e) => setTimeToFirstTokenMs(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Generation time</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{(results.generationTimeMs / 1000).toFixed(2)}s</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Est. total response time</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{(results.totalMs / 1000).toFixed(2)}s</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">If streaming, users perceive time-to-first-token as the wait, not total time — factor that into UX decisions around loading states.</p>
    </div>
  );
}
