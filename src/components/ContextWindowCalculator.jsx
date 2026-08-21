import { useMemo, useState } from "react";
import { models } from "../data/pricing.js";

// Rough approximation: 1 token ≈ 4 characters of English text.
const CHARS_PER_TOKEN = 4;

export default function ContextWindowCalculator() {
  const [charCount, setCharCount] = useState(20000);

  const estimatedTokens = Math.ceil(charCount / CHARS_PER_TOKEN);

  const results = useMemo(() => {
    return models.map((m) => {
      const percentUsed = (estimatedTokens / m.contextWindow) * 100;
      const fits = estimatedTokens <= m.contextWindow;
      return { ...m, percentUsed, fits };
    });
  }, [estimatedTokens]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6">
        Text length (characters)
        <input
          type="number"
          min="0"
          value={charCount}
          onChange={(e) => setCharCount(Number(e.target.value) || 0)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <span className="text-xs text-slate-500">
          Estimated ~{estimatedTokens.toLocaleString()} tokens (≈{CHARS_PER_TOKEN} chars/token)
        </span>
      </label>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Context window</th>
              <th className="py-2 pr-4">% used</th>
              <th className="py-2 pr-4">Fits?</th>
            </tr>
          </thead>
          <tbody>
            {results.map((m) => (
              <tr key={m.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{m.name}</td>
                <td className="py-2 pr-4 text-slate-400">
                  {m.contextWindow.toLocaleString()} tokens
                </td>
                <td className="py-2 pr-4">
                  <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${m.fits ? "bg-indigo-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(m.percentUsed, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {m.percentUsed.toFixed(1)}%
                  </span>
                </td>
                <td className="py-2 pr-4">
                  {m.fits ? (
                    <span className="text-emerald-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No — too large</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Token estimates are approximate. Actual tokenization varies slightly by
        model and language — use the Token Counter tool for a closer estimate.
      </p>
    </div>
  );
}
