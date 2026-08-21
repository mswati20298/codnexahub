import { useMemo, useState } from "react";
import { embeddingModels } from "../data/embeddings.js";

export default function EmbeddingCostCalculator() {
  const [docCount, setDocCount] = useState(10000);
  const [tokensPerDoc, setTokensPerDoc] = useState(500);

  const totalTokens = docCount * tokensPerDoc;

  const results = useMemo(() => {
    return embeddingModels
      .map((m) => ({
        ...m,
        totalCost: (totalTokens / 1_000_000) * m.price,
      }))
      .sort((a, b) => a.totalCost - b.totalCost);
  }, [totalTokens]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Number of documents/chunks
          <input
            type="number"
            min="0"
            value={docCount}
            onChange={(e) => setDocCount(Number(e.target.value) || 0)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg tokens per document
          <input
            type="number"
            min="0"
            value={tokensPerDoc}
            onChange={(e) => setTokensPerDoc(Number(e.target.value) || 0)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <p className="text-sm text-slate-400 mb-4">
        Total: {totalTokens.toLocaleString()} tokens
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">$/1M tokens</th>
              <th className="py-2 pr-4">Total cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map((m) => (
              <tr key={m.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{m.name}</td>
                <td className="py-2 pr-4 text-slate-400">{m.provider}</td>
                <td className="py-2 pr-4">${m.price.toFixed(3)}</td>
                <td className="py-2 pr-4 font-semibold text-indigo-400">
                  ${m.totalCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        This is a one-time indexing cost estimate. Re-embedding on updates
        will incur additional cost. Always verify current pricing on the
        provider's site.
      </p>
    </div>
  );
}
