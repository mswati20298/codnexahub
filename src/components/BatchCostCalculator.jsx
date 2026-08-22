import { useMemo, useState } from "react";

export default function BatchCostCalculator() {
  const [totalTokens, setTotalTokens] = useState(10_000_000);
  const [standardPricePerM, setStandardPricePerM] = useState(3);
  const [batchDiscountPct, setBatchDiscountPct] = useState(50);

  const results = useMemo(() => {
    const standardCost = (totalTokens / 1_000_000) * standardPricePerM;
    const batchPricePerM = standardPricePerM * (1 - batchDiscountPct / 100);
    const batchCost = (totalTokens / 1_000_000) * batchPricePerM;
    const savings = standardCost - batchCost;
    return { standardCost, batchCost, savings };
  }, [totalTokens, standardPricePerM, batchDiscountPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Total tokens to process
          <input type="number" min="0" value={totalTokens} onChange={(e) => setTotalTokens(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Standard price ($/1M tokens)
          <input type="number" min="0" value={standardPricePerM} onChange={(e) => setStandardPricePerM(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Batch API discount (%)
          <input type="number" min="0" max="100" value={batchDiscountPct} onChange={(e) => setBatchDiscountPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Standard (real-time) cost</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">${results.standardCost.toFixed(2)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Batch API cost</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">${results.batchCost.toFixed(2)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Savings</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">${results.savings.toFixed(2)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Most major providers offer ~50% off for asynchronous batch processing (results within hours instead of real-time) — worth using for non-interactive workloads like bulk classification or summarization.</p>
    </div>
  );
}
