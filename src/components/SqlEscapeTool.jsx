import { useMemo, useState } from "react";

export default function SqlEscapeTool() {
  const [input, setInput] = useState("O'Brien's \"quote\"");
  const escaped = useMemo(() => input.replace(/'/g, "''"), [input]);
  const copy = () => navigator.clipboard.writeText(escaped);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm mb-4" />
      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <code className="text-sm text-slate-800 dark:text-slate-200 break-all">{escaped}</code>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        Escapes single quotes for use inside a SQL string literal (standard SQL doubling convention). <strong>This is not a substitute for parameterized queries</strong> — always use prepared statements/parameter binding in real code to prevent SQL injection.
      </p>
    </div>
  );
}
