import { useMemo, useState } from "react";

export default function QuickRequestCost() {
  const [inputTokens, setInputTokens] = useState(500);
  const [outputTokens, setOutputTokens] = useState(300);
  const [inputPrice, setInputPrice] = useState(3.0);
  const [outputPrice, setOutputPrice] = useState(15.0);

  const cost = useMemo(() => {
    return (inputTokens / 1_000_000) * inputPrice + (outputTokens / 1_000_000) * outputPrice;
  }, [inputTokens, outputTokens, inputPrice, outputPrice]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Input tokens
          <input type="number" min="0" value={inputTokens} onChange={(e) => setInputTokens(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Output tokens
          <input type="number" min="0" value={outputTokens} onChange={(e) => setOutputTokens(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Input price ($/1M)
          <input type="number" min="0" value={inputPrice} onChange={(e) => setInputPrice(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Output price ($/1M)
          <input type="number" min="0" value={outputPrice} onChange={(e) => setOutputPrice(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-400 mb-1">Cost for this request</p>
        <p className="text-2xl font-semibold text-indigo-400">${cost.toFixed(6)}</p>
      </div>
    </div>
  );
}
