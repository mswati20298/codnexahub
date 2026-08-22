import { useMemo, useState } from "react";

function parseField(field, min, max) {
  if (field === "*") return null; // means "every"
  if (field.includes("/")) {
    const [, step] = field.split("/");
    return { type: "step", value: Number(step) };
  }
  return { type: "exact", value: Number(field) };
}

function nextRuns(cronExpr, count = 5) {
  const parts = cronExpr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minF, hourF] = parts;

  const results = [];
  let cursor = new Date();
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let attempts = 0;
  while (results.length < count && attempts < 100000) {
    attempts++;
    const min = cursor.getMinutes();
    const hour = cursor.getHours();

    const minField = parseField(minF, 0, 59);
    const hourField = parseField(hourF, 0, 23);

    const minMatches = !minField || (minField.type === "exact" ? min === minField.value : min % minField.value === 0);
    const hourMatches = !hourField || (hourField.type === "exact" ? hour === hourField.value : hour % hourField.value === 0);

    if (minMatches && hourMatches) {
      results.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
}

export default function CronNextRuns() {
  const [expr, setExpr] = useState("0 9 * * *");

  const runs = useMemo(() => nextRuns(expr, 5), [expr]);

  return (
    <div>
      <input
        type="text"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {runs.length === 0 ? (
        <p className="text-red-600 dark:text-red-400 text-sm">Couldn't compute next runs — check the expression has 5 space-separated fields.</p>
      ) : (
        <ul className="space-y-1">
          {runs.map((r, i) => (
            <li key={i} className="text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200">{r.toLocaleString()}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Supports minute and hour fields (with * and */n step syntax) — day-of-month, month, and day-of-week filtering isn't applied in this simplified calculator.</p>
    </div>
  );
}
