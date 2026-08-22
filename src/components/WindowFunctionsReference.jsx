const FUNCTIONS = [
  { fn: "ROW_NUMBER()", desc: "Sequential number for each row within its partition" },
  { fn: "RANK()", desc: "Rank with gaps after ties (1, 2, 2, 4)" },
  { fn: "DENSE_RANK()", desc: "Rank without gaps after ties (1, 2, 2, 3)" },
  { fn: "LAG(col, n)", desc: "Value from n rows before the current row" },
  { fn: "LEAD(col, n)", desc: "Value from n rows after the current row" },
  { fn: "SUM(col) OVER (...)", desc: "Running/windowed sum without collapsing rows" },
  { fn: "NTILE(n)", desc: "Divides rows into n roughly equal buckets" },
  { fn: "FIRST_VALUE(col)", desc: "First value in the window frame" },
];

export default function WindowFunctionsReference() {
  return (
    <div>
      <div className="space-y-1 mb-4">
        {FUNCTIONS.map((f) => (
          <div key={f.fn} className="flex gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
            <code className="text-emerald-600 dark:text-emerald-400 w-48 shrink-0">{f.fn}</code>
            <span className="text-sm text-slate-700 dark:text-slate-300">{f.desc}</span>
          </div>
        ))}
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
        <code>{`SELECT name, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank\nFROM employees;`}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Unlike GROUP BY, window functions don't collapse rows — you keep every original row plus the computed value.</p>
    </div>
  );
}
