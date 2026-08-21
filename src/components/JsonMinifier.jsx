import { useMemo, useState } from "react";

const SAMPLE = `{
  "name": "Alice",
  "age": 30
}`;

export default function JsonMinifier() {
  const [input, setInput] = useState(SAMPLE);

  const { output, error, saved } = useMemo(() => {
    try {
      const min = JSON.stringify(JSON.parse(input));
      const saved = input.length > 0 ? Math.round((1 - min.length / input.length) * 100) : 0;
      return { output: min, error: null, saved };
    } catch (e) {
      return { output: "", error: "Invalid JSON — " + e.message, saved: 0 };
    }
  }, [input]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-slate-500">{saved}% smaller</span>
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 ml-auto">
              Copy
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap break-all">
            <code>{output}</code>
          </pre>
        </>
      )}
    </div>
  );
}
