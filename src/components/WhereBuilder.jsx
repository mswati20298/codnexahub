import { useMemo, useState } from "react";

const OPERATORS = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN", "IS NULL", "IS NOT NULL"];

export default function WhereBuilder() {
  const [conditions, setConditions] = useState([
    { field: "status", op: "=", value: "'active'", join: "AND" },
    { field: "age", op: ">", value: "18", join: "" },
  ]);

  const sql = useMemo(() => {
    return conditions
      .map((c, i) => {
        const clause = c.op.startsWith("IS") ? `${c.field} ${c.op}` : `${c.field} ${c.op} ${c.value}`;
        return i === 0 ? clause : `${c.join} ${clause}`;
      })
      .join(" ");
  }, [conditions]);

  const updateCondition = (i, field, value) => {
    setConditions((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c)));
  };

  const addCondition = () => setConditions((prev) => [...prev, { field: "", op: "=", value: "", join: "AND" }]);
  const removeCondition = (i) => setConditions((prev) => prev.filter((_, idx) => idx !== i));
  const copy = () => navigator.clipboard.writeText(`WHERE ${sql}`);

  return (
    <div>
      <div className="space-y-3 mb-4">
        {conditions.map((c, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2">
            {i > 0 && (
              <select value={c.join} onChange={(e) => updateCondition(i, "join", e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm">
                <option>AND</option>
                <option>OR</option>
              </select>
            )}
            <input value={c.field} onChange={(e) => updateCondition(i, "field", e.target.value)} placeholder="field" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm w-28" />
            <select value={c.op} onChange={(e) => updateCondition(i, "op", e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm">
              {OPERATORS.map((op) => <option key={op}>{op}</option>)}
            </select>
            {!c.op.startsWith("IS") && (
              <input value={c.value} onChange={(e) => updateCondition(i, "value", e.target.value)} placeholder="value" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm w-28" />
            )}
            <button onClick={() => removeCondition(i)} className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:text-red-300 ml-1">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addCondition} className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 mb-4">+ Add condition</button>
      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <code className="text-sm text-emerald-600 dark:text-emerald-400">WHERE {sql}</code>
      </div>
    </div>
  );
}
