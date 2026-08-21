import { useMemo, useState } from "react";

export default function DeleteGenerator() {
  const [table, setTable] = useState("users");
  const [where, setWhere] = useState("id = 1");

  const sql = useMemo(() => `DELETE FROM ${table}\nWHERE ${where};`, [table, where]);
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        Table
        <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        WHERE condition
        <input value={where} onChange={(e) => setWhere(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
      <p className="text-xs text-red-400 mt-4">A DELETE without a WHERE clause removes every row in the table. Always test with a SELECT using the same WHERE first.</p>
    </div>
  );
}
