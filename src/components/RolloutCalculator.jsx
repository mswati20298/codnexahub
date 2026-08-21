import { useMemo, useState } from "react";

export default function RolloutCalculator() {
  const [totalUsers, setTotalUsers] = useState(100000);
  const [currentPct, setCurrentPct] = useState(5);
  const [days, setDays] = useState(7);
  const [targetPct, setTargetPct] = useState(100);

  const schedule = useMemo(() => {
    const steps = [];
    const stepPct = (targetPct - currentPct) / (days - 1 || 1);
    for (let i = 0; i < days; i++) {
      const pct = Math.min(targetPct, currentPct + stepPct * i);
      steps.push({ day: i + 1, pct: pct.toFixed(1), users: Math.round((pct / 100) * totalUsers) });
    }
    return steps;
  }, [totalUsers, currentPct, days, targetPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Total users
          <input type="number" min="0" value={totalUsers} onChange={(e) => setTotalUsers(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Starting rollout (%)
          <input type="number" min="0" max="100" value={currentPct} onChange={(e) => setCurrentPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Target rollout (%)
          <input type="number" min="0" max="100" value={targetPct} onChange={(e) => setTargetPct(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Days to full rollout
          <input type="number" min="1" value={days} onChange={(e) => setDays(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="max-h-64 overflow-y-auto space-y-1">
        {schedule.map((s) => (
          <div key={s.day} className="flex justify-between bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-300">Day {s.day}</span>
            <span className="text-indigo-400">{s.pct}%</span>
            <span className="text-slate-500">~{s.users.toLocaleString()} users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
