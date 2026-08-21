import { useMemo, useState } from "react";

export default function EmployeeCostCalculator() {
  const [baseSalary, setBaseSalary] = useState(1200000);
  const [benefitsPct, setBenefitsPct] = useState(15);
  const [taxesPct, setTaxesPct] = useState(12);
  const [overheadPct, setOverheadPct] = useState(10);
  const [equipmentCost, setEquipmentCost] = useState(80000);

  const results = useMemo(() => {
    const benefits = baseSalary * (benefitsPct / 100);
    const taxes = baseSalary * (taxesPct / 100);
    const overhead = baseSalary * (overheadPct / 100);
    const totalAnnual = baseSalary + benefits + taxes + overhead + equipmentCost;
    const loadedMultiplier = totalAnnual / baseSalary;
    const monthlyTotal = totalAnnual / 12;
    return { benefits, taxes, overhead, totalAnnual, loadedMultiplier, monthlyTotal };
  }, [baseSalary, benefitsPct, taxesPct, overheadPct, equipmentCost]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Base salary (₹/year)
          <input type="number" min="0" value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          One-time equipment/setup (₹)
          <input type="number" min="0" value={equipmentCost} onChange={(e) => setEquipmentCost(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Benefits (% of salary)
          <input type="number" min="0" value={benefitsPct} onChange={(e) => setBenefitsPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Employer taxes (% of salary)
          <input type="number" min="0" value={taxesPct} onChange={(e) => setTaxesPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Overhead — office, tools, etc. (%)
          <input type="number" min="0" value={overheadPct} onChange={(e) => setOverheadPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3">
        <p className="text-xs text-slate-400 mb-1">Total fully-loaded annual cost</p>
        <p className="text-2xl font-semibold text-indigo-400">₹{results.totalAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        <p className="text-xs text-slate-500 mt-1">{results.loadedMultiplier.toFixed(2)}x base salary · ₹{results.monthlyTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/month</p>
      </div>
      <p className="text-xs text-slate-500">A common rule of thumb is that fully-loaded cost runs 1.25–1.4x base salary — useful for budgeting hiring decisions beyond just the offer letter number.</p>
    </div>
  );
}
