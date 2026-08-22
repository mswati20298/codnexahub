import { useMemo, useState } from "react";

export default function ConnectionPoolCalculator() {
  const [appInstances, setAppInstances] = useState(4);
  const [threadsPerInstance, setThreadsPerInstance] = useState(10);
  const [dbMaxConnections, setDbMaxConnections] = useState(100);
  const [reservedForOthers, setReservedForOthers] = useState(10);

  const results = useMemo(() => {
    const idealPoolPerInstance = threadsPerInstance;
    const totalWanted = appInstances * idealPoolPerInstance;
    const availableForApp = dbMaxConnections - reservedForOthers;
    const recommendedPerInstance = Math.floor(availableForApp / appInstances);
    const isOverProvisioned = totalWanted > availableForApp;
    return { totalWanted, availableForApp, recommendedPerInstance, isOverProvisioned };
  }, [appInstances, threadsPerInstance, dbMaxConnections, reservedForOthers]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          App instances (replicas)
          <input type="number" min="1" value={appInstances} onChange={(e) => setAppInstances(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Threads/workers per instance
          <input type="number" min="1" value={threadsPerInstance} onChange={(e) => setThreadsPerInstance(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          DB max connections
          <input type="number" min="1" value={dbMaxConnections} onChange={(e) => setDbMaxConnections(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Reserved for admin/other tools
          <input type="number" min="0" value={reservedForOthers} onChange={(e) => setReservedForOthers(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4 mb-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Recommended pool size per instance</p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{results.recommendedPerInstance}</p>
      </div>
      {results.isOverProvisioned && (
        <p className="text-sm text-red-600 dark:text-red-400">Your desired pool size ({results.totalWanted} total) exceeds available connections ({results.availableForApp}) — reduce per-instance pool size or increase DB max_connections.</p>
      )}
    </div>
  );
}
