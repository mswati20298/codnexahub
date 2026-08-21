import { useMemo, useState } from "react";

export default function CompositeKeyGenerator() {
  const [table, setTable] = useState("order_items");
  const [columns, setColumns] = useState("order_id, product_id");

  const sql = useMemo(() => {
    const cols = columns.split(",").map((c) => c.trim()).filter(Boolean);
    return `ALTER TABLE ${table}\nADD PRIMARY KEY (${cols.join(", ")});`;
  }, [table, columns]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Columns (comma-separated)
          <input value={columns} onChange={(e) => setColumns(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <pre className="text-sm text-indigo-400 whitespace-pre-wrap"><code>{sql}</code></pre>
      </div>
      <p className="text-xs text-slate-500 mt-4">A composite primary key is common for many-to-many join tables — the combination of columns must be unique, even if no single column is.</p>
    </div>
  );
}
