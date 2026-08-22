import { useMemo, useState } from "react";

export default function DbSizeCalculator() {
  const [rowCount, setRowCount] = useState(1000000);
  const [avgRowBytes, setAvgRowBytes] = useState(500);
  const [indexOverheadPct, setIndexOverheadPct] = useState(30);
  const [monthlyGrowthPct, setMonthlyGrowthPct] = useState(10);

  const results = useMemo(() => {
    const dataBytes = rowCount * avgRowBytes;
    const indexBytes = dataBytes * (indexOverheadPct / 100);
    const totalBytes = dataBytes + indexBytes;
    const totalGb = totalBytes / 1024 ** 3;

    const projections = [3, 6, 12].map((months) => {
      const projectedRows = rowCount * Math.pow(1 + monthlyGrowthPct / 100, months);
      const projectedGb = (projectedRows * avgRowBytes * (1 + indexOverheadPct / 100)) / 1024 ** 3;
      return { months, gb: projectedGb };
    });

    return { totalGb, projections };
  }, [rowCount, avgRowBytes, indexOverheadPct, monthlyGrowthPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Row count
          <input type="number" min="0" value={rowCount} onChange={(e) => setRowCount(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Avg row size (bytes)
          <input type="number" min="1" value={avgRowBytes} onChange={(e) => setAvgRowBytes(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Index overhead (%)
          <input type="number" min="0" value={indexOverheadPct} onChange={(e) => setIndexOverheadPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Monthly growth (%)
          <input type="number" min="0" value={monthlyGrowthPct} onChange={(e) => setMonthlyGrowthPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4 mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current estimated size</p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{results.totalGb.toFixed(2)} GB</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {results.projections.map((p) => (
          <div key={p.months} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">In {p.months} months</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{p.gb.toFixed(2)} GB</p>
          </div>
        ))}
      </div>
    </div>
  );
}
