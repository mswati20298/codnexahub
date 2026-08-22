import { useMemo, useState } from "react";

export default function CodeCounter() {
  const [code, setCode] = useState("function add(a, b) {\n  return a + b;\n}\n");

  const stats = useMemo(() => {
    const lines = code.split("\n");
    const nonEmptyLines = lines.filter((l) => l.trim() !== "").length;
    const commentLines = lines.filter((l) => /^\s*(\/\/|#|\*|\/\*)/.test(l)).length;
    const chars = code.length;
    const charsNoWhitespace = code.replace(/\s/g, "").length;
    return { totalLines: lines.length, nonEmptyLines, commentLines, chars, charsNoWhitespace };
  }, [code]);

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total lines</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{stats.totalLines}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Non-empty lines</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{stats.nonEmptyLines}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Comment lines (approx.)</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{stats.commentLines}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Characters</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{stats.chars}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Chars (no whitespace)</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{stats.charsNoWhitespace}</p>
        </div>
      </div>
    </div>
  );
}
