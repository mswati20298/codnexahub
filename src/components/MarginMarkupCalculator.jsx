import { useMemo, useState } from "react";

export default function MarginMarkupCalculator() {
  const [cost, setCost] = useState(40);
  const [sellingPrice, setSellingPrice] = useState(60);

  const results = useMemo(() => {
    const profit = sellingPrice - cost;
    const marginPct = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const markupPct = cost > 0 ? (profit / cost) * 100 : 0;
    return { profit, marginPct, markupPct };
  }, [cost, sellingPrice]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Cost ($)
          <input type="number" min="0" value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Selling price ($)
          <input type="number" min="0" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Profit</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">${results.profit.toFixed(2)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Margin</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.marginPct.toFixed(1)}%</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Markup</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.markupPct.toFixed(1)}%</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        Margin is profit as a % of selling price; markup is profit as a % of
        cost. They're easy to confuse but give different numbers for the same sale.
      </p>
    </div>
  );
}
