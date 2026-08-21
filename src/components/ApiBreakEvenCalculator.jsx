import { useMemo, useState } from "react";

export default function ApiBreakEvenCalculator() {
  const [requestsPerDay, setRequestsPerDay] = useState(5000);
  const [avgTokensPerRequest, setAvgTokensPerRequest] = useState(1000);
  const [apiPricePerM, setApiPricePerM] = useState(5);
  const [gpuMonthlyRent, setGpuMonthlyRent] = useState(1500);

  const results = useMemo(() => {
    const dailyTokens = requestsPerDay * avgTokensPerRequest;
    const monthlyTokens = dailyTokens * 30;
    const monthlyApiCost = (monthlyTokens / 1_000_000) * apiPricePerM;
    const isBreakEven = monthlyApiCost >= gpuMonthlyRent;
    const breakEvenRequestsPerDay = (gpuMonthlyRent / apiPricePerM) * 1_000_000 / 30 / avgTokensPerRequest;
    return { monthlyApiCost, isBreakEven, breakEvenRequestsPerDay };
  }, [requestsPerDay, avgTokensPerRequest, apiPricePerM, gpuMonthlyRent]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Requests/day
          <input type="number" min="0" value={requestsPerDay} onChange={(e) => setRequestsPerDay(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg tokens/request (in+out)
          <input type="number" min="0" value={avgTokensPerRequest} onChange={(e) => setAvgTokensPerRequest(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          API price ($/1M tokens, blended)
          <input type="number" min="0" value={apiPricePerM} onChange={(e) => setApiPricePerM(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Self-host GPU cost ($/month)
          <input type="number" min="0" value={gpuMonthlyRent} onChange={(e) => setGpuMonthlyRent(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3">
        <p className="text-xs text-slate-400 mb-1">Current monthly API cost</p>
        <p className="text-2xl font-semibold text-indigo-400">${results.monthlyApiCost.toFixed(2)}</p>
      </div>
      <p className={`text-sm ${results.isBreakEven ? "text-emerald-400" : "text-slate-300"}`}>
        {results.isBreakEven
          ? "Self-hosting is likely cheaper at this volume."
          : `You'd need ~${Math.round(results.breakEvenRequestsPerDay).toLocaleString()} requests/day for self-hosting to break even.`}
      </p>
      <p className="text-xs text-slate-500 mt-4">Simplified comparison — excludes engineering time, reliability, and scaling complexity of self-hosting.</p>
    </div>
  );
}
