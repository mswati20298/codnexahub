import { useMemo, useState } from "react";
import { gpuOptions } from "../data/gpus.js";

export default function GpuCostCalculator() {
  const [hoursPerDay, setHoursPerDay] = useState(24);
  const [days, setDays] = useState(30);
  const [gpuCount, setGpuCount] = useState(1);

  const results = useMemo(() => {
    return gpuOptions
      .map((g) => {
        const totalHours = hoursPerDay * days * gpuCount;
        const totalCost = totalHours * g.cloudPricePerHour;
        return { ...g, totalHours, totalCost };
      })
      .sort((a, b) => a.totalCost - b.totalCost);
  }, [hoursPerDay, days, gpuCount]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Hours/day running
          <input
            type="number"
            min="0"
            max="24"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value) || 0)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Number of days
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Number(e.target.value) || 1)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Number of GPUs
          <input
            type="number"
            min="1"
            value={gpuCount}
            onChange={(e) => setGpuCount(Number(e.target.value) || 1)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">GPU</th>
              <th className="py-2 pr-4">$/hour (cloud, approx.)</th>
              <th className="py-2 pr-4">Total hours</th>
              <th className="py-2 pr-4">Total cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map((g) => (
              <tr key={g.id} className="border-b border-slate-200 dark:border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">{g.name}</td>
                <td className="py-2 pr-4">${g.cloudPricePerHour.toFixed(2)}</td>
                <td className="py-2 pr-4 text-slate-500 dark:text-slate-400">{g.totalHours.toLocaleString()}</td>
                <td className="py-2 pr-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  ${g.totalCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        Cloud GPU prices vary significantly by provider, region, and spot vs.
        on-demand pricing. These are rough approximations for comparison —
        check current rates on your chosen cloud provider before budgeting.
      </p>
    </div>
  );
}
