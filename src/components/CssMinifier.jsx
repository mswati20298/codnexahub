import { useMemo, useState } from "react";

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

const SAMPLE = `.card {
  padding: 16px;
  border-radius: 8px;
  background: #fff;
}`;

export default function CssMinifier() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => minifyCss(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);
  const savedPct = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs text-slate-500">{savedPct}% smaller</span>
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 ml-auto">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap break-all">
        <code>{output}</code>
      </pre>
    </div>
  );
}
