import { useMemo, useState } from "react";

export default function TimestampDiff() {
  const [start, setStart] = useState(new Date(Date.now() - 3600000).toISOString().slice(0, 19));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 19));

  const diff = useMemo(() => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return null;
    const ms = Math.abs(d2 - d1);
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return { ms, seconds, minutes, hours, days };
  }, [start, end]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Start
          <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          End
          <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      {diff ? (
        <div className="grid sm:grid-cols-4 gap-3">
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">Days</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{diff.days}</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">Hours</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{diff.hours.toLocaleString()}</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">Minutes</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{diff.minutes.toLocaleString()}</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">Seconds</p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{diff.seconds.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-600 dark:text-red-400 text-sm">Invalid date(s).</p>
      )}
    </div>
  );
}
