import { useMemo, useState } from "react";

const ACTIONS = {
  "ADD COLUMN": (table, col) => `ALTER TABLE ${table}\nADD COLUMN ${col};`,
  "DROP COLUMN": (table, col) => `ALTER TABLE ${table}\nDROP COLUMN ${col.split(" ")[0]};`,
  "RENAME COLUMN": (table, col) => {
    const [oldName, newName] = col.split(" TO ");
    return `ALTER TABLE ${table}\nRENAME COLUMN ${oldName?.trim()} TO ${newName?.trim() || "new_name"};`;
  },
  "MODIFY COLUMN": (table, col) => `ALTER TABLE ${table}\nMODIFY COLUMN ${col};`,
};

export default function AlterTableGenerator() {
  const [table, setTable] = useState("users");
  const [action, setAction] = useState("ADD COLUMN");
  const [colDef, setColDef] = useState("phone VARCHAR(20)");

  const sql = useMemo(() => ACTIONS[action](table, colDef), [table, action, colDef]);
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Action
          <select value={action} onChange={(e) => setAction(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            {Object.keys(ACTIONS).map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        {action === "RENAME COLUMN" ? "old_name TO new_name" : "Column definition"}
        <input value={colDef} onChange={(e) => setColDef(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
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
