import { useMemo, useState } from "react";

export default function RunwayCalculator() {
  const [cashInBank, setCashInBank] = useState(5000000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(200000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(600000);

  const results = useMemo(() => {
    const burnRate = monthlyExpenses - monthlyRevenue;
    const runwayMonths = burnRate > 0 ? cashInBank / burnRate : Infinity;
    return { burnRate, runwayMonths };
  }, [cashInBank, monthlyRevenue, monthlyExpenses]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Cash in bank (₹)
          <input type="number" min="0" value={cashInBank} onChange={(e) => setCashInBank(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Monthly revenue (₹)
          <input type="number" min="0" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Monthly expenses (₹)
          <input type="number" min="0" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly burn rate</p>
          <p className={`text-xl font-semibold ${results.burnRate > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
            {results.burnRate > 0 ? `₹${results.burnRate.toLocaleString()}` : "Profitable"}
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Runway</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            {results.runwayMonths === Infinity ? "∞ (profitable)" : `${results.runwayMonths.toFixed(1)} months`}
          </p>
        </div>
      </div>
    </div>
  );
}
