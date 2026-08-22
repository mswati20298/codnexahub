import { useMemo, useState } from "react";

export default function IndexGenerator() {
  const [table, setTable] = useState("users");
  const [columns, setColumns] = useState("email");
  const [unique, setUnique] = useState(true);
  const [indexName, setIndexName] = useState("");

  const sql = useMemo(() => {
    const cols = columns.split(",").map((c) => c.trim()).filter(Boolean);
    const name = indexName.trim() || `idx_${table}_${cols.join("_")}`;
    return `CREATE ${unique ? "UNIQUE " : ""}INDEX ${name}\nON ${table} (${cols.join(", ")});`;
  }, [table, columns, unique, indexName]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Columns (comma-separated)
          <input value={columns} onChange={(e) => setColumns(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Index name (optional)
          <input value={indexName} onChange={(e) => setIndexName(e.target.value)} placeholder="auto-generated if blank" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mt-6">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
          Unique index
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
