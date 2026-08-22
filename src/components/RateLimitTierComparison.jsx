import { useMemo, useState } from "react";

export default function RateLimitTierComparison() {
  const [tiers, setTiers] = useState([
    { name: "Free", rpm: 20, rpd: 200 },
    { name: "Pro", rpm: 500, rpd: 10000 },
    { name: "Enterprise", rpm: 5000, rpd: 500000 },
  ]);

  const update = (i, field, value) => setTiers((prev) => prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));

  const withDaily = useMemo(() => tiers.map((t) => ({ ...t, effectiveRpm: Math.min(t.rpm, t.rpd / 1440) })), [tiers]);

  return (
    <div>
      <div className="space-y-3 mb-6">
        {tiers.map((t, i) => (
          <div key={i} className="grid sm:grid-cols-3 gap-2">
            <input value={t.name} onChange={(e) => update(i, "name", e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <input type="number" value={t.rpm} onChange={(e) => update(i, "rpm", Number(e.target.value) || 0)} placeholder="Req/min" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <input type="number" value={t.rpd} onChange={(e) => update(i, "rpd", Number(e.target.value) || 0)} placeholder="Req/day" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">Tier</th>
              <th className="py-2 pr-4">Req/min limit</th>
              <th className="py-2 pr-4">Req/day limit</th>
              <th className="py-2 pr-4">Effective sustained rate</th>
            </tr>
          </thead>
          <tbody>
            {withDaily.map((t, i) => (
              <tr key={i} className="border-b border-slate-200 dark:border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">{t.name}</td>
                <td className="py-2 pr-4">{t.rpm.toLocaleString()}</td>
                <td className="py-2 pr-4">{t.rpd.toLocaleString()}</td>
                <td className="py-2 pr-4 text-emerald-600 dark:text-emerald-400">{t.effectiveRpm.toFixed(1)} req/min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">"Effective sustained rate" is whichever limit is more restrictive when spread evenly across the day — the daily cap often binds before the per-minute one at sustained usage.</p>
    </div>
  );
}
