import { useMemo, useState } from "react";

export default function RpsCalculator() {
  const [rps, setRps] = useState(50);

  const results = useMemo(() => {
    const perMinute = rps * 60;
    const perHour = perMinute * 60;
    const perDay = perHour * 24;
    const perMonth = perDay * 30;
    return { perMinute, perHour, perDay, perMonth };
  }, [rps]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6 max-w-xs">
        Requests per second (avg/sustained)
        <input type="number" min="0" value={rps} onChange={(e) => setRps(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Per minute</p>
          <p className="text-lg font-semibold text-slate-100">{results.perMinute.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Per hour</p>
          <p className="text-lg font-semibold text-slate-100">{results.perHour.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Per day</p>
          <p className="text-lg font-semibold text-slate-100">{results.perDay.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Per month</p>
          <p className="text-lg font-semibold text-indigo-400">{results.perMonth.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
