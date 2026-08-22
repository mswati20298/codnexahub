import { useMemo, useState } from "react";

export default function CachingSavingsCalculator() {
  const [cachedTokens, setCachedTokens] = useState(5000);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [fullPricePerM, setFullPricePerM] = useState(3.0);
  const [cachedPricePerM, setCachedPricePerM] = useState(0.3);

  const results = useMemo(() => {
    const dailyTokensWithoutCache = cachedTokens * requestsPerDay;
    const costWithoutCache = (dailyTokensWithoutCache / 1_000_000) * fullPricePerM;
    const costWithCache = (cachedTokens / 1_000_000) * fullPricePerM + ((dailyTokensWithoutCache - cachedTokens) / 1_000_000) * cachedPricePerM;
    const savings = costWithoutCache - costWithCache;
    const savingsPct = costWithoutCache > 0 ? (savings / costWithoutCache) * 100 : 0;
    return { costWithoutCache, costWithCache, savings, savingsPct };
  }, [cachedTokens, requestsPerDay, fullPricePerM, cachedPricePerM]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Cached context size (tokens)
          <input type="number" min="0" value={cachedTokens} onChange={(e) => setCachedTokens(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Requests/day reusing this context
          <input type="number" min="0" value={requestsPerDay} onChange={(e) => setRequestsPerDay(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Full input price ($/1M)
          <input type="number" min="0" value={fullPricePerM} onChange={(e) => setFullPricePerM(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Cached read price ($/1M)
          <input type="number" min="0" value={cachedPricePerM} onChange={(e) => setCachedPricePerM(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Without caching</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">${results.costWithoutCache.toFixed(2)}/day</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">With caching</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">${results.costWithCache.toFixed(2)}/day</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Savings</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{results.savingsPct.toFixed(0)}%</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Prompt/context caching is most valuable when you repeatedly send the same large context (system prompt, document, few-shot examples) across many requests.</p>
    </div>
  );
}
