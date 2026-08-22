const FUNCTIONS = [
  { fn: "COUNT(*)", desc: "Number of rows" },
  { fn: "COUNT(col)", desc: "Number of non-NULL values in column" },
  { fn: "SUM(col)", desc: "Sum of values" },
  { fn: "AVG(col)", desc: "Average of values" },
  { fn: "MIN(col)", desc: "Smallest value" },
  { fn: "MAX(col)", desc: "Largest value" },
  { fn: "GROUP_CONCAT(col)", desc: "Concatenate values with a separator (MySQL); STRING_AGG in Postgres" },
  { fn: "STDDEV(col)", desc: "Standard deviation" },
  { fn: "VARIANCE(col)", desc: "Statistical variance" },
];

export default function AggregateFunctionsReference() {
  return (
    <div className="space-y-1">
      {FUNCTIONS.map((f) => (
        <div key={f.fn} className="flex gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
          <code className="text-emerald-600 dark:text-emerald-400 w-40 shrink-0">{f.fn}</code>
          <span className="text-sm text-slate-700 dark:text-slate-300">{f.desc}</span>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Aggregate functions require GROUP BY when combined with non-aggregated columns in SELECT — any selected column not in an aggregate must appear in GROUP BY.</p>
    </div>
  );
}
