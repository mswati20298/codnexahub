import { useMemo, useState } from "react";

const SAMPLE = '{"name":"Alice","age":30,"tags":["admin","user"]}';

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);

  const { output, error } = useMemo(() => {
    try {
      return { output: JSON.stringify(JSON.parse(input), null, indent), error: null };
    } catch (e) {
      return { output: "", error: "Invalid JSON — " + e.message };
    }
  }, [input, indent]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />
      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          Indent
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-100">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Tabs off (0)</option>
          </select>
        </label>
        {output && (
          <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 ml-auto">
            Copy
          </button>
        )}
      </div>
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 max-h-96">
          <code>{output}</code>
        </pre>
      )}
    </div>
  );
}
