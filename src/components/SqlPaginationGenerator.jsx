import { useMemo, useState } from "react";

export default function SqlPaginationGenerator() {
  const [table, setTable] = useState("products");
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(3);
  const [dialect, setDialect] = useState("postgres");

  const sql = useMemo(() => {
    const offset = (page - 1) * pageSize;
    if (dialect === "sqlserver") {
      return `SELECT * FROM ${table}\nORDER BY id\nOFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;`;
    }
    if (dialect === "oracle") {
      return `SELECT * FROM ${table}\nORDER BY id\nOFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;`;
    }
    return `SELECT * FROM ${table}\nORDER BY id\nLIMIT ${pageSize} OFFSET ${offset};`;
  }, [table, pageSize, page, dialect]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Dialect
          <select value={dialect} onChange={(e) => setDialect(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            <option value="postgres">PostgreSQL / MySQL / SQLite</option>
            <option value="sqlserver">SQL Server</option>
            <option value="oracle">Oracle</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Page size
          <input type="number" min="1" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Page number
          <input type="number" min="1" value={page} onChange={(e) => setPage(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
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
