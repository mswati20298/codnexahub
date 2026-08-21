import { useMemo, useState } from "react";

const KEY_TYPES = {
  "AUTO_INCREMENT (MySQL)": (col) => `${col} INT AUTO_INCREMENT PRIMARY KEY`,
  "SERIAL (PostgreSQL)": (col) => `${col} SERIAL PRIMARY KEY`,
  "UUID (PostgreSQL)": (col) => `${col} UUID DEFAULT gen_random_uuid() PRIMARY KEY`,
  "IDENTITY (SQL Server)": (col) => `${col} INT IDENTITY(1,1) PRIMARY KEY`,
  "Composite key": (col) => `PRIMARY KEY (${col})`,
};

export default function PrimaryKeyGenerator() {
  const [column, setColumn] = useState("id");
  const [type, setType] = useState("SERIAL (PostgreSQL)");

  const sql = useMemo(() => KEY_TYPES[type](column), [column, type]);
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Column name(s)
          <input value={column} onChange={(e) => setColumn(e.target.value)} placeholder="id, or col1, col2 for composite" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Key type
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            {Object.keys(KEY_TYPES).map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <code className="text-sm text-indigo-400">{sql}</code>
      </div>
    </div>
  );
}
