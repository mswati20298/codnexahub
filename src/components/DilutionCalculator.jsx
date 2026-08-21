import { useMemo, useState } from "react";

export default function DilutionCalculator() {
  const [currentShares, setCurrentShares] = useState(1000000);
  const [yourShares, setYourShares] = useState(50000);
  const [newInvestmentShares, setNewInvestmentShares] = useState(200000);

  const results = useMemo(() => {
    const currentPct = (yourShares / currentShares) * 100;
    const totalAfter = currentShares + newInvestmentShares;
    const newPct = (yourShares / totalAfter) * 100;
    const dilutionPct = currentPct - newPct;
    return { currentPct, newPct, dilutionPct, totalAfter };
  }, [currentShares, yourShares, newInvestmentShares]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Current total shares
          <input type="number" min="0" value={currentShares} onChange={(e) => setCurrentShares(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Your shares
          <input type="number" min="0" value={yourShares} onChange={(e) => setYourShares(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          New shares issued (funding round)
          <input type="number" min="0" value={newInvestmentShares} onChange={(e) => setNewInvestmentShares(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Current ownership</p>
          <p className="text-xl font-semibold text-slate-100">{results.currentPct.toFixed(2)}%</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Ownership after round</p>
          <p className="text-xl font-semibold text-indigo-400">{results.newPct.toFixed(2)}%</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Dilution</p>
          <p className="text-xl font-semibold text-red-400">-{results.dilutionPct.toFixed(2)} pts</p>
        </div>
      </div>
    </div>
  );
}
