import { useMemo, useState } from "react";

const PROVIDERS = [
  { id: "aws-egress", name: "AWS Data Transfer Out", pricePerGb: 0.09 },
  { id: "gcp-egress", name: "GCP Egress to Internet", pricePerGb: 0.12 },
  { id: "azure-egress", name: "Azure Outbound Data Transfer", pricePerGb: 0.087 },
  { id: "cloudflare", name: "Cloudflare (R2 storage egress)", pricePerGb: 0 },
  { id: "bunny-cdn", name: "BunnyCDN", pricePerGb: 0.01 },
];

export default function BandwidthCostCalculator() {
  const [gbPerMonth, setGbPerMonth] = useState(1000);

  const results = useMemo(() => {
    return [...PROVIDERS].map((p) => ({ ...p, monthlyCost: p.pricePerGb * gbPerMonth })).sort((a, b) => a.monthlyCost - b.monthlyCost);
  }, [gbPerMonth]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-6 max-w-xs">
        Outbound data transfer (GB/month)
        <input type="number" min="0" value={gbPerMonth} onChange={(e) => setGbPerMonth(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">$/GB</th>
              <th className="py-2 pr-4">Monthly cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map((p) => (
              <tr key={p.id} className="border-b border-slate-200 dark:border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">{p.name}</td>
                <td className="py-2 pr-4 text-slate-500 dark:text-slate-400">${p.pricePerGb.toFixed(3)}</td>
                <td className="py-2 pr-4 font-semibold text-emerald-600 dark:text-emerald-400">${p.monthlyCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">"Egress fees" are one of the most underestimated cloud costs — moving data out is often far pricier than storing it.</p>
    </div>
  );
}
