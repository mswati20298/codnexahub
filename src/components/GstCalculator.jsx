import { useMemo, useState } from "react";

const GST_RATES = [5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState("exclusive"); // exclusive = add GST, inclusive = extract GST

  const results = useMemo(() => {
    if (mode === "exclusive") {
      const gstAmount = amount * (rate / 100);
      return { gstAmount, total: amount + gstAmount, base: amount };
    } else {
      const base = amount / (1 + rate / 100);
      const gstAmount = amount - base;
      return { gstAmount, total: amount, base };
    }
  }, [amount, rate, mode]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {[
          { key: "exclusive", label: "Add GST (amount excludes GST)" },
          { key: "inclusive", label: "Extract GST (amount includes GST)" },
        ].map((m) => (
          <button key={m.key} onClick={() => setMode(m.key)} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === m.key ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Amount (₹)
          <input type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          GST rate
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            {GST_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Base amount</p>
          <p className="text-lg font-semibold text-slate-100">₹{results.base.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">GST amount</p>
          <p className="text-lg font-semibold text-indigo-400">₹{results.gstAmount.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Total</p>
          <p className="text-lg font-semibold text-emerald-400">₹{results.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
