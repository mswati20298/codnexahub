import { useMemo, useState } from "react";

export default function NamespaceGenerator() {
  const [name, setName] = useState("staging");
  const [labels, setLabels] = useState("environment: staging\nteam: platform");

  const yaml = useMemo(() => {
    const labelLines = labels.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => `    ${l}`);
    return `apiVersion: v1\nkind: Namespace\nmetadata:\n  name: ${name}\n  labels:\n${labelLines.join("\n")}`;
  }, [name, labels]);

  const copy = () => navigator.clipboard.writeText(yaml);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4 max-w-xs">
        Namespace name
        <input value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Labels (key: value, one per line)
        <textarea value={labels} onChange={(e) => setLabels(e.target.value)} rows={3} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy YAML</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{yaml}</code>
      </pre>
    </div>
  );
}
