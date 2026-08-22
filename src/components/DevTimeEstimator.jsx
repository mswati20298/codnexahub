import { useMemo, useState } from "react";

const FEATURES = [
  { key: "auth", label: "User authentication", hours: 16 },
  { key: "crud", label: "Basic CRUD feature", hours: 12 },
  { key: "payments", label: "Payment integration", hours: 24 },
  { key: "admin", label: "Admin dashboard", hours: 20 },
  { key: "api", label: "Public API", hours: 18 },
  { key: "notifications", label: "Email/push notifications", hours: 10 },
  { key: "search", label: "Search functionality", hours: 14 },
  { key: "fileUpload", label: "File upload/storage", hours: 8 },
];

export default function DevTimeEstimator() {
  const [selected, setSelected] = useState(["auth", "crud"]);
  const [bufferPct, setBufferPct] = useState(30);
  const [hoursPerDay, setHoursPerDay] = useState(6);

  const toggle = (key) => setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  const results = useMemo(() => {
    const baseHours = FEATURES.filter((f) => selected.includes(f.key)).reduce((sum, f) => sum + f.hours, 0);
    const totalHours = baseHours * (1 + bufferPct / 100);
    const days = totalHours / hoursPerDay;
    return { baseHours, totalHours, days };
  }, [selected, bufferPct, hoursPerDay]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-2 mb-4">
        {FEATURES.map((f) => (
          <label key={f.key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={selected.includes(f.key)} onChange={() => toggle(f.key)} />
            {f.label} <span className="text-slate-500 dark:text-slate-500 text-xs">({f.hours}h)</span>
          </label>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Buffer for unknowns (%)
          <input type="number" min="0" value={bufferPct} onChange={(e) => setBufferPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Focused hours/day
          <input type="number" min="1" value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Base estimate</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{results.baseHours}h</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">With buffer</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{results.totalHours.toFixed(0)}h</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Working days</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{results.days.toFixed(1)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Rough starting estimates per feature — always adjust for your specific requirements and team experience.</p>
    </div>
  );
}
