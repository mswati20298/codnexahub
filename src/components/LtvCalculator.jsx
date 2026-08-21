import { useMemo, useState } from "react";

export default function LtvCalculator() {
  const [avgOrderValue, setAvgOrderValue] = useState(1500);
  const [purchaseFrequency, setPurchaseFrequency] = useState(4);
  const [avgCustomerLifespanYears, setAvgCustomerLifespanYears] = useState(3);

  const ltv = useMemo(() => avgOrderValue * purchaseFrequency * avgCustomerLifespanYears, [avgOrderValue, purchaseFrequency, avgCustomerLifespanYears]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg order value (₹)
          <input type="number" min="0" value={avgOrderValue} onChange={(e) => setAvgOrderValue(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Purchases/year
          <input type="number" min="0" value={purchaseFrequency} onChange={(e) => setPurchaseFrequency(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg customer lifespan (years)
          <input type="number" min="0" value={avgCustomerLifespanYears} onChange={(e) => setAvgCustomerLifespanYears(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-400 mb-1">Customer Lifetime Value</p>
        <p className="text-3xl font-semibold text-indigo-400">₹{ltv.toLocaleString()}</p>
      </div>
    </div>
  );
}
