import { useMemo, useState } from "react";

export default function MarkupCalculator() {
  const [cost, setCost] = useState(100);
  const [markupPct, setMarkupPct] = useState(40);

  const results = useMemo(() => {
    const sellingPrice = cost * (1 + markupPct / 100);
    const profit = sellingPrice - cost;
    const marginPct = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    return { sellingPrice, profit, marginPct };
  }, [cost, markupPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Cost (₹)
          <input type="number" min="0" value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Markup (%)
          <input type="number" min="0" value={markupPct} onChange={(e) => setMarkupPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Selling price</p>
          <p className="text-xl font-semibold text-indigo-400">₹{results.sellingPrice.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Profit</p>
          <p className="text-xl font-semibold text-emerald-400">₹{results.profit.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Equivalent margin</p>
          <p className="text-xl font-semibold text-slate-100">{results.marginPct.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
