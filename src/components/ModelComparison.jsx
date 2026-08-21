import { useMemo, useState } from "react";
import { models } from "../data/pricing.js";

const SORT_OPTIONS = [
  { key: "inputPrice", label: "Input price" },
  { key: "outputPrice", label: "Output price" },
  { key: "contextWindow", label: "Context window" },
];

export default function ModelComparison() {
  const [sortKey, setSortKey] = useState("inputPrice");

  const sorted = useMemo(() => {
    return [...models].sort((a, b) => a[sortKey] - b[sortKey]);
  }, [sortKey]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSortKey(opt.key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              sortKey === opt.key
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            Sort by {opt.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">Input $/1M tok</th>
              <th className="py-2 pr-4">Output $/1M tok</th>
              <th className="py-2 pr-4">Context window</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{m.name}</td>
                <td className="py-2 pr-4 text-slate-400">{m.provider}</td>
                <td className="py-2 pr-4">${m.inputPrice.toFixed(2)}</td>
                <td className="py-2 pr-4">${m.outputPrice.toFixed(2)}</td>
                <td className="py-2 pr-4">{m.contextWindow.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
