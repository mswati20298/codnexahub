import { useMemo, useState } from "react";

export default function CacCalculator() {
  const [marketingSpend, setMarketingSpend] = useState(50000);
  const [salesSpend, setSalesSpend] = useState(30000);
  const [newCustomers, setNewCustomers] = useState(40);

  const cac = useMemo(() => {
    const total = marketingSpend + salesSpend;
    return newCustomers > 0 ? total / newCustomers : 0;
  }, [marketingSpend, salesSpend, newCustomers]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Marketing spend (₹)
          <input type="number" min="0" value={marketingSpend} onChange={(e) => setMarketingSpend(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Sales spend (₹)
          <input type="number" min="0" value={salesSpend} onChange={(e) => setSalesSpend(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          New customers acquired
          <input type="number" min="0" value={newCustomers} onChange={(e) => setNewCustomers(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-400 mb-1">Customer Acquisition Cost</p>
        <p className="text-3xl font-semibold text-indigo-400">₹{cac.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
}
