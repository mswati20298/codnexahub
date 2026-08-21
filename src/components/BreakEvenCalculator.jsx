import { useMemo, useState } from "react";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [pricePerUnit, setPricePerUnit] = useState(50);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(20);

  const results = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : null;
    const breakEvenRevenue = breakEvenUnits !== null ? breakEvenUnits * pricePerUnit : null;
    const marginPct = pricePerUnit > 0 ? (contributionMargin / pricePerUnit) * 100 : 0;
    return { contributionMargin, breakEvenUnits, breakEvenRevenue, marginPct };
  }, [fixedCosts, pricePerUnit, variableCostPerUnit]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Fixed costs ($/month)
          <input type="number" min="0" value={fixedCosts} onChange={(e) => setFixedCosts(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Price per unit ($)
          <input type="number" min="0" value={pricePerUnit} onChange={(e) => setPricePerUnit(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Variable cost per unit ($)
          <input type="number" min="0" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      {results.breakEvenUnits === null ? (
        <p className="text-red-400 text-sm">Price must be higher than variable cost to break even.</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Break-even units</p>
            <p className="text-xl font-semibold text-indigo-400">{Math.ceil(results.breakEvenUnits).toLocaleString()}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Break-even revenue</p>
            <p className="text-xl font-semibold text-indigo-400">${results.breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Contribution margin</p>
            <p className="text-xl font-semibold text-slate-100">{results.marginPct.toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
