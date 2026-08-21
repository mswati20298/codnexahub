import { useMemo, useState } from "react";

const PROVIDERS = [
  { id: "s3-standard", name: "AWS S3 Standard", pricePerGb: 0.023 },
  { id: "s3-ia", name: "AWS S3 Infrequent Access", pricePerGb: 0.0125 },
  { id: "gcs-standard", name: "Google Cloud Storage Standard", pricePerGb: 0.020 },
  { id: "azure-hot", name: "Azure Blob (Hot tier)", pricePerGb: 0.0184 },
  { id: "azure-cool", name: "Azure Blob (Cool tier)", pricePerGb: 0.01 },
  { id: "backblaze-b2", name: "Backblaze B2", pricePerGb: 0.006 },
];

export default function StorageCostCalculator() {
  const [gb, setGb] = useState(500);

  const results = useMemo(() => {
    return [...PROVIDERS].map((p) => ({ ...p, monthlyCost: p.pricePerGb * gb })).sort((a, b) => a.monthlyCost - b.monthlyCost);
  }, [gb]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6 max-w-xs">
        Storage (GB)
        <input type="number" min="0" value={gb} onChange={(e) => setGb(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">$/GB/month</th>
              <th className="py-2 pr-4">Monthly cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map((p) => (
              <tr key={p.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{p.name}</td>
                <td className="py-2 pr-4 text-slate-400">${p.pricePerGb.toFixed(4)}</td>
                <td className="py-2 pr-4 font-semibold text-indigo-400">${p.monthlyCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-4">Storage cost only — doesn't include egress/bandwidth charges, which can be significant. Check the Bandwidth Cost Calculator separately.</p>
    </div>
  );
}
