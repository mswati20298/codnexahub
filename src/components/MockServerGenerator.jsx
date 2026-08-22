import { useMemo, useState } from "react";

const SAMPLE = `users: [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
posts: []`;

export default function MockServerGenerator() {
  const [input, setInput] = useState(SAMPLE);

  const json = useMemo(() => {
    const obj = {};
    input.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      try {
        obj[key] = JSON.parse(value);
      } catch {
        obj[key] = value;
      }
    });
    return JSON.stringify(obj, null, 2);
  }, [input]);

  const copy = () => navigator.clipboard.writeText(json);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Resources (name: JSON array, one per line)
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy db.json</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{json}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Save this as db.json and run with `json-server db.json` (or a similar tool) to get a full fake REST API with GET/POST/PUT/DELETE for each resource, in seconds.</p>
    </div>
  );
}
