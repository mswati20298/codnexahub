import { useMemo, useState } from "react";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(1999);
  const [discountPct, setDiscountPct] = useState(25);

  const results = useMemo(() => {
    const discountAmount = originalPrice * (discountPct / 100);
    const finalPrice = originalPrice - discountAmount;
    return { discountAmount, finalPrice };
  }, [originalPrice, discountPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Original price (₹)
          <input type="number" min="0" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Discount (%)
          <input type="number" min="0" max="100" value={discountPct} onChange={(e) => setDiscountPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">You save</p>
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">₹{results.discountAmount.toFixed(2)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Final price</p>
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">₹{results.finalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
