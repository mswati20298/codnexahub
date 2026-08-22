import { useMemo, useState } from "react";

export default function ApiPricingBreakEven() {
  const [fixedCostsMonthly, setFixedCostsMonthly] = useState(50000);
  const [costPerRequest, setCostPerRequest] = useState(0.02);
  const [pricePerRequest, setPricePerRequest] = useState(0.05);

  const results = useMemo(() => {
    const marginPerRequest = pricePerRequest - costPerRequest;
    const breakEvenRequests = marginPerRequest > 0 ? fixedCostsMonthly / marginPerRequest : null;
    return { marginPerRequest, breakEvenRequests };
  }, [fixedCostsMonthly, costPerRequest, pricePerRequest]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Fixed costs/month (₹)
          <input type="number" min="0" value={fixedCostsMonthly} onChange={(e) => setFixedCostsMonthly(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Cost per request (₹)
          <input type="number" min="0" step="0.001" value={costPerRequest} onChange={(e) => setCostPerRequest(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Price charged per request (₹)
          <input type="number" min="0" step="0.001" value={pricePerRequest} onChange={(e) => setPricePerRequest(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      {results.breakEvenRequests === null ? (
        <p className="text-red-600 dark:text-red-400 text-sm">Price must exceed cost per request to ever break even.</p>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Break-even requests/month</p>
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{Math.ceil(results.breakEvenRequests).toLocaleString()}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Margin per request: ₹{results.marginPerRequest.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}
