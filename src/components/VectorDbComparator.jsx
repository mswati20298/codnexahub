import { useMemo, useState } from "react";
import { vectorDbs } from "../data/vectorDbs.js";

export default function VectorDbComparator() {
  const [vectorCountMillions, setVectorCountMillions] = useState(2);

  const results = useMemo(() => {
    return vectorDbs
      .map((db) => ({
        ...db,
        estMonthlyCost: db.basePerMonth + vectorCountMillions * db.pricePerMillionVectors,
      }))
      .sort((a, b) => a.estMonthlyCost - b.estMonthlyCost);
  }, [vectorCountMillions]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6 max-w-xs">
        Number of vectors (millions)
        <input
          type="number"
          min="0"
          step="0.1"
          value={vectorCountMillions}
          onChange={(e) => setVectorCountMillions(Number(e.target.value) || 0)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">Base $/month</th>
              <th className="py-2 pr-4">Est. monthly cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map((db) => (
              <tr key={db.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{db.name}</td>
                <td className="py-2 pr-4 text-slate-400">
                  {db.basePerMonth > 0 ? `$${db.basePerMonth}` : "—"}
                </td>
                <td className="py-2 pr-4 font-semibold text-indigo-400">
                  ${db.estMonthlyCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Self-hosted and pgvector options exclude server/maintenance cost
        beyond the base estimate shown. Managed provider pricing changes
        often — verify current tiers before committing.
      </p>
    </div>
  );
}
