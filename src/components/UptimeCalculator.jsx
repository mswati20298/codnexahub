import { useMemo, useState } from "react";

const SLA_TARGETS = [99, 99.5, 99.9, 99.95, 99.99, 99.999];

function downtimeFor(pct) {
  const minutesPerYear = 365.25 * 24 * 60;
  const downtimeMinutes = minutesPerYear * (1 - pct / 100);
  return downtimeMinutes;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes.toFixed(1)} min`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(1)} hrs`;
  return `${(minutes / 1440).toFixed(1)} days`;
}

export default function UptimeCalculator() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">SLA</th>
              <th className="py-2 pr-4">Downtime/year</th>
              <th className="py-2 pr-4">Downtime/month</th>
              <th className="py-2 pr-4">Downtime/week</th>
            </tr>
          </thead>
          <tbody>
            {SLA_TARGETS.map((pct) => {
              const yearMin = downtimeFor(pct);
              return (
                <tr key={pct} className="border-b border-slate-200 dark:border-slate-800/60">
                  <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">{pct}%</td>
                  <td className="py-2 pr-4 text-emerald-600 dark:text-emerald-400">{formatDuration(yearMin)}</td>
                  <td className="py-2 pr-4 text-slate-500 dark:text-slate-400">{formatDuration(yearMin / 12)}</td>
                  <td className="py-2 pr-4 text-slate-500 dark:text-slate-400">{formatDuration(yearMin / 52)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Each additional "9" in an SLA roughly cuts allowed downtime by 10x — going from 99.9% to 99.99% is a much bigger operational commitment than it looks.</p>
    </div>
  );
}
