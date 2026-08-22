import { useMemo, useState } from "react";

const JOIN_TYPES = ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"];

export default function JoinBuilder() {
  const [table1, setTable1] = useState("orders");
  const [table2, setTable2] = useState("customers");
  const [joinType, setJoinType] = useState("INNER JOIN");
  const [key1, setKey1] = useState("orders.customer_id");
  const [key2, setKey2] = useState("customers.id");

  const sql = useMemo(
    () => `SELECT *\nFROM ${table1}\n${joinType} ${table2} ON ${key1} = ${key2};`,
    [table1, table2, joinType, key1, key2]
  );

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Left table
          <input value={table1} onChange={(e) => setTable1(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Right table
          <input value={table2} onChange={(e) => setTable2(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Join type
        <select value={joinType} onChange={(e) => setJoinType(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
          {JOIN_TYPES.map((j) => <option key={j}>{j}</option>)}
        </select>
      </label>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Left key (table.column)
          <input value={key1} onChange={(e) => setKey1(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Right key (table.column)
          <input value={key2} onChange={(e) => setKey2(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
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
