import { useMemo, useState } from "react";

const US_STATE_RATES = {
  California: 7.25, Texas: 6.25, "New York": 4.0, Florida: 6.0, Illinois: 6.25,
  Washington: 6.5, Colorado: 2.9, "No sales tax (custom)": 0,
};

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState(100);
  const [state, setState] = useState("California");
  const [customRate, setCustomRate] = useState(0);

  const rate = state === "No sales tax (custom)" ? customRate : US_STATE_RATES[state];

  const results = useMemo(() => {
    const tax = amount * (rate / 100);
    return { tax, total: amount + tax };
  }, [amount, rate]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Amount ($)
          <input type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          State
          <select value={state} onChange={(e) => setState(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            {Object.keys(US_STATE_RATES).map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      {state === "No sales tax (custom)" && (
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4 max-w-xs">
          Custom rate (%)
          <input type="number" min="0" value={customRate} onChange={(e) => setCustomRate(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tax ({rate}%)</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">${results.tax.toFixed(2)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">${results.total.toFixed(2)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">State rates shown are base state rates only — many US cities/counties add local tax on top. Verify the exact rate for your jurisdiction.</p>
    </div>
  );
}
