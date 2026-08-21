import { useMemo, useState } from "react";

export default function GroupOrderBuilder() {
  const [table, setTable] = useState("orders");
  const [selectCols, setSelectCols] = useState("customer_id, COUNT(*) as order_count");
  const [groupBy, setGroupBy] = useState("customer_id");
  const [orderBy, setOrderBy] = useState("order_count");
  const [direction, setDirection] = useState("DESC");
  const [limit, setLimit] = useState(10);

  const sql = useMemo(() => {
    let query = `SELECT ${selectCols}\nFROM ${table}`;
    if (groupBy.trim()) query += `\nGROUP BY ${groupBy}`;
    if (orderBy.trim()) query += `\nORDER BY ${orderBy} ${direction}`;
    if (limit) query += `\nLIMIT ${limit}`;
    return query + ";";
  }, [table, selectCols, groupBy, orderBy, direction, limit]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          SELECT columns
          <input value={selectCols} onChange={(e) => setSelectCols(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          GROUP BY
          <input value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          ORDER BY
          <div className="flex gap-2">
            <input value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
            <select value={direction} onChange={(e) => setDirection(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-slate-100 text-sm">
              <option>DESC</option>
              <option>ASC</option>
            </select>
          </div>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          LIMIT
          <input type="number" min="0" value={limit} onChange={(e) => setLimit(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
