import { useMemo, useState } from "react";

export default function ViewGenerator() {
  const [viewName, setViewName] = useState("active_customers");
  const [query, setQuery] = useState("SELECT id, name, email\nFROM customers\nWHERE status = 'active'");
  const [orReplace, setOrReplace] = useState(true);

  const sql = useMemo(
    () => `CREATE ${orReplace ? "OR REPLACE " : ""}VIEW ${viewName} AS\n${query};`,
    [viewName, query, orReplace]
  );
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4 max-w-xs">
        View name
        <input value={viewName} onChange={(e) => setViewName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
        <input type="checkbox" checked={orReplace} onChange={(e) => setOrReplace(e.target.checked)} />
        Use OR REPLACE (update if exists)
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Underlying SELECT query
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
