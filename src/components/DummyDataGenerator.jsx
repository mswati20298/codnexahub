import { useMemo, useState } from "react";

const FIRST_NAMES = ["Alex", "Priya", "Sam", "Maria", "Jordan", "Wei", "Fatima", "Liam"];
const LAST_NAMES = ["Sharma", "Chen", "Garcia", "Patel", "Smith", "Kim", "Khan", "Rossi"];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fakeValue(type) {
  switch (type) {
    case "name": return `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`;
    case "email": return `${randomFrom(FIRST_NAMES).toLowerCase()}@example.com`;
    case "int": return Math.floor(Math.random() * 1000);
    case "bool": return Math.random() > 0.5 ? "TRUE" : "FALSE";
    case "date": return new Date(Date.now() - Math.random() * 1e10).toISOString().slice(0, 10);
    default: return `'${randomFrom(["lorem", "ipsum", "dolor"])}'`;
  }
}

const SAMPLE_SCHEMA = `name: name
email: email
age: int
is_active: bool
created_at: date`;

export default function DummyDataGenerator() {
  const [tableName, setTableName] = useState("users");
  const [schema, setSchema] = useState(SAMPLE_SCHEMA);
  const [rows, setRows] = useState(5);
  const [nonce, setNonce] = useState(0);

  const sql = useMemo(() => {
    const fields = schema.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
      const [name, type] = l.split(":").map((s) => s.trim());
      return { name, type: (type || "string").toLowerCase() };
    });
    const columns = fields.map((f) => f.name).join(", ");
    const valueRows = Array.from({ length: rows }, () =>
      "(" + fields.map((f) => (f.type === "int" || f.type === "bool" ? fakeValue(f.type) : `'${fakeValue(f.type)}'`.replace(/^''|''$/g, "'"))).join(", ") + ")"
    );
    return `INSERT INTO ${tableName} (${columns})\nVALUES\n  ${valueRows.join(",\n  ")};`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName, schema, rows, nonce]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Table name
          <input value={tableName} onChange={(e) => setTableName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Row count
          <input type="number" min="1" max="100" value={rows} onChange={(e) => setRows(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Columns (name: type — name, email, int, bool, date, string)
        <textarea value={schema} onChange={(e) => setSchema(e.target.value)} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex gap-2 mb-2">
        <button onClick={() => setNonce((n) => n + 1)} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">Regenerate</button>
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 ml-auto">Copy SQL</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 max-h-72">
        <code>{sql}</code>
      </pre>
    </div>
  );
}
