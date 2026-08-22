import { useMemo, useState } from "react";

function formatCss(css) {
  return css
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/\n\s*\n/g, "\n")
    .replace(/  \n}/g, "}")
    .trim();
}

const SAMPLE = ".card { padding: 16px; border-radius: 8px; background: #fff; }";

export default function CssFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => formatCss(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
