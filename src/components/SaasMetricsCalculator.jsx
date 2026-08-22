import { useMemo, useState } from "react";

export default function SaasMetricsCalculator() {
  const [customers, setCustomers] = useState(500);
  const [avgPrice, setAvgPrice] = useState(49);
  const [churnedCustomers, setChurnedCustomers] = useState(15);

  const results = useMemo(() => {
    const mrr = customers * avgPrice;
    const arr = mrr * 12;
    const churnRate = customers > 0 ? (churnedCustomers / customers) * 100 : 0;
    const netRevenueRetention = 100 - churnRate;
    return { mrr, arr, churnRate, netRevenueRetention };
  }, [customers, avgPrice, churnedCustomers]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Active customers
          <input type="number" min="0" value={customers} onChange={(e) => setCustomers(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Avg price/customer ($/mo)
          <input type="number" min="0" value={avgPrice} onChange={(e) => setAvgPrice(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Customers churned this month
          <input type="number" min="0" value={churnedCustomers} onChange={(e) => setChurnedCustomers(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">MRR</p>
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">${results.mrr.toLocaleString()}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">ARR</p>
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">${results.arr.toLocaleString()}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly churn rate</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.churnRate.toFixed(2)}%</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Retention rate</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.netRevenueRetention.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
