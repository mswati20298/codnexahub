import { useMemo, useState } from "react";

export default function RegexEscapeTool() {
  const [input, setInput] = useState("Price: $19.99 (was $29.99)");

  const escaped = useMemo(() => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), [input]);
  const copy = () => navigator.clipboard.writeText(escaped);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all">
        <code>{escaped}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Escapes regex special characters (. * + ? ^ $ {`{}`} ( ) | [ ] \) so the text can be used literally inside a regular expression.</p>
    </div>
  );
}
