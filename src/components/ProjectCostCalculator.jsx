import { useMemo, useState } from "react";

export default function ProjectCostCalculator() {
  const [hours, setHours] = useState(120);
  const [hourlyRate, setHourlyRate] = useState(1500);
  const [toolsCost, setToolsCost] = useState(5000);
  const [contingencyPct, setContingencyPct] = useState(15);
  const [profitMarginPct, setProfitMarginPct] = useState(20);

  const results = useMemo(() => {
    const laborCost = hours * hourlyRate;
    const baseCost = laborCost + toolsCost;
    const withContingency = baseCost * (1 + contingencyPct / 100);
    const finalPrice = withContingency / (1 - profitMarginPct / 100);
    return { laborCost, baseCost, withContingency, finalPrice };
  }, [hours, hourlyRate, toolsCost, contingencyPct, profitMarginPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Estimated hours
          <input type="number" min="0" value={hours} onChange={(e) => setHours(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Hourly rate (₹)
          <input type="number" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Tools/software cost (₹)
          <input type="number" min="0" value={toolsCost} onChange={(e) => setToolsCost(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Contingency buffer (%)
          <input type="number" min="0" value={contingencyPct} onChange={(e) => setContingencyPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Target profit margin (%)
          <input type="number" min="0" max="99" value={profitMarginPct} onChange={(e) => setProfitMarginPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Base cost (labor + tools)</p>
          <p className="text-lg font-semibold text-slate-100">₹{results.baseCost.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">With contingency</p>
          <p className="text-lg font-semibold text-slate-100">₹{results.withContingency.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:col-span-2">
          <p className="text-xs text-slate-400 mb-1">Quote to client (with profit margin)</p>
          <p className="text-2xl font-semibold text-indigo-400">₹{results.finalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
    </div>
  );
}
