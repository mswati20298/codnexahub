import { useMemo, useState } from "react";

export default function TokenBudgetPlanner() {
  const [monthlyBudgetUsd, setMonthlyBudgetUsd] = useState(100);
  const [inputPricePerM, setInputPricePerM] = useState(3.0);
  const [outputPricePerM, setOutputPricePerM] = useState(15.0);
  const [inputOutputRatio, setInputOutputRatio] = useState(3); // input tokens per output token

  const results = useMemo(() => {
    // Solve for total output tokens O such that:
    // (O * ratio / 1M) * inputPrice + (O / 1M) * outputPrice = budget
    const costPerOutputToken = (inputOutputRatio * inputPricePerM + outputPricePerM) / 1_000_000;
    const totalOutputTokens = costPerOutputToken > 0 ? monthlyBudgetUsd / costPerOutputToken : 0;
    const totalInputTokens = totalOutputTokens * inputOutputRatio;
    const totalRequests500 = totalOutputTokens / 500; // assuming ~500 output tokens/request
    return { totalOutputTokens, totalInputTokens, totalRequests500 };
  }, [monthlyBudgetUsd, inputPricePerM, outputPricePerM, inputOutputRatio]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Monthly budget ($)
          <input type="number" min="0" value={monthlyBudgetUsd} onChange={(e) => setMonthlyBudgetUsd(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Input:Output token ratio
          <input type="number" min="0" value={inputOutputRatio} onChange={(e) => setInputOutputRatio(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Input price ($/1M tokens)
          <input type="number" min="0" value={inputPricePerM} onChange={(e) => setInputPricePerM(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Output price ($/1M tokens)
          <input type="number" min="0" value={outputPricePerM} onChange={(e) => setOutputPricePerM(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Output tokens/month</p>
          <p className="text-lg font-semibold text-indigo-400">{Math.round(results.totalOutputTokens).toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Input tokens/month</p>
          <p className="text-lg font-semibold text-slate-100">{Math.round(results.totalInputTokens).toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">≈ Requests (@500 out tok)</p>
          <p className="text-lg font-semibold text-slate-100">{Math.round(results.totalRequests500).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
