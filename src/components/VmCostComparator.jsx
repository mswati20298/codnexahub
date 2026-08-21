import { useMemo, useState } from "react";

const INSTANCES = [
  { id: "aws-t3-medium", provider: "AWS", name: "t3.medium (2 vCPU, 4GB)", pricePerHour: 0.0416 },
  { id: "aws-m5-large", provider: "AWS", name: "m5.large (2 vCPU, 8GB)", pricePerHour: 0.096 },
  { id: "azure-b2s", provider: "Azure", name: "B2s (2 vCPU, 4GB)", pricePerHour: 0.0416 },
  { id: "azure-d2s", provider: "Azure", name: "D2s v3 (2 vCPU, 8GB)", pricePerHour: 0.096 },
  { id: "gcp-e2-medium", provider: "GCP", name: "e2-medium (2 vCPU, 4GB)", pricePerHour: 0.0335 },
  { id: "gcp-n2-standard-2", provider: "GCP", name: "n2-standard-2 (2 vCPU, 8GB)", pricePerHour: 0.0971 },
];

export default function VmCostComparator() {
  const [hoursPerMonth, setHoursPerMonth] = useState(730);

  const results = useMemo(() => {
    return [...INSTANCES]
      .map((i) => ({ ...i, monthlyCost: i.pricePerHour * hoursPerMonth }))
      .sort((a, b) => a.monthlyCost - b.monthlyCost);
  }, [hoursPerMonth]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6 max-w-xs">
        Hours running per month
        <input type="number" min="1" max="744" value={hoursPerMonth} onChange={(e) => setHoursPerMonth(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        <span className="text-xs text-slate-500">730 = running 24/7 all month</span>
      </label>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Instance</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">$/hour</th>
              <th className="py-2 pr-4">Monthly</th>
            </tr>
          </thead>
          <tbody>
            {results.map((i) => (
              <tr key={i.id} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{i.name}</td>
                <td className="py-2 pr-4 text-slate-400">{i.provider}</td>
                <td className="py-2 pr-4">${i.pricePerHour.toFixed(4)}</td>
                <td className="py-2 pr-4 font-semibold text-indigo-400">${i.monthlyCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-4">On-demand pricing snapshot for comparison — actual prices vary by region and change over time. Verify on the provider's pricing page.</p>
    </div>
  );
}
