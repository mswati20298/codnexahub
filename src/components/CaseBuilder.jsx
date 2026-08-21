import { useMemo, useState } from "react";

export default function CaseBuilder() {
  const [alias, setAlias] = useState("status_label");
  const [conditions, setConditions] = useState([
    { when: "status = 'A'", then: "'Active'" },
    { when: "status = 'I'", then: "'Inactive'" },
  ]);
  const [elseValue, setElseValue] = useState("'Unknown'");

  const updateCondition = (i, field, value) => {
    setConditions((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c)));
  };
  const addCondition = () => setConditions((prev) => [...prev, { when: "", then: "" }]);
  const removeCondition = (i) => setConditions((prev) => prev.filter((_, idx) => idx !== i));

  const sql = useMemo(() => {
    const lines = conditions.map((c) => `  WHEN ${c.when} THEN ${c.then}`).join("\n");
    return `CASE\n${lines}\n  ELSE ${elseValue}\nEND AS ${alias}`;
  }, [conditions, elseValue, alias]);

  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="space-y-2 mb-4">
        {conditions.map((c, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 w-12">WHEN</span>
            <input value={c.when} onChange={(e) => updateCondition(i, "when", e.target.value)} className="flex-1 min-w-[120px] bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-100 text-sm font-mono" />
            <span className="text-xs text-slate-500">THEN</span>
            <input value={c.then} onChange={(e) => updateCondition(i, "then", e.target.value)} className="flex-1 min-w-[100px] bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-100 text-sm font-mono" />
            <button onClick={() => removeCondition(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addCondition} className="text-sm px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 mb-4">+ Add condition</button>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          ELSE value
          <input value={elseValue} onChange={(e) => setElseValue(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Column alias
          <input value={alias} onChange={(e) => setAlias(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <pre className="text-xs text-slate-200 whitespace-pre-wrap"><code>{sql}</code></pre>
      </div>
    </div>
  );
}
