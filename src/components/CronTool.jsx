import { useMemo, useState } from "react";

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Monday at 9am", value: "0 9 * * 1" },
  { label: "Every 1st of the month", value: "0 0 1 * *" },
];

const FIELD_NAMES = ["minute", "hour", "day of month", "month", "day of week"];

function explainField(value, name) {
  if (value === "*") return `every ${name}`;
  if (value.includes("/")) {
    const [, step] = value.split("/");
    return `every ${step} ${name}(s)`;
  }
  if (value.includes(",")) return `at ${name}(s) ${value.replace(/,/g, ", ")}`;
  if (value.includes("-")) return `${name} ${value.replace("-", " through ")}`;
  return `${name} ${value}`;
}

function explainCron(expr) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "A cron expression needs exactly 5 fields: minute hour day-of-month month day-of-week.";
  return parts.map((p, i) => explainField(p, FIELD_NAMES[i])).join(", ");
}

export default function CronTool() {
  const [expr, setExpr] = useState("0 9 * * 1");

  const explanation = useMemo(() => explainCron(expr), [expr]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button key={p.value} onClick={() => setExpr(p.value)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">
            {p.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
      />

      <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3">{explanation}</p>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        Fields: minute (0-59) · hour (0-23) · day of month (1-31) · month (1-12) · day of week (0-6, Sun=0)
      </p>
    </div>
  );
}
