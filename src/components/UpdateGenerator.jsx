import { useMemo, useState } from "react";

const SAMPLE = `status: 'active'
updated_at: NOW()`;

export default function UpdateGenerator() {
  const [table, setTable] = useState("users");
  const [setFields, setSetFields] = useState(SAMPLE);
  const [where, setWhere] = useState("id = 1");

  const sql = useMemo(() => {
    const fields = setFields.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
      const [k, ...rest] = l.split(":");
      return `${k.trim()} = ${rest.join(":").trim()}`;
    });
    return `UPDATE ${table}\nSET ${fields.join(",\n    ")}\nWHERE ${where};`;
  }, [table, setFields, where]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        Table
        <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Fields to update (name: value, one per line)
        <textarea value={setFields} onChange={(e) => setSetFields(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
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
      <p className="text-xs text-amber-400 mt-4">Always double-check your WHERE clause — an UPDATE without one affects every row in the table.</p>
    </div>
  );
}
