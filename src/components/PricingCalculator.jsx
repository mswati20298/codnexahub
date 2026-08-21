import { useMemo, useState } from "react";
import { models } from "../data/pricing.js";

function formatUSD(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 4,
  });
}

export default function PricingCalculator() {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(100);

  const results = useMemo(() => {
    return models
      .map((m) => {
        const perRequest =
          (inputTokens / 1_000_000) * m.inputPrice +
          (outputTokens / 1_000_000) * m.outputPrice;
        const perDay = perRequest * requestsPerDay;
        const perMonth = perDay * 30;
        return { ...m, perRequest, perDay, perMonth };
      })
      .sort((a, b) => a.perMonth - b.perMonth);
  }, [inputTokens, outputTokens, requestsPerDay]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Input tokens / request
          <input
            type="number"
            min="0"
            value={inputTokens}
            onChange={(e) => setInputTokens(Number(e.target.value) || 0)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Output tokens / request
          <input
            type="number"
            min="0"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value) || 0)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Requests / day
          <input
            type="number"
            min="0"
            value={requestsPerDay}
            onChange={(e) => setRequestsPerDay(Number(e.target.value) || 0)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">Per request</th>
              <th className="py-2 pr-4">Per day</th>
              <th className="py-2 pr-4">Per month</th>
            </tr>
          </thead>
          <tbody>
            {results.map((m) => (
              <tr key={m.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{m.name}</td>
                <td className="py-2 pr-4 text-slate-400">{m.provider}</td>
                <td className="py-2 pr-4">{formatUSD(m.perRequest)}</td>
                <td className="py-2 pr-4">{formatUSD(m.perDay)}</td>
                <td className="py-2 pr-4 font-semibold text-indigo-400">
                  {formatUSD(m.perMonth)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Prices are per 1M tokens, sourced from public provider pricing pages and
        may not reflect the latest rates. Always confirm current pricing on the
        provider's official site before budgeting.
      </p>
    </div>
  );
}
