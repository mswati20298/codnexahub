import { useMemo, useState } from "react";

export default function SubscriptionProjector() {
  const [startingCustomers, setStartingCustomers] = useState(100);
  const [monthlyPrice, setMonthlyPrice] = useState(999);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState(20);
  const [monthlyChurnPct, setMonthlyChurnPct] = useState(5);
  const [months, setMonths] = useState(12);

  const projection = useMemo(() => {
    let customers = startingCustomers;
    const rows = [];
    for (let m = 1; m <= months; m++) {
      customers = customers * (1 - monthlyChurnPct / 100) + monthlyNewCustomers;
      rows.push({ month: m, customers: Math.round(customers), mrr: Math.round(customers * monthlyPrice) });
    }
    return rows;
  }, [startingCustomers, monthlyPrice, monthlyNewCustomers, monthlyChurnPct, months]);

  const final = projection[projection.length - 1];

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Starting customers
          <input type="number" min="0" value={startingCustomers} onChange={(e) => setStartingCustomers(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Price/customer/mo (₹)
          <input type="number" min="0" value={monthlyPrice} onChange={(e) => setMonthlyPrice(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          New customers/mo
          <input type="number" min="0" value={monthlyNewCustomers} onChange={(e) => setMonthlyNewCustomers(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Monthly churn (%)
          <input type="number" min="0" value={monthlyChurnPct} onChange={(e) => setMonthlyChurnPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Months to project
          <input type="number" min="1" max="36" value={months} onChange={(e) => setMonths(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4 mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Month {months} projection</p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">₹{final.mrr.toLocaleString()} MRR</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{final.customers.toLocaleString()} customers</p>
      </div>

      <div className="max-h-64 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-100 dark:bg-slate-900">
              <th className="py-1 pr-4">Month</th>
              <th className="py-1 pr-4">Customers</th>
              <th className="py-1 pr-4">MRR</th>
            </tr>
          </thead>
          <tbody>
            {projection.map((row) => (
              <tr key={row.month} className="border-b border-slate-200 dark:border-slate-800/60">
                <td className="py-1 pr-4 text-slate-700 dark:text-slate-300">{row.month}</td>
                <td className="py-1 pr-4 text-slate-700 dark:text-slate-300">{row.customers.toLocaleString()}</td>
                <td className="py-1 pr-4 text-emerald-600 dark:text-emerald-400">₹{row.mrr.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
