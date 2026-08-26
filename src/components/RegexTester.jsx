import { useMemo, useState } from "react";
export default function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [text, setText] = useState("Order 123 has 4 items, total $56.78");
  const matches = useMemo(() => { try { return [...text.matchAll(new RegExp(pattern, "g"))].map((m) => m[0]); } catch { return null; } }, [pattern, text]);
  return (
    <div>
      <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm mb-4" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 mb-4" />
      {matches === null ? <p className="text-red-600 dark:text-red-400 text-sm">Invalid regex.</p> : (
        <div><p className="text-sm text-slate-500 mb-2">{matches.length} match(es)</p>
          <div className="flex flex-wrap gap-2">{matches.map((m, i) => <span key={i} className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">{m}</span>)}</div>
        </div>
      )}
    </div>
  );
}
