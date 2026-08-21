import { useMemo, useState } from "react";

export default function LtvCacCalculator() {
  const [avgMonthlyRevenue, setAvgMonthlyRevenue] = useState(50);
  const [grossMargin, setGrossMargin] = useState(80);
  const [avgCustomerLifespanMonths, setAvgCustomerLifespanMonths] = useState(24);
  const [salesMarketingSpend, setSalesMarketingSpend] = useState(10000);
  const [newCustomers, setNewCustomers] = useState(50);

  const results = useMemo(() => {
    const ltv = avgMonthlyRevenue * (grossMargin / 100) * avgCustomerLifespanMonths;
    const cac = newCustomers > 0 ? salesMarketingSpend / newCustomers : 0;
    const ratio = cac > 0 ? ltv / cac : 0;
    return { ltv, cac, ratio };
  }, [avgMonthlyRevenue, grossMargin, avgCustomerLifespanMonths, salesMarketingSpend, newCustomers]);

  const health = results.ratio >= 3 ? { label: "Healthy (3:1+)", color: "text-emerald-400" } : results.ratio >= 1 ? { label: "Marginal", color: "text-amber-400" } : { label: "Unsustainable", color: "text-red-400" };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg monthly revenue/customer ($)
          <input type="number" min="0" value={avgMonthlyRevenue} onChange={(e) => setAvgMonthlyRevenue(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Gross margin (%)
          <input type="number" min="0" max="100" value={grossMargin} onChange={(e) => setGrossMargin(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg customer lifespan (months)
          <input type="number" min="0" value={avgCustomerLifespanMonths} onChange={(e) => setAvgCustomerLifespanMonths(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Sales & marketing spend ($)
          <input type="number" min="0" value={salesMarketingSpend} onChange={(e) => setSalesMarketingSpend(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          New customers acquired
          <input type="number" min="0" value={newCustomers} onChange={(e) => setNewCustomers(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">LTV</p>
          <p className="text-xl font-semibold text-indigo-400">${results.ltv.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">CAC</p>
          <p className="text-xl font-semibold text-indigo-400">${results.cac.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">LTV:CAC</p>
          <p className={`text-xl font-semibold ${health.color}`}>{results.ratio.toFixed(1)}:1</p>
          <p className={`text-xs ${health.color}`}>{health.label}</p>
        </div>
      </div>
    </div>
  );
}
