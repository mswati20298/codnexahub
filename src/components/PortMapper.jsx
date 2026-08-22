import { useMemo, useState } from "react";

export default function PortMapper() {
  const [mappings, setMappings] = useState([{ host: "8080", container: "80" }]);

  const update = (i, field, value) => {
    setMappings((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)));
  };
  const add = () => setMappings((prev) => [...prev, { host: "", container: "" }]);
  const remove = (i) => setMappings((prev) => prev.filter((_, idx) => idx !== i));

  const dockerRunFlags = useMemo(() => mappings.filter((m) => m.host && m.container).map((m) => `-p ${m.host}:${m.container}`).join(" "), [mappings]);
  const composeYaml = useMemo(() => {
    const lines = mappings.filter((m) => m.host && m.container).map((m) => `      - "${m.host}:${m.container}"`);
    return `ports:\n${lines.join("\n")}`;
  }, [mappings]);

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div>
      <div className="space-y-2 mb-4">
        {mappings.map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={m.host} onChange={(e) => update(i, "host", e.target.value)} placeholder="Host port" className="w-28 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <span className="text-slate-500 dark:text-slate-500">:</span>
            <input value={m.container} onChange={(e) => update(i, "container", e.target.value)} placeholder="Container port" className="w-28 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            <button onClick={() => remove(i)} className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:text-red-300 ml-2">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 mb-6">+ Add mapping</button>

      <div className="space-y-3">
        <div onClick={() => copy(dockerRunFlags)} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 hover:border-emerald-500">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">docker run flags</p>
          <code className="text-sm text-emerald-600 dark:text-emerald-400">{dockerRunFlags}</code>
        </div>
        <div onClick={() => copy(composeYaml)} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 hover:border-emerald-500">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">docker-compose.yml snippet</p>
          <pre className="text-sm text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">{composeYaml}</pre>
        </div>
      </div>
    </div>
  );
}
