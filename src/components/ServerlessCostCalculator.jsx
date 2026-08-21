import { useMemo, useState } from "react";

export default function ServerlessCostCalculator() {
  const [requestsPerMonth, setRequestsPerMonth] = useState(1000000);
  const [avgDurationMs, setAvgDurationMs] = useState(200);
  const [memoryMb, setMemoryMb] = useState(512);

  const results = useMemo(() => {
    // AWS Lambda-style pricing snapshot
    const pricePerRequest = 0.0000002;
    const pricePerGbSecond = 0.0000166667;

    const gbSeconds = (memoryMb / 1024) * (avgDurationMs / 1000) * requestsPerMonth;
    const computeCost = gbSeconds * pricePerGbSecond;
    const requestCost = requestsPerMonth * pricePerRequest;
    const freeTierRequests = 1_000_000;
    const freeTierGbSeconds = 400_000;

    const billedRequests = Math.max(0, requestsPerMonth - freeTierRequests);
    const billedGbSeconds = Math.max(0, gbSeconds - freeTierGbSeconds);

    const totalCost = billedRequests * pricePerRequest + billedGbSeconds * pricePerGbSecond;

    return { computeCost, requestCost, totalCost, gbSeconds };
  }, [requestsPerMonth, avgDurationMs, memoryMb]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Requests/month
          <input type="number" min="0" value={requestsPerMonth} onChange={(e) => setRequestsPerMonth(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg duration (ms)
          <input type="number" min="1" value={avgDurationMs} onChange={(e) => setAvgDurationMs(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Memory (MB)
          <input type="number" min="128" step="64" value={memoryMb} onChange={(e) => setMemoryMb(Number(e.target.value) || 128)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3">
        <p className="text-xs text-slate-400 mb-1">Estimated monthly cost (after free tier)</p>
        <p className="text-2xl font-semibold text-indigo-400">${results.totalCost.toFixed(2)}</p>
      </div>
      <p className="text-xs text-slate-500">
        Based on an AWS Lambda-style pricing model with a free tier of 1M requests and 400,000 GB-seconds/month. Actual pricing varies by provider and region — verify before budgeting.
      </p>
    </div>
  );
}
