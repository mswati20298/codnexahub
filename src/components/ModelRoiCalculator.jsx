import { useMemo, useState } from "react";

export default function ModelRoiCalculator() {
  const [tasksPerMonth, setTasksPerMonth] = useState(2000);
  const [minutesSavedPerTask, setMinutesSavedPerTask] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(800);
  const [monthlyAiCost, setMonthlyAiCost] = useState(5000);

  const results = useMemo(() => {
    const hoursSaved = (tasksPerMonth * minutesSavedPerTask) / 60;
    const valueSaved = hoursSaved * hourlyRate;
    const netBenefit = valueSaved - monthlyAiCost;
    const roiPct = monthlyAiCost > 0 ? (netBenefit / monthlyAiCost) * 100 : 0;
    return { hoursSaved, valueSaved, netBenefit, roiPct };
  }, [tasksPerMonth, minutesSavedPerTask, hourlyRate, monthlyAiCost]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Tasks/month using AI
          <input type="number" min="0" value={tasksPerMonth} onChange={(e) => setTasksPerMonth(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Minutes saved/task
          <input type="number" min="0" value={minutesSavedPerTask} onChange={(e) => setMinutesSavedPerTask(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Hourly value of time (₹)
          <input type="number" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Monthly AI cost (₹)
          <input type="number" min="0" value={monthlyAiCost} onChange={(e) => setMonthlyAiCost(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Hours saved/month</p>
          <p className="text-xl font-semibold text-slate-100">{results.hoursSaved.toFixed(0)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Value of time saved</p>
          <p className="text-xl font-semibold text-slate-100">₹{results.valueSaved.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Net benefit</p>
          <p className={`text-xl font-semibold ${results.netBenefit >= 0 ? "text-emerald-400" : "text-red-400"}`}>₹{results.netBenefit.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">ROI</p>
          <p className="text-xl font-semibold text-indigo-400">{results.roiPct.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
