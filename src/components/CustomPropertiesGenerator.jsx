import { useMemo, useState } from "react";

export default function CustomPropertiesGenerator() {
  const [vars, setVars] = useState([
    { name: "primary-color", value: "#6366f1" },
    { name: "spacing-unit", value: "8px" },
  ]);

  const update = (i, field, value) => setVars((prev) => prev.map((v, idx) => (idx === i ? { ...v, [field]: value } : v)));
  const add = () => setVars((prev) => [...prev, { name: "", value: "" }]);
  const remove = (i) => setVars((prev) => prev.filter((_, idx) => idx !== i));

  const css = useMemo(() => {
    const lines = vars.filter((v) => v.name).map((v) => `  --${v.name}: ${v.value};`);
    return `:root {\n${lines.join("\n")}\n}`;
  }, [vars]);

  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="space-y-2 mb-4">
        {vars.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-500 text-sm">--</span>
            <input value={v.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="name" className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <span className="text-slate-500 dark:text-slate-500">:</span>
            <input value={v.value} onChange={(e) => update(i, "value", e.target.value)} placeholder="value" className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <button onClick={() => remove(i)} className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:text-red-300">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 mb-4">+ Add variable</button>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{css}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Use with var(--{"{name}"}) anywhere in your CSS — custom properties can also be scoped to specific selectors, not just :root.</p>
    </div>
  );
}
