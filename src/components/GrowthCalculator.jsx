import { useMemo, useState } from "react";

export default function GrowthCalculator() {
  const [currentRows, setCurrentRows] = useState(100000);
  const [rowsPerDay, setRowsPerDay] = useState(500);
  const [avgRowBytes, setAvgRowBytes] = useState(300);

  const projections = useMemo(() => {
    return [3, 6, 12, 24].map((months) => {
      const days = months * 30;
      const rows = currentRows + rowsPerDay * days;
      const sizeGb = (rows * avgRowBytes) / 1024 ** 3;
      return { months, rows, sizeGb };
    });
  }, [currentRows, rowsPerDay, avgRowBytes]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Current row count
          <input type="number" min="0" value={currentRows} onChange={(e) => setCurrentRows(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          New rows/day
          <input type="number" min="0" value={rowsPerDay} onChange={(e) => setRowsPerDay(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg row size (bytes)
          <input type="number" min="1" value={avgRowBytes} onChange={(e) => setAvgRowBytes(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-4 gap-3">
        {projections.map((p) => (
          <div key={p.months} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">{p.months} months</p>
            <p className="text-sm font-semibold text-slate-100">{p.rows.toLocaleString()} rows</p>
            <p className="text-xs text-indigo-400">{p.sizeGb.toFixed(2)} GB</p>
          </div>
        ))}
      </div>
    </div>
  );
}
