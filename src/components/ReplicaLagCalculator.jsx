import { useMemo, useState } from "react";

export default function ReplicaLagCalculator() {
  const [lagMs, setLagMs] = useState(200);
  const [writesPerSecond, setWritesPerSecond] = useState(50);

  const results = useMemo(() => {
    const staleWritesAtAnyMoment = (lagMs / 1000) * writesPerSecond;
    const riskLevel = lagMs < 100 ? "Low" : lagMs < 500 ? "Moderate" : "High";
    return { staleWritesAtAnyMoment, riskLevel };
  }, [lagMs, writesPerSecond]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Replication lag (ms)
          <input type="number" min="0" value={lagMs} onChange={(e) => setLagMs(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Writes per second
          <input type="number" min="0" value={writesPerSecond} onChange={(e) => setWritesPerSecond(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3">
        <p className="text-xs text-slate-400 mb-1">Writes potentially not yet visible on replica</p>
        <p className="text-2xl font-semibold text-indigo-400">~{Math.ceil(results.staleWritesAtAnyMoment)}</p>
      </div>
      <p className="text-sm text-slate-300">Risk level: <span className={results.riskLevel === "Low" ? "text-emerald-400" : results.riskLevel === "Moderate" ? "text-amber-400" : "text-red-400"}>{results.riskLevel}</span></p>
      <p className="text-xs text-slate-500 mt-4">If your app reads immediately after a write (e.g. "show the record I just created"), route that specific read to the primary — don't rely on the replica catching up in time.</p>
    </div>
  );
}
