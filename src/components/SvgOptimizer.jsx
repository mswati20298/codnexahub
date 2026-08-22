import { useMemo, useState } from "react";

function optimizeSvg(svg) {
  return svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s*=\s*/g, "=")
    .replace(/\s+xmlns:xlink="[^"]*"/g, "")
    .replace(/\s+id="[^"]*"/g, "")
    .trim();
}

const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <!-- icon path -->
  <path id="icon-path" d="M12 2L2 7l10 5 10-5-10-5z" />
</svg>`;

export default function SvgOptimizer() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => optimizeSvg(input), [input]);
  const savedPct = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;
  const copy = () => navigator.clipboard.writeText(output);

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
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Removes comments, extra whitespace, and IDs — a lightweight cleanup, not a full optimizer like SVGO (doesn't merge paths or simplify geometry).</p>
    </div>
  );
}
