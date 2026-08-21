import { useMemo, useState } from "react";

export default function ForeignKeyGenerator() {
  const [table, setTable] = useState("orders");
  const [column, setColumn] = useState("customer_id");
  const [refTable, setRefTable] = useState("customers");
  const [refColumn, setRefColumn] = useState("id");
  const [onDelete, setOnDelete] = useState("CASCADE");

  const sql = useMemo(
    () => `ALTER TABLE ${table}\nADD CONSTRAINT fk_${table}_${column}\nFOREIGN KEY (${column})\nREFERENCES ${refTable}(${refColumn})\nON DELETE ${onDelete};`,
    [table, column, refTable, refColumn, onDelete]
  );
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Column
          <input value={column} onChange={(e) => setColumn(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          References table
          <input value={refTable} onChange={(e) => setRefTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          References column
          <input value={refColumn} onChange={(e) => setRefColumn(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        ON DELETE
        <select value={onDelete} onChange={(e) => setOnDelete(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
          {["CASCADE", "SET NULL", "RESTRICT", "NO ACTION"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
