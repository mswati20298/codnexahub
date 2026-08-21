import { useMemo, useState } from "react";

const SAMPLE = `name,age,city
Alice,30,Mumbai
Bob,25,Delhi`;

function parseCsvLine(line) {
  return line.split(",").map((s) => s.trim());
}

function toInsert(csv, tableName) {
  const lines = csv.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return "";
  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const formatted = values.map((v) => (isNaN(v) || v === "" ? `'${v.replace(/'/g, "''")}'` : v));
    return `(${formatted.join(", ")})`;
  });
  return `INSERT INTO ${tableName} (${headers.join(", ")})\nVALUES\n  ${rows.join(",\n  ")};`;
}

export default function CsvToSql() {
  const [csv, setCsv] = useState(SAMPLE);
  const [tableName, setTableName] = useState("users");

  const sql = useMemo(() => toInsert(csv, tableName), [csv, tableName]);
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        Table name
        <input value={tableName} onChange={(e) => setTableName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <textarea value={csv} onChange={(e) => setCsv(e.target.value)} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy SQL</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 max-h-72">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
