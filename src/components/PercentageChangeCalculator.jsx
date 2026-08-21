import { useMemo, useState } from "react";

export default function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState(80);
  const [newValue, setNewValue] = useState(100);

  const results = useMemo(() => {
    const change = newValue - oldValue;
    const pctChange = oldValue !== 0 ? (change / Math.abs(oldValue)) * 100 : 0;
    return { change, pctChange };
  }, [oldValue, newValue]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Old value
          <input type="number" value={oldValue} onChange={(e) => setOldValue(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          New value
          <input type="number" value={newValue} onChange={(e) => setNewValue(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Absolute change</p>
          <p className="text-xl font-semibold text-slate-100">{results.change > 0 ? "+" : ""}{results.change.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Percentage change</p>
          <p className={`text-xl font-semibold ${results.pctChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>{results.pctChange > 0 ? "+" : ""}{results.pctChange.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
