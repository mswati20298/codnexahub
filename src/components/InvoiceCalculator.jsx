import { useMemo, useState } from "react";

export default function InvoiceCalculator() {
  const [items, setItems] = useState([
    { desc: "Web development", qty: 1, rate: 50000 },
    { desc: "Hosting setup", qty: 1, rate: 5000 },
  ]);
  const [taxPct, setTaxPct] = useState(18);

  const updateItem = (i, field, value) => {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  };
  const addItem = () => setItems((prev) => [...prev, { desc: "", qty: 1, rate: 0 }]);
  const removeItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const tax = subtotal * (taxPct / 100);
    return { subtotal, tax, total: subtotal + tax };
  }, [items, taxPct]);

  return (
    <div>
      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2">
            <input value={item.desc} onChange={(e) => updateItem(i, "desc", e.target.value)} placeholder="Description" className="flex-1 min-w-[140px] bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value) || 0)} placeholder="Qty" className="w-16 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <input type="number" value={item.rate} onChange={(e) => updateItem(i, "rate", Number(e.target.value) || 0)} placeholder="Rate" className="w-24 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <span className="text-sm text-slate-500 dark:text-slate-400 w-24 text-right">₹{(item.qty * item.rate).toLocaleString()}</span>
            <button onClick={() => removeItem(i)} className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:text-red-300">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 mb-4">+ Add line item</button>

      <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Tax rate (%)
        <input type="number" min="0" value={taxPct} onChange={(e) => setTaxPct(Number(e.target.value) || 0)} className="w-20 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-slate-100" />
      </label>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4 space-y-1">
        <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300"><span>Tax ({taxPct}%)</span><span>₹{tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
        <div className="flex justify-between text-lg font-semibold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-300 dark:border-slate-700"><span>Total</span><span>₹{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
      </div>
    </div>
  );
}
