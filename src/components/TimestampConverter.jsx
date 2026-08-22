import { useMemo, useState } from "react";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));

  const fromTimestamp = useMemo(() => {
    const n = Number(timestamp);
    if (Number.isNaN(n)) return null;
    const ms = timestamp.length > 10 ? n : n * 1000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [timestamp]);

  const toTimestamp = useMemo(() => {
    const d = new Date(dateStr);
    return Number.isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000);
  }, [dateStr]);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-3">
          Unix timestamp (seconds or ms)
          <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {fromTimestamp ? fromTimestamp.toUTCString() : "Invalid timestamp"}
        </p>
        {fromTimestamp && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Local: {fromTimestamp.toLocaleString()}</p>}
      </div>
      <div>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-3">
          Date/time (local)
          <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
          {toTimestamp !== null ? toTimestamp : "Invalid date"}
        </p>
      </div>
    </div>
  );
}
