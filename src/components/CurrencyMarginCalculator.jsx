import { useMemo, useState } from "react";

export default function CurrencyMarginCalculator() {
  const [midMarketRate, setMidMarketRate] = useState(83.5);
  const [offeredRate, setOfferedRate] = useState(81.2);
  const [amount, setAmount] = useState(1000);

  const results = useMemo(() => {
    const marginPct = ((midMarketRate - offeredRate) / midMarketRate) * 100;
    const fairValue = amount * midMarketRate;
    const actualValue = amount * offeredRate;
    const hiddenCost = fairValue - actualValue;
    return { marginPct, hiddenCost };
  }, [midMarketRate, offeredRate, amount]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Mid-market rate
          <input type="number" min="0" step="0.01" value={midMarketRate} onChange={(e) => setMidMarketRate(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Rate you're offered
          <input type="number" min="0" step="0.01" value={offeredRate} onChange={(e) => setOfferedRate(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Amount to convert
          <input type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Hidden margin</p>
          <p className="text-xl font-semibold text-red-400">{results.marginPct.toFixed(2)}%</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Cost vs mid-market rate</p>
          <p className="text-xl font-semibold text-red-400">{results.hiddenCost.toFixed(2)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4">Many currency exchange services advertise "0% fees" while marking up the exchange rate itself — this shows the real cost hidden in that spread.</p>
    </div>
  );
}
