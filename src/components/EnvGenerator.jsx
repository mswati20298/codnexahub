import { useMemo, useState } from "react";

const SAMPLE = `DATABASE_URL: postgres://user:pass@localhost:5432/db
API_KEY: your-api-key-here
PORT: 3000
NODE_ENV: development`;

export default function EnvGenerator() {
  const [input, setInput] = useState(SAMPLE);

  const output = useMemo(() => {
    return input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return `${key.trim()}=${rest.join(":").trim()}`;
      })
      .join("\n");
  }, [input]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Variables (one per line: NAME: value)
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy .env</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
