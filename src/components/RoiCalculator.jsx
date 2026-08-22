import { useMemo, useState } from "react";

export default function RoiCalculator() {
  const [investment, setInvestment] = useState(500000);
  const [returnValue, setReturnValue] = useState(750000);
  const [periodMonths, setPeriodMonths] = useState(12);

  const results = useMemo(() => {
    const netProfit = returnValue - investment;
    const roiPct = investment > 0 ? (netProfit / investment) * 100 : 0;
    const annualizedRoi = periodMonths > 0 ? roiPct * (12 / periodMonths) : 0;
    return { netProfit, roiPct, annualizedRoi };
  }, [investment, returnValue, periodMonths]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Investment (₹)
          <input type="number" min="0" value={investment} onChange={(e) => setInvestment(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Return value (₹)
          <input type="number" min="0" value={returnValue} onChange={(e) => setReturnValue(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Period (months)
          <input type="number" min="1" value={periodMonths} onChange={(e) => setPeriodMonths(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Net profit</p>
          <p className={`text-xl font-semibold ${results.netProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>₹{results.netProfit.toLocaleString()}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">ROI</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{results.roiPct.toFixed(1)}%</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Annualized ROI</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.annualizedRoi.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
