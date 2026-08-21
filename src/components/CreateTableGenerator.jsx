import { useMemo, useState } from "react";

const SAMPLE = `id: int, primary key
name: varchar(255), not null
email: varchar(255), unique
created_at: timestamp, default now()`;

export default function CreateTableGenerator() {
  const [tableName, setTableName] = useState("users");
  const [columns, setColumns] = useState(SAMPLE);

  const sql = useMemo(() => {
    const lines = columns
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const [namePart, ...rest] = line.split(":");
        const name = namePart.trim();
        const rawType = rest.join(":").trim();
        const constraints = [];
        let type = rawType;

        if (/primary key/i.test(rawType)) constraints.push("PRIMARY KEY");
        if (/not null/i.test(rawType)) constraints.push("NOT NULL");
        if (/unique/i.test(rawType)) constraints.push("UNIQUE");
        const defaultMatch = rawType.match(/default\s+([^\s,]+(?:\([^)]*\))?)/i);
        if (defaultMatch) constraints.push(`DEFAULT ${defaultMatch[1]}`);

        type = rawType.split(",")[0].trim();

        return `  ${name} ${type.toUpperCase()}${constraints.length ? " " + constraints.join(" ") : ""}`;
      });
    return `CREATE TABLE ${tableName} (\n${lines.join(",\n")}\n);`;
  }, [tableName, columns]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        Table name
        <input value={tableName} onChange={(e) => setTableName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Columns (one per line: name: type, constraints)
        <textarea value={columns} onChange={(e) => setColumns(e.target.value)} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy SQL</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
