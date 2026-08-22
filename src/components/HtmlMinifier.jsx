import { useMemo, useState } from "react";

function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

const SAMPLE = `<div class="card">
  <h2>Title</h2>
  <p>Some text here.</p>
</div>`;

export default function HtmlMinifier() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => minifyHtml(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);
  const savedPct = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs text-slate-500 dark:text-slate-500">{savedPct}% smaller</span>
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 ml-auto">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all">
        <code>{output}</code>
      </pre>
    </div>
  );
}
